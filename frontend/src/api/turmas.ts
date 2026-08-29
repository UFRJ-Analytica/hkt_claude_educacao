/**
 * Grão de turma, habilidade e aula entregue.
 *
 * O backend ainda não expõe estes endpoints — a spec está em
 * `docs/api/backend-agent-turma-grain-handoff.md`. Até lá, tudo aqui é fixture
 * determinística e a tela DECLARA a origem. Quando `ScopeType.TURMA` existir, o
 * corpo destas funções vira `fetch` e as formas continuam as mesmas.
 *
 * Nada aqui inventa aluno: o menor grão exposto é a turma, e turma abaixo do
 * limiar é suprimida com motivo, nunca agregada silenciosamente.
 */

import { apiSource, getSchoolMap } from './client';
import type {
  LessonDelivery,
  QualityStatus,
  SchoolMapFeature,
  SkillCell,
  SkillDefinition,
  SkillMatrix,
  TurmaList,
  TurmaSummary,
} from './types';

/** Limiar de supressão. Espelha `privacy_min_unit_count` da spec. */
export const PRIVACY_MIN_UNIT_COUNT = 10;

const FIXTURE_NOTE =
  'Turmas, habilidades e aulas são fixture do contrato especificado; o backend ainda não expõe o grão de turma.';

export const SKILLS: SkillDefinition[] = [
  { skill_id: 'LP-D01', skill_label: 'Localizar informação explícita', subject: 'Língua Portuguesa' },
  { skill_id: 'LP-D02', skill_label: 'Inferir sentido de palavra', subject: 'Língua Portuguesa' },
  { skill_id: 'LP-D03', skill_label: 'Identificar tema central', subject: 'Língua Portuguesa' },
  { skill_id: 'LP-D04', skill_label: 'Relação de causa e efeito', subject: 'Língua Portuguesa' },
  { skill_id: 'LP-D05', skill_label: 'Distinguir fato de opinião', subject: 'Língua Portuguesa' },
  { skill_id: 'MAT-D01', skill_label: 'Números naturais', subject: 'Matemática' },
  { skill_id: 'MAT-D02', skill_label: 'Adição e subtração', subject: 'Matemática' },
  { skill_id: 'MAT-D03', skill_label: 'Multiplicação e divisão', subject: 'Matemática' },
  { skill_id: 'MAT-D04', skill_label: 'Frações e decimais', subject: 'Matemática' },
  { skill_id: 'MAT-D05', skill_label: 'Geometria: figuras planas', subject: 'Matemática' },
  { skill_id: 'MAT-D06', skill_label: 'Grandezas e medidas', subject: 'Matemática' },
];

/** Dificuldade relativa de cada descritor, para a matriz não ficar chapada. */
const SKILL_DIFFICULTY: Record<string, number> = {
  'LP-D01': 0.10, 'LP-D02': -0.04, 'LP-D03': 0.02, 'LP-D04': -0.09, 'LP-D05': -0.13,
  'MAT-D01': 0.12, 'MAT-D02': 0.06, 'MAT-D03': -0.05, 'MAT-D04': -0.16, 'MAT-D05': -0.02,
  'MAT-D06': -0.08,
};

export const PERIOD_LABEL = '3º bimestre de 2026';

/**
 * Tipos de equipamento que participam da Atividade Diagnóstica em Rede.
 *
 * A ADR cobre do 1º ao 9º ano do Ensino Fundamental. Creche, EDI, Clube
 * Escolar, Núcleo de Arte e Biblioteca Escolar NÃO participam — atribuir acerto
 * em Língua Portuguesa e Matemática a uma creche seria inventar avaliação que
 * não existe, e é o erro que um avaliador da SME identifica na hora.
 */
const ADR_TYPES = ['escola municipal', 'ciep', 'escola cívico militar', 'escola civico militar'];

export function takesAdr(schoolType: string | null | undefined): boolean {
  if (!schoolType) return false;
  const t = schoolType.toLowerCase();
  if (t.includes('especial')) return false; // avaliação adaptada, fora do recorte
  return ADR_TYPES.some((allowed) => t.includes(allowed));
}

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

const GRADES = ['1º', '2º', '3º', '4º', '5º', '6º', '7º', '8º', '9º'];

/** Turmas de uma escola. Determinístico pelo school_id. */
export function turmasOf(school: SchoolMapFeature): TurmaSummary[] {
  const id = school.properties.identity.school_id;
  const rand = mulberry32(hashSeed(`turmas:${id}`));
  const count = 4 + Math.floor(rand() * 9);
  const out: TurmaSummary[] = [];

  for (let i = 0; i < count; i += 1) {
    const grade = GRADES[Math.floor(rand() * GRADES.length)];
    const letter = String.fromCharCode(65 + (i % 4));
    // uma minoria de turmas pequenas, para a supressao aparecer de verdade
    const students = rand() < 0.14 ? 4 + Math.floor(rand() * 6) : 18 + Math.floor(rand() * 17);
    const suppressed = students < PRIVACY_MIN_UNIT_COUNT;
    out.push({
      turma_id: `${id}.${grade.replace('º', '')}${letter}`,
      turma_label: `${grade} ano ${letter}`,
      grade,
      school_id: id,
      student_count: suppressed ? null : students,
      suppressed,
      suppression_reason: suppressed ? 'SMALL_GROUP' : null,
      coverage: suppressed ? 0 : 0.82 + rand() * 0.17,
      quality: suppressed ? 'BLOCKED' : rand() < 0.12 ? 'DEGRADED' : 'OK',
    });
  }
  return out.sort((a, b) => a.turma_label.localeCompare(b.turma_label, 'pt-BR'));
}

export async function getTurmas(schoolId: string): Promise<TurmaList | null> {
  const live = await liveGet<SchoolTurmaListV1>(
    `/api/v1/schools/${encodeURIComponent(schoolId)}/turmas`,
  );
  if (live && live.turmas.length > 0) {
    return {
      school_id: live.school_id,
      turmas: live.turmas.map((t) => ({
        turma_id: t.turma_id,
        turma_label: t.turma_label ?? t.turma_id,
        grade: t.grade ?? '—',
        school_id: live.school_id,
        student_count: t.evaluated_count,
        suppressed: t.suppressed,
        suppression_reason: t.suppression_reason,
        coverage: t.coverage.filter((c) => c.status === 'OK').length / Math.max(1, t.coverage.length),
        quality: t.suppressed ? 'BLOCKED' : 'OK',
      })),
      privacy_min_unit_count: live.privacy_min_unit_count,
      limitations: live.limitations,
    };
  }

  const map = await getSchoolMap();
  const school = map.features.find((f) => f.properties.identity.school_id === schoolId);
  if (!school) return null;
  return {
    school_id: schoolId,
    turmas: turmasOf(school),
    privacy_min_unit_count: PRIVACY_MIN_UNIT_COUNT,
    limitations: [
      FIXTURE_NOTE,
      `Turmas com menos de ${PRIVACY_MIN_UNIT_COUNT} estudantes avaliados são suprimidas; a turma continua listada, o valor não.`,
    ],
  };
}

/** Domínio de acerto por descritor, ancorado no perfil da CRE. */
function mastery(seed: string, base: number, skillId: string): number {
  const rand = mulberry32(hashSeed(seed));
  const v = base + (SKILL_DIFFICULTY[skillId] ?? 0) + (rand() - 0.5) * 0.16;
  return Math.max(0.08, Math.min(0.98, v));
}

/** Base de acerto de uma CRE — correlacionada com a frequência da fixture. */
function creBase(features: SchoolMapFeature[], cre: number): number {
  const scoped = features.filter((f) => f.properties.identity.cre === cre);
  const att = scoped
    .map((f) => f.properties.metrics.attendance_rate?.value)
    .filter((v): v is number => typeof v === 'number');
  const mean = att.length ? att.reduce((a, b) => a + b, 0) / att.length : 0.94;
  // frequência alta anda junto com acerto alto; correlação narrativa, não causa
  return 0.34 + (mean - 0.9) * 2.2;
}

/* ------------------------------------------------------------------
   Caminho governado. Os endpoints existem (fase turma do backend), mas
   respondem 404 sanitizado enquanto não houver asset granular no release.
   Tentamos primeiro; se não houver, caímos na fixture e DECLARAMOS.
   ------------------------------------------------------------------ */

interface TurmaSummaryV1 {
  turma_id: string;
  turma_label: string | null;
  grade: string | null;
  evaluated_count: number | null;
  suppressed: boolean;
  suppression_reason: 'SMALL_GROUP' | null;
  coverage: { indicator_id: string; status: QualityStatus }[];
  limitations: string[];
}

interface SchoolTurmaListV1 {
  school_id: string;
  turmas: TurmaSummaryV1[];
  privacy_min_unit_count: number;
  limitations: string[];
}

interface SkillMatrixCellV1 {
  turma_id: string;
  turma_label: string | null;
  grade: string | null;
  subject: string | null;
  skill_id: string;
  skill_label: string | null;
  period_label: string | null;
  value: number | null;
  quality: QualityStatus;
  suppressed: boolean;
  suppression_reason: 'SMALL_GROUP' | null;
  evidence_id: string | null;
}

interface SkillMatrixV1 {
  school_id: string;
  period: string | null;
  cells: SkillMatrixCellV1[];
  privacy_min_unit_count: number;
  limitations: string[];
}

async function liveBase(): Promise<string | null> {
  const src = await apiSource();
  return src.mode === 'live' ? src.base : null;
}

async function liveGet<T>(path: string): Promise<T | null> {
  const b = await liveBase();
  if (!b) return null;
  try {
    const res = await fetch(`${b}${path}`);
    if (!res.ok) return null; // 404 sanitizado enquanto o asset granular não existe
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/** Converte o contrato governado para o modelo de visão da matriz. */
function adaptSkillMatrix(v1: SkillMatrixV1, label: string): SkillMatrix | null {
  if (v1.cells.length === 0) return null;

  const rowMap = new Map<string, SkillMatrix['rows'][number]>();
  const skillMap = new Map<string, SkillDefinition>();
  for (const c of v1.cells) {
    if (!rowMap.has(c.turma_id)) {
      rowMap.set(c.turma_id, {
        id: c.turma_id,
        label: c.turma_label ?? c.turma_id,
        sublabel: c.grade ?? '—',
        student_count: null,
      });
    }
    if (!skillMap.has(c.skill_id)) {
      skillMap.set(c.skill_id, {
        skill_id: c.skill_id,
        skill_label: c.skill_label ?? c.skill_id,
        subject: c.subject ?? 'Sem componente',
      });
    }
  }

  return {
    origin: 'api',
    scope: { type: 'SCHOOL', id: v1.school_id, label },
    rows: [...rowMap.values()],
    skills: [...skillMap.values()],
    cells: v1.cells.map((c) => ({
      scope_id: c.turma_id,
      skill_id: c.skill_id,
      value: c.value,
      quality: c.quality,
      suppressed: c.suppressed,
      suppression_reason: c.suppression_reason,
      evidence_id: c.evidence_id,
    })),
    period_label: v1.period ?? PERIOD_LABEL,
    privacy_min_unit_count: v1.privacy_min_unit_count,
    limitations: v1.limitations,
  };
}

export type MatrixScope =
  | { type: 'NETWORK' }
  | { type: 'CRE'; cre: number }
  | { type: 'SCHOOL'; schoolId: string };

export async function getSkillMatrix(scope: MatrixScope): Promise<SkillMatrix | null> {
  const map = await getSchoolMap();
  const features = map.features;

  // O contrato governado cobre o recorte de escola. Rede e CRE seguem derivadas
  // até o backend expor o rollup — e a tela declara qual origem está ativa.
  if (scope.type === 'SCHOOL') {
    const live = await liveGet<SkillMatrixV1>(
      `/api/v1/schools/${encodeURIComponent(scope.schoolId)}/skills`,
    );
    if (live) {
      const school = features.find((f) => f.properties.identity.school_id === scope.schoolId);
      const adapted = adaptSkillMatrix(live, school?.properties.identity.nome ?? scope.schoolId);
      if (adapted) return adapted;
    }
  }

  let rows: SkillMatrix['rows'] = [];
  let scopeMeta: SkillMatrix['scope'];
  let bases = new Map<string, number>();

  // Só entram unidades que fazem a ADR. As demais ficam fora, com a contagem
  // declarada nas limitações — não são escondidas, são inaplicáveis.
  const eligible = features.filter((f) => takesAdr(f.properties.identity.school_type));
  const excluded = features.length - eligible.length;

  if (scope.type === 'NETWORK') {
    const cres = [...new Set(eligible.map((f) => f.properties.identity.cre))].sort((a, b) => a - b);
    rows = cres.map((cre) => {
      const n = eligible.filter((f) => f.properties.identity.cre === cre).length;
      return { id: String(cre), label: `${cre}ª CRE`, sublabel: `${n} unidades na ADR`, student_count: n * 420 };
    });
    for (const cre of cres) bases.set(String(cre), creBase(features, cre));
    scopeMeta = { type: 'NETWORK', id: 'network', label: 'Rede municipal' };
  } else if (scope.type === 'CRE') {
    const scoped = eligible.filter((f) => f.properties.identity.cre === scope.cre).slice(0, 40);
    const base = creBase(features, scope.cre);
    rows = scoped.map((f) => ({
      id: f.properties.identity.school_id,
      label: f.properties.identity.nome,
      sublabel: f.properties.identity.school_type ?? '—',
      student_count: f.properties.enrolment ?? null,
    }));
    for (const f of scoped) bases.set(f.properties.identity.school_id, base);
    scopeMeta = { type: 'CRE', id: String(scope.cre), label: `${scope.cre}ª CRE` };
  } else {
    const school = features.find((f) => f.properties.identity.school_id === scope.schoolId);
    if (!school) return null;
    if (!takesAdr(school.properties.identity.school_type)) return null;
    const base = creBase(features, school.properties.identity.cre);
    const turmas = turmasOf(school);
    rows = turmas.map((t) => ({
      id: t.turma_id,
      label: t.turma_label,
      sublabel: t.suppressed ? 'suprimida' : `${t.student_count} estudantes`,
      student_count: t.student_count,
    }));
    for (const t of turmas) bases.set(t.turma_id, base);
    scopeMeta = { type: 'SCHOOL', id: scope.schoolId, label: school.properties.identity.nome };
  }

  const cells: SkillCell[] = [];
  for (const row of rows) {
    const suppressed = row.student_count !== null && row.student_count < PRIVACY_MIN_UNIT_COUNT;
    for (const skill of SKILLS) {
      // supressao vale por celula: turma acima do limiar pode ter descritor abaixo
      const cellSmall =
        !suppressed &&
        row.student_count !== null &&
        row.student_count < PRIVACY_MIN_UNIT_COUNT * 1.6 &&
        mulberry32(hashSeed(`cell:${row.id}:${skill.skill_id}`))() < 0.18;
      const blocked = suppressed || cellSmall;
      const quality: QualityStatus = blocked ? 'BLOCKED' : 'OK';
      cells.push({
        scope_id: row.id,
        skill_id: skill.skill_id,
        value: blocked ? null : mastery(`${row.id}:${skill.skill_id}`, bases.get(row.id) ?? 0.5, skill.skill_id),
        quality,
        suppressed: blocked,
        suppression_reason: blocked ? 'SMALL_GROUP' : null,
        evidence_id: blocked
          ? null
          : `ev1:fixture:${scopeMeta.type.toLowerCase()}:${row.id.toLowerCase()}:skill_mastery_rate:2026-08-01`,
      });
    }
  }

  return {
    origin: 'fixture',
    scope: scopeMeta,
    rows,
    skills: SKILLS,
    cells,
    period_label: PERIOD_LABEL,
    privacy_min_unit_count: PRIVACY_MIN_UNIT_COUNT,
    limitations: [
      FIXTURE_NOTE,
      `A matriz cobre apenas unidades que participam da ADR (Escola Municipal, CIEP e Cívico-Militar). ${excluded.toLocaleString('pt-BR')} equipamentos da rede — creches, EDIs, clubes escolares, núcleos de arte e bibliotecas — não fazem a avaliação e ficam fora por inaplicabilidade, não por ausência de dado.`,
      `Células com menos de ${PRIVACY_MIN_UNIT_COUNT} estudantes avaliados são suprimidas, mesmo quando a linha inteira passa do limiar.`,
      'Acerto por descritor não é nota do estudante e não deve virar ranking de turma ou de professor.',
    ],
  };
}

/**
 * Decomposição da aula entregue.
 *
 * previstas → canceladas · não lançadas · dadas → com presença.
 * Enquanto o backend não expõe `lessons_*`, é derivada da frequência já
 * carregada, e a tela declara a origem.
 */
function lessonsFor(school: SchoolMapFeature): Omit<LessonDelivery, 'scope_label'> {
  const id = school.properties.identity.school_id;
  const rand = mulberry32(hashSeed(`lessons:${id}`));
  const attendance = school.properties.metrics.attendance_rate?.value ?? 0.94;
  const planned = 180 + Math.floor(rand() * 20);

  // escolas com frequência pior acumulam mais cancelamento e menos lançamento;
  // correlação narrativa da fixture, nunca causalidade
  const pressure = Math.max(0, 0.95 - attendance);
  const cancelled = Math.round(planned * Math.min(0.14, pressure * 1.4 + rand() * 0.012));
  const unlogged = Math.round(planned * Math.min(0.09, pressure * 0.7 + rand() * 0.018));
  const delivered = planned - cancelled - unlogged;
  const absences = Math.round(delivered * (1 - attendance));

  return {
    scope_id: id,
    lessons_planned: planned,
    lessons_delivered: delivered,
    lessons_cancelled: cancelled,
    lessons_unlogged: unlogged,
    student_absences: absences,
    attendance_rate: attendance,
    effective_rate: (delivered / planned) * attendance,
    quality: 'OK',
    origin: 'fixture',
  };
}

export async function getLessonDelivery(schoolId: string): Promise<LessonDelivery | null> {
  const map = await getSchoolMap();
  const school = map.features.find((f) => f.properties.identity.school_id === schoolId);
  if (!school) return null;
  return { ...lessonsFor(school), scope_label: `em ${school.properties.identity.nome}` };
}

/**
 * Mesma decomposição no nível da rede.
 *
 * Soma sobre as unidades já carregadas, com UMA leitura do mapa — chamar
 * `getLessonDelivery` por escola recomporia o conjunto inteiro a cada chamada.
 */
export async function getNetworkLessonDelivery(cre?: number | null): Promise<LessonDelivery | null> {
  const map = await getSchoolMap();
  const scoped = cre
    ? map.features.filter((f) => f.properties.identity.cre === cre)
    : map.features;
  if (scoped.length === 0) return null;

  const rows = scoped.map(lessonsFor);
  const sum = (pick: (r: (typeof rows)[number]) => number) => rows.reduce((a, r) => a + pick(r), 0);

  const planned = sum((r) => r.lessons_planned);
  const delivered = sum((r) => r.lessons_delivered);
  const absences = sum((r) => r.student_absences);
  const attendance = delivered === 0 ? 0 : 1 - absences / delivered;

  return {
    scope_id: cre ? `cre-${cre}` : 'network',
    scope_label: cre ? `na ${cre}ª CRE` : 'em toda a rede municipal',
    lessons_planned: planned,
    lessons_delivered: delivered,
    lessons_cancelled: sum((r) => r.lessons_cancelled),
    lessons_unlogged: sum((r) => r.lessons_unlogged),
    student_absences: absences,
    attendance_rate: attendance,
    effective_rate: planned === 0 ? 0 : (delivered / planned) * attendance,
    quality: 'OK',
    origin: 'fixture',
  };
}
