#!/usr/bin/env python3
"""Agrega a fila por unidade × grupamento × turno DIRETO no BigQuery e emite
`frontend/src/mocks/inscritos.generated.ts` — sem LIMIT e sem baixar uma linha
de criança sequer.

Por que um passo separado de build_unidades.py:
  - build_unidades.py lê um extrato `SELECT * ... LIMIT 1000` (amostra): as
    contagens por unidade ficam pequenas (média ~3 inscrições/unidade).
  - aqui o GROUP BY roda no BigQuery sobre a view inteira; o que chega ao
    disco (e ao Git) é só o agregado — coerente com a política do projeto de
    não versionar registro de criança, mesmo sintético.

Uso:
    python3 integracao-sme/build_inscritos.py            # requer `bq` autenticado

Proveniência:
  REAL (contagem sobre o extrato): inscritos, prioritarios, confirmados,
       porOpcao (só se a view tiver a coluna `opcao`).
  As linhas por criança continuam sintéticas no frontend (mocks/creche.ts).
"""

from __future__ import annotations

import json
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

HERE = Path(__file__).resolve().parent
OUT_TS = HERE.parent / "frontend" / "src" / "mocks" / "inscritos.generated.ts"
OUT_PROV = HERE / "out" / "PROVENANCE_inscritos.md"
PROJECT = "rio-sme"
DATASET = "sme_creche"
TABLE = f"{PROJECT}.{DATASET}.inscricoes_completa"

TIPO_META = "{ gerado: boolean; generated_at: string | null; source_id: string; query: string | null; ofertas: number; inscricoes: number; processo?: number | null; inscricoes_por_ano?: Record<string, number> }"

GRUPAMENTO_CANON = {
    "bercario": "Berçário",
    "berçário": "Berçário",
    "maternal i": "Maternal I",
    "maternal 1": "Maternal I",
    "maternal ii": "Maternal II",
    "maternal 2": "Maternal II",
}


def _rest_json(sql: str) -> list[dict]:
    """Sem `bq` instalado: usa a API REST com o token do `gcloud auth login`."""
    import urllib.request

    token = subprocess.run(["gcloud", "auth", "print-access-token"], capture_output=True, text=True, check=True).stdout.strip()
    body = {"query": sql, "useLegacySql": False, "maxResults": 100000, "timeoutMs": 180000}
    req = urllib.request.Request(
        f"https://bigquery.googleapis.com/bigquery/v2/projects/{PROJECT}/queries",
        data=json.dumps(body).encode(),
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=240) as r:
        d = json.load(r)
    if not d.get("jobComplete"):
        raise SystemExit("consulta não concluída no tempo limite (jobComplete=false)")
    names = [f["name"] for f in d["schema"]["fields"]]
    rows = [{n: c["v"] for n, c in zip(names, row["f"])} for row in d.get("rows", [])]
    return rows


def bq_json(sql: str) -> list[dict]:
    import shutil

    if shutil.which("bq") is None:
        return _rest_json(sql)
    proc = subprocess.run(
        ["bq", "query", "--use_legacy_sql=false", "--format=json", "--max_rows=100000", sql],
        capture_output=True,
        text=True,
        check=False,
    )
    if proc.returncode != 0:
        sys.stderr.write(proc.stderr)
        raise SystemExit(f"bq query falhou (exit {proc.returncode})")
    return json.loads(proc.stdout or "[]")


def colunas() -> set[str]:
    rows = bq_json(
        f"SELECT column_name FROM `{PROJECT}.{DATASET}.INFORMATION_SCHEMA.COLUMNS` "
        f"WHERE table_name = 'inscricoes_completa'"
    )
    return {r["column_name"] for r in rows}


def canon(g: str | None) -> str | None:
    if not g:
        return None
    return GRUPAMENTO_CANON.get(g.strip().lower())


def main() -> None:
    cols = colunas()
    tem_opcao = "opcao" in cols
    tem_confirmado = "confirmado" in cols
    tem_tipo = "tipo_inscricao" in cols
    extras = []
    if tem_opcao:
        extras += [f"COUNTIF(SAFE_CAST(opcao AS INT64) = {k}) AS opcao{k}" for k in range(1, 6)]
    sql = f"""
    SELECT
      unidade_codigo,
      grupamento,
      (horario_integral >= 0.5) AS integral,
      COUNT(*) AS inscritos,
      {"COUNTIF(tipo_inscricao = 'Prioridade')" if tem_tipo else "0"} AS prioritarios,
      {"COUNTIF(SAFE_CAST(confirmado AS INT64) = 1)" if tem_confirmado else "0"} AS confirmados
      {(", " + ", ".join(extras)) if extras else ""}
    FROM `{TABLE}`
    WHERE unidade_codigo IS NOT NULL AND grupamento IS NOT NULL
      AND ano = (SELECT MAX(ano) FROM `{TABLE}`)
    GROUP BY 1, 2, 3
    ORDER BY 1, 2, 3
    """
    anos = bq_json(f"SELECT ano, COUNT(*) AS n FROM `{TABLE}` GROUP BY ano ORDER BY ano")
    rows = bq_json(sql)
    fila: dict[str, dict] = {}
    total = 0
    for r in rows:
        g = canon(r.get("grupamento"))
        if g is None:
            continue
        integral = str(r.get("integral")).lower() == "true"
        chave = f"SME-{int(r['unidade_codigo'])}|{g}|{'Integral' if integral else 'Parcial'}"
        item = {
            "inscritos": int(r["inscritos"]),
            "prioritarios": int(r.get("prioritarios") or 0),
            "confirmados": int(r.get("confirmados") or 0),
        }
        if tem_opcao:
            item["porOpcao"] = [int(r.get(f"opcao{k}") or 0) for k in range(1, 6)]
        fila[chave] = item
        total += item["inscritos"]

    gerado_em = datetime.now(timezone.utc).isoformat(timespec="seconds")
    meta = {
        "gerado": True,
        "generated_at": gerado_em,
        "source_id": TABLE,
        "query": " ".join(sql.split()),
        "ofertas": len(fila),
        "inscricoes": total,
        "processo": max(int(a["ano"]) for a in anos) if anos else None,
        "inscricoes_por_ano": {str(a["ano"]): int(a["n"]) for a in anos},
    }
    ts = (
        "// GERADO por integracao-sme/build_inscritos.py — NÃO editar à mão.\n"
        f"// Processo (ano) mais recente: {meta['processo']} · inscrições por ano: {meta['inscricoes_por_ano']}\n"
        f"// Fonte: {TABLE} · agregado no BigQuery (GROUP BY unidade, grupamento, turno), sem LIMIT.\n"
        f"// Gerado em: {gerado_em} · ofertas: {len(fila)} · inscrições: {total}\n"
        "// REAL: inscritos, prioritarios, confirmados" + (", porOpcao" if tem_opcao else "") + ". Linhas por criança seguem sintéticas.\n"
        "import type { Grupamento, Horario } from '../api/types';\n\n"
        "export interface FilaOferta {\n  inscritos: number;\n  prioritarios: number;\n  confirmados: number;\n  porOpcao?: number[];\n}\n\n"
        f"export const INSCRITOS_META: {TIPO_META} = {json.dumps(meta, ensure_ascii=False, indent=2)};\n\n"
        f"export const FILA_POR_OFERTA: Record<string, FilaOferta> = {json.dumps(fila, ensure_ascii=False, indent=2)};\n\n"
        "export function chaveOferta(unidadeId: string, grupamento: Grupamento, horario: Horario): string {\n"
        "  return `${unidadeId}|${grupamento}|${horario}`;\n}\n"
    )
    OUT_TS.write_text(ts, encoding="utf-8")
    OUT_PROV.parent.mkdir(parents=True, exist_ok=True)
    OUT_PROV.write_text(
        "# Proveniência — inscritos.generated.ts\n\n"
        f"- Gerado em: {gerado_em}\n- Fonte: `{TABLE}`\n- Agregação: GROUP BY unidade_codigo, grupamento, turno (no BigQuery, sem LIMIT)\n"
        f"- Ofertas: {len(fila)} · inscrições contadas: {total} (processo {meta['processo']}; por ano: {meta['inscricoes_por_ano']})\n\n"
        "## Classificação\n- inscritos / prioritarios / confirmados"
        + (" / porOpcao" if tem_opcao else "")
        + ": **REAL** sobre o extrato (que é sintético, `_synthetic=true`).\n"
        "- Nenhuma linha de criança é baixada nem versionada.\n",
        encoding="utf-8",
    )
    print(f"ok: {len(fila)} ofertas, {total} inscrições → {OUT_TS}")


if __name__ == "__main__":
    main()
