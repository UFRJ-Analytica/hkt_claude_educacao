from datetime import UTC, datetime

import pytest
from pydantic import ValidationError

from app.analytics.contracts import AnalyticsScope, ObservationRecordV1, ScopeType
from app.contracts.data import QualityStatus
from app.contracts.provenance import Provenance, SourceKind

SNAPSHOT = "a" * 64
LIMITATION = "Dados sintéticos apenas para teste."


def _observation(**changes: object) -> dict[str, object]:
    period = datetime(2026, 6, 1, tzinfo=UTC)
    values: dict[str, object] = {
        "observation_id": f"obs1:{SNAPSHOT}:network:network:attendance_rate:2026-06-01",
        "evidence_id": f"ev1:{SNAPSHOT}:network:network:attendance_rate:2026-06-01",
        "scope": AnalyticsScope(type=ScopeType.NETWORK, id="network"),
        "indicator_id": "attendance_rate",
        "value": 0.75,
        "unit": "ratio",
        "numerator": 3.0,
        "denominator": 4.0,
        "period_start": period,
        "period_end": period,
        "coverage_numerator": 1,
        "coverage_denominator": 1,
        "quality": QualityStatus.OK,
        "interpretable": True,
        "formula_version": "ratio-of-sums-v1",
        "provenance": Provenance(
            source_id="asset:attendance_facts.parquet",
            source_kind=SourceKind.SYNTHETIC_SCHEMA_FAITHFUL,
            generated=True,
            data_version=SNAPSHOT,
            generation_seed=1,
            scenario_reference="test@1",
            limitations=(LIMITATION,),
        ),
        "limitations": (LIMITATION,),
    }
    values.update(changes)
    return values


def test_observation_v1_is_strict_and_enforces_ratio_and_interpretability() -> None:
    observation = ObservationRecordV1.model_validate(_observation())
    assert observation.value == 0.75

    with pytest.raises(ValidationError, match="numerator divided by denominator"):
        ObservationRecordV1.model_validate(_observation(value=0.5))
    with pytest.raises(ValidationError, match="only present OK observations"):
        ObservationRecordV1.model_validate(
            _observation(
                value=None,
                numerator=None,
                denominator=None,
                quality=QualityStatus.BLOCKED,
                interpretable=True,
            )
        )
    with pytest.raises(ValidationError, match="timezone"):
        ObservationRecordV1.model_validate(
            _observation(period_start=datetime(2026, 6, 1), period_end=datetime(2026, 6, 1))
        )
    with pytest.raises(ValidationError, match="Extra inputs"):
        ObservationRecordV1.model_validate({**_observation(), "sql": "SELECT secret"})
