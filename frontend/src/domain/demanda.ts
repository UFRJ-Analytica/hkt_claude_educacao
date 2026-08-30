import type { Demanda, Oferta } from '../api/types';

export function classificarDemanda(inscritos: number, vagas: number): Demanda {
  if (vagas <= 0) return 'alta';
  const r = inscritos / vagas;
  if (r < 0.9) return 'baixa';
  if (r < 1.8) return 'media';
  return 'alta';
}

export const DEMANDA_LABEL: Record<Demanda, string> = {
  baixa: 'Demanda baixa',
  media: 'Demanda média',
  alta: 'Demanda alta',
};

export const DEMANDA_DICA: Record<Demanda, string> = {
  baixa: 'Menos inscritos que vagas: boa chance de vaga.',
  media: 'Mais inscritos que vagas: a pontuação decide.',
  alta: 'Muito mais inscritos que vagas: coloque também opções com demanda menor.',
};

export const DEMANDA_CLASS: Record<Demanda, string> = {
  baixa: 'text-demand-low bg-demand-low-soft',
  media: 'text-demand-mid bg-demand-mid-soft',
  alta: 'text-demand-high bg-demand-high-soft',
};

export const DEMANDA_PIN: Record<Demanda, 'low' | 'mid' | 'high'> = { baixa: 'low', media: 'mid', alta: 'high' };

/** Estimativa honesta e simples: quantos inscritos por vaga naquela oferta. */
export function descreverOferta(o: Oferta): string {
  const gerais = Math.max(0, o.vagas - o.vagasPrioritarias);
  return `${o.vagas} vagas (${o.vagasPrioritarias} prioritárias, ${gerais} gerais) · ${o.inscritos} inscritos`;
}
