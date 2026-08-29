"""Application service for governed synthetic school map data."""

from datetime import date
from typing import cast

import duckdb

from app.contracts.data import QualityStatus
from app.contracts.provenance import Provenance, SourceKind
from app.data_access.ports import DataAccessPort
from app.schools.contracts import (
    Coordinates,
    GeoJSONPoint,
    IndicatorId,
    LocationMetadata,
    LocationQuality,
    LocationSource,
    MapCoverage,
    MapQuery,
    MatchMethod,
    SchoolIdentity,
    SchoolMapCollection,
    SchoolMapFeature,
    SchoolMapProperties,
    SchoolMetric,
    SchoolProfile,
)

_INDICATORS: tuple[IndicatorId, ...] = (
    "attendance_rate",
    "assessment_score",
    "capacity_utilization",
    "teacher_shortage_rate",
)
_PERIOD_COLUMNS: dict[IndicatorId, str] = {
    "attendance_rate": "attendance_period",
    "assessment_score": "assessment_period",
    "capacity_utilization": "capacity_period",
    "teacher_shortage_rate": "staffing_period",
}
_SOURCE_KINDS: dict[IndicatorId, SourceKind] = {
    "attendance_rate": SourceKind.SYNTHETIC_SCHEMA_FAITHFUL,
    "assessment_score": SourceKind.SYNTHETIC_SCHEMA_FAITHFUL,
    "capacity_utilization": SourceKind.SYNTHETIC_INFERRED,
    "teacher_shortage_rate": SourceKind.SYNTHETIC_INFERRED,
}
_ASSETS: dict[IndicatorId, str] = {
    "attendance_rate": "attendance_facts.parquet",
    "assessment_score": "assessment_facts.parquet",
    "capacity_utilization": "capacity_facts.parquet",
    "teacher_shortage_rate": "teacher_shortage_facts.parquet",
}
_FORMULA_VERSIONS: dict[IndicatorId, str] = {
    "attendance_rate": "ratio-of-sums-v1",
    "assessment_score": "mean-score-v1",
    "capacity_utilization": "ratio-of-sums-v1",
    "teacher_shortage_rate": "ratio-of-sums-v1",
}
_SYNTHETIC_LIMITATION = (
    "Dados integralmente sintéticos para demonstração; não representam escolas ou IDs reais."
)
_BBOX_MISSING_LIMITATION = (
    "Com bbox, escolas sem coordenadas permanecem em missing no escopo da CRE; "
    "somente pontos geolocalizados podem ser filtrados espacialmente."
)
_DATA_ACCESS_ERRORS = (duckdb.Error, OSError, ValueError, RuntimeError, KeyError)


class SchoolMapUnavailableError(RuntimeError):
    """The governed school dataset cannot currently serve a request."""


def _required_cre(value: object) -> int:
    if isinstance(value, bool) or not isinstance(value, int) or not 1 <= value <= 11:
        raise ValueError("school dataset has invalid cre")
    return value


def _required_float(row: dict[str, object], field: str) -> float:
    value = row[field]
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        raise ValueError(f"school dataset has invalid {field}")
    return float(value)


class SchoolMapService:
    def __init__(self, data_access: DataAccessPort) -> None:
        self._data_access = data_access
        self._manifest = self._validate_manifest(data_access.manifest())
        self._snapshot_id = data_access.snapshot_id()
        if self._manifest["generation_id"] != self._snapshot_id:
            raise ValueError("manifest generation_id does not match pinned snapshot")

    @staticmethod
    def _validate_manifest(raw: object) -> dict[str, object]:
        if not isinstance(raw, dict):
            raise ValueError("dataset manifest must be an object")
        required_strings = (
            "generator_version",
            "generation_id",
            "scenario",
            "scenario_version",
            "scenario_sha256",
        )
        for field in required_strings:
            value = raw.get(field)
            if not isinstance(value, str) or not value.strip():
                raise ValueError(f"dataset manifest has invalid {field}")
        for field in ("generation_id", "scenario_sha256"):
            value = cast(str, raw[field])
            if len(value) != 64 or any(char not in "0123456789abcdef" for char in value):
                raise ValueError(f"dataset manifest has invalid {field}")
        seed = raw.get("seed")
        if isinstance(seed, bool) or not isinstance(seed, int):
            raise ValueError("dataset manifest has invalid seed")
        files = raw.get("files")
        if not isinstance(files, dict):
            raise ValueError("dataset manifest has invalid files")
        for indicator, asset in _ASSETS.items():
            metadata = files.get(asset)
            if (
                not isinstance(metadata, dict)
                or metadata.get("source_kind") != _SOURCE_KINDS[indicator].value
            ):
                raise ValueError(f"dataset manifest has invalid source kind for {asset}")
        return dict(raw)

    def _provenance(self, source_id: str, source_kind: SourceKind) -> Provenance:
        return Provenance(
            source_id=source_id,
            source_kind=source_kind,
            generated=True,
            data_version=self._snapshot_id,
            generation_seed=cast(int, self._manifest["seed"]),
            scenario_reference=f"{self._manifest['scenario']}@{self._manifest['scenario_version']}",
            scenario_hash=cast(str, self._manifest["scenario_sha256"]),
            limitations=(_SYNTHETIC_LIMITATION,),
        )

    @staticmethod
    def _identity(row: dict[str, object]) -> SchoolIdentity:
        return SchoolIdentity(
            school_id=str(row["school_id"]),
            nome=str(row["school_name"]),
            inep_id=str(row["inep_id"]) if row["inep_id"] is not None else None,
            sme_designation=(
                str(row["sme_designation"]) if row["sme_designation"] is not None else None
            ),
            cre=_required_cre(row["cre"]),
            bairro=str(row["neighborhood"]) if row["neighborhood"] is not None else None,
            dependency=str(row["dependency"]),
            source_kind=SourceKind.SYNTHETIC_SCHEMA_FAITHFUL,
            limitations=(_SYNTHETIC_LIMITATION,),
        )

    @staticmethod
    def _location(row: dict[str, object]) -> LocationMetadata:
        quality = (
            LocationQuality.MISSING
            if row["latitude"] is None or row["longitude"] is None
            else LocationQuality(str(row["location_quality"]))
        )
        return LocationMetadata(
            location_source=LocationSource(str(row["location_source"])),
            match_method=MatchMethod(str(row["match_method"])),
            quality=quality,
        )

    def _metrics(self, row: dict[str, object]) -> dict[IndicatorId, SchoolMetric]:
        aggregate_status = QualityStatus(str(row["quality_status"]))
        result: dict[IndicatorId, SchoolMetric] = {}
        school_id = str(row["school_id"])
        for indicator in _INDICATORS:
            raw_value = row[indicator]
            value = None if raw_value is None else _required_float(row, indicator)
            period = cast(date | None, row[_PERIOD_COLUMNS[indicator]])
            if value is None:
                status = QualityStatus.BLOCKED
                period = None
                evidence_id = None
                interpretable = False
            else:
                status = aggregate_status
                if period is None:
                    raise ValueError("metric value has no governed period")
                evidence_id = (
                    f"synthetic:{self._snapshot_id}:{school_id}:{indicator}:{period.isoformat()}"
                )
                interpretable = status is QualityStatus.OK
            result[indicator] = SchoolMetric(
                indicator_id=indicator,
                value=value,
                period=period,
                quality_status=status,
                source_kind=_SOURCE_KINDS[indicator],
                formula_version=_FORMULA_VERSIONS[indicator],
                provenance=self._provenance(
                    f"asset:{_ASSETS[indicator]}", _SOURCE_KINDS[indicator]
                ),
                evidence_id=evidence_id,
                interpretable=interpretable,
            )
        return result

    @staticmethod
    def _quality(row: dict[str, object]) -> QualityStatus:
        if row["latitude"] is None or row["longitude"] is None:
            return QualityStatus.BLOCKED
        return QualityStatus(str(row["quality_status"]))

    def get_map(self, query: MapQuery | None = None) -> SchoolMapCollection:
        try:
            return self._get_map(query)
        except _DATA_ACCESS_ERRORS as error:
            raise SchoolMapUnavailableError("school map dataset unavailable") from error

    def _get_map(self, query: MapQuery | None = None) -> SchoolMapCollection:
        selected = query or MapQuery()
        coverage_values = self._data_access.map_coverage(cre=selected.cre, bounds=selected.bounds)
        rows = self._data_access.school_map_rows(
            cre=selected.cre, bounds=selected.bounds, limit=selected.limit, offset=selected.offset
        )
        features = tuple(self._feature(dict(row)) for row in rows)
        geolocated = int(coverage_values["geolocated"])
        coverage = MapCoverage(
            total=int(coverage_values["total"]),
            geolocated=geolocated,
            missing=int(coverage_values["missing"]),
            returned=len(features),
            truncated=len(features) < geolocated,
            coverage_ratio=float(coverage_values["coverage_ratio"]),
        )
        return SchoolMapCollection(
            features=features,
            coverage=coverage,
            available_cres=tuple(
                _required_cre(value) for value in self._data_access.available_cres()
            ),
            snapshot_id=self._snapshot_id,
            generated=True,
            provenance=self._provenance(
                "collection:school-map", SourceKind.SYNTHETIC_SCHEMA_FAITHFUL
            ),
            limitations=(_SYNTHETIC_LIMITATION, _BBOX_MISSING_LIMITATION),
        )

    def _feature(self, row: dict[str, object]) -> SchoolMapFeature:
        return SchoolMapFeature(
            geometry=GeoJSONPoint(
                coordinates=Coordinates(
                    latitude=_required_float(row, "latitude"),
                    longitude=_required_float(row, "longitude"),
                )
            ),
            properties=SchoolMapProperties(
                identity=self._identity(row),
                location=self._location(row),
                metrics=self._metrics(row),
                quality_status=self._quality(row),
            ),
        )

    def get_profile(self, school_id: str) -> SchoolProfile | None:
        try:
            return self._get_profile(school_id)
        except _DATA_ACCESS_ERRORS as error:
            raise SchoolMapUnavailableError("school profile dataset unavailable") from error

    def _get_profile(self, school_id: str) -> SchoolProfile | None:
        raw = self._data_access.school_profile(school_id)
        if raw is None:
            return None
        row = dict(raw)
        coordinates = None
        if row["latitude"] is not None and row["longitude"] is not None:
            coordinates = Coordinates(
                latitude=_required_float(row, "latitude"),
                longitude=_required_float(row, "longitude"),
            )
        return SchoolProfile(
            identity=self._identity(row),
            coordinates=coordinates,
            location=self._location(row),
            metrics=self._metrics(row),
            quality_status=self._quality(row),
            snapshot_id=self._snapshot_id,
            generated=True,
            provenance=self._provenance(
                "collection:school-profile", SourceKind.SYNTHETIC_SCHEMA_FAITHFUL
            ),
        )
