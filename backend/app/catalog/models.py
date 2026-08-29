from enum import StrEnum

from pydantic import Field, model_validator

from app.contracts.data import DataAsset, StrictModel


class MetadataCatalog(StrictModel):
    version: str
    assets: tuple[DataAsset, ...] = Field(min_length=1)

    @model_validator(mode="after")
    def require_unique_asset_ids(self) -> "MetadataCatalog":
        ids = [asset.id for asset in self.assets]
        if len(ids) != len(set(ids)):
            raise ValueError("asset IDs must be unique")
        return self


class SourceEntry(StrictModel):
    id: str
    owner: str
    source: str
    status: str
    url: str | None = None
    purpose: str = Field(min_length=1)
    license: str
    privacy: str = Field(min_length=1)
    grain: str = Field(min_length=1)
    cadence: str = Field(min_length=1)
    coverage: str = Field(min_length=1)
    freshness: str = Field(min_length=1)
    access: str = Field(min_length=1)
    transformations: tuple[str, ...] = Field(min_length=1)
    retention: str = Field(min_length=1)
    limitations: tuple[str, ...] = ()

    @model_validator(mode="after")
    def govern_real_public_source(self) -> "SourceEntry":
        if self.status == "REAL_PUBLIC" and (not self.url or not self.license.strip()):
            raise ValueError("REAL_PUBLIC source requires URL and license")
        if not self.license.strip():
            raise ValueError("source governance requires a non-blank license")
        return self


class SourceRegistry(StrictModel):
    version: str
    sources: tuple[SourceEntry, ...]

    @model_validator(mode="after")
    def require_unique_source_ids(self) -> "SourceRegistry":
        ids = [source.id for source in self.sources]
        if len(ids) != len(set(ids)):
            raise ValueError("source IDs must be unique")
        return self


class ScenarioParameters(StrictModel):
    attendance_trend: float = Field(ge=-0.05, le=0.05)
    assessment_trend: float = Field(ge=-10, le=10)
    capacity_pressure: float = Field(ge=0, le=1)
    shortage_factor: float = Field(ge=0, le=5)
    quality_gap: float = Field(ge=0, le=1)


class ScenarioPrivacy(StrEnum):
    AGGREGATE_NO_PII = "AGGREGATE_NO_PII"


class Scenario(StrictModel):
    version: str
    id: str = Field(pattern=r"^[a-z][a-z0-9_]*$")
    privacy_classification: ScenarioPrivacy
    label: str
    narrative: str
    seed: int
    parameters: ScenarioParameters
    expected_signals: tuple[str, ...]
