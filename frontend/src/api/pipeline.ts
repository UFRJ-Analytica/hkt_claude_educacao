/**
 * Sintéticos nos schemas do pipeline da SME.
 *
 * As formas aqui espelham `github.com/prefeitura-rio/pipelines_rj_sme`, descritas
 * em `docs/api/backend-agent-sme-pipeline-synthetic-handoff.md`. Quando o backend
 * publicar a release `sme_pipeline_v1`, o corpo destas funções vira `fetch` e as
 * telas não mudam.
 *
 * REGRA QUE NÃO SE NEGOCIA: geramos no grão que o produto consome, que é turma
 * para cima. Onde o grão real é por aluno, o sintético já nasce agregado. Nada
 * de `raca_cor`, `bolsa_familia` ou identificador de pessoa.
 */

import { getSchoolMap } from './client';
import type { QualityStatus, SchoolMapFeature } from './types';

const FIXTURE_NOTE =
  'Sintético nos schemas do pipeline da SME; a release governada ainda não foi publicada.';

function hashSeed(value: string): number {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function mulberry32(a: number) {
  return function rand() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const GRADES = ['1º', '2º', '3º', '4º', '5º', '6º', '7º', '8º', '9º'];
export const DISCIPLINAS = [
  'Matemática',
  'Língua Portuguesa',
  'Ciências',
  'História',
  'Geografia',
  'Inglês',
  'Educação Física',
];

/** Tipos que fazem parte do Ensino Fundamental regular. */
export function isFundamental(schoolType: string | null | undefined): boolean {
  if (!schoolType) return false;
  const t = schoolType.toLowerCase();
  if (t.includes('especial')) return false;
  return t.includes('escola municipal') || t.includes('ciep') || t.includes('cívico') || t.includes('civico');
}

/* ============================================================
   movimentacao — fluxo de matrícula
   ============================================================ */

export interface FlowRow {
  scope_id: string;
  scope_label: string;
  cre: number;
  matricula_base: number;
  entradas: number;
  saidas_internas: number;
  saidas_externas: number;
  saldo: number;
  /** Estudantes com 3+ movimentações no ano. CONTAGEM apenas, nunca lista. */
  trajetorias_interrompidas: number;
  quality: QualityStatus;
}

export interface FlowReport {
  origin: 'api' | 'fixture';
  scope_label: string;
  rows: FlowRow[];
  totals: Omit<FlowRow, 'scope_id' | 'scope_label' | 'cre' | 'quality'>;
  limitations: string[];
}

function flowFor(f: SchoolMapFeature): FlowRow {
  const id = f.properties.identity.school_id;
  const rand = mulberry32(hashSeed(`flow:${id}`));
  const base = f.properties.enrolment ?? 400;
  const attendance = f.properties.metrics.attendance_rate?.value ?? 0.94;

  // frequência pior anda junto com mais saída e mais trajetória picotada;
  // correlação narrativa do cenário, jamais causalidade
  const pressure = Math.max(0, 0.95 - attendance);

  const entradas = Math.round(base * (0.03 + rand() * 0.04));
  const saidasInternas = Math.round(base * (0.025 + pressure * 0.5 + rand() * 0.03));
  const saidasExternas = Math.round(base * (0.008 + pressure * 0.35 + rand() * 0.012));
  const interrompidas = Math.round(base * (0.004 + pressure * 0.22 + rand() * 0.006));

  return {
    scope_id: id,
    scope_label: f.properties.identity.nome,
    cre: f.properties.identity.cre,
    matricula_base: base,
    entradas,
    saidas_internas: saidasInternas,
    saidas_externas: saidasExternas,
    saldo: entradas - saidasInternas - saidasExternas,
    trajetorias_interrompidas: interrompidas,
    quality: 'OK',
  };
}

export async function getFlow(cre?: number | null): Promise<FlowReport | null> {
  const map = await getSchoolMap();
  const scoped = (cre ? map.features.filter((f) => f.properties.identity.cre === cre) : map.features)
    .filter((f) => isFundamental(f.properties.identity.school_type));
  if (scoped.length === 0) return null;

  const rows = scoped.map(flowFor).sort((a, b) => a.saldo - b.saldo);
  const sum = (pick: (r: FlowRow) => number) => rows.reduce((a, r) => a + pick(r), 0);

  return {
    origin: 'fixture',
    scope_label: cre ? `${cre}ª CRE` : 'rede municipal',
    rows,
    totals: {
      matricula_base: sum((r) => r.matricula_base),
      entradas: sum((r) => r.entradas),
      saidas_internas: sum((r) => r.saidas_internas),
      saidas_externas: sum((r) => r.saidas_externas),
      saldo: sum((r) => r.saldo),
      trajetorias_interrompidas: sum((r) => r.trajetorias_interrompidas),
    },
    limitations: [
      FIXTURE_NOTE,
      'Trajetória interrompida é contagem de estudantes com três ou mais movimentações no ano — nunca lista nominal.',
      'Saída interna é transferência para outra unidade da rede; externa é saída da rede municipal. As duas têm respostas diferentes e não devem ser somadas.',
    ],
  };
}

/* ============================================================
   disciplinas_sem_professor × id_situacao — carência e aula perdida
   ============================================================ */

export interface StaffingGapRow {
  disciplina: string;
  turmas_sem_professor: number;
  horas_previstas: number;
  horas_sem_professor: number;
  aulas_previstas: number;
  aulas_canceladas: number;
  taxa_carencia: number;
  taxa_cancelamento: number;
}

export interface StaffingGapReport {
  origin: 'api' | 'fixture';
  scope_label: string;
  rows: StaffingGapRow[];
  limitations: string[];
}

export async function getStaffingGap(cre?: number | null): Promise<StaffingGapReport | null> {
  const map = await getSchoolMap();
  const scoped = (cre ? map.features.filter((f) => f.properties.identity.cre === cre) : map.features)
    .filter((f) => isFundamental(f.properties.identity.school_type));
  if (scoped.length === 0) return null;

  const rows = DISCIPLINAS.map((disciplina) => {
    let turmas = 0;
    let horasPrev = 0;
    let horasSem = 0;
    let aulasPrev = 0;
    let aulasCanc = 0;

    for (const f of scoped) {
      const rand = mulberry32(hashSeed(`gap:${f.properties.identity.school_id}:${disciplina}`));
      const shortage = f.properties.metrics.teacher_shortage_rate?.value ?? 0.05;
      // disciplinas com carência historicamente maior na rede
      const hard = ['Matemática', 'Ciências', 'Inglês'].includes(disciplina) ? 1.7 : 0.75;
      const gap = Math.min(0.55, shortage * hard + (rand() - 0.5) * 0.03);

      const turmasEscola = 4 + Math.floor(rand() * 8);
      const semProf = Math.round(turmasEscola * gap);
      const hp = turmasEscola * 40;
      const ap = turmasEscola * 32;

      turmas += semProf;
      horasPrev += hp;
      horasSem += Math.round(hp * gap);
      aulasPrev += ap;
      // cancelamento cresce com a carência, mas não é função dela
      aulasCanc += Math.round(ap * Math.min(0.4, gap * 0.62 + rand() * 0.02));
    }

    return {
      disciplina,
      turmas_sem_professor: turmas,
      horas_previstas: horasPrev,
      horas_sem_professor: horasSem,
      aulas_previstas: aulasPrev,
      aulas_canceladas: aulasCanc,
      taxa_carencia: horasPrev === 0 ? 0 : horasSem / horasPrev,
      taxa_cancelamento: aulasPrev === 0 ? 0 : aulasCanc / aulasPrev,
    };
  }).sort((a, b) => b.taxa_carencia - a.taxa_carencia);

  return {
    origin: 'fixture',
    scope_label: cre ? `${cre}ª CRE` : 'rede municipal',
    rows,
    limitations: [
      FIXTURE_NOTE,
      'Carência docente e cancelamento de aula COINCIDEM no recorte. O dado disponível não estabelece direção causal entre os dois, e a interface não deve sugerir que estabelece.',
      'Carência é medida em disciplina e turma. Nenhum identificador de profissional é usado ou exibido.',
    ],
  };
}

/* ============================================================
   grupamento — corte por ano de escolaridade
   ============================================================ */

export interface GradeRow {
  grade: string;
  attendance_rate: number;
  subject_grade_mean: number;
  external_exit_rate: number;
  lessons_cancelled_rate: number;
  turmas: number;
}

export interface GradeReport {
  origin: 'api' | 'fixture';
  scope_label: string;
  rows: GradeRow[];
  limitations: string[];
}

export async function getByGrade(cre?: number | null): Promise<GradeReport | null> {
  const map = await getSchoolMap();
  const scoped = (cre ? map.features.filter((f) => f.properties.identity.cre === cre) : map.features)
    .filter((f) => isFundamental(f.properties.identity.school_type));
  if (scoped.length === 0) return null;

  const baseAttendance =
    scoped
      .map((f) => f.properties.metrics.attendance_rate?.value ?? 0.94)
      .reduce((a, b) => a + b, 0) / scoped.length;

  const rows = GRADES.map((grade, i) => {
    const rand = mulberry32(hashSeed(`grade:${cre ?? 'net'}:${grade}`));
    const anosFinais = i >= 5; // 6º ano em diante
    // a quebra da transição: o 6º ano concentra a perda
    const transition = i === 5 ? 1 : 0;

    return {
      grade,
      attendance_rate: Math.max(
        0.8,
        baseAttendance - (anosFinais ? 0.022 : 0) - transition * 0.016 + (rand() - 0.5) * 0.008,
      ),
      subject_grade_mean: Math.max(
        3,
        7.4 - (anosFinais ? 0.9 : 0) - transition * 0.5 + (rand() - 0.5) * 0.3,
      ),
      external_exit_rate: 0.012 + (anosFinais ? 0.009 : 0) + transition * 0.011 + rand() * 0.004,
      lessons_cancelled_rate: 0.03 + (anosFinais ? 0.019 : 0) + transition * 0.008 + rand() * 0.006,
      turmas: Math.round(scoped.length * (0.7 + rand() * 0.5)),
    };
  });

  return {
    origin: 'fixture',
    scope_label: cre ? `${cre}ª CRE` : 'rede municipal',
    rows,
    limitations: [
      FIXTURE_NOTE,
      'O corte por ano de escolaridade é descritivo. A diferença entre anos iniciais e finais tem múltiplas explicações possíveis e este recorte sozinho não escolhe entre elas.',
    ],
  };
}
