import type { Unidade } from '../api/types';
import { UNIDADES_GERADAS } from './unidades.generated';

/**
 * Rede de creches do app — dados do BigQuery, não mais sintéticos.
 *
 * A fonte é `unidades.generated.ts`, produzido por
 * `integracao-sme/build_unidades.py` a partir da tabela
 * `rio-sme.sme_creche.inscricoes_completa`
 * (`SELECT * FROM rio-sme.sme_creche.inscricoes_completa LIMIT 1000`).
 *
 * Georreferência, bairro, grupamento, horário e contagens de inscritos são
 * REAIS sobre o extrato; a oferta de vagas é DERIVADA por código determinístico
 * (a tabela de inscrições não traz oferta); o extrato em si é o dado sintético
 * anonimizado da SME (`_synthetic=true`). Proveniência campo a campo em
 * `META.provenance` e em `integracao-sme/out/PROVENANCE_unidades.md`.
 *
 * O gerador sintético que vivia aqui foi removido: a rede não é mais inventada
 * no navegador. Para atualizar os dados, rode o pipeline:
 *
 *   uv run --project backend python integracao-sme/extract.py
 *   uv run --project backend python integracao-sme/build_unidades.py
 *
 * A assinatura exportada é a mesma de sempre — nenhuma tela muda.
 */

if (UNIDADES_GERADAS.length === 0) {
  throw new Error(
    'unidades.generated.ts está vazio: rode integracao-sme/extract.py e build_unidades.py para puxar os dados do BigQuery.',
  );
}

export function todasUnidades(): Unidade[] {
  return UNIDADES_GERADAS;
}

export function unidadePorId(id: string): Unidade | null {
  return UNIDADES_GERADAS.find((u) => u.id === id) ?? null;
}
