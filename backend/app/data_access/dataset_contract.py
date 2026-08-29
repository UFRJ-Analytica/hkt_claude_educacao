"""Independent governed contract for immutable synthetic dataset releases."""

import hashlib
import json
from typing import Any

GOVERNED_ASSET_SCHEMAS: dict[str, tuple[tuple[str, str], ...]] = {
    "schools.parquet": (
        ("school_id", "VARCHAR"),
        ("school_name", "VARCHAR"),
        ("inep_id", "VARCHAR"),
        ("sme_designation", "VARCHAR"),
        ("cre", "INTEGER"),
        ("neighborhood", "VARCHAR"),
        ("latitude", "DOUBLE"),
        ("longitude", "DOUBLE"),
        ("dependency", "VARCHAR"),
        ("location_source", "VARCHAR"),
        ("match_method", "VARCHAR"),
        ("location_quality", "VARCHAR"),
    ),
    "assessment_facts.parquet": (
        ("school_id", "VARCHAR"),
        ("period", "DATE"),
        ("subject", "VARCHAR"),
        ("score", "DOUBLE"),
        ("participants", "INTEGER"),
        ("eligible", "INTEGER"),
    ),
    "subject_grade_facts.parquet": (
        ("school_id", "VARCHAR"),
        ("period", "DATE"),
        ("subject", "VARCHAR"),
        ("grade", "VARCHAR"),
        ("score", "DOUBLE"),
        ("participants", "INTEGER"),
        ("proficiency_level", "VARCHAR"),
        ("proficiency_error_margin", "DOUBLE"),
    ),
    "lesson_plans.parquet": (
        ("school_id", "VARCHAR"),
        ("period", "DATE"),
        ("subject", "VARCHAR"),
        ("grade", "VARCHAR"),
        ("planned_count", "INTEGER"),
        ("delivered_count", "INTEGER"),
        ("cancelled_count", "INTEGER"),
        ("unlogged_count", "INTEGER"),
    ),
    "attendance_facts.parquet": (
        ("school_id", "VARCHAR"),
        ("period", "DATE"),
        ("present_count", "INTEGER"),
        ("expected_count", "INTEGER"),
    ),
    "capacity_facts.parquet": (
        ("school_id", "VARCHAR"),
        ("period", "DATE"),
        ("enrolled", "INTEGER"),
        ("capacity", "INTEGER"),
    ),
    "teacher_shortage_facts.parquet": (
        ("school_id", "VARCHAR"),
        ("period", "DATE"),
        ("subject", "VARCHAR"),
        ("shortage_hours", "DOUBLE"),
        ("required_hours", "DOUBLE"),
    ),
    "quality_observations.parquet": (
        ("school_id", "VARCHAR"),
        ("check_id", "VARCHAR"),
        ("coverage", "DOUBLE"),
        ("status", "VARCHAR"),
    ),
}

GOVERNED_ASSET_SOURCE_KINDS: dict[str, str] = {
    "schools.parquet": "SYNTHETIC_SCHEMA_FAITHFUL",
    "assessment_facts.parquet": "SYNTHETIC_SCHEMA_FAITHFUL",
    "subject_grade_facts.parquet": "SYNTHETIC_SCHEMA_FAITHFUL",
    "lesson_plans.parquet": "SYNTHETIC_SCHEMA_FAITHFUL",
    "attendance_facts.parquet": "SYNTHETIC_SCHEMA_FAITHFUL",
    "capacity_facts.parquet": "SYNTHETIC_INFERRED",
    "teacher_shortage_facts.parquet": "SYNTHETIC_INFERRED",
    "quality_observations.parquet": "SYNTHETIC_INFERRED",
}

GOVERNED_RELEASE_FILES = frozenset({"manifest.json", *GOVERNED_ASSET_SCHEMAS})


def expected_schema(asset: str) -> list[dict[str, str]]:
    """Return a fresh JSON-shaped schema for a governed asset."""
    try:
        return [
            {"name": name, "type": data_type}
            for name, data_type in GOVERNED_ASSET_SCHEMAS[asset]
        ]
    except KeyError as error:
        raise ValueError("asset has no governed schema") from error


def manifest_content_id(manifest: dict[str, Any]) -> str:
    """Hash every manifest field except the self-referential generation id."""
    payload = {key: value for key, value in manifest.items() if key != "generation_id"}
    canonical = json.dumps(payload, ensure_ascii=False, sort_keys=True, separators=(",", ":"))
    return hashlib.sha256(canonical.encode("utf-8")).hexdigest()
