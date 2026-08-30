"""Ponte INEP: designacao SME -> CO_ENTIDADE, com o Censo Escolar real.

A release do Data.Rio nao traz codigo INEP (`inep_id` vem nulo nos 1.588
registros), e por isso o projeto tratava todo indicador como sintetico.

A ponte existe e e EXATA, nao aproximada: o INEP grava o nome da escola
municipal do Rio como `<designacao de 7 digitos> <nome>` -- por exemplo
`0102002 EM TIRADENTES`. A designacao e a mesma chave que o Data.Rio publica em
`sme_designation`. Basta ler o prefixo.

Isso NAO e match por nome. E juncao por chave, e a diferenca importa: o projeto
proibe match fuzzy porque ele erra silenciosamente (medimos 0 de 1.519 acertos
por similaridade textual). Aqui a chave ou casa ou nao casa, e a cobertura e
medida e publicada por tipo de unidade.

Cobertura medida no Censo 2024: 1.546 de 1.588 (97,4%). CIEP, Escola Especial,
CEJA e Civico-Militar em 100%; Escola Municipal 99,0%; EDI 99,3%; Creche 99,6%.
Os 0% sao biblioteca, nucleo de arte, clube escolar, CDEI e polo -- que nao sao
escolas no Censo, entao a ausencia ali e inaplicabilidade, nao lacuna.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import io
import json
import os
import re
import tempfile
import urllib.request
import zipfile
from datetime import UTC, datetime
from pathlib import Path
from typing import Any

import duckdb

from app.data_access.school_identity_adapter import identity_manifest_content_id

CENSUS_URL = "https://download.inep.gov.br/dados_abertos/microdados_censo_escolar_{year}.zip"
DEFAULT_YEAR = 2024
RIO_MUNICIPALITY = "3304557"
DEPENDENCY_MUNICIPAL = "3"
STATUS_ACTIVE = "1"

DEFAULT_OUTPUT = Path(__file__).parents[2] / "data" / "official" / "inep_census"

#: Prefixo de 7 digitos no `NO_ENTIDADE` -- a chave da ponte.
_DESIGNATION = re.compile(r"^(\d{7})\s+(.*)$")

#: Colunas do Censo que o produto consome. Tudo aqui e contagem agregada por
#: escola: nenhuma linha de aluno, nenhum identificador de pessoa.
_COUNTS = (
    "QT_MAT_BAS", "QT_MAT_INF", "QT_MAT_INF_CRE", "QT_MAT_INF_PRE",
    "QT_MAT_FUND", "QT_MAT_FUND_AI", "QT_MAT_FUND_AF", "QT_MAT_EJA", "QT_MAT_ESP",
    "QT_MAT_FUND_AI_1", "QT_MAT_FUND_AI_2", "QT_MAT_FUND_AI_3",
    "QT_MAT_FUND_AI_4", "QT_MAT_FUND_AI_5",
    "QT_MAT_FUND_AF_6", "QT_MAT_FUND_AF_7", "QT_MAT_FUND_AF_8", "QT_MAT_FUND_AF_9",
    "QT_TUR_BAS", "QT_TUR_INF", "QT_TUR_FUND", "QT_TUR_FUND_AI", "QT_TUR_FUND_AF",
    "QT_DOC_BAS", "QT_DOC_INF", "QT_DOC_FUND", "QT_DOC_FUND_AI", "QT_DOC_FUND_AF",
    "QT_SALAS_UTILIZADAS", "QT_SALAS_UTILIZA_CLIMATIZADAS", "QT_SALAS_UTILIZADAS_ACESSIVEIS",
    "QT_DESKTOP_ALUNO", "QT_COMP_PORTATIL_ALUNO", "QT_TABLET_ALUNO",
)
_FLAGS = (
    "IN_INTERNET", "IN_INTERNET_ALUNOS", "IN_INTERNET_APRENDIZAGEM",
    "IN_BIBLIOTECA", "IN_SALA_LEITURA",
    "IN_QUADRA_ESPORTES", "IN_QUADRA_ESPORTES_COBERTA",
    "IN_LABORATORIO_INFORMATICA", "IN_LABORATORIO_CIENCIAS",
    "IN_REFEITORIO", "IN_ALIMENTACAO",
    "IN_BANHEIRO_PNE", "IN_ACESSIBILIDADE_RAMPAS", "IN_ACESSIBILIDADE_ELEVADOR",
    "IN_AGUA_POTAVEL", "IN_AGUA_REDE_PUBLICA",
    "IN_ESGOTO_REDE_PUBLICA", "IN_ENERGIA_REDE_PUBLICA", "IN_PATIO_COBERTO",
)

SCHEMA: tuple[tuple[str, str], ...] = (
    ("school_id", "VARCHAR"),
    ("sme_designation", "VARCHAR"),
    ("inep_id", "VARCHAR"),
    ("inep_name", "VARCHAR"),
    ("census_year", "INTEGER"),
    *((name, "INTEGER") for name in _COUNTS),
    *((name, "BOOLEAN") for name in _FLAGS),
)

_LIMITATIONS = [
    "Censo Escolar do INEP, microdados publicos da educacao basica, escolas "
    "municipais do Rio de Janeiro (CO_MUNICIPIO 3304557) em atividade.",
    "A ponte com o cadastro do Data.Rio e feita pela designacao SME de 7 digitos "
    "que o INEP grava no inicio de NO_ENTIDADE. E juncao por chave exata; "
    "nenhum match por similaridade de nome foi aplicado.",
    "Biblioteca escolar, nucleo de arte, clube escolar, CDEI e polo de educacao "
    "pelo trabalho nao constam no Censo como escola. Para essas unidades o dado "
    "nao se aplica, e isso e diferente de dado ausente.",
    "Matricula, turma e docente sao contagens do Censo na data de referencia do "
    "ano informado -- retrato anual, nao serie corrente.",
    "Todos os campos sao contagens agregadas por escola. Nenhum registro de "
    "aluno ou identificador de pessoa e lido, armazenado ou publicado.",
]


def download_census(year: int, cache: Path) -> Path:
    cache.mkdir(parents=True, exist_ok=True)
    target = cache / f"censo_{year}.zip"
    if target.exists() and target.stat().st_size > 1_000_000:
        return target
    url = CENSUS_URL.format(year=year)
    request = urllib.request.Request(url, headers={"User-Agent": "claude-educacao-backend/1.0"})
    with urllib.request.urlopen(request, timeout=900) as response, target.open("wb") as handle:
        while chunk := response.read(1 << 20):
            handle.write(chunk)
    return target


def _member(archive: zipfile.ZipFile) -> str:
    for name in archive.namelist():
        if name.endswith(".csv") and "ed_basica" in name:
            return name
    raise ValueError("microdados do Censo nao contem o CSV de educacao basica")


def read_rio_schools(zip_path: Path, year: int) -> list[dict[str, str]]:
    """Escolas municipais do Rio em atividade, com as colunas que consumimos."""
    wanted = {"CO_ENTIDADE", "NO_ENTIDADE", *_COUNTS, *_FLAGS}
    out: list[dict[str, str]] = []
    with zipfile.ZipFile(zip_path) as archive, archive.open(_member(archive)) as handle:
        reader = csv.DictReader(
            io.TextIOWrapper(handle, encoding="latin-1", newline=""), delimiter=";"
        )
        for record in reader:
            if (
                record.get("CO_MUNICIPIO") != RIO_MUNICIPALITY
                or record.get("TP_DEPENDENCIA") != DEPENDENCY_MUNICIPAL
                or record.get("TP_SITUACAO_FUNCIONAMENTO") != STATUS_ACTIVE
            ):
                continue
            out.append({k: v for k, v in record.items() if k in wanted})
    if not out:
        raise ValueError(f"Censo {year} nao produziu escolas municipais do Rio")
    return out


def _count(value: str | None) -> int | None:
    if value is None or value.strip() == "":
        return None
    try:
        return int(float(value))
    except ValueError:
        return None


def _flag(value: str | None) -> bool | None:
    parsed = _count(value)
    return None if parsed is None else bool(parsed)


def normalize(records: list[dict[str, str]], year: int) -> list[tuple[object, ...]]:
    """Uma linha por escola com designacao legivel. Sem designacao, sem ponte."""
    rows: list[tuple[object, ...]] = []
    seen: set[str] = set()
    for record in records:
        matched = _DESIGNATION.match((record.get("NO_ENTIDADE") or "").strip())
        if matched is None:
            continue
        designation = matched.group(1)
        if designation in seen:
            continue
        seen.add(designation)
        rows.append(
            (
                f"SME-RIO-{designation}",
                designation,
                (record.get("CO_ENTIDADE") or "").strip() or None,
                matched.group(2).strip() or None,
                year,
                *(_count(record.get(name)) for name in _COUNTS),
                *(_flag(record.get(name)) for name in _FLAGS),
            )
        )
    if not rows:
        raise ValueError("nenhuma escola do Censo trouxe designacao SME no nome")
    return sorted(rows, key=lambda row: str(row[1]))


def _write_parquet(path: Path, rows: list[tuple[object, ...]]) -> None:
    columns = ", ".join(f"{name} {data_type}" for name, data_type in SCHEMA)
    placeholders = ", ".join("?" for _ in SCHEMA)
    output = str(path).replace("'", "''")
    with duckdb.connect(":memory:") as connection:
        connection.execute(f"CREATE TABLE inep_census ({columns})")
        connection.executemany(f"INSERT INTO inep_census VALUES ({placeholders})", rows)
        connection.execute(
            f"COPY (SELECT * FROM inep_census ORDER BY sme_designation) "
            f"TO '{output}' (FORMAT PARQUET)"
        )


def _manifest(
    parquet: Path, rows: list[tuple[object, ...]], *, year: int, as_of: datetime
) -> dict[str, Any]:
    manifest: dict[str, Any] = {
        "manifest_version": "1.0.0",
        "source_id": "inep_school_census",
        "source_kind": "REAL_PUBLIC",
        "as_of": as_of.isoformat().replace("+00:00", "Z"),
        "reference_year": year,
        "limitations": _LIMITATIONS,
        "files": {
            "inep_census.parquet": {
                "sha256": hashlib.sha256(parquet.read_bytes()).hexdigest(),
                "row_count": len(rows),
                "schema": [{"name": n, "type": t} for n, t in SCHEMA],
                "source_kind": "REAL_PUBLIC",
            }
        },
        "source_urls": [CENSUS_URL.format(year=year)],
        "license": "Dados abertos do INEP, uso publico com citacao da fonte",
    }
    manifest["snapshot_id"] = identity_manifest_content_id(manifest)
    return manifest


def publish_release(
    rows: list[tuple[object, ...]], *, year: int, output: Path = DEFAULT_OUTPUT
) -> dict[str, Any]:
    output.mkdir(parents=True, exist_ok=True)
    staging = Path(tempfile.mkdtemp(prefix="inep-census-", dir=output))
    try:
        parquet = staging / "inep_census.parquet"
        _write_parquet(parquet, rows)
        manifest = _manifest(parquet, rows, year=year, as_of=datetime.now(UTC))
        snapshot_id = str(manifest["snapshot_id"])
        release = output / "releases" / snapshot_id
        release.parent.mkdir(parents=True, exist_ok=True)
        (staging / "manifest.json").write_text(
            json.dumps(manifest, ensure_ascii=False, sort_keys=True, separators=(",", ":")),
            encoding="utf-8",
        )
        os.replace(staging, release)
        (output / "current.json").write_text(
            json.dumps(
                {"pointer_version": "1.0.0", "release": f"releases/{snapshot_id}"},
                ensure_ascii=False, sort_keys=True, separators=(",", ":"),
            ),
            encoding="utf-8",
        )
        return manifest
    finally:
        if staging.exists():
            for child in staging.iterdir():
                child.unlink()
            staging.rmdir()


def import_inep_census(
    *, year: int = DEFAULT_YEAR, cache: Path | None = None, output: Path = DEFAULT_OUTPUT
) -> dict[str, Any]:
    cache_dir = cache or (Path(tempfile.gettempdir()) / "pulso-inep-cache")
    archive = download_census(year, cache_dir)
    records = read_rio_schools(archive, year)
    return publish_release(normalize(records, year), year=year, output=output)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--year", type=int, default=DEFAULT_YEAR)
    parser.add_argument("--cache", type=Path, default=None)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    args = parser.parse_args()
    manifest = import_inep_census(year=args.year, cache=args.cache, output=args.output)
    files = manifest["files"]["inep_census.parquet"]
    print(f"release {manifest['snapshot_id']}")
    print(f"  ano de referencia : {manifest['reference_year']}")
    print(f"  escolas com ponte : {files['row_count']}")


if __name__ == "__main__":
    main()
