import sqlite3
from datetime import UTC, datetime
from pathlib import Path

import pytest

from app.intake.contracts import DatasetDescriptor, Readiness, ReadinessStatus
from app.intake.sqlite_repository import SQLiteIntakeRepository
from app.mapping.contracts import (
    CanonicalField,
    JoinAuditCreate,
    JoinKeyMapping,
    JoinRegistrationCreate,
)
from app.mapping.join_service import JoinService
from app.profiling.schema_profiler import ColumnProfile, SchemaProfile


def _descriptor(dataset_id: str, second: int) -> DatasetDescriptor:
    return DatasetDescriptor(
        dataset_id=dataset_id,
        created_at=datetime(2026, 1, 1, 0, 0, second, tzinfo=UTC),
        status=ReadinessStatus.READY,
        profile=SchemaProfile(
            format="csv",
            columns=(
                ColumnProfile(name="school_id", type="str", null_rate=0, distinct_estimate=1),
            ),
            row_estimate=1,
        ),
        readiness=Readiness(status=ReadinessStatus.READY, score=100),
    )


def test_restart_migrations_eviction_and_join_persistence(tmp_path: Path) -> None:
    path = tmp_path / "catalog.sqlite3"
    repository = SQLiteIntakeRepository(path, max_descriptors=2)
    first = _descriptor("1" * 32, 1)
    second = _descriptor("2" * 32, 2)
    third = _descriptor("3" * 32, 3)
    repository.add(first)
    repository.add(second)
    join_service = JoinService(repository)
    join = join_service.register(
        JoinRegistrationCreate(
            dataset_id=second.dataset_id,
            identity_release_id="a" * 64,
            mappings=(
                JoinKeyMapping(source_column="school_id", target_field=CanonicalField.SCHOOL_ID),
            ),
        )
    )
    join_service.approve(join.join_id)
    audit = join_service.audit(
        join.join_id,
        JoinAuditCreate(
            input_rows=1,
            matched_rows=1,
            unmatched_source_rows=0,
            unmatched_target_rows=10,
            conflicting_rows=0,
        ),
    )
    repository.add(third)
    fourth = _descriptor("4" * 32, 4)
    repository.add(fourth)

    reopened = SQLiteIntakeRepository(path, max_descriptors=2)
    SQLiteIntakeRepository(path, max_descriptors=2)  # migration is idempotent
    assert reopened.get(first.dataset_id) is None
    assert reopened.list() == (second, fourth)
    persisted_join = reopened.get_join(join.join_id)
    assert persisted_join is not None
    assert persisted_join.state == "APPROVED"
    assert reopened.list_joins(second.dataset_id, limit=1, offset=0) == (persisted_join,)
    assert reopened.list_audits(join.join_id, limit=1, offset=0) == (audit,)

    with sqlite3.connect(path) as connection:
        assert connection.execute("PRAGMA journal_mode").fetchone() == ("wal",)
        stored = connection.execute(
            "SELECT descriptor_json FROM dataset_descriptors WHERE dataset_id = ?",
            (second.dataset_id,),
        ).fetchone()[0]
    assert "secret-value" not in stored


def test_v1_incomplete_audit_migration_fails_with_governed_diagnostic(tmp_path: Path) -> None:
    path = tmp_path / "legacy.sqlite3"
    with sqlite3.connect(path) as connection:
        connection.executescript(
            """
            CREATE TABLE dataset_descriptors (
              dataset_id TEXT PRIMARY KEY, created_at TEXT NOT NULL,
              status TEXT NOT NULL, descriptor_json TEXT NOT NULL
            );
            CREATE TABLE join_registrations (
              join_id TEXT PRIMARY KEY, dataset_id TEXT NOT NULL,
              identity_release_id TEXT, mappings_json TEXT NOT NULL,
              state TEXT NOT NULL, created_at TEXT NOT NULL
            );
            CREATE TABLE join_audits (
              audit_id TEXT PRIMARY KEY, join_id TEXT NOT NULL,
              input_rows INTEGER NOT NULL, matched_rows INTEGER NOT NULL,
              unmatched_source_rows INTEGER NOT NULL,
              unmatched_target_rows INTEGER NOT NULL,
              conflicting_rows INTEGER NOT NULL, match_rate REAL NOT NULL,
              created_at TEXT NOT NULL,
              CHECK (matched_rows + unmatched_source_rows + conflicting_rows <= input_rows)
            );
            INSERT INTO join_registrations VALUES (
              '11111111-1111-1111-1111-111111111111', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
              NULL, '[]', 'DRAFT', '2026-01-01T00:00:00+00:00'
            );
            INSERT INTO join_audits VALUES (
              '22222222-2222-2222-2222-222222222222',
              '11111111-1111-1111-1111-111111111111',
              10, 1, 0, 0, 0, 0.1, '2026-01-01T00:00:00+00:00'
            );
            PRAGMA user_version = 1;
            """
        )

    with pytest.raises(RuntimeError, match="incomplete legacy join audits"):
        SQLiteIntakeRepository(path)
