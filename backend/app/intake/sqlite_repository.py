import json
import sqlite3
from datetime import datetime
from pathlib import Path
from uuid import UUID

from app.core.errors import AppError
from app.intake.contracts import DatasetDescriptor
from app.mapping.contracts import (
    ApprovalBasis,
    JoinAudit,
    JoinKeyMapping,
    JoinRegistration,
    JoinState,
)

_SUPPORTED_SCHEMA_VERSION = 2
_SCHEMA = """
CREATE TABLE IF NOT EXISTS dataset_descriptors (
    dataset_id TEXT PRIMARY KEY,
    created_at TEXT NOT NULL,
    status TEXT NOT NULL,
    descriptor_json TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_dataset_descriptors_created
    ON dataset_descriptors(created_at, dataset_id);
CREATE TABLE IF NOT EXISTS mapping_proposals (
    dataset_id TEXT PRIMARY KEY REFERENCES dataset_descriptors(dataset_id) ON DELETE CASCADE,
    proposal_json TEXT NOT NULL,
    updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS join_registrations (
    join_id TEXT PRIMARY KEY,
    dataset_id TEXT NOT NULL REFERENCES dataset_descriptors(dataset_id) ON DELETE CASCADE,
    identity_release_id TEXT,
    mappings_json TEXT NOT NULL,
    state TEXT NOT NULL CHECK (state IN ('DRAFT', 'APPROVED')),
    created_at TEXT NOT NULL,
    requires_review INTEGER NOT NULL DEFAULT 0 CHECK (requires_review IN (0, 1)),
    identity_release_verified INTEGER NOT NULL DEFAULT 0 CHECK (identity_release_verified = 0),
    proposal_hash TEXT NOT NULL DEFAULT
      '0000000000000000000000000000000000000000000000000000000000000000',
    approved_at TEXT,
    approval_basis TEXT CHECK (approval_basis IN ('MANUAL_REVIEW', 'SYSTEM_VALIDATED'))
);
CREATE INDEX IF NOT EXISTS idx_join_registrations_dataset
    ON join_registrations(dataset_id, created_at, join_id);
CREATE TABLE IF NOT EXISTS join_audits (
    audit_id TEXT PRIMARY KEY,
    join_id TEXT NOT NULL REFERENCES join_registrations(join_id) ON DELETE CASCADE,
    input_rows INTEGER NOT NULL CHECK (input_rows >= 0),
    matched_rows INTEGER NOT NULL CHECK (matched_rows >= 0),
    unmatched_source_rows INTEGER NOT NULL CHECK (unmatched_source_rows >= 0),
    unmatched_target_rows INTEGER NOT NULL CHECK (unmatched_target_rows >= 0),
    conflicting_rows INTEGER NOT NULL CHECK (conflicting_rows >= 0),
    match_rate REAL NOT NULL CHECK (match_rate >= 0 AND match_rate <= 1),
    created_at TEXT NOT NULL,
    CHECK (matched_rows + unmatched_source_rows + conflicting_rows = input_rows)
);
CREATE INDEX IF NOT EXISTS idx_join_audits_join
    ON join_audits(join_id, created_at, audit_id);
"""


class SQLiteIntakeRepository:
    """Shared catalog. Connections and quota checks are operation-scoped and atomic."""

    def __init__(
        self,
        path: Path,
        max_descriptors: int = 1_000,
        max_joins_per_dataset: int = 100,
        max_audits_per_join: int = 1_000,
    ) -> None:
        if min(max_descriptors, max_joins_per_dataset, max_audits_per_join) <= 0:
            raise ValueError("repository limits must be positive")
        self._path = path
        self._max_descriptors = max_descriptors
        self._max_joins_per_dataset = max_joins_per_dataset
        self._max_audits_per_join = max_audits_per_join
        path.parent.mkdir(parents=True, exist_ok=True)
        self._migrate()

    def _connect(self) -> sqlite3.Connection:
        connection = sqlite3.connect(self._path, timeout=30)
        connection.execute("PRAGMA foreign_keys = ON")
        connection.execute("PRAGMA busy_timeout = 30000")
        connection.execute("PRAGMA journal_mode = WAL")
        return connection

    @staticmethod
    def _columns(connection: sqlite3.Connection, table: str) -> set[str]:
        return {str(row[1]) for row in connection.execute(f"PRAGMA table_info({table})")}

    def _migrate(self) -> None:
        with self._connect() as connection:
            version = int(connection.execute("PRAGMA user_version").fetchone()[0])
            if version > _SUPPORTED_SCHEMA_VERSION:
                raise RuntimeError("catalog schema version is newer than this application supports")
            connection.executescript(_SCHEMA)
            connection.execute("BEGIN IMMEDIATE")
            columns = self._columns(connection, "join_registrations")
            if version < 2 and "approval_basis" not in columns:
                approved_count = int(
                    connection.execute(
                        "SELECT COUNT(*) FROM join_registrations WHERE state = 'APPROVED'"
                    ).fetchone()[0]
                )
                if approved_count:
                    raise RuntimeError(
                        "legacy approved joins require an explicit governed migration"
                    )
            additions = {
                "requires_review": "INTEGER NOT NULL DEFAULT 0 CHECK (requires_review IN (0, 1))",
                "identity_release_verified": (
                    "INTEGER NOT NULL DEFAULT 0 CHECK (identity_release_verified = 0)"
                ),
                "proposal_hash": (
                    "TEXT NOT NULL DEFAULT "
                    "'0000000000000000000000000000000000000000000000000000000000000000'"
                ),
                "approved_at": "TEXT",
                "approval_basis": (
                    "TEXT CHECK (approval_basis IN ('MANUAL_REVIEW', 'SYSTEM_VALIDATED'))"
                ),
            }
            for name, declaration in additions.items():
                if name not in columns:
                    connection.execute(
                        f"ALTER TABLE join_registrations ADD COLUMN {name} {declaration}"
                    )
            audit_sql_row = connection.execute(
                "SELECT sql FROM sqlite_master WHERE type='table' AND name='join_audits'"
            ).fetchone()
            audit_sql = str(audit_sql_row[0]) if audit_sql_row else ""
            normalized = " ".join(audit_sql.split())
            equality = "matched_rows + unmatched_source_rows + conflicting_rows = input_rows"
            if equality not in normalized:
                incomplete_count = int(
                    connection.execute(
                        """SELECT COUNT(*) FROM join_audits
                           WHERE matched_rows + unmatched_source_rows + conflicting_rows
                                 != input_rows"""
                    ).fetchone()[0]
                )
                if incomplete_count:
                    raise RuntimeError(
                        "incomplete legacy join audits require explicit quarantine"
                    )
                connection.execute("ALTER TABLE join_audits RENAME TO join_audits_v1")
                connection.execute(
                    """CREATE TABLE join_audits (
                        audit_id TEXT PRIMARY KEY,
                        join_id TEXT NOT NULL
                          REFERENCES join_registrations(join_id) ON DELETE CASCADE,
                        input_rows INTEGER NOT NULL CHECK (input_rows >= 0),
                        matched_rows INTEGER NOT NULL CHECK (matched_rows >= 0),
                        unmatched_source_rows INTEGER NOT NULL CHECK (unmatched_source_rows >= 0),
                        unmatched_target_rows INTEGER NOT NULL CHECK (unmatched_target_rows >= 0),
                        conflicting_rows INTEGER NOT NULL CHECK (conflicting_rows >= 0),
                        match_rate REAL NOT NULL CHECK (match_rate >= 0 AND match_rate <= 1),
                        created_at TEXT NOT NULL,
                        CHECK (matched_rows + unmatched_source_rows + conflicting_rows = input_rows)
                    )"""
                )
                connection.execute(
                    "INSERT INTO join_audits SELECT * FROM join_audits_v1"
                )
                connection.execute("DROP TABLE join_audits_v1")
                connection.execute(
                    "CREATE INDEX idx_join_audits_join "
                    "ON join_audits(join_id, created_at, audit_id)"
                )
            connection.execute(f"PRAGMA user_version = {_SUPPORTED_SCHEMA_VERSION}")

    def add(self, descriptor: DatasetDescriptor) -> None:
        payload = descriptor.model_dump_json()
        with self._connect() as connection:
            connection.execute("BEGIN IMMEDIATE")
            connection.execute(
                """INSERT INTO dataset_descriptors(dataset_id, created_at, status, descriptor_json)
                   VALUES (?, ?, ?, ?)
                   ON CONFLICT(dataset_id) DO UPDATE SET
                     created_at=excluded.created_at, status=excluded.status,
                     descriptor_json=excluded.descriptor_json""",
                (
                    descriptor.dataset_id,
                    descriptor.created_at.isoformat(),
                    descriptor.status,
                    payload,
                ),
            )
            excess = int(
                connection.execute(
                    "SELECT MAX(COUNT(*) - ?, 0) FROM dataset_descriptors",
                    (self._max_descriptors,),
                ).fetchone()[0]
            )
            if excess:
                connection.execute(
                    """DELETE FROM dataset_descriptors WHERE dataset_id IN (
                         SELECT d.dataset_id FROM dataset_descriptors d
                         WHERE NOT EXISTS (
                           SELECT 1 FROM join_registrations j WHERE j.dataset_id = d.dataset_id
                         ) ORDER BY d.created_at ASC, d.dataset_id ASC LIMIT ?
                       )""",
                    (excess,),
                )

    def get(self, dataset_id: str) -> DatasetDescriptor | None:
        with self._connect() as connection:
            row = connection.execute(
                "SELECT descriptor_json FROM dataset_descriptors WHERE dataset_id = ?",
                (dataset_id,),
            ).fetchone()
        return DatasetDescriptor.model_validate_json(row[0]) if row else None

    def list(self, limit: int = 100, offset: int = 0) -> tuple[DatasetDescriptor, ...]:
        with self._connect() as connection:
            rows = connection.execute(
                """SELECT descriptor_json FROM dataset_descriptors
                   ORDER BY created_at ASC, dataset_id ASC LIMIT ? OFFSET ?""",
                (limit, offset),
            ).fetchall()
        return tuple(DatasetDescriptor.model_validate_json(row[0]) for row in rows)

    def add_join(self, registration: JoinRegistration) -> None:
        mappings_json = json.dumps(
            [mapping.model_dump(mode="json") for mapping in registration.mappings],
            ensure_ascii=False,
            separators=(",", ":"),
        )
        try:
            with self._connect() as connection:
                connection.execute("BEGIN IMMEDIATE")
                if (
                    connection.execute(
                        "SELECT 1 FROM dataset_descriptors WHERE dataset_id = ?",
                        (registration.dataset_id,),
                    ).fetchone()
                    is None
                ):
                    raise AppError("dataset_not_found", "Dataset was not found.", 404)
                count = int(
                    connection.execute(
                        "SELECT COUNT(*) FROM join_registrations WHERE dataset_id = ?",
                        (registration.dataset_id,),
                    ).fetchone()[0]
                )
                if count >= self._max_joins_per_dataset:
                    raise AppError("join_limit_reached", "Dataset join limit was reached.", 429)
                connection.execute(
                    """INSERT INTO join_registrations
                       (join_id, dataset_id, identity_release_id, mappings_json, state, created_at,
                        requires_review, identity_release_verified, proposal_hash, approved_at,
                        approval_basis) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                    (
                        str(registration.join_id),
                        registration.dataset_id,
                        registration.identity_release_id,
                        mappings_json,
                        registration.state,
                        registration.created_at.isoformat(),
                        int(registration.requires_review),
                        0,
                        registration.proposal_hash,
                        None,
                        None,
                    ),
                )
        except sqlite3.IntegrityError as exc:
            raise AppError("join_conflict", "Join registration could not be stored.", 409) from exc

    @staticmethod
    def _join(row: tuple[object, ...]) -> JoinRegistration:
        return JoinRegistration(
            join_id=row[0],
            dataset_id=row[1],
            identity_release_id=row[2],
            mappings=tuple(JoinKeyMapping.model_validate(item) for item in json.loads(str(row[3]))),
            state=row[4],
            created_at=row[5],
            requires_review=bool(row[6]),
            identity_release_verified=bool(row[7]),
            proposal_hash=row[8],
            approved_at=row[9],
            approval_basis=row[10],
        )

    _JOIN_SELECT = (
        "join_id, dataset_id, identity_release_id, mappings_json, state, created_at, "
        "requires_review, identity_release_verified, proposal_hash, approved_at, approval_basis"
    )

    def get_join(self, join_id: UUID) -> JoinRegistration | None:
        with self._connect() as connection:
            row = connection.execute(
                f"SELECT {self._JOIN_SELECT} FROM join_registrations WHERE join_id = ?",
                (str(join_id),),
            ).fetchone()
        return self._join(row) if row else None

    def list_joins(
        self, dataset_id: str | None, limit: int, offset: int
    ) -> tuple[JoinRegistration, ...]:
        with self._connect() as connection:
            if dataset_id is None:
                rows = connection.execute(
                    f"SELECT {self._JOIN_SELECT} FROM join_registrations "
                    "ORDER BY created_at ASC, join_id ASC LIMIT ? OFFSET ?",
                    (limit, offset),
                ).fetchall()
            else:
                rows = connection.execute(
                    f"SELECT {self._JOIN_SELECT} FROM join_registrations WHERE dataset_id = ? "
                    "ORDER BY created_at ASC, join_id ASC LIMIT ? OFFSET ?",
                    (dataset_id, limit, offset),
                ).fetchall()
        return tuple(self._join(row) for row in rows)

    def approve_join(self, join_id: UUID, approved_at: datetime, basis: ApprovalBasis) -> bool:
        with self._connect() as connection:
            connection.execute("BEGIN IMMEDIATE")
            cursor = connection.execute(
                """UPDATE join_registrations SET state = ?, approved_at = ?, approval_basis = ?
                   WHERE join_id = ? AND state = ?""",
                (JoinState.APPROVED, approved_at.isoformat(), basis, str(join_id), JoinState.DRAFT),
            )
            return cursor.rowcount == 1

    def add_audit(self, audit: JoinAudit) -> None:
        try:
            with self._connect() as connection:
                connection.execute("BEGIN IMMEDIATE")
                state_row = connection.execute(
                    "SELECT state FROM join_registrations WHERE join_id = ?", (str(audit.join_id),)
                ).fetchone()
                if state_row is None:
                    raise AppError("join_not_found", "Join registration was not found.", 404)
                if state_row[0] != JoinState.APPROVED:
                    raise AppError("join_not_approved", "Audits require an approved join.", 409)
                count = int(
                    connection.execute(
                        "SELECT COUNT(*) FROM join_audits WHERE join_id = ?", (str(audit.join_id),)
                    ).fetchone()[0]
                )
                if count >= self._max_audits_per_join:
                    raise AppError("audit_limit_reached", "Join audit limit was reached.", 429)
                connection.execute(
                    """INSERT INTO join_audits
                       (audit_id, join_id, input_rows, matched_rows, unmatched_source_rows,
                        unmatched_target_rows, conflicting_rows, match_rate, created_at)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                    (
                        str(audit.audit_id),
                        str(audit.join_id),
                        audit.input_rows,
                        audit.matched_rows,
                        audit.unmatched_source_rows,
                        audit.unmatched_target_rows,
                        audit.conflicting_rows,
                        audit.match_rate,
                        audit.created_at.isoformat(),
                    ),
                )
        except sqlite3.IntegrityError as exc:
            raise AppError("audit_conflict", "Join audit could not be stored.", 409) from exc

    def list_audits(self, join_id: UUID, limit: int, offset: int) -> tuple[JoinAudit, ...]:
        with self._connect() as connection:
            rows = connection.execute(
                """SELECT audit_id, join_id, input_rows, matched_rows, unmatched_source_rows,
                          unmatched_target_rows, conflicting_rows, match_rate, created_at
                   FROM join_audits WHERE join_id = ?
                   ORDER BY created_at ASC, audit_id ASC LIMIT ? OFFSET ?""",
                (str(join_id), limit, offset),
            ).fetchall()
        return tuple(
            JoinAudit(
                audit_id=row[0],
                join_id=row[1],
                input_rows=row[2],
                matched_rows=row[3],
                unmatched_source_rows=row[4],
                unmatched_target_rows=row[5],
                conflicting_rows=row[6],
                match_rate=row[7],
                created_at=row[8],
            )
            for row in rows
        )
