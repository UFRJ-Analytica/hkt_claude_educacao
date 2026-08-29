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
    ObservationDimensions,
    ObservationRecordV1,
    QualityCheckSummaryV1,
    SchoolTurmaListV1,
    ScopeType,
    SkillMatrixCellV1,
    SkillMatrixV1,
    TurmaIndicatorCoverage,
    TurmaSummaryV1,
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
    "assessment_participation": (
        "assessment_facts.parquet",
        SourceKind.SYNTHETIC_SCHEMA_FAITHFUL,
        "ratio-of-sums-v1",
        "ratio",
    ),
    "skill_mastery_rate": (
        "skill_observations.parquet",
        SourceKind.SYNTHETIC_SCHEMA_FAITHFUL,
        "ratio-of-sums-v1",
        "ratio",
    ),
    "lessons_delivered_rate": (
        "lesson_plans.parquet",
        SourceKind.SYNTHETIC_SCHEMA_FAITHFUL,
        "ratio-of-sums-v1",
        "ratio",
    ),
    "subject_grade_mean": (
        "subject_grade_facts.parquet",
        SourceKind.SYNTHETIC_SCHEMA_FAITHFUL,
        "weighted-mean-score-v1",
        "score",
    ),
    "lessons_cancelled_rate": (
        "lesson_plans.parquet",
        SourceKind.SYNTHETIC_SCHEMA_FAITHFUL,
        "ratio-of-sums-v1",
        "ratio",
    ),
    "lessons_unlogged_rate": (
        "lesson_plans.parquet",
        SourceKind.SYNTHETIC_SCHEMA_FAITHFUL,
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
    "assessment_participation": (
        "sum(evaluated_count) / sum(expected_count) no período do escopo"
    ),
    "skill_mastery_rate": (
        "sum(acertos ou domínio da habilidade) / sum(alunos avaliados) por turma/habilidade"
    ),
    "lessons_delivered_rate": (
        "sum(aulas realizadas) / sum(aulas previstas) por turma/período"
    ),
    "subject_grade_mean": (
        "sum(nota da disciplina * participantes) / sum(participantes), em escala 0-10"
    ),
    "lessons_cancelled_rate": (
        "sum(aulas canceladas) / sum(aulas previstas) por turma/período"
    ),
    "lessons_unlogged_rate": (
        "sum(aulas previstas sem lançamento) / sum(aulas previstas) por turma/período"
    ),
}
_DATA_ERRORS = (duckdb.Error, OSError, ValueError, RuntimeError, KeyError, TypeError)
_MIN_PUBLIC_SCHOOL_COUNT = 3
_PRIVACY_SMALL_GROUP_LIMITATION = (
    "Valores suprimidos por privacidade: grupo pequeno abaixo do limiar mínimo."
)


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


def _string_tuple(value: object) -> tuple[str, ...]:
    if value is None:
        return ()
    if isinstance(value, str):
        return (value,)
    if isinstance(value, (list, tuple)):
        return tuple(str(item) for item in value)
    raise ValueError("invalid limitations")


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
    def _scope(
        cre: int | None,
        school_id: str | None = None,
        turma_id: str | None = None,
    ) -> AnalyticsScope:
        if turma_id is not None:
            if school_id is None:
                raise ValueError("turma scope requires school_id")
            return AnalyticsScope(type=ScopeType.TURMA, id=f"{school_id}.{turma_id}")
        if school_id is not None:
            return AnalyticsScope(type=ScopeType.SCHOOL, id=school_id)
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
        numerator: float | None = _number(row.get("numerator"), "numerator")
        denominator: float | None = _number(row.get("denominator"), "denominator")
        value: float | None = _number(row.get("value"), "value")
        coverage_numerator = _integer(row.get("coverage_numerator"), "coverage numerator")
        coverage_denominator = _integer(row.get("coverage_denominator"), "coverage denominator")
        min_group_size = _MIN_PUBLIC_SCHOOL_COUNT
        suppressed = bool(row.get("suppressed", False)) or coverage_denominator < min_group_size
        if suppressed:
            numerator = None
            denominator = None
            value = None
        quality = (
            QualityStatus.BLOCKED
            if suppressed
            else QualityStatus.OK
            if coverage_denominator > 0 and coverage_numerator == coverage_denominator
            else QualityStatus.DEGRADED
            if coverage_numerator > 0
            else QualityStatus.BLOCKED
        )
        scope_token = scope.type.value.lower()
        dimension_parts = [
            str(row.get(key)).lower().replace(" ", "-")
            for key in ("subject", "grade", "skill_id", "proficiency_level")
            if row.get(key) not in (None, "")
        ]
        dimension_token = ":" + ".".join(dimension_parts) if dimension_parts else ""
        identity = (
            f"{self._snapshot_id}:{scope_token}:{scope.id.lower()}:"
            f"{indicator}:{period.date().isoformat()}{dimension_token}"
        )
        raw_dimensions = ObservationDimensions(
            subject=cast(str | None, row.get("subject")),
            grade=cast(str | None, row.get("grade")),
            skill_id=cast(str | None, row.get("skill_id")),
            skill_label=cast(str | None, row.get("skill_label")),
            proficiency_level=cast(str | None, row.get("proficiency_level")),
            proficiency_error_margin=cast(float | None, row.get("proficiency_error_margin")),
            period_label=cast(str | None, row.get("period_label")),
        )
        dimensions: ObservationDimensions | None = raw_dimensions
        if not any(raw_dimensions.model_dump().values()):
            dimensions = None
        limitations: tuple[str, ...] = (_SYNTHETIC_LIMITATION,)
        if quality is not QualityStatus.OK:
            limitations += (
                "Cobertura incompleta no escopo selecionado; observação não interpretável.",
            )
        if suppressed:
            limitations += (_PRIVACY_SMALL_GROUP_LIMITATION,)
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
            suppressed=suppressed,
            suppression_reason="SMALL_GROUP" if suppressed else None,
            privacy_min_school_count=min_group_size,
            privacy_min_unit_count=min_group_size,
            formula_version=formula,
            provenance=self._provenance(f"asset:{asset}", source_kind),
            limitations=limitations,
            dimensions=dimensions,
        )

    def get_snapshot(
        self,
        cre: int | None = None,
        school_id: str | None = None,
        turma_id: str | None = None,
    ) -> NetworkSnapshotV1:
        try:
            scope = self._scope(cre, school_id, turma_id)
            if school_id is None and turma_id is None:
                rows = [dict(row) for row in self._access.analytics_snapshot(cre=cre)]
            else:
                rows = [
                    dict(row)
                    for row in self._access.analytics_snapshot(
                        cre=cre,
                        school_id=school_id,
                        turma_id=turma_id,
                    )
                ]
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

    def list_school_turmas(self, school_id: str) -> SchoolTurmaListV1:
        try:
            turmas = tuple(
                TurmaSummaryV1(
                    turma_id=str(row["turma_id"]),
                    turma_label=cast(str | None, row.get("turma_label")),
                    grade=cast(str | None, row.get("grade")),
                    evaluated_count=cast(int | None, row.get("evaluated_count")),
                    suppressed=bool(row.get("suppressed", False)),
                    suppression_reason=cast(str | None, row.get("suppression_reason")),
                    coverage=tuple(
                        TurmaIndicatorCoverage(
                            indicator_id=cast(AnalyticsIndicatorId, item["indicator_id"]),
                            status=QualityStatus(str(item["status"])),
                        )
                        for item in cast(list[dict[str, object]], row.get("coverage", []))
                    ),
                    limitations=_string_tuple(row.get("limitations")),
                )
                for raw in self._access.school_turma_rows(school_id)
                for row in [dict(raw)]
            )
            if not turmas:
                raise AnalyticsScopeNotFoundError("empty turma scope")
            return SchoolTurmaListV1(
                school_id=school_id,
                turmas=turmas,
                privacy_min_unit_count=_MIN_PUBLIC_SCHOOL_COUNT,
                generated=True,
                provenance=self._provenance(
                    "collection:school-turmas", SourceKind.SYNTHETIC_INFERRED
                ),
                limitations=(_SYNTHETIC_LIMITATION,),
            )
        except _DATA_ERRORS as error:
            raise AnalyticsUnavailableError("analytics unavailable") from error

    def get_skill_matrix(self, school_id: str, period: str | None = None) -> SkillMatrixV1:
        try:
            cells = tuple(
                SkillMatrixCellV1(
                    turma_id=str(row["turma_id"]),
                    turma_label=cast(str | None, row.get("turma_label")),
                    grade=cast(str | None, row.get("grade")),
                    subject=cast(str | None, row.get("subject")),
                    skill_id=str(row["skill_id"]),
                    skill_label=cast(str | None, row.get("skill_label")),
                    period_label=cast(str | None, row.get("period_label")),
                    value=cast(float | None, row.get("value")),
                    quality=QualityStatus(str(row["quality"])),
                    suppressed=bool(row.get("suppressed", False)),
                    suppression_reason=cast(str | None, row.get("suppression_reason")),
                    evidence_id=cast(str | None, row.get("evidence_id")),
                    limitations=_string_tuple(row.get("limitations")),
                )
                for raw in self._access.skill_matrix_rows(school_id, period)
                for row in [dict(raw)]
            )
            if not cells:
                raise AnalyticsScopeNotFoundError("empty skill matrix")
            return SkillMatrixV1(
                school_id=school_id,
                period=period,
                cells=cells,
                privacy_min_unit_count=_MIN_PUBLIC_SCHOOL_COUNT,
                generated=True,
                provenance=self._provenance(
                    "collection:skill-matrix", SourceKind.SYNTHETIC_INFERRED
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
            len(parts) < 6
            or parts[0] != "ev1"
            or parts[2] not in {"network", "cre", "school", "turma"}
            or parts[4] not in _ASSETS
        ):
            raise MalformedEvidenceIdError("malformed evidence id")
        _, snapshot, scope_type, scope_id, indicator_value, period_value, *_dimensions = parts
        try:
            period = date.fromisoformat(period_value)
        except ValueError as error:
            raise MalformedEvidenceIdError("malformed evidence id") from error
        if snapshot != self._snapshot_id:
            raise EvidenceNotFoundError("evidence not found")
        school_id: str | None = None
        turma_id: str | None = None
        if scope_type == "network":
            if scope_id != "network":
                raise MalformedEvidenceIdError("malformed evidence id")
            cre = None
        elif scope_type == "cre":
            if not scope_id.isdigit() or not 1 <= int(scope_id) <= 11:
                raise MalformedEvidenceIdError("malformed evidence id")
            cre = int(scope_id)
        elif scope_type == "school":
            cre = None
            school_id = scope_id.upper()
        else:
            split_scope = scope_id.rsplit(".", 1)
            if len(split_scope) != 2 or not all(split_scope):
                raise MalformedEvidenceIdError("malformed evidence id")
            cre = None
            school_id = split_scope[0].upper()
            turma_id = split_scope[1]
        snapshot_record = self.get_snapshot(cre, school_id, turma_id)
        observation = next(
            (
                item
                for item in snapshot_record.observations
                if item.evidence_id == evidence_id
                and item.indicator_id == indicator_value
                and item.period_start.date() == period
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
