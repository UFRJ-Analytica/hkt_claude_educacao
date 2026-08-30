// GERADO por integracao-sme/build_inscritos.py — NÃO editar à mão.
// Processo (ano) mais recente: 2025 · inscrições por ano: {'2021': 10575, '2022': 9213, '2023': 7227, '2024': 12206, '2025': 10650}
// Fonte: rio-sme.sme_creche.inscricoes_completa · agregado no BigQuery (GROUP BY unidade, grupamento, turno), sem LIMIT.
// Gerado em: 2026-08-30T18:57:57+00:00 · ofertas: 2048 · inscrições: 10650
// REAL: inscritos, prioritarios, confirmados. Linhas por criança seguem sintéticas.
import type { Grupamento, Horario } from '../api/types';

export interface FilaOferta {
  inscritos: number;
  prioritarios: number;
  confirmados: number;
  porOpcao?: number[];
}

export const INSCRITOS_META: { gerado: boolean; generated_at: string | null; source_id: string; query: string | null; ofertas: number; inscricoes: number; processo?: number | null; inscricoes_por_ano?: Record<string, number> } = {
  "gerado": true,
  "generated_at": "2026-08-30T18:57:57+00:00",
  "source_id": "rio-sme.sme_creche.inscricoes_completa",
  "query": "SELECT unidade_codigo, grupamento, (horario_integral >= 0.5) AS integral, COUNT(*) AS inscritos, COUNTIF(tipo_inscricao = 'Prioridade') AS prioritarios, COUNTIF(SAFE_CAST(confirmado AS INT64) = 1) AS confirmados FROM `rio-sme.sme_creche.inscricoes_completa` WHERE unidade_codigo IS NOT NULL AND grupamento IS NOT NULL AND ano = (SELECT MAX(ano) FROM `rio-sme.sme_creche.inscricoes_completa`) GROUP BY 1, 2, 3 ORDER BY 1, 2, 3",
  "ofertas": 2048,
  "inscricoes": 10650,
  "processo": 2025,
  "inscricoes_por_ano": {
    "2021": 10575,
    "2022": 9213,
    "2023": 7227,
    "2024": 12206,
    "2025": 10650
  }
};

export const FILA_POR_OFERTA: Record<string, FilaOferta> = {
  "SME-1004|Maternal I|Integral": {
    "inscritos": 13,
    "prioritarios": 3,
    "confirmados": 8
  },
  "SME-1004|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-1005|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-1006|Berçário|Integral": {
    "inscritos": 12,
    "prioritarios": 2,
    "confirmados": 9
  },
  "SME-1006|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-1007|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-1007|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-1009|Berçário|Integral": {
    "inscritos": 8,
    "prioritarios": 1,
    "confirmados": 8
  },
  "SME-1009|Maternal I|Integral": {
    "inscritos": 11,
    "prioritarios": 4,
    "confirmados": 9
  },
  "SME-1010|Berçário|Integral": {
    "inscritos": 26,
    "prioritarios": 9,
    "confirmados": 15
  },
  "SME-1010|Maternal I|Integral": {
    "inscritos": 10,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-1010|Maternal II|Integral": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-2001|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 3,
    "confirmados": 6
  },
  "SME-2002|Maternal II|Integral": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 5
  },
  "SME-2003|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-2003|Maternal I|Integral": {
    "inscritos": 7,
    "prioritarios": 4,
    "confirmados": 7
  },
  "SME-2003|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-2004|Berçário|Integral": {
    "inscritos": 14,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-2004|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-2004|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-2005|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-2005|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-2006|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-2009|Maternal I|Integral": {
    "inscritos": 11,
    "prioritarios": 4,
    "confirmados": 10
  },
  "SME-2009|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-2010|Berçário|Integral": {
    "inscritos": 9,
    "prioritarios": 2,
    "confirmados": 7
  },
  "SME-2010|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-2012|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-2012|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-2013|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-2014|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-2014|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-2015|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-2016|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-2016|Maternal I|Integral": {
    "inscritos": 7,
    "prioritarios": 3,
    "confirmados": 3
  },
  "SME-2016|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-2018|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-2019|Berçário|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-2019|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-2019|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-2020|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-2020|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-2022|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-2022|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-2025|Berçário|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-2025|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-2025|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-2026|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-2026|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-2028|Berçário|Integral": {
    "inscritos": 10,
    "prioritarios": 1,
    "confirmados": 7
  },
  "SME-2028|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-2028|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-2029|Berçário|Integral": {
    "inscritos": 15,
    "prioritarios": 4,
    "confirmados": 6
  },
  "SME-2029|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 2,
    "confirmados": 1
  },
  "SME-2029|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-2031|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 3,
    "confirmados": 7
  },
  "SME-2031|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-2032|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-2032|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-2034|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-2034|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-2035|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 1
  },
  "SME-2035|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-2035|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-2036|Berçário|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-2036|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-2037|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-2037|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-2038|Berçário|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-2039|Berçário|Integral": {
    "inscritos": 17,
    "prioritarios": 4,
    "confirmados": 9
  },
  "SME-2039|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-2039|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-2040|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-2040|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-2040|Maternal II|Integral": {
    "inscritos": 7,
    "prioritarios": 3,
    "confirmados": 6
  },
  "SME-2041|Berçário|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-2041|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-2041|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-2042|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-2042|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-2043|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 3,
    "confirmados": 7
  },
  "SME-2043|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-2043|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-2044|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 3,
    "confirmados": 5
  },
  "SME-2045|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-2045|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-2046|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 0,
    "confirmados": 6
  },
  "SME-2046|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-2046|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-2047|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-2047|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-2047|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-2048|Berçário|Integral": {
    "inscritos": 11,
    "prioritarios": 3,
    "confirmados": 7
  },
  "SME-2048|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 1,
    "confirmados": 6
  },
  "SME-2048|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-2049|Berçário|Integral": {
    "inscritos": 11,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-2049|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-2049|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-2052|Berçário|Integral": {
    "inscritos": 11,
    "prioritarios": 2,
    "confirmados": 9
  },
  "SME-2052|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-2053|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-2053|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-2053|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-2054|Berçário|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-2054|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-2055|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-2055|Maternal II|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-2056|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-2056|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-2057|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-2057|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-2058|Maternal I|Integral": {
    "inscritos": 10,
    "prioritarios": 2,
    "confirmados": 7
  },
  "SME-2058|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-2060|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-2060|Maternal I|Integral": {
    "inscritos": 7,
    "prioritarios": 1,
    "confirmados": 7
  },
  "SME-2060|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-2061|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-2061|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-2062|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-2063|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-3001|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-3001|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-3001|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-3002|Berçário|Integral": {
    "inscritos": 23,
    "prioritarios": 5,
    "confirmados": 23
  },
  "SME-3002|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 0,
    "confirmados": 7
  },
  "SME-3002|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-3003|Maternal I|Integral": {
    "inscritos": 9,
    "prioritarios": 1,
    "confirmados": 9
  },
  "SME-3003|Maternal II|Integral": {
    "inscritos": 9,
    "prioritarios": 3,
    "confirmados": 8
  },
  "SME-3004|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 6
  },
  "SME-3004|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-3005|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-3005|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-3006|Berçário|Integral": {
    "inscritos": 16,
    "prioritarios": 4,
    "confirmados": 7
  },
  "SME-3006|Maternal I|Integral": {
    "inscritos": 13,
    "prioritarios": 4,
    "confirmados": 8
  },
  "SME-3006|Maternal II|Integral": {
    "inscritos": 6,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-3007|Berçário|Integral": {
    "inscritos": 9,
    "prioritarios": 3,
    "confirmados": 7
  },
  "SME-3007|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-3008|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 3,
    "confirmados": 6
  },
  "SME-3008|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 3,
    "confirmados": 3
  },
  "SME-3008|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-3009|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-3009|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-3010|Maternal I|Integral": {
    "inscritos": 9,
    "prioritarios": 4,
    "confirmados": 8
  },
  "SME-3010|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-3011|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-3012|Maternal I|Integral": {
    "inscritos": 12,
    "prioritarios": 5,
    "confirmados": 9
  },
  "SME-3012|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-3013|Berçário|Integral": {
    "inscritos": 14,
    "prioritarios": 6,
    "confirmados": 13
  },
  "SME-3013|Maternal I|Integral": {
    "inscritos": 7,
    "prioritarios": 3,
    "confirmados": 7
  },
  "SME-3013|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-3014|Berçário|Integral": {
    "inscritos": 28,
    "prioritarios": 8,
    "confirmados": 13
  },
  "SME-3014|Maternal I|Integral": {
    "inscritos": 18,
    "prioritarios": 2,
    "confirmados": 13
  },
  "SME-3014|Maternal II|Integral": {
    "inscritos": 10,
    "prioritarios": 3,
    "confirmados": 5
  },
  "SME-3015|Berçário|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-3015|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-3016|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-3016|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-3016|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-3017|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-3017|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-3018|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-3018|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-3019|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-3019|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 4,
    "confirmados": 5
  },
  "SME-3019|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-3020|Maternal I|Integral": {
    "inscritos": 9,
    "prioritarios": 2,
    "confirmados": 8
  },
  "SME-3020|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-3021|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-3021|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-3021|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-3022|Berçário|Integral": {
    "inscritos": 8,
    "prioritarios": 3,
    "confirmados": 2
  },
  "SME-3022|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-3022|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-3023|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 1,
    "confirmados": 6
  },
  "SME-3023|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-3024|Berçário|Integral": {
    "inscritos": 8,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-3024|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-3024|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-3025|Berçário|Integral": {
    "inscritos": 15,
    "prioritarios": 5,
    "confirmados": 8
  },
  "SME-3025|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-3025|Maternal II|Integral": {
    "inscritos": 8,
    "prioritarios": 4,
    "confirmados": 4
  },
  "SME-3026|Berçário|Integral": {
    "inscritos": 29,
    "prioritarios": 7,
    "confirmados": 7
  },
  "SME-3026|Maternal I|Integral": {
    "inscritos": 12,
    "prioritarios": 3,
    "confirmados": 5
  },
  "SME-3026|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-3027|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 2,
    "confirmados": 7
  },
  "SME-3027|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-3027|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-3028|Maternal I|Integral": {
    "inscritos": 10,
    "prioritarios": 5,
    "confirmados": 9
  },
  "SME-3028|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-3029|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-3029|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 1,
    "confirmados": 6
  },
  "SME-3029|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-3030|Berçário|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-3030|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-3030|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-3031|Maternal I|Integral": {
    "inscritos": 9,
    "prioritarios": 1,
    "confirmados": 6
  },
  "SME-3031|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-3032|Maternal I|Integral": {
    "inscritos": 7,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-3032|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-3033|Berçário|Integral": {
    "inscritos": 11,
    "prioritarios": 5,
    "confirmados": 11
  },
  "SME-3033|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-3034|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 3,
    "confirmados": 4
  },
  "SME-3034|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-3035|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-3035|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-3036|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-3036|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-3036|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-3037|Berçário|Integral": {
    "inscritos": 19,
    "prioritarios": 7,
    "confirmados": 11
  },
  "SME-3037|Maternal I|Integral": {
    "inscritos": 11,
    "prioritarios": 6,
    "confirmados": 9
  },
  "SME-3037|Maternal II|Integral": {
    "inscritos": 9,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-3038|Maternal I|Integral": {
    "inscritos": 17,
    "prioritarios": 5,
    "confirmados": 8
  },
  "SME-3038|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-3039|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-3039|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-3039|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-3040|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-3040|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-3041|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-4001|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 3,
    "confirmados": 6
  },
  "SME-4001|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-4001|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-4002|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-4002|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-4002|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-4003|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-4003|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-4004|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 1,
    "confirmados": 8
  },
  "SME-4004|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-4005|Berçário|Integral": {
    "inscritos": 8,
    "prioritarios": 2,
    "confirmados": 6
  },
  "SME-4005|Maternal I|Integral": {
    "inscritos": 9,
    "prioritarios": 6,
    "confirmados": 7
  },
  "SME-4005|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-4006|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 0
  },
  "SME-4006|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-4006|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-4007|Maternal I|Integral": {
    "inscritos": 7,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-4007|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-4008|Maternal I|Integral": {
    "inscritos": 11,
    "prioritarios": 4,
    "confirmados": 10
  },
  "SME-4009|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-4009|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-4010|Maternal I|Integral": {
    "inscritos": 12,
    "prioritarios": 4,
    "confirmados": 10
  },
  "SME-4010|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-4011|Berçário|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-4011|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-4011|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-4012|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-4012|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-4012|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-4013|Maternal I|Integral": {
    "inscritos": 9,
    "prioritarios": 0,
    "confirmados": 9
  },
  "SME-4014|Maternal I|Integral": {
    "inscritos": 9,
    "prioritarios": 3,
    "confirmados": 8
  },
  "SME-4014|Maternal II|Integral": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-4015|Berçário|Integral": {
    "inscritos": 20,
    "prioritarios": 8,
    "confirmados": 8
  },
  "SME-4015|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 3,
    "confirmados": 3
  },
  "SME-4015|Maternal II|Integral": {
    "inscritos": 6,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-4016|Berçário|Integral": {
    "inscritos": 10,
    "prioritarios": 4,
    "confirmados": 5
  },
  "SME-4016|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-4016|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-4017|Berçário|Integral": {
    "inscritos": 10,
    "prioritarios": 3,
    "confirmados": 8
  },
  "SME-4017|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 0
  },
  "SME-4017|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-4018|Berçário|Integral": {
    "inscritos": 11,
    "prioritarios": 3,
    "confirmados": 7
  },
  "SME-4018|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-4018|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-4020|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 3,
    "confirmados": 4
  },
  "SME-4020|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-4021|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-4021|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-4021|Maternal II|Integral": {
    "inscritos": 7,
    "prioritarios": 2,
    "confirmados": 7
  },
  "SME-4022|Berçário|Integral": {
    "inscritos": 18,
    "prioritarios": 5,
    "confirmados": 14
  },
  "SME-4022|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 1,
    "confirmados": 7
  },
  "SME-4022|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-4023|Berçário|Integral": {
    "inscritos": 13,
    "prioritarios": 3,
    "confirmados": 10
  },
  "SME-4024|Berçário|Integral": {
    "inscritos": 19,
    "prioritarios": 4,
    "confirmados": 15
  },
  "SME-4024|Maternal I|Integral": {
    "inscritos": 12,
    "prioritarios": 1,
    "confirmados": 7
  },
  "SME-4024|Maternal II|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-4025|Berçário|Integral": {
    "inscritos": 9,
    "prioritarios": 3,
    "confirmados": 8
  },
  "SME-4025|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-4025|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-4026|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-4026|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-4027|Berçário|Integral": {
    "inscritos": 16,
    "prioritarios": 2,
    "confirmados": 11
  },
  "SME-4027|Maternal I|Integral": {
    "inscritos": 10,
    "prioritarios": 2,
    "confirmados": 8
  },
  "SME-4027|Maternal II|Integral": {
    "inscritos": 5,
    "prioritarios": 4,
    "confirmados": 4
  },
  "SME-4028|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-4028|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 1
  },
  "SME-4028|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-4029|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 3,
    "confirmados": 4
  },
  "SME-4029|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-4029|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-4030|Berçário|Integral": {
    "inscritos": 19,
    "prioritarios": 6,
    "confirmados": 12
  },
  "SME-4030|Maternal I|Integral": {
    "inscritos": 15,
    "prioritarios": 4,
    "confirmados": 12
  },
  "SME-4030|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-4032|Berçário|Integral": {
    "inscritos": 19,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-4032|Maternal I|Integral": {
    "inscritos": 11,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-4034|Berçário|Integral": {
    "inscritos": 9,
    "prioritarios": 4,
    "confirmados": 6
  },
  "SME-4034|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 2,
    "confirmados": 0
  },
  "SME-4034|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-4035|Berçário|Integral": {
    "inscritos": 9,
    "prioritarios": 3,
    "confirmados": 6
  },
  "SME-4035|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-4036|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-4036|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-4036|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-4037|Maternal I|Integral": {
    "inscritos": 9,
    "prioritarios": 3,
    "confirmados": 5
  },
  "SME-4037|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-4038|Berçário|Integral": {
    "inscritos": 9,
    "prioritarios": 1,
    "confirmados": 8
  },
  "SME-4038|Maternal I|Integral": {
    "inscritos": 10,
    "prioritarios": 2,
    "confirmados": 9
  },
  "SME-4038|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-4039|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-4039|Maternal I|Integral": {
    "inscritos": 7,
    "prioritarios": 3,
    "confirmados": 7
  },
  "SME-4040|Berçário|Integral": {
    "inscritos": 14,
    "prioritarios": 3,
    "confirmados": 6
  },
  "SME-4040|Maternal I|Integral": {
    "inscritos": 23,
    "prioritarios": 5,
    "confirmados": 17
  },
  "SME-4040|Maternal II|Integral": {
    "inscritos": 9,
    "prioritarios": 4,
    "confirmados": 7
  },
  "SME-4041|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 3,
    "confirmados": 4
  },
  "SME-4041|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-4042|Berçário|Integral": {
    "inscritos": 8,
    "prioritarios": 1,
    "confirmados": 6
  },
  "SME-4042|Maternal I|Integral": {
    "inscritos": 13,
    "prioritarios": 6,
    "confirmados": 12
  },
  "SME-4042|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-4043|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-4043|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-4043|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-4044|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-4044|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-4044|Maternal II|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-4045|Berçário|Integral": {
    "inscritos": 12,
    "prioritarios": 3,
    "confirmados": 9
  },
  "SME-4045|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-4046|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-4046|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-4046|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-4047|Berçário|Integral": {
    "inscritos": 13,
    "prioritarios": 3,
    "confirmados": 10
  },
  "SME-4047|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-4047|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-4048|Berçário|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-4048|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-4048|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-4049|Berçário|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-4049|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-4050|Berçário|Integral": {
    "inscritos": 9,
    "prioritarios": 3,
    "confirmados": 7
  },
  "SME-4050|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-5001|Berçário|Integral": {
    "inscritos": 16,
    "prioritarios": 3,
    "confirmados": 7
  },
  "SME-5001|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-5001|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-5002|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 4,
    "confirmados": 6
  },
  "SME-5002|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-5003|Maternal I|Integral": {
    "inscritos": 15,
    "prioritarios": 3,
    "confirmados": 5
  },
  "SME-5003|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-5004|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-5004|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-5005|Maternal I|Integral": {
    "inscritos": 7,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-5005|Maternal II|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-5006|Berçário|Integral": {
    "inscritos": 22,
    "prioritarios": 7,
    "confirmados": 11
  },
  "SME-5006|Maternal I|Integral": {
    "inscritos": 26,
    "prioritarios": 6,
    "confirmados": 13
  },
  "SME-5006|Maternal II|Integral": {
    "inscritos": 11,
    "prioritarios": 3,
    "confirmados": 5
  },
  "SME-5007|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-5008|Berçário|Integral": {
    "inscritos": 10,
    "prioritarios": 1,
    "confirmados": 9
  },
  "SME-5008|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-5008|Maternal II|Integral": {
    "inscritos": 6,
    "prioritarios": 3,
    "confirmados": 2
  },
  "SME-5009|Berçário|Integral": {
    "inscritos": 8,
    "prioritarios": 5,
    "confirmados": 3
  },
  "SME-5009|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 4,
    "confirmados": 6
  },
  "SME-5009|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-5010|Berçário|Integral": {
    "inscritos": 34,
    "prioritarios": 13,
    "confirmados": 26
  },
  "SME-5010|Maternal I|Integral": {
    "inscritos": 21,
    "prioritarios": 5,
    "confirmados": 19
  },
  "SME-5010|Maternal II|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-5012|Berçário|Integral": {
    "inscritos": 14,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-5012|Maternal I|Integral": {
    "inscritos": 9,
    "prioritarios": 1,
    "confirmados": 6
  },
  "SME-5012|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-5013|Maternal I|Integral": {
    "inscritos": 11,
    "prioritarios": 6,
    "confirmados": 6
  },
  "SME-5013|Maternal II|Integral": {
    "inscritos": 6,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-5014|Berçário|Integral": {
    "inscritos": 8,
    "prioritarios": 3,
    "confirmados": 3
  },
  "SME-5014|Maternal I|Integral": {
    "inscritos": 18,
    "prioritarios": 3,
    "confirmados": 14
  },
  "SME-5014|Maternal II|Integral": {
    "inscritos": 7,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-5015|Berçário|Integral": {
    "inscritos": 18,
    "prioritarios": 7,
    "confirmados": 3
  },
  "SME-5015|Maternal I|Integral": {
    "inscritos": 25,
    "prioritarios": 6,
    "confirmados": 15
  },
  "SME-5015|Maternal II|Integral": {
    "inscritos": 8,
    "prioritarios": 3,
    "confirmados": 5
  },
  "SME-5016|Berçário|Integral": {
    "inscritos": 18,
    "prioritarios": 5,
    "confirmados": 7
  },
  "SME-5016|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-5016|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-6001|Maternal I|Integral": {
    "inscritos": 14,
    "prioritarios": 4,
    "confirmados": 10
  },
  "SME-6001|Maternal II|Integral": {
    "inscritos": 7,
    "prioritarios": 3,
    "confirmados": 4
  },
  "SME-6002|Berçário|Integral": {
    "inscritos": 11,
    "prioritarios": 1,
    "confirmados": 8
  },
  "SME-6002|Maternal I|Integral": {
    "inscritos": 7,
    "prioritarios": 3,
    "confirmados": 5
  },
  "SME-6002|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 3,
    "confirmados": 2
  },
  "SME-6003|Berçário|Integral": {
    "inscritos": 11,
    "prioritarios": 3,
    "confirmados": 7
  },
  "SME-6003|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-6003|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-6004|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 3,
    "confirmados": 4
  },
  "SME-6004|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-6004|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-6005|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 3,
    "confirmados": 6
  },
  "SME-6005|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-6006|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-6007|Maternal I|Integral": {
    "inscritos": 10,
    "prioritarios": 2,
    "confirmados": 9
  },
  "SME-6007|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-6009|Maternal I|Integral": {
    "inscritos": 17,
    "prioritarios": 5,
    "confirmados": 16
  },
  "SME-6009|Maternal II|Integral": {
    "inscritos": 10,
    "prioritarios": 5,
    "confirmados": 7
  },
  "SME-6012|Berçário|Integral": {
    "inscritos": 11,
    "prioritarios": 0,
    "confirmados": 10
  },
  "SME-6012|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 1
  },
  "SME-6012|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-6013|Berçário|Integral": {
    "inscritos": 17,
    "prioritarios": 3,
    "confirmados": 9
  },
  "SME-6013|Maternal I|Integral": {
    "inscritos": 11,
    "prioritarios": 5,
    "confirmados": 8
  },
  "SME-6013|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-6015|Berçário|Integral": {
    "inscritos": 15,
    "prioritarios": 3,
    "confirmados": 11
  },
  "SME-6015|Maternal I|Integral": {
    "inscritos": 16,
    "prioritarios": 8,
    "confirmados": 12
  },
  "SME-6015|Maternal II|Integral": {
    "inscritos": 7,
    "prioritarios": 2,
    "confirmados": 6
  },
  "SME-6016|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-6016|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 3,
    "confirmados": 4
  },
  "SME-6016|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-6017|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 2,
    "confirmados": 0
  },
  "SME-6017|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 2,
    "confirmados": 1
  },
  "SME-6017|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-6018|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-6018|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-6018|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-7001|Berçário|Integral": {
    "inscritos": 12,
    "prioritarios": 4,
    "confirmados": 11
  },
  "SME-7001|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-7001|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 1
  },
  "SME-7002|Berçário|Integral": {
    "inscritos": 9,
    "prioritarios": 4,
    "confirmados": 9
  },
  "SME-7002|Maternal I|Integral": {
    "inscritos": 7,
    "prioritarios": 4,
    "confirmados": 5
  },
  "SME-7002|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-7003|Berçário|Integral": {
    "inscritos": 40,
    "prioritarios": 12,
    "confirmados": 17
  },
  "SME-7003|Maternal I|Integral": {
    "inscritos": 19,
    "prioritarios": 1,
    "confirmados": 11
  },
  "SME-7003|Maternal II|Integral": {
    "inscritos": 13,
    "prioritarios": 2,
    "confirmados": 10
  },
  "SME-7004|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 2,
    "confirmados": 6
  },
  "SME-7004|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-7007|Maternal I|Integral": {
    "inscritos": 9,
    "prioritarios": 3,
    "confirmados": 8
  },
  "SME-7007|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-7008|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-7010|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 2,
    "confirmados": 8
  },
  "SME-7010|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-7011|Maternal I|Integral": {
    "inscritos": 12,
    "prioritarios": 2,
    "confirmados": 10
  },
  "SME-7011|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-7013|Berçário|Integral": {
    "inscritos": 22,
    "prioritarios": 9,
    "confirmados": 8
  },
  "SME-7013|Maternal I|Integral": {
    "inscritos": 9,
    "prioritarios": 2,
    "confirmados": 8
  },
  "SME-7014|Berçário|Integral": {
    "inscritos": 16,
    "prioritarios": 5,
    "confirmados": 3
  },
  "SME-7014|Maternal I|Integral": {
    "inscritos": 9,
    "prioritarios": 3,
    "confirmados": 8
  },
  "SME-7015|Berçário|Integral": {
    "inscritos": 19,
    "prioritarios": 5,
    "confirmados": 16
  },
  "SME-7015|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 1,
    "confirmados": 6
  },
  "SME-7015|Maternal II|Integral": {
    "inscritos": 9,
    "prioritarios": 4,
    "confirmados": 7
  },
  "SME-7017|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-7017|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-7018|Maternal I|Integral": {
    "inscritos": 13,
    "prioritarios": 2,
    "confirmados": 13
  },
  "SME-7018|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-7019|Maternal I|Integral": {
    "inscritos": 11,
    "prioritarios": 4,
    "confirmados": 11
  },
  "SME-7019|Maternal II|Integral": {
    "inscritos": 17,
    "prioritarios": 3,
    "confirmados": 17
  },
  "SME-7020|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 2,
    "confirmados": 6
  },
  "SME-7020|Maternal I|Integral": {
    "inscritos": 7,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-7020|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-7025|Maternal I|Integral": {
    "inscritos": 10,
    "prioritarios": 2,
    "confirmados": 10
  },
  "SME-7025|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-7027|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 3,
    "confirmados": 7
  },
  "SME-7027|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-7027|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-7034|Berçário|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-7034|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-7034|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-7035|Maternal I|Integral": {
    "inscritos": 20,
    "prioritarios": 5,
    "confirmados": 17
  },
  "SME-7035|Maternal II|Integral": {
    "inscritos": 10,
    "prioritarios": 2,
    "confirmados": 8
  },
  "SME-7036|Berçário|Integral": {
    "inscritos": 15,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-7036|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-7036|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-7037|Berçário|Integral": {
    "inscritos": 23,
    "prioritarios": 6,
    "confirmados": 19
  },
  "SME-7037|Maternal I|Integral": {
    "inscritos": 17,
    "prioritarios": 4,
    "confirmados": 14
  },
  "SME-7037|Maternal II|Integral": {
    "inscritos": 7,
    "prioritarios": 3,
    "confirmados": 4
  },
  "SME-7038|Berçário|Integral": {
    "inscritos": 31,
    "prioritarios": 8,
    "confirmados": 3
  },
  "SME-7038|Maternal I|Integral": {
    "inscritos": 13,
    "prioritarios": 5,
    "confirmados": 3
  },
  "SME-7038|Maternal II|Integral": {
    "inscritos": 7,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-7039|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-7039|Maternal II|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-7040|Berçário|Integral": {
    "inscritos": 43,
    "prioritarios": 12,
    "confirmados": 29
  },
  "SME-7040|Maternal I|Integral": {
    "inscritos": 36,
    "prioritarios": 7,
    "confirmados": 16
  },
  "SME-7040|Maternal II|Integral": {
    "inscritos": 11,
    "prioritarios": 3,
    "confirmados": 6
  },
  "SME-7041|Berçário|Integral": {
    "inscritos": 19,
    "prioritarios": 5,
    "confirmados": 10
  },
  "SME-7041|Maternal I|Integral": {
    "inscritos": 12,
    "prioritarios": 3,
    "confirmados": 5
  },
  "SME-7041|Maternal II|Integral": {
    "inscritos": 6,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-7042|Berçário|Integral": {
    "inscritos": 14,
    "prioritarios": 5,
    "confirmados": 5
  },
  "SME-7042|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 6
  },
  "SME-7042|Maternal II|Integral": {
    "inscritos": 9,
    "prioritarios": 2,
    "confirmados": 6
  },
  "SME-7043|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-7043|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-7043|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-7044|Berçário|Integral": {
    "inscritos": 22,
    "prioritarios": 9,
    "confirmados": 15
  },
  "SME-7044|Maternal I|Integral": {
    "inscritos": 10,
    "prioritarios": 2,
    "confirmados": 7
  },
  "SME-7044|Maternal II|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-7045|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-7045|Maternal II|Integral": {
    "inscritos": 7,
    "prioritarios": 1,
    "confirmados": 7
  },
  "SME-8002|Berçário|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-8002|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-8002|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-8003|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-8003|Maternal II|Parcial": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-8003|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-8004|Berçário|Parcial": {
    "inscritos": 4,
    "prioritarios": 3,
    "confirmados": 2
  },
  "SME-8004|Berçário|Integral": {
    "inscritos": 11,
    "prioritarios": 4,
    "confirmados": 11
  },
  "SME-8004|Maternal I|Integral": {
    "inscritos": 10,
    "prioritarios": 2,
    "confirmados": 10
  },
  "SME-8004|Maternal II|Integral": {
    "inscritos": 9,
    "prioritarios": 4,
    "confirmados": 5
  },
  "SME-8005|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-8005|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-8006|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-8006|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-8007|Berçário|Integral": {
    "inscritos": 10,
    "prioritarios": 0,
    "confirmados": 7
  },
  "SME-8007|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-8007|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-8008|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-8009|Berçário|Parcial": {
    "inscritos": 6,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-8009|Berçário|Integral": {
    "inscritos": 14,
    "prioritarios": 6,
    "confirmados": 4
  },
  "SME-8009|Maternal I|Parcial": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-8009|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-8009|Maternal II|Parcial": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-8009|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-8010|Berçário|Integral": {
    "inscritos": 15,
    "prioritarios": 5,
    "confirmados": 8
  },
  "SME-8010|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-8010|Maternal II|Integral": {
    "inscritos": 7,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-8011|Berçário|Integral": {
    "inscritos": 17,
    "prioritarios": 5,
    "confirmados": 13
  },
  "SME-8011|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-8011|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-8013|Maternal I|Integral": {
    "inscritos": 12,
    "prioritarios": 5,
    "confirmados": 9
  },
  "SME-8013|Maternal II|Integral": {
    "inscritos": 7,
    "prioritarios": 4,
    "confirmados": 6
  },
  "SME-8014|Maternal I|Integral": {
    "inscritos": 10,
    "prioritarios": 1,
    "confirmados": 6
  },
  "SME-8014|Maternal II|Parcial": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-8014|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-8015|Berçário|Integral": {
    "inscritos": 9,
    "prioritarios": 0,
    "confirmados": 9
  },
  "SME-8015|Maternal I|Integral": {
    "inscritos": 10,
    "prioritarios": 3,
    "confirmados": 8
  },
  "SME-8015|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-8016|Berçário|Integral": {
    "inscritos": 13,
    "prioritarios": 5,
    "confirmados": 6
  },
  "SME-8016|Maternal I|Integral": {
    "inscritos": 15,
    "prioritarios": 1,
    "confirmados": 13
  },
  "SME-8016|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-8017|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-8017|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-8017|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-8018|Maternal I|Parcial": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-8018|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-8019|Maternal I|Integral": {
    "inscritos": 9,
    "prioritarios": 1,
    "confirmados": 9
  },
  "SME-8019|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-8021|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 2,
    "confirmados": 6
  },
  "SME-8021|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-8021|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-8022|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-8022|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-8022|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-8023|Maternal I|Parcial": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-8023|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-8023|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-8024|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-8024|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-8024|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-8025|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-8025|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-8027|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-8027|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-9001|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 0,
    "confirmados": 5
  },
  "SME-9001|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-9002|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-9002|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-9003|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-9004|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-9004|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-9004|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-9007|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-9007|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-9008|Berçário|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-9008|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-9008|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-9009|Berçário|Integral": {
    "inscritos": 9,
    "prioritarios": 4,
    "confirmados": 2
  },
  "SME-9009|Maternal I|Integral": {
    "inscritos": 10,
    "prioritarios": 5,
    "confirmados": 8
  },
  "SME-9009|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 2,
    "confirmados": 1
  },
  "SME-9010|Maternal I|Integral": {
    "inscritos": 11,
    "prioritarios": 6,
    "confirmados": 9
  },
  "SME-9010|Maternal II|Parcial": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-9010|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-9011|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 6
  },
  "SME-9011|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-9011|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-9012|Berçário|Integral": {
    "inscritos": 8,
    "prioritarios": 2,
    "confirmados": 6
  },
  "SME-9012|Maternal I|Parcial": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-9012|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 1,
    "confirmados": 7
  },
  "SME-9012|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-9013|Berçário|Integral": {
    "inscritos": 8,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-9013|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-9013|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-9014|Berçário|Integral": {
    "inscritos": 8,
    "prioritarios": 5,
    "confirmados": 2
  },
  "SME-9014|Maternal I|Integral": {
    "inscritos": 7,
    "prioritarios": 3,
    "confirmados": 3
  },
  "SME-9014|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-9017|Berçário|Integral": {
    "inscritos": 13,
    "prioritarios": 5,
    "confirmados": 8
  },
  "SME-9017|Maternal I|Integral": {
    "inscritos": 11,
    "prioritarios": 1,
    "confirmados": 8
  },
  "SME-9017|Maternal II|Integral": {
    "inscritos": 8,
    "prioritarios": 3,
    "confirmados": 7
  },
  "SME-9018|Berçário|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-9018|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-9018|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-9019|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-9019|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-9019|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-9020|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-9021|Berçário|Integral": {
    "inscritos": 17,
    "prioritarios": 8,
    "confirmados": 13
  },
  "SME-9021|Maternal I|Integral": {
    "inscritos": 10,
    "prioritarios": 7,
    "confirmados": 9
  },
  "SME-9021|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-9022|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-9022|Maternal I|Parcial": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-9022|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 3,
    "confirmados": 6
  },
  "SME-9022|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-9023|Berçário|Integral": {
    "inscritos": 8,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-9023|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-9024|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-9024|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-9024|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-9025|Berçário|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-9025|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-9026|Berçário|Integral": {
    "inscritos": 8,
    "prioritarios": 1,
    "confirmados": 6
  },
  "SME-9026|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-9026|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-9027|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-9027|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-9027|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-9028|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-9028|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 1,
    "confirmados": 6
  },
  "SME-9029|Berçário|Integral": {
    "inscritos": 9,
    "prioritarios": 4,
    "confirmados": 5
  },
  "SME-9029|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-9029|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-9030|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-9030|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 3,
    "confirmados": 4
  },
  "SME-9030|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-9031|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 3,
    "confirmados": 4
  },
  "SME-9031|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-9032|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-9032|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-9033|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-9033|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 0,
    "confirmados": 5
  },
  "SME-9033|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-9034|Berçário|Integral": {
    "inscritos": 13,
    "prioritarios": 3,
    "confirmados": 8
  },
  "SME-9034|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-9035|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-9035|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-9035|Maternal II|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-9036|Berçário|Integral": {
    "inscritos": 13,
    "prioritarios": 4,
    "confirmados": 5
  },
  "SME-9036|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-9036|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-9037|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-9038|Berçário|Integral": {
    "inscritos": 8,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-9038|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-9038|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-9039|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 5
  },
  "SME-9039|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-9039|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-9040|Berçário|Integral": {
    "inscritos": 10,
    "prioritarios": 3,
    "confirmados": 7
  },
  "SME-9040|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-9041|Berçário|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-9041|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-9041|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-9042|Berçário|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-9042|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-9042|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-9043|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 1,
    "confirmados": 7
  },
  "SME-9043|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-9044|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-9044|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-9044|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-9045|Berçário|Integral": {
    "inscritos": 9,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-9045|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-9046|Berçário|Integral": {
    "inscritos": 12,
    "prioritarios": 6,
    "confirmados": 6
  },
  "SME-9046|Maternal I|Integral": {
    "inscritos": 14,
    "prioritarios": 3,
    "confirmados": 5
  },
  "SME-9046|Maternal II|Integral": {
    "inscritos": 7,
    "prioritarios": 1,
    "confirmados": 7
  },
  "SME-10001|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-10001|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-10001|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-10004|Berçário|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-10005|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-10006|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 5
  },
  "SME-10006|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-10006|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-10008|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-10008|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-10008|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-10009|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-10009|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-10010|Maternal I|Integral": {
    "inscritos": 11,
    "prioritarios": 4,
    "confirmados": 10
  },
  "SME-10010|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-10011|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-10013|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-10013|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-10013|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-10014|Maternal I|Integral": {
    "inscritos": 7,
    "prioritarios": 3,
    "confirmados": 7
  },
  "SME-10018|Berçário|Integral": {
    "inscritos": 23,
    "prioritarios": 8,
    "confirmados": 23
  },
  "SME-10018|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-10019|Berçário|Integral": {
    "inscritos": 16,
    "prioritarios": 6,
    "confirmados": 14
  },
  "SME-10019|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-10019|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-10020|Maternal I|Integral": {
    "inscritos": 7,
    "prioritarios": 0,
    "confirmados": 6
  },
  "SME-10020|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-10022|Maternal I|Integral": {
    "inscritos": 13,
    "prioritarios": 3,
    "confirmados": 12
  },
  "SME-10022|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 1
  },
  "SME-10023|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 3,
    "confirmados": 5
  },
  "SME-10023|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-10023|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-10024|Berçário|Integral": {
    "inscritos": 16,
    "prioritarios": 3,
    "confirmados": 9
  },
  "SME-10024|Maternal I|Integral": {
    "inscritos": 7,
    "prioritarios": 4,
    "confirmados": 7
  },
  "SME-10024|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-10026|Maternal I|Integral": {
    "inscritos": 22,
    "prioritarios": 6,
    "confirmados": 15
  },
  "SME-10026|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-10027|Berçário|Integral": {
    "inscritos": 13,
    "prioritarios": 6,
    "confirmados": 9
  },
  "SME-10027|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 0,
    "confirmados": 6
  },
  "SME-10028|Berçário|Integral": {
    "inscritos": 9,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-10028|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-10028|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-10029|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-10029|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-10030|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-10032|Berçário|Integral": {
    "inscritos": 12,
    "prioritarios": 4,
    "confirmados": 9
  },
  "SME-10032|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-10032|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-10033|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-10033|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-10034|Berçário|Integral": {
    "inscritos": 8,
    "prioritarios": 2,
    "confirmados": 8
  },
  "SME-10034|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-10034|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-10035|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 1,
    "confirmados": 6
  },
  "SME-10035|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-10035|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-10036|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-10036|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-10036|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-10037|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 6
  },
  "SME-10037|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-10039|Berçário|Integral": {
    "inscritos": 19,
    "prioritarios": 5,
    "confirmados": 17
  },
  "SME-10039|Maternal I|Integral": {
    "inscritos": 12,
    "prioritarios": 2,
    "confirmados": 12
  },
  "SME-10040|Berçário|Integral": {
    "inscritos": 13,
    "prioritarios": 4,
    "confirmados": 12
  },
  "SME-10040|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 3,
    "confirmados": 4
  },
  "SME-10040|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-10041|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 3,
    "confirmados": 4
  },
  "SME-10041|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-10041|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-10042|Berçário|Integral": {
    "inscritos": 13,
    "prioritarios": 4,
    "confirmados": 9
  },
  "SME-10042|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-10042|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-10043|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-10043|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-10043|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-10044|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-10044|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-10045|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 0,
    "confirmados": 6
  },
  "SME-10045|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-10046|Berçário|Integral": {
    "inscritos": 16,
    "prioritarios": 4,
    "confirmados": 13
  },
  "SME-10046|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-10046|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-10047|Berçário|Integral": {
    "inscritos": 9,
    "prioritarios": 4,
    "confirmados": 4
  },
  "SME-10047|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-10047|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-10051|Berçário|Integral": {
    "inscritos": 16,
    "prioritarios": 6,
    "confirmados": 12
  },
  "SME-10051|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-10051|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-10052|Berçário|Integral": {
    "inscritos": 20,
    "prioritarios": 4,
    "confirmados": 18
  },
  "SME-10052|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 3,
    "confirmados": 5
  },
  "SME-10052|Maternal II|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-10053|Berçário|Integral": {
    "inscritos": 23,
    "prioritarios": 5,
    "confirmados": 14
  },
  "SME-10053|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-10054|Berçário|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-10055|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-10055|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-10055|Maternal II|Integral": {
    "inscritos": 7,
    "prioritarios": 4,
    "confirmados": 7
  },
  "SME-10056|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-10056|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-10056|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-10057|Berçário|Integral": {
    "inscritos": 12,
    "prioritarios": 1,
    "confirmados": 9
  },
  "SME-10057|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-10057|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-10058|Berçário|Integral": {
    "inscritos": 19,
    "prioritarios": 9,
    "confirmados": 14
  },
  "SME-10058|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-10058|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-10059|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-10059|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-10059|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-10060|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-10060|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 3,
    "confirmados": 4
  },
  "SME-10060|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-10061|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-10061|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-10062|Berçário|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-10062|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-10062|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-10063|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 3,
    "confirmados": 4
  },
  "SME-10063|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 3,
    "confirmados": 6
  },
  "SME-10063|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-10064|Berçário|Integral": {
    "inscritos": 8,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-10064|Maternal I|Integral": {
    "inscritos": 9,
    "prioritarios": 5,
    "confirmados": 6
  },
  "SME-10064|Maternal II|Integral": {
    "inscritos": 8,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-10065|Berçário|Integral": {
    "inscritos": 8,
    "prioritarios": 6,
    "confirmados": 8
  },
  "SME-10065|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-10066|Berçário|Integral": {
    "inscritos": 11,
    "prioritarios": 7,
    "confirmados": 8
  },
  "SME-10066|Maternal I|Integral": {
    "inscritos": 7,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-10066|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-10067|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-10067|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 2,
    "confirmados": 8
  },
  "SME-10067|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-10068|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-10068|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-10068|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-10069|Berçário|Integral": {
    "inscritos": 22,
    "prioritarios": 10,
    "confirmados": 15
  },
  "SME-10069|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-10069|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-10070|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-10070|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-10071|Berçário|Integral": {
    "inscritos": 11,
    "prioritarios": 1,
    "confirmados": 9
  },
  "SME-10071|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-10071|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-10072|Berçário|Integral": {
    "inscritos": 12,
    "prioritarios": 5,
    "confirmados": 5
  },
  "SME-10072|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-10072|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-10073|Berçário|Integral": {
    "inscritos": 9,
    "prioritarios": 1,
    "confirmados": 7
  },
  "SME-10073|Maternal I|Integral": {
    "inscritos": 7,
    "prioritarios": 3,
    "confirmados": 6
  },
  "SME-10073|Maternal II|Integral": {
    "inscritos": 7,
    "prioritarios": 2,
    "confirmados": 6
  },
  "SME-10074|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-10074|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-10074|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-10075|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-10075|Maternal I|Integral": {
    "inscritos": 11,
    "prioritarios": 2,
    "confirmados": 10
  },
  "SME-10075|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-10076|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-10076|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-10076|Maternal II|Integral": {
    "inscritos": 6,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-10077|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-10077|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-10077|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-10078|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 4,
    "confirmados": 5
  },
  "SME-10078|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-10078|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-10079|Berçário|Integral": {
    "inscritos": 8,
    "prioritarios": 2,
    "confirmados": 7
  },
  "SME-10079|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 3,
    "confirmados": 5
  },
  "SME-10080|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-10080|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-10080|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-10081|Berçário|Integral": {
    "inscritos": 8,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-10081|Maternal I|Integral": {
    "inscritos": 14,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-10081|Maternal II|Parcial": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-10081|Maternal II|Integral": {
    "inscritos": 9,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-10082|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-10082|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-10084|Berçário|Integral": {
    "inscritos": 8,
    "prioritarios": 1,
    "confirmados": 7
  },
  "SME-10084|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-10084|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-10085|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-10085|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-11001|Berçário|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-11001|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-11003|Berçário|Integral": {
    "inscritos": 13,
    "prioritarios": 4,
    "confirmados": 9
  },
  "SME-11003|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-11003|Maternal II|Integral": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-11004|Berçário|Integral": {
    "inscritos": 9,
    "prioritarios": 2,
    "confirmados": 7
  },
  "SME-11004|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 3,
    "confirmados": 7
  },
  "SME-11004|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-11006|Berçário|Integral": {
    "inscritos": 12,
    "prioritarios": 4,
    "confirmados": 9
  },
  "SME-11006|Maternal I|Integral": {
    "inscritos": 9,
    "prioritarios": 4,
    "confirmados": 8
  },
  "SME-11006|Maternal II|Integral": {
    "inscritos": 6,
    "prioritarios": 0,
    "confirmados": 5
  },
  "SME-11007|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-11007|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-11007|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-11008|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-11008|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-11009|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-11009|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-11010|Berçário|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-11010|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-11010|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-101601|Maternal I|Parcial": {
    "inscritos": 7,
    "prioritarios": 2,
    "confirmados": 6
  },
  "SME-101601|Maternal II|Parcial": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-101602|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-101603|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 6
  },
  "SME-101603|Maternal I|Parcial": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-101603|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-101603|Maternal II|Parcial": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-101603|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-101604|Maternal I|Parcial": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-101604|Maternal II|Parcial": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-101605|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-101605|Maternal I|Parcial": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-101606|Berçário|Parcial": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 5
  },
  "SME-101606|Berçário|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-101606|Maternal I|Parcial": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-101607|Berçário|Integral": {
    "inscritos": 12,
    "prioritarios": 3,
    "confirmados": 5
  },
  "SME-101607|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-101801|Berçário|Parcial": {
    "inscritos": 14,
    "prioritarios": 5,
    "confirmados": 13
  },
  "SME-101801|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-101801|Maternal I|Parcial": {
    "inscritos": 2,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-101801|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-101801|Maternal II|Parcial": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-101801|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-101802|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-101802|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-101802|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-101803|Maternal II|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-102601|Berçário|Integral": {
    "inscritos": 14,
    "prioritarios": 9,
    "confirmados": 11
  },
  "SME-102601|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-102602|Berçário|Parcial": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-102602|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-102602|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-102602|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-102604|Berçário|Integral": {
    "inscritos": 12,
    "prioritarios": 3,
    "confirmados": 10
  },
  "SME-102604|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 3,
    "confirmados": 3
  },
  "SME-102604|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-102605|Berçário|Integral": {
    "inscritos": 13,
    "prioritarios": 4,
    "confirmados": 7
  },
  "SME-102605|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-102605|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-102606|Berçário|Integral": {
    "inscritos": 17,
    "prioritarios": 6,
    "confirmados": 9
  },
  "SME-102606|Maternal I|Integral": {
    "inscritos": 7,
    "prioritarios": 2,
    "confirmados": 6
  },
  "SME-102802|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-102803|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-103601|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-103601|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-103602|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-103602|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-103602|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-103604|Berçário|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-103605|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-103605|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-103605|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-103606|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-103606|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-103607|Berçário|Parcial": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-103607|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 5
  },
  "SME-103607|Maternal I|Parcial": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-103607|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-103607|Maternal II|Parcial": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-103607|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-103801|Berçário|Integral": {
    "inscritos": 11,
    "prioritarios": 3,
    "confirmados": 6
  },
  "SME-103801|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-103801|Maternal II|Parcial": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-103801|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-103802|Berçário|Parcial": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-103802|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-103802|Maternal I|Parcial": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-103802|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-103802|Maternal II|Parcial": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-103802|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-103804|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-103804|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-103805|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-103806|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-103807|Berçário|Integral": {
    "inscritos": 15,
    "prioritarios": 4,
    "confirmados": 12
  },
  "SME-103807|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-103807|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-107601|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-107601|Maternal II|Parcial": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-107601|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-107602|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 1,
    "confirmados": 6
  },
  "SME-107602|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-107604|Berçário|Integral": {
    "inscritos": 8,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-107604|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-107605|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-107605|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-107606|Maternal I|Parcial": {
    "inscritos": 12,
    "prioritarios": 3,
    "confirmados": 9
  },
  "SME-107606|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-107606|Maternal II|Parcial": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-107607|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-107607|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-107607|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-107608|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-107608|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 0
  },
  "SME-107609|Berçário|Parcial": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-107609|Berçário|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-107609|Maternal I|Parcial": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-107610|Berçário|Integral": {
    "inscritos": 15,
    "prioritarios": 3,
    "confirmados": 13
  },
  "SME-107610|Maternal I|Integral": {
    "inscritos": 10,
    "prioritarios": 3,
    "confirmados": 3
  },
  "SME-107610|Maternal II|Parcial": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-107610|Maternal II|Integral": {
    "inscritos": 8,
    "prioritarios": 4,
    "confirmados": 3
  },
  "SME-107801|Maternal II|Parcial": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-107803|Maternal II|Parcial": {
    "inscritos": 6,
    "prioritarios": 1,
    "confirmados": 6
  },
  "SME-121001|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-123601|Berçário|Integral": {
    "inscritos": 10,
    "prioritarios": 0,
    "confirmados": 9
  },
  "SME-123601|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-123601|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-123603|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-123603|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-204601|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-204602|Berçário|Integral": {
    "inscritos": 39,
    "prioritarios": 10,
    "confirmados": 10
  },
  "SME-204602|Maternal I|Integral": {
    "inscritos": 16,
    "prioritarios": 3,
    "confirmados": 9
  },
  "SME-204602|Maternal II|Integral": {
    "inscritos": 9,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-204804|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-204805|Maternal I|Integral": {
    "inscritos": 12,
    "prioritarios": 3,
    "confirmados": 8
  },
  "SME-204805|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-204806|Berçário|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-204806|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-204806|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-205601|Berçário|Integral": {
    "inscritos": 11,
    "prioritarios": 4,
    "confirmados": 4
  },
  "SME-205601|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-205601|Maternal II|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-205602|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 0,
    "confirmados": 6
  },
  "SME-205602|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-205801|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-205801|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-205801|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-206601|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 5
  },
  "SME-206602|Berçário|Integral": {
    "inscritos": 9,
    "prioritarios": 3,
    "confirmados": 7
  },
  "SME-206602|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-206603|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-206605|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-206605|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-206606|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-206606|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-208601|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-208603|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 3,
    "confirmados": 5
  },
  "SME-208603|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-208603|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-208604|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 4,
    "confirmados": 6
  },
  "SME-208604|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-208605|Berçário|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-208605|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-208606|Berçário|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-208607|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-208607|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-208608|Berçário|Integral": {
    "inscritos": 17,
    "prioritarios": 5,
    "confirmados": 11
  },
  "SME-208608|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-208608|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-208801|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-208801|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-208803|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-208803|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-209601|Berçário|Integral": {
    "inscritos": 15,
    "prioritarios": 7,
    "confirmados": 11
  },
  "SME-209601|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-209601|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-209602|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-209602|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-209603|Berçário|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-209603|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-209604|Berçário|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-209604|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-209604|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-209605|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-209606|Berçário|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-209606|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-209607|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-209608|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-209609|Berçário|Integral": {
    "inscritos": 13,
    "prioritarios": 5,
    "confirmados": 8
  },
  "SME-209609|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-209610|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-209610|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-209610|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-209803|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-209803|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-209804|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-227601|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-227602|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-227801|Berçário|Integral": {
    "inscritos": 13,
    "prioritarios": 2,
    "confirmados": 7
  },
  "SME-227801|Maternal I|Integral": {
    "inscritos": 9,
    "prioritarios": 2,
    "confirmados": 7
  },
  "SME-227801|Maternal II|Integral": {
    "inscritos": 8,
    "prioritarios": 2,
    "confirmados": 6
  },
  "SME-312502|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-312502|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-312502|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-312601|Berçário|Integral": {
    "inscritos": 11,
    "prioritarios": 4,
    "confirmados": 10
  },
  "SME-312601|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-312601|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-312602|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 3,
    "confirmados": 3
  },
  "SME-312602|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 4,
    "confirmados": 6
  },
  "SME-312602|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-312603|Berçário|Integral": {
    "inscritos": 8,
    "prioritarios": 1,
    "confirmados": 6
  },
  "SME-312603|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-312801|Berçário|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-312801|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-312801|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-312802|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-312802|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-312803|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-312803|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-312804|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-312804|Maternal I|Integral": {
    "inscritos": 7,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-312804|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-312805|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 4,
    "confirmados": 4
  },
  "SME-312805|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-312805|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-312806|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-312809|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 1,
    "confirmados": 6
  },
  "SME-312809|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-312809|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-312810|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-312812|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-312812|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-312813|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 3,
    "confirmados": 4
  },
  "SME-312813|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-312813|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 2,
    "confirmados": 1
  },
  "SME-313601|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-313601|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-313601|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-313602|Berçário|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-313602|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-313602|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-313603|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-313603|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-313604|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-313604|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-313606|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-313607|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 1,
    "confirmados": 6
  },
  "SME-313607|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-313607|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-313608|Berçário|Integral": {
    "inscritos": 11,
    "prioritarios": 4,
    "confirmados": 5
  },
  "SME-313608|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-313608|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-313609|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-313609|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-313609|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-313610|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 0,
    "confirmados": 6
  },
  "SME-313610|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-313611|Berçário|Integral": {
    "inscritos": 11,
    "prioritarios": 4,
    "confirmados": 7
  },
  "SME-313612|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 3,
    "confirmados": 3
  },
  "SME-313612|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-313612|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-313801|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-313801|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-313801|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-313802|Berçário|Integral": {
    "inscritos": 14,
    "prioritarios": 7,
    "confirmados": 10
  },
  "SME-313802|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-313802|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-313804|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-313804|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-313805|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-313805|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-313806|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-313809|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 3,
    "confirmados": 7
  },
  "SME-328601|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-328601|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-328602|Berçário|Integral": {
    "inscritos": 11,
    "prioritarios": 2,
    "confirmados": 8
  },
  "SME-328602|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-328602|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-328604|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-328604|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-328801|Berçário|Integral": {
    "inscritos": 10,
    "prioritarios": 5,
    "confirmados": 4
  },
  "SME-328801|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-328801|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-329801|Berçário|Integral": {
    "inscritos": 13,
    "prioritarios": 3,
    "confirmados": 5
  },
  "SME-329801|Maternal I|Integral": {
    "inscritos": 10,
    "prioritarios": 3,
    "confirmados": 7
  },
  "SME-329801|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-330601|Berçário|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-330601|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-330601|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-330602|Berçário|Integral": {
    "inscritos": 18,
    "prioritarios": 6,
    "confirmados": 9
  },
  "SME-330602|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-330602|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-410601|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-410602|Maternal II|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-410603|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-410603|Maternal II|Parcial": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-410603|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-410801|Berçário|Integral": {
    "inscritos": 28,
    "prioritarios": 7,
    "confirmados": 5
  },
  "SME-410801|Maternal I|Integral": {
    "inscritos": 15,
    "prioritarios": 2,
    "confirmados": 9
  },
  "SME-410801|Maternal II|Integral": {
    "inscritos": 9,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-410802|Berçário|Integral": {
    "inscritos": 13,
    "prioritarios": 5,
    "confirmados": 4
  },
  "SME-410802|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-410802|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-410803|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-410803|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-410804|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-410805|Berçário|Integral": {
    "inscritos": 8,
    "prioritarios": 4,
    "confirmados": 6
  },
  "SME-410805|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-410805|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-410807|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-410807|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-410807|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-410808|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 3,
    "confirmados": 6
  },
  "SME-410808|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 5,
    "confirmados": 4
  },
  "SME-410808|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-410810|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-411601|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-411601|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-411602|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-411602|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-411602|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-411603|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-411603|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-411604|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-411605|Berçário|Integral": {
    "inscritos": 9,
    "prioritarios": 2,
    "confirmados": 8
  },
  "SME-411605|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-411609|Maternal II|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-411801|Berçário|Integral": {
    "inscritos": 12,
    "prioritarios": 4,
    "confirmados": 5
  },
  "SME-411801|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-411801|Maternal II|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-411802|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-411802|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-411802|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-411803|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-411803|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-411803|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-430601|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-430602|Berçário|Integral": {
    "inscritos": 9,
    "prioritarios": 4,
    "confirmados": 3
  },
  "SME-430602|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-430602|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-430603|Berçário|Integral": {
    "inscritos": 15,
    "prioritarios": 4,
    "confirmados": 10
  },
  "SME-430603|Maternal I|Integral": {
    "inscritos": 13,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-430603|Maternal II|Integral": {
    "inscritos": 6,
    "prioritarios": 4,
    "confirmados": 3
  },
  "SME-430604|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-430604|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-430605|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-430605|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 3,
    "confirmados": 1
  },
  "SME-430607|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 5
  },
  "SME-430607|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-430801|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-430801|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-430802|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-430802|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-430803|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-430805|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-430805|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-430805|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-430806|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-430806|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-430807|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 3,
    "confirmados": 4
  },
  "SME-430807|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 2,
    "confirmados": 1
  },
  "SME-430809|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-430809|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-430809|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-430810|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-430810|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-430810|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-430811|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-430811|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-430811|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-430812|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-430812|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-430813|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 3,
    "confirmados": 3
  },
  "SME-430813|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-430815|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-430815|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 1,
    "confirmados": 7
  },
  "SME-430815|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-431601|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-431602|Berçário|Integral": {
    "inscritos": 9,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-431602|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-431603|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-431603|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-431604|Berçário|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-431604|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-431604|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-431605|Berçário|Integral": {
    "inscritos": 8,
    "prioritarios": 0,
    "confirmados": 6
  },
  "SME-431605|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 3,
    "confirmados": 7
  },
  "SME-431605|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 2,
    "confirmados": 1
  },
  "SME-431606|Maternal I|Integral": {
    "inscritos": 9,
    "prioritarios": 4,
    "confirmados": 6
  },
  "SME-431606|Maternal II|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-431607|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-431608|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-431801|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-431802|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 5
  },
  "SME-431802|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-431803|Maternal II|Parcial": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-514009|Maternal II|Parcial": {
    "inscritos": 2,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-514009|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-514501|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-514601|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-514601|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-514602|Berçário|Integral": {
    "inscritos": 22,
    "prioritarios": 10,
    "confirmados": 10
  },
  "SME-514602|Maternal I|Integral": {
    "inscritos": 10,
    "prioritarios": 6,
    "confirmados": 6
  },
  "SME-514602|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-514603|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-514603|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-514604|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-514604|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-514605|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-514605|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-514605|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-514606|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 5,
    "confirmados": 6
  },
  "SME-514606|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 3,
    "confirmados": 3
  },
  "SME-514606|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-514607|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-514607|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-514607|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-514608|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 3,
    "confirmados": 1
  },
  "SME-514608|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-514608|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-514609|Berçário|Integral": {
    "inscritos": 8,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-514609|Maternal I|Integral": {
    "inscritos": 7,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-514609|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-514801|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-514801|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-514802|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-514802|Maternal II|Parcial": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-514803|Maternal II|Parcial": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-514803|Maternal II|Integral": {
    "inscritos": 5,
    "prioritarios": 3,
    "confirmados": 5
  },
  "SME-515015|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 3,
    "confirmados": 4
  },
  "SME-515021|Maternal II|Parcial": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-515021|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-515046|Maternal II|Integral": {
    "inscritos": 8,
    "prioritarios": 3,
    "confirmados": 8
  },
  "SME-515053|Maternal II|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-515064|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-515503|Maternal II|Integral": {
    "inscritos": 8,
    "prioritarios": 4,
    "confirmados": 8
  },
  "SME-515601|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-515601|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-515602|Berçário|Integral": {
    "inscritos": 16,
    "prioritarios": 4,
    "confirmados": 6
  },
  "SME-515602|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-515602|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-515604|Berçário|Integral": {
    "inscritos": 13,
    "prioritarios": 4,
    "confirmados": 6
  },
  "SME-515604|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-515604|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-515605|Berçário|Integral": {
    "inscritos": 8,
    "prioritarios": 5,
    "confirmados": 7
  },
  "SME-515605|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-515605|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-515606|Berçário|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-515606|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-515607|Maternal I|Integral": {
    "inscritos": 15,
    "prioritarios": 4,
    "confirmados": 8
  },
  "SME-515607|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 0
  },
  "SME-515608|Berçário|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-515608|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-515608|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-515610|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-515611|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-515611|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 1,
    "confirmados": 7
  },
  "SME-515611|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-515612|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-515612|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-515612|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-515613|Berçário|Integral": {
    "inscritos": 9,
    "prioritarios": 2,
    "confirmados": 7
  },
  "SME-515613|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-515613|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-515801|Berçário|Integral": {
    "inscritos": 16,
    "prioritarios": 6,
    "confirmados": 4
  },
  "SME-515801|Maternal I|Integral": {
    "inscritos": 14,
    "prioritarios": 5,
    "confirmados": 0
  },
  "SME-515801|Maternal II|Integral": {
    "inscritos": 8,
    "prioritarios": 4,
    "confirmados": 1
  },
  "SME-515802|Maternal II|Parcial": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-515803|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-515804|Maternal II|Integral": {
    "inscritos": 6,
    "prioritarios": 3,
    "confirmados": 6
  },
  "SME-515805|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-515807|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-515807|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-515808|Berçário|Integral": {
    "inscritos": 9,
    "prioritarios": 3,
    "confirmados": 8
  },
  "SME-515808|Maternal I|Integral": {
    "inscritos": 7,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-515809|Berçário|Integral": {
    "inscritos": 27,
    "prioritarios": 6,
    "confirmados": 7
  },
  "SME-515809|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-515809|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-515810|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-515810|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 3,
    "confirmados": 3
  },
  "SME-622202|Maternal I|Integral": {
    "inscritos": 16,
    "prioritarios": 5,
    "confirmados": 16
  },
  "SME-622202|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-622601|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 5
  },
  "SME-622601|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-622601|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-622602|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 2,
    "confirmados": 6
  },
  "SME-622602|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-622603|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 1,
    "confirmados": 6
  },
  "SME-622603|Maternal I|Parcial": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-622603|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-622603|Maternal II|Parcial": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-622603|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 1
  },
  "SME-622801|Maternal I|Integral": {
    "inscritos": 22,
    "prioritarios": 10,
    "confirmados": 7
  },
  "SME-622801|Maternal II|Integral": {
    "inscritos": 13,
    "prioritarios": 4,
    "confirmados": 8
  },
  "SME-622802|Maternal II|Integral": {
    "inscritos": 7,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-622804|Berçário|Integral": {
    "inscritos": 11,
    "prioritarios": 4,
    "confirmados": 8
  },
  "SME-622804|Maternal I|Integral": {
    "inscritos": 9,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-622804|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-622805|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-622805|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-622805|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-622810|Maternal II|Parcial": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-622810|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-625601|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 0,
    "confirmados": 5
  },
  "SME-625601|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-625601|Maternal II|Parcial": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-625601|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-625602|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-625602|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-625602|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-625603|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 1,
    "confirmados": 7
  },
  "SME-625603|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-625604|Berçário|Integral": {
    "inscritos": 14,
    "prioritarios": 4,
    "confirmados": 5
  },
  "SME-625604|Maternal I|Integral": {
    "inscritos": 13,
    "prioritarios": 4,
    "confirmados": 7
  },
  "SME-625604|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 0
  },
  "SME-625605|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-625605|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 4,
    "confirmados": 6
  },
  "SME-625605|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-625606|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 5
  },
  "SME-625606|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-625606|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-625607|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-625607|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-625608|Maternal I|Integral": {
    "inscritos": 7,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-625608|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-625609|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-625609|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 1
  },
  "SME-625610|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 3,
    "confirmados": 3
  },
  "SME-625610|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-625611|Berçário|Integral": {
    "inscritos": 10,
    "prioritarios": 5,
    "confirmados": 4
  },
  "SME-625611|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-625611|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-625612|Berçário|Integral": {
    "inscritos": 17,
    "prioritarios": 4,
    "confirmados": 11
  },
  "SME-625612|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 3,
    "confirmados": 3
  },
  "SME-625612|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-625614|Berçário|Integral": {
    "inscritos": 16,
    "prioritarios": 1,
    "confirmados": 14
  },
  "SME-625614|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 3,
    "confirmados": 7
  },
  "SME-625614|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-625615|Berçário|Parcial": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-625615|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-625615|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-625615|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-625616|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-625616|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-625801|Berçário|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-625801|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 3,
    "confirmados": 4
  },
  "SME-625801|Maternal II|Integral": {
    "inscritos": 5,
    "prioritarios": 3,
    "confirmados": 5
  },
  "SME-625802|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 1,
    "confirmados": 7
  },
  "SME-625802|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-625802|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-625803|Berçário|Integral": {
    "inscritos": 9,
    "prioritarios": 5,
    "confirmados": 6
  },
  "SME-625803|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-625803|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-625804|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-625804|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-625804|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-625807|Maternal II|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-625813|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-625814|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-625814|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-625814|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-625815|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 3,
    "confirmados": 5
  },
  "SME-625815|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-625815|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-625816|Berçário|Integral": {
    "inscritos": 16,
    "prioritarios": 5,
    "confirmados": 10
  },
  "SME-625816|Maternal I|Parcial": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-625816|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-625816|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-625817|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-625817|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-625817|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-625818|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-625818|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 3,
    "confirmados": 6
  },
  "SME-625818|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 3,
    "confirmados": 3
  },
  "SME-625819|Berçário|Integral": {
    "inscritos": 9,
    "prioritarios": 4,
    "confirmados": 7
  },
  "SME-625819|Maternal I|Integral": {
    "inscritos": 9,
    "prioritarios": 2,
    "confirmados": 7
  },
  "SME-625819|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-625820|Berçário|Integral": {
    "inscritos": 14,
    "prioritarios": 2,
    "confirmados": 10
  },
  "SME-625820|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-625820|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-716601|Maternal I|Integral": {
    "inscritos": 18,
    "prioritarios": 3,
    "confirmados": 7
  },
  "SME-716601|Maternal II|Integral": {
    "inscritos": 29,
    "prioritarios": 3,
    "confirmados": 0
  },
  "SME-716602|Maternal I|Parcial": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-716602|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-716602|Maternal II|Parcial": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-716602|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-716603|Berçário|Integral": {
    "inscritos": 11,
    "prioritarios": 4,
    "confirmados": 2
  },
  "SME-716603|Maternal I|Integral": {
    "inscritos": 12,
    "prioritarios": 3,
    "confirmados": 8
  },
  "SME-716603|Maternal II|Integral": {
    "inscritos": 9,
    "prioritarios": 4,
    "confirmados": 7
  },
  "SME-716604|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-716604|Maternal II|Parcial": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-716604|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-716605|Berçário|Integral": {
    "inscritos": 9,
    "prioritarios": 4,
    "confirmados": 6
  },
  "SME-716605|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-716605|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-716606|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 1,
    "confirmados": 6
  },
  "SME-716606|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-716606|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-716607|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-716607|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-716607|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-716608|Berçário|Integral": {
    "inscritos": 9,
    "prioritarios": 4,
    "confirmados": 7
  },
  "SME-716608|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-716608|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-716609|Berçário|Integral": {
    "inscritos": 30,
    "prioritarios": 8,
    "confirmados": 11
  },
  "SME-716609|Maternal I|Integral": {
    "inscritos": 19,
    "prioritarios": 7,
    "confirmados": 6
  },
  "SME-716609|Maternal II|Integral": {
    "inscritos": 21,
    "prioritarios": 5,
    "confirmados": 4
  },
  "SME-716610|Maternal I|Integral": {
    "inscritos": 7,
    "prioritarios": 2,
    "confirmados": 6
  },
  "SME-716610|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-716611|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-716611|Maternal II|Integral": {
    "inscritos": 7,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-716612|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-716612|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-716613|Berçário|Integral": {
    "inscritos": 20,
    "prioritarios": 3,
    "confirmados": 5
  },
  "SME-716613|Maternal I|Integral": {
    "inscritos": 25,
    "prioritarios": 5,
    "confirmados": 7
  },
  "SME-716613|Maternal II|Integral": {
    "inscritos": 13,
    "prioritarios": 4,
    "confirmados": 3
  },
  "SME-716614|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-716614|Maternal I|Integral": {
    "inscritos": 10,
    "prioritarios": 1,
    "confirmados": 6
  },
  "SME-716614|Maternal II|Integral": {
    "inscritos": 7,
    "prioritarios": 3,
    "confirmados": 5
  },
  "SME-716801|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 1
  },
  "SME-716801|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-716801|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-716802|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 3,
    "confirmados": 2
  },
  "SME-716802|Maternal II|Integral": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-716803|Berçário|Integral": {
    "inscritos": 8,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-716803|Maternal I|Integral": {
    "inscritos": 15,
    "prioritarios": 6,
    "confirmados": 6
  },
  "SME-716803|Maternal II|Integral": {
    "inscritos": 9,
    "prioritarios": 3,
    "confirmados": 7
  },
  "SME-716804|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-716804|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-716805|Maternal II|Integral": {
    "inscritos": 18,
    "prioritarios": 3,
    "confirmados": 7
  },
  "SME-716806|Berçário|Integral": {
    "inscritos": 8,
    "prioritarios": 4,
    "confirmados": 4
  },
  "SME-716806|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-716806|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-716807|Berçário|Integral": {
    "inscritos": 19,
    "prioritarios": 7,
    "confirmados": 9
  },
  "SME-716807|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-716807|Maternal II|Integral": {
    "inscritos": 8,
    "prioritarios": 4,
    "confirmados": 7
  },
  "SME-716808|Berçário|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-716808|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-716808|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-716809|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-716809|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-716809|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-716812|Berçário|Integral": {
    "inscritos": 19,
    "prioritarios": 6,
    "confirmados": 6
  },
  "SME-716812|Maternal I|Integral": {
    "inscritos": 11,
    "prioritarios": 3,
    "confirmados": 5
  },
  "SME-716812|Maternal II|Integral": {
    "inscritos": 13,
    "prioritarios": 4,
    "confirmados": 4
  },
  "SME-716813|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-716813|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-716813|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 1
  },
  "SME-716814|Maternal I|Integral": {
    "inscritos": 11,
    "prioritarios": 4,
    "confirmados": 6
  },
  "SME-716814|Maternal II|Integral": {
    "inscritos": 6,
    "prioritarios": 3,
    "confirmados": 1
  },
  "SME-716815|Maternal I|Parcial": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-716815|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 0,
    "confirmados": 5
  },
  "SME-716815|Maternal II|Parcial": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-716815|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-716816|Maternal I|Integral": {
    "inscritos": 11,
    "prioritarios": 6,
    "confirmados": 5
  },
  "SME-716816|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-716818|Berçário|Integral": {
    "inscritos": 15,
    "prioritarios": 2,
    "confirmados": 9
  },
  "SME-716818|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-716818|Maternal II|Integral": {
    "inscritos": 8,
    "prioritarios": 4,
    "confirmados": 5
  },
  "SME-716819|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 0,
    "confirmados": 5
  },
  "SME-716819|Maternal I|Integral": {
    "inscritos": 7,
    "prioritarios": 3,
    "confirmados": 5
  },
  "SME-716819|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-716820|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 1
  },
  "SME-716820|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-716820|Maternal II|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-716821|Berçário|Integral": {
    "inscritos": 12,
    "prioritarios": 5,
    "confirmados": 5
  },
  "SME-716821|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 2,
    "confirmados": 7
  },
  "SME-716821|Maternal II|Integral": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 5
  },
  "SME-716822|Berçário|Integral": {
    "inscritos": 12,
    "prioritarios": 3,
    "confirmados": 11
  },
  "SME-716822|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 5
  },
  "SME-716822|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-716824|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 3,
    "confirmados": 6
  },
  "SME-716824|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-724601|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-724601|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-724601|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-724602|Berçário|Integral": {
    "inscritos": 10,
    "prioritarios": 2,
    "confirmados": 7
  },
  "SME-724603|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 4,
    "confirmados": 3
  },
  "SME-724603|Maternal II|Parcial": {
    "inscritos": 9,
    "prioritarios": 1,
    "confirmados": 7
  },
  "SME-724603|Maternal II|Integral": {
    "inscritos": 8,
    "prioritarios": 1,
    "confirmados": 6
  },
  "SME-724604|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-724604|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-724605|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-724605|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-724605|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-724606|Berçário|Integral": {
    "inscritos": 9,
    "prioritarios": 2,
    "confirmados": 6
  },
  "SME-724606|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-724606|Maternal II|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 1
  },
  "SME-724801|Berçário|Integral": {
    "inscritos": 11,
    "prioritarios": 2,
    "confirmados": 11
  },
  "SME-724801|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-724801|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-724802|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 0,
    "confirmados": 6
  },
  "SME-724802|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-724803|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-724803|Maternal II|Integral": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 5
  },
  "SME-724804|Maternal I|Integral": {
    "inscritos": 18,
    "prioritarios": 4,
    "confirmados": 12
  },
  "SME-724804|Maternal II|Integral": {
    "inscritos": 10,
    "prioritarios": 2,
    "confirmados": 8
  },
  "SME-724805|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-724805|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-724806|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-724806|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-724807|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-724807|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-724807|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-724808|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-724808|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-724809|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-724809|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-734601|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-734601|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-734602|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-734602|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-734603|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-734603|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-734801|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-734801|Maternal II|Integral": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-734802|Berçário|Integral": {
    "inscritos": 22,
    "prioritarios": 8,
    "confirmados": 5
  },
  "SME-734802|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-734803|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-734804|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-734804|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-734805|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-734805|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-817202|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-817202|Maternal II|Integral": {
    "inscritos": 7,
    "prioritarios": 1,
    "confirmados": 6
  },
  "SME-817504|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-817504|Maternal II|Parcial": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-817504|Maternal II|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-817505|Maternal II|Parcial": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-817601|Berçário|Parcial": {
    "inscritos": 16,
    "prioritarios": 3,
    "confirmados": 12
  },
  "SME-817601|Maternal I|Parcial": {
    "inscritos": 8,
    "prioritarios": 1,
    "confirmados": 8
  },
  "SME-817601|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-817601|Maternal II|Parcial": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-817602|Berçário|Parcial": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-817602|Berçário|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-817602|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-817602|Maternal II|Parcial": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-817602|Maternal II|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 1
  },
  "SME-817603|Berçário|Parcial": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-817603|Berçário|Integral": {
    "inscritos": 13,
    "prioritarios": 4,
    "confirmados": 8
  },
  "SME-817603|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-817603|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-817604|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-817604|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-817605|Berçário|Parcial": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-817605|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-817605|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-817606|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-817606|Maternal II|Integral": {
    "inscritos": 5,
    "prioritarios": 3,
    "confirmados": 2
  },
  "SME-817607|Berçário|Parcial": {
    "inscritos": 17,
    "prioritarios": 7,
    "confirmados": 8
  },
  "SME-817607|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-817607|Maternal I|Parcial": {
    "inscritos": 15,
    "prioritarios": 6,
    "confirmados": 12
  },
  "SME-817607|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 3,
    "confirmados": 6
  },
  "SME-817607|Maternal II|Parcial": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-817607|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-817608|Maternal I|Parcial": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-817608|Maternal II|Parcial": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-817609|Berçário|Parcial": {
    "inscritos": 8,
    "prioritarios": 1,
    "confirmados": 7
  },
  "SME-817609|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-817609|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-817609|Maternal II|Parcial": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-817610|Maternal I|Parcial": {
    "inscritos": 6,
    "prioritarios": 0,
    "confirmados": 5
  },
  "SME-817610|Maternal II|Parcial": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-817611|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-817611|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-817612|Berçário|Parcial": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-817612|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-817612|Maternal I|Parcial": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-817612|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-817612|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-817613|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 3,
    "confirmados": 4
  },
  "SME-817613|Maternal II|Parcial": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-817613|Maternal II|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-817614|Berçário|Parcial": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-817614|Maternal I|Parcial": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-817614|Maternal II|Parcial": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-817615|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-817616|Maternal I|Parcial": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-817616|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-817617|Berçário|Parcial": {
    "inscritos": 8,
    "prioritarios": 3,
    "confirmados": 7
  },
  "SME-817617|Berçário|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-817617|Maternal I|Parcial": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-817617|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-817617|Maternal II|Parcial": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-817618|Maternal I|Parcial": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-817618|Maternal II|Parcial": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-817619|Berçário|Parcial": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-817619|Berçário|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-817619|Maternal I|Parcial": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-817801|Berçário|Parcial": {
    "inscritos": 11,
    "prioritarios": 4,
    "confirmados": 6
  },
  "SME-817801|Maternal I|Integral": {
    "inscritos": 12,
    "prioritarios": 4,
    "confirmados": 4
  },
  "SME-817801|Maternal II|Parcial": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-817801|Maternal II|Integral": {
    "inscritos": 8,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-817802|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-817802|Maternal II|Parcial": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-817802|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-817803|Berçário|Parcial": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-817803|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-817803|Maternal I|Parcial": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-817803|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-817803|Maternal II|Parcial": {
    "inscritos": 4,
    "prioritarios": 3,
    "confirmados": 4
  },
  "SME-817803|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-817804|Berçário|Integral": {
    "inscritos": 11,
    "prioritarios": 2,
    "confirmados": 8
  },
  "SME-817804|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-817804|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-817805|Maternal I|Integral": {
    "inscritos": 9,
    "prioritarios": 1,
    "confirmados": 9
  },
  "SME-817805|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-817806|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-817806|Maternal I|Parcial": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-817806|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-817806|Maternal II|Parcial": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-817807|Berçário|Parcial": {
    "inscritos": 12,
    "prioritarios": 1,
    "confirmados": 11
  },
  "SME-817807|Berçário|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-817807|Maternal I|Parcial": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-817807|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-817808|Berçário|Parcial": {
    "inscritos": 11,
    "prioritarios": 1,
    "confirmados": 8
  },
  "SME-817808|Berçário|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-817808|Maternal I|Parcial": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-817808|Maternal I|Integral": {
    "inscritos": 11,
    "prioritarios": 5,
    "confirmados": 9
  },
  "SME-817808|Maternal II|Parcial": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-817808|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-817809|Maternal II|Parcial": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-817809|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-817810|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-817810|Maternal II|Parcial": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-817814|Berçário|Parcial": {
    "inscritos": 8,
    "prioritarios": 3,
    "confirmados": 7
  },
  "SME-817814|Maternal I|Parcial": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-817814|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-817814|Maternal II|Parcial": {
    "inscritos": 9,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-817814|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-817815|Berçário|Parcial": {
    "inscritos": 8,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-817815|Maternal I|Parcial": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-817815|Maternal II|Parcial": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-817815|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-833505|Maternal II|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-833601|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 4,
    "confirmados": 2
  },
  "SME-833601|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-833601|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-833602|Berçário|Integral": {
    "inscritos": 8,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-833602|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-833602|Maternal II|Integral": {
    "inscritos": 6,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-833603|Berçário|Integral": {
    "inscritos": 28,
    "prioritarios": 10,
    "confirmados": 17
  },
  "SME-833603|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-833801|Berçário|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-833801|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-833802|Berçário|Parcial": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-833802|Berçário|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-833802|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-833802|Maternal II|Parcial": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-833803|Maternal I|Integral": {
    "inscritos": 12,
    "prioritarios": 3,
    "confirmados": 7
  },
  "SME-833803|Maternal II|Integral": {
    "inscritos": 7,
    "prioritarios": 1,
    "confirmados": 6
  },
  "SME-833805|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-833806|Berçário|Parcial": {
    "inscritos": 6,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-833806|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-833806|Maternal I|Parcial": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-833806|Maternal I|Integral": {
    "inscritos": 10,
    "prioritarios": 6,
    "confirmados": 8
  },
  "SME-833806|Maternal II|Parcial": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-833806|Maternal II|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-833807|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 4,
    "confirmados": 2
  },
  "SME-833807|Maternal I|Integral": {
    "inscritos": 7,
    "prioritarios": 3,
    "confirmados": 4
  },
  "SME-833807|Maternal II|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-833808|Berçário|Parcial": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-833808|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-833808|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-833809|Berçário|Parcial": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-833809|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-833809|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-833809|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-833810|Berçário|Integral": {
    "inscritos": 9,
    "prioritarios": 2,
    "confirmados": 6
  },
  "SME-833810|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-833811|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 4,
    "confirmados": 0
  },
  "SME-833811|Maternal I|Integral": {
    "inscritos": 13,
    "prioritarios": 7,
    "confirmados": 8
  },
  "SME-833811|Maternal II|Integral": {
    "inscritos": 12,
    "prioritarios": 5,
    "confirmados": 11
  },
  "SME-918601|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-918601|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-918601|Maternal II|Integral": {
    "inscritos": 5,
    "prioritarios": 3,
    "confirmados": 4
  },
  "SME-918602|Maternal I|Parcial": {
    "inscritos": 5,
    "prioritarios": 3,
    "confirmados": 5
  },
  "SME-918602|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-918602|Maternal II|Parcial": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-918602|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-918603|Maternal I|Parcial": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-918603|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-918603|Maternal II|Parcial": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-918604|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-918605|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-918606|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-918606|Maternal II|Parcial": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-918606|Maternal II|Integral": {
    "inscritos": 6,
    "prioritarios": 3,
    "confirmados": 6
  },
  "SME-918607|Berçário|Integral": {
    "inscritos": 15,
    "prioritarios": 4,
    "confirmados": 13
  },
  "SME-918607|Maternal I|Integral": {
    "inscritos": 7,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-918607|Maternal II|Integral": {
    "inscritos": 7,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-918608|Maternal I|Parcial": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-918608|Maternal II|Parcial": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-918608|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-918609|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 1
  },
  "SME-918609|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-918610|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-918610|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-918611|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-918611|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-918613|Berçário|Integral": {
    "inscritos": 8,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-918613|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-918613|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-918614|Berçário|Parcial": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-918614|Berçário|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-918614|Maternal I|Parcial": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-918614|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-918614|Maternal II|Parcial": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-918614|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-918615|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-918615|Maternal II|Parcial": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-918615|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-918616|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-918616|Maternal I|Integral": {
    "inscritos": 10,
    "prioritarios": 5,
    "confirmados": 8
  },
  "SME-918616|Maternal II|Parcial": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-918616|Maternal II|Integral": {
    "inscritos": 7,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-918617|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-918617|Maternal I|Parcial": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-918617|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-918617|Maternal II|Parcial": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-918618|Maternal I|Parcial": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-918618|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-918618|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-918619|Berçário|Integral": {
    "inscritos": 17,
    "prioritarios": 6,
    "confirmados": 11
  },
  "SME-918619|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 3,
    "confirmados": 7
  },
  "SME-918619|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-918620|Berçário|Integral": {
    "inscritos": 13,
    "prioritarios": 4,
    "confirmados": 2
  },
  "SME-918620|Maternal I|Parcial": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-918620|Maternal I|Integral": {
    "inscritos": 7,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-918621|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-918621|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-918621|Maternal II|Parcial": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-918621|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-918801|Berçário|Parcial": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-918801|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-918801|Maternal I|Parcial": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-918801|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-918801|Maternal II|Parcial": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-918801|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-918802|Berçário|Parcial": {
    "inscritos": 8,
    "prioritarios": 4,
    "confirmados": 7
  },
  "SME-918802|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-918802|Maternal I|Parcial": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-918802|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-918802|Maternal II|Parcial": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-918803|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-918803|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-918804|Maternal II|Parcial": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-918805|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 0,
    "confirmados": 6
  },
  "SME-918805|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-918805|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-918806|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-918806|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-918807|Berçário|Integral": {
    "inscritos": 15,
    "prioritarios": 4,
    "confirmados": 13
  },
  "SME-918807|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-918808|Berçário|Integral": {
    "inscritos": 8,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-918808|Maternal I|Integral": {
    "inscritos": 9,
    "prioritarios": 3,
    "confirmados": 5
  },
  "SME-918808|Maternal II|Integral": {
    "inscritos": 6,
    "prioritarios": 3,
    "confirmados": 4
  },
  "SME-918810|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-918810|Maternal II|Parcial": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-918810|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-918811|Maternal I|Parcial": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-918811|Maternal II|Parcial": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-918812|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-918812|Maternal II|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-918813|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-918813|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-918813|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 1
  },
  "SME-918814|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-918814|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-918814|Maternal II|Parcial": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-918814|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-918815|Berçário|Integral": {
    "inscritos": 9,
    "prioritarios": 3,
    "confirmados": 6
  },
  "SME-918815|Maternal I|Parcial": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-918815|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 0,
    "confirmados": 5
  },
  "SME-918815|Maternal II|Parcial": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-918815|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-918816|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-918817|Berçário|Parcial": {
    "inscritos": 8,
    "prioritarios": 1,
    "confirmados": 8
  },
  "SME-918817|Berçário|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-918817|Maternal I|Parcial": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-918817|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 0,
    "confirmados": 5
  },
  "SME-918817|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-918818|Maternal I|Parcial": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-918818|Maternal II|Parcial": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-918818|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-918819|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-918820|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-918821|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-918821|Maternal II|Integral": {
    "inscritos": 7,
    "prioritarios": 4,
    "confirmados": 3
  },
  "SME-918822|Berçário|Parcial": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-918822|Berçário|Integral": {
    "inscritos": 2,
    "prioritarios": 2,
    "confirmados": 1
  },
  "SME-918822|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-918822|Maternal II|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-918823|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-918823|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-918824|Berçário|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-918824|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 3,
    "confirmados": 1
  },
  "SME-918824|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 0
  },
  "SME-918825|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-918825|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-918825|Maternal II|Parcial": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-918825|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-918826|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 6
  },
  "SME-918826|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-918826|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-918827|Berçário|Integral": {
    "inscritos": 8,
    "prioritarios": 2,
    "confirmados": 7
  },
  "SME-918827|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-918827|Maternal II|Parcial": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-918827|Maternal II|Integral": {
    "inscritos": 5,
    "prioritarios": 3,
    "confirmados": 5
  },
  "SME-918828|Berçário|Integral": {
    "inscritos": 9,
    "prioritarios": 3,
    "confirmados": 7
  },
  "SME-918828|Maternal I|Integral": {
    "inscritos": 7,
    "prioritarios": 0,
    "confirmados": 5
  },
  "SME-918828|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-918829|Berçário|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-918829|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 6
  },
  "SME-918829|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-918830|Maternal I|Parcial": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-918831|Berçário|Integral": {
    "inscritos": 9,
    "prioritarios": 2,
    "confirmados": 9
  },
  "SME-918831|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-918831|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-918832|Berçário|Parcial": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-918832|Berçário|Integral": {
    "inscritos": 27,
    "prioritarios": 8,
    "confirmados": 12
  },
  "SME-918832|Maternal I|Integral": {
    "inscritos": 7,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-918832|Maternal II|Parcial": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-918832|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-918833|Berçário|Integral": {
    "inscritos": 8,
    "prioritarios": 3,
    "confirmados": 6
  },
  "SME-918833|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-918833|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-918834|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-918834|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-918834|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-918835|Berçário|Integral": {
    "inscritos": 10,
    "prioritarios": 2,
    "confirmados": 9
  },
  "SME-918835|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-918835|Maternal II|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-918836|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-918836|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-918836|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-918837|Berçário|Integral": {
    "inscritos": 11,
    "prioritarios": 2,
    "confirmados": 6
  },
  "SME-918837|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-918837|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-918838|Maternal I|Parcial": {
    "inscritos": 4,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-918838|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-918838|Maternal II|Parcial": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-918838|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-918839|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-1019601|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-1019602|Berçário|Integral": {
    "inscritos": 14,
    "prioritarios": 4,
    "confirmados": 14
  },
  "SME-1019602|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-1019602|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-1019603|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-1019604|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 3,
    "confirmados": 5
  },
  "SME-1019604|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-1019605|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-1019605|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-1019606|Maternal I|Parcial": {
    "inscritos": 7,
    "prioritarios": 2,
    "confirmados": 6
  },
  "SME-1019606|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-1019606|Maternal II|Parcial": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-1019606|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-1019607|Maternal I|Integral": {
    "inscritos": 13,
    "prioritarios": 3,
    "confirmados": 8
  },
  "SME-1019607|Maternal II|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 0
  },
  "SME-1019609|Berçário|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-1019609|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-1019610|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-1019610|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-1019611|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 6
  },
  "SME-1019611|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-1019612|Berçário|Integral": {
    "inscritos": 19,
    "prioritarios": 4,
    "confirmados": 18
  },
  "SME-1019612|Maternal I|Integral": {
    "inscritos": 10,
    "prioritarios": 3,
    "confirmados": 5
  },
  "SME-1019613|Maternal I|Parcial": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-1019613|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 0,
    "confirmados": 6
  },
  "SME-1019613|Maternal II|Parcial": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-1019614|Berçário|Integral": {
    "inscritos": 15,
    "prioritarios": 4,
    "confirmados": 7
  },
  "SME-1019614|Maternal I|Integral": {
    "inscritos": 10,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-1019614|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 1
  },
  "SME-1019615|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-1019616|Maternal I|Integral": {
    "inscritos": 7,
    "prioritarios": 2,
    "confirmados": 7
  },
  "SME-1019616|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-1019618|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-1019618|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-1019619|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-1019620|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 3,
    "confirmados": 2
  },
  "SME-1019620|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-1019621|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-1019621|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-1019623|Berçário|Integral": {
    "inscritos": 10,
    "prioritarios": 3,
    "confirmados": 9
  },
  "SME-1019623|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-1019623|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-1019624|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-1019625|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-1019626|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-1019626|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-1019627|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-1019627|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-1019628|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-1019628|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-1019628|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-1019630|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-1019630|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-1019631|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-1019631|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-1019631|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-1019632|Berçário|Integral": {
    "inscritos": 15,
    "prioritarios": 6,
    "confirmados": 6
  },
  "SME-1019632|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-1019632|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-1019801|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-1019801|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-1019801|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-1019802|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 3,
    "confirmados": 4
  },
  "SME-1019802|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-1019803|Berçário|Integral": {
    "inscritos": 9,
    "prioritarios": 2,
    "confirmados": 7
  },
  "SME-1019803|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 4,
    "confirmados": 8
  },
  "SME-1019803|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-1019804|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-1019806|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-1019806|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-1019807|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-1019807|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-1019808|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-1019808|Maternal II|Integral": {
    "inscritos": 7,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-1019809|Berçário|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-1019809|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-1019810|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-1019810|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-1019811|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-1019815|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-1019815|Maternal II|Parcial": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-1019815|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-1019818|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-1019820|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-1019820|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-1019821|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 1,
    "confirmados": 6
  },
  "SME-1019821|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-1019822|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-1019822|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-1019824|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-1019826|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 2,
    "confirmados": 6
  },
  "SME-1019826|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 0
  },
  "SME-1019826|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-1019827|Berçário|Integral": {
    "inscritos": 6,
    "prioritarios": 0,
    "confirmados": 5
  },
  "SME-1019827|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-1019828|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-1019828|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-1019828|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-1019829|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-1019829|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-1019830|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-1019830|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-1019830|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-1019831|Berçário|Integral": {
    "inscritos": 13,
    "prioritarios": 2,
    "confirmados": 11
  },
  "SME-1019831|Maternal I|Integral": {
    "inscritos": 10,
    "prioritarios": 3,
    "confirmados": 7
  },
  "SME-1019831|Maternal II|Integral": {
    "inscritos": 6,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-1026601|Berçário|Parcial": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-1026601|Maternal I|Parcial": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 0
  },
  "SME-1026601|Maternal II|Parcial": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-1026601|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-1026602|Maternal I|Integral": {
    "inscritos": 7,
    "prioritarios": 1,
    "confirmados": 5
  },
  "SME-1026602|Maternal II|Integral": {
    "inscritos": 7,
    "prioritarios": 3,
    "confirmados": 1
  },
  "SME-1026603|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-1026603|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-1026604|Berçário|Parcial": {
    "inscritos": 14,
    "prioritarios": 5,
    "confirmados": 9
  },
  "SME-1026604|Maternal I|Parcial": {
    "inscritos": 7,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-1026604|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-1026604|Maternal II|Parcial": {
    "inscritos": 5,
    "prioritarios": 0,
    "confirmados": 4
  },
  "SME-1026604|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-1026801|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-1026802|Berçário|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-1026802|Maternal I|Integral": {
    "inscritos": 7,
    "prioritarios": 2,
    "confirmados": 7
  },
  "SME-1026802|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-1026803|Maternal II|Parcial": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 4
  },
  "SME-1026803|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-1026805|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-1026805|Maternal I|Integral": {
    "inscritos": 9,
    "prioritarios": 2,
    "confirmados": 1
  },
  "SME-1026805|Maternal II|Integral": {
    "inscritos": 11,
    "prioritarios": 3,
    "confirmados": 3
  },
  "SME-1026806|Berçário|Integral": {
    "inscritos": 9,
    "prioritarios": 5,
    "confirmados": 6
  },
  "SME-1026806|Maternal I|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-1026806|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-1026807|Berçário|Integral": {
    "inscritos": 7,
    "prioritarios": 2,
    "confirmados": 6
  },
  "SME-1026807|Maternal I|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 2
  },
  "SME-1026807|Maternal II|Integral": {
    "inscritos": 8,
    "prioritarios": 2,
    "confirmados": 7
  },
  "SME-1026809|Berçário|Integral": {
    "inscritos": 8,
    "prioritarios": 4,
    "confirmados": 7
  },
  "SME-1026809|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 0,
    "confirmados": 3
  },
  "SME-1026810|Berçário|Integral": {
    "inscritos": 10,
    "prioritarios": 2,
    "confirmados": 6
  },
  "SME-1026810|Maternal I|Integral": {
    "inscritos": 10,
    "prioritarios": 2,
    "confirmados": 6
  },
  "SME-1026810|Maternal II|Integral": {
    "inscritos": 10,
    "prioritarios": 3,
    "confirmados": 6
  },
  "SME-1120201|Maternal II|Integral": {
    "inscritos": 6,
    "prioritarios": 2,
    "confirmados": 5
  },
  "SME-1120601|Berçário|Integral": {
    "inscritos": 12,
    "prioritarios": 3,
    "confirmados": 6
  },
  "SME-1120601|Maternal I|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 1
  },
  "SME-1120601|Maternal II|Integral": {
    "inscritos": 6,
    "prioritarios": 1,
    "confirmados": 6
  },
  "SME-1120602|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-1120602|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 0,
    "confirmados": 5
  },
  "SME-1120602|Maternal II|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-1120603|Berçário|Integral": {
    "inscritos": 11,
    "prioritarios": 2,
    "confirmados": 10
  },
  "SME-1120603|Maternal I|Integral": {
    "inscritos": 8,
    "prioritarios": 3,
    "confirmados": 7
  },
  "SME-1120603|Maternal II|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-1120604|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 2,
    "confirmados": 4
  },
  "SME-1120604|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 2
  },
  "SME-1120604|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-1120605|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-1120605|Maternal I|Integral": {
    "inscritos": 9,
    "prioritarios": 3,
    "confirmados": 3
  },
  "SME-1120605|Maternal II|Integral": {
    "inscritos": 6,
    "prioritarios": 1,
    "confirmados": 3
  },
  "SME-1120606|Berçário|Integral": {
    "inscritos": 16,
    "prioritarios": 2,
    "confirmados": 14
  },
  "SME-1120606|Maternal I|Integral": {
    "inscritos": 6,
    "prioritarios": 4,
    "confirmados": 6
  },
  "SME-1120606|Maternal II|Integral": {
    "inscritos": 4,
    "prioritarios": 2,
    "confirmados": 3
  },
  "SME-1120801|Berçário|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-1120801|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 1,
    "confirmados": 1
  },
  "SME-1120801|Maternal II|Integral": {
    "inscritos": 2,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-1120802|Berçário|Integral": {
    "inscritos": 3,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-1120802|Maternal I|Integral": {
    "inscritos": 2,
    "prioritarios": 1,
    "confirmados": 2
  },
  "SME-1120804|Berçário|Integral": {
    "inscritos": 5,
    "prioritarios": 3,
    "confirmados": 4
  },
  "SME-1120804|Maternal I|Integral": {
    "inscritos": 1,
    "prioritarios": 0,
    "confirmados": 1
  },
  "SME-1120804|Maternal II|Integral": {
    "inscritos": 3,
    "prioritarios": 2,
    "confirmados": 1
  }
};

export function chaveOferta(unidadeId: string, grupamento: Grupamento, horario: Horario): string {
  return `${unidadeId}|${grupamento}|${horario}`;
}
