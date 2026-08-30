#!/usr/bin/env python3
"""Risco de não-alocação por unidade, via modelo BQML no BigQuery.

Roda ML.PREDICT com o modelo `rio-sme.sme_creche.modelo_risco_alocacao_xgb`
(BOOSTED_TREE_CLASSIFIER / XGBoost; label = confirmado) sobre TODA a view
`inscricoes_completa`, agrega por unidade e emite o módulo que o app consome:

    frontend/src/mocks/risco.generated.ts

Definições (código determinístico, nunca LLM):
  risco  = 1 − média(P(confirmado=1)) das inscrições da unidade
  nível  = 'alto' se risco ≥ 0.50, senão 'baixo'
           (0.50 = mais provável NÃO alocar do que alocar; sem faixa média
           porque o aviso pedido é binário)
  piso   = unidades com < 5 inscrições ficam FORA (ausência de dado não é
           zero; média sobre 1–4 inscrições não sustenta leitura)

Proveniência: o modelo foi treinado sobre o extrato SINTÉTICO (_synthetic=true)
— todo risco aqui é DERIVADO DE SINTÉTICO (métricas de treino: AUC 0.741,
acurácia 0.678). Serve para demonstrar o mecanismo, nunca como estatística
operacional da SME.
"""

from __future__ import annotations

import csv
import io
import json
import subprocess
import sys
from datetime import UTC, datetime
from pathlib import Path

HERE = Path(__file__).resolve().parent
OUT_TS = HERE.parent / "frontend" / "src" / "mocks" / "risco.generated.ts"
OUT_PROV = HERE / "out" / "PROVENANCE_risco.md"

MODEL = "rio-sme.sme_creche.modelo_risco_alocacao_xgb"
SOURCE = "rio-sme.sme_creche.inscricoes_completa"
MIN_INSCRICOES = 5
CORTE_ALTO = 0.50

SQL = f"""
WITH pred AS (
  SELECT
    unidade_codigo,
    (SELECT p.prob FROM UNNEST(predicted_confirmado_probs) p WHERE p.label = 1) AS prob_aloc
  FROM ML.PREDICT(
    MODEL `{MODEL}`,
    (SELECT * FROM `{SOURCE}` WHERE unidade_codigo IS NOT NULL)
  )
)
SELECT
  unidade_codigo,
  COUNT(*) AS n_inscricoes,
  ROUND(1 - AVG(prob_aloc), 4) AS risco
FROM pred
GROUP BY unidade_codigo
HAVING COUNT(*) >= {MIN_INSCRICOES}
ORDER BY unidade_codigo
"""


def run_predict() -> list[dict[str, str]]:
    proc = subprocess.run(
        ["bq", "query", "--use_legacy_sql=false", "--format=csv", "--max_rows=20000", SQL],
        capture_output=True,
        text=True,
        check=False,
    )
    if proc.returncode != 0:
        sys.stderr.write(proc.stderr)
        raise SystemExit(f"bq query falhou (exit {proc.returncode})")
    return list(csv.DictReader(io.StringIO(proc.stdout)))


def main() -> None:
    rows = run_predict()
    if not rows:
        raise SystemExit("ML.PREDICT não retornou linhas — verifique o modelo e a view.")

    riscos: dict[str, dict[str, object]] = {}
    n_alto = 0
    for r in rows:
        risco = float(r["risco"])
        nivel = "alto" if risco >= CORTE_ALTO else "baixo"
        n_alto += nivel == "alto"
        riscos[f"SME-{r['unidade_codigo']}"] = {
            "risco": risco,
            "nivel": nivel,
            "inscricoes": int(r["n_inscricoes"]),
        }

    generated_at = datetime.now(UTC).replace(microsecond=0).isoformat()
    meta = {
        "generated_at": generated_at,
        "model": MODEL,
        "model_type": "BOOSTED_TREE_CLASSIFIER (XGBoost) · label: confirmado",
        "source": SOURCE,
        "unidades": len(riscos),
        "corte_alto": CORTE_ALTO,
        "min_inscricoes": MIN_INSCRICOES,
        "treino_metricas": {"rocAuc": 0.7411, "accuracy": 0.6781, "f1": 0.7218},
        "derivado_de_sintetico": True,
        "aviso": (
            "Risco DERIVADO DE dados SINTÉTICOS via modelo XGBoost demonstrativo; "
            "não é estatística oficial da SME."
        ),
    }

    module = (
        "// GERADO por integracao-sme/build_risco.py — NÃO editar à mão.\n"
        f"// Modelo: {MODEL} (ML.PREDICT via bq CLI)\n"
        f"// Fonte: {SOURCE} · gerado em {generated_at}\n"
        f"// risco = 1 - média P(confirmado) por unidade · alto se >= {CORTE_ALTO} · piso {MIN_INSCRICOES} inscrições\n"
        "// DERIVADO DE SINTÉTICO — nunca apresentar como estatística oficial.\n\n"
        "export type NivelRisco = 'alto' | 'baixo';\n\n"
        "export interface RiscoUnidade {\n"
        "  /** 1 − média de P(alocação) prevista pelo modelo para a unidade. */\n"
        "  risco: number;\n"
        "  nivel: NivelRisco;\n"
        "  /** Inscrições que sustentam a média. */\n"
        "  inscricoes: number;\n"
        "}\n\n"
        "export const RISCO_META = " + json.dumps(meta, ensure_ascii=False, indent=2) + " as const;\n\n"
        "export const RISCO_POR_UNIDADE: Record<string, RiscoUnidade> = "
        + json.dumps(riscos, ensure_ascii=False, indent=2)
        + ";\n"
    )
    OUT_TS.write_text(module, encoding="utf-8")

    OUT_PROV.parent.mkdir(parents=True, exist_ok=True)
    OUT_PROV.write_text(
        "\n".join(
            [
                "# Proveniência — risco.generated.ts",
                "",
                f"- Gerado em: {generated_at}",
                f"- Modelo: `{MODEL}` (BOOSTED_TREE_CLASSIFIER/XGBoost, label `confirmado`)",
                f"- Consulta: ML.PREDICT sobre `{SOURCE}` (todas as inscrições com unidade)",
                f"- Unidades com risco: {len(riscos)} (piso de {MIN_INSCRICOES} inscrições)",
                f"- Nível alto (risco ≥ {CORTE_ALTO}): {n_alto} unidades · baixo: {len(riscos) - n_alto}",
                "- Métricas de treino: AUC 0.7411 · acurácia 0.6781 · F1 0.7218",
                "",
                "## Classificação",
                "- risco/nível: **DERIVADO DE SINTÉTICO** — modelo treinado sobre o extrato",
                "  anonimizado/sintético (`_synthetic=true`); demonstra o mecanismo, não a realidade.",
                "- contagem de inscrições por unidade: REAL sobre o extrato.",
                "",
                f"> {meta['aviso']}",
                "",
            ]
        ),
        encoding="utf-8",
    )

    print(f"[risco] {len(riscos)} unidades → {OUT_TS.relative_to(HERE.parent)}")
    print(f"[risco] alto: {n_alto} · baixo: {len(riscos) - n_alto} (corte {CORTE_ALTO})")
    print(f"[risco] proveniência → {OUT_PROV.relative_to(HERE)}")


if __name__ == "__main__":
    main()
