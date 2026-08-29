from datetime import UTC, datetime, timedelta
from pathlib import Path
from typing import TypedDict

import pytest
from pydantic import ValidationError

from app.catalog.loader import load_scenario, load_source_registry
from app.catalog.models import MetadataCatalog, Scenario, SourceEntry, SourceRegistry
from app.contracts.data import DataAsset, IndicatorObservation, QualityStatus
from app.contracts.provenance import Provenance, SourceKind
from app.metrics.service import MetricsService
from app.quality.service import QualityService

ROOT = Path(__file__).parents[3]
NOW = datetime(2026, 8, 26, tzinfo=UTC)
LINEAGE = Provenance(
    source_id="stage2_fixture",
    source_kind=SourceKind.SYNTHETIC_SCHEMA_FAITHFUL,
    generated=True,
    data_version="1.0.0",
    generation_seed=20260826,
    scenario_reference="network_improving@1.0.0",
)


class MetricKwargs(TypedDict):
    provenance: Provenance
    evidence_id: str
    window_start: datetime
    window_end: datetime
    coverage_numerator: float
    coverage_denominator: float
    filters: dict[str, str | int | float | bool]


def metric_kwargs() -> MetricKwargs:
    return {
        "provenance": LINEAGE,
        "evidence_id": "ev.attendance.2026-08",
        "window_start": datetime(2026, 8, 1, tzinfo=UTC),
        "window_end": NOW,
        "coverage_numerator": 10,
        "coverage_denominator": 10,
        "filters": {"network": "rio"},
    }


def test_metrics_require_explicit_complete_lineage_and_execution_contract() -> None:
    service = MetricsService()
    with pytest.raises(TypeError):
        service.ratio("attendance_rate", 8, 10, NOW)  # type: ignore[call-arg]

    observation = service.ratio("attendance_rate", 8, 10, NOW, **metric_kwargs())
    assert observation.formula_version == "1.0.0"
    assert observation.coverage_numerator == 10
    assert observation.coverage_denominator == 10
    assert observation.window_start == datetime(2026, 8, 1, tzinfo=UTC)
    assert observation.evidence_id == "ev.attendance.2026-08"
    assert observation.filters == {"network": "rio"}

    with pytest.raises(ValidationError, match="synthetic provenance"):
        Provenance(
            source_id="synthetic",
            source_kind=SourceKind.SYNTHETIC_INFERRED,
            generated=True,
        )


@pytest.mark.parametrize(
    ("source_kind", "generated"),
    [
        (SourceKind.REAL_PUBLIC, True),
        (SourceKind.METADATA_CONFIRMED, True),
        (SourceKind.KNOWN_UNAVAILABLE, True),
        (SourceKind.SYNTHETIC_SCHEMA_FAITHFUL, False),
        (SourceKind.SYNTHETIC_INFERRED, False),
    ],
)
def test_provenance_rejects_incoherent_generation_flags(
    source_kind: SourceKind, generated: bool
) -> None:
    with pytest.raises(ValidationError, match="generated"):
        Provenance(source_id="source", source_kind=source_kind, generated=generated)


def test_non_generated_provenance_rejects_generation_specific_fields() -> None:
    with pytest.raises(ValidationError, match="generation metadata"):
        Provenance(
            source_id="source",
            source_kind=SourceKind.METADATA_CONFIRMED,
            generated=False,
            generation_seed=42,
            scenario_reference="scenario@1",
        )


@pytest.mark.parametrize(
    ("numerator", "denominator"),
    [(-1.0, 10.0), (1.0, -10.0), (11.0, 10.0), (float("nan"), 10.0), (1.0, float("inf"))],
)
def test_ratio_rejects_non_finite_negative_and_out_of_domain_inputs(
    numerator: float, denominator: float
) -> None:
    with pytest.raises(ValueError):
        MetricsService().ratio(
            "attendance_rate", numerator, denominator, NOW, **metric_kwargs()
        )


@pytest.mark.parametrize("value", [-1.0, float("nan"), float("inf"), float("-inf")])
def test_value_metric_rejects_non_finite_or_negative_values(value: float) -> None:
    with pytest.raises(ValueError):
        MetricsService().value(
            "teacher_shortage_hours", value, NOW, **metric_kwargs()
        )


def test_observation_rejects_non_finite_value() -> None:
    valid = MetricsService().ratio("attendance_rate", 8, 10, NOW, **metric_kwargs())
    with pytest.raises(ValidationError):
        IndicatorObservation.model_validate({**valid.model_dump(), "value": float("nan")})


def test_scenario_parameters_are_exact_and_safely_bounded(tmp_path: Path) -> None:
    governed_path = ROOT / "data/scenarios/network_improving.yml"
    scenario = load_scenario(governed_path)
    assert scenario.privacy_classification == "AGGREGATE_NO_PII"
    outside = tmp_path / governed_path.name
    outside.write_bytes(governed_path.read_bytes())
    with pytest.raises(ValueError, match="governed scenario root"):
        load_scenario(outside)
    assert set(scenario.parameters.model_dump()) == {
        "attendance_trend",
        "assessment_trend",
        "capacity_pressure",
        "shortage_factor",
        "quality_gap",
    }
    payload = scenario.model_dump()
    payload["parameters"]["unknown"] = 1.0
    with pytest.raises(ValidationError):
        Scenario.model_validate(payload)
    payload = scenario.model_dump()
    payload["parameters"]["quality_gap"] = 1.01
    with pytest.raises(ValidationError):
        Scenario.model_validate(payload)


def test_freshness_requires_aware_time_non_negative_age_and_flags_future() -> None:
    service = QualityService(LINEAGE)
    with pytest.raises(ValueError, match="timezone"):
        service.freshness(NOW.replace(tzinfo=None), NOW, timedelta(days=1))
    with pytest.raises(ValueError, match="timezone"):
        service.freshness(NOW, NOW.replace(tzinfo=None), timedelta(days=1))
    with pytest.raises(ValueError, match="non-negative"):
        service.freshness(NOW, NOW, timedelta(seconds=-1))
    future = service.freshness(NOW + timedelta(minutes=1), NOW, timedelta(days=1))
    assert future.status is QualityStatus.DEGRADED


def test_completeness_harmonizes_null_blank_and_nan() -> None:
    finding = QualityService(LINEAGE).completeness(
        [{"id": None}, {"id": "  "}, {"id": float("nan")}, {"id": "ok"}], {"id"}
    )
    assert finding.affected_rows == 3
    assert finding.coverage == 0.25
    assert finding.status is QualityStatus.BLOCKED


def test_source_registry_has_governance_fields_and_real_public_constraints() -> None:
    registry = load_source_registry(ROOT / "data/catalog/source_registry.yml")
    assert registry.sources
    for source in registry.sources:
        assert source.purpose
        assert source.license
        assert source.privacy
        assert source.grain
        assert source.cadence
        assert source.coverage
        assert source.freshness
        assert source.access
        assert source.transformations
        assert source.retention

    base = registry.sources[0].model_dump()
    base.update(status="REAL_PUBLIC", url=None, license="")
    with pytest.raises(ValidationError, match="REAL_PUBLIC"):
        SourceEntry.model_validate(base)


def test_capacity_utilization_allows_over_capacity_but_rates_do_not() -> None:
    observation = MetricsService().ratio(
        "capacity_utilization", 12, 10, NOW, **metric_kwargs()
    )
    assert observation.value == 1.2
    for indicator_id in ("attendance_rate", "assessment_participation"):
        with pytest.raises(ValueError, match="cannot exceed"):
            MetricsService().ratio(indicator_id, 12, 10, NOW, **metric_kwargs())


@pytest.mark.parametrize(
    "changes",
    [
        {"value": None, "quality_status": "OK", "interpretable": True},
        {"value": None, "quality_status": "BLOCKED", "interpretable": True},
        {"window_start": NOW + timedelta(days=1)},
        {"coverage": 0.9},
    ],
)
def test_observation_rejects_incoherent_value_window_and_coverage(
    changes: dict[str, object],
) -> None:
    valid = MetricsService().ratio("attendance_rate", 8, 10, NOW, **metric_kwargs())
    with pytest.raises(ValidationError):
        IndicatorObservation.model_validate({**valid.model_dump(), **changes})


def test_catalog_contracts_reject_duplicate_ids_and_incoherent_assets() -> None:
    asset = DataAsset(
        id="asset",
        owner="owner",
        source="source",
        status="INFERRED",
        grain="row",
        keys=("id",),
        fields={"id": "string"},
        provenance=LINEAGE.model_copy(update={"source_id": "source"}),
    )
    with pytest.raises(ValidationError, match="unique"):
        MetadataCatalog(version="1", assets=(asset, asset))
    bad_payload = asset.model_dump()
    bad_payload["keys"] = ("missing",)
    with pytest.raises(ValidationError, match="keys"):
        DataAsset.model_validate(bad_payload)
    bad_payload = asset.model_dump()
    bad_payload["source"] = "different"
    with pytest.raises(ValidationError, match="provenance"):
        DataAsset.model_validate(bad_payload)

    source = SourceEntry(
        id="source",
        owner="owner",
        source="source",
        status="INFERRED",
        purpose="purpose",
        license="license",
        privacy="aggregate",
        grain="row",
        cadence="unknown",
        coverage="unknown",
        freshness="unknown",
        access="metadata",
        transformations=("none",),
        retention="metadata",
    )
    with pytest.raises(ValidationError, match="unique"):
        SourceRegistry(version="1", sources=(source, source))


def test_quality_rejects_empty_keys_and_blocks_empty_datasets_uniformly() -> None:
    service = QualityService(LINEAGE)
    with pytest.raises(ValueError, match="required"):
        service.completeness([{"id": 1}], set())
    with pytest.raises(ValueError, match="keys"):
        service.duplicate_keys([{"id": 1}], ())
    for finding in (
        service.completeness([], {"id"}),
        service.duplicate_keys([], ("id",)),
        service.orphan_keys(set(), {1}),
    ):
        assert finding.status is QualityStatus.BLOCKED
        assert finding.coverage == 0
