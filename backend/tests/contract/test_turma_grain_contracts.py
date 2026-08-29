from datetime import UTC, datetime

import pytest
from pydantic import ValidationError

from app.analytics.contracts import (
    AnalyticsScope,
    ObservationDimensions,
    ObservationRecordV1,
    ScopeType,
)
from app.contracts.data import QualityStatus
from app.contracts.provenance import Provenance, SourceKind
from app.mapping.contracts import CanonicalField, JoinKeyMapping, JoinTargetField

SNAPSHOT = "b" * 64
LIMITATION = "Dados sintéticos apenas para teste."


def _provenance() -> Provenance:
    return Provenance(
        source_id="asset:turma_assessment.parquet",
        source_kind=SourceKind.SYNTHETIC_SCHEMA_FAITHFUL,
        generated=True,
        data_version=SNAPSHOT,
        generation_seed=1,
        scenario_reference="test@1",
        limitations=(LIMITATION,),
    )


def _observation(**changes: object) -> dict[str, object]:
    period = datetime(2026, 8, 1, tzinfo=UTC)
    values: dict[str, object] = {
        "observation_id": (
            f"obs1:{SNAPSHOT}:turma:sme-rio-0515062.1901:"
            "skill_mastery_rate:2026-08-01"
        ),
        "evidence_id": (
            f"ev1:{SNAPSHOT}:turma:sme-rio-0515062.1901:"
            "skill_mastery_rate:2026-08-01"
        ),
        "scope": AnalyticsScope(type=ScopeType.TURMA, id="SME-RIO-0515062.1901"),
        "indicator_id": "skill_mastery_rate",
        "value": 0.75,
        "unit": "ratio",
        "numerator": 15.0,
        "denominator": 20.0,
        "period_start": period,
        "period_end": period,
        "coverage_numerator": 15,
        "coverage_denominator": 20,
        "quality": QualityStatus.OK,
        "interpretable": True,
        "privacy_min_school_count": 3,
        "privacy_min_unit_count": 3,
        "formula_version": "ratio-of-sums-v1",
        "provenance": _provenance(),
        "limitations": (LIMITATION,),
        "dimensions": ObservationDimensions(
            subject="matematica",
            grade="5",
            skill_id="D12",
            skill_label="Resolver problema envolvendo frações",
            proficiency_level="basico",
            period_label="3º bimestre",
        ),
    }
    values.update(changes)
    return values


def test_turma_scope_accepts_composite_uppercase_school_id_but_requires_turma_suffix() -> None:
    scope = AnalyticsScope(type=ScopeType.TURMA, id="SME-RIO-0515062.1901")

    assert scope.type is ScopeType.TURMA
    assert scope.id == "SME-RIO-0515062.1901"

    with pytest.raises(ValidationError, match="TURMA scope id"):
        AnalyticsScope(type=ScopeType.TURMA, id="SME-RIO-0515062")


def test_observation_dimensions_round_trip_and_evidence_id_uses_lowercase_identity() -> None:
    observation = ObservationRecordV1.model_validate(_observation())

    assert observation.scope.id == "SME-RIO-0515062.1901"
    assert "SME-RIO" not in observation.evidence_id
    assert observation.evidence_id == observation.evidence_id.lower()
    assert observation.dimensions is not None
    assert observation.dimensions.skill_id == "D12"
    assert observation.model_dump(mode="json")["dimensions"]["period_label"] == "3º bimestre"


def test_suppressed_turma_observation_exposes_no_values_and_uses_unit_count_alias() -> None:
    observation = ObservationRecordV1.model_validate(
        _observation(
            value=None,
            numerator=None,
            denominator=None,
            coverage_numerator=2,
            coverage_denominator=2,
            suppressed=True,
            suppression_reason="SMALL_GROUP",
            quality=QualityStatus.BLOCKED,
            interpretable=False,
        )
    )

    assert observation.suppressed is True
    assert observation.value is None
    assert observation.privacy_min_unit_count == 3
    assert observation.privacy_min_school_count == 3


def test_p1_coc_and_lesson_decomposition_indicators_are_public_contract() -> None:
    period = datetime(2026, 8, 1, tzinfo=UTC)
    subject_grade = ObservationRecordV1.model_validate(
        _observation(
            observation_id=f"obs1:{SNAPSHOT}:turma:sme-rio-0515062.1901:subject_grade_mean:2026-08-01",
            evidence_id=f"ev1:{SNAPSHOT}:turma:sme-rio-0515062.1901:subject_grade_mean:2026-08-01",
            indicator_id="subject_grade_mean",
            value=8.4,
            unit="score",
            numerator=168.0,
            denominator=20.0,
            period_start=period,
            period_end=period,
            formula_version="weighted-mean-score-v1",
            dimensions=ObservationDimensions(
                subject="matematica",
                grade="5",
                proficiency_level="adequado",
                proficiency_error_margin=0.37,
                period_label="COC 3º bimestre",
            ),
        )
    )
    cancelled = ObservationRecordV1.model_validate(
        _observation(
            observation_id=f"obs1:{SNAPSHOT}:turma:sme-rio-0515062.1901:lessons_cancelled_rate:2026-08-01",
            evidence_id=f"ev1:{SNAPSHOT}:turma:sme-rio-0515062.1901:lessons_cancelled_rate:2026-08-01",
            indicator_id="lessons_cancelled_rate",
            value=0.05,
            unit="ratio",
            numerator=1.0,
            denominator=20.0,
            formula_version="ratio-of-sums-v1",
        )
    )
    unlogged = ObservationRecordV1.model_validate(
        _observation(
            observation_id=f"obs1:{SNAPSHOT}:turma:sme-rio-0515062.1901:lessons_unlogged_rate:2026-08-01",
            evidence_id=f"ev1:{SNAPSHOT}:turma:sme-rio-0515062.1901:lessons_unlogged_rate:2026-08-01",
            indicator_id="lessons_unlogged_rate",
            value=0.10,
            unit="ratio",
            numerator=2.0,
            denominator=20.0,
            formula_version="ratio-of-sums-v1",
        )
    )

    assert subject_grade.indicator_id == "subject_grade_mean"
    assert subject_grade.dimensions is not None
    assert subject_grade.dimensions.proficiency_error_margin == 0.37
    assert cancelled.indicator_id == "lessons_cancelled_rate"
    assert unlogged.indicator_id == "lessons_unlogged_rate"


def test_new_intake_aliases_and_turma_join_target_are_public_contract() -> None:
    assert CanonicalField.TURMA_ID.value == "turma_id"
    assert CanonicalField.LESSONS_PLANNED.value == "lessons_planned"
    assert JoinKeyMapping(source_column="turma", target_field=JoinTargetField.TURMA_ID)
