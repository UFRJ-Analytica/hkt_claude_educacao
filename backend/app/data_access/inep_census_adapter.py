"""Leitura da release do Censo Escolar do INEP.

Dado oficial e público, publicado por `scripts/import_inep_census.py`. A junção
com o cadastro do Data.Rio é pela designação SME de 7 dígitos que o INEP grava
no início de `NO_ENTIDADE` — chave exata, nunca similaridade de nome.

O que este adaptador entrega é REAL_PUBLIC e precisa continuar distinguível do
que é sintético em toda a pilha: por isso a data de referência do Censo viaja
junto com cada registro, e não só no envelope. Um número real de 2024 exibido
sem o ano vira um número sem régua.

A verificação segue o mesmo contrato da release de identidade: ponteiro
confinado à raiz governada, manifesto com sha256 por arquivo, e o parquet lido
para um arquivo temporário somente-leitura antes de tocar o DuckDB.
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

import duckdb

from app.data_access.school_identity_adapter import (
    _absolute_without_resolution,
    _confined_release,
    _private_parquet,
    _read_verified_bytes,
    _reject_link_components,
)

_ASSET = "inep_census.parquet"
_RELEASE_FILES = frozenset({"manifest.json", _ASSET})
_DEFAULT_ROOT = Path(__file__).parents[3] / "data" / "official" / "inep_census"

#: Colunas expostas ao produto. Todas são contagens agregadas por escola —
#: nenhuma linha de aluno, nenhum identificador de pessoa.
COUNT_FIELDS: tuple[str, ...] = (
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
FLAG_FIELDS: tuple[str, ...] = (
    "IN_INTERNET", "IN_INTERNET_ALUNOS", "IN_INTERNET_APRENDIZAGEM",
    "IN_BIBLIOTECA", "IN_SALA_LEITURA",
    "IN_QUADRA_ESPORTES", "IN_QUADRA_ESPORTES_COBERTA",
    "IN_LABORATORIO_INFORMATICA", "IN_LABORATORIO_CIENCIAS",
    "IN_REFEITORIO", "IN_ALIMENTACAO",
    "IN_BANHEIRO_PNE", "IN_ACESSIBILIDADE_RAMPAS", "IN_ACESSIBILIDADE_ELEVADOR",
    "IN_AGUA_POTAVEL", "IN_AGUA_REDE_PUBLICA",
    "IN_ESGOTO_REDE_PUBLICA", "IN_ENERGIA_REDE_PUBLICA", "IN_PATIO_COBERTO",
)


class CensusUnavailableError(RuntimeError):
    """A release do Censo não está publicada ou não passou na verificação."""


class InepCensusAdapter:
    """Acesso somente-leitura à release verificada do Censo Escolar."""

    def __init__(self, root: Path | None = None) -> None:
        self._root = _absolute_without_resolution(root or _DEFAULT_ROOT)
        self._rows: dict[str, dict[str, Any]] | None = None
        self._snapshot_id: str | None = None
        self._reference_year: int | None = None
        self._limitations: tuple[str, ...] = ()
        self._source_urls: tuple[str, ...] = ()

    # -- carga ---------------------------------------------------------------

    def _load(self) -> dict[str, dict[str, Any]]:
        if self._rows is not None:
            return self._rows

        pointer_path = self._root / "current.json"
        _reject_link_components(pointer_path)
        try:
            pointer = json.loads(pointer_path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError) as error:
            raise CensusUnavailableError("ponteiro da release do Censo indisponível") from error

        release, snapshot_id = _confined_release(self._root, pointer.get("release"))
        entries = list(release.iterdir())
        if {entry.name for entry in entries} != _RELEASE_FILES:
            raise CensusUnavailableError("release do Censo tem arquivos inesperados")

        manifest = json.loads((release / "manifest.json").read_text(encoding="utf-8"))
        if manifest.get("source_kind") != "REAL_PUBLIC":
            raise CensusUnavailableError("release do Censo não é REAL_PUBLIC")
        if manifest.get("snapshot_id") != snapshot_id:
            raise CensusUnavailableError("snapshot_id do Censo não confere com o ponteiro")

        descriptor = manifest.get("files", {}).get(_ASSET)
        if not isinstance(descriptor, dict):
            raise CensusUnavailableError("manifesto do Censo não descreve o parquet")
        content = _read_verified_bytes(release / _ASSET, str(descriptor.get("sha256")))

        year = manifest.get("reference_year")
        if not isinstance(year, int):
            raise CensusUnavailableError("release do Censo não declara ano de referência")

        selected = ("sme_designation", "inep_id", "inep_name", *COUNT_FIELDS, *FLAG_FIELDS)
        columns = ", ".join(selected)
        with _private_parquet(content) as parquet:
            path = str(parquet).replace("'", "''")
            with duckdb.connect(":memory:") as connection:
                fetched = connection.execute(
                    f"SELECT {columns} FROM read_parquet('{path}')"  # noqa: S608 - colunas fixas
                ).fetchall()
                names = [str(column[0]) for column in connection.description or []]

        rows = {
            str(record["sme_designation"]): record
            for record in (dict(zip(names, values, strict=True)) for values in fetched)
            if record.get("sme_designation")
        }
        self._rows = rows
        self._snapshot_id = snapshot_id
        self._reference_year = year
        self._limitations = tuple(manifest.get("limitations") or ())
        self._source_urls = tuple(manifest.get("source_urls") or ())
        return rows

    # -- consulta ------------------------------------------------------------

    def available(self) -> bool:
        try:
            self._load()
        except (CensusUnavailableError, ValueError, OSError):
            return False
        return True

    @property
    def snapshot_id(self) -> str:
        self._load()
        return self._snapshot_id or ""

    @property
    def reference_year(self) -> int:
        self._load()
        return self._reference_year or 0

    @property
    def limitations(self) -> tuple[str, ...]:
        self._load()
        return self._limitations

    @property
    def source_urls(self) -> tuple[str, ...]:
        self._load()
        return self._source_urls

    def get(self, sme_designation: str | None) -> dict[str, Any] | None:
        """Registro do Censo para uma designação, ou None quando não há ponte.

        `None` aqui carrega dois significados que o consumidor precisa separar:
        equipamento que não é escola no Censo (biblioteca, núcleo de arte, clube
        escolar) e escola que existe mas não constava no ano de referência. O
        primeiro é inaplicabilidade, o segundo é lacuna.
        """
        if not sme_designation:
            return None
        try:
            return self._load().get(sme_designation)
        except (CensusUnavailableError, ValueError, OSError):
            return None

    def coverage(self) -> int:
        try:
            return len(self._load())
        except (CensusUnavailableError, ValueError, OSError):
            return 0
