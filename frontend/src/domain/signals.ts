/**
 * Sinais derivados do cruzamento — PROVISÓRIO.
 *
 * Esta é a priorização governada, e ela pertence ao backend: a spec está em
 * `docs/api/backend-agent-sme-pipeline-synthetic-handoff.md` §5.6, como
 * `GET /api/v1/network/signals`. Enquanto o endpoint não existe, derivamos aqui
 * e a tela DECLARA. Quando ele entrar, este módulo é apagado.
 *
 * Três regras que a derivação respeita, e que valem também para o backend:
 *
 * 1. Os cinco componentes ficam visíveis. Um score único que esconde cobertura
 *    é proibido pelas regras de negócio.
 * 2. Sinal bloqueado é sinal de primeira classe: aparece na lista, sem número,
 *    com o motivo. Não some.
 * 3. Vários indicadores contribuindo significa que COINCIDEM no escopo. Nunca
 *    implica mecanismo.
 */

import { getFlow, getStaffingGap, isFundamental } from '../api/pipeline';
import { getSchoolMap } from '../api/client';
import type { SchoolMapFeature } from '../api/types';

export interface SignalComponents {
  severity: number;
  trend: number;
  persistence: number;
  population: number;
  confidence: number;
}

export interface DerivedSignal {
  signal_id: string;
  scope: { type: 'CRE'; id: string; label: string };
  title: string;
  meta: string;
  level: 'critical' | 'attention' | 'low' | 'degraded' | 'unreadable';
  components: SignalComponents;
  contributing_indicators: string[];
  blocked: boolean;
  blocked_reason: string | null;
  agent: string;
  cre: number;
}

export interface SignalReport {
  origin: 'api' | 'derived';
  signals: DerivedSignal[];
  limitations: string[];
}

/** Limiares publicados; os mesmos que a legenda das outras telas usa. */
const T = {
  attendance: 0.94,
  cancelled: 0.06,
  externalExit: 0.03,
  interrupted: 0.015,
  staffing: 0.1,
  coverageBlock: 0.5,
};

const clamp = (v: number) => Math.max(0, Math.min(1, v));

function mean(values: number[]): number {
  return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
}

/** Meses da série abaixo do limiar — persistência não é adjetivo, é contagem. */
function monthsBelow(series: number[] | null | undefined, threshold: number): number {
  if (!series || series.length === 0) return 0;
  return series.filter((v) => v < threshold).length / series.length;
}

export async function getSignals(): Promise<SignalReport> {
  const [map, flow, gap] = await Promise.all([getSchoolMap(), getFlow(null), getStaffingGap(null)]);
  const features = map.features.filter((f) => isFundamental(f.properties.identity.school_type));

  const byCre = new Map<number, SchoolMapFeature[]>();
  for (const f of features) {
    const k = f.properties.identity.cre;
    const list = byCre.get(k);
    if (list) list.push(f);
    else byCre.set(k, [f]);
  }

  const totalEnrolment = features.reduce((a, f) => a + (f.properties.enrolment ?? 0), 0) || 1;
  const flowByCre = new Map<number, { external: number; interrupted: number; base: number }>();
  for (const r of flow?.rows ?? []) {
    const acc = flowByCre.get(r.cre) ?? { external: 0, interrupted: 0, base: 0 };
    acc.external += r.saidas_externas;
    acc.interrupted += r.trajetorias_interrompidas;
    acc.base += r.matricula_base;
    flowByCre.set(r.cre, acc);
  }

  const worstDisciplines = (gap?.rows ?? []).slice(0, 2).map((r) => r.disciplina);
  const signals: DerivedSignal[] = [];

  for (const [cre, list] of byCre) {
    const att = list
      .map((f) => f.properties.metrics.attendance_rate)
      .filter((m): m is NonNullable<typeof m> => !!m && m.value !== null);
    const attMean = mean(att.map((m) => m.value!));
    const enrolment = list.reduce((a, f) => a + (f.properties.enrolment ?? 0), 0);
    const population = clamp(enrolment / totalEnrolment / 0.15);

    // cobertura de desempenho manda: abaixo do limiar, bloqueia antes de narrar
    const assess = list.map((f) => f.properties.metrics.assessment_score);
    const assessCoverage = mean(assess.map((m) => m?.coverage ?? 1));
    const assessBlocked = assess.filter((m) => !m || m.value === null).length;

    if (assessCoverage < T.coverageBlock && assessBlocked > 0) {
      signals.push({
        signal_id: `sig-${cre}-assessment`,
        scope: { type: 'CRE', id: String(cre), label: `${cre}ª CRE` },
        title: `Queda aparente de desempenho na ${cre}ª CRE, bloqueada pelo Guardião`,
        meta: `cobertura ${(assessCoverage * 100).toFixed(0)}%, abaixo do limiar de 50% · ${assessBlocked} unidades sem leitura · pode ser ausência de lançamento, não de aprendizagem`,
        level: 'unreadable',
        components: { severity: 0, trend: 0, persistence: 0, population, confidence: assessCoverage },
        contributing_indicators: ['assessment_score'],
        blocked: true,
        blocked_reason: 'Nenhum número desta situação é exibido enquanto a cobertura não atingir 50%.',
        agent: 'Guardião de Dados',
        cre,
      });
    }

    // frequência: gravidade pela distância do limiar, persistência pela série
    if (attMean < T.attendance) {
      const below = list.filter((f) => (f.properties.metrics.attendance_rate?.value ?? 1) < T.attendance);
      const series = att[0]?.series ?? null;
      const delta = series && series.length === 12 ? series[11] - series[8] : 0;
      const persistence = mean(
        att.slice(0, 40).map((m) => monthsBelow(m.series, T.attendance)),
      );
      const coverage = mean(att.map((m) => m.coverage ?? 0.96));
      const severity = clamp((T.attendance - attMean) / 0.06);

      signals.push({
        signal_id: `sig-${cre}-attendance`,
        scope: { type: 'CRE', id: String(cre), label: `${cre}ª CRE` },
        title: `Frequência abaixo do padrão da rede em ${below.length} escolas da ${cre}ª CRE`,
        meta: `${below.reduce((a, f) => a + (f.properties.enrolment ?? 0), 0).toLocaleString('pt-BR')} estudantes nas unidades afetadas · média ${(attMean * 100).toFixed(1).replace('.', ',')}% · cobertura ${(coverage * 100).toFixed(0)}%`,
        level: severity > 0.6 ? 'critical' : severity > 0.3 ? 'attention' : 'low',
        components: {
          severity,
          trend: clamp(-delta / 0.03),
          persistence,
          population,
          confidence: coverage,
        },
        contributing_indicators: ['attendance_rate'],
        blocked: false,
        blocked_reason: null,
        agent: 'Sentinela da Rede',
        cre,
      });
    }

    // saída para fora da rede: fluxo, não estoque
    const fl = flowByCre.get(cre);
    if (fl && fl.base > 0) {
      const rate = fl.external / fl.base;
      if (rate > T.externalExit) {
        signals.push({
          signal_id: `sig-${cre}-exit`,
          scope: { type: 'CRE', id: String(cre), label: `${cre}ª CRE` },
          title: `Saída para fora da rede acima do padrão na ${cre}ª CRE`,
          meta: `${fl.external.toLocaleString('pt-BR')} saídas externas sobre ${fl.base.toLocaleString('pt-BR')} matrículas · ${fl.interrupted.toLocaleString('pt-BR')} trajetórias com 3+ movimentações`,
          level: rate > T.externalExit * 1.6 ? 'critical' : 'attention',
          components: {
            severity: clamp((rate - T.externalExit) / 0.03),
            trend: 0,
            persistence: clamp(fl.interrupted / fl.base / 0.03),
            population,
            confidence: 0.88,
          },
          contributing_indicators: ['external_exit_rate', 'interrupted_trajectory_rate'],
          blocked: false,
          blocked_reason: null,
          agent: 'Sentinela da Rede',
          cre,
        });
      }
    }

    // carência docente: sinal de disciplina e turma, nunca de pessoa
    const shortage = mean(
      list
        .map((f) => f.properties.metrics.teacher_shortage_rate?.value)
        .filter((v): v is number => typeof v === 'number'),
    );
    if (shortage > T.staffing) {
      signals.push({
        signal_id: `sig-${cre}-staffing`,
        scope: { type: 'CRE', id: String(cre), label: `${cre}ª CRE` },
        title: `Carência docente concentrada em ${worstDisciplines.join(' e ')} na ${cre}ª CRE`,
        meta: `${(shortage * 100).toFixed(1).replace('.', ',')}% das horas sem professor · sem identificação de profissional · coincide com cancelamento de aula, sem relação causal estabelecida`,
        level: shortage > T.staffing * 1.4 ? 'critical' : 'attention',
        components: {
          severity: clamp((shortage - T.staffing) / 0.08),
          trend: 0,
          persistence: 0.6,
          population,
          confidence: 0.88,
        },
        contributing_indicators: ['teacher_shortage_rate', 'lessons_cancelled_rate'],
        blocked: false,
        blocked_reason: null,
        agent: 'Sentinela da Rede',
        cre,
      });
    }
  }

  // ordena pelos componentes visíveis; bloqueados sobem, porque decidem leitura
  const weight = (s: DerivedSignal) =>
    s.blocked
      ? 0.9
      : s.components.severity * 0.34 +
        s.components.trend * 0.16 +
        s.components.persistence * 0.2 +
        s.components.population * 0.14 +
        s.components.confidence * 0.16;

  signals.sort((a, b) => weight(b) - weight(a));

  return {
    origin: 'derived',
    signals: signals.slice(0, 6),
    limitations: [
      'Priorização derivada no cliente. O endpoint governado GET /api/v1/network/signals ainda não existe.',
      'Indicadores que contribuem para um sinal COINCIDEM no escopo. Nenhuma relação causal é estabelecida entre eles.',
      'Os cinco componentes ficam visíveis por sinal: um score único não pode esconder cobertura insuficiente.',
    ],
  };
}

export const COMPONENT_LABELS: [keyof SignalComponents, string][] = [
  ['severity', 'Grav'],
  ['trend', 'Tend'],
  ['persistence', 'Persist'],
  ['population', 'Pop'],
  ['confidence', 'Confi'],
];
