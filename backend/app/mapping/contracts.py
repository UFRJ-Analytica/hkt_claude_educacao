from datetime import UTC, datetime
from enum import StrEnum
from typing import Self
from uuid import UUID

from pydantic import Field, field_validator, model_validator

from app.contracts.data import StrictModel


class CanonicalField(StrEnum):
    SCHOOL_ID = "school_id"
    INEP_ID = "inep_id"
    SME_DESIGNATION = "sme_designation"
    CRE_ID = "cre_id"
    INDICATOR_ID = "indicator_id"
    PERIOD_START = "period_start"
    PERIOD_END = "period_end"
    PUBLISHED_AT = "published_at"
    VALUE = "value"
    UNIT = "unit"
    NUMERATOR = "numerator"
    DENOMINATOR = "denominator"
    SOURCE_REF = "source_ref"


class JoinTargetField(StrEnum):
    """Identity fields that are safe and meaningful as join targets."""

    SCHOOL_ID = "school_id"
    INEP_ID = "inep_id"
    SME_DESIGNATION = "sme_designation"
    CRE_ID = "cre_id"


class MatchKind(StrEnum):
    EXACT_ALIAS = "EXACT_ALIAS"


class MappingStatus(StrEnum):
    PROPOSED = "PROPOSED"
    REVIEW = "REVIEW"
    BLOCKED = "BLOCKED"


class MappingCandidate(StrictModel):
    source_column: str = Field(min_length=1)
    canonical_field: CanonicalField
    match_kind: MatchKind = MatchKind.EXACT_ALIAS
    confidence: float = Field(default=1.0, ge=1.0, le=1.0)
    requires_review: bool = False


class MappingProposal(StrictModel):
    dataset_id: str = Field(pattern=r"^[0-9a-f]{32}$")
    status: MappingStatus
    candidates: tuple[MappingCandidate, ...] = ()
    unmapped_columns: tuple[str, ...] = ()
    limitations: tuple[str, ...] = ()


class JoinState(StrEnum):
    DRAFT = "DRAFT"
    APPROVED = "APPROVED"


class ApprovalBasis(StrEnum):
    MANUAL_REVIEW = "MANUAL_REVIEW"
    SYSTEM_VALIDATED = "SYSTEM_VALIDATED"


class ManualApprovalBasis(StrEnum):
    MANUAL_REVIEW = "MANUAL_REVIEW"


class ApprovalCommand(StrictModel):
    reviewed: bool = False
    basis: ManualApprovalBasis | None = None

    @model_validator(mode="after")
    def complete_manual_review(self) -> Self:
        if self.reviewed != (self.basis is ManualApprovalBasis.MANUAL_REVIEW):
            raise ValueError("reviewed=true and basis=MANUAL_REVIEW must be supplied together")
        return self


class JoinKeyMapping(StrictModel):
    source_column: str = Field(min_length=1, max_length=256)
    target_field: JoinTargetField


class JoinRegistrationCreate(StrictModel):
    dataset_id: str = Field(pattern=r"^[0-9a-f]{32}$")
    identity_release_id: str | None = Field(default=None, pattern=r"^[0-9a-f]{64}$")
    mappings: tuple[JoinKeyMapping, ...] = Field(min_length=1, max_length=50)

    @model_validator(mode="after")
    def unique_mappings(self) -> Self:
        sources = [mapping.source_column for mapping in self.mappings]
        targets = [mapping.target_field for mapping in self.mappings]
        if len(sources) != len(set(sources)) or len(targets) != len(set(targets)):
            raise ValueError("join mappings must have unique sources and targets")
        return self


class JoinRegistration(JoinRegistrationCreate):
    join_id: UUID
    state: JoinState
    created_at: datetime
    requires_review: bool
    identity_release_verified: bool = False
    proposal_hash: str = Field(pattern=r"^[0-9a-f]{64}$")
    approved_at: datetime | None = None
    approval_basis: ApprovalBasis | None = None

    @field_validator("created_at")
    @classmethod
    def aware_created_at(cls, value: datetime) -> datetime:
        if value.tzinfo is None or value.utcoffset() is None:
            raise ValueError("created_at must include timezone")
        return value.astimezone(UTC)

    @field_validator("approved_at")
    @classmethod
    def aware_approved_at(cls, value: datetime | None) -> datetime | None:
        if value is not None and (value.tzinfo is None or value.utcoffset() is None):
            raise ValueError("approved_at must include timezone")
        return value.astimezone(UTC) if value is not None else None


class JoinAuditCreate(StrictModel):
    input_rows: int = Field(ge=0)
    matched_rows: int = Field(ge=0)
    unmatched_source_rows: int = Field(ge=0)
    unmatched_target_rows: int = Field(ge=0)
    conflicting_rows: int = Field(ge=0)
    match_rate: float | None = Field(default=None, ge=0, le=1)

    @model_validator(mode="after")
    def validate_counts_and_rate(self) -> Self:
        accounted = self.matched_rows + self.unmatched_source_rows + self.conflicting_rows
        if accounted != self.input_rows:
            raise ValueError("source row counts must equal input_rows")
        expected = self.matched_rows / self.input_rows if self.input_rows else 0.0
        if self.match_rate is not None and abs(self.match_rate - expected) > 1e-12:
            raise ValueError("match_rate must equal matched_rows / input_rows")
        return self


class JoinAudit(JoinAuditCreate):
    audit_id: UUID
    join_id: UUID
    match_rate: float
    created_at: datetime

    @field_validator("created_at")
    @classmethod
    def audit_created_at_aware(cls, value: datetime) -> datetime:
        if value.tzinfo is None or value.utcoffset() is None:
            raise ValueError("created_at must include timezone")
        return value.astimezone(UTC)
