from datetime import datetime
from enum import StrEnum
from typing import Self

from pydantic import Field, model_validator

from app.contracts.data import StrictModel
from app.profiling.schema_profiler import SchemaProfile


class ReadinessStatus(StrEnum):
    READY = "READY"
    REVIEW = "REVIEW"
    BLOCKED = "BLOCKED"


class Readiness(StrictModel):
    status: ReadinessStatus
    score: int = Field(ge=0, le=100)
    blocking_reasons: tuple[str, ...] = ()
    warnings: tuple[str, ...] = ()

    @model_validator(mode="after")
    def enforce_status_invariants(self) -> Self:
        if self.status == ReadinessStatus.BLOCKED and (
            self.score != 0 or not self.blocking_reasons
        ):
            raise ValueError("BLOCKED readiness requires reasons and score zero")
        if self.status == ReadinessStatus.READY and (
            self.score != 100 or self.blocking_reasons or self.warnings
        ):
            raise ValueError("READY readiness requires score 100 and no findings")
        if self.status == ReadinessStatus.REVIEW and not 0 < self.score < 100:
            raise ValueError("REVIEW readiness score must be between blocked and ready")
        return self


class DatasetDescriptor(StrictModel):
    dataset_id: str = Field(pattern=r"^[0-9a-f]{32}$")
    created_at: datetime
    status: ReadinessStatus
    profile: SchemaProfile
    readiness: Readiness

    @model_validator(mode="after")
    def enforce_matching_status(self) -> Self:
        if self.status != self.readiness.status:
            raise ValueError("descriptor and readiness statuses must match")
        return self

    @property
    def original_filename(self) -> None:
        """Raw client filenames are intentionally absent from the serialized contract."""
        return None
