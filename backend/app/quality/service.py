import math
from datetime import datetime, timedelta
from typing import Any

from app.contracts.data import QualityFinding, QualityStatus
from app.contracts.provenance import Provenance


class QualityService:
    def __init__(self, provenance: Provenance) -> None:
        self._provenance = provenance

    def freshness(
        self, as_of: datetime | None, now: datetime, maximum_age: timedelta
    ) -> QualityFinding:
        if now.tzinfo is None or now.utcoffset() is None:
            raise ValueError("now must include timezone information")
        if as_of is not None and (as_of.tzinfo is None or as_of.utcoffset() is None):
            raise ValueError("as_of must include timezone information")
        if maximum_age < timedelta(0):
            raise ValueError("maximum_age must be non-negative")
        future = as_of is not None and as_of > now
        stale = as_of is None or future or now - as_of > maximum_age
        return self._finding(
            "freshness",
            QualityStatus.BLOCKED
            if as_of is None
            else (QualityStatus.DEGRADED if stale else QualityStatus.OK),
            "Timestamp missing."
            if as_of is None
            else (
                "Timestamp is in the future."
                if future
                else ("Asset is stale." if stale else "Asset is fresh.")
            ),
            int(stale),
            0.0 if as_of is None else 1.0,
        )

    def completeness(self, rows: list[dict[str, Any]], required: set[str]) -> QualityFinding:
        if not required:
            raise ValueError("required fields must not be empty")

        def is_missing(value: object) -> bool:
            return (
                value is None
                or (isinstance(value, str) and not value.strip())
                or (isinstance(value, float) and math.isnan(value))
            )

        missing = sum(any(is_missing(row.get(field)) for field in required) for row in rows)
        coverage = 1 - missing / len(rows) if rows else 0.0
        status = (
            QualityStatus.OK
            if coverage == 1
            else (QualityStatus.DEGRADED if coverage >= 0.8 else QualityStatus.BLOCKED)
        )
        return self._finding(
            "completeness",
            status,
            f"{missing} rows have missing required fields.",
            missing,
            coverage,
        )

    def duplicate_keys(self, rows: list[dict[str, Any]], keys: tuple[str, ...]) -> QualityFinding:
        if not keys:
            raise ValueError("keys must not be empty")
        values = [tuple(row.get(key) for key in keys) for row in rows]
        duplicates = len(values) - len(set(values))
        return self._finding(
            "duplicate_keys",
            QualityStatus.BLOCKED
            if not rows
            else (QualityStatus.OK if duplicates == 0 else QualityStatus.DEGRADED),
            f"{duplicates} duplicate keys.",
            duplicates,
            1 - duplicates / len(values) if values else 0,
        )

    def orphan_keys(self, child_keys: set[Any], parent_keys: set[Any]) -> QualityFinding:
        count = len(child_keys - parent_keys)
        coverage = 1 - count / len(child_keys) if child_keys else 1
        return self._finding(
            "orphan_keys",
            QualityStatus.BLOCKED
            if not child_keys
            else (QualityStatus.OK if count == 0 else QualityStatus.BLOCKED),
            f"{count} orphan keys.",
            count,
            coverage if child_keys else 0,
        )

    def schema_drift(self, actual: dict[str, str], expected: dict[str, str]) -> QualityFinding:
        changes = sum(actual.get(name) != kind for name, kind in expected.items()) + len(
            set(actual) - set(expected)
        )
        return self._finding(
            "schema_drift",
            QualityStatus.OK if changes == 0 else QualityStatus.BLOCKED,
            f"{changes} schema differences.",
            changes,
            1.0 if changes == 0 else 0.0,
        )

    def _finding(
        self, check: str, status: QualityStatus, message: str, affected: int, coverage: float
    ) -> QualityFinding:
        return QualityFinding(
            check=check,
            status=status,
            message=message,
            affected_rows=affected,
            coverage=max(0, coverage),
            provenance=self._provenance,
        )
