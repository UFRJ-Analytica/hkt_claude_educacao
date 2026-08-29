import copy
import hashlib
import json
from pathlib import Path
from typing import Any

import duckdb

from app.data_access.dataset_contract import (
    GOVERNED_ASSET_SCHEMAS,
    GOVERNED_ASSET_SOURCE_KINDS,
    GOVERNED_RELEASE_FILES,
    expected_schema,
    manifest_content_id,
)
from app.schools.contracts import MapBounds

_TABLE_COLUMNS = {
    "assessment_facts": {"score", "participants", "eligible"},
    "attendance_facts": {"present_count", "expected_count"},
    "capacity_facts": {"enrolled", "capacity"},
    "teacher_shortage_facts": {"shortage_hours", "required_hours"},
    "quality_observations": {"coverage"},
}
_OPERATIONS = {"sum": "sum", "avg": "avg", "min": "min", "max": "max", "count": "count"}
_POINTER_VERSION = "1.0.0"
_MANIFEST_VERSION = "2.0.0"
_GOVERNED_PARQUETS = set(GOVERNED_ASSET_SCHEMAS)


def _sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def validate_dataset_release(
    root: Path, *, expected_generation_id: str | None = None
) -> dict[str, Any]:
    """Validate a complete governed release and return its trusted manifest."""
    try:
        manifest_path = root / "manifest.json"
        if manifest_path.is_symlink() or not manifest_path.is_file():
            raise ValueError("dataset manifest is unavailable")
        value: object = json.loads(manifest_path.read_text(encoding="utf-8"))
        if not isinstance(value, dict):
            raise ValueError("dataset manifest is invalid")
        manifest: dict[str, Any] = value
        generation_id = manifest.get("generation_id")
        generator_version = manifest.get("generator_version")
        if (
            manifest.get("manifest_version") != _MANIFEST_VERSION
            or not isinstance(generator_version, str)
            or not generator_version
            or not isinstance(generation_id, str)
            or len(generation_id) != 64
            or any(character not in "0123456789abcdef" for character in generation_id)
        ):
            raise ValueError("dataset manifest version or generation is invalid")
        if expected_generation_id is not None and generation_id != expected_generation_id:
            raise ValueError("dataset manifest generation does not match release")
        if manifest_content_id(manifest) != generation_id:
            raise ValueError("dataset manifest content does not match generation id")
        entries = list(root.iterdir())
        if (
            {path.name for path in entries} != GOVERNED_RELEASE_FILES
            or any(path.is_symlink() or not path.is_file() for path in entries)
        ):
            raise ValueError("dataset release does not contain exactly the governed files")
        files = manifest.get("files")
        if not isinstance(files, dict):
            raise ValueError("dataset does not contain the exact governed asset set")
        if set(files) != _GOVERNED_PARQUETS:
            raise ValueError("dataset manifest does not govern the exact asset set")
        with duckdb.connect(":memory:") as connection:
            for name in sorted(_GOVERNED_PARQUETS):
                path = root / name
                if path.is_symlink() or not path.is_file() or path.resolve().parent != root:
                    raise ValueError("dataset asset is unavailable or unsafe")
                metadata = files[name]
                if not isinstance(metadata, dict):
                    raise ValueError("dataset asset metadata is invalid")
                sha256 = metadata.get("sha256")
                row_count = metadata.get("row_count")
                schema = metadata.get("schema")
                source_kind = metadata.get("source_kind")
                if not isinstance(sha256, str) or _sha256(path) != sha256:
                    raise ValueError(f"dataset asset hash mismatch: {name}")
                if schema != expected_schema(name):
                    raise ValueError(f"dataset asset violates governed schema: {name}")
                if source_kind != GOVERNED_ASSET_SOURCE_KINDS[name]:
                    raise ValueError(f"dataset asset violates governed source kind: {name}")
                escaped = str(path).replace("'", "''")
                count = connection.execute(
                    f"SELECT count(*) FROM read_parquet('{escaped}')"
                ).fetchone()
                actual_schema = [
                    {"name": row[0], "type": row[1]}
                    for row in connection.execute(
                        f"DESCRIBE SELECT * FROM read_parquet('{escaped}')"
                    ).fetchall()
                ]
                if (
                    isinstance(row_count, bool)
                    or not isinstance(row_count, int)
                    or row_count < 0
                    or count is None
                    or count[0] != row_count
                    or schema != actual_schema
                ):
                    raise ValueError(f"dataset asset metadata mismatch: {name}")
        return copy.deepcopy(manifest)
    except ValueError:
        raise
    except (
        OSError,
        UnicodeError,
        json.JSONDecodeError,
        duckdb.Error,
        KeyError,
        TypeError,
    ) as error:
        raise ValueError("dataset release failed integrity validation") from error


def _resolve_published_root(root: Path) -> Path:
    """Resolve one immutable dataset snapshot from an atomically replaced pointer."""
    pointer_path = root / "current.json"
    if not pointer_path.exists():
        return root  # Compatibility with governed datasets created before release pointers.
    if pointer_path.is_symlink() or not pointer_path.is_file():
        raise ValueError("dataset pointer must be a regular file")
    try:
        pointer: object = json.loads(pointer_path.read_text(encoding="utf-8"))
    except (OSError, UnicodeError, json.JSONDecodeError) as error:
        raise ValueError("dataset pointer is invalid") from error
    if not isinstance(pointer, dict) or set(pointer) != {"pointer_version", "release"}:
        raise ValueError("dataset pointer is invalid")
    release_name = pointer.get("release")
    if pointer.get("pointer_version") != _POINTER_VERSION or not isinstance(release_name, str):
        raise ValueError("dataset pointer is invalid")
    parts = Path(release_name).parts
    if (
        len(parts) != 2
        or parts[0] != "releases"
        or len(parts[1]) != 64
        or any(character not in "0123456789abcdef" for character in parts[1])
    ):
        raise ValueError("dataset pointer references an invalid release")
    releases = root / "releases"
    unresolved = releases / parts[1]
    if releases.is_symlink() or unresolved.is_symlink():
        raise ValueError("dataset release must not be a symlink or reparse point")
    release = unresolved.resolve()
    if release.parent != releases.resolve() or not release.is_dir():
        raise ValueError("dataset release is unavailable")
    return release


class DuckDBDataAccess:
    """Read-only Parquet adapter; callers select only governed identifiers, never SQL."""

    def __init__(self, root: Path, *, allow_external_root: bool = False) -> None:
        resolved = root.resolve()
        generated = (Path(__file__).parents[3] / "data/generated").resolve()
        if not allow_external_root and resolved != generated:
            raise ValueError(
                "data root must be data/generated unless explicitly injected for tests"
            )
        if not resolved.is_dir():
            raise ValueError("data root does not exist")
        self._publication_root = resolved
        self._root = _resolve_published_root(resolved)
        expected = self._root.name if self._root.parent.name == "releases" else None
        self._manifest = validate_dataset_release(self._root, expected_generation_id=expected)

    def _asset_path(self, asset: str, *, allow_schools: bool = False) -> Path:
        if asset not in _TABLE_COLUMNS and not (allow_schools and asset == "schools"):
            raise ValueError("asset is not allowlisted")
        unresolved = self._root / f"{asset}.parquet"
        if unresolved.is_symlink():
            raise ValueError("asset must not be a symlink or reparse point")
        path = unresolved.resolve()
        if path.parent != self._root or not path.is_file():
            raise ValueError("asset file is unavailable")
        return path

    def _asset(self, asset: str) -> str:
        return str(self._asset_path(asset)).replace("'", "''")

    @staticmethod
    def _rows(cursor: duckdb.DuckDBPyConnection) -> list[dict[str, Any]]:
        columns = [item[0] for item in cursor.description]
        return [dict(zip(columns, row, strict=True)) for row in cursor.fetchall()]

    def list_schools(self, *, limit: int = 100, offset: int = 0) -> list[dict[str, Any]]:
        if not 1 <= limit <= 1000 or offset < 0:
            raise ValueError("invalid pagination")
        path = self._asset_path("schools", allow_schools=True)
        escaped = str(path).replace("'", "''")
        with duckdb.connect(":memory:") as connection:
            cursor = connection.execute(
                "SELECT school_id, school_name, inep_id, sme_designation, cre, neighborhood, "
                "latitude, longitude, dependency, location_source, match_method, location_quality "
                f"FROM read_parquet('{escaped}') ORDER BY school_id LIMIT ? OFFSET ?",
                [limit, offset],
            )
            return self._rows(cursor)

    def snapshot_id(self) -> str:
        """Return the immutable release id pinned at construction."""
        if self._root.parent.name == "releases":
            return self._root.name
        value = self.manifest().get("generation_id")
        if not isinstance(value, str) or len(value) != 64:
            raise ValueError("dataset manifest has no valid generation id")
        return value

    def manifest(self) -> dict[str, Any]:
        return copy.deepcopy(self._manifest)

    def validate(self) -> bool:
        """Cheap readiness signal: construction validated the pinned release."""
        return True

    def available_cres(self) -> list[int]:
        path = str(self._asset_path("schools", allow_schools=True)).replace("'", "''")
        with duckdb.connect(":memory:") as connection:
            rows = connection.execute(
                f"SELECT DISTINCT cre FROM read_parquet('{path}') ORDER BY cre"
            ).fetchall()
        result: list[int] = []
        for row in rows:
            value = row[0]
            if isinstance(value, bool) or not isinstance(value, int) or not 1 <= value <= 11:
                raise ValueError("dataset contains invalid CRE")
            result.append(value)
        return result

    @staticmethod
    def _school_filters(
        cre: int | None, bounds: MapBounds | None, *, geolocated_only: bool = False
    ) -> tuple[str, list[object]]:
        if cre is not None and not 1 <= cre <= 11:
            raise ValueError("invalid CRE")
        clauses: list[str] = []
        parameters: list[object] = []
        if cre is not None:
            clauses.append("s.cre = ?")
            parameters.append(cre)
        if bounds is not None:
            clauses.extend(["s.longitude BETWEEN ? AND ?", "s.latitude BETWEEN ? AND ?"])
            parameters.extend([bounds.west, bounds.east, bounds.south, bounds.north])
        if geolocated_only:
            clauses.extend(["s.latitude IS NOT NULL", "s.longitude IS NOT NULL"])
        return (" WHERE " + " AND ".join(clauses) if clauses else ""), parameters

    def map_coverage(
        self, *, cre: int | None = None, bounds: MapBounds | None = None
    ) -> dict[str, int | float]:
        path = str(self._asset_path("schools", allow_schools=True)).replace("'", "''")
        clauses: list[str] = []
        scope_parameters: list[object] = []
        if cre is not None:
            if not 1 <= cre <= 11:
                raise ValueError("invalid CRE")
            clauses.append("cre = ?")
            scope_parameters.append(cre)
        scope = " WHERE " + " AND ".join(clauses) if clauses else ""
        geo = "latitude IS NOT NULL AND longitude IS NOT NULL"
        geo_parameters: list[object] = []
        if bounds is not None:
            geo += " AND longitude BETWEEN ? AND ? AND latitude BETWEEN ? AND ?"
            geo_parameters.extend([bounds.west, bounds.east, bounds.south, bounds.north])
        parameters = [*geo_parameters, *scope_parameters]
        with duckdb.connect(":memory:") as connection:
            row = connection.execute(
                f"SELECT count(*) FILTER (WHERE {geo}) AS geolocated, "
                "count(*) FILTER (WHERE latitude IS NULL OR longitude IS NULL) AS missing "
                f"FROM read_parquet('{path}'){scope}",
                parameters,
            ).fetchone()
        if row is None:
            raise RuntimeError("coverage query returned no row")
        geolocated, missing = int(row[0]), int(row[1])
        total = geolocated + missing
        return {
            "total": total,
            "geolocated": geolocated,
            "missing": missing,
            "coverage_ratio": 0.0 if total == 0 else geolocated / total,
        }

    def _school_metrics_sql(self) -> str:
        schools = str(self._asset_path("schools", allow_schools=True)).replace("'", "''")
        attendance = self._asset("attendance_facts")
        assessment = self._asset("assessment_facts")
        capacity = self._asset("capacity_facts")
        staffing = self._asset("teacher_shortage_facts")
        quality = str(self._asset_path("quality_observations")).replace("'", "''")
        return f"""
WITH
a_last AS (SELECT school_id, max(period) period FROM read_parquet('{attendance}')
           GROUP BY school_id),
a AS (SELECT f.school_id, l.period attendance_period,
             sum(f.present_count)::DOUBLE/nullif(sum(f.expected_count), 0) attendance_rate
      FROM read_parquet('{attendance}') f JOIN a_last l USING (school_id, period)
      GROUP BY f.school_id, l.period),
x_last AS (SELECT school_id, max(period) period FROM read_parquet('{assessment}')
           GROUP BY school_id),
x AS (SELECT f.school_id, l.period assessment_period, avg(f.score) assessment_score
      FROM read_parquet('{assessment}') f JOIN x_last l USING (school_id, period)
      GROUP BY f.school_id, l.period),
c_last AS (SELECT school_id, max(period) period FROM read_parquet('{capacity}') GROUP BY school_id),
c AS (SELECT f.school_id, l.period capacity_period,
             sum(f.enrolled)::DOUBLE/nullif(sum(f.capacity), 0) capacity_utilization
      FROM read_parquet('{capacity}') f JOIN c_last l USING (school_id, period)
      GROUP BY f.school_id, l.period),
t_last AS (SELECT school_id, max(period) period FROM read_parquet('{staffing}') GROUP BY school_id),
t AS (SELECT f.school_id, l.period staffing_period,
             sum(f.shortage_hours)::DOUBLE/nullif(sum(f.required_hours), 0) teacher_shortage_rate
      FROM read_parquet('{staffing}') f JOIN t_last l USING (school_id, period)
      GROUP BY f.school_id, l.period),
q AS (SELECT school_id, min(coverage) quality_coverage,
             CASE WHEN count(*) FILTER (WHERE status='BLOCKED') > 0 THEN 'BLOCKED'
                  WHEN count(*) FILTER (WHERE status='DEGRADED') > 0 THEN 'DEGRADED'
                  WHEN count(*) > 0 THEN 'OK' ELSE 'BLOCKED' END quality_status
      FROM read_parquet('{quality}') GROUP BY school_id)
SELECT s.*, a.attendance_period, a.attendance_rate,
       x.assessment_period, x.assessment_score,
       c.capacity_period, c.capacity_utilization,
       t.staffing_period, t.teacher_shortage_rate,
       coalesce(q.quality_status, 'BLOCKED') quality_status, q.quality_coverage
FROM read_parquet('{schools}') s
LEFT JOIN a USING (school_id) LEFT JOIN x USING (school_id)
LEFT JOIN c USING (school_id) LEFT JOIN t USING (school_id)
LEFT JOIN q USING (school_id)
"""

    def school_map_rows(
        self,
        *,
        cre: int | None = None,
        bounds: MapBounds | None = None,
        limit: int = 2000,
        offset: int = 0,
    ) -> list[dict[str, Any]]:
        if not 1 <= limit <= 2000 or offset < 0:
            raise ValueError("invalid pagination")
        where, parameters = self._school_filters(cre, bounds, geolocated_only=True)
        parameters.extend([limit, offset])
        with duckdb.connect(":memory:") as connection:
            cursor = connection.execute(
                self._school_metrics_sql() + where + " ORDER BY s.school_id LIMIT ? OFFSET ?",
                parameters,
            )
            return self._rows(cursor)

    def school_profile(self, school_id: str) -> dict[str, Any] | None:
        if not school_id:
            raise ValueError("school id cannot be blank")
        with duckdb.connect(":memory:") as connection:
            cursor = connection.execute(
                self._school_metrics_sql() + " WHERE s.school_id = ?", [school_id]
            )
            rows = self._rows(cursor)
        return rows[0] if rows else None

    @staticmethod
    def _analytics_scope(cre: int | None) -> tuple[str, list[object]]:
        if cre is None:
            return "", []
        if isinstance(cre, bool) or not 1 <= cre <= 11:
            raise ValueError("invalid CRE")
        return " WHERE cre = ?", [cre]

    def analytics_snapshot(self, *, cre: int | None = None) -> list[dict[str, Any]]:
        """Aggregate current scope periods without accepting SQL identifiers from callers.

        Assessment is weighted by participants; the other metrics are ratios of sums.
        """
        schools = str(self._asset_path("schools", allow_schools=True)).replace("'", "''")
        attendance = self._asset("attendance_facts")
        assessment = self._asset("assessment_facts")
        capacity = self._asset("capacity_facts")
        staffing = self._asset("teacher_shortage_facts")
        where, parameters = self._analytics_scope(cre)
        query = f"""
WITH scope AS (
  SELECT school_id FROM read_parquet('{schools}'){where}
), school_total AS (SELECT count(*)::BIGINT n FROM scope),
a_period AS (SELECT max(period) p FROM read_parquet('{attendance}') JOIN scope USING(school_id)),
a AS (SELECT 'attendance_rate' indicator_id, p period,
             sum(present_count)::DOUBLE numerator, sum(expected_count)::DOUBLE denominator,
             count(DISTINCT school_id) FILTER (WHERE expected_count > 0)::BIGINT covered
      FROM read_parquet('{attendance}') JOIN scope USING(school_id), a_period
      WHERE period=p GROUP BY p),
x_period AS (SELECT max(period) p FROM read_parquet('{assessment}') JOIN scope USING(school_id)),
x AS (SELECT 'assessment_score' indicator_id, p period,
             sum(score * participants)::DOUBLE numerator, sum(participants)::DOUBLE denominator,
             count(DISTINCT school_id) FILTER (WHERE participants > 0)::BIGINT covered
      FROM read_parquet('{assessment}') JOIN scope USING(school_id), x_period
      WHERE period=p GROUP BY p),
c_period AS (SELECT max(period) p FROM read_parquet('{capacity}') JOIN scope USING(school_id)),
c AS (SELECT 'capacity_utilization' indicator_id, p period,
             sum(enrolled)::DOUBLE numerator, sum(capacity)::DOUBLE denominator,
             count(DISTINCT school_id) FILTER (WHERE capacity > 0)::BIGINT covered
      FROM read_parquet('{capacity}') JOIN scope USING(school_id), c_period
      WHERE period=p GROUP BY p),
t_period AS (SELECT max(period) p FROM read_parquet('{staffing}') JOIN scope USING(school_id)),
t AS (SELECT 'teacher_shortage_rate' indicator_id, p period,
             sum(shortage_hours)::DOUBLE numerator, sum(required_hours)::DOUBLE denominator,
             count(DISTINCT school_id) FILTER (WHERE required_hours > 0)::BIGINT covered
      FROM read_parquet('{staffing}') JOIN scope USING(school_id), t_period
      WHERE period=p GROUP BY p),
metrics AS (
  SELECT * FROM a UNION ALL SELECT * FROM x UNION ALL SELECT * FROM c UNION ALL SELECT * FROM t
)
SELECT indicator_id, period, numerator, denominator,
       numerator / nullif(denominator, 0) AS "value", covered AS coverage_numerator,
       school_total.n coverage_denominator, school_total.n school_count
FROM metrics CROSS JOIN school_total ORDER BY indicator_id
"""
        with duckdb.connect(":memory:") as connection:
            return self._rows(connection.execute(query, parameters))

    def analytics_quality(self, *, cre: int | None = None) -> list[dict[str, Any]]:
        """Summarize checks using worst status and explicitly named mean coverage."""
        schools = str(self._asset_path("schools", allow_schools=True)).replace("'", "''")
        quality = self._asset("quality_observations")
        where, parameters = self._analytics_scope(cre)
        query = f"""
WITH scope AS (SELECT school_id FROM read_parquet('{schools}'){where}),
scope_total AS (SELECT count(*)::BIGINT n FROM scope)
SELECT check_id,
       CASE WHEN count(DISTINCT q.school_id) < scope_total.n THEN 'BLOCKED'
            WHEN count(*) FILTER (WHERE status='BLOCKED') > 0 THEN 'BLOCKED'
            WHEN count(*) FILTER (WHERE status='DEGRADED') > 0 THEN 'DEGRADED'
            ELSE 'OK' END status,
       (count(DISTINCT q.school_id) FILTER (WHERE status <> 'OK')
        + scope_total.n - count(DISTINCT q.school_id))::BIGINT affected_school_count,
       count(DISTINCT q.school_id)::BIGINT observed_school_count,
       scope_total.n::BIGINT school_count,
       avg(coverage)::DOUBLE coverage_mean
FROM read_parquet('{quality}') q JOIN scope USING(school_id) CROSS JOIN scope_total
GROUP BY check_id, scope_total.n ORDER BY check_id
"""
        with duckdb.connect(":memory:") as connection:
            return self._rows(connection.execute(query, parameters))

    def aggregate(self, asset: str, measure: str, operation: str) -> float | None:
        if (
            asset not in _TABLE_COLUMNS
            or measure not in _TABLE_COLUMNS[asset]
            or operation not in _OPERATIONS
        ):
            raise ValueError("measure or operation is not allowlisted")
        path = self._asset(asset)
        with duckdb.connect(":memory:") as connection:
            row = connection.execute(
                f"SELECT {_OPERATIONS[operation]}({measure}) FROM read_parquet('{path}')"
            ).fetchone()
            if row is None:
                raise RuntimeError("aggregate query returned no row")
            value = row[0]
        return None if value is None else float(value)

    def series(
        self, asset: str, period: str, measure: str, *, school_id: str | None = None
    ) -> list[dict[str, Any]]:
        path = self._asset(asset)
        if period != "period" or measure not in _TABLE_COLUMNS[asset]:
            raise ValueError("series identifiers are not allowlisted")
        where = " WHERE school_id = ?" if school_id is not None else ""
        parameters = [school_id] if school_id is not None else []
        with duckdb.connect(":memory:") as connection:
            cursor = connection.execute(
                f"SELECT period, avg({measure}) AS value FROM read_parquet('{path}')"
                f"{where} GROUP BY period ORDER BY period",
                parameters,
            )
            return self._rows(cursor)
