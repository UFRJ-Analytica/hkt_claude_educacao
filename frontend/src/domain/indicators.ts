/**
 * Regras de APRESENTAÇÃO. Não são regras de negócio.
 *
 * O front-end não calcula indicador nem priorização governada: os valores vêm
 * do backend determinístico. O que existe aqui é o limiar VISUAL usado para
 * pintar um ponto no mapa e uma barra na tabela — e todo limiar é publicado
 * na legenda da própria tela, para que a leitura seja verificável.
 */

import type { IndicatorId, MetricMap, SchoolMetric } from '../api/types';

export type Attention = 'none' | 'low' | 'attention' | 'critical' | 'degraded' | 'unreadable';

export interface IndicatorSpec {
  id: IndicatorId;
  label: string;
  short: string;
  unit: 'ratio' | 'points';
  /** Direção que pede atenção. */
  worse: 'low' | 'high';
  /** Limiares publicados na legenda, do menos ao mais grave. */
  thresholds: [number, number, number];
  scale: [number, number];
  format: (v: number) => string;
}

const pct = (v: number) => `${(v * 100).toFixed(1).replace('.', ',')}%`;

export const INDICATORS: Record<IndicatorId, IndicatorSpec> = {
  attendance_rate: {
    id: 'attendance_rate',
    label: 'Frequência',
    short: 'Freq.',
    unit: 'ratio',
    worse: 'low',
    thresholds: [0.94, 0.92, 0.9],
    scale: [0.86, 0.98],
    format: pct,
  },
  teacher_shortage_rate: {
    id: 'teacher_shortage_rate',
    label: 'Carência docente',
    short: 'Carência',
    unit: 'ratio',
    worse: 'high',
    thresholds: [0.06, 0.1, 0.15],
    scale: [0, 0.26],
    format: pct,
  },
  capacity_utilization: {
    id: 'capacity_utilization',
    label: 'Ocupação',
    short: 'Ocupação',
    unit: 'ratio',
    worse: 'high',
    thresholds: [0.95, 1.0, 1.05],
    scale: [0.6, 1.2],
    format: pct,
  },
  assessment_score: {
    id: 'assessment_score',
    label: 'Desempenho',
    short: 'Desemp.',
    unit: 'points',
    worse: 'low',
    thresholds: [214, 205, 196],
    scale: [180, 250],
    // Escala de proficiência, não percentual. Sem a unidade, "219,2" ao lado de
    // "95,0%" não diz em que régua está — e a régua é o que dá sentido ao número.
    format: (v) => `${v.toFixed(1).replace('.', ',')} pts`,
  },
};

/**
 * Acerto por descritor. Não está em `IndicatorId` porque o backend ainda não o
 * emite; vive à parte até `skill_mastery_rate` entrar no contrato de analytics.
 * Os limiares seguem a mesma regra dos outros: publicados na legenda da tela.
 */
export const SKILL_MASTERY: IndicatorSpec = {
  id: 'assessment_score' as IndicatorId,
  label: 'Acerto por descritor',
  short: 'Acerto',
  unit: 'ratio',
  worse: 'low',
  thresholds: [0.7, 0.55, 0.4],
  scale: [0.1, 1],
  format: pct,
};

/**
 * Aula entregue: lançadas sobre previstas. Separa aula não ofertada de aluno
 * ausente — a distinção que a rede hoje não consegue fazer.
 */
export const LESSONS_DELIVERED: IndicatorSpec = {
  id: 'attendance_rate' as IndicatorId,
  label: 'Aula entregue',
  short: 'Aula',
  unit: 'ratio',
  worse: 'low',
  thresholds: [0.97, 0.93, 0.88],
  scale: [0.7, 1],
  format: pct,
};

/** Nível visual de um valor solto, com os limiares de um spec qualquer. */
export function levelFor(spec: IndicatorSpec, value: number | null): Attention {
  if (value === null) return 'unreadable';
  const [t1, t2, t3] = spec.thresholds;
  if (spec.worse === 'low') {
    if (value < t3) return 'critical';
    if (value < t2) return 'attention';
    if (value < t1) return 'low';
    return 'none';
  }
  if (value > t3) return 'critical';
  if (value > t2) return 'attention';
  if (value > t1) return 'low';
  return 'none';
}

export const INDICATOR_ORDER: IndicatorId[] = [
  'attendance_rate',
  'teacher_shortage_rate',
  'capacity_utilization',
  'assessment_score',
];

/**
 * Vazio porque não se aplica — distinto de vazio porque não chegou.
 * A tela precisa dizer qual dos dois, senão vira pendência o que é fato.
 */
export function isNotApplicable(metric: SchoolMetric | undefined): boolean {
  return metric?.source_kind === 'KNOWN_UNAVAILABLE';
}

export function attentionOf(metric: SchoolMetric | undefined): Attention {
  if (!metric) return 'unreadable';
  if (metric.quality_status === 'BLOCKED' || metric.value === null) return 'unreadable';
  if (metric.quality_status === 'DEGRADED') return 'degraded';
  const spec = INDICATORS[metric.indicator_id];
  const [t1, t2, t3] = spec.thresholds;
  const v = metric.value;
  if (spec.worse === 'low') {
    if (v < t3) return 'critical';
    if (v < t2) return 'attention';
    if (v < t1) return 'low';
    return 'none';
  }
  if (v > t3) return 'critical';
  if (v > t2) return 'attention';
  if (v > t1) return 'low';
  return 'none';
}

/** Pior nível entre os indicadores presentes — usado só para ordenar a lista. */
export function worstAttention(metrics: MetricMap): Attention {
  const rank: Attention[] = ['none', 'degraded', 'low', 'attention', 'critical', 'unreadable'];
  let worst: Attention = 'none';
  for (const id of INDICATOR_ORDER) {
    const a = attentionOf(metrics[id]);
    if (a === 'unreadable') continue;
    if (rank.indexOf(a) > rank.indexOf(worst)) worst = a;
  }
  return worst;
}

export function normalise(spec: IndicatorSpec, value: number): number {
  const [min, max] = spec.scale;
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
}

export function thresholdLegend(spec: IndicatorSpec): string {
  const [t1, t2, t3] = spec.thresholds;
  const f = spec.format;
  return spec.worse === 'low'
    ? `sem sinal ≥ ${f(t1)} · baixa < ${f(t1)} · atenção < ${f(t2)} · crítico < ${f(t3)}`
    : `sem sinal ≤ ${f(t1)} · baixa > ${f(t1)} · atenção > ${f(t2)} · crítico > ${f(t3)}`;
}
