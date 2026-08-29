from datetime import UTC, datetime
from enum import StrEnum
from typing import Any

from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator


class SourceKind(StrEnum):
    REAL_PUBLIC = "REAL_PUBLIC"
    METADATA_CONFIRMED = "METADATA_CONFIRMED"
    SYNTHETIC_SCHEMA_FAITHFUL = "SYNTHETIC_SCHEMA_FAITHFUL"
    SYNTHETIC_INFERRED = "SYNTHETIC_INFERRED"
    KNOWN_UNAVAILABLE = "KNOWN_UNAVAILABLE"


class PremiseStatus(StrEnum):
    CONFIRMADA = "CONFIRMADA"
    METADADO_CONFIRMADO = "METADADO_CONFIRMADO"
    INFERIDA = "INFERIDA"
    ABERTA = "ABERTA"
    INVALIDADA = "INVALIDADA"


def _normalize_aware_datetime(value: datetime) -> datetime:
    if value.tzinfo is None or value.utcoffset() is None:
        raise ValueError("datetime must include timezone information")
    return value.astimezone(UTC)


class Provenance(BaseModel):
    """Minimum reusable immutable lineage contract for an asset or observation."""

    model_config = ConfigDict(extra="forbid", frozen=True)

    source_id: str = Field(min_length=1)
    source_kind: SourceKind
    generated: bool
    as_of: datetime | None = None
    data_version: str | None = Field(default=None, min_length=1)
    generation_seed: int | None = None
    scenario_reference: str | None = Field(default=None, min_length=1)
    scenario_hash: str | None = Field(default=None, pattern=r"^[a-fA-F0-9]{64}$")
    limitations: tuple[str, ...] = ()

    @field_validator("source_id", mode="before")
    @classmethod
    def strip_source_id(cls, value: Any) -> Any:
        return value.strip() if isinstance(value, str) else value

    @field_validator("limitations", mode="before")
    @classmethod
    def strip_and_reject_blank_limitations(cls, values: Any) -> Any:
        if not isinstance(values, (list, tuple)):
            return values
        cleaned = tuple(value.strip() if isinstance(value, str) else value for value in values)
        if any(not value for value in cleaned):
            raise ValueError("limitations cannot contain blank entries")
        return cleaned

    @field_validator("as_of")
    @classmethod
    def require_aware_as_of(cls, value: datetime | None) -> datetime | None:
        return None if value is None else _normalize_aware_datetime(value)

    @model_validator(mode="after")
    def validate_generation_lineage(self) -> "Provenance":
        synthetic = self.source_kind in {
            SourceKind.SYNTHETIC_SCHEMA_FAITHFUL,
            SourceKind.SYNTHETIC_INFERRED,
        }
        if self.generated != synthetic:
            raise ValueError("generated flag must match a synthetic source kind")
        generation_metadata = (
            self.generation_seed,
            self.scenario_reference,
            self.scenario_hash,
        )
        if not self.generated and any(value is not None for value in generation_metadata):
            raise ValueError("generation metadata is prohibited for non-generated provenance")
        if synthetic and (
            not self.data_version
            or self.generation_seed is None
            or not self.scenario_reference
        ):
            raise ValueError(
                "generated synthetic provenance requires data_version, generation_seed, "
                "and scenario_reference"
            )
        return self


class Premise(BaseModel):
    """Governed immutable premise attached to a product or data assumption."""

    model_config = ConfigDict(extra="forbid", frozen=True)

    id: str = Field(pattern=r"^[a-z0-9]+(?:[.-][a-z0-9]+)*$")
    statement: str = Field(min_length=1)
    status: PremiseStatus
    updated_at: datetime

    @field_validator("statement", mode="before")
    @classmethod
    def strip_statement(cls, value: Any) -> Any:
        return value.strip() if isinstance(value, str) else value

    @field_validator("updated_at")
    @classmethod
    def require_aware_updated_at(cls, value: datetime) -> datetime:
        return _normalize_aware_datetime(value)
