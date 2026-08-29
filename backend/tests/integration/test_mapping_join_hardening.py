import sqlite3
from datetime import UTC, datetime
from pathlib import Path

import pytest
from fastapi.testclient import TestClient
from pydantic import ValidationError

from app.composition import create_app
from app.core.config import Settings
from app.core.errors import AppError
from app.intake.contracts import DatasetDescriptor, Readiness, ReadinessStatus
from app.intake.sqlite_repository import SQLiteIntakeRepository
from app.mapping.contracts import (
    ApprovalBasis,
    JoinAuditCreate,
    JoinKeyMapping,
    JoinRegistrationCreate,
    JoinTargetField,
)
from app.mapping.join_service import JoinService
from app.profiling.schema_profiler import ColumnProfile, SchemaProfile


def _descriptor(
    dataset_id: str, status: ReadinessStatus = ReadinessStatus.READY
) -> DatasetDescriptor:
    readiness = (
        Readiness(status=ReadinessStatus.READY, score=100)
        if status is ReadinessStatus.READY
        else Readiness(status=ReadinessStatus.REVIEW, score=70, warnings=("schema_warning",))
        if status is ReadinessStatus.REVIEW
        else Readiness(
            status=ReadinessStatus.BLOCKED,
            score=0,
            blocking_reasons=("blocked",),
        )
    )
    return DatasetDescriptor(
        dataset_id=dataset_id,
        created_at=datetime(2026, 1, 1, tzinfo=UTC),
        status=status,
        profile=SchemaProfile(
            format="csv",
            columns=(
                ColumnProfile(name="school_id", type="str", null_rate=0, distinct_estimate=1),
            ),
            row_estimate=1,
            warnings=readiness.warnings,
        ),
        readiness=readiness,
    )


def _command(dataset_id: str, identity_release_id: str | None = None) -> JoinRegistrationCreate:
    return JoinRegistrationCreate(
        dataset_id=dataset_id,
        identity_release_id=identity_release_id,
        mappings=(
            JoinKeyMapping(source_column="school_id", target_field=JoinTargetField.SCHOOL_ID),
        ),
    )


def test_join_target_is_identity_only_and_audit_source_partition_is_complete() -> None:
    with pytest.raises(ValidationError):
        JoinRegistrationCreate.model_validate(
            {
                "dataset_id": "a" * 32,
                "mappings": [{"source_column": "value", "target_field": "value"}],
            }
        )
    with pytest.raises(ValidationError):
        JoinAuditCreate(
            input_rows=10,
            matched_rows=1,
            unmatched_source_rows=0,
            unmatched_target_rows=9,
            conflicting_rows=0,
        )


def test_review_requires_explicit_manual_approval_and_tracks_snapshot(tmp_path: Path) -> None:
    repository = SQLiteIntakeRepository(tmp_path / "catalog.sqlite3")
    descriptor = _descriptor("a" * 32, ReadinessStatus.REVIEW)
    repository.add(descriptor)
    app = create_app(
        Settings(
            environment="test",
            cors_origins=(),
            intake_root=tmp_path / "uploads",
            intake_catalog_path=tmp_path / "ignored.sqlite3",
        ),
        intake_repository=repository,
    )
    client = TestClient(app, raise_server_exceptions=False)
    payload = {
        "dataset_id": descriptor.dataset_id,
        "identity_release_id": "b" * 64,
        "mappings": [{"source_column": "school_id", "target_field": "school_id"}],
    }
    first = client.post("/api/v1/data/joins", json=payload)
    second = client.post("/api/v1/data/joins", json=payload)
    assert first.status_code == second.status_code == 201
    assert first.json()["requires_review"] is True
    assert first.json()["identity_release_verified"] is False
    assert first.json()["proposal_hash"] == second.json()["proposal_hash"]
    join_id = first.json()["join_id"]
    rejected = client.post(f"/api/v1/data/joins/{join_id}/approve")
    assert rejected.status_code == 409
    assert rejected.json()["error"]["code"] == "join_review_required"
    approved = client.post(
        f"/api/v1/data/joins/{join_id}/approve",
        json={"reviewed": True, "basis": "MANUAL_REVIEW"},
    )
    assert approved.status_code == 200
    assert approved.json()["state"] == "APPROVED"
    assert approved.json()["approval_basis"] == ApprovalBasis.MANUAL_REVIEW
    assert approved.json()["approved_at"].endswith("Z")


def test_blocked_and_non_candidate_mappings_are_sanitized_conflicts(tmp_path: Path) -> None:
    repository = SQLiteIntakeRepository(tmp_path / "eligibility.sqlite3")
    blocked = _descriptor("d" * 32, ReadinessStatus.BLOCKED)
    ready = _descriptor("e" * 32)
    repository.add(blocked)
    repository.add(ready)
    service = JoinService(repository)
    with pytest.raises(AppError) as blocked_error:
        service.register(_command(blocked.dataset_id))
    assert (blocked_error.value.status_code, blocked_error.value.code) == (
        409,
        "join_dataset_blocked",
    )
    invalid = JoinRegistrationCreate(
        dataset_id=ready.dataset_id,
        mappings=(
            JoinKeyMapping(
                source_column="not_in_schema",
                target_field=JoinTargetField.SCHOOL_ID,
            ),
        ),
    )
    with pytest.raises(AppError) as mapping_error:
        service.register(invalid)
    assert (mapping_error.value.status_code, mapping_error.value.code) == (
        409,
        "invalid_join_mapping",
    )


def test_atomic_limits_draft_audit_rejection_and_sqlite_check(tmp_path: Path) -> None:
    path = tmp_path / "limits.sqlite3"
    repository = SQLiteIntakeRepository(path, max_joins_per_dataset=1, max_audits_per_join=1)
    descriptor = _descriptor("c" * 32)
    repository.add(descriptor)
    service = JoinService(repository)
    registration = service.register(_command(descriptor.dataset_id))
    with pytest.raises(AppError) as join_limit:
        service.register(_command(descriptor.dataset_id))
    assert join_limit.value.status_code == 429
    valid = JoinAuditCreate(
        input_rows=1,
        matched_rows=1,
        unmatched_source_rows=0,
        unmatched_target_rows=10,
        conflicting_rows=0,
    )
    with pytest.raises(AppError) as draft:
        service.audit(registration.join_id, valid)
    assert draft.value.status_code == 409
    service.approve(registration.join_id)
    service.audit(registration.join_id, valid)
    with pytest.raises(AppError) as audit_limit:
        service.audit(registration.join_id, valid)
    assert audit_limit.value.status_code == 429
    with sqlite3.connect(path) as connection, pytest.raises(sqlite3.IntegrityError):
        connection.execute(
            """INSERT INTO join_audits VALUES (?, ?, 10, 1, 0, 9, 0, 0.1, ?)""",
            ("bad", str(registration.join_id), datetime.now(UTC).isoformat()),
        )


def test_upgrade_v1_like_schema_and_future_version_fail_fast(tmp_path: Path) -> None:
    path = tmp_path / "upgrade.sqlite3"
    with sqlite3.connect(path) as connection:
        connection.executescript(
            """
            CREATE TABLE dataset_descriptors (
              dataset_id TEXT PRIMARY KEY, created_at TEXT NOT NULL,
              status TEXT NOT NULL, descriptor_json TEXT NOT NULL);
            CREATE TABLE mapping_proposals (
              dataset_id TEXT PRIMARY KEY REFERENCES dataset_descriptors(dataset_id),
              proposal_json TEXT NOT NULL, updated_at TEXT NOT NULL);
            CREATE TABLE join_registrations (
              join_id TEXT PRIMARY KEY, dataset_id TEXT NOT NULL
                REFERENCES dataset_descriptors(dataset_id),
              identity_release_id TEXT, mappings_json TEXT NOT NULL, state TEXT NOT NULL,
              created_at TEXT NOT NULL);
            CREATE TABLE join_audits (
              audit_id TEXT PRIMARY KEY, join_id TEXT NOT NULL
                REFERENCES join_registrations(join_id),
              input_rows INTEGER NOT NULL, matched_rows INTEGER NOT NULL,
              unmatched_source_rows INTEGER NOT NULL, unmatched_target_rows INTEGER NOT NULL,
              conflicting_rows INTEGER NOT NULL, match_rate REAL NOT NULL, created_at TEXT NOT NULL,
              CHECK (matched_rows + unmatched_source_rows + conflicting_rows <= input_rows));
            PRAGMA user_version = 1;
            """
        )
    SQLiteIntakeRepository(path)
    SQLiteIntakeRepository(path)
    with sqlite3.connect(path) as connection:
        assert connection.execute("PRAGMA user_version").fetchone()[0] == 2
        columns = {row[1] for row in connection.execute("PRAGMA table_info(join_registrations)")}
        assert {"approved_at", "approval_basis", "requires_review", "proposal_hash"} <= columns
        connection.execute("PRAGMA user_version = 3")
    with pytest.raises(RuntimeError, match="newer"):
        SQLiteIntakeRepository(path)
