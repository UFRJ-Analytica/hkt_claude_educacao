// PLACEHOLDER — substituído por integracao-sme/build_inscritos.py (agregado no BigQuery, sem LIMIT).
// Enquanto `gerado` for false, o perfil da creche usa as contagens de unidades.generated.ts.
import type { Grupamento, Horario } from '../api/types';

export interface FilaOferta {
  inscritos: number;
  prioritarios: number;
  confirmados: number;
  /** Quantos escolheram esta unidade como 1ª, 2ª, … 5ª opção (quando a fonte traz `opcao`). */
  porOpcao?: number[];
}

export const INSCRITOS_META = {
  gerado: false,
  generated_at: null as string | null,
  source_id: 'rio-sme.sme_creche.inscricoes_completa',
  query: null as string | null,
  ofertas: 0,
  inscricoes: 0,
};

/** Chave: `${unidadeId}|${grupamento}|${horario}` */
export const FILA_POR_OFERTA: Record<string, FilaOferta> = {};

export function chaveOferta(unidadeId: string, grupamento: Grupamento, horario: Horario): string {
  return `${unidadeId}|${grupamento}|${horario}`;
}
