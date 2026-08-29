"""Application service for pinned, read-only aggregate analytics."""

from datetime import UTC, date, datetime
from typing import cast

import duckdb

from app.analytics.contracts import (
    AnalyticsIndicatorId,
    AnalyticsScope,
    DataQualitySummaryV1,
    EvidenceRecordV1,
    NetworkSnapshotV1,
    ObservationRecordV1,
    QualityCheckSummaryV1,
    ScopeType,
)
from app.contracts.data import QualityStatus
from app.contracts.provenance import Provenance, SourceKind
from app.data_access.ports import DataAccessPort

_SYNTHETIC_LIMITATION = (
    "Dados integralmente sintéticos para demonstração; não representam escolas ou resultados reais."
)
_ASSETS: dict[AnalyticsIndicatorId, tuple[str, SourceKind, str, str]] = {
    "attendance_rate": (
        "attendance_facts.parquet",
        SourceKind.SYNTHETIC_SCHEMA_FAITHFUL,
        "ratio-of-sums-v1",
        "ratio",
    ),
    "assessment_score": (
        "assessment_facts.parquet",
        SourceKind.SYNTHETIC_SCHEMA_FAITHFUL,
        "weighted-mean-score-v1",
        "score",
    ),
    "capacity_utilization": (
        "capacity_facts.parquet",
        SourceKind.SYNTHETIC_INFERRED,
        "ratio-of-sums-v1",
        "ratio",
    ),
    "teacher_shortage_rate": (
        "teacher_shortage_facts.parquet",
        SourceKind.SYNTHETIC_INFERRED,
        "ratio-of-sums-v1",
        "ratio",
    ),
}
_DERIVATIONS: dict[AnalyticsIndicatorId, str] = {
    "attendance_rate": "sum(present_count) / sum(expected_count) no período mais recente do escopo",
    "assessment_score": (
        "sum(score * participants) / sum(participants) no período mais recente do escopo"
    ),
    "capacity_utilization": "sum(enrolled) / sum(capacity) no período mais recente do escopo",
    "teacher_shortage_rate": (
        "sum(shortage_hours) / sum(required_hours) no período mais recente do escopo"
    ),
}
_DATA_ERRORS = (duckdb.Error, OSError, ValueError, RuntimeError, KeyError, TypeError)


class AnalyticsUnavailableError(RuntimeError):
    """The pinned analytical release failed at runtime."""


class AnalyticsScopeNotFoundError(LookupError):
    """The selected governed scope has no schools."""


class MalformedEvidenceIdError(ValueError):
    """Evidence identifier does not conform to the opaque public grammar."""


class EvidenceNotFoundError(LookupError):
    """Evidence does not belong to this pinned snapshot."""


def _integer(value: object, name: str) -> int:
    if isinstance(value, bool) or not isinstance(value, int):
        raise ValueError(f"invalid {name}")
    return value


def _number(value: object, name: str) -> float:
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        raise ValueError(f"invalid {name}")
    return float(value)


class AnalyticsService:
    def __init__(self, data_access: DataAccessPort) -> None:
        self._access = data_access
        self._snapshot_id = data_access.snapshot_id()
        manifest = data_access.manifest()
        if manifest.get("generation_id") != self._snapshot_id:
            raise ValueError("manifest does not match pinned snapshot")
        seed = manifest.get("seed")
        scenario = manifest.get("scenario")
        scenario_version = manifest.get("scenario_version")
        scenario_hash = manifest.get("scenario_sha256")
        if (
            isinstance(seed, bool)
            or not isinstance(seed, int)
            or not isinstance(scenario, str)
            or not scenario
            or not isinstance(scenario_version, str)
            or not scenario_version
            or not isinstance(scenario_hash, str)
        ):
            raise ValueError("manifest has invalid synthetic lineage")
        self._seed = seed
        self._scenario_reference = f"{scenario}@{scenario_version}"
        self._scenario_hash = scenario_hash

    @staticmethod
    def _scope(cre: int | None) -> AnalyticsScope:
        return AnalyticsScope(
            type=ScopeType.NETWORK if cre is None else ScopeType.CRE,
            id="network" if cre is None else str(cre),
        )

    def _provenance(self, source_id: str, source_kind: SourceKind) -> Provenance:
        return Provenance(
            source_id=source_id,
            source_kind=source_kind,
            generated=True,
            data_version=self._snapshot_id,
            generation_seed=self._seed,
            scenario_reference=self._scenario_reference,
            scenario_hash=self._scenario_hash,
            limitations=(_SYNTHETIC_LIMITATION,),
        )

    @staticmethod
    def _period(value: object) -> datetime:
        if not isinstance(value, date):
            raise ValueError("invalid analytical period")
        return datetime(value.year, value.month, value.day, tzinfo=UTC)

    def _observation(self, row: dict[str, object], scope: AnalyticsScope) -> ObservationRecordV1:
        raw_indicator = row.get("indicator_id")
        if raw_indicator not in _ASSETS:
            raise ValueError("unknown analytical indicator")
        indicator = raw_indicator
        asset, source_kind, formula, unit = _ASSETS[indicator]
        period = self._period(row.get("period"))
        numerator = _number(row.get("numerator"), "numerator")
        denominator = _number(row.get("denominator"), "denominator")
        value = _number(row.get("value"), "value")
        coverage_numerator = _integer(row.get("coverage_numerator"), "coverage numerator")
        coverage_denominator = _integer(row.get("coverage_denominator"), "coverage denominator")
        quality = (
            QualityStatus.OK
            if coverage_denominator > 0 and coverage_numerator == coverage_denominator
            else QualityStatus.DEGRADED
            if coverage_numerator > 0
            else QualityStatus.BLOCKED
        )
        scope_token = scope.type.value.lower()
        identity = (
            f"{self._snapshot_id}:{scope_token}:{scope.id}:{indicator}:{period.date().isoformat()}"
        )
        limitations: tuple[str, ...] = (_SYNTHETIC_LIMITATION,)
        if quality is not QualityStatus.OK:
            limitations += (
                "Cobertura incompleta no escopo selecionado; observação não interpretável.",
            )
        return ObservationRecordV1(
            observation_id=f"obs1:{identity}",
            evidence_id=f"ev1:{identity}",
            scope=scope,
            indicator_id=indicator,
            value=value,
            unit=unit,
            numerator=numerator,
            denominator=denominator,
            period_start=period,
            period_end=period,
            coverage_numerator=coverage_numerator,
            coverage_denominator=coverage_denominator,
            quality=quality,
            interpretable=quality is QualityStatus.OK,
            formula_version=formula,
            provenance=self._provenance(f"asset:{asset}", source_kind),
            limitations=limitations,
        )

    def get_snapshot(self, cre: int | None = None) -> NetworkSnapshotV1:
        try:
            scope = self._scope(cre)
            rows = [dict(row) for row in self._access.analytics_snapshot(cre=cre)]
            if not rows:
                raise AnalyticsScopeNotFoundError("empty analytics scope")
            observations = tuple(self._observation(row, scope) for row in rows)
            counts = {_integer(row.get("school_count"), "school count") for row in rows}
            if len(counts) != 1:
                raise ValueError("inconsistent analytical school count")
            return NetworkSnapshotV1(
                snapshot_id=self._snapshot_id,
                scope=scope,
                school_count=counts.pop(),
                observations=observations,
                generated=True,
                provenance=self._provenance(
                    "collection:network-snapshot", SourceKind.SYNTHETIC_INFERRED
                ),
                limitations=(_SYNTHETIC_LIMITATION,),
            )
        except _DATA_ERRORS as error:
            raise AnalyticsUnavailableError("analytics unavailable") from error

    def get_quality(self, cre: int | None = None) -> DataQualitySummaryV1:
        try:
            checks = tuple(
                QualityCheckSummaryV1(
                    check_id=str(row["check_id"]),
                    status=QualityStatus(str(row["status"])),
                    affected_school_count=_integer(
                        row["affected_school_count"], "affected school count"
                    ),
                    observed_school_count=_integer(
                        row["observed_school_count"], "observed school count"
                    ),
                    school_count=_integer(row["school_count"], "school count"),
                    coverage_mean=_number(row["coverage_mean"], "coverage mean"),
                )
                for raw in self._access.analytics_quality(cre=cre)
                for row in [dict(raw)]
            )
            return DataQualitySummaryV1(
                snapshot_id=self._snapshot_id,
                scope=self._scope(cre),
                checks=checks,
                generated=True,
                provenance=self._provenance(
                    "asset:quality_observations.parquet", SourceKind.SYNTHETIC_INFERRED
                ),
                limitations=(_SYNTHETIC_LIMITATION,),
            )
        except _DATA_ERRORS as error:
            raise AnalyticsUnavailableError("analytics unavailable") from error

    def get_evidence(self, evidence_id: str) -> EvidenceRecordV1:
        parts = evidence_id.split(":")
        if (
            len(parts) != 6
            or parts[0] != "ev1"
            or parts[2] not in {"network", "cre"}
            or parts[4] not in _ASSETS
        ):
            raise MalformedEvidenceIdError("malformed evidence id")
        _, snapshot, scope_type, scope_id, indicator_value, period_value = parts
        try:
            period = date.fromisoformat(period_value)
        except ValueError as error:
            raise MalformedEvidenceIdError("malformed evidence id") from error
        if snapshot != self._snapshot_id:
            raise EvidenceNotFoundError("evidence not found")
        if scope_type == "network":
            if scope_id != "network":
                raise MalformedEvidenceIdError("malformed evidence id")
            cre = None
        else:
            if not scope_id.isdigit() or not 1 <= int(scope_id) <= 11:
                raise MalformedEvidenceIdError("malformed evidence id")
            cre = int(scope_id)
        snapshot_record = self.get_snapshot(cre)
        observation = next(
            (
                item
                for item in snapshot_record.observations
                if item.indicator_id == indicator_value and item.period_start.date() == period
            ),
            None,
        )
        if observation is None or observation.evidence_id != evidence_id:
            raise EvidenceNotFoundError("evidence not found")
        indicator = cast(AnalyticsIndicatorId, indicator_value)
        return EvidenceRecordV1(
            evidence_id=evidence_id,
            snapshot_id=self._snapshot_id,
            observation=observation,
            derivation=_DERIVATIONS[indicator],
            generated=True,
            provenance=observation.provenance,
            limitations=observation.limitations,
        )
