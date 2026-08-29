"""Versioned contracts for product/data strategy exposed to UI and governed AI."""

from typing import Literal

from pydantic import Field, model_validator

from app.contracts.data import StrictModel
from app.contracts.provenance import SourceKind

ApiContractVersion = Literal["1.0.0"]
RuntimeStatus = Literal["INGESTED", "NOT_INGESTED", "MOCK_ONLY", "MISSING"]
ProbabilityBand = Literal["HIGH", "MEDIUM", "LOW", "UNKNOWN"]
RoleId = Literal["sme_central", "cre_manager", "school_manager", "teacher", "family"]


class CurrentRuntimeV1(StrictModel):
    storage: Literal["DuckDB over governed Parquet release"]
    generated: bool
    release_id: str | None = Field(default=None, pattern=r"^[a-f0-9]{64}$")
    scenario: str | None = None
    synthetic_assets: tuple[str, ...]
    limitations: tuple[str, ...] = Field(min_length=1)

    @model_validator(mode="after")
    def generated_runtime_has_release(self) -> "CurrentRuntimeV1":
        if self.generated and not self.release_id:
            raise ValueError("generated runtime requires release_id")
        return self


class RealSourceCandidateV1(StrictModel):
    source_id: str = Field(pattern=r"^[a-z][a-z0-9_]*$")
    label: str = Field(min_length=1)
    source_kind: SourceKind
    runtime_status: RuntimeStatus
    expected_grain: str = Field(min_length=1)
    join_keys: tuple[str, ...]
    use_if_received: tuple[str, ...] = Field(min_length=1)
    caveats: tuple[str, ...] = Field(min_length=1)


class AdaptationDomainV1(StrictModel):
    domain_id: str = Field(pattern=r"^[a-z][a-z0-9_]*$")
    label: str = Field(min_length=1)
    probability_band: ProbabilityBand
    runtime_status: RuntimeStatus
    current_synthetic_assets: tuple[str, ...]
    missing_real_fields: tuple[str, ...]
    supported_decisions: tuple[str, ...]
    primary_roles: tuple[RoleId, ...]
    ai_boundary: str = Field(min_length=1)


class AIUsageStepV1(StrictModel):
    step_id: str = Field(pattern=r"^[a-z][a-z0-9_]*$")
    role: RoleId
    allowed_ai_use: str = Field(min_length=1)
    forbidden_ai_use: str = Field(min_length=1)
    required_evidence: tuple[str, ...] = Field(min_length=1)
    human_review_required: bool


class CriticalGapV1(StrictModel):
    gap_id: str = Field(pattern=r"^[a-z][a-z0-9_]*$")
    why_it_matters: str = Field(min_length=1)
    pull_first: tuple[str, ...] = Field(min_length=1)
    blocks: tuple[str, ...] = Field(min_length=1)


class StrategyDataPlanV1(StrictModel):
    api_contract_version: ApiContractVersion = "1.0.0"
    product_thesis: str = Field(min_length=1)
    current_runtime: CurrentRuntimeV1
    real_source_candidates: tuple[RealSourceCandidateV1, ...] = Field(min_length=1)
    adaptation_domains: tuple[AdaptationDomainV1, ...] = Field(min_length=1)
    ai_usage_ladder: tuple[AIUsageStepV1, ...] = Field(min_length=1)
    critical_gaps: tuple[CriticalGapV1, ...] = Field(min_length=1)
    next_implementation_shot: tuple[str, ...] = Field(min_length=1)
