import json
import sqlite3
import sys
from datetime import UTC, datetime, timedelta
from pathlib import Path

import pytest
from pydantic import ValidationError

from app.catalog.loader import load_metadata_catalog, load_scenario, load_source_registry
from app.composition import initial_modules
from app.contracts.data import IndicatorObservation, QualityStatus
from app.contracts.provenance import Provenance, SourceKind
from app.control.sqlite_repository import InvalidTransitionError, SQLiteControlRepository
from app.data_access.duckdb_adapter import DuckDBDataAccess
from app.metrics.catalog import METRICS
from app.metrics.service import MetricsService
from app.profiling.schema_profiler import ProfileLimits, SchemaProfiler
from app.quality.service import QualityService
from scripts.generate_mock import generate_mock
from scripts.generate_mock import main as generate_mock_main

ROOT = Path(__file__).parents[3]


def test_catalog_and_scenarios_are_valid() -> None:
    catalog = load_metadata_catalog(ROOT / "data/catalog/official_metadata.yml")
    registry = load_source_registry(ROOT / "data/catalog/source_registry.yml")
    assert len(catalog.assets) == 7
    assert {asset.id for asset in catalog.assets} == {
        "school",
        "assessment",
        "attendance",
        "movement",
        "class_capacity",
        "school_dependency",
        "teacher_shortage",
    }
    assert {asset.source for asset in catalog.assets} <= {source.id for source in registry.sources}
    school = next(asset for asset in catalog.assets if asset.id == "school")
    school_source = next(source for source in registry.sources if source.id == school.source)
    assert school.status == school_source.status == "METADATA_CONFIRMED"
    assert school.provenance.source_kind is SourceKind.METADATA_CONFIRMED
    scenarios = sorted((ROOT / "data/scenarios").glob("*.yml"))
    assert len(scenarios) >= 6
    assert {load_scenario(path).id for path in scenarios} == {path.stem for path in scenarios}
    assert len(METRICS) >= 4


def test_generation_is_reproducible_and_queryable(tmp_path: Path) -> None:
    first = generate_mock(
        tmp_path / "one",
        ROOT / "data/scenarios/network_improving.yml",
        allow_external_output=True,
    )
    second = generate_mock(
        tmp_path / "two",
        ROOT / "data/scenarios/network_improving.yml",
        allow_external_output=True,
    )
    assert first["files"] == second["files"]
    assert all("sha256" in value and value["row_count"] > 0 for value in first["files"].values())
    access = DuckDBDataAccess(tmp_path / "one", allow_external_root=True)
    assert len(access.list_schools(limit=5)) == 5
    aggregate = access.aggregate("attendance_facts", "present_count", "sum")
    assert aggregate is not None and aggregate > 0
    assert access.series(
        "attendance_facts",
        "period",
        "present_count",
        school_id="SYNTHETIC-SCHOOL-0001",
    )
    with pytest.raises(ValueError):
        access.aggregate("attendance_facts; DROP TABLE schools", "present_count", "sum")
    with pytest.raises(ValueError):
        access.series("attendance_facts", "period", "present_count; SELECT 1")


def test_generation_requires_explicit_authorization_outside_governed_root(tmp_path: Path) -> None:
    with pytest.raises(ValueError, match="explicitly authorized"):
        generate_mock(tmp_path / "outside", ROOT / "data/scenarios/network_improving.yml")


def test_generator_cli_does_not_expose_external_output_bypass(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setattr(sys, "argv", ["generate_mock", "--allow-external-output"])
    with pytest.raises(SystemExit) as error:
        generate_mock_main()
    assert error.value.code == 2


def test_sqlite_transactions_fks_and_transitions(tmp_path: Path) -> None:
    repo = SQLiteControlRepository(tmp_path / "control.sqlite")
    run = repo.create_agent_run("investigation", {"source": "synthetic"})
    investigation = repo.create_investigation("Capacity signal", run)
    repo.transition_investigation(investigation, "IN_PROGRESS")
    meeting = repo.create_meeting(investigation, "Review aggregate evidence")
    action = repo.create_action_item(investigation, "Validate network signal")
    with pytest.raises(InvalidTransitionError):
        repo.transition_investigation(investigation, "OPEN")
    with pytest.raises(sqlite3.IntegrityError), repo.transaction():
        repo.create_action_item("missing", "Review aggregate", "OPEN")
    assert repo.count("action_items") == 1
    assert meeting
    assert action
    assert repo.count("audit_events") == 5

    connection = sqlite3.connect(tmp_path / "control.sqlite")
    assert connection.execute("PRAGMA journal_mode").fetchone() == ("wal",)
    tables = {
        row[0] for row in connection.execute("SELECT name FROM sqlite_master WHERE type='table'")
    }
    assert tables >= {"agent_runs", "investigations", "meetings", "action_items", "audit_events"}
    assert connection.execute("PRAGMA foreign_key_list(action_items)").fetchall()
    connection.close()


@pytest.mark.parametrize(
    ("operation", "payload"),
    [
        ("run", {"student_name": "Pessoa Identificável"}),
        ("investigation", "CPF 123.456.789-09"),
        ("meeting", "Contact aluno@example.org"),
        ("action", "Revisar endereço do aluno"),
        ("audit", {"aluno_nome": "Pessoa Identificável"}),
    ],
)
def test_sqlite_rejects_pii_across_all_control_records(
    tmp_path: Path, operation: str, payload: object
) -> None:
    repo = SQLiteControlRepository(tmp_path / f"{operation}.sqlite")
    run = repo.create_agent_run("investigation", {"source": "synthetic"})
    investigation = repo.create_investigation("Aggregate capacity signal", run)

    with pytest.raises(ValueError, match="PII"):
        if operation == "run":
            assert isinstance(payload, dict)
            repo.create_agent_run("investigation", payload)
        elif operation == "investigation":
            assert isinstance(payload, str)
            repo.create_investigation(payload, run)
        elif operation == "meeting":
            assert isinstance(payload, str)
            repo.create_meeting(investigation, payload)
        elif operation == "action":
            assert isinstance(payload, str)
            repo.create_action_item(investigation, payload)
        else:
            assert isinstance(payload, dict)
            repo.audit("investigation", investigation, "CHECKED", payload)


def test_profiler_never_returns_values_and_confines_path(tmp_path: Path) -> None:
    root = tmp_path / "uploads"
    root.mkdir()
    (root / "data.csv").write_text("id,value\n1,secret\n2,\n", encoding="utf-8")
    profile = SchemaProfiler(root, ProfileLimits(max_bytes=1000, max_rows=10)).profile("data.csv")
    assert profile.row_estimate == 2
    assert "secret" not in profile.model_dump_json()
    assert profile.columns[1].null_rate == 0.5
    with pytest.raises(ValueError):
        SchemaProfiler(root).profile("../outside.csv")
    link = root / "linked.csv"
    try:
        link.symlink_to(root / "data.csv")
    except OSError:
        pytest.skip("symlinks are unavailable on this Windows environment")
    with pytest.raises(ValueError, match="symlinks"):
        SchemaProfiler(root).profile("linked.csv")


def test_profiler_supports_json_jsonl_and_parquet_with_limits(tmp_path: Path) -> None:
    root = tmp_path / "uploads"
    root.mkdir()
    (root / "data.json").write_text(json.dumps([{"id": 1}, {"id": 2}]), encoding="utf-8")
    (root / "data.jsonl").write_text('{"id": 1}\n{"id": 2}\n', encoding="utf-8")
    generated = tmp_path / "generated"
    generate_mock(
        generated,
        ROOT / "data/scenarios/network_improving.yml",
        allow_external_output=True,
    )
    parquet = root / "schools.parquet"
    generated_access = DuckDBDataAccess(generated, allow_external_root=True)
    parquet.write_bytes(
        generated_access._asset_path(  # noqa: SLF001 - copy a governed generated fixture
            "schools", allow_schools=True
        ).read_bytes()
    )
    profiler = SchemaProfiler(root, ProfileLimits(max_bytes=1_000_000, max_rows=1))
    for filename in ("data.json", "data.jsonl", "schools.parquet"):
        profile = profiler.profile(filename)
        assert profile.columns
        assert profile.warnings
        assert "Escola Sintética" not in profile.model_dump_json()


def test_metric_blocks_interpretation_on_low_coverage() -> None:
    observed_at = datetime(2026, 8, 1, tzinfo=UTC)
    observation = MetricsService().ratio(
        "attendance_rate",
        8,
        10,
        observed_at,
        coverage=0.5,
        provenance=Provenance(
            source_id="generated_mock",
            source_kind=SourceKind.SYNTHETIC_SCHEMA_FAITHFUL,
            generated=True,
            data_version="1.0.0",
            generation_seed=20260826,
            scenario_reference="network_improving@1.0.0",
        ),
        evidence_id="ev.attendance.2026-08",
        window_start=observed_at,
        window_end=observed_at,
        coverage_numerator=5,
        coverage_denominator=10,
        filters={"network": "rio"},
    )
    assert observation.quality_status is QualityStatus.DEGRADED
    assert observation.interpretable is False
    with pytest.raises(ValidationError):
        IndicatorObservation.model_validate(
            {
                "indicator_id": "attendance_rate",
                "value": 0.8,
                "unit": "ratio",
                "grain": "network-month",
                "observed_at": datetime(2026, 8, 1, tzinfo=UTC),
                "coverage": 0.5,
                "quality_status": "OK",
                "limitations": [],
                "provenance": {
                    "source_id": "x",
                    "source_kind": "REAL_PUBLIC",
                    "generated": False,
                },
            }
        )


def test_quality_checks_cover_governed_failure_modes() -> None:
    service = QualityService(
        Provenance(
            source_id="generated_mock",
            source_kind=SourceKind.SYNTHETIC_INFERRED,
            generated=True,
            data_version="1.0.0",
            generation_seed=20260826,
            scenario_reference="network_improving@1.0.0",
        )
    )
    now = datetime(2026, 8, 26, tzinfo=UTC)
    assert service.freshness(None, now, timedelta(days=1)).status is QualityStatus.BLOCKED
    assert service.completeness([{"id": None}], {"id"}).status is QualityStatus.BLOCKED
    assert service.duplicate_keys([{"id": 1}, {"id": 1}], ("id",)).status is QualityStatus.DEGRADED
    assert service.orphan_keys({1, 2}, {1}).status is QualityStatus.BLOCKED
    assert (
        service.schema_drift({"id": "VARCHAR"}, {"id": "INTEGER"}).status is QualityStatus.BLOCKED
    )


def test_mock_capabilities_require_explicit_setting() -> None:
    default = {item.id: item.capability.status.value for item in initial_modules(False)}
    enabled = {item.id: item.capability.status.value for item in initial_modules(True)}
    for module_id in ("network", "schools", "learning", "attendance", "capacity", "staffing"):
        assert default[module_id] == "SCHEMA_ONLY"
        assert enabled[module_id] == "MOCK_ONLY"
