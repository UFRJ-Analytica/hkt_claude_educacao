from typing import Literal

from pydantic import Field, field_validator

from app.contracts.data import StrictModel
from app.schools.identity_contracts import SchoolContext

AIRole = Literal["central_manager", "school_manager", "teacher", "guardian"]
AIProvider = Literal["fake", "anthropic"]


class AIBriefingRequestV1(StrictModel):
    question: str = Field(min_length=8, max_length=1_000)
    role: AIRole
    evidence_ids: tuple[str, ...] = Field(default_factory=tuple, max_length=8)

    @field_validator("evidence_ids")
    @classmethod
    def validate_evidence_ids(cls, values: tuple[str, ...]) -> tuple[str, ...]:
        cleaned = tuple(value.strip() for value in values)
        if any(not value for value in cleaned):
            raise ValueError("evidence_ids cannot contain blanks")
        if len(set(cleaned)) != len(cleaned):
            raise ValueError("evidence_ids must be unique")
        return cleaned


class AIGovernancePolicyV1(StrictModel):
    raw_rows_access: Literal["denied"] = "denied"
    decision_automation: Literal["denied"] = "denied"
    allowed_tools: tuple[Literal["get_evidence"], ...] = ("get_evidence",)
    max_evidence_ids: int = 8


class AISchoolActionPlanRequestV1(StrictModel):
    school_id: str = Field(
        min_length=1,
        max_length=128,
        pattern=r"^[A-Za-z0-9][A-Za-z0-9._-]*$",
    )
    role: AIRole
    focus: str = Field(min_length=3, max_length=200)


class AISchoolActionPlanV1(StrictModel):
    title: str = Field(min_length=1)
    observed_signals: tuple[str, ...] = Field(min_length=1)
    hypotheses_to_validate: tuple[str, ...] = Field(min_length=1)
    short_term_actions: tuple[str, ...] = Field(min_length=1)
    medium_term_actions: tuple[str, ...] = Field(min_length=1)
    data_gaps: tuple[str, ...] = Field(min_length=1)


class AISchoolActionPlanResponseV1(StrictModel):
    api_contract_version: Literal["1.0.0"] = "1.0.0"
    provider: AIProvider
    model: str = Field(min_length=1)
    role: AIRole
    school_context: SchoolContext
    plan: AISchoolActionPlanV1
    guardrails: tuple[str, ...] = Field(min_length=1)
    policy: AIGovernancePolicyV1


class AIBriefingResponseV1(StrictModel):
    api_contract_version: Literal["1.0.0"] = "1.0.0"
    provider: AIProvider
    model: str = Field(min_length=1)
    role: AIRole
    snapshot_id: str = Field(min_length=1)
    used_evidence_ids: tuple[str, ...]
    answer: str = Field(min_length=1)
    guardrails: tuple[str, ...] = Field(min_length=1)
    policy: AIGovernancePolicyV1
