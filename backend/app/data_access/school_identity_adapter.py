"""Read-only adapter for a curated official school identity Parquet release."""

import hashlib
import json
import os
import stat
import tempfile
import threading
from collections.abc import Iterator
from contextlib import contextmanager
from datetime import datetime
from pathlib import Path
from typing import Any, cast

import duckdb

from app.contracts.provenance import Provenance, SourceKind
from app.schools.contracts import Coordinates, SchoolIdentity
from app.schools.identity_contracts import (
    CanonicalSchoolRecord,
    IdentityMatchField,
    OfficialSchoolListQuery,
)

_IDENTITY_SCHEMA: tuple[tuple[str, str], ...] = (
    ("school_id", "VARCHAR"),
    ("school_name", "VARCHAR"),
    ("inep_id", "VARCHAR"),
    ("sme_designation", "VARCHAR"),
    ("cre", "INTEGER"),
    ("neighborhood", "VARCHAR"),
    ("dependency", "VARCHAR"),
    ("school_type", "VARCHAR"),
    ("latitude", "DOUBLE"),
    ("longitude", "DOUBLE"),
)
_RELEASE_FILES = frozenset({"manifest.json", "school_identity.parquet"})
_LOOKUP_COLUMNS = {
    IdentityMatchField.SCHOOL_ID: "school_id",
    IdentityMatchField.INEP_ID: "inep_id",
    IdentityMatchField.SME_DESIGNATION: "sme_designation",
}
_DEFAULT_ROOT = Path(__file__).parents[3] / "data" / "official" / "school_identity"
_REPARSE_POINT = 0x400


def _is_link_or_reparse(path: Path) -> bool:
    try:
        metadata = path.lstat()
    except OSError:
        return False
    return path.is_symlink() or bool(
        getattr(metadata, "st_file_attributes", 0) & _REPARSE_POINT
    )


def _reject_link_components(path: Path) -> None:
    for component in (path, *path.parents):
        if _is_link_or_reparse(component):
            raise ValueError(
                "governed identity path cannot contain a symlink or reparse point"
            )


def _absolute_without_resolution(path: Path) -> Path:
    return Path(os.path.abspath(path))


def _canonical_json(value: object) -> str:
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":"))


def identity_manifest_content_id(manifest: dict[str, object]) -> str:
    content = {key: value for key, value in manifest.items() if key != "snapshot_id"}
    return hashlib.sha256(_canonical_json(content).encode("utf-8")).hexdigest()


def _read_verified_bytes(path: Path, expected_hash: str) -> bytes:
    _reject_link_components(path)
    flags = os.O_RDONLY | getattr(os, "O_BINARY", 0) | getattr(os, "O_NOFOLLOW", 0)
    try:
        descriptor = os.open(path, flags)
    except OSError as error:
        raise ValueError("official identity asset is unavailable") from error
    try:
        opened = os.fstat(descriptor)
        current = os.lstat(path)
        if (
            not stat.S_ISREG(opened.st_mode)
            or (opened.st_dev, opened.st_ino) != (current.st_dev, current.st_ino)
        ):
            raise ValueError("official identity asset changed during secure open")
        chunks: list[bytes] = []
        digest = hashlib.sha256()
        while chunk := os.read(descriptor, 1024 * 1024):
            chunks.append(chunk)
            digest.update(chunk)
    finally:
        os.close(descriptor)
    if digest.hexdigest() != expected_hash:
        raise ValueError("official identity asset hash mismatch")
    return b"".join(chunks)


@contextmanager
def _private_parquet(content: bytes) -> Iterator[Path]:
    descriptor, filename = tempfile.mkstemp(prefix="school-identity-", suffix=".parquet")
    path = Path(filename)
    try:
        with os.fdopen(descriptor, "wb") as stream:
            stream.write(content)
            stream.flush()
            os.fsync(stream.fileno())
        os.chmod(path, stat.S_IREAD)
        yield path
    finally:
        try:
            os.chmod(path, stat.S_IREAD | stat.S_IWRITE)
            path.unlink(missing_ok=True)
        except OSError:
            pass


def _expected_schema() -> list[dict[str, str]]:
    return [{"name": name, "type": data_type} for name, data_type in _IDENTITY_SCHEMA]


def _confined_release(root: Path, release_reference: object) -> tuple[Path, str]:
    if not isinstance(release_reference, str):
        raise ValueError("identity release pointer is invalid")
    parts = Path(release_reference).parts
    if len(parts) != 2 or parts[0] != "releases" or len(parts[1]) != 64:
        raise ValueError("identity release pointer is invalid")
    snapshot_id = parts[1]
    if any(character not in "0123456789abcdef" for character in snapshot_id):
        raise ValueError("identity release pointer is invalid")
    releases_root = root / "releases"
    release = root / release_reference
    _reject_link_components(root)
    _reject_link_components(releases_root)
    _reject_link_components(release)
    if release.parent != releases_root or not release.is_dir():
        raise ValueError("identity release is unavailable")
    resolved_root = root.resolve(strict=True)
    resolved_releases = releases_root.resolve(strict=True)
    resolved_release = release.resolve(strict=True)
    if (
        resolved_releases.parent != resolved_root
        or resolved_release.parent != resolved_releases
        or not resolved_release.is_relative_to(resolved_root)
    ):
        raise ValueError("identity release is outside the governed directory")
    return resolved_release, snapshot_id


class CuratedSchoolIdentityAdapter:
    """Consumes a data-team-published release; it performs no external ingestion."""

    def __init__(self, root: Path = _DEFAULT_ROOT, *, allow_external_root: bool = False) -> None:
        absolute_root = _absolute_without_resolution(root)
        governed_root = _absolute_without_resolution(_DEFAULT_ROOT)
        if not allow_external_root and absolute_root != governed_root:
            raise ValueError("official identity root must be the governed data directory")
        _reject_link_components(absolute_root)
        self._root = absolute_root
        self._release, pointer_snapshot = self._load_pointer()
        self._manifest, verified_content = self._validate_release(pointer_snapshot)
        self._snapshot_id = cast(str, self._manifest["snapshot_id"])
        metadata = cast(
            dict[str, object],
            cast(dict[str, object], self._manifest["files"])[
                "school_identity.parquet"
            ],
        )
        self._parquet = self._release / "school_identity.parquet"
        self._expected_hash = cast(str, metadata["sha256"])
        self._cache_lock = threading.RLock()
        self._cache = self._build_cache(verified_content)
        self._provenance = self._build_provenance()

    def _load_pointer(self) -> tuple[Path, str]:
        pointer_path = self._root / "current.json"
        if _is_link_or_reparse(pointer_path) or not pointer_path.is_file():
            raise ValueError("official identity pointer is unavailable")
        try:
            pointer = json.loads(pointer_path.read_text(encoding="utf-8"))
        except (OSError, UnicodeError, json.JSONDecodeError) as error:
            raise ValueError("official identity pointer is invalid") from error
        if not isinstance(pointer, dict) or pointer.get("pointer_version") != "1.0.0":
            raise ValueError("official identity pointer is invalid")
        return _confined_release(self._root, pointer.get("release"))

    def _validate_release(
        self, pointer_snapshot: str
    ) -> tuple[dict[str, Any], bytes]:
        entries = tuple(self._release.iterdir())
        if {entry.name for entry in entries} != _RELEASE_FILES or any(
            _is_link_or_reparse(entry) or not entry.is_file() for entry in entries
        ):
            raise ValueError("identity release must contain exactly the governed files")
        manifest_path = self._release / "manifest.json"
        try:
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        except (OSError, UnicodeError, json.JSONDecodeError) as error:
            raise ValueError("official identity manifest is invalid") from error
        if not isinstance(manifest, dict):
            raise ValueError("official identity manifest is invalid")
        if manifest.get("manifest_version") != "1.0.0":
            raise ValueError("official identity manifest version is unsupported")
        if manifest.get("source_id") != "official_school_registry":
            raise ValueError("official identity source id is not allowed")
        if manifest.get("source_kind") != SourceKind.REAL_PUBLIC.value:
            raise ValueError("official identity source must be REAL_PUBLIC")
        snapshot_id = manifest.get("snapshot_id")
        if not isinstance(snapshot_id, str) or snapshot_id != pointer_snapshot:
            raise ValueError("official identity snapshot does not match its release")
        if identity_manifest_content_id(cast(dict[str, object], manifest)) != snapshot_id:
            raise ValueError("official identity content does not match snapshot id")

        files = manifest.get("files")
        if not isinstance(files, dict) or set(files) != {"school_identity.parquet"}:
            raise ValueError("official identity manifest has invalid assets")
        metadata = files["school_identity.parquet"]
        if not isinstance(metadata, dict):
            raise ValueError("official identity asset metadata is invalid")
        if metadata.get("source_kind") != SourceKind.REAL_PUBLIC.value:
            raise ValueError("official identity asset source must be REAL_PUBLIC")
        if metadata.get("schema") != _expected_schema():
            raise ValueError("official identity asset violates governed schema")

        parquet = self._release / "school_identity.parquet"
        expected_hash = metadata.get("sha256")
        if (
            not isinstance(expected_hash, str)
            or len(expected_hash) != 64
            or any(character not in "0123456789abcdef" for character in expected_hash)
        ):
            raise ValueError("official identity asset hash is invalid")
        verified_content = _read_verified_bytes(parquet, expected_hash)
        with _private_parquet(verified_content) as private_parquet:
            self._validate_parquet(private_parquet, metadata)
        return cast(dict[str, Any], manifest), verified_content

    @staticmethod
    def _validate_parquet(parquet: Path, metadata: dict[str, object]) -> None:
        path = str(parquet).replace("'", "''")
        with duckdb.connect(":memory:") as connection:
            actual_schema = [
                {"name": str(row[0]), "type": str(row[1])}
                for row in connection.execute(
                    f"DESCRIBE SELECT * FROM read_parquet('{path}')"
                ).fetchall()
            ]
            count_row = connection.execute(
                f"SELECT count(*) FROM read_parquet('{path}')"
            ).fetchone()
            row_count = 0 if count_row is None else int(count_row[0])
            expected_row_count = metadata.get("row_count")
            if type(expected_row_count) is not int or expected_row_count <= 0:
                raise ValueError("row_count must be a positive integer")
            if actual_schema != _expected_schema() or expected_row_count != row_count:
                raise ValueError("official identity asset metadata mismatch")
            if row_count == 0:
                raise ValueError("official identity registry cannot be empty")
            invalid_row = connection.execute(
                """
                SELECT count(*)
                FROM read_parquet(?)
                WHERE school_id IS NULL
                   OR NOT regexp_full_match(
                       school_id, '[A-Za-z0-9][A-Za-z0-9._-]*'
                   )
                   OR length(school_id) > 128
                   OR starts_with(school_id, 'SYNTHETIC-')
                   OR school_name IS NULL
                   OR trim(school_name) = ''
                   OR (inep_id IS NULL AND sme_designation IS NULL)
                   OR (
                       inep_id IS NOT NULL
                       AND NOT regexp_full_match(inep_id, '[0-9]{8}')
                   )
                   OR (
                       sme_designation IS NOT NULL
                       AND NOT regexp_full_match(sme_designation, '[0-9]{7}')
                   )
                   OR cre IS NULL
                   OR cre < 1
                   OR cre > 11
                   OR dependency IS NULL
                   OR trim(dependency) = ''
                   OR (neighborhood IS NOT NULL AND trim(neighborhood) = '')
                   OR (school_type IS NOT NULL AND trim(school_type) = '')
                   OR (latitude IS NULL) <> (longitude IS NULL)
                   OR (
                       latitude IS NOT NULL
                       AND (NOT isfinite(latitude) OR latitude < -90 OR latitude > 90)
                   )
                   OR (
                       longitude IS NOT NULL
                       AND (NOT isfinite(longitude) OR longitude < -180 OR longitude > 180)
                   )
                """,
                [str(parquet)],
            ).fetchone()
            if invalid_row is None or int(invalid_row[0]) != 0:
                raise ValueError("invalid official school identity rows")
            duplicate = connection.execute(
                """
                SELECT count(*)
                FROM (
                    SELECT school_id AS value
                    FROM read_parquet(?)
                    GROUP BY school_id
                    HAVING count(*) > 1
                    UNION ALL
                    SELECT inep_id
                    FROM read_parquet(?)
                    WHERE inep_id IS NOT NULL
                    GROUP BY inep_id
                    HAVING count(*) > 1
                    UNION ALL
                    SELECT sme_designation
                    FROM read_parquet(?)
                    WHERE sme_designation IS NOT NULL
                    GROUP BY sme_designation
                    HAVING count(*) > 1
                )
                """,
                [str(parquet), str(parquet), str(parquet)],
            ).fetchone()
            if duplicate is None or int(duplicate[0]) != 0:
                raise ValueError("institutional identifiers must be unique")

    @staticmethod
    def _build_cache(content: bytes) -> duckdb.DuckDBPyConnection:
        connection = duckdb.connect(":memory:")
        try:
            with _private_parquet(content) as private_parquet:
                connection.execute(
                    "CREATE TABLE official_school_identity AS "
                    "SELECT * FROM read_parquet(?)",
                    [str(private_parquet)],
                )
        except (OSError, duckdb.Error):
            connection.close()
            raise
        return connection

    def _build_provenance(self) -> Provenance:
        as_of = self._manifest.get("as_of")
        limitations = self._manifest.get("limitations")
        if not isinstance(as_of, str) or not isinstance(limitations, list):
            raise ValueError("official identity provenance is incomplete")
        try:
            parsed_as_of = datetime.fromisoformat(as_of.replace("Z", "+00:00"))
        except ValueError as error:
            raise ValueError("official identity as_of is invalid") from error
        return Provenance(
            source_id="official_school_registry",
            source_kind=SourceKind.REAL_PUBLIC,
            generated=False,
            as_of=parsed_as_of,
            data_version=self._snapshot_id,
            limitations=tuple(limitations),
        )

    def _assert_asset_current(self) -> None:
        _read_verified_bytes(self._parquet, self._expected_hash)

    def validate(self) -> bool:
        try:
            self._assert_asset_current()
        except (OSError, ValueError):
            return False
        return True

    def snapshot_id(self) -> str:
        return self._snapshot_id

    def provenance(self) -> Provenance:
        return self._provenance

    @staticmethod
    def _row_to_record(row: dict[str, object]) -> CanonicalSchoolRecord:
        coordinates = None
        if row["latitude"] is not None:
            coordinates = Coordinates(
                latitude=cast(float, row["latitude"]),
                longitude=cast(float, row["longitude"]),
            )
        return CanonicalSchoolRecord(
            identity=SchoolIdentity(
                school_id=cast(str, row["school_id"]),
                nome=cast(str, row["school_name"]),
                inep_id=cast(str | None, row["inep_id"]),
                sme_designation=cast(str | None, row["sme_designation"]),
                cre=cast(int, row["cre"]),
                bairro=cast(str | None, row["neighborhood"]),
                dependency=cast(str, row["dependency"]),
                school_type=cast(str | None, row["school_type"]),
                source_kind=SourceKind.REAL_PUBLIC,
                limitations=(),
            ),
            coordinates=coordinates,
        )

    def _rows_to_records(self, rows: list[tuple[object, ...]]) -> tuple[CanonicalSchoolRecord, ...]:
        columns = tuple(name for name, _ in _IDENTITY_SCHEMA)
        return tuple(self._row_to_record(dict(zip(columns, row, strict=True))) for row in rows)

    def list_official_schools(
        self, query: OfficialSchoolListQuery
    ) -> tuple[tuple[CanonicalSchoolRecord, ...], int, int, tuple[int, ...]]:
        self._assert_asset_current()
        columns = ", ".join(name for name, _ in _IDENTITY_SCHEMA)
        where = "WHERE cre = ?" if query.cre is not None else ""
        params: list[object] = [] if query.cre is None else [query.cre]
        try:
            with self._cache_lock:
                total_row = self._cache.execute(
                    f"SELECT count(*), count(latitude) FROM official_school_identity {where}",
                    params,
                ).fetchone()
                cre_rows = self._cache.execute(
                    "SELECT DISTINCT cre FROM official_school_identity ORDER BY cre"
                ).fetchall()
                rows = self._cache.execute(
                    f"SELECT {columns} FROM official_school_identity {where} "
                    "ORDER BY cre, school_name, school_id LIMIT ? OFFSET ?",
                    [*params, query.limit, query.offset],
                ).fetchall()
        except duckdb.Error as error:
            raise ValueError("official identity registry query failed") from error
        self._assert_asset_current()
        if total_row is None:
            total = 0
            with_coordinates = 0
        else:
            total = int(total_row[0])
            with_coordinates = int(total_row[1])
        available_cres = tuple(int(row[0]) for row in cre_rows)
        return self._rows_to_records(rows), total, with_coordinates, available_cres

    def lookup(
        self, field: IdentityMatchField, value: str
    ) -> CanonicalSchoolRecord | None:
        self._assert_asset_current()
        column = _LOOKUP_COLUMNS[field]
        columns = ", ".join(name for name, _ in _IDENTITY_SCHEMA)
        try:
            with self._cache_lock:
                rows = self._cache.execute(
                    f"SELECT {columns} FROM official_school_identity "
                    f"WHERE {column} = ? LIMIT 2",
                    [value],
                ).fetchall()
        except duckdb.Error as error:
            raise ValueError("official identity registry query failed") from error
        self._assert_asset_current()
        if not rows:
            return None
        if len(rows) != 1:
            raise ValueError("institutional identifiers must be unique")
        row = dict(zip((name for name, _ in _IDENTITY_SCHEMA), rows[0], strict=True))
        coordinates = None
        if row["latitude"] is not None:
            coordinates = Coordinates(
                latitude=cast(float, row["latitude"]),
                longitude=cast(float, row["longitude"]),
            )
        return CanonicalSchoolRecord(
            identity=SchoolIdentity(
                school_id=cast(str, row["school_id"]),
                nome=cast(str, row["school_name"]),
                inep_id=cast(str | None, row["inep_id"]),
                sme_designation=cast(str | None, row["sme_designation"]),
                cre=cast(int, row["cre"]),
                bairro=cast(str | None, row["neighborhood"]),
                dependency=cast(str, row["dependency"]),
                school_type=cast(str | None, row["school_type"]),
                source_kind=SourceKind.REAL_PUBLIC,
                limitations=self._provenance.limitations,
            ),
            coordinates=coordinates,
        )
