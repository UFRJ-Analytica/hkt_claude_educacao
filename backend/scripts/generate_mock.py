"""Deterministic, aggregate-only synthetic dataset generator.

A complete dataset is built and validated in a sibling staging directory before
it is published. Publication is serialized by an OS lock: immutable releases are
installed first, then a small pointer file is atomically replaced. Readers thus
resolve either the complete previous release or the complete new release.
"""

import argparse
import csv
import hashlib
import json
import os
import random
import shutil
import tempfile
from collections.abc import Iterator, Mapping, Sequence
from contextlib import contextmanager
from pathlib import Path
from typing import Any, TypeAlias

import duckdb

from app.catalog.loader import load_scenario
from app.catalog.models import Scenario
from app.data_access.dataset_contract import (
    GOVERNED_ASSET_SOURCE_KINDS,
    manifest_content_id,
)
from app.data_access.duckdb_adapter import validate_dataset_release

FILES = {
    Path(name).stem: source_kind for name, source_kind in GOVERNED_ASSET_SOURCE_KINDS.items()
}
GENERATOR_VERSION = "3.2.0"
POINTER_VERSION = "1.0.0"
_DEFAULT_OUTPUT = (Path(__file__).parents[2] / "data/generated").resolve()
_Rows: TypeAlias = list[tuple[object, ...]]
_TableDefinition: TypeAlias = tuple[str, _Rows]
def _insert_rows(
    connection: duckdb.DuckDBPyConnection,
    table: str,
    rows: Sequence[Sequence[object]],
    staging: Path,
) -> None:
    """Bulk-load deterministic rows through a governed temporary CSV."""
    if table not in FILES:
        raise ValueError("table is outside the generator allowlist")
    if not rows:
        raise ValueError("generated table cannot be empty")
    width = len(rows[0])
    if width == 0 or any(len(row) != width for row in rows):
        raise ValueError("generated rows must have a stable non-zero width")
    load_path = staging / f".load-{table}.csv"
    try:
        with load_path.open("x", encoding="utf-8", newline="") as stream:
            writer = csv.writer(stream, lineterminator="\n")
            writer.writerows(
                tuple("\\N" if value is None else value for value in row) for row in rows
            )
            stream.flush()
            os.fsync(stream.fileno())
        escaped = str(load_path).replace("'", "''")
        connection.execute(
            f"COPY {table} FROM '{escaped}' "
            "(FORMAT CSV, HEADER FALSE, NULL '\\N', AUTO_DETECT FALSE)"
        )
    finally:
        load_path.unlink(missing_ok=True)


class GenerationLockedError(RuntimeError):
    """Raised when another process is already generating the same dataset."""


def _hash(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def _canonical_json(value: object) -> str:
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":"))


def _normalized_parameters(parameters: Mapping[str, object]) -> dict[str, Any]:
    """Return JSON primitives with a stable key order and numeric representation."""
    normalized = json.loads(_canonical_json(dict(parameters)))
    if not isinstance(normalized, dict):  # pragma: no cover - guaranteed by the model
        raise TypeError("scenario parameters must be a mapping")
    return {str(key): value for key, value in sorted(normalized.items())}


@contextmanager
def _exclusive_lock(output_dir: Path) -> Iterator[None]:
    """Hold a non-blocking, process-wide file lock for one output directory."""
    lock_path = output_dir.parent / f".{output_dir.name}.lock"
    lock_path.parent.mkdir(parents=True, exist_ok=True)
    stream = lock_path.open("a+b")
    try:
        stream.seek(0, os.SEEK_END)
        if stream.tell() == 0:
            stream.write(b"0")
            stream.flush()
        stream.seek(0)
        try:
            if os.name == "nt":
                import msvcrt

                msvcrt.locking(stream.fileno(), msvcrt.LK_NBLCK, 1)
            else:
                import fcntl as posix_lock

                posix_lock.flock(  # type: ignore[attr-defined]
                    stream.fileno(),
                    posix_lock.LOCK_EX  # type: ignore[attr-defined]
                    | posix_lock.LOCK_NB,  # type: ignore[attr-defined]
                )
        except OSError as error:
            raise GenerationLockedError(
                f"generation already in progress for {output_dir}"
            ) from error
        try:
            yield
        finally:
            stream.seek(0)
            if os.name == "nt":
                import msvcrt

                msvcrt.locking(stream.fileno(), msvcrt.LK_UNLCK, 1)
            else:
                import fcntl as posix_lock

                posix_lock.flock(  # type: ignore[attr-defined]
                    stream.fileno(),
                    posix_lock.LOCK_UN,  # type: ignore[attr-defined]
                )
    finally:
        stream.close()


def _remove_tree(path: Path) -> None:
    if path.exists():
        shutil.rmtree(path)


def _sync_directory(path: Path) -> None:
    """Persist directory metadata where the platform supports directory fsync."""
    if os.name == "nt":
        return
    descriptor = os.open(path, os.O_RDONLY)
    try:
        os.fsync(descriptor)
    finally:
        os.close(descriptor)


def _sync_release(staging: Path) -> None:
    """Flush every governed release file before the directory becomes publishable."""
    for path in staging.iterdir():
        if path.is_file():
            with path.open("r+b") as stream:
                os.fsync(stream.fileno())
    _sync_directory(staging)


def _recover_interrupted_publication(output_dir: Path) -> None:
    """Recover the old layout and remove unpublished temporary artifacts."""
    parent = output_dir.parent
    backups = sorted(
        parent.glob(f".{output_dir.name}.backup-*"),
        key=lambda path: path.stat().st_mtime_ns,
        reverse=True,
    )
    if not output_dir.exists() and backups:
        os.replace(backups.pop(0), output_dir)
    for backup in backups:
        _remove_tree(backup)
    for staging in parent.glob(f".{output_dir.name}.staging-*"):
        _remove_tree(staging)
    if output_dir.is_dir():
        for pointer_tmp in output_dir.glob(".current-*.tmp"):
            pointer_tmp.unlink(missing_ok=True)


def _publish(staging: Path, output_dir: Path, generation_id: str) -> None:
    """Install an immutable release and atomically switch the current pointer."""
    if len(generation_id) != 64 or any(
        character not in "0123456789abcdef" for character in generation_id
    ):
        raise ValueError("generation id is not a lowercase SHA-256")
    output_dir.mkdir(parents=True, exist_ok=True)
    releases = output_dir / "releases"
    releases.mkdir(exist_ok=True)
    release = releases / generation_id
    if release.exists():
        validate_dataset_release(release, expected_generation_id=generation_id)
        existing_manifest = json.loads((release / "manifest.json").read_text(encoding="utf-8"))
        staged_manifest = json.loads((staging / "manifest.json").read_text(encoding="utf-8"))
        if existing_manifest != staged_manifest:
            raise RuntimeError("immutable release collision")
        _remove_tree(staging)
    else:
        _sync_release(staging)
        os.replace(staging, release)
        _sync_directory(releases)

    pointer = {
        "pointer_version": POINTER_VERSION,
        "release": f"releases/{generation_id}",
    }
    pointer_bytes = (json.dumps(pointer, sort_keys=True, separators=(",", ":")) + "\n").encode()
    pointer_tmp = output_dir / f".current-{os.getpid()}-{generation_id}.tmp"
    try:
        with pointer_tmp.open("xb") as stream:
            stream.write(pointer_bytes)
            stream.flush()
            os.fsync(stream.fileno())
        os.replace(pointer_tmp, output_dir / "current.json")
        _sync_directory(output_dir)
    finally:
        pointer_tmp.unlink(missing_ok=True)


def _build_staged_dataset(
    staging: Path,
    scenario: Scenario,
    reproducibility: Mapping[str, object],
    school_count: int,
) -> dict[str, Any]:
    """Generate and validate all Parquets, then write the manifest last."""
    rng = random.Random(f"{scenario.seed}:{scenario.version}")
    connection = duckdb.connect(":memory:")
    try:
        schools = [
            (
                f"SYNTHETIC-SCHOOL-{index:04d}",
                f"Escola Sintética {index:04d}",
                None,
                None,
                ((index - 1) % 11) + 1,
                f"Bairro Sintético {((index - 1) % 15) + 1:02d}",
                -22.98 + rng.random() * 0.25,
                -43.70 + rng.random() * 0.50,
                "SYNTHETIC_MUNICIPAL",
                "SYNTHETIC",
                "SYNTHETIC",
                "SYNTHETIC",
            )
            for index in range(1, school_count + 1)
        ]
        connection.execute(
            "CREATE TABLE schools(school_id VARCHAR, school_name VARCHAR, inep_id VARCHAR, "
            "sme_designation VARCHAR, cre INTEGER, neighborhood VARCHAR, latitude DOUBLE, "
            "longitude DOUBLE, dependency VARCHAR, location_source VARCHAR, "
            "match_method VARCHAR, location_quality VARCHAR)"
        )
        _insert_rows(connection, "schools", schools, staging)
        assessment: _Rows = []
        attendance: _Rows = []
        capacity: _Rows = []
        shortage: _Rows = []
        quality: _Rows = []
        p = scenario.parameters
        for school_index, school in enumerate(schools, 1):
            school_id = school[0]
            base_attendance = 0.83 + rng.random() * 0.12
            for month in range(1, 7):
                period = f"2026-{month:02d}-01"
                expected = 1800 + school_index * 11
                rate = min(
                    0.99,
                    max(0.5, base_attendance + p.attendance_trend * month),
                )
                present = round(expected * rate)
                attendance.append((school_id, period, present, expected))
                enrolled = 300 + school_index * 7
                seats = round(enrolled / (0.78 + rng.random() * 0.12 + p.capacity_pressure))
                capacity.append((school_id, period, enrolled, max(seats, 1)))
                for subject_index, subject in enumerate(("language", "mathematics")):
                    eligible = 80 + school_index
                    participants = eligible - ((school_index + month + subject_index) % 6)
                    score = (
                        205 + school_index * 0.4 + subject_index * 3 + p.assessment_trend * month
                    )
                    assessment.append(
                        (school_id, period, subject, round(score, 2), participants, eligible)
                    )
                    required = 160.0
                    missing = (school_index + month + subject_index) % 9 * p.shortage_factor
                    shortage.append((school_id, period, subject, round(missing, 2), required))
            coverage = 1.0 - p.quality_gap if school_index % 3 == 0 else 1.0
            quality.append(
                (
                    school_id,
                    "aggregate_coverage",
                    round(coverage, 2),
                    "DEGRADED" if coverage < 0.8 else "OK",
                )
            )
        definitions: dict[str, _TableDefinition] = {
            "assessment_facts": (
                "school_id VARCHAR, period DATE, subject VARCHAR, score DOUBLE, "
                "participants INTEGER, eligible INTEGER",
                assessment,
            ),
            "attendance_facts": (
                "school_id VARCHAR, period DATE, present_count INTEGER, expected_count INTEGER",
                attendance,
            ),
            "capacity_facts": (
                "school_id VARCHAR, period DATE, enrolled INTEGER, capacity INTEGER",
                capacity,
            ),
            "teacher_shortage_facts": (
                "school_id VARCHAR, period DATE, subject VARCHAR, shortage_hours DOUBLE, "
                "required_hours DOUBLE",
                shortage,
            ),
            "quality_observations": (
                "school_id VARCHAR, check_id VARCHAR, coverage DOUBLE, status VARCHAR",
                quality,
            ),
        }
        if set(definitions) | {"schools"} != set(FILES):
            raise RuntimeError("generator table allowlist is inconsistent")
        for table, (schema, rows) in definitions.items():
            connection.execute(f"CREATE TABLE {table}({schema})")
            _insert_rows(connection, table, rows, staging)

        manifest_files: dict[str, Any] = {}
        for table, source_kind in FILES.items():
            destination = staging / f"{table}.parquet"
            escaped = str(destination).replace("'", "''")
            connection.execute(
                f"COPY (SELECT * FROM {table} ORDER BY ALL) TO '{escaped}' "
                "(FORMAT PARQUET, COMPRESSION ZSTD)"
            )
            table_schema = [
                {"name": row[0], "type": row[1]}
                for row in connection.execute(f"DESCRIBE {table}").fetchall()
            ]
            count_row = connection.execute(f"SELECT count(*) FROM {table}").fetchone()
            if count_row is None:
                raise RuntimeError("generated table row count returned no row")
            if not destination.is_file() or destination.stat().st_size == 0:
                raise RuntimeError(f"generated file is missing or empty: {destination.name}")
            parquet_count = connection.execute(
                "SELECT count(*) FROM read_parquet(?)", [str(destination)]
            ).fetchone()
            if parquet_count is None or parquet_count[0] != count_row[0]:
                raise RuntimeError(
                    f"generated file failed row-count validation: {destination.name}"
                )
            manifest_files[destination.name] = {
                "sha256": _hash(destination),
                "row_count": count_row[0],
                "schema": table_schema,
                "source_kind": source_kind,
            }
    finally:
        connection.close()

    if {path.name for path in staging.glob("*.parquet")} != {f"{table}.parquet" for table in FILES}:
        raise RuntimeError("staging does not contain exactly the governed Parquet set")
    manifest_without_id: dict[str, Any] = {
        "manifest_version": "2.0.0",
        "scenario": scenario.id,
        "scenario_version": scenario.version,
        "seed": scenario.seed,
        **reproducibility,
        "files": manifest_files,
    }
    manifest: dict[str, Any] = {
        **manifest_without_id,
        "generation_id": manifest_content_id(manifest_without_id),
    }
    manifest_path = staging / "manifest.json"
    manifest_path.write_text(
        json.dumps(manifest, ensure_ascii=False, sort_keys=True, indent=2) + "\n",
        encoding="utf-8",
    )
    if json.loads(manifest_path.read_text(encoding="utf-8")) != manifest:
        raise RuntimeError("manifest validation failed")
    return manifest


def generate_mock(
    output_dir: Path,
    scenario_path: Path,
    *,
    allow_external_output: bool = False,
    school_count: int = 30,
    release_namespace: str = "default",
) -> dict[str, Any]:
    output_dir = output_dir.resolve()
    if not allow_external_output and output_dir != _DEFAULT_OUTPUT:
        raise ValueError(
            "output must be data/generated unless external output is explicitly authorized"
        )
    if not 1 <= school_count <= 2000:
        raise ValueError("school_count must be between 1 and 2000")
    if school_count != 30 and not allow_external_output:
        raise ValueError("custom school_count requires external output authorization")
    scenario_path = scenario_path.resolve(strict=True)
    scenario = load_scenario(scenario_path)
    if release_namespace not in {"default", "scenario"}:
        raise ValueError("release_namespace must be default or scenario")
    if release_namespace == "default":
        publish_dir = output_dir
    else:
        publish_dir = output_dir / "scenarios" / scenario.id
    parameters = _normalized_parameters(scenario.parameters.model_dump())
    identity: dict[str, object] = {
        "duckdb_version": duckdb.__version__,
        "generator_version": GENERATOR_VERSION,
        "parameters": parameters,
        "scenario_sha256": _hash(scenario_path),
        "school_count": school_count,
        "release_namespace": release_namespace,
    }
    reproducibility: dict[str, object] = identity

    publish_dir.parent.mkdir(parents=True, exist_ok=True)
    with _exclusive_lock(publish_dir):
        _recover_interrupted_publication(publish_dir)
        staging = Path(
            tempfile.mkdtemp(prefix=f".{publish_dir.name}.staging-", dir=publish_dir.parent)
        )
        try:
            manifest = _build_staged_dataset(staging, scenario, reproducibility, school_count)
            _publish(staging, publish_dir, str(manifest["generation_id"]))
        finally:
            _remove_tree(staging)
        return manifest


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Generate deterministic synthetic aggregate Parquet files"
    )
    parser.add_argument("--output", type=Path, default=_DEFAULT_OUTPUT)
    parser.add_argument(
        "--scenario",
        type=Path,
        default=Path(__file__).parents[2] / "data/scenarios/network_improving.yml",
    )
    parser.add_argument(
        "--release-namespace",
        choices=("default", "scenario"),
        default="default",
        help=(
            "default publica em output/current.json; "
            "scenario publica em output/scenarios/<id>/current.json"
        ),
    )
    args = parser.parse_args()
    manifest = generate_mock(args.output, args.scenario, release_namespace=args.release_namespace)
    print(
        json.dumps(
            {
                "output": str(args.output.resolve()),
                "scenario": manifest["scenario"],
                "generation_id": manifest["generation_id"],
                "files": len(manifest["files"]),
            },
            ensure_ascii=False,
        )
    )


if __name__ == "__main__":
    main()
