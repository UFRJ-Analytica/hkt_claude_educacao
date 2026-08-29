import math
from datetime import datetime

from app.contracts.data import IndicatorObservation, QualityStatus
from app.contracts.provenance import Provenance
from app.metrics.catalog import METRICS, RATIO_INDICATORS, UNIT_INTERVAL_INDICATORS


class MetricsService:
    def ratio(
        self,
        indicator_id: str,
        numerator: float | None,
        denominator: float | None,
        observed_at: datetime,
        *,
        provenance: Provenance,
        evidence_id: str,
        window_start: datetime,
        window_end: datetime,
        coverage_numerator: float,
        coverage_denominator: float,
        filters: dict[str, str | int | float | bool],
        coverage: float | None = None,
    ) -> IndicatorObservation:
        if indicator_id not in RATIO_INDICATORS:
            raise ValueError("indicator is not a ratio")
        if numerator is not None and (not math.isfinite(numerator) or numerator < 0):
            raise ValueError("ratio numerator must be finite and non-negative")
        if denominator is not None and (not math.isfinite(denominator) or denominator < 0):
            raise ValueError("ratio denominator must be finite and non-negative")
        if (
            indicator_id in UNIT_INTERVAL_INDICATORS
            and numerator is not None
            and denominator is not None
            and numerator > denominator
        ):
            raise ValueError("ratio numerator cannot exceed denominator")

        definition = METRICS[indicator_id]
        effective_coverage = self._coverage(
            coverage_numerator, coverage_denominator, coverage
        )
        limitations: list[str] = []
        if numerator is None or denominator is None or denominator == 0:
            value = None
            status = QualityStatus.BLOCKED
            limitations.append(
                "Missing or invalid denominator; missing values were not converted to zero."
            )
        elif effective_coverage < 0.5:
            value = numerator / denominator
            status = QualityStatus.BLOCKED
            limitations.append("Coverage below 50%; interpretation is blocked.")
        elif effective_coverage < 1:
            value = numerator / denominator
            status = QualityStatus.DEGRADED
            limitations.append("Coverage is incomplete; interpretation is disabled.")
        else:
            value = numerator / denominator
            status = QualityStatus.OK
        return IndicatorObservation(
            indicator_id=indicator_id,
            value=value,
            unit=definition.unit,
            grain=definition.grain,
            observed_at=observed_at,
            coverage=effective_coverage,
            quality_status=status,
            limitations=limitations,
            provenance=provenance,
            evidence_id=evidence_id,
            formula_version=definition.formula_version,
            filters=filters,
            coverage_numerator=coverage_numerator,
            coverage_denominator=coverage_denominator,
            window_start=window_start,
            window_end=window_end,
            interpretable=status is QualityStatus.OK,
        )

    def value(
        self,
        indicator_id: str,
        value: float | None,
        observed_at: datetime,
        *,
        provenance: Provenance,
        evidence_id: str,
        window_start: datetime,
        window_end: datetime,
        coverage_numerator: float,
        coverage_denominator: float,
        filters: dict[str, str | int | float | bool],
        coverage: float | None = None,
    ) -> IndicatorObservation:
        if indicator_id not in {"assessment_score", "teacher_shortage_hours"}:
            raise ValueError("indicator is not an additive/value metric")
        if value is not None and (not math.isfinite(value) or value < 0):
            raise ValueError("metric value must be finite and non-negative")

        definition = METRICS[indicator_id]
        effective_coverage = self._coverage(
            coverage_numerator, coverage_denominator, coverage
        )
        status = QualityStatus.OK
        limitations: list[str] = []
        if value is None or effective_coverage < 0.5:
            status = QualityStatus.BLOCKED
            limitations.append("Value is missing or coverage below 50%; interpretation is blocked.")
        elif effective_coverage < 1:
            status = QualityStatus.DEGRADED
            limitations.append("Coverage is incomplete; interpretation is disabled.")
        return IndicatorObservation(
            indicator_id=indicator_id,
            value=value,
            unit=definition.unit,
            grain=definition.grain,
            observed_at=observed_at,
            coverage=effective_coverage,
            quality_status=status,
            limitations=limitations,
            provenance=provenance,
            evidence_id=evidence_id,
            formula_version=definition.formula_version,
            filters=filters,
            coverage_numerator=coverage_numerator,
            coverage_denominator=coverage_denominator,
            window_start=window_start,
            window_end=window_end,
            interpretable=status is QualityStatus.OK,
        )

    @staticmethod
    def _coverage(numerator: float, denominator: float, supplied: float | None) -> float:
        if not math.isfinite(numerator) or not math.isfinite(denominator):
            raise ValueError("coverage counts must be finite")
        if numerator < 0 or denominator <= 0 or numerator > denominator:
            raise ValueError("coverage counts are outside their valid domain")
        calculated = numerator / denominator
        if supplied is not None and (
            not math.isfinite(supplied)
            or not math.isclose(supplied, calculated, rel_tol=1e-9, abs_tol=1e-12)
        ):
            raise ValueError("coverage must equal coverage numerator / denominator")
        return calculated
