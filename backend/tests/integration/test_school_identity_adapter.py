import hashlib
import json
from pathlib import Path

import duckdb
import pytest

from app.contracts.provenance import SourceKind
from app.data_access.school_identity_adapter import (
    CuratedSchoolIdentityAdapter,
    identity_manifest_content_id,
)
from app.schools.identity_contracts import IdentityMatchField

SCHEMA = (
    ("school_id", "VARCHAR"),
    ("school_name", "VARCHAR"),
    ("inep_id", "VARCHAR"),
    ("sme_designation", "VARCHAR"),
    ("cre", "INTEGER"),
    ("neighborhood", "VARCHAR"),
    ("dependency", "VARCHAR"),
    ("school_type", "VARCHAR"),
    ("latitude", "DOUBLE"),
    ("longitude", "DOUBLE"),
)


def _row(
    school_id: str = "SME-RIO-000001",
    inep_id: str | None = "33000001",
    sme_designation: str | None = "0000001",
    cre: int | None = 1,
    latitude: float | None = -22.9,
    longitude: float | None = -43.2,
    neighborhood: str | None = "Centro",
    school_type: str | None = "Escola Municipal",
) -> tuple[object, ...]:
    return (
        school_id,
        f"Escola {school_id}",
        inep_id,
        sme_designation,
        cre,
        neighborhood,
        "Municipal",
        school_type,
        latitude,
        longitude,
    )


def _write_parquet(path: Path, rows: list[tuple[object, ...]]) -> None:
    columns = ", ".join(f"{name} {data_type}" for name, data_type in SCHEMA)
    placeholders = ", ".join("?" for _ in SCHEMA)
    with duckdb.connect(":memory:") as connection:
        connection.execute(f"CREATE TABLE identities ({columns})")
        connection.executemany(f"INSERT INTO identities VALUES ({placeholders})", rows)
        output = str(path).replace("'", "''")
        connection.execute(
            f"COPY (SELECT * FROM identities ORDER BY school_id) "
            f"TO '{output}' (FORMAT PARQUET)"
        )


def _publish(root: Path, rows: list[tuple[object, ...]]) -> Path:
    staging = root / "staging"
    staging.mkdir(parents=True)
    parquet = staging / "school_identity.parquet"
    _write_parquet(parquet, rows)
    manifest: dict[str, object] = {
        "manifest_version": "1.0.0",
        "source_id": "official_school_registry",
        "source_kind": "REAL_PUBLIC",
        "as_of": "2026-08-30T00:00:00Z",
        "limitations": ["Cobertura operacional deve ser confirmada pela SME."],
        "files": {
            "school_identity.parquet": {
                "sha256": hashlib.sha256(parquet.read_bytes()).hexdigest(),
                "row_count": len(rows),
                "schema": [{"name": name, "type": data_type} for name, data_type in SCHEMA],
                "source_kind": "REAL_PUBLIC",
            }
        },
    }
    manifest["snapshot_id"] = identity_manifest_content_id(manifest)
    snapshot_id = str(manifest["snapshot_id"])
    release = root / "releases" / snapshot_id
    release.parent.mkdir(parents=True)
    staging.rename(release)
    (release / "manifest.json").write_text(
        json.dumps(manifest, sort_keys=True, separators=(",", ":")), encoding="utf-8"
    )
    (root / "current.json").write_text(
        json.dumps({"pointer_version": "1.0.0", "release": f"releases/{snapshot_id}"}),
        encoding="utf-8",
    )
    return release


def _republish_manifest(root: Path, release: Path, manifest: dict[str, object]) -> Path:
    manifest["snapshot_id"] = identity_manifest_content_id(manifest)
    snapshot_id = str(manifest["snapshot_id"])
    manifest_path = release / "manifest.json"
    manifest_path.write_text(json.dumps(manifest), encoding="utf-8")
    replacement = release.parent / snapshot_id
    release.rename(replacement)
    (root / "current.json").write_text(
        json.dumps({"pointer_version": "1.0.0", "release": f"releases/{snapshot_id}"}),
        encoding="utf-8",
    )
    return replacement


def test_curated_adapter_validates_release_and_resolves_every_exact_key(tmp_path: Path) -> None:
    root = tmp_path / "identity"
    _publish(root, [_row()])

    adapter = CuratedSchoolIdentityAdapter(root, allow_external_root=True)

    assert adapter.validate() is True
    assert adapter.provenance().source_kind is SourceKind.REAL_PUBLIC
    assert adapter.provenance().generated is False
    assert adapter.provenance().data_version == adapter.snapshot_id()
    for field, value in (
        (IdentityMatchField.SCHOOL_ID, "SME-RIO-000001"),
        (IdentityMatchField.INEP_ID, "33000001"),
        (IdentityMatchField.SME_DESIGNATION, "0000001"),
    ):
        record = adapter.lookup(field, value)
        assert record is not None
        assert record.identity.school_id == "SME-RIO-000001"
        assert record.identity.source_kind is SourceKind.REAL_PUBLIC
        assert record.identity.school_type == "Escola Municipal"
        assert record.coordinates is not None
        assert record.coordinates.longitude == -43.2


def test_curated_adapter_rejects_duplicate_institutional_identifiers(tmp_path: Path) -> None:
    root = tmp_path / "identity"
    _publish(
        root,
        [
            _row(),
            _row("SME-RIO-000002", inep_id="33000001", sme_designation="0000002", cre=2),
        ],
    )

    with pytest.raises(ValueError, match="institutional identifiers must be unique"):
        CuratedSchoolIdentityAdapter(root, allow_external_root=True)


@pytest.mark.parametrize(
    "row",
    [
        _row(cre=None),
        _row(cre=12),
        _row(inep_id=None, sme_designation=None),
        _row(latitude=-22.9, longitude=None),
        _row(neighborhood=""),
        _row(school_type="   "),
        _row(school_id="A" * 129),
        _row(school_id="SYNTHETIC-SCHOOL-0001"),
    ],
)
def test_curated_adapter_rejects_invalid_domain_rows(
    tmp_path: Path, row: tuple[object, ...]
) -> None:
    root = tmp_path / "identity"
    _publish(root, [row])

    with pytest.raises(ValueError, match="invalid official school identity rows"):
        CuratedSchoolIdentityAdapter(root, allow_external_root=True)


def test_curated_adapter_rejects_asset_tamper_and_extra_files(tmp_path: Path) -> None:
    root = tmp_path / "identity"
    release = _publish(root, [_row()])
    with (release / "school_identity.parquet").open("ab") as stream:
        stream.write(b"tampered")

    with pytest.raises(ValueError, match="hash mismatch"):
        CuratedSchoolIdentityAdapter(root, allow_external_root=True)

    clean_root = tmp_path / "extra"
    clean_release = _publish(clean_root, [_row()])
    (clean_release / "notes.txt").write_text("not governed", encoding="utf-8")
    with pytest.raises(ValueError, match="exactly the governed files"):
        CuratedSchoolIdentityAdapter(clean_root, allow_external_root=True)


def test_curated_adapter_rejects_manifest_source_claims_not_allowed_by_code(tmp_path: Path) -> None:
    root = tmp_path / "identity"
    release = _publish(root, [_row()])
    manifest_path = release / "manifest.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    manifest["source_kind"] = "SYNTHETIC_SCHEMA_FAITHFUL"
    _republish_manifest(root, release, manifest)

    with pytest.raises(ValueError, match="REAL_PUBLIC"):
        CuratedSchoolIdentityAdapter(root, allow_external_root=True)


def test_lookup_reads_the_verified_immutable_cache_not_the_governed_path(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    root = tmp_path / "identity"
    release = _publish(root, [_row()])
    adapter = CuratedSchoolIdentityAdapter(root, allow_external_root=True)
    parquet = release / "school_identity.parquet"
    parquet.unlink()
    _write_parquet(
        parquet,
        [
            _row(
                school_id="SME-RIO-999999",
                inep_id="33999999",
                sme_designation="9999999",
            )
        ],
    )
    monkeypatch.setattr(adapter, "_assert_asset_current", lambda: None)

    original = adapter.lookup(IdentityMatchField.INEP_ID, "33000001")
    injected = adapter.lookup(IdentityMatchField.INEP_ID, "33999999")

    assert original is not None
    assert original.identity.school_id == "SME-RIO-000001"
    assert injected is None


def test_curated_adapter_revalidates_content_before_every_lookup(tmp_path: Path) -> None:
    root = tmp_path / "identity"
    release = _publish(root, [_row()])
    adapter = CuratedSchoolIdentityAdapter(root, allow_external_root=True)
    with (release / "school_identity.parquet").open("ab") as stream:
        stream.write(b"tampered-after-startup")

    assert adapter.validate() is False
    with pytest.raises(ValueError, match="hash mismatch"):
        adapter.lookup(IdentityMatchField.INEP_ID, "33000001")


def test_curated_adapter_requires_strict_integer_row_count(tmp_path: Path) -> None:
    root = tmp_path / "identity"
    release = _publish(root, [_row()])
    manifest_path = release / "manifest.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    manifest["files"]["school_identity.parquet"]["row_count"] = True
    _republish_manifest(root, release, manifest)

    with pytest.raises(ValueError, match="row_count must be a positive integer"):
        CuratedSchoolIdentityAdapter(root, allow_external_root=True)


def test_curated_adapter_rejects_symlinked_releases_directory(tmp_path: Path) -> None:
    external = tmp_path / "external"
    _publish(external, [_row()])
    governed = tmp_path / "governed"
    governed.mkdir()
    (governed / "current.json").write_text(
        (external / "current.json").read_text(encoding="utf-8"), encoding="utf-8"
    )
    try:
        (governed / "releases").symlink_to(
            external / "releases", target_is_directory=True
        )
    except OSError:
        pytest.skip("symlink creation is unavailable in this Windows environment")

    with pytest.raises(ValueError, match="symlink|reparse|governed"):
        CuratedSchoolIdentityAdapter(governed, allow_external_root=True)
