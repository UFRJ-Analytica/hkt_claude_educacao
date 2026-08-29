"""Versioned, strict contracts for aggregate analytics and evidence."""

import math
from datetime import UTC, datetime
from enum import StrEnum
from typing import Literal

from pydantic import Field, field_validator, model_validator

from app.contracts.data import QualityStatus, StrictModel
from app.contracts.provenance import Provenance, SourceKind

ApiContractVersion = Literal["1.0.0"]
AnalyticsIndicatorId = Literal[
    "attendance_rate",
    "assessment_score",
    "capacity_utilization",
    "teacher_shortage_rate",
    "assessment_participation",
    "skill_mastery_rate",
    "lessons_delivered_rate",
    "subject_grade_mean",
    "lessons_cancelled_rate",
    "lessons_unlogged_rate",
]
_SYNTHETIC = {SourceKind.SYNTHETIC_SCHEMA_FAITHFUL, SourceKind.SYNTHETIC_INFERRED}
_FORMULAS: dict[str, frozenset[str]] = {
    "attendance_rate": frozenset({"ratio-of-sums-v1"}),
    "assessment_score": frozenset({"weighted-mean-score-v1"}),
    "capacity_utilization": frozenset({"ratio-of-sums-v1"}),
    "teacher_shortage_rate": frozenset({"ratio-of-sums-v1"}),
    "assessment_participation": frozenset({"ratio-of-sums-v1"}),
    "skill_mastery_rate": frozenset({"ratio-of-sums-v1"}),
    "lessons_delivered_rate": frozenset({"ratio-of-sums-v1"}),
    "subject_grade_mean": frozenset({"weighted-mean-score-v1"}),
    "lessons_cancelled_rate": frozenset({"ratio-of-sums-v1"}),
    "lessons_unlogged_rate": frozenset({"ratio-of-sums-v1"}),
}


class ScopeType(StrEnum):
    NETWORK = "NETWORK"
    CRE = "CRE"
    SCHOOL = "SCHOOL"
    TURMA = "TURMA"


class AnalyticsScope(StrictModel):
    type: ScopeType
    id: str = Field(min_length=1, max_length=128, pattern=r"^[A-Za-z0-9][A-Za-z0-9._-]*$")

    @model_validator(mode="after")
    def coherent_id(self) -> "AnalyticsScope":
        if self.type is ScopeType.NETWORK and self.id != "network":
            raise ValueError("NETWORK scope id must be network")
        if self.type is ScopeType.CRE and (not self.id.isdigit() or not 1 <= int(self.id) <= 11):
            raise ValueError("CRE scope id must be between 1 and 11")
        if self.type is ScopeType.TURMA:
            parts = self.id.rsplit(".", 1)
            if len(parts) != 2 or not all(parts):
                raise ValueError("TURMA scope id must be <school_id>.<turma_id>")
        return self


class ObservationDimensions(StrictModel):
    subject: str | None = None
    grade: str | None = None
    skill_id: str | None = None
    skill_label: str | None = None
    proficiency_level: str | None = None
    proficiency_error_margin: float | None = Field(default=None, ge=0)
    period_label: str | None = None

    @field_validator("proficiency_error_margin")
    @classmethod
    def finite_error_margin(cls, value: float | None) -> float | None:
        if value is not None and not math.isfinite(value):
            raise ValueError("proficiency_error_margin must be finite")
        return value

    @model_validator(mode="after")
    def no_test_item_content(self) -> "ObservationDimensions":
        if self.skill_label is not None and any(
            token in self.skill_label.casefold()
            for token in ("enunciado", "item ", "questão", "questao")
        ):
            raise ValueError("skill_label must not expose test item content")
        return self


class ObservationRecordV1(StrictModel):
    observation_id: str = Field(min_length=1, max_length=512, pattern=r"^obs1:[a-z0-9:._-]+$")
    evidence_id: str = Field(min_length=1, max_length=512, pattern=r"^ev1:[a-z0-9:._-]+$")
    scope: AnalyticsScope
    indicator_id: AnalyticsIndicatorId
    value: float | None
    unit: str = Field(min_length=1)
    numerator: float | None = Field(default=None, ge=0)
    denominator: float | None = Field(default=None, gt=0)
    period_start: datetime
    period_end: datetime
    published_at: datetime | None = None
    coverage_numerator: int = Field(ge=0)
    coverage_denominator: int = Field(ge=0)
    quality: QualityStatus
    interpretable: bool
    suppressed: bool = False
    suppression_reason: Literal["SMALL_GROUP"] | None = None
    privacy_min_school_count: int = Field(default=3, ge=2)
    privacy_min_unit_count: int = Field(default=3, ge=2)
    formula_version: str = Field(min_length=1)
    provenance: Provenance
    limitations: tuple[str, ...] = ()
    dimensions: ObservationDimensions | None = None

    @field_validator(
        "value", "numerator", "denominator", mode="after"
    )
    @classmethod
    def finite_numbers(cls, value: float | None) -> float | None:
        if value is not None and not math.isfinite(value):
            raise ValueError("observation numbers must be finite")
        return value

    @field_validator("period_start", "period_end", "published_at")
    @classmethod
    def aware_datetimes(cls, value: datetime | None) -> datetime | None:
        if value is not None and (value.tzinfo is None or value.utcoffset() is None):
            raise ValueError("datetimes must include timezone information")
        return None if value is None else value.astimezone(UTC)

    @field_validator("limitations")
    @classmethod
    def nonblank_limitations(cls, values: tuple[str, ...]) -> tuple[str, ...]:
        if any(not value.strip() for value in values):
            raise ValueError("limitations cannot contain blank values")
        return tuple(value.strip() for value in values)

    @model_validator(mode="after")
    def invariants(self) -> "ObservationRecordV1":
        if self.period_start > self.period_end:
            raise ValueError("period_start must not be after period_end")
        if self.privacy_min_school_count != self.privacy_min_unit_count:
            raise ValueError("privacy minimum aliases must match")
        if self.coverage_numerator > self.coverage_denominator:
            raise ValueError("coverage numerator cannot exceed denominator")
        if (self.numerator is None) is not (self.denominator is None):
            raise ValueError("numerator and denominator must occur together")
        if self.numerator is not None and self.denominator is not None:
            expected = self.numerator / self.denominator
            if self.value is None or not math.isclose(
                self.value, expected, rel_tol=1e-9, abs_tol=1e-12
            ):
                raise ValueError("value must equal numerator divided by denominator")
        if self.suppressed:
            if self.suppression_reason != "SMALL_GROUP":
                raise ValueError("suppressed observations require a reason")
            if self.value is not None or self.numerator is not None or self.denominator is not None:
                raise ValueError("suppressed observations cannot expose values")
            if self.quality is not QualityStatus.BLOCKED or self.interpretable:
                raise ValueError("suppressed observations must be blocked")
        elif self.suppression_reason is not None:
            raise ValueError("unsuppressed observations cannot include a suppression reason")
        if self.formula_version not in _FORMULAS[self.indicator_id]:
            raise ValueError("formula_version is not allowed for indicator")
        missing = self.value is None
        if self.interpretable != (not missing and self.quality is QualityStatus.OK):
            raise ValueError("only present OK observations are interpretable")
        if missing and self.quality is not QualityStatus.BLOCKED:
            raise ValueError("missing observations must be BLOCKED")
        if self.provenance.source_kind in _SYNTHETIC and not self.limitations:
            raise ValueError("synthetic observations require limitations")
        if self.quality is not QualityStatus.OK and not self.limitations:
            raise ValueError("degraded observations require limitations")
        return self


class NetworkSnapshotV1(StrictModel):
    api_contract_version: ApiContractVersion = "1.0.0"
    snapshot_id: str = Field(pattern=r"^[0-9a-f]{64}$")
    scope: AnalyticsScope
    school_count: int = Field(ge=0)
    observations: tuple[ObservationRecordV1, ...]
    generated: bool
    provenance: Provenance
    limitations: tuple[str, ...] = Field(min_length=1)

    @model_validator(mode="after")
    def coherent(self) -> "NetworkSnapshotV1":
        if self.generated != self.provenance.generated:
            raise ValueError("generated must match provenance")
        if self.provenance.data_version != self.snapshot_id:
            raise ValueError("snapshot must match provenance")
        observation_count = len({item.observation_id for item in self.observations})
        if not self.observations or observation_count != len(self.observations):
            raise ValueError("network snapshot requires unique observations")
        if any(item.scope != self.scope for item in self.observations):
            raise ValueError("observation scope must match envelope scope")
        return self


class TurmaIndicatorCoverage(StrictModel):
    indicator_id: AnalyticsIndicatorId
    status: QualityStatus


class TurmaSummaryV1(StrictModel):
    turma_id: str = Field(min_length=1, max_length=64, pattern=r"^[A-Za-z0-9][A-Za-z0-9._-]*$")
    turma_label: str | None = Field(default=None, max_length=128)
    grade: str | None = Field(default=None, max_length=64)
    evaluated_count: int | None = Field(default=None, ge=0)
    suppressed: bool = False
    suppression_reason: Literal["SMALL_GROUP"] | None = None
    coverage: tuple[TurmaIndicatorCoverage, ...] = ()
    limitations: tuple[str, ...] = ()

    @model_validator(mode="after")
    def privacy_contract(self) -> "TurmaSummaryV1":
        if self.suppressed:
            if self.suppression_reason != "SMALL_GROUP":
                raise ValueError("suppressed turmas require a reason")
            if self.evaluated_count is not None:
                raise ValueError("suppressed turmas cannot expose evaluated_count")
            if not self.limitations:
                raise ValueError("suppressed turmas require limitations")
        elif self.suppression_reason is not None:
            raise ValueError("unsuppressed turmas cannot include suppression_reason")
        return self


class SchoolTurmaListV1(StrictModel):
    api_contract_version: ApiContractVersion = "1.0.0"
    school_id: str = Field(min_length=1, max_length=128, pattern=r"^[A-Za-z0-9][A-Za-z0-9._-]*$")
    turmas: tuple[TurmaSummaryV1, ...]
    privacy_min_unit_count: int = Field(default=3, ge=2)
    generated: bool
    provenance: Provenance
    limitations: tuple[str, ...] = Field(min_length=1)


class SkillMatrixCellV1(StrictModel):
    turma_id: str = Field(min_length=1, max_length=64, pattern=r"^[A-Za-z0-9][A-Za-z0-9._-]*$")
    turma_label: str | None = Field(default=None, max_length=128)
    grade: str | None = Field(default=None, max_length=64)
    subject: str | None = Field(default=None, max_length=64)
    skill_id: str = Field(min_length=1, max_length=64)
    skill_label: str | None = Field(default=None, max_length=256)
    period_label: str | None = Field(default=None, max_length=64)
    value: float | None = Field(default=None, ge=0, le=1)
    quality: QualityStatus
    suppressed: bool = False
    suppression_reason: Literal["SMALL_GROUP"] | None = None
    evidence_id: str | None = Field(default=None, pattern=r"^ev1:[a-z0-9:._-]+$")
    limitations: tuple[str, ...] = ()

    @model_validator(mode="after")
    def cell_privacy_contract(self) -> "SkillMatrixCellV1":
        if self.suppressed:
            if self.value is not None:
                raise ValueError("suppressed skill cells cannot expose value")
            if self.suppression_reason != "SMALL_GROUP":
                raise ValueError("suppressed skill cells require reason")
        elif self.suppression_reason is not None:
            raise ValueError("unsuppressed skill cells cannot include suppression_reason")
        return self


class SkillMatrixV1(StrictModel):
    api_contract_version: ApiContractVersion = "1.0.0"
    school_id: str = Field(min_length=1, max_length=128, pattern=r"^[A-Za-z0-9][A-Za-z0-9._-]*$")
    period: str | None = Field(default=None, max_length=64)
    cells: tuple[SkillMatrixCellV1, ...]
    privacy_min_unit_count: int = Field(default=3, ge=2)
    generated: bool
    provenance: Provenance
    limitations: tuple[str, ...] = Field(min_length=1)


class QualityCheckSummaryV1(StrictModel):
    check_id: str = Field(min_length=1, pattern=r"^[A-Za-z0-9][A-Za-z0-9._-]*$")
    status: QualityStatus
    affected_school_count: int = Field(ge=0)
    observed_school_count: int = Field(ge=0)
    school_count: int = Field(ge=0)
    coverage_mean: float = Field(ge=0, le=1)
    coverage_aggregation: Literal["mean"] = "mean"

    @field_validator("coverage_mean")
    @classmethod
    def finite_coverage(cls, value: float) -> float:
        if not math.isfinite(value):
            raise ValueError("coverage must be finite")
        return value

    @model_validator(mode="after")
    def counts(self) -> "QualityCheckSummaryV1":
        if self.observed_school_count > self.school_count:
            raise ValueError("observed school count cannot exceed school count")
        if self.affected_school_count > self.school_count:
            raise ValueError("affected school count cannot exceed school count")
        return self


class DataQualitySummaryV1(StrictModel):
    api_contract_version: ApiContractVersion = "1.0.0"
    snapshot_id: str = Field(pattern=r"^[0-9a-f]{64}$")
    scope: AnalyticsScope
    checks: tuple[QualityCheckSummaryV1, ...]
    generated: bool
    provenance: Provenance
    limitations: tuple[str, ...] = Field(min_length=1)

    @model_validator(mode="after")
    def coherent(self) -> "DataQualitySummaryV1":
        if self.generated != self.provenance.generated:
            raise ValueError("generated must match provenance")
        if self.provenance.data_version != self.snapshot_id:
            raise ValueError("snapshot must match provenance")
        return self


class EvidenceRecordV1(StrictModel):
    api_contract_version: ApiContractVersion = "1.0.0"
    evidence_id: str = Field(pattern=r"^ev1:[a-z0-9:._-]+$")
    snapshot_id: str = Field(pattern=r"^[0-9a-f]{64}$")
    observation: ObservationRecordV1
    derivation: str = Field(min_length=1)
    generated: bool
    provenance: Provenance
    limitations: tuple[str, ...] = Field(min_length=1)

    @model_validator(mode="after")
    def coherent(self) -> "EvidenceRecordV1":
        if self.evidence_id != self.observation.evidence_id:
            raise ValueError("evidence id must match observation")
        if self.snapshot_id != self.provenance.data_version:
            raise ValueError("snapshot must match provenance")
        if self.generated != self.provenance.generated:
            raise ValueError("generated must match provenance")
        return self
