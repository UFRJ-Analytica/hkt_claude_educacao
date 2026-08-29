from datetime import date

from fastapi.testclient import TestClient

from app.composition import create_app
from app.core.config import Settings

SNAPSHOT = "c" * 64
SCHOOL_ID = "SME-RIO-0515062"
TURMA_ID = "1901"
TURMA_SCOPE = f"{SCHOOL_ID}.{TURMA_ID}"
SKILL_EVIDENCE_ID = (
    f"ev1:{SNAPSHOT}:turma:sme-rio-0515062.1901:"
    "skill_mastery_rate:2026-08-01"
)


class TurmaAnalyticsAccess:
    def validate(self) -> bool:
        return True

    def snapshot_id(self) -> str:
        return SNAPSHOT

    def manifest(self) -> dict[str, object]:
        return {
            "generation_id": SNAPSHOT,
            "seed": 7,
            "scenario": "turma-test",
            "scenario_version": "1.0.0",
            "scenario_sha256": "d" * 64,
        }

    def analytics_snapshot(
        self,
        *,
        cre: int | None = None,
        school_id: str | None = None,
        turma_id: str | None = None,
    ) -> list[dict[str, object]]:
        if school_id == SCHOOL_ID and turma_id == TURMA_ID:
            return [
                {
                    "indicator_id": "skill_mastery_rate",
                    "period": date(2026, 8, 1),
                    "numerator": 15.0,
                    "denominator": 20.0,
                    "value": 0.75,
                    "coverage_numerator": 15,
                    "coverage_denominator": 20,
                    "school_count": 1,
                    "subject": "matematica",
                    "grade": "5",
                    "skill_id": "D12",
                    "skill_label": "Resolver problema envolvendo frações",
                    "proficiency_level": "basico",
                    "period_label": "3º bimestre",
                },
                {
                    "indicator_id": "subject_grade_mean",
                    "period": date(2026, 8, 1),
                    "numerator": 168.0,
                    "denominator": 20.0,
                    "value": 8.4,
                    "coverage_numerator": 20,
                    "coverage_denominator": 20,
                    "school_count": 1,
                    "subject": "matematica",
                    "grade": "5",
                    "proficiency_level": "adequado",
                    "proficiency_error_margin": 0.37,
                    "period_label": "COC 3º bimestre",
                },
                {
                    "indicator_id": "lessons_delivered_rate",
                    "period": date(2026, 8, 1),
                    "numerator": 18.0,
                    "denominator": 20.0,
                    "value": 0.9,
                    "coverage_numerator": 20,
                    "coverage_denominator": 20,
                    "school_count": 1,
                    "subject": "matematica",
                    "grade": "5",
                    "period_label": "3º bimestre",
                },
                {
                    "indicator_id": "lessons_cancelled_rate",
                    "period": date(2026, 8, 1),
                    "numerator": 1.0,
                    "denominator": 20.0,
                    "value": 0.05,
                    "coverage_numerator": 20,
                    "coverage_denominator": 20,
                    "school_count": 1,
                    "subject": "matematica",
                    "grade": "5",
                    "period_label": "3º bimestre",
                },
                {
                    "indicator_id": "lessons_unlogged_rate",
                    "period": date(2026, 8, 1),
                    "numerator": 1.0,
                    "denominator": 20.0,
                    "value": 0.05,
                    "coverage_numerator": 20,
                    "coverage_denominator": 20,
                    "school_count": 1,
                    "subject": "matematica",
                    "grade": "5",
                    "period_label": "3º bimestre",
                },
            ]
        return []

    def analytics_quality(self, *, cre: int | None = None) -> list[dict[str, object]]:
        return []

    def school_turma_rows(self, school_id: str) -> list[dict[str, object]]:
        assert school_id == SCHOOL_ID
        return [
            {
                "turma_id": "1901",
                "turma_label": "1901",
                "grade": "5",
                "evaluated_count": 20,
                "suppressed": False,
                "limitations": [],
                "coverage": [
                    {"indicator_id": "skill_mastery_rate", "status": "OK"},
                    {"indicator_id": "lessons_delivered_rate", "status": "OK"},
                ],
            },
            {
                "turma_id": "1902",
                "turma_label": "1902",
                "grade": "5",
                "evaluated_count": None,
                "suppressed": True,
                "suppression_reason": "SMALL_GROUP",
                "limitations": ["Turma suprimida por privacidade: grupo pequeno."],
                "coverage": [
                    {"indicator_id": "skill_mastery_rate", "status": "BLOCKED"},
                ],
            },
        ]

    def skill_matrix_rows(self, school_id: str, period: str | None) -> list[dict[str, object]]:
        assert school_id == SCHOOL_ID
        assert period == "2026-3"
        return [
            {
                "turma_id": "1901",
                "turma_label": "1901",
                "grade": "5",
                "subject": "matematica",
                "skill_id": "D12",
                "skill_label": "Resolver problema envolvendo frações",
                "period_label": "3º bimestre",
                "value": 0.75,
                "quality": "OK",
                "suppressed": False,
                "evidence_id": SKILL_EVIDENCE_ID,
            },
            {
                "turma_id": "1901",
                "turma_label": "1901",
                "grade": "5",
                "subject": "matematica",
                "skill_id": "D13",
                "skill_label": "Identificar padrões numéricos",
                "period_label": "3º bimestre",
                "value": None,
                "quality": "BLOCKED",
                "suppressed": True,
                "suppression_reason": "SMALL_GROUP",
                "evidence_id": SKILL_EVIDENCE_ID,
            },
        ]


def _client() -> TestClient:
    return TestClient(
        create_app(
            Settings(environment="test", mock_data_enabled=True),
            data_access=TurmaAnalyticsAccess(),  # type: ignore[arg-type]
        ),
        raise_server_exceptions=False,
    )


def test_snapshot_accepts_school_and_turma_scope_and_emits_lowercase_evidence_id() -> None:
    response = _client().get(
        "/api/v1/network/snapshot",
        params={"school_id": SCHOOL_ID, "turma_id": TURMA_ID},
    )

    assert response.status_code == 200
    payload = response.json()
    assert payload["scope"] == {"type": "TURMA", "id": TURMA_SCOPE}
    observations = {item["indicator_id"]: item for item in payload["observations"]}
    assert set(observations) == {
        "skill_mastery_rate",
        "subject_grade_mean",
        "lessons_delivered_rate",
        "lessons_cancelled_rate",
        "lessons_unlogged_rate",
    }
    assert observations["skill_mastery_rate"]["dimensions"]["skill_id"] == "D12"
    assert observations["subject_grade_mean"]["value"] == 8.4
    assert observations["subject_grade_mean"]["unit"] == "score"
    assert observations["subject_grade_mean"]["dimensions"]["proficiency_level"] == "adequado"
    assert observations["subject_grade_mean"]["dimensions"]["proficiency_error_margin"] == 0.37
    assert observations["lessons_cancelled_rate"]["value"] == 0.05
    assert observations["lessons_unlogged_rate"]["value"] == 0.05
    assert observations["skill_mastery_rate"]["evidence_id"] == observations[
        "skill_mastery_rate"
    ]["evidence_id"].lower()


def test_school_turmas_lists_suppressed_turmas_instead_of_hiding_them() -> None:
    response = _client().get(f"/api/v1/schools/{SCHOOL_ID}/turmas")

    assert response.status_code == 200
    payload = response.json()
    assert payload["school_id"] == SCHOOL_ID
    assert [item["turma_id"] for item in payload["turmas"]] == ["1901", "1902"]
    suppressed = payload["turmas"][1]
    assert suppressed["suppressed"] is True
    assert suppressed["evaluated_count"] is None
    assert suppressed["suppression_reason"] == "SMALL_GROUP"
    assert "grupo pequeno" in suppressed["limitations"][0].lower()


def test_skill_matrix_suppresses_small_turma_skill_cells_even_when_turma_exists() -> None:
    response = _client().get(f"/api/v1/schools/{SCHOOL_ID}/skills", params={"period": "2026-3"})

    assert response.status_code == 200
    payload = response.json()
    cells = {(cell["turma_id"], cell["skill_id"]): cell for cell in payload["cells"]}
    assert cells[("1901", "D12")]["value"] == 0.75
    assert cells[("1901", "D13")]["suppressed"] is True
    assert cells[("1901", "D13")]["value"] is None
