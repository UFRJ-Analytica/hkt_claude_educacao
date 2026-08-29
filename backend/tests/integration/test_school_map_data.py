import hashlib
import json
from pathlib import Path

import duckdb
import pytest

from app.contracts.data import QualityStatus
from app.contracts.provenance import SourceKind
from app.data_access.dataset_contract import manifest_content_id
from app.data_access.duckdb_adapter import DuckDBDataAccess
from app.schools.contracts import MapBounds, MapQuery
from app.schools.service import SchoolMapService
from scripts.generate_mock import generate_mock

ROOT = Path(__file__).parents[3]
SCENARIO = ROOT / "data/scenarios/network_improving.yml"


@pytest.fixture
def generated(tmp_path: Path) -> Path:
    root = tmp_path / "generated"
    generate_mock(root, SCENARIO, allow_external_output=True)
    return root


def test_school_schema_and_identity_are_synthetic_and_deterministic(tmp_path: Path) -> None:
    one, two = tmp_path / "one", tmp_path / "two"
    first = generate_mock(one, SCENARIO, allow_external_output=True)
    second = generate_mock(two, SCENARIO, allow_external_output=True)
    assert first["generator_version"] == "3.2.0"
    assert first["generation_id"] == second["generation_id"]
    release = one / json.loads((one / "current.json").read_text())["release"]
    with duckdb.connect(":memory:") as db:
        rows = db.execute(
            "SELECT * FROM read_parquet(?) ORDER BY school_id", [str(release / "schools.parquet")]
        ).fetchall()
        columns = [item[0] for item in db.description]
    assert columns == [
        "school_id",
        "school_name",
        "inep_id",
        "sme_designation",
        "cre",
        "neighborhood",
        "latitude",
        "longitude",
        "dependency",
        "location_source",
        "match_method",
        "location_quality",
    ]
    assert len(rows) == 30
    assert rows[0][0].startswith("SYNTHETIC-SCHOOL-")
    assert rows[0][1].startswith("Escola Sintética")
    assert rows[0][2] is None and rows[0][3] is None
    assert {row[4] for row in rows} == set(range(1, 12))
    assert all(row[5].startswith("Bairro Sintético") for row in rows)
    assert all(row[9:12] == ("SYNTHETIC", "SYNTHETIC", "SYNTHETIC") for row in rows)


def test_map_filters_metrics_profile_and_snapshot_pinning(generated: Path) -> None:
    access = DuckDBDataAccess(generated, allow_external_root=True)
    service = SchoolMapService(access)
    snapshot = access.snapshot_id()
    collection = service.get_map(MapQuery(limit=2000))
    assert collection.snapshot_id == snapshot
    assert collection.provenance.data_version == snapshot
    assert collection.available_cres == tuple(range(1, 12))
    assert collection.coverage.total == 30
    assert collection.coverage.returned == 30
    assert not collection.coverage.truncated
    feature = collection.features[0]
    school_id = feature.properties.identity.school_id
    profile = service.get_profile(school_id)
    assert profile is not None and profile.identity.school_id == school_id
    assert profile.snapshot_id == snapshot
    assert profile.provenance.data_version == snapshot
    assert profile.identity.inep_id is None
    assert profile.identity.sme_designation is None
    assert service.get_profile("unknown-school") is None
    assert profile.metrics["attendance_rate"].source_kind is SourceKind.SYNTHETIC_SCHEMA_FAITHFUL
    assert profile.metrics["capacity_utilization"].source_kind is SourceKind.SYNTHETIC_INFERRED
    assert all(metric.evidence_id for metric in profile.metrics.values())
    assert all(snapshot in (metric.evidence_id or "") for metric in profile.metrics.values())
    assert all(metric.provenance.data_version == snapshot for metric in profile.metrics.values())
    assert all(metric.quality_status is QualityStatus.OK for metric in profile.metrics.values())

    cre = profile.identity.cre
    filtered = service.get_map(MapQuery(cre=cre, limit=2000))
    assert filtered.features
    assert {item.properties.identity.cre for item in filtered.features} == {cre}
    point = profile.coordinates
    assert point is not None
    bounded = service.get_map(
        MapQuery(
            bounds=MapBounds(
                west=point.longitude - 0.00001,
                south=point.latitude - 0.00001,
                east=point.longitude + 0.00001,
                north=point.latitude + 0.00001,
            ),
            limit=2000,
        )
    )
    assert [item.properties.identity.school_id for item in bounded.features] == [school_id]

    # The adapter pins the release at construction even if the pointer is replaced.
    pointer = generated / "current.json"
    pointer.write_text(json.dumps({"pointer_version": "1.0.0", "release": "releases/" + "f" * 64}))
    assert access.snapshot_id() == snapshot
    assert service.get_profile(school_id) is not None


def test_latest_period_numeric_joins_match_independent_sql(generated: Path) -> None:
    access = DuckDBDataAccess(generated, allow_external_root=True)
    row = access.school_profile("SYNTHETIC-SCHOOL-0001")
    assert row is not None
    release = generated / json.loads((generated / "current.json").read_text())["release"]
    with duckdb.connect(":memory:") as db:
        expected_row = db.execute(
            "SELECT sum(present_count)::DOUBLE/nullif(sum(expected_count),0) "
            "FROM read_parquet(?) WHERE school_id=? AND period="
            "(SELECT max(period) FROM read_parquet(?) WHERE school_id=?)",
            [
                str(release / "attendance_facts.parquet"),
                "SYNTHETIC-SCHOOL-0001",
                str(release / "attendance_facts.parquet"),
                "SYNTHETIC-SCHOOL-0001",
            ],
        ).fetchone()
        assert expected_row is not None
        expected = expected_row[0]
    assert row["attendance_rate"] == pytest.approx(expected)


def test_missing_coordinates_count_before_pagination(tmp_path: Path) -> None:
    root = tmp_path / "fixture"
    generate_mock(root, SCENARIO, allow_external_output=True)
    pointer = json.loads((root / "current.json").read_text())
    release = root / pointer["release"]
    source = release / "schools.parquet"
    replacement = release / "schools-new.parquet"
    with duckdb.connect(":memory:") as db:
        source_sql = str(source).replace("'", "''")
        replacement_sql = str(replacement).replace("'", "''")
        db.execute(
            "COPY (SELECT * REPLACE ("
            "CASE WHEN school_id='SYNTHETIC-SCHOOL-0001' THEN NULL ELSE latitude END "
            "AS latitude, CASE WHEN school_id='SYNTHETIC-SCHOOL-0001' THEN NULL "
            "ELSE longitude END AS longitude, "
            "CASE WHEN school_id='SYNTHETIC-SCHOOL-0001' THEN 'MISSING' "
            "ELSE location_quality END AS location_quality) "
            f"FROM read_parquet('{source_sql}')) TO '{replacement_sql}' (FORMAT PARQUET)"
        )
    replacement.replace(source)
    manifest_path = release / "manifest.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    manifest["files"]["schools.parquet"]["sha256"] = hashlib.sha256(source.read_bytes()).hexdigest()
    manifest["generation_id"] = manifest_content_id(manifest)
    manifest_path.write_text(json.dumps(manifest), encoding="utf-8")
    new_release = release.parent / manifest["generation_id"]
    release.rename(new_release)
    (root / "current.json").write_text(
        json.dumps(
            {"pointer_version": "1.0.0", "release": f"releases/{manifest['generation_id']}"}
        ),
        encoding="utf-8",
    )
    collection = SchoolMapService(DuckDBDataAccess(root, allow_external_root=True)).get_map(
        MapQuery(limit=5)
    )
    assert collection.coverage.total == 30
    assert collection.coverage.geolocated == 29
    assert collection.coverage.missing == 1
    assert collection.coverage.returned == 5
    assert collection.coverage.truncated
    assert len(collection.features) == 5

    # A bbox narrows geolocated points only; missing schools stay in their CRE scope.
    access = DuckDBDataAccess(root, allow_external_root=True)
    point = access.school_profile("SYNTHETIC-SCHOOL-0012")
    assert point is not None
    bounded = SchoolMapService(access).get_map(
        MapQuery(
            cre=1,
            bounds=MapBounds(
                west=float(point["longitude"]) - 0.00001,
                south=float(point["latitude"]) - 0.00001,
                east=float(point["longitude"]) + 0.00001,
                north=float(point["latitude"]) + 0.00001,
            ),
        )
    )
    assert (
        bounded.coverage.total,
        bounded.coverage.geolocated,
        bounded.coverage.missing,
    ) == (2, 1, 1)
    assert bounded.coverage.coverage_ratio == 0.5
    assert any("sem coordenadas" in limitation for limitation in bounded.limitations)


def test_scale_1549_returns_all_schools_without_truncation(tmp_path: Path) -> None:
    root = tmp_path / "scale"
    manifest = generate_mock(root, SCENARIO, allow_external_output=True, school_count=1549)
    collection = SchoolMapService(DuckDBDataAccess(root, allow_external_root=True)).get_map()
    assert manifest["school_count"] == 1549
    assert collection.available_cres == tuple(range(1, 12))
    assert collection.coverage.total == 1549
    assert collection.coverage.returned == 1549
    assert not collection.coverage.truncated
