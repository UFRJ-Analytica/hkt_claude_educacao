from datetime import date

import pytest
from pydantic import ValidationError

from app.contracts.data import QualityStatus
from app.contracts.provenance import Provenance, SourceKind
from app.schools.contracts import (
    Coordinates,
    GeoJSONPoint,
    LocationMetadata,
    LocationQuality,
    LocationSource,
    MapBounds,
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


def identity(**changes: object) -> SchoolIdentity:
    data: dict[str, object] = {
        "school_id": "school-001",
        "nome": "Escola Teste",
        "inep_id": "12345678",
        "cre": 4,
        "bairro": "Centro",
        "dependency": "MUNICIPAL",
        "source_kind": SourceKind.REAL_PUBLIC,
        "limitations": ["Identidade de teste."],
    }
    data.update(changes)
    return SchoolIdentity.model_validate(data)


def location(**changes: object) -> LocationMetadata:
    data: dict[str, object] = {
        "location_source": LocationSource.SME_SCHOOL_CATALOG,
        "match_method": MatchMethod.OFFICIAL_ID,
        "quality": LocationQuality.CONFIRMED,
    }
    data.update(changes)
    return LocationMetadata.model_validate(data)


def metric(**changes: object) -> SchoolMetric:
    data: dict[str, object] = {
        "indicator_id": "attendance_rate",
        "value": 0.91,
        "period": date(2026, 7, 1),
        "quality_status": QualityStatus.OK,
        "source_kind": SourceKind.REAL_PUBLIC,
        "formula_version": "ratio-of-sums-v1",
        "provenance": Provenance(
            source_id="test", source_kind=SourceKind.REAL_PUBLIC, generated=False
        ),
        "evidence_id": "evidence:1",
        "interpretable": True,
    }
    data.update(changes)
    if "indicator_id" in changes and "formula_version" not in changes:
        data["formula_version"] = (
            "mean-score-v1" if changes["indicator_id"] == "assessment_score" else "ratio-of-sums-v1"
        )
    return SchoolMetric.model_validate(data)


def release() -> dict[str, object]:
    return {
        "snapshot_id": "a" * 64,
        "generated": False,
        "provenance": Provenance(
            source_id="test",
            source_kind=SourceKind.REAL_PUBLIC,
            generated=False,
            data_version="a" * 64,
        ),
    }


def feature() -> SchoolMapFeature:
    return SchoolMapFeature(
        geometry=GeoJSONPoint(coordinates=Coordinates(latitude=-22.91, longitude=-43.18)),
        properties=SchoolMapProperties(
            identity=identity(),
            location=location(),
            metrics={"attendance_rate": metric()},
            quality_status=QualityStatus.OK,
        ),
    )


def test_enums_are_explicit() -> None:
    assert {item.value for item in LocationSource} == {
        "SME_SCHOOL_CATALOG",
        "DATARIO",
        "CENSO_ESCOLAR",
        "SYNTHETIC",
    }
    assert {item.value for item in MatchMethod} == {
        "OFFICIAL_ID",
        "SME_DESIGNATION",
        "EXACT_NAME_NEIGHBORHOOD",
        "SYNTHETIC",
    }
    assert {item.value for item in LocationQuality} == {
        "CONFIRMED",
        "MATCHED",
        "SYNTHETIC",
        "MISSING",
    }


def test_identity_requires_valid_institutional_id_cre_and_required_text() -> None:
    assert identity(inep_id=None, sme_designation="1234567").cre == 4
    invalid = (
        {"inep_id": None, "sme_designation": None},
        {"inep_id": "1234567"},
        {"sme_designation": "12345678"},
        {"cre": 0},
        {"cre": 12},
        {"nome": " "},
        {"dependency": " "},
    )
    for changes in invalid:
        with pytest.raises(ValidationError):
            identity(**changes)
    with pytest.raises(ValidationError):
        identity(extra_field=True)
    school = identity()
    with pytest.raises(ValidationError):
        school.cre = 5  # type: ignore[misc]


def test_synthetic_identity_rejects_official_ids_and_requires_namespace() -> None:
    synthetic = identity(
        school_id="SYNTHETIC-SCHOOL-0001",
        inep_id=None,
        sme_designation=None,
        source_kind=SourceKind.SYNTHETIC_SCHEMA_FAITHFUL,
    )
    assert synthetic.inep_id is None and synthetic.sme_designation is None
    with pytest.raises(ValidationError, match="institutional"):
        identity(
            school_id="SYNTHETIC-SCHOOL-0001",
            source_kind=SourceKind.SYNTHETIC_SCHEMA_FAITHFUL,
        )
    with pytest.raises(ValidationError, match="namespace"):
        identity(
            school_id="school-001",
            inep_id=None,
            source_kind=SourceKind.SYNTHETIC_INFERRED,
        )


def test_metric_source_kind_and_formula_match_governed_provenance() -> None:
    with pytest.raises(ValidationError, match="source_kind"):
        metric(source_kind=SourceKind.METADATA_CONFIRMED)
    with pytest.raises(ValidationError, match="formula_version"):
        metric(formula_version="unversioned")


def test_coordinates_and_geojson_use_longitude_first() -> None:
    point = GeoJSONPoint(coordinates=Coordinates(latitude=-22.9, longitude=-43.2))
    assert point.model_dump(mode="json") == {"type": "Point", "coordinates": [-43.2, -22.9]}
    for latitude, longitude in ((-91, 0), (91, 0), (0, -181), (0, 181)):
        with pytest.raises(ValidationError):
            Coordinates(latitude=latitude, longitude=longitude)


def test_synthetic_location_fields_are_an_indivisible_triplet() -> None:
    assert (
        location(
            location_source=LocationSource.SYNTHETIC,
            match_method=MatchMethod.SYNTHETIC,
            quality=LocationQuality.SYNTHETIC,
        ).quality
        is LocationQuality.SYNTHETIC
    )
    for changes in (
        {"location_source": LocationSource.SYNTHETIC},
        {"match_method": MatchMethod.SYNTHETIC},
        {"quality": LocationQuality.SYNTHETIC},
    ):
        with pytest.raises(ValidationError, match="synthetic"):
            location(**changes)


def test_profile_coordinates_are_coherent_with_missing_quality() -> None:
    missing_location = location(quality=LocationQuality.MISSING)
    profile = SchoolProfile(
        identity=identity(),
        coordinates=None,
        location=missing_location,
        metrics={},
        quality_status=QualityStatus.BLOCKED,
        **release(),
    )
    assert profile.coordinates is None
    with pytest.raises(ValidationError, match="MISSING"):
        SchoolProfile(
            identity=identity(),
            coordinates=Coordinates(latitude=0, longitude=0),
            location=missing_location,
            metrics={},
            quality_status=QualityStatus.BLOCKED,
            **release(),
        )
    with pytest.raises(ValidationError, match="only"):
        SchoolProfile(
            identity=identity(),
            coordinates=None,
            location=location(),
            metrics={},
            quality_status=QualityStatus.OK,
            **release(),
        )


def test_metric_allowlist_finiteness_evidence_and_quality() -> None:
    allowed = (
        "attendance_rate",
        "assessment_score",
        "capacity_utilization",
        "teacher_shortage_rate",
    )
    for indicator_id in allowed:
        assert metric(indicator_id=indicator_id).indicator_id == indicator_id
    for changes in (
        {"indicator_id": "other"},
        {"value": float("nan")},
        {"value": float("inf")},
        {"period": None},
        {"evidence_id": None},
        {"quality_status": QualityStatus.DEGRADED, "interpretable": True},
    ):
        with pytest.raises(ValidationError):
            metric(**changes)
    degraded = metric(quality_status=QualityStatus.DEGRADED, interpretable=False)
    assert not degraded.interpretable


def test_missing_metric_is_blocked_without_period_evidence_or_interpretation() -> None:
    assert (
        metric(
            value=None,
            period=None,
            evidence_id=None,
            quality_status=QualityStatus.BLOCKED,
            interpretable=False,
        ).value
        is None
    )
    invalid = (
        {"value": None, "period": None, "evidence_id": None},
        {
            "value": None,
            "period": None,
            "evidence_id": None,
            "quality_status": QualityStatus.BLOCKED,
            "interpretable": True,
        },
        {
            "value": None,
            "period": date(2026, 1, 1),
            "evidence_id": None,
            "quality_status": QualityStatus.BLOCKED,
            "interpretable": False,
        },
    )
    for changes in invalid:
        with pytest.raises(ValidationError):
            metric(**changes)


def test_metric_mapping_key_matches_indicator() -> None:
    with pytest.raises(ValidationError, match="key"):
        SchoolMapProperties(
            identity=identity(),
            location=location(),
            metrics={"assessment_score": metric()},
            quality_status=QualityStatus.OK,
        )


def test_coverage_arithmetic_and_ratio() -> None:
    assert (
        MapCoverage(
            total=0,
            geolocated=0,
            missing=0,
            returned=0,
            truncated=False,
            coverage_ratio=0,
        ).total
        == 0
    )
    assert (
        MapCoverage(
            total=4,
            geolocated=3,
            missing=1,
            returned=3,
            truncated=False,
            coverage_ratio=0.75,
        ).missing
        == 1
    )
    invalid = (
        {"total": 4, "geolocated": 3, "missing": 0, "coverage_ratio": 0.75},
        {"total": 4, "geolocated": 3, "missing": 1, "coverage_ratio": 0.5},
        {"total": -1, "geolocated": 0, "missing": 0, "coverage_ratio": 0},
    )
    for values in invalid:
        with pytest.raises(ValidationError):
            MapCoverage(**values)


def test_feature_collection_geojson_and_cross_field_invariants() -> None:
    item = feature()
    base: dict[str, object] = {
        "features": [item],
        "coverage": MapCoverage(
            total=2,
            geolocated=1,
            missing=1,
            returned=1,
            truncated=False,
            coverage_ratio=0.5,
        ),
        "available_cres": [4, 7],
        "snapshot_id": "a" * 64,
        "generated": False,
        "provenance": release()["provenance"],
        "limitations": ["Uma escola sem geolocalização."],
    }
    collection = SchoolMapCollection.model_validate(base)
    dumped = collection.model_dump(mode="json")
    assert dumped["type"] == "FeatureCollection"
    assert dumped["features"][0]["type"] == "Feature"
    assert dumped["features"][0]["geometry"]["coordinates"] == [-43.18, -22.91]
    invalid_collections: tuple[dict[str, object], ...] = (
        {"available_cres": [7, 4]},
        {"available_cres": [4, 4]},
        {"available_cres": [7]},
        {"features": []},
        {"snapshot_id": "bad"},
        {"limitations": []},
    )
    for changes in invalid_collections:
        values = dict(base)
        values.update(changes)
        with pytest.raises(ValidationError):
            SchoolMapCollection.model_validate(values)


def test_bounds_and_query_constraints() -> None:
    query = MapQuery(
        cre=4,
        bounds=MapBounds(west=-44, south=-23.1, east=-43, north=-22.7),
        limit=2000,
        offset=0,
    )
    assert query.cre == 4
    for values in (
        {"cre": 12},
        {"limit": 0},
        {"limit": 2001},
        {"offset": -1},
        {"bounds": {"west": -43, "east": -44, "south": -23, "north": -22}},
        {"bounds": {"west": -44, "east": -43, "south": -22, "north": -23}},
    ):
        with pytest.raises(ValidationError):
            MapQuery.model_validate(values)
