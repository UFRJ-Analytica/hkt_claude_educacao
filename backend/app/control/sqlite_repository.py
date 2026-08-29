import json
import sqlite3
import unicodedata
import uuid
from collections.abc import Iterator
from contextlib import contextmanager
from enum import StrEnum
from pathlib import Path
from typing import Any


class InvestigationState(StrEnum):
    OPEN = "OPEN"
    IN_PROGRESS = "IN_PROGRESS"
    CLOSED = "CLOSED"
    CANCELLED = "CANCELLED"


class ActionItemState(StrEnum):
    OPEN = "OPEN"
    IN_PROGRESS = "IN_PROGRESS"
    DONE = "DONE"
    CANCELLED = "CANCELLED"


class InvalidTransitionError(ValueError):
    pass


_INVESTIGATION_TRANSITIONS = {
    InvestigationState.OPEN: {InvestigationState.IN_PROGRESS, InvestigationState.CANCELLED},
    InvestigationState.IN_PROGRESS: {InvestigationState.CLOSED, InvestigationState.CANCELLED},
    InvestigationState.CLOSED: set(),
    InvestigationState.CANCELLED: set(),
}

_AUDIT_ENTITY_TABLES = {
    "action_item": "action_items",
    "agent_run": "agent_runs",
    "investigation": "investigations",
    "meeting": "meetings",
}
_AUDIT_EVENT_TYPES = {"CHECKED", "CREATED", "STATE_CHANGED"}
_RUN_TYPES = {"investigation"}
_TITLES = {"Aggregate capacity signal", "Capacity signal"}
_PURPOSES = {"Review aggregate evidence"}
_DESCRIPTIONS = {"Review aggregate", "Validate network signal"}
_STRUCTURED_TEXT_VALUES = {
    "from": {"CANCELLED", "CLOSED", "IN_PROGRESS", "OPEN"},
    "grain": {"agent", "network", "network period", "period"},
    "measure": {"attendance", "capacity", "count", "hours", "rate", "score", "total", "value"},
    "metric": {
        "assessment score",
        "attendance rate",
        "capacity signal",
        "quality score",
    },
    "operation": {"avg", "count", "max", "min", "sum"},
    "period": {"period"},
    "quality_status": {"expected", "failed", "succeeded"},
    "run_type": _RUN_TYPES,
    "source": {"synthetic"},
    "state": {
        "CANCELLED",
        "CLOSED",
        "DONE",
        "HELD",
        "IN_PROGRESS",
        "OPEN",
        "SCHEDULED",
    },
    "status": {"CREATED", "FAILED", "RUNNING", "SUCCEEDED"},
    "to": {"CANCELLED", "CLOSED", "IN_PROGRESS", "OPEN"},
}
_NUMERIC_STRUCTURED_KEYS = {"count", "coverage", "total", "value"}
_STRUCTURED_KEYS = {
    "agent_run_id", "count", "coverage", "from", "grain", "measure", "metric", "operation",
    "period", "quality_status", "run_type", "source", "state", "status", "to", "total", "value",
}


def _canonical_text(value: str) -> str:
    normalized = unicodedata.normalize("NFKC", value)
    return " ".join(normalized.split()).casefold()


def _assert_internal_code(value: str, allowed: set[str]) -> None:
    if unicodedata.normalize("NFKC", value) not in allowed:
        raise ValueError("PII is prohibited in control records")


def _assert_exact_text(value: str, allowed: set[str]) -> None:
    canonical_allowed = {_canonical_text(candidate) for candidate in allowed}
    if not value.strip() or _canonical_text(value) not in canonical_allowed:
        raise ValueError("PII is prohibited in control records")


def _assert_uuid(value: str) -> None:
    try:
        uuid.UUID(value)
    except (ValueError, AttributeError) as error:
        raise ValueError("PII is prohibited in control records") from error


def _assert_aggregate_structure(value: object, *, key: str | None = None) -> None:
    if isinstance(value, bool):
        raise ValueError("PII is prohibited in control records")
    if isinstance(value, (int, float)):
        if key not in _NUMERIC_STRUCTURED_KEYS:
            raise ValueError("PII is prohibited in control records")
        return
    if isinstance(value, str):
        if key is not None and key.endswith("_id"):
            _assert_uuid(value)
        else:
            allowed = _STRUCTURED_TEXT_VALUES.get(key or "")
            if allowed is None:
                raise ValueError("PII is prohibited in control records")
            _assert_internal_code(value, allowed)
        return
    if isinstance(value, dict):
        for child_key, child_value in value.items():
            if not isinstance(child_key, str) or child_key not in _STRUCTURED_KEYS:
                raise ValueError("PII is prohibited in control records")
            _assert_aggregate_structure(child_value, key=child_key)
        return
    if isinstance(value, (list, tuple)):
        for child in value:
            _assert_aggregate_structure(child, key=key)
        return
    raise ValueError("PII is prohibited in control records")


class SQLiteControlRepository:
    """Store control-plane aggregates, never PII.

    Text is Unicode-normalized and accepted only when it matches an exact,
    field-specific aggregate template or internal-code vocabulary. JSON keys
    and string values are also field-specific, and references are UUID-only.
    This fail-closed boundary does not depend on
    a PII blacklist: names, phone/RG/CPF/NIS/registration numbers, addresses,
    e-mail, residential coordinates and student/professional terms (including
    Unicode variants) are unrepresentable unless the aggregate schema changes.
    """

    def __init__(self, path: Path) -> None:
        path.parent.mkdir(parents=True, exist_ok=True)
        self._connection = sqlite3.connect(path, isolation_level=None)
        self._connection.execute("PRAGMA journal_mode=WAL")
        self._connection.execute("PRAGMA foreign_keys=ON")
        self._closed = False
        self._migrate()

    def __enter__(self) -> "SQLiteControlRepository":
        return self

    def __exit__(self, exc_type: object, exc_value: object, traceback: object) -> None:
        self.close()

    def close(self) -> None:
        """Roll back unfinished work and close the connection; safe to call twice."""
        if self._closed:
            return
        try:
            if self._connection.in_transaction:
                self._connection.rollback()
        finally:
            self._connection.close()
            self._closed = True

    def _migrate(self) -> None:
        self._connection.executescript("""
        BEGIN;
        CREATE TABLE IF NOT EXISTS agent_runs (
          id TEXT PRIMARY KEY, run_type TEXT NOT NULL, context_json TEXT NOT NULL,
          status TEXT NOT NULL CHECK(status IN ('CREATED','RUNNING','SUCCEEDED','FAILED')),
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS investigations (
          id TEXT PRIMARY KEY, title TEXT NOT NULL, agent_run_id TEXT NOT NULL,
          state TEXT NOT NULL CHECK(state IN ('OPEN','IN_PROGRESS','CLOSED','CANCELLED')),
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY(agent_run_id) REFERENCES agent_runs(id)
        );
        CREATE TABLE IF NOT EXISTS meetings (
          id TEXT PRIMARY KEY, investigation_id TEXT NOT NULL, purpose TEXT NOT NULL,
          state TEXT NOT NULL CHECK(state IN ('SCHEDULED','HELD','CANCELLED')),
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY(investigation_id) REFERENCES investigations(id)
        );
        CREATE TABLE IF NOT EXISTS action_items (
          id TEXT PRIMARY KEY, investigation_id TEXT NOT NULL, description TEXT NOT NULL,
          state TEXT NOT NULL CHECK(state IN ('OPEN','IN_PROGRESS','DONE','CANCELLED')),
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY(investigation_id) REFERENCES investigations(id)
        );
        CREATE TABLE IF NOT EXISTS audit_events (
          id TEXT PRIMARY KEY, entity_type TEXT NOT NULL, entity_id TEXT NOT NULL,
          event_type TEXT NOT NULL, details_json TEXT NOT NULL,
          created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        PRAGMA user_version=1;
        COMMIT;
        """)

    @contextmanager
    def transaction(self) -> Iterator[None]:
        self._connection.execute("BEGIN")
        try:
            yield
            self._connection.execute("COMMIT")
        except Exception:
            if self._connection.in_transaction:
                self._connection.execute("ROLLBACK")
            raise

    @contextmanager
    def _atomic(self) -> Iterator[None]:
        if self._connection.in_transaction:
            yield
        else:
            with self.transaction():
                yield

    @staticmethod
    def _id() -> str:
        return str(uuid.uuid4())

    def create_agent_run(self, run_type: str, context: dict[str, Any]) -> str:
        _assert_internal_code(run_type, _RUN_TYPES)
        _assert_aggregate_structure(context)
        serialized = json.dumps(context, sort_keys=True)
        identifier = self._id()
        with self._atomic():
            self._connection.execute(
                "INSERT INTO agent_runs(id, run_type, context_json, status) "
                "VALUES (?, ?, ?, 'CREATED')",
                (identifier, run_type.strip(), serialized),
            )
            self.audit("agent_run", identifier, "CREATED", {"run_type": run_type})
        return identifier

    def create_investigation(self, title: str, agent_run_id: str) -> str:
        _assert_exact_text(title, _TITLES)
        _assert_uuid(agent_run_id)
        identifier = self._id()
        with self._atomic():
            self._connection.execute(
                "INSERT INTO investigations(id, title, agent_run_id, state) "
                "VALUES (?, ?, ?, 'OPEN')",
                (identifier, title.strip(), agent_run_id),
            )
            self.audit(
                "investigation", identifier, "CREATED", {"agent_run_id": agent_run_id}
            )
        return identifier

    def transition_investigation(self, identifier: str, target: str) -> None:
        with self._atomic():
            row = self._connection.execute(
                "SELECT state FROM investigations WHERE id=?", (identifier,)
            ).fetchone()
            if row is None:
                raise KeyError(identifier)
            current = InvestigationState(row[0])
            requested = InvestigationState(target)
            if requested not in _INVESTIGATION_TRANSITIONS[current]:
                raise InvalidTransitionError(f"invalid transition {current} -> {requested}")
            cursor = self._connection.execute(
                "UPDATE investigations SET state=? WHERE id=? AND state=?",
                (requested, identifier, current),
            )
            if cursor.rowcount != 1:
                raise InvalidTransitionError("transition conflict: state changed concurrently")
            self.audit(
                "investigation", identifier, "STATE_CHANGED", {"from": current, "to": requested}
            )

    def create_meeting(self, investigation_id: str, purpose: str, state: str = "SCHEDULED") -> str:
        _assert_uuid(investigation_id)
        _assert_exact_text(purpose, _PURPOSES)
        _assert_internal_code(state, {"CANCELLED", "HELD", "SCHEDULED"})
        identifier = self._id()
        with self._atomic():
            self._connection.execute(
                "INSERT INTO meetings(id, investigation_id, purpose, state) VALUES (?, ?, ?, ?)",
                (identifier, investigation_id, purpose.strip(), state),
            )
            self.audit("meeting", identifier, "CREATED", {"state": state})
        return identifier

    def create_action_item(
        self, investigation_id: str, description: str, state: str = "OPEN"
    ) -> str:
        _assert_exact_text(description, _DESCRIPTIONS)
        _assert_internal_code(state, {member.value for member in ActionItemState})
        requested = ActionItemState(state)
        identifier = self._id()
        with self._atomic():
            self._connection.execute(
                "INSERT INTO action_items(id, investigation_id, description, state) "
                "VALUES (?, ?, ?, ?)",
                (identifier, investigation_id, description.strip(), requested),
            )
            self.audit("action_item", identifier, "CREATED", {"state": requested})
        return identifier

    def audit(
        self, entity_type: str, entity_id: str, event_type: str, details: dict[str, Any]
    ) -> None:
        if entity_type not in _AUDIT_ENTITY_TABLES or event_type not in _AUDIT_EVENT_TYPES:
            raise ValueError("PII is prohibited in control records")
        _assert_uuid(entity_id)
        _assert_aggregate_structure(details)
        table = _AUDIT_ENTITY_TABLES[entity_type]
        with self._atomic():
            entity = self._connection.execute(
                f"SELECT 1 FROM {table} WHERE id=?", (entity_id,)
            ).fetchone()
            if entity is None:
                raise ValueError(f"{entity_type} entity does not exist")
            self._connection.execute(
                "INSERT INTO audit_events(id, entity_type, entity_id, event_type, details_json) "
                "VALUES (?, ?, ?, ?, ?)",
                (
                    self._id(),
                    entity_type,
                    entity_id,
                    event_type,
                    json.dumps(details, sort_keys=True),
                ),
            )

    def count(self, table: str) -> int:
        if table not in {
            "agent_runs",
            "investigations",
            "meetings",
            "action_items",
            "audit_events",
        }:
            raise ValueError("table is not allowlisted")
        return int(self._connection.execute(f"SELECT count(*) FROM {table}").fetchone()[0])
