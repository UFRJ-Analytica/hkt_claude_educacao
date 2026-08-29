from datetime import UTC, datetime
from pathlib import Path

import pytest

from app.core.errors import AppError
from app.intake.contracts import DatasetDescriptor, Readiness, ReadinessStatus
from app.intake.service import MemoryIntakeRepository
from app.intake.sqlite_repository import SQLiteIntakeRepository
from app.mapping.contracts import (
    CanonicalField,
    JoinKeyMapping,
    JoinRegistrationCreate,
    JoinTargetField,
    MappingStatus,
)
from app.mapping.join_service import JoinService
from app.mapping.service import MappingService
from app.profiling.schema_profiler import (
    ColumnProfile,
    PrivacyFinding,
    PrivacyRisk,
    SchemaProfile,
)


def _descriptor(
    *names: str,
    status: ReadinessStatus = ReadinessStatus.READY,
    pii: tuple[str, ...] = (),
) -> DatasetDescriptor:
    reasons = ("probable_pii_high_risk",) if status is ReadinessStatus.BLOCKED else ()
    readiness = Readiness(
        status=status,
        score=0 if status is ReadinessStatus.BLOCKED else 100,
        blocking_reasons=reasons,
    )
    return DatasetDescriptor(
        dataset_id="a" * 32,
        created_at=datetime(2026, 1, 1, tzinfo=UTC),
        status=status,
        profile=SchemaProfile(
            format="csv",
            columns=tuple(
                ColumnProfile(name=name, type="str", null_rate=0, distinct_estimate=1)
                for name in names
            ),
            row_estimate=1,
            privacy_findings=tuple(
                PrivacyFinding(
                    column=name,
                    category="EMAIL",
                    risk=PrivacyRisk.HIGH,
                    detected_by=("COLUMN_NAME",),
                )
                for name in pii
            ),
        ),
        readiness=readiness,
    )


def test_exact_alias_normalization_without_fuzzy_and_pii_excluded() -> None:
    repository = MemoryIntakeRepository()
    repository.add(
        _descriptor("Código INEP", "valor", "school_identifier", "email", pii=("email",))
    )

    proposal = MappingService(repository).propose("a" * 32)

    assert [(item.source_column, item.canonical_field) for item in proposal.candidates] == [
        ("Código INEP", CanonicalField.INEP_ID),
        ("valor", CanonicalField.VALUE),
    ]
    assert proposal.unmapped_columns == ("school_identifier", "email")
    assert proposal.status is MappingStatus.PROPOSED
    assert all(item.confidence == 1.0 for item in proposal.candidates)


def test_target_collision_requires_review_and_is_not_auto_mapped() -> None:
    repository = MemoryIntakeRepository()
    repository.add(_descriptor("inep", "codigo_inep", "unidade"))

    proposal = MappingService(repository).propose("a" * 32)

    assert proposal.status is MappingStatus.REVIEW
    assert [(item.source_column, item.canonical_field) for item in proposal.candidates] == [
        ("unidade", CanonicalField.UNIT)
    ]
    assert proposal.unmapped_columns == ("inep", "codigo_inep")
    assert "alias_collision" in proposal.limitations


def test_blocked_descriptor_produces_no_candidates() -> None:
    repository = MemoryIntakeRepository()
    repository.add(_descriptor("school_id", status=ReadinessStatus.BLOCKED))

    proposal = MappingService(repository).propose("a" * 32)

    assert proposal.status is MappingStatus.BLOCKED
    assert proposal.candidates == ()


def test_global_mapping_review_is_carried_into_join_approval(tmp_path: Path) -> None:
    repository = SQLiteIntakeRepository(tmp_path / "review.sqlite3")
    repository.add(_descriptor("inep", "codigo_inep", "cre_id"))
    service = JoinService(repository)

    registration = service.register(
        JoinRegistrationCreate(
            dataset_id="a" * 32,
            mappings=(
                JoinKeyMapping(source_column="cre_id", target_field=JoinTargetField.CRE_ID),
            ),
        )
    )

    assert registration.requires_review is True
    with pytest.raises(AppError) as error:
        service.approve(registration.join_id)
    assert error.value.code == "join_review_required"


def test_descriptor_change_invalidates_registered_proposal_snapshot(tmp_path: Path) -> None:
    repository = SQLiteIntakeRepository(tmp_path / "snapshot.sqlite3")
    repository.add(_descriptor("school_id"))
    service = JoinService(repository)
    registration = service.register(
        JoinRegistrationCreate(
            dataset_id="a" * 32,
            mappings=(
                JoinKeyMapping(source_column="school_id", target_field=JoinTargetField.SCHOOL_ID),
            ),
        )
    )
    repository.add(_descriptor("school_id", "unit"))

    with pytest.raises(AppError) as error:
        service.approve(registration.join_id)
    assert error.value.code == "join_proposal_changed"
