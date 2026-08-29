from pathlib import Path
from typing import Any, cast

import duckdb
import pytest
from fastapi.testclient import TestClient

from app.composition import create_app
from app.core.config import Settings
from app.data_access.duckdb_adapter import DuckDBDataAccess
from scripts.generate_mock import generate_mock

ROOT = Path(__file__).parents[3]
SCENARIO = ROOT / "data/scenarios/network_improving.yml"


class FailingAnalyticsAccess:
    def __init__(self, delegate: DuckDBDataAccess) -> None:
        self._delegate = delegate

    def __getattr__(self, name: str) -> object:
        return getattr(self._delegate, name)

    def analytics_snapshot(self, *, cre: int | None = None) -> list[dict[str, object]]:
        raise RuntimeError("secret C:/private/analytics.parquet")

    def analytics_quality(self, *, cre: int | None = None) -> list[dict[str, object]]:
        raise RuntimeError("secret C:/private/quality.parquet")


class EmptyAnalyticsAccess:
    def __init__(self, delegate: DuckDBDataAccess) -> None:
        self._delegate = delegate

    def __getattr__(self, name: str) -> object:
        return getattr(self._delegate, name)

    def analytics_snapshot(self, *, cre: int | None = None) -> list[dict[str, object]]:
        return []


@pytest.fixture(scope="module")
def release(tmp_path_factory: pytest.TempPathFactory) -> tuple[Path, DuckDBDataAccess]:
    root = tmp_path_factory.mktemp("analytics") / "generated"
    generate_mock(root, SCENARIO, allow_external_output=True)
    return root, DuckDBDataAccess(root, allow_external_root=True)


@pytest.fixture(scope="module")
def client(release: tuple[Path, DuckDBDataAccess]) -> TestClient:
    return TestClient(
        create_app(
            Settings(environment="test", mock_data_enabled=True), data_access=release[1]
        ),
        raise_server_exceptions=False,
    )


def test_snapshot_ratio_of_sums_cre_and_weighted_assessment(
    client: TestClient, release: tuple[Path, DuckDBDataAccess]
) -> None:
    response = client.get("/api/v1/network/snapshot", params={"cre": 3})
    assert response.status_code == 200
    payload = cast(dict[str, Any], response.json())
    assert payload["api_contract_version"] == "1.0.0"
    assert payload["scope"] == {"type": "CRE", "id": "3"}
    assert payload["generated"] is True
    assert payload["provenance"]["source_kind"] == "SYNTHETIC_INFERRED"
    assert payload["limitations"]
    observations_by_indicator: dict[str, list[dict[str, Any]]] = {}
    for raw_item in payload["observations"]:
        item = cast(dict[str, Any], raw_item)
        observations_by_indicator.setdefault(item["indicator_id"], []).append(item)
    observations = {
        indicator_id: items[0] for indicator_id, items in observations_by_indicator.items()
    }
    assert set(observations_by_indicator) == {
        "attendance_rate",
        "assessment_score",
        "capacity_utilization",
        "teacher_shortage_rate",
        "subject_grade_mean",
        "lessons_delivered_rate",
        "lessons_cancelled_rate",
        "lessons_unlogged_rate",
    }

    root = release[1]._root  # independent SQL against the fixture's immutable release
    schools = str(root / "schools.parquet").replace("'", "''")
    attendance = str(root / "attendance_facts.parquet").replace("'", "''")
    assessment = str(root / "assessment_facts.parquet").replace("'", "''")
    subject_grades = str(root / "subject_grade_facts.parquet").replace("'", "''")
    lessons = str(root / "lesson_plans.parquet").replace("'", "''")
    with duckdb.connect(":memory:") as connection:
        attendance_row = connection.execute(
            f"""
            WITH scope AS (SELECT school_id FROM read_parquet('{schools}') WHERE cre=?),
            latest AS (SELECT max(period) period FROM read_parquet('{attendance}')
                       JOIN scope USING(school_id))
            SELECT sum(f.present_count), sum(f.expected_count), latest.period
            FROM read_parquet('{attendance}') f JOIN scope USING(school_id), latest
            WHERE f.period=latest.period GROUP BY latest.period
            """,
            [3],
        ).fetchone()
        assert attendance_row is not None
        present, expected, period = attendance_row
        assessment_row = connection.execute(
            f"""
            WITH scope AS (SELECT school_id FROM read_parquet('{schools}') WHERE cre=?),
            latest AS (SELECT max(period) period FROM read_parquet('{assessment}')
                       JOIN scope USING(school_id))
            SELECT sum(f.score*f.participants), sum(f.participants)
            FROM read_parquet('{assessment}') f JOIN scope USING(school_id), latest
            WHERE f.period=latest.period
            """,
            [3],
        ).fetchone()
        assert assessment_row is not None
        weighted, participants = assessment_row
        subject_grade_row = connection.execute(
            f"""
            WITH scope AS (SELECT school_id FROM read_parquet('{schools}') WHERE cre=?),
            latest AS (SELECT max(period) period FROM read_parquet('{subject_grades}')
                       JOIN scope USING(school_id))
            SELECT subject, grade, proficiency_level,
                   sum(score*participants), sum(participants),
                   sqrt(sum((proficiency_error_margin*participants)*(proficiency_error_margin*participants)))
                     / nullif(sum(participants), 0)
            FROM read_parquet('{subject_grades}') f JOIN scope USING(school_id), latest
            WHERE f.period=latest.period
            GROUP BY subject, grade, proficiency_level
            ORDER BY subject, grade, proficiency_level
            LIMIT 1
            """,
            [3],
        ).fetchone()
        assert subject_grade_row is not None
        sg_subject, sg_grade, sg_level, sg_weighted, sg_participants, sg_error = subject_grade_row
        lesson_row = connection.execute(
            f"""
            WITH scope AS (SELECT school_id FROM read_parquet('{schools}') WHERE cre=?),
            latest AS (SELECT max(period) period FROM read_parquet('{lessons}')
                       JOIN scope USING(school_id))
            SELECT subject, grade, sum(delivered_count), sum(cancelled_count),
                   sum(unlogged_count), sum(planned_count)
            FROM read_parquet('{lessons}') f JOIN scope USING(school_id), latest
            WHERE f.period=latest.period
            GROUP BY subject, grade
            ORDER BY subject, grade
            LIMIT 1
            """,
            [3],
        ).fetchone()
        assert lesson_row is not None
        lesson_subject, lesson_grade, delivered, cancelled, unlogged, planned = lesson_row
    attendance_observation = observations["attendance_rate"]
    assert attendance_observation["numerator"] == present
    assert attendance_observation["denominator"] == expected
    assert attendance_observation["value"] == pytest.approx(present / expected, rel=1e-12)
    assert attendance_observation["period_start"].startswith(period.isoformat())
    assessment_observation = observations["assessment_score"]
    assert assessment_observation["formula_version"] == "weighted-mean-score-v1"
    assert assessment_observation["value"] == pytest.approx(weighted / participants, rel=1e-12)
    subject_grade_observation = next(
        item
        for item in observations_by_indicator["subject_grade_mean"]
        if item["dimensions"]["subject"] == sg_subject
        and item["dimensions"]["grade"] == sg_grade
        and item["dimensions"]["proficiency_level"] == sg_level
    )
    assert subject_grade_observation["unit"] == "score"
    assert subject_grade_observation["formula_version"] == "weighted-mean-score-v1"
    assert subject_grade_observation["value"] == pytest.approx(
        sg_weighted / sg_participants, rel=1e-12
    )
    assert subject_grade_observation["dimensions"]["proficiency_error_margin"] == pytest.approx(
        sg_error, rel=1e-12
    )
    lessons_observations = {
        item["indicator_id"]: item
        for indicator in (
            "lessons_delivered_rate",
            "lessons_cancelled_rate",
            "lessons_unlogged_rate",
        )
        for item in observations_by_indicator[indicator]
        if item["dimensions"]["subject"] == lesson_subject
        and item["dimensions"]["grade"] == lesson_grade
    }
    assert lessons_observations["lessons_delivered_rate"]["value"] == pytest.approx(
        delivered / planned, rel=1e-12
    )
    assert lessons_observations["lessons_cancelled_rate"]["value"] == pytest.approx(
        cancelled / planned, rel=1e-12
    )
    assert lessons_observations["lessons_unlogged_rate"]["value"] == pytest.approx(
        unlogged / planned, rel=1e-12
    )


def test_small_cre_groups_are_suppressed_for_privacy(client: TestClient) -> None:
    response = client.get("/api/v1/network/snapshot", params={"cre": 9})

    assert response.status_code == 200
    payload = response.json()
    assert payload["school_count"] == 2
    for observation in payload["observations"]:
        assert observation["suppressed"] is True
        assert observation["suppression_reason"] == "SMALL_GROUP"
        assert observation["privacy_min_school_count"] == 3
        assert observation["value"] is None
        assert observation["numerator"] is None
        assert observation["denominator"] is None
        assert observation["quality"] == "BLOCKED"
        assert observation["interpretable"] is False
        assert any("grupo pequeno" in item.lower() for item in observation["limitations"])

    evidence_id = payload["observations"][0]["evidence_id"]
    evidence = client.get(f"/api/v1/evidence/{evidence_id}")
    assert evidence.status_code == 200
    assert evidence.json()["observation"] == payload["observations"][0]


def test_evidence_round_trip_quality_and_errors(client: TestClient) -> None:
    snapshot = client.get("/api/v1/network/snapshot").json()
    for observation in snapshot["observations"]:
        response = client.get(f"/api/v1/evidence/{observation['evidence_id']}")
        assert response.status_code == 200
        evidence = response.json()
        assert evidence["evidence_id"] == observation["evidence_id"]
        assert evidence["snapshot_id"] == snapshot["snapshot_id"]
        assert evidence["observation"] == observation

    quality = client.get("/api/v1/data/quality", params={"cre": 2})
    assert quality.status_code == 200
    quality_payload = quality.json()
    assert quality_payload["scope"] == {"type": "CRE", "id": "2"}
    assert quality_payload["generated"] is True
    assert quality_payload["provenance"]["source_kind"] == "SYNTHETIC_INFERRED"
    assert quality_payload["checks"] == sorted(
        quality_payload["checks"], key=lambda item: item["check_id"]
    )
    assert all(item["coverage_aggregation"] == "mean" for item in quality_payload["checks"])
    assert all(
        item["observed_school_count"] <= item["school_count"]
        for item in quality_payload["checks"]
    )

    malformed = client.get("/api/v1/evidence/not-an-evidence-id")
    assert malformed.status_code == 422
    assert malformed.json()["error"]["code"] == "invalid_evidence_id"
    unknown_id = snapshot["observations"][0]["evidence_id"].replace(
        snapshot["snapshot_id"], "0" * 64
    )
    unknown = client.get(f"/api/v1/evidence/{unknown_id}")
    assert unknown.status_code == 404
    assert "parquet" not in unknown.text.lower()


def test_unavailable_modes_and_openapi(
    release: tuple[Path, DuckDBDataAccess], client: TestClient
) -> None:
    for settings in (
        Settings(environment="test", mock_data_enabled=False),
        Settings(environment="test", mock_data_enabled=True, disabled_modules={"network"}),
        Settings(environment="test", mock_data_enabled=True, disabled_modules={"schools"}),
    ):
        unavailable = TestClient(
            create_app(settings, data_access=release[1]), raise_server_exceptions=False
        )
        assert unavailable.get("/api/v1/network/snapshot").status_code == 503
        assert unavailable.get("/api/v1/data/quality").status_code == 503

    schema = client.get("/openapi.json").json()
    for path in (
        "/api/v1/network/snapshot",
        "/api/v1/data/quality",
        "/api/v1/evidence/{evidence_id}",
    ):
        responses = schema["paths"][path]["get"]["responses"]
        assert {"404", "422", "500", "503"} <= responses.keys()
        for status in ("404", "422", "500", "503"):
            model = responses[status]["content"]["application/json"]["schema"]
            assert model["$ref"].endswith("/ErrorResponse")


def test_runtime_failures_are_sanitized_503(
    release: tuple[Path, DuckDBDataAccess],
) -> None:
    app = create_app(
        Settings(environment="test", mock_data_enabled=True),
        data_access=FailingAnalyticsAccess(release[1]),  # type: ignore[arg-type]
    )
    failing_client = TestClient(app, raise_server_exceptions=False)
    for path in ("/api/v1/network/snapshot", "/api/v1/data/quality"):
        response = failing_client.get(path)
        assert response.status_code == 503
        assert response.json() == {
            "error": {
                "code": "capability_unavailable",
                "message": "O recurso analítico está indisponível.",
            }
        }
        assert "secret" not in response.text


def test_empty_valid_scope_is_404_not_dataset_unavailable(
    release: tuple[Path, DuckDBDataAccess],
) -> None:
    empty = EmptyAnalyticsAccess(release[1])
    client = TestClient(
        create_app(
            Settings(environment="test", mock_data_enabled=True),
            data_access=empty,  # type: ignore[arg-type]
        ),
        raise_server_exceptions=False,
    )
    response = client.get("/api/v1/network/snapshot", params={"cre": 11})
    assert response.status_code == 404
    assert response.json() == {
        "error": {"code": "analytics_scope_not_found", "message": "Escopo analítico vazio."}
    }
