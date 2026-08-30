import { RISCO_META, RISCO_POR_UNIDADE, type RiscoUnidade } from './risco.generated';

/**
 * Risco de não-alocação por unidade, previsto pelo modelo BQML
 * `rio-sme.sme_creche.modelo_risco_alocacao_xgb` (XGBoost) sobre a tabela
 * `inscricoes_completa` do BigQuery. Gerado por integracao-sme/build_risco.py.
 *
 * DERIVADO DE SINTÉTICO: o modelo aprendeu sobre o extrato anonimizado/
 * sintético — o aviso demonstra o mecanismo e não é estatística oficial.
 */

export type { RiscoUnidade } from './risco.generated';
export { RISCO_META } from './risco.generated';

/** Risco previsto para a unidade, ou null se ela não tem base suficiente. */
export function riscoDaUnidade(unidadeId: string): RiscoUnidade | null {
  return RISCO_POR_UNIDADE[unidadeId] ?? null;
}

/** Percentual legível, ex.: 0.5432 → "54%". */
export function percentualRisco(r: RiscoUnidade): string {
  return `${Math.round(r.risco * 100)}%`;
}

/** Nota de proveniência exibida junto do aviso. */
export const NOTA_RISCO = RISCO_META.aviso;
