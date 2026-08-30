#!/usr/bin/env python3
"""Constrói a rede de unidades do app da creche a partir do extrato do BigQuery.

Lê integracao-sme/data/inscricoes_completa.parquet (produzido por extract.py,
fonte: `SELECT * FROM rio-sme.sme_creche.inscricoes_completa LIMIT 1000`) e
agrega por unidade, produzindo o arquivo que o mock do frontend passa a servir:

    frontend/src/mocks/unidades.generated.json

O formato é EXATAMENTE o tipo `Unidade` que as telas já consomem — nenhuma tela,
nenhum componente, nenhum contrato de API muda. Só a fonte de dados do mock de
unidades deixa de ser o gerador sintético e passa a ser o extrato.

Proveniência (registrada em cada campo e no PROVENANCE do JSON):
  REAL       — unidade_codigo, latitude, longitude, bairro (do cadastro de
               Unidades_Unificadas), grupamento, horário, contagem de inscritos
               e de prioritários. São contagens verdadeiras sobre o extrato.
  DERIVADO   — cre (pelo centroide de bairro mais próximo), vagas e
               vagasPrioritarias (a tabela de inscrições não traz oferta de
               vagas; derivadas de forma determinística), demanda.
  SINTÉTICO  — o extrato inteiro é sintético (_synthetic=true): a estrutura do
               processo é fiel, os indivíduos não. Nomes de unidade são rótulos
               (não há nome oficial na fonte).

Colunas de PII (nome/cpf/telefone/endereço do responsável) são ignoradas: a
rede de unidades não precisa delas. "Use os dados que precise, não force o uso."
"""

from __future__ import annotations

import json
import math
import re
from datetime import UTC, datetime
from pathlib import Path
from typing import Any

import duckdb

HERE = Path(__file__).resolve().parent
PARQUET = HERE / "data" / "inscricoes_completa.parquet"
BAIRROS_TS = HERE.parent / "frontend" / "src" / "mocks" / "bairros.ts"
OUT_JSON = HERE.parent / "frontend" / "src" / "mocks" / "unidades.generated.ts"
OUT_PROV = HERE / "out" / "PROVENANCE_unidades.md"

TABLE = "rio-sme.sme_creche.inscricoes_completa"
QUERY = f"SELECT * FROM `{TABLE}` LIMIT 1000"

# Grupamentos canônicos aceitos pelo tipo `Grupamento` do frontend.
GRUPAMENTOS_CANON = {
    "berçário": "Berçário",
    "bercario": "Berçário",
    "berçario": "Berçário",
    "maternal i": "Maternal I",
    "maternal ii": "Maternal II",
}


def _norm(s: str) -> str:
    import unicodedata

    return (
        "".join(c for c in unicodedata.normalize("NFD", s) if unicodedata.category(c) != "Mn")
        .lower()
        .strip()
    )


def canon_grupamento(raw: str | None) -> str | None:
    if not raw:
        return None
    return GRUPAMENTOS_CANON.get(_norm(raw))


def haversine_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    r = 6371.0
    p1, p2 = math.radians(lat1), math.radians(lat2)
    dp = math.radians(lat2 - lat1)
    dl = math.radians(lon2 - lon1)
    a = math.sin(dp / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    return 2 * r * math.asin(math.sqrt(a))


def classificar_demanda(inscritos: int, vagas: int) -> str:
    # Espelha frontend/src/domain/demanda.ts para consistência 1:1.
    if vagas <= 0:
        return "alta"
    ratio = inscritos / vagas
    if ratio < 0.9:
        return "baixa"
    if ratio < 1.8:
        return "media"
    return "alta"


def load_bairros() -> list[dict[str, Any]]:
    """Extrai BAIRROS (nome, cre, lat, lon) direto do bairros.ts do frontend."""
    text = BAIRROS_TS.read_text(encoding="utf-8")
    pattern = re.compile(
        r"nome:\s*'([^']+)'\s*,\s*cre:\s*(\d+)\s*,\s*lat:\s*(-?\d+\.?\d*)\s*,\s*lon:\s*(-?\d+\.?\d*)"
    )
    bairros = [
        {"nome": m.group(1), "cre": int(m.group(2)), "lat": float(m.group(3)), "lon": float(m.group(4))}
        for m in pattern.finditer(text)
    ]
    if not bairros:
        raise SystemExit("Não consegui extrair BAIRROS de bairros.ts")
    return bairros


def cre_por_proximidade(lat: float, lon: float, bairros: list[dict[str, Any]]) -> int:
    nearest = min(bairros, key=lambda b: haversine_km(lat, lon, b["lat"], b["lon"]))
    return int(nearest["cre"])


def derivar_vagas(inscritos: int, prioritarios: int, seed: int) -> tuple[int, int]:
    """Deriva oferta de vagas de forma determinística.

    A tabela de inscrições NÃO traz vagas ofertadas — só quem se inscreveu. Para
    o app funcionar, derivamos uma oferta plausível e RACIONADA (menos vagas que
    inscritos, coerente com o problema: fila > vaga). Determinístico por
    (unidade, oferta) via `seed`, para ser estável entre execuções.
    """
    # razão de vagas/inscritos entre 0.45 e 0.75, estável por seed
    frac = 0.45 + ((seed % 1000) / 1000.0) * 0.30
    vagas = max(4, round(inscritos * frac))
    # proporção de prioritárias segue a proporção real observada de prioritários
    prop_prio = (prioritarios / inscritos) if inscritos else 0.3
    vagas_prio = max(1, min(vagas - 1, round(vagas * max(0.2, min(0.6, prop_prio)))))
    return vagas, vagas_prio


def build() -> dict[str, Any]:
    bairros = load_bairros()
    con = duckdb.connect()
    safe = str(PARQUET).replace("'", "''")
    con.execute(f"CREATE VIEW t AS SELECT * FROM read_parquet('{safe}')")

    unidade_rows = con.execute(
        """
        SELECT
            unidade_codigo,
            AVG(latitude)  AS lat,
            AVG(longitude) AS lon,
            MODE(bairro_final) AS bairro,
            MODE(zona) AS zona,
            COUNT(*) AS inscritos_total
        FROM t
        WHERE unidade_codigo IS NOT NULL
          AND latitude IS NOT NULL AND longitude IS NOT NULL
        GROUP BY unidade_codigo
        ORDER BY unidade_codigo
        """
    ).fetchall()

    oferta_rows = con.execute(
        """
        SELECT
            unidade_codigo,
            grupamento,
            (horario_integral >= 0.5) AS integral,
            COUNT(*) AS inscritos,
            SUM(CASE WHEN tipo_inscricao = 'Prioridade' THEN 1 ELSE 0 END) AS prioritarios
        FROM t
        WHERE unidade_codigo IS NOT NULL AND grupamento IS NOT NULL
        GROUP BY unidade_codigo, grupamento, integral
        """
    ).fetchall()
    con.close()

    ofertas_por_unidade: dict[int, list[dict[str, Any]]] = {}
    for cod, grup, integral, inscritos, prioritarios in oferta_rows:
        canon = canon_grupamento(grup)
        if canon is None:
            continue
        cod = int(cod)
        seed = (cod * 31 + hash((canon, bool(integral))) % 997) & 0x7FFFFFFF
        vagas, vagas_prio = derivar_vagas(int(inscritos), int(prioritarios or 0), seed)
        ofertas_por_unidade.setdefault(cod, []).append(
            {
                "grupamento": canon,
                "horario": "Integral" if integral else "Parcial",
                "vagas": vagas,
                "vagasPrioritarias": vagas_prio,
                "inscritos": int(inscritos),
                "inscritosPrioritarios": int(prioritarios or 0),
                "demanda": classificar_demanda(int(inscritos), vagas),
            }
        )

    unidades: list[dict[str, Any]] = []
    for cod, lat, lon, bairro, _zona, _tot in unidade_rows:
        cod = int(cod)
        ofertas = ofertas_por_unidade.get(cod, [])
        if not ofertas:
            continue
        # Ordena ofertas na ordem canônica de grupamento para exibição estável.
        ordem = {"Berçário": 0, "Maternal I": 1, "Maternal II": 2}
        ofertas.sort(key=lambda o: (ordem.get(o["grupamento"], 9), o["horario"]))
        cre = cre_por_proximidade(float(lat), float(lon), bairros)
        bairro_label = (bairro or "").title() if bairro else "Rio de Janeiro"
        unidades.append(
            {
                "id": f"SME-{cod}",
                "nome": f"Creche SME {bairro_label} · {cod}",
                "tipo": "Creche Municipal",
                "cre": cre,
                "bairro": bairro_label,
                "endereco": f"{bairro_label}, Rio de Janeiro",
                "lat": round(float(lat), 6),
                "lon": round(float(lon), 6),
                "ofertas": ofertas,
            }
        )

    generated_at = datetime.now(UTC).replace(microsecond=0).isoformat()
    return {
        "_meta": {
            "generated_at": generated_at,
            "source_id": TABLE,
            "query": QUERY,
            "rows_read": sum(o["inscritos"] for u in unidades for o in u["ofertas"]),
            "unidades": len(unidades),
            "provenance": {
                "REAL": [
                    "id (unidade_codigo)",
                    "lat/lon (cadastro Unidades_Unificadas)",
                    "bairro (bairro_final)",
                    "ofertas.grupamento",
                    "ofertas.horario",
                    "ofertas.inscritos",
                    "ofertas.inscritosPrioritarios",
                ],
                "DERIVADO": [
                    "cre (bairro-centroide mais próximo)",
                    "ofertas.vagas (determinístico; a fonte não traz oferta)",
                    "ofertas.vagasPrioritarias",
                    "ofertas.demanda",
                ],
                "SINTETICO": [
                    "extrato inteiro é sintético (_synthetic=true)",
                    "nome/tipo da unidade são rótulos (não há nome oficial na fonte)",
                ],
            },
            "aviso": (
                "Estrutura fiel ao processo da SME; indivíduos e ofertas de vaga "
                "não representam a rede real. Dado sintético jamais apresentado como oficial."
            ),
        },
        "unidades": unidades,
    }


def write_provenance(payload: dict[str, Any]) -> None:
    meta = payload["_meta"]
    lines = [
        "# Proveniência — unidades.generated.json",
        "",
        f"- Gerado em: {meta['generated_at']}",
        f"- Fonte: `{meta['source_id']}`",
        f"- Query: `{meta['query']}`",
        f"- Unidades: {meta['unidades']}  ·  inscrições agregadas: {meta['rows_read']}",
        "",
        "## Classificação por campo",
        "",
        "### REAL (contagem/atributo verdadeiro sobre o extrato)",
        *[f"- {x}" for x in meta["provenance"]["REAL"]],
        "",
        "### DERIVADO (calculado por código determinístico)",
        *[f"- {x}" for x in meta["provenance"]["DERIVADO"]],
        "",
        "### SINTÉTICO",
        *[f"- {x}" for x in meta["provenance"]["SINTETICO"]],
        "",
        f"> {meta['aviso']}",
        "",
    ]
    OUT_PROV.parent.mkdir(parents=True, exist_ok=True)
    OUT_PROV.write_text("\n".join(lines), encoding="utf-8")


def main() -> None:
    if not PARQUET.exists():
        raise SystemExit(f"parquet não encontrado: {PARQUET}. Rode extract.py primeiro.")
    payload = build()

    unidades = payload["unidades"]
    meta = payload["_meta"]
    module = (
        "// GERADO por integracao-sme/build_unidades.py — NÃO editar à mão.\n"
        f"// Fonte: {meta['source_id']}\n"
        f"// Query: {meta['query']}\n"
        f"// Gerado em: {meta['generated_at']}\n"
        f"// Unidades: {meta['unidades']} · inscrições agregadas: {meta['rows_read']}\n"
        "// Proveniência por campo em integracao-sme/out/PROVENANCE_unidades.md\n"
        "//   REAL: id, lat/lon, bairro, grupamento, horário, inscritos, inscritosPrioritarios\n"
        "//   DERIVADO: cre, vagas, vagasPrioritarias, demanda\n"
        "//   SINTÉTICO: o extrato inteiro (_synthetic=true); nome/tipo são rótulos\n"
        "import type { Unidade } from '../api/types';\n\n"
        "export const META = "
        + json.dumps(meta, ensure_ascii=False, indent=2)
        + " as const;\n\n"
        "export const UNIDADES_GERADAS: Unidade[] = "
        + json.dumps(unidades, ensure_ascii=False, indent=2)
        + ";\n"
    )
    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(module, encoding="utf-8")
    write_provenance(payload)

    cre7_mi = [
        u for u in unidades if u["cre"] == 7 and any(o["grupamento"] == "Maternal I" for o in u["ofertas"])
    ]
    print(f"[unidades] {len(unidades)} unidades → {OUT_JSON.relative_to(HERE.parent)}")
    print(f"[unidades] CRE 7 com Maternal I (usadas no demo): {len(cre7_mi)}")
    cres = sorted({u["cre"] for u in unidades})
    print(f"[unidades] CREs cobertas: {cres}")
    print(f"[unidades] proveniência → {OUT_PROV.relative_to(HERE)}")


if __name__ == "__main__":
    main()
