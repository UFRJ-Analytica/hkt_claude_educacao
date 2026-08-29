"""Contracts for exact, auditable school identity resolution."""

from enum import StrEnum

from pydantic import Field, model_validator

from app.contracts.data import StrictModel
from app.contracts.provenance import Provenance
from app.schools.contracts import Coordinates, SchoolIdentity


class IdentityMatchField(StrEnum):
    SCHOOL_ID = "school_id"
    INEP_ID = "inep_id"
    SME_DESIGNATION = "sme_designation"


class IdentityResolutionStatus(StrEnum):
    MATCHED = "MATCHED"
    NOT_FOUND = "NOT_FOUND"
    CONFLICT = "CONFLICT"


class IdentityLookup(StrictModel):
    school_id: str | None = Field(
        default=None,
        min_length=1,
        max_length=128,
        pattern=r"^[A-Za-z0-9][A-Za-z0-9._-]*$",
    )
    inep_id: str | None = Field(default=None, pattern=r"^\d{8}$")
    sme_designation: str | None = Field(default=None, pattern=r"^\d{7}$")

    @model_validator(mode="after")
    def require_identifier(self) -> "IdentityLookup":
        if self.school_id is None and self.inep_id is None and self.sme_designation is None:
            raise ValueError("at least one school identifier is required")
        return self

    def supplied(self) -> tuple[tuple[IdentityMatchField, str], ...]:
        ordered = (
            (IdentityMatchField.SCHOOL_ID, self.school_id),
            (IdentityMatchField.INEP_ID, self.inep_id),
            (IdentityMatchField.SME_DESIGNATION, self.sme_designation),
        )
        return tuple((field, value) for field, value in ordered if value is not None)


class CanonicalSchoolRecord(StrictModel):
    identity: SchoolIdentity
    coordinates: Coordinates | None = None


class SchoolIdentityResolution(StrictModel):
    status: IdentityResolutionStatus
    record: CanonicalSchoolRecord | None
    matched_by: tuple[IdentityMatchField, ...]
    confidence: float = Field(ge=0, le=1)
    provenance: Provenance
    limitations: tuple[str, ...]

    @model_validator(mode="after")
    def require_coherent_result(self) -> "SchoolIdentityResolution":
        if self.status is IdentityResolutionStatus.MATCHED:
            if self.record is None or not self.matched_by or self.confidence != 1.0:
                raise ValueError("matched identity requires record, keys, and exact confidence")
        elif self.record is not None or self.confidence != 0.0:
            raise ValueError("unresolved identity cannot expose a record or confidence")
        if not self.limitations or any(not value.strip() for value in self.limitations):
            raise ValueError("identity resolution requires nonblank limitations")
        return self
