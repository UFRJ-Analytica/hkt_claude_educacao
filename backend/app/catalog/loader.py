from pathlib import Path
from typing import Any, TypeVar

import yaml
from pydantic import BaseModel

from app.catalog.models import MetadataCatalog, Scenario, SourceRegistry

T = TypeVar("T", bound=BaseModel)
_GOVERNED_SCENARIO_ROOT = (Path(__file__).parents[3] / "data" / "scenarios").resolve()


def _load(path: Path, model: type[T]) -> T:
    with path.open("r", encoding="utf-8") as stream:
        payload: Any = yaml.safe_load(stream)
    if not isinstance(payload, dict):
        raise ValueError("YAML document must be a mapping")
    return model.model_validate(payload)


def load_metadata_catalog(path: Path) -> MetadataCatalog:
    return _load(path, MetadataCatalog)


def load_source_registry(path: Path) -> SourceRegistry:
    return _load(path, SourceRegistry)


def load_scenario(path: Path) -> Scenario:
    if path.is_symlink():
        raise ValueError("scenario must be a regular file under the governed scenario root")
    try:
        resolved = path.resolve(strict=True)
    except (FileNotFoundError, OSError) as exc:
        raise ValueError("scenario does not exist") from exc
    if resolved.parent != _GOVERNED_SCENARIO_ROOT:
        raise ValueError("scenario must be under the governed scenario root")
    scenario = _load(resolved, Scenario)
    if resolved.stem != scenario.id:
        raise ValueError("scenario filename must match its governed id")
    return scenario
