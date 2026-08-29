"""Strict contracts for school identity, geolocation, and map responses."""

import math
from datetime import date
from enum import StrEnum
from typing import Literal

from pydantic import Field, field_serializer, field_validator, model_validator

from app.contracts.data import QualityStatus, StrictModel
from app.contracts.provenance import Provenance, SourceKind

_SYNTHETIC_SOURCE_KINDS = {
    SourceKind.SYNTHETIC_SCHEMA_FAITHFUL,
    SourceKind.SYNTHETIC_INFERRED,
}
_FORMULA_VERSIONS: dict[str, frozenset[str]] = {
    "attendance_rate": frozenset({"ratio-of-sums-v1"}),
    "assessment_score": frozenset({"mean-score-v1"}),
    "capacity_utilization": frozenset({"ratio-of-sums-v1"}),
    "teacher_shortage_rate": frozenset({"ratio-of-sums-v1"}),
}


class LocationSource(StrEnum):
    SME_SCHOOL_CATALOG = "SME_SCHOOL_CATALOG"
    DATARIO = "DATARIO"
    CENSO_ESCOLAR = "CENSO_ESCOLAR"
    SYNTHETIC = "SYNTHETIC"


class MatchMethod(StrEnum):
    OFFICIAL_ID = "OFFICIAL_ID"
    SME_DESIGNATION = "SME_DESIGNATION"
    EXACT_NAME_NEIGHBORHOOD = "EXACT_NAME_NEIGHBORHOOD"
    SYNTHETIC = "SYNTHETIC"


class LocationQuality(StrEnum):
    CONFIRMED = "CONFIRMED"
    MATCHED = "MATCHED"
    SYNTHETIC = "SYNTHETIC"
    MISSING = "MISSING"


class SchoolIdentity(StrictModel):
    school_id: str = Field(
        min_length=1,
        max_length=128,
        pattern=r"^[A-Za-z0-9][A-Za-z0-9._-]*$",
    )
    nome: str = Field(min_length=1)
    inep_id: str | None = Field(default=None, pattern=r"^\d{8}$")
    sme_designation: str | None = Field(default=None, pattern=r"^\d{7}$")
    cre: int = Field(ge=1, le=11)
    bairro: str | None = Field(default=None, min_length=1)
    dependency: str = Field(min_length=1)
    school_type: str | None = Field(default=None, min_length=1)
    source_kind: SourceKind
    limitations: tuple[str, ...] = ()

    @field_validator("limitations")
    @classmethod
    def validate_limitations(cls, values: tuple[str, ...]) -> tuple[str, ...]:
        if any(not value.strip() for value in values):
            raise ValueError("limitations cannot contain blank values")
        return tuple(value.strip() for value in values)

    @model_validator(mode="after")
    def require_institutional_id(self) -> "SchoolIdentity":
        synthetic = self.source_kind in _SYNTHETIC_SOURCE_KINDS
        if synthetic and (self.inep_id is not None or self.sme_designation is not None):
            raise ValueError("synthetic identity cannot contain institutional IDs")
        if not synthetic and self.inep_id is None and self.sme_designation is None:
            raise ValueError("at least one institutional ID is required")
        if synthetic and not self.school_id.startswith("SYNTHETIC-"):
            raise ValueError("synthetic identity requires a SYNTHETIC school_id namespace")
        return self


class Coordinates(StrictModel):
    latitude: float = Field(ge=-90, le=90)
    longitude: float = Field(ge=-180, le=180)

    @field_validator("latitude", "longitude")
    @classmethod
    def require_finite_coordinate(cls, value: float) -> float:
        if not math.isfinite(value):
            raise ValueError("coordinates must be finite")
        return value


class GeoJSONPoint(StrictModel):
    type: Literal["Point"] = "Point"
    coordinates: Coordinates

    @field_serializer("coordinates")
    def serialize_coordinates(self, value: Coordinates) -> tuple[float, float]:
        return (value.longitude, value.latitude)


class LocationMetadata(StrictModel):
    location_source: LocationSource
    match_method: MatchMethod
    quality: LocationQuality

    @model_validator(mode="after")
    def require_coherent_synthetic_triplet(self) -> "LocationMetadata":
        synthetic = (
            self.location_source is LocationSource.SYNTHETIC,
            self.match_method is MatchMethod.SYNTHETIC,
            self.quality is LocationQuality.SYNTHETIC,
        )
        if self.quality is LocationQuality.SYNTHETIC and not all(synthetic):
            raise ValueError(
                "synthetic location source, match method, and quality must occur together"
            )
        if (
            self.location_source is LocationSource.SYNTHETIC
            or self.match_method is MatchMethod.SYNTHETIC
        ) and not (
            self.location_source is LocationSource.SYNTHETIC
            and self.match_method is MatchMethod.SYNTHETIC
            and self.quality in {LocationQuality.SYNTHETIC, LocationQuality.MISSING}
        ):
            raise ValueError("synthetic source and match method must be coherent")
        return self


IndicatorId = Literal[
    "attendance_rate",
    "assessment_score",
    "capacity_utilization",
    "teacher_shortage_rate",
]


class SchoolMetric(StrictModel):
    indicator_id: IndicatorId
    value: float | None
    period: date | None = None
    quality_status: QualityStatus
    source_kind: SourceKind
    formula_version: str = Field(min_length=1)
    provenance: Provenance
    evidence_id: str | None = Field(default=None, min_length=1)
    interpretable: bool

    @field_validator("formula_version")
    @classmethod
    def require_nonblank_formula_version(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("formula_version cannot be blank")
        return value

    @field_validator("value")
    @classmethod
    def require_finite_value(cls, value: float | None) -> float | None:
        if value is not None and not math.isfinite(value):
            raise ValueError("metric value must be finite")
        return value

    @model_validator(mode="after")
    def enforce_evidence_and_quality(self) -> "SchoolMetric":
        if self.formula_version not in _FORMULA_VERSIONS[self.indicator_id]:
            raise ValueError("formula_version is not allowed for indicator_id")
        if self.source_kind is not self.provenance.source_kind:
            raise ValueError("source_kind must match provenance.source_kind")
        if self.value is None:
            if self.quality_status is not QualityStatus.BLOCKED:
                raise ValueError("missing metric value must be BLOCKED")
            if self.period is not None or self.evidence_id is not None:
                raise ValueError("missing metric value cannot have period or evidence")
            if self.interpretable:
                raise ValueError("missing metric value cannot be interpretable")
            return self
        if self.period is None or self.evidence_id is None:
            raise ValueError("metric value requires period and evidence")
        expected_interpretable = self.quality_status is QualityStatus.OK
        if self.interpretable is not expected_interpretable:
            raise ValueError("interpretable must be true exactly when quality status is OK")
        return self


class SchoolMapProperties(StrictModel):
    identity: SchoolIdentity
    location: LocationMetadata
    metrics: dict[IndicatorId, SchoolMetric]
    quality_status: QualityStatus

    @field_validator("metrics")
    @classmethod
    def copy_and_match_metric_keys(
        cls, values: dict[IndicatorId, SchoolMetric]
    ) -> dict[IndicatorId, SchoolMetric]:
        copied = dict(values)
        if any(key != metric.indicator_id for key, metric in copied.items()):
            raise ValueError("metric dictionary key must match indicator_id")
        return copied


class SchoolMapFeature(StrictModel):
    type: Literal["Feature"] = "Feature"
    geometry: GeoJSONPoint
    properties: SchoolMapProperties

    @model_validator(mode="after")
    def reject_missing_geolocated_feature(self) -> "SchoolMapFeature":
        if self.properties.location.quality is LocationQuality.MISSING:
            raise ValueError("a geolocated Feature cannot have MISSING location quality")
        return self


class MapCoverage(StrictModel):
    """Coverage in scope.

    With a bbox, geolocated counts only points inside it; schools without
    coordinates remain missing in the selected CRE scope because they cannot be
    spatially classified.
    """

    total: int = Field(ge=0)
    geolocated: int = Field(ge=0)
    missing: int = Field(ge=0)

    returned: int = Field(ge=0)
    truncated: bool
    coverage_ratio: float = Field(ge=0, le=1)

    @field_validator("coverage_ratio")
    @classmethod
    def finite_ratio(cls, value: float) -> float:
        if not math.isfinite(value):
            raise ValueError("coverage ratio must be finite")
        return value

    @model_validator(mode="after")
    def validate_coverage_arithmetic(self) -> "MapCoverage":
        if self.total != self.geolocated + self.missing:
            raise ValueError("total must equal geolocated plus missing")
        if self.returned > self.geolocated:
            raise ValueError("returned cannot exceed geolocated")
        if self.truncated != (self.returned < self.geolocated):
            raise ValueError("truncated must report omitted geolocated schools")
        expected = 0.0 if self.total == 0 else self.geolocated / self.total
        if not math.isclose(self.coverage_ratio, expected, rel_tol=1e-9, abs_tol=1e-12):
            raise ValueError("coverage ratio must equal geolocated divided by total")
        return self


class SchoolMapCollection(StrictModel):
    type: Literal["FeatureCollection"] = "FeatureCollection"
    features: tuple[SchoolMapFeature, ...]
    coverage: MapCoverage
    available_cres: tuple[int, ...]
    snapshot_id: str = Field(pattern=r"^[0-9a-f]{64}$")
    generated: bool
    provenance: Provenance
    limitations: tuple[str, ...] = Field(min_length=1)

    @field_validator("available_cres")
    @classmethod
    def validate_available_cres(cls, values: tuple[int, ...]) -> tuple[int, ...]:
        if any(value < 1 or value > 11 for value in values):
            raise ValueError("available CREs must be between 1 and 11")
        if tuple(sorted(set(values))) != values:
            raise ValueError("available CREs must be unique and sorted")
        return values

    @field_validator("limitations")
    @classmethod
    def validate_collection_limitations(cls, values: tuple[str, ...]) -> tuple[str, ...]:
        if any(not value.strip() for value in values):
            raise ValueError("limitations cannot contain blank values")
        return tuple(value.strip() for value in values)

    @model_validator(mode="after")
    def validate_collection_consistency(self) -> "SchoolMapCollection":
        if self.generated != self.provenance.generated:
            raise ValueError("generated must match provenance.generated")
        if self.provenance.data_version != self.snapshot_id:
            raise ValueError("snapshot_id must match provenance.data_version")
        if len(self.features) != self.coverage.returned:
            raise ValueError("feature count must equal returned coverage")
        feature_cres = {feature.properties.identity.cre for feature in self.features}
        if not feature_cres.issubset(self.available_cres):
            raise ValueError("feature CREs must be included in available CREs")
        return self


class SchoolProfile(StrictModel):
    identity: SchoolIdentity
    coordinates: Coordinates | None
    location: LocationMetadata
    metrics: dict[IndicatorId, SchoolMetric]
    quality_status: QualityStatus
    snapshot_id: str = Field(pattern=r"^[0-9a-f]{64}$")
    generated: bool
    provenance: Provenance

    @field_validator("metrics")
    @classmethod
    def match_profile_metric_keys(
        cls, values: dict[IndicatorId, SchoolMetric]
    ) -> dict[IndicatorId, SchoolMetric]:
        copied = dict(values)
        if any(key != metric.indicator_id for key, metric in copied.items()):
            raise ValueError("metric dictionary key must match indicator_id")
        return copied

    @model_validator(mode="after")
    def validate_coordinate_quality(self) -> "SchoolProfile":
        if self.generated != self.provenance.generated:
            raise ValueError("generated must match provenance.generated")
        if self.provenance.data_version != self.snapshot_id:
            raise ValueError("snapshot_id must match provenance.data_version")
        if self.coordinates is None and self.location.quality is not LocationQuality.MISSING:
            raise ValueError("coordinates may be absent only when location quality is MISSING")
        if self.coordinates is not None and self.location.quality is LocationQuality.MISSING:
            raise ValueError("MISSING location cannot have coordinates")
        return self


class MapBounds(StrictModel):
    west: float = Field(ge=-180, le=180)
    south: float = Field(ge=-90, le=90)
    east: float = Field(ge=-180, le=180)
    north: float = Field(ge=-90, le=90)

    @model_validator(mode="after")
    def validate_order(self) -> "MapBounds":
        if self.west >= self.east:
            raise ValueError("west must be less than east")
        if self.south >= self.north:
            raise ValueError("south must be less than north")
        return self


class MapQuery(StrictModel):
    cre: int | None = Field(default=None, ge=1, le=11)
    bounds: MapBounds | None = None
    limit: int = Field(default=2000, ge=1, le=2000)
    offset: int = Field(default=0, ge=0)
