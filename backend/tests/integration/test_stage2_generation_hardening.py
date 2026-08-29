import hashlib
import json
import os
from pathlib import Path
from typing import Any

import pytest

import scripts.generate_mock as generator
from app.data_access.dataset_contract import manifest_content_id
from app.data_access.duckdb_adapter import DuckDBDataAccess, validate_dataset_release

ROOT = Path(__file__).parents[3]
SCENARIO = ROOT / "data/scenarios/network_improving.yml"


def _snapshot(directory: Path) -> dict[str, bytes]:
    return {path.name: path.read_bytes() for path in directory.iterdir() if path.is_file()}


def _current_release(output: Path) -> Path:
    pointer = json.loads((output / "current.json").read_text(encoding="utf-8"))
    release = pointer.get("release")
    assert isinstance(release, str)
    return output / release


def test_manifest_captures_all_reproducibility_inputs(tmp_path: Path) -> None:
    output = tmp_path / "generated"
    manifest = generator.generate_mock(output, SCENARIO, allow_external_output=True)

    assert manifest["scenario_sha256"] == hashlib.sha256(SCENARIO.read_bytes()).hexdigest()
    assert manifest["parameters"] == {
        "assessment_trend": 0.8,
        "attendance_trend": 0.004,
        "capacity_pressure": 0.0,
        "quality_gap": 0.0,
        "shortage_factor": 0.7,
    }
    assert manifest["generator_version"] == generator.GENERATOR_VERSION
    assert manifest["duckdb_version"]
    assert manifest["generation_id"] == manifest_content_id(manifest)
    published_manifest = (_current_release(output) / "manifest.json").read_text(encoding="utf-8")
    assert json.loads(published_manifest) == manifest


def test_reader_observes_complete_old_or_new_release_during_promotion(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    output = tmp_path / "generated"
    first = generator.generate_mock(output, SCENARIO, allow_external_output=True)
    old_release = _current_release(output)
    old_access = DuckDBDataAccess(output, allow_external_root=True)
    old_total = old_access.aggregate("attendance_facts", "present_count", "sum")
    alternate = ROOT / "data/scenarios/attendance_decline.yml"
    observed_during_swap: tuple[Path, float | None] | None = None
    real_replace = os.replace

    def observe_before_pointer_swap(
        source: str | bytes | os.PathLike[str] | os.PathLike[bytes],
        destination: str | bytes | os.PathLike[str] | os.PathLike[bytes],
    ) -> None:
        nonlocal observed_during_swap
        destination_path = Path(os.fsdecode(destination))
        if destination_path == output / "current.json":
            concurrent = DuckDBDataAccess(output, allow_external_root=True)
            observed_during_swap = (
                concurrent._root,  # noqa: SLF001 - integration assertion of one release snapshot
                concurrent.aggregate("attendance_facts", "present_count", "sum"),
            )
        real_replace(source, destination)

    monkeypatch.setattr(os, "replace", observe_before_pointer_swap)
    second = generator.generate_mock(output, alternate, allow_external_output=True)

    new_release = _current_release(output)
    new_access = DuckDBDataAccess(output, allow_external_root=True)
    assert first["generation_id"] != second["generation_id"]
    assert observed_during_swap == (old_release, old_total)
    assert new_release != old_release
    assert new_access._root == new_release  # noqa: SLF001 - release snapshot assertion
    assert set(path.name for path in new_release.glob("*.parquet")) == {
        f"{table}.parquet" for table in generator.FILES
    }
    # A reader which resolved before promotion remains on the immutable old release.
    assert old_access._root == old_release  # noqa: SLF001
    assert old_access.aggregate("attendance_facts", "present_count", "sum") == old_total


def test_failure_while_building_preserves_previous_published_set(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    output = tmp_path / "generated"
    generator.generate_mock(output, SCENARIO, allow_external_output=True)
    before = _snapshot(output)

    def fail_build(*args: object, **kwargs: object) -> dict[str, Any]:
        raise RuntimeError("injected intermediate failure")

    monkeypatch.setattr(generator, "_build_staged_dataset", fail_build)
    with pytest.raises(RuntimeError, match="injected intermediate failure"):
        generator.generate_mock(output, SCENARIO, allow_external_output=True)

    assert _snapshot(output) == before
    assert not list(tmp_path.glob(".generated.staging-*"))
    assert not list(tmp_path.glob(".generated.backup-*"))


def test_failed_pointer_promotion_keeps_previous_set_current(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    output = tmp_path / "generated"
    generator.generate_mock(output, SCENARIO, allow_external_output=True)
    before = _snapshot(output)
    old_release = _current_release(output)
    real_replace = os.replace

    def fail_pointer_promotion(
        source: str | bytes | os.PathLike[str] | os.PathLike[bytes],
        destination: str | bytes | os.PathLike[str] | os.PathLike[bytes],
    ) -> None:
        source_path = Path(os.fsdecode(source))
        destination_path = Path(os.fsdecode(destination))
        if source_path.name.startswith(".current-") and destination_path == output / "current.json":
            raise OSError("injected promotion failure")
        real_replace(source, destination)

    monkeypatch.setattr(os, "replace", fail_pointer_promotion)
    alternate = ROOT / "data/scenarios/attendance_decline.yml"
    with pytest.raises(OSError, match="injected promotion failure"):
        generator.generate_mock(output, alternate, allow_external_output=True)

    assert _snapshot(output) == before
    assert _current_release(output) == old_release
    assert DuckDBDataAccess(output, allow_external_root=True).list_schools(limit=1)
    assert not list(tmp_path.glob(".generated.staging-*"))
    assert not list(output.glob(".current-*.tmp"))
    assert not list(tmp_path.glob(".generated.backup-*"))


@pytest.mark.parametrize(
    "release",
    ["../outside", "releases/../outside", "C:/outside", "releases/not-a-hash"],
)
def test_reader_rejects_pointer_escape(tmp_path: Path, release: str) -> None:
    output = tmp_path / "generated"
    output.mkdir()
    (output / "current.json").write_text(
        json.dumps({"pointer_version": generator.POINTER_VERSION, "release": release}),
        encoding="utf-8",
    )

    with pytest.raises(ValueError, match="pointer"):
        DuckDBDataAccess(output, allow_external_root=True)


def test_lock_is_exclusive_and_denied_output_is_not_touched(tmp_path: Path) -> None:
    output = tmp_path / "generated"
    output.parent.mkdir(parents=True, exist_ok=True)
    with generator._exclusive_lock(output), pytest.raises(generator.GenerationLockedError):
        generator.generate_mock(output, SCENARIO, allow_external_output=True)

    denied = tmp_path / "denied" / "generated"
    with pytest.raises(ValueError, match="explicitly authorized"):
        generator.generate_mock(denied, SCENARIO)
    assert not denied.parent.exists()


def test_parquet_hashes_remain_deterministic(tmp_path: Path) -> None:
    first = generator.generate_mock(tmp_path / "one", SCENARIO, allow_external_output=True)
    second = generator.generate_mock(tmp_path / "two", SCENARIO, allow_external_output=True)

    assert len(first["files"]) == 6
    assert {name: value["sha256"] for name, value in first["files"].items()} == {
        name: value["sha256"] for name, value in second["files"].items()
    }


def test_reader_and_reuse_reject_corrupt_published_asset(tmp_path: Path) -> None:
    output = tmp_path / "generated"
    generator.generate_mock(output, SCENARIO, allow_external_output=True)
    release = _current_release(output)
    asset = release / "schools.parquet"
    with asset.open("ab") as stream:
        stream.write(b"corrupt")

    with pytest.raises(ValueError, match="hash mismatch"):
        DuckDBDataAccess(output, allow_external_root=True)
    with pytest.raises(ValueError, match="hash mismatch"):
        generator.generate_mock(output, SCENARIO, allow_external_output=True)


def test_reader_rejects_manifest_metadata_and_extra_asset(tmp_path: Path) -> None:
    output = tmp_path / "generated"
    generator.generate_mock(output, SCENARIO, allow_external_output=True)
    release = _current_release(output)
    manifest_path = release / "manifest.json"
    original = json.loads(manifest_path.read_text(encoding="utf-8"))
    manifest = json.loads(json.dumps(original))
    manifest["files"]["schools.parquet"]["row_count"] += 1
    manifest_path.write_text(json.dumps(manifest), encoding="utf-8")
    with pytest.raises(ValueError, match="content does not match generation id"):
        DuckDBDataAccess(output, allow_external_root=True)

    manifest["generation_id"] = manifest_content_id(manifest)
    manifest_path.write_text(json.dumps(manifest), encoding="utf-8")
    with pytest.raises(ValueError, match="metadata mismatch"):
        validate_dataset_release(release)

    manifest_path.write_text(json.dumps(original), encoding="utf-8")
    (release / "unexpected.txt").write_text("not governed", encoding="utf-8")
    with pytest.raises(ValueError, match="exactly the governed files"):
        DuckDBDataAccess(output, allow_external_root=True)


def test_reader_enforces_independent_schema_and_source_kind(tmp_path: Path) -> None:
    for field, invalid, expected in (
        ("source_kind", "REAL_PUBLIC", "governed source kind"),
        ("schema", [{"name": "school_id", "type": "VARCHAR"}], "governed schema"),
    ):
        output = tmp_path / field
        generator.generate_mock(output, SCENARIO, allow_external_output=True)
        release = _current_release(output)
        manifest_path = release / "manifest.json"
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        manifest["files"]["schools.parquet"][field] = invalid
        manifest["generation_id"] = manifest_content_id(manifest)
        manifest_path.write_text(json.dumps(manifest), encoding="utf-8")
        with pytest.raises(ValueError, match=expected):
            validate_dataset_release(release)


def test_school_count_is_bounded_authorized_and_part_of_identity(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    for invalid in (0, 2001):
        with pytest.raises(ValueError, match="between 1 and 2000"):
            generator.generate_mock(
                tmp_path / str(invalid),
                SCENARIO,
                allow_external_output=True,
                school_count=invalid,
            )
    monkeypatch.setattr(generator, "_DEFAULT_OUTPUT", tmp_path / "default")
    with pytest.raises(ValueError, match="requires external output authorization"):
        generator.generate_mock(tmp_path / "default", SCENARIO, school_count=31)

    thirty = generator.generate_mock(tmp_path / "thirty", SCENARIO, allow_external_output=True)
    thirty_one = generator.generate_mock(
        tmp_path / "thirty-one", SCENARIO, allow_external_output=True, school_count=31
    )
    assert thirty["school_count"] == 30
    assert thirty["generation_id"] != thirty_one["generation_id"]
