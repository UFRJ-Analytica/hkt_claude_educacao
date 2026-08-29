import math
from datetime import UTC, datetime
from enum import StrEnum
from typing import Any

from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator

from app.contracts.provenance import Provenance


class StrictModel(BaseModel):
    model_config = ConfigDict(extra="forbid", frozen=True, str_strip_whitespace=True)


class QualityStatus(StrEnum):
    OK = "OK"
    DEGRADED = "DEGRADED"
    BLOCKED = "BLOCKED"


class DataAsset(StrictModel):
    id: str = Field(pattern=r"^[a-z][a-z0-9_]*$")
    owner: str = Field(min_length=1)
    source: str = Field(min_length=1)
    status: str = Field(min_length=1)
    grain: str = Field(min_length=1)
    keys: tuple[str, ...] = Field(min_length=1)
    fields: dict[str, str]
    provenance: Provenance
    limitations: tuple[str, ...] = ()

    @model_validator(mode="after")
    def validate_asset_identity(self) -> "DataAsset":
        unknown_keys = set(self.keys) - set(self.fields)
        if unknown_keys:
            raise ValueError(f"asset keys must be declared fields: {sorted(unknown_keys)}")
        if self.source != self.provenance.source_id:
            raise ValueError("asset source must equal provenance source_id")
        return self


class IndicatorDefinition(StrictModel):
    id: str
    label: str
    formula: str
    unit: str
    grain: str
    coverage_rule: str
    formula_version: str = Field(min_length=1)


class IndicatorObservation(StrictModel):
    indicator_id: str
    value: float | None
    unit: str
    grain: str
    observed_at: datetime
    coverage: float = Field(ge=0, le=1)
    quality_status: QualityStatus
    limitations: tuple[str, ...] = ()
    provenance: Provenance
    evidence_id: str = Field(min_length=1, pattern=r"^[a-z0-9][a-z0-9._:-]*$")
    formula_version: str = Field(min_length=1)
    filters: dict[str, str | int | float | bool]
    coverage_numerator: float = Field(ge=0)
    coverage_denominator: float = Field(gt=0)
    window_start: datetime
    window_end: datetime
    interpretable: bool = True

    @field_validator("value", "coverage_numerator", "coverage_denominator")
    @classmethod
    def finite_number(cls, value: float | None) -> float | None:
        if value is not None and not math.isfinite(value):
            raise ValueError("numeric observation fields must be finite")
        return value

    @field_validator("observed_at", "window_start", "window_end")
    @classmethod
    def aware(cls, value: datetime) -> datetime:
        if value.tzinfo is None or value.utcoffset() is None:
            raise ValueError("datetime must include timezone information")
        return value.astimezone(UTC)

    @model_validator(mode="after")
    def quality_contract(self) -> "IndicatorObservation":
        if self.window_start > self.window_end:
            raise ValueError("window_start must not be after window_end")
        if not self.window_start <= self.observed_at <= self.window_end:
            raise ValueError("observed_at must fall inside the observation window")
        if self.coverage_numerator > self.coverage_denominator:
            raise ValueError("coverage numerator cannot exceed denominator")
        expected_coverage = self.coverage_numerator / self.coverage_denominator
        if not math.isclose(self.coverage, expected_coverage, rel_tol=1e-9, abs_tol=1e-12):
            raise ValueError("coverage must equal coverage numerator / denominator")
        if self.provenance.source_kind.value.startswith("SYNTHETIC") and not all(
            (
                self.provenance.generated,
                self.provenance.data_version,
                self.provenance.generation_seed is not None,
                self.provenance.scenario_reference or self.provenance.scenario_hash,
            )
        ):
            raise ValueError(
                "synthetic metric provenance requires version, seed, and scenario reference"
            )
        if self.value is None and (
            self.quality_status is QualityStatus.OK or self.interpretable
        ):
            raise ValueError("missing value cannot be OK or interpretable")
        if (
            self.coverage < 1 or self.quality_status is not QualityStatus.OK
        ) and not self.limitations:
            raise ValueError("limitations required for incomplete or non-OK observation")
        if self.coverage < 0.8 and self.quality_status is QualityStatus.OK:
            raise ValueError("low coverage cannot have OK quality")
        if self.quality_status is not QualityStatus.OK and self.interpretable:
            raise ValueError("non-OK observation cannot be interpreted")
        return self


class QualityFinding(StrictModel):
    check: str
    status: QualityStatus
    message: str
    affected_rows: int = Field(ge=0)
    coverage: float = Field(ge=0, le=1)
    provenance: Provenance


def strip_sequence(values: Any) -> Any:
    if isinstance(values, (list, tuple)):
        return tuple(value.strip() if isinstance(value, str) else value for value in values)
    return values
