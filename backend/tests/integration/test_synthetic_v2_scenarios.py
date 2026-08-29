from pathlib import Path

from app.data_access.duckdb_adapter import DuckDBDataAccess
from scripts.generate_mock import generate_mock

ROOT = Path(__file__).parents[3]
SCENARIO_V2 = ROOT / "data/scenarios/reinforcement_priority_v2.yml"


def test_reinforcement_priority_v2_generates_scenario_scoped_release(tmp_path: Path) -> None:
    output = tmp_path / "generated"

    manifest = generate_mock(
        output,
        SCENARIO_V2,
        allow_external_output=True,
        release_namespace="scenario",
    )

    assert manifest["scenario"] == "reinforcement_priority_v2"
    assert manifest["scenario_version"] == "2.0.0"
    assert manifest["release_namespace"] == "scenario"
    assert manifest["parameters"] == {
        "assessment_trend": -1.2,
        "attendance_trend": -0.003,
        "capacity_pressure": 0.08,
        "quality_gap": 0.12,
        "shortage_factor": 1.4,
    }
    scenario_root = output / "scenarios" / "reinforcement_priority_v2"
    access = DuckDBDataAccess(scenario_root, allow_external_root=True)
    assert access.snapshot_id() == manifest["generation_id"]
    snapshot = access.analytics_snapshot(cre=None)
    assert {row["indicator_id"] for row in snapshot} == {
        "attendance_rate",
        "assessment_score",
        "capacity_utilization",
        "teacher_shortage_rate",
    }
