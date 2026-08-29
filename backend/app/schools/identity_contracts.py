"""Contracts for exact, auditable school identity resolution."""

from enum import StrEnum
from typing import Literal

from pydantic import Field, model_validator

from app.contracts.data import StrictModel
from app.contracts.provenance import Provenance, SourceKind
from app.schools.contracts import Coordinates, IndicatorId, SchoolIdentity, SchoolProfile


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


class OfficialSchoolListQuery(StrictModel):
    cre: int | None = Field(default=None, ge=1, le=11)
    limit: int = Field(default=2000, ge=1, le=5000)
    offset: int = Field(default=0, ge=0)


class OfficialSchoolListCoverage(StrictModel):
    total: int = Field(ge=0)
    with_coordinates: int = Field(ge=0)
    returned: int = Field(ge=0)

    @model_validator(mode="after")
    def validate_counts(self) -> "OfficialSchoolListCoverage":
        if self.with_coordinates > self.total:
            raise ValueError("with_coordinates cannot exceed total")
        if self.returned > self.total:
            raise ValueError("returned cannot exceed total")
        return self


class OfficialSchoolList(StrictModel):
    records: tuple[CanonicalSchoolRecord, ...]
    coverage: OfficialSchoolListCoverage
    available_cres: tuple[int, ...]
    snapshot_id: str = Field(pattern=r"^[0-9a-f]{64}$")
    generated: bool
    provenance: Provenance
    limitations: tuple[str, ...]

    @model_validator(mode="after")
    def validate_list(self) -> "OfficialSchoolList":
        if self.generated != self.provenance.generated:
            raise ValueError("generated must match provenance.generated")
        if self.snapshot_id != self.provenance.data_version:
            raise ValueError("snapshot_id must match provenance.data_version")
        if len(self.records) != self.coverage.returned:
            raise ValueError("record count must equal returned coverage")
        if tuple(sorted(set(self.available_cres))) != self.available_cres:
            raise ValueError("available_cres must be sorted and unique")
        if not self.limitations or any(not value.strip() for value in self.limitations):
            raise ValueError("official school list requires nonblank limitations")
        return self


class SchoolContextMapLinks(StrictModel):
    google_maps_url: str = Field(min_length=1)
    directions_url: str = Field(min_length=1)


class SchoolMetricCoverageStatus(StrEnum):
    SYNTHETIC_SNAPSHOT_MATCHED = "SYNTHETIC_SNAPSHOT_MATCHED"
    IDENTITY_ONLY = "IDENTITY_ONLY"


class SchoolMetricCoverage(StrictModel):
    status: SchoolMetricCoverageStatus
    message: str = Field(min_length=1)
    snapshot_id: str | None = Field(default=None, pattern=r"^[0-9a-f]{64}$")


class SchoolMetricComparison(StrictModel):
    indicator_id: IndicatorId
    school_value: float
    cre_average: float | None = None
    network_average: float | None = None
    delta_vs_cre: float | None = None
    delta_vs_network: float | None = None
    period: str | None = None
    evidence_id: str | None = None
    source_kind: SourceKind


class SchoolContext(StrictModel):
    api_contract_version: Literal["1.0.0"] = "1.0.0"
    official_record: CanonicalSchoolRecord
    map_links: SchoolContextMapLinks
    metric_coverage: SchoolMetricCoverage
    synthetic_profile: SchoolProfile | None
    comparisons: tuple[SchoolMetricComparison, ...]
    provenance: Provenance
    limitations: tuple[str, ...]

    @model_validator(mode="after")
    def validate_context(self) -> "SchoolContext":
        if (
            self.metric_coverage.status is SchoolMetricCoverageStatus.IDENTITY_ONLY
            and (self.synthetic_profile is not None or self.comparisons)
        ):
            raise ValueError("identity-only context cannot expose synthetic metrics")
        if not self.limitations or any(not value.strip() for value in self.limitations):
            raise ValueError("school context requires nonblank limitations")
        return self


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
