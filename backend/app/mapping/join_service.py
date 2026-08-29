import hashlib
import json
from datetime import UTC, datetime
from typing import Protocol, cast
from uuid import UUID, uuid4

from app.core.errors import AppError
from app.intake.contracts import DatasetDescriptor, ReadinessStatus
from app.intake.service import IntakeRepository
from app.mapping.contracts import (
    ApprovalBasis,
    ApprovalCommand,
    CanonicalField,
    JoinAudit,
    JoinAuditCreate,
    JoinRegistration,
    JoinRegistrationCreate,
    JoinState,
    MappingCandidate,
    MappingProposal,
    MappingStatus,
)
from app.mapping.service import MappingService


class JoinRepository(Protocol):
    def add_join(self, registration: JoinRegistration) -> None: ...

    def get_join(self, join_id: UUID) -> JoinRegistration | None: ...

    def list_joins(
        self, dataset_id: str | None, limit: int, offset: int
    ) -> tuple[JoinRegistration, ...]: ...

    def approve_join(self, join_id: UUID, approved_at: datetime, basis: ApprovalBasis) -> bool: ...

    def add_audit(self, audit: JoinAudit) -> None: ...

    def list_audits(self, join_id: UUID, limit: int, offset: int) -> tuple[JoinAudit, ...]: ...


class JoinNotFoundError(AppError):
    def __init__(self) -> None:
        super().__init__("join_not_found", "Join registration was not found.", 404)


class JoinDatasetNotFoundError(AppError):
    def __init__(self) -> None:
        super().__init__("dataset_not_found", "Dataset was not found.", 404)


class InvalidJoinTransitionError(AppError):
    def __init__(self) -> None:
        super().__init__(
            "invalid_join_transition",
            "Join registration cannot transition from its current state.",
            409,
        )


class InvalidJoinMappingError(AppError):
    def __init__(self) -> None:
        super().__init__("invalid_join_mapping", "Join mapping is not currently eligible.", 409)


class BlockedJoinError(AppError):
    def __init__(self) -> None:
        super().__init__("join_dataset_blocked", "Blocked datasets cannot be joined.", 409)


class JoinReviewRequiredError(AppError):
    def __init__(self) -> None:
        super().__init__(
            "join_review_required", "A documented manual review is required for approval.", 409
        )


class JoinProposalChangedError(AppError):
    def __init__(self) -> None:
        super().__init__(
            "join_proposal_changed",
            "The mapping proposal changed after this join was registered.",
            409,
        )


class JoinNotApprovedError(AppError):
    def __init__(self) -> None:
        super().__init__("join_not_approved", "Audits require an approved join.", 409)


def _proposal_hash(proposal: MappingProposal) -> str:
    canonical = json.dumps(
        proposal.model_dump(mode="json"),
        ensure_ascii=False,
        sort_keys=True,
        separators=(",", ":"),
    ).encode("utf-8")
    return hashlib.sha256(canonical).hexdigest()


class JoinService:
    def __init__(
        self,
        intake_repository: IntakeRepository,
        repository: JoinRepository | None = None,
        mapping_service: MappingService | None = None,
    ) -> None:
        self._intake_repository = intake_repository
        self._repository = repository or cast(JoinRepository, intake_repository)
        self._mapping_service = mapping_service or MappingService(intake_repository)

    def _validate(
        self, command: JoinRegistrationCreate | JoinRegistration
    ) -> tuple[DatasetDescriptor, MappingProposal, tuple[MappingCandidate, ...]]:
        descriptor = self._intake_repository.get(command.dataset_id)
        if descriptor is None:
            raise JoinDatasetNotFoundError()
        proposal = self._mapping_service.propose(command.dataset_id)
        if descriptor.status is ReadinessStatus.BLOCKED or proposal.status is MappingStatus.BLOCKED:
            raise BlockedJoinError()

        columns = [column.name for column in descriptor.profile.columns]
        private = {finding.column for finding in descriptor.profile.privacy_findings}
        by_pair = {
            (candidate.source_column, candidate.canonical_field): candidate
            for candidate in proposal.candidates
        }
        selected: list[MappingCandidate] = []
        for mapping in command.mappings:
            target = CanonicalField(mapping.target_field.value)
            candidate = by_pair.get((mapping.source_column, target))
            if (
                columns.count(mapping.source_column) != 1
                or mapping.source_column in private
                or not candidate
            ):
                raise InvalidJoinMappingError()
            selected.append(candidate)
        return descriptor, proposal, tuple(selected)

    def register(self, command: JoinRegistrationCreate) -> JoinRegistration:
        _, proposal, candidates = self._validate(command)
        registration = JoinRegistration(
            join_id=uuid4(),
            dataset_id=command.dataset_id,
            identity_release_id=command.identity_release_id,
            mappings=command.mappings,
            state=JoinState.DRAFT,
            created_at=datetime.now(UTC),
            requires_review=(
                proposal.status is MappingStatus.REVIEW
                or any(candidate.requires_review for candidate in candidates)
            ),
            identity_release_verified=False,
            proposal_hash=_proposal_hash(proposal),
        )
        self._repository.add_join(registration)
        return registration

    def approve(self, join_id: UUID, command: ApprovalCommand | None = None) -> JoinRegistration:
        registration = self._repository.get_join(join_id)
        if registration is None:
            raise JoinNotFoundError()
        if registration.state is not JoinState.DRAFT:
            raise InvalidJoinTransitionError()
        descriptor, proposal, _ = self._validate(registration)
        if (
            registration.proposal_hash == "0" * 64
            or _proposal_hash(proposal) != registration.proposal_hash
        ):
            raise JoinProposalChangedError()
        requires_manual = (
            descriptor.status is not ReadinessStatus.READY or registration.requires_review
        )
        manually_reviewed = command is not None and command.reviewed
        if requires_manual and not manually_reviewed:
            raise JoinReviewRequiredError()
        basis = ApprovalBasis.MANUAL_REVIEW if manually_reviewed else ApprovalBasis.SYSTEM_VALIDATED
        approved_at = datetime.now(UTC)
        if not self._repository.approve_join(join_id, approved_at, basis):
            raise InvalidJoinTransitionError()
        approved = self._repository.get_join(join_id)
        if approved is None:  # pragma: no cover - defensive against external deletion
            raise JoinNotFoundError()
        return approved

    def list(
        self, dataset_id: str | None, limit: int = 100, offset: int = 0
    ) -> tuple[JoinRegistration, ...]:
        return self._repository.list_joins(dataset_id, limit, offset)

    def audit(self, join_id: UUID, command: JoinAuditCreate) -> JoinAudit:
        registration = self._repository.get_join(join_id)
        if registration is None:
            raise JoinNotFoundError()
        if registration.state is not JoinState.APPROVED:
            raise JoinNotApprovedError()
        match_rate = command.matched_rows / command.input_rows if command.input_rows else 0.0
        audit = JoinAudit(
            audit_id=uuid4(),
            join_id=join_id,
            input_rows=command.input_rows,
            matched_rows=command.matched_rows,
            unmatched_source_rows=command.unmatched_source_rows,
            unmatched_target_rows=command.unmatched_target_rows,
            conflicting_rows=command.conflicting_rows,
            match_rate=match_rate,
            created_at=datetime.now(UTC),
        )
        self._repository.add_audit(audit)
        return audit

    def audits(self, join_id: UUID, limit: int = 100, offset: int = 0) -> tuple[JoinAudit, ...]:
        if self._repository.get_join(join_id) is None:
            raise JoinNotFoundError()
        return self._repository.list_audits(join_id, limit, offset)
