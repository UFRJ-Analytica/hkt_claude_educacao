from datetime import UTC, datetime
from enum import StrEnum
from typing import Any

from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator

from app.contracts.provenance import SourceKind


class CapabilityStatus(StrEnum):
    AVAILABLE = "AVAILABLE"
    MOCK_ONLY = "MOCK_ONLY"
    SCHEMA_ONLY = "SCHEMA_ONLY"
    UNAVAILABLE = "UNAVAILABLE"
    DISABLED = "DISABLED"
    DEGRADED = "DEGRADED"


class Capability(BaseModel):
    model_config = ConfigDict(extra="forbid", frozen=True)

    id: str = Field(pattern=r"^[a-z0-9]+(?:[.-][a-z0-9]+)*$")
    label: str = Field(min_length=1)
    description: str = Field(min_length=1)
    status: CapabilityStatus
    source_status: SourceKind
    screens: tuple[str, ...] = ()
    agents: tuple[str, ...] = ()
    limitations: tuple[str, ...] = ()
    updated_at: datetime

    @field_validator("label", "description", mode="before")
    @classmethod
    def strip_required_text(cls, value: Any) -> Any:
        return value.strip() if isinstance(value, str) else value

    @field_validator("screens", "agents", "limitations", mode="before")
    @classmethod
    def strip_and_reject_blank_items(cls, values: Any) -> Any:
        if not isinstance(values, (list, tuple)):
            return values
        cleaned = tuple(value.strip() if isinstance(value, str) else value for value in values)
        if any(not value for value in cleaned):
            raise ValueError("lists cannot contain blank entries")
        return cleaned

    @field_validator("updated_at")
    @classmethod
    def require_aware_utc_datetime(cls, value: datetime) -> datetime:
        if value.tzinfo is None or value.utcoffset() is None:
            raise ValueError("datetime must include timezone information")
        return value.astimezone(UTC)

    @model_validator(mode="after")
    def require_limitation_when_not_available(self) -> "Capability":
        if self.status is not CapabilityStatus.AVAILABLE and not self.limitations:
            raise ValueError("at least one limitation is required unless status is AVAILABLE")
        return self
