from __future__ import annotations

import argparse
import hashlib
import json
import os
import tempfile
import urllib.parse
import urllib.request
from collections.abc import Iterable
from datetime import UTC, datetime
from pathlib import Path
from typing import Any

import duckdb

from app.data_access.school_identity_adapter import (
    identity_manifest_content_id,
)

DEFAULT_ARCGIS_LAYER = (
    "https://pgeo3.rio.rj.gov.br/arcgis/rest/services/Educacao/SME/MapServer/1"
)
DEFAULT_OUTPUT = Path(__file__).parents[2] / "data" / "official" / "school_identity"
SCHEMA: tuple[tuple[str, str], ...] = (
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
_LIMITATIONS = [
    "Fonte oficial pública Data.Rio/SME: camada Escolas Municipais, CC-BY 4.0.",
    "O layer traz designação SME, denominação, CRE, tipo e coordenadas; não traz código INEP.",
    (
        "Indicadores INEP por escola devem ser cruzados em release separada "
        "quando houver base oficial com CO_ENTIDADE."
    ),
]


def _fetch_json(url: str) -> dict[str, Any]:
    request = urllib.request.Request(url, headers={"User-Agent": "claude-educacao-backend/1.0"})
    with urllib.request.urlopen(request, timeout=60) as response:
        payload = json.load(response)
    if not isinstance(payload, dict):
        raise ValueError("ArcGIS response is not a JSON object")
    if "error" in payload:
        raise ValueError(f"ArcGIS error: {payload['error']}")
    return payload


def _query_url(layer: str, *, offset: int, limit: int) -> str:
    params = {
        "f": "json",
        "where": "1=1",
        "outFields": "objectid,cre,designacao,denominacao,latitude,longitude,tipo",
        "returnGeometry": "false",
        "resultOffset": str(offset),
        "resultRecordCount": str(limit),
        "orderByFields": "cre,denominacao,objectid",
    }
    return layer.rstrip("/") + "/query?" + urllib.parse.urlencode(params)


def fetch_arcgis_features(
    layer: str = DEFAULT_ARCGIS_LAYER, *, page_size: int = 2000
) -> list[dict[str, Any]]:
    features: list[dict[str, Any]] = []
    offset = 0
    while True:
        payload = _fetch_json(_query_url(layer, offset=offset, limit=page_size))
        page = payload.get("features")
        if not isinstance(page, list):
            raise ValueError("ArcGIS response does not contain a features list")
        features.extend(feature for feature in page if isinstance(feature, dict))
        if not payload.get("exceededTransferLimit") and len(page) < page_size:
            break
        offset += len(page)
        if len(page) == 0:
            break
    return features


def _text(value: object) -> str | None:
    if value is None:
        return None
    cleaned = str(value).strip()
    return cleaned or None


def _coordinate(value: object) -> float | None:
    if value is None:
        return None
    if not isinstance(value, int | float | str):
        return None
    parsed = float(value)
    return parsed


def normalize_feature(feature: dict[str, Any]) -> tuple[object, ...] | None:
    attrs = feature.get("attributes", feature)
    if not isinstance(attrs, dict):
        return None
    designation_raw = attrs.get("designacao")
    if designation_raw is None:
        return None
    designation = f"{int(designation_raw):07d}"
    if len(designation) != 7:
        return None
    name = _text(attrs.get("denominacao"))
    if name is None:
        return None
    cre_value = int(float(attrs["cre"]))
    if cre_value < 1 or cre_value > 11:
        return None
    latitude = _coordinate(attrs.get("latitude"))
    longitude = _coordinate(attrs.get("longitude"))
    if (latitude is None) != (longitude is None):
        latitude = None
        longitude = None
    return (
        f"SME-RIO-{designation}",
        name,
        None,
        designation,
        cre_value,
        None,
        "Municipal",
        _text(attrs.get("tipo")),
        latitude,
        longitude,
    )


def _row_sort_key(row: tuple[object, ...]) -> tuple[int, str, str]:
    cre = row[4]
    if not isinstance(cre, int):
        raise ValueError("normalized CRE must be an integer")
    return cre, str(row[1]), str(row[0])


def normalize_features(features: Iterable[dict[str, Any]]) -> list[tuple[object, ...]]:
    rows = [row for feature in features if (row := normalize_feature(feature)) is not None]
    seen: set[str] = set()
    deduped: list[tuple[object, ...]] = []
    for row in sorted(rows, key=_row_sort_key):
        school_id = str(row[0])
        if school_id in seen:
            continue
        seen.add(school_id)
        deduped.append(row)
    if not deduped:
        raise ValueError("official SME layer produced no valid school rows")
    return deduped


def _write_parquet(path: Path, rows: list[tuple[object, ...]]) -> None:
    columns = ", ".join(f"{name} {data_type}" for name, data_type in SCHEMA)
    placeholders = ", ".join("?" for _ in SCHEMA)
    output = str(path).replace("'", "''")
    with duckdb.connect(":memory:") as connection:
        connection.execute(f"CREATE TABLE school_identity ({columns})")
        connection.executemany(f"INSERT INTO school_identity VALUES ({placeholders})", rows)
        connection.execute(
            f"COPY (SELECT * FROM school_identity ORDER BY cre, school_name, school_id) "
            f"TO '{output}' (FORMAT PARQUET)"
        )


def _manifest(
    parquet: Path, rows: list[tuple[object, ...]], *, as_of: datetime
) -> dict[str, object]:
    manifest: dict[str, object] = {
        "manifest_version": "1.0.0",
        "source_id": "official_school_registry",
        "source_kind": "REAL_PUBLIC",
        "as_of": as_of.isoformat().replace("+00:00", "Z"),
        "limitations": _LIMITATIONS,
        "files": {
            "school_identity.parquet": {
                "sha256": hashlib.sha256(parquet.read_bytes()).hexdigest(),
                "row_count": len(rows),
                "schema": [{"name": name, "type": data_type} for name, data_type in SCHEMA],
                "source_kind": "REAL_PUBLIC",
            }
        },
        "source_urls": [DEFAULT_ARCGIS_LAYER],
        "license": "Creative Commons Attribution 4.0 International License",
    }
    manifest["snapshot_id"] = identity_manifest_content_id(manifest)
    return manifest


def publish_release(
    rows: list[tuple[object, ...]], output: Path = DEFAULT_OUTPUT
) -> dict[str, object]:
    output.mkdir(parents=True, exist_ok=True)
    staging = Path(tempfile.mkdtemp(prefix="school-identity-", dir=output))
    try:
        parquet = staging / "school_identity.parquet"
        _write_parquet(parquet, rows)
        manifest = _manifest(parquet, rows, as_of=datetime.now(UTC))
        snapshot_id = str(manifest["snapshot_id"])
        release = output / "releases" / snapshot_id
        release.parent.mkdir(parents=True, exist_ok=True)
        (staging / "manifest.json").write_text(
            json.dumps(manifest, ensure_ascii=False, sort_keys=True, separators=(",", ":")),
            encoding="utf-8",
        )
        os.replace(staging, release)
        pointer = {"pointer_version": "1.0.0", "release": f"releases/{snapshot_id}"}
        (output / "current.json").write_text(
            json.dumps(pointer, ensure_ascii=False, sort_keys=True, separators=(",", ":")),
            encoding="utf-8",
        )
        return manifest
    finally:
        if staging.exists():
            for child in staging.iterdir():
                child.unlink()
            staging.rmdir()


def import_official_school_identity(output: Path = DEFAULT_OUTPUT) -> dict[str, object]:
    features = fetch_arcgis_features()
    rows = normalize_features(features)
    return publish_release(rows, output)


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Importa cadastro público SME/Data.Rio de escolas."
    )
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    args = parser.parse_args()
    manifest = import_official_school_identity(args.output)
    print(json.dumps(manifest, ensure_ascii=False, sort_keys=True))


if __name__ == "__main__":
    main()
