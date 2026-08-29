/**
 * Fixtures determinísticas derivadas dos contratos reais do backend.
 *
 * NÃO são dados da rede municipal. São sintéticas, com semente fixa, e existem
 * para que o front-end seja desenvolvido e demonstrado sem depender do backend
 * — exatamente o acordo de "fixture antes de qualquer componente".
 *
 * O gerador respeita as invariantes do contrato Pydantic:
 *  - valor ausente é obrigatoriamente BLOCKED, sem período e sem evidência;
 *  - `interpretable` é verdadeiro exatamente quando quality_status === 'OK';
 *  - `coverage.total === geolocated + missing`;
 *  - identidade sintética não carrega INEP nem designação SME.
 */

import type {
  Capability,
  IndicatorId,
  MetricMap,
  Provenance,
  QualityStatus,
  SchoolMapCollection,
  SchoolMapFeature,
  SchoolMetric,
  Situation,
} from './types';

const SNAPSHOT = 'f2a9c41d7b6e05839acd1e4470b28f6c35d0a97e1c8b44f2360de5a791cb0d83';
const SEED = 20260830;

function mulberry32(a: number) {
  return function rand() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SYNTHETIC_LIMITATION =
  'Dados integralmente sintéticos para demonstração; não representam escolas ou IDs reais.';

function provenance(asset: string, kind: SchoolMetric['source_kind']): Provenance {
  return {
    source_id: `fixture:${asset}`,
    source_kind: kind,
    generated: true,
    as_of: null,
    data_version: SNAPSHOT,
    generation_seed: SEED,
    scenario_reference: 'frontend_fixture@1.0.0',
    scenario_hash: 'a3f19bd7c0e4526183ad7f0b9c2e41d68537aa0c94be127f3d68e50a2b7c9146',
    limitations: [SYNTHETIC_LIMITATION],
  };
}

/**
 * Geografia ilustrativa do município: um contorno aproximado e um centro por
 * CRE. As escolas são amostradas por rejeição dentro do contorno, em torno do
 * centro da sua CRE — o resultado tem a forma orgânica de uma cidade, e as
 * regiões do mapa são o casco convexo desses pontos, não a fronteira oficial.
 */
const CRE_ORDER = [10, 9, 5, 11, 6, 8, 3, 7, 4, 1, 2];
const CRE_COUNTS: Record<number, number> = {
  1: 89, 2: 107, 3: 190, 4: 149, 5: 190, 6: 135,
  7: 141, 8: 155, 9: 178, 10: 96, 11: 118,
};
const CRE_NAMES: Record<number, string> = {
  1: 'Centro', 2: 'Zona Sul', 3: 'Méier', 4: 'Irajá', 5: 'Bangu', 6: 'Barra',
  7: 'Ilha', 8: 'Madureira', 9: 'Campo Grande', 10: 'Santa Cruz', 11: 'Realengo',
};
const CRE_CENTRES: Record<number, [number, number]> = {
  10: [-43.700, -22.918], 9: [-43.575, -22.898], 5: [-43.472, -22.872],
  11: [-43.400, -22.884], 6: [-43.358, -22.980], 8: [-43.330, -22.858],
  3: [-43.278, -22.892], 7: [-43.248, -22.818], 4: [-43.318, -22.816],
  1: [-43.192, -22.892], 2: [-43.208, -22.960],
};
const OUTLINE: [number, number][] = [
  [-43.790, -22.888], [-43.720, -22.852], [-43.648, -22.822], [-43.578, -22.802],
  [-43.500, -22.800], [-43.420, -22.820], [-43.352, -22.798], [-43.282, -22.788],
  [-43.220, -22.798], [-43.158, -22.830], [-43.148, -22.892], [-43.172, -22.940],
  [-43.212, -22.982], [-43.282, -23.012], [-43.360, -23.030], [-43.450, -23.022],
  [-43.552, -23.000], [-43.650, -22.972], [-43.742, -22.940],
];

function insideOutline(lon: number, lat: number): boolean {
  let hit = false;
  for (let i = 0, j = OUTLINE.length - 1; i < OUTLINE.length; j = i, i += 1) {
    const [xi, yi] = OUTLINE[i];
    const [xj, yj] = OUTLINE[j];
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

/** Box–Muller com o PRNG semeado; mantém a geração determinística. */
function gauss(rand: () => number): number {
  const u = Math.max(1e-9, rand());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rand());
}

function samplePoint(cre: number, rand: () => number): [number, number] {
  const [cx, cy] = CRE_CENTRES[cre];
  for (let attempt = 0; attempt < 40; attempt += 1) {
    const lon = cx + gauss(rand) * 0.024;
    const lat = cy + gauss(rand) * 0.017;
    if (insideOutline(lon, lat)) return [lon, lat];
  }
  return [cx, cy];
}

interface Knobs {
  attendance: number;
  shortage: number;
  capacity: number;
  /** Cobertura por indicador: <50% bloqueia, <80% degrada. */
  assessCoverage: number;
  capCoverage: number;
  /** Variação da frequência ao longo dos 12 meses (fim menos início). */
  trend: number;
}

/** Perfis por CRE. Codificam correlações narrativas, nunca causalidade. */
const CRE_KNOBS: Record<number, Knobs> = {
  1: { attendance: 0.962, shortage: 0.028, capacity: 0.874, assessCoverage: 0.97, capCoverage: 0.96, trend: +0.006 },
  2: { attendance: 0.966, shortage: 0.024, capacity: 0.891, assessCoverage: 0.97, capCoverage: 0.96, trend: +0.009 },
  3: { attendance: 0.954, shortage: 0.041, capacity: 0.923, assessCoverage: 0.93, capCoverage: 0.94, trend: +0.007 },
  4: { attendance: 0.948, shortage: 0.052, capacity: 0.906, assessCoverage: 0.41, capCoverage: 0.92, trend: -0.008 },
  5: { attendance: 0.906, shortage: 0.108, capacity: 0.948, assessCoverage: 0.88, capCoverage: 0.93, trend: -0.042 },
  6: { attendance: 0.958, shortage: 0.031, capacity: 0.961, assessCoverage: 0.96, capCoverage: 0.95, trend: +0.008 },
  7: { attendance: 0.938, shortage: 0.144, capacity: 0.918, assessCoverage: 0.88, capCoverage: 0.90, trend: -0.005 },
  8: { attendance: 0.956, shortage: 0.036, capacity: 0.912, assessCoverage: 0.95, capCoverage: 0.94, trend: +0.005 },
  9: { attendance: 0.928, shortage: 0.083, capacity: 1.021, assessCoverage: 0.90, capCoverage: 0.71, trend: -0.019 },
  10: { attendance: 0.951, shortage: 0.043, capacity: 0.868, assessCoverage: 0.90, capCoverage: 0.92, trend: +0.004 },
  11: { attendance: 0.945, shortage: 0.057, capacity: 0.884, assessCoverage: 0.93, capCoverage: 0.93, trend: -0.003 },
};

function metric(
  id: IndicatorId,
  value: number | null,
  status: QualityStatus,
  formula: string,
  kind: SchoolMetric['source_kind'],
  schoolId: string,
  series: number[] | null,
  coverage: number,
): SchoolMetric {
  if (value === null) {
    return {
      indicator_id: id,
      value: null,
      period: null,
      quality_status: 'BLOCKED',
      source_kind: kind,
      formula_version: formula,
      provenance: provenance(`${id}_facts.parquet`, kind),
      evidence_id: null,
      interpretable: false,
      series: null,
      coverage,
    };
  }
  return {
    indicator_id: id,
    value,
    period: '2026-07-01',
    quality_status: status,
    source_kind: kind,
    formula_version: formula,
    provenance: provenance(`${id}_facts.parquet`, kind),
    evidence_id: `synthetic:${SNAPSHOT.slice(0, 12)}:${schoolId}:${id}:2026-07-01`,
    interpretable: status === 'OK',
    series,
    coverage,
  };
}

function buildSeries(end: number, drift: number, rand: () => number): number[] {
  const out: number[] = [];
  for (let i = 0; i < 12; i += 1) {
    const t = i / 11;
    const base = end - drift * (1 - t);
    out.push(base + (rand() - 0.5) * Math.abs(drift) * 0.35);
  }
  out[11] = end;
  return out.map((v) => Number(v.toFixed(5)));
}

function generate(): {
  collection: SchoolMapCollection;
  byId: Map<string, SchoolMapFeature>;
} {
  const rand = mulberry32(SEED);
  const features: SchoolMapFeature[] = [];
  let missing = 0;
  let seq = 0;

  CRE_ORDER.forEach((cre) => {
    const k = CRE_KNOBS[cre];

    for (let i = 0; i < CRE_COUNTS[cre]; i += 1) {
      seq += 1;
      const schoolId = `SYNTHETIC-SCHOOL-${String(seq).padStart(4, '0')}`;
      const microarea = 1 + Math.floor(rand() * 12);

      // ~3% da rede sem coordenada: continua no total e fica fora do mapa.
      if (rand() < 0.029) {
        missing += 1;
        continue;
      }

      const [lon, lat] = samplePoint(cre, rand);

      const jitter = (scale: number) => (rand() - 0.5) * scale;
      const attendance = Math.min(0.995, Math.max(0.79, k.attendance + jitter(0.034)));
      const shortage = Math.max(0, k.shortage + jitter(0.05));
      const capacity = Math.max(0.55, k.capacity + jitter(0.15));
      const assessment = 218 + (attendance - 0.95) * 300 + jitter(18);

      // Regra publicada: cobertura <50% bloqueia a leitura, <80% a degrada.
      const assessmentBlocked = k.assessCoverage < 0.5;
      const degradedCapacity = k.capCoverage < 0.8;
      const metrics: MetricMap = {
        attendance_rate: metric(
          'attendance_rate', Number(attendance.toFixed(4)), 'OK', 'ratio-of-sums-v1',
          'SYNTHETIC_SCHEMA_FAITHFUL', schoolId,
          buildSeries(attendance, k.trend + jitter(0.006), rand), 0.96,
        ),
        assessment_score: assessmentBlocked
          ? metric('assessment_score', null, 'BLOCKED', 'mean-score-v1', 'SYNTHETIC_SCHEMA_FAITHFUL', schoolId, null, k.assessCoverage)
          : metric('assessment_score', Number(assessment.toFixed(1)), 'OK', 'mean-score-v1', 'SYNTHETIC_SCHEMA_FAITHFUL', schoolId, buildSeries(assessment, jitter(6), rand), k.assessCoverage),
        capacity_utilization: metric(
          'capacity_utilization', Number(capacity.toFixed(4)),
          degradedCapacity ? 'DEGRADED' : 'OK', 'ratio-of-sums-v1', 'SYNTHETIC_INFERRED',
          schoolId, buildSeries(capacity, jitter(0.05), rand), k.capCoverage,
        ),
        teacher_shortage_rate: metric(
          'teacher_shortage_rate', Number(shortage.toFixed(4)), 'OK', 'ratio-of-sums-v1',
          'SYNTHETIC_INFERRED', schoolId, buildSeries(shortage, -jitter(0.03), rand), 0.88,
        ),
      };

      const worst: QualityStatus = assessmentBlocked ? 'BLOCKED' : degradedCapacity ? 'DEGRADED' : 'OK';

      features.push({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [Number(lon.toFixed(6)), Number(lat.toFixed(6))] },
        properties: {
          identity: {
            school_id: schoolId,
            nome: `Escola Sintética ${String(seq).padStart(4, '0')}`,
            inep_id: null,
            sme_designation: null,
            cre,
            bairro: `${CRE_NAMES[cre]} · microárea ${String(microarea).padStart(2, '0')}`,
            dependency: 'SYNTHETIC_MUNICIPAL',
            school_type: null,
            source_kind: 'SYNTHETIC_SCHEMA_FAITHFUL',
            limitations: [SYNTHETIC_LIMITATION],
          },
          location: { location_source: 'SYNTHETIC', match_method: 'SYNTHETIC', quality: 'SYNTHETIC' },
          metrics,
          quality_status: worst,
          enrolment: 180 + Math.floor(rand() * 900),
        },
      });
    }
  });

  const total = features.length + missing;
  const collection: SchoolMapCollection = {
    type: 'FeatureCollection',
    features,
    coverage: {
      total,
      geolocated: features.length,
      missing,
      returned: features.length,
      truncated: false,
      coverage_ratio: features.length / total,
    },
    available_cres: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    snapshot_id: SNAPSHOT,
    generated: true,
    provenance: provenance('frontend_fixture', 'SYNTHETIC_SCHEMA_FAITHFUL'),
    limitations: [
      SYNTHETIC_LIMITATION,
      'Fixture do front-end: não substitui o dataset governado do backend.',
      'Escolas sem coordenada permanecem no total e ficam fora do mapa; ausência não é zero.',
    ],
  };

  const byId = new Map(features.map((f) => [f.properties.identity.school_id, f]));
  return { collection, byId };
}

let cache: ReturnType<typeof generate> | null = null;
export function fixtureMap(): SchoolMapCollection {
  if (!cache) cache = generate();
  return cache.collection;
}
export function fixtureSchool(id: string): SchoolMapFeature | undefined {
  if (!cache) cache = generate();
  return cache.byId.get(id);
}

export const FIXTURE_CAPABILITIES: Capability[] = [
  { id: 'network', label: 'Visão da rede', description: 'Síntese dos principais sinais da rede municipal.', status: 'MOCK_ONLY', source_status: 'SYNTHETIC_SCHEMA_FAITHFUL', screens: ['hoje'], agents: [], limitations: ['Opera somente com dados sintéticos fiéis ao schema.'], updated_at: '2026-08-26T00:00:00Z' },
  { id: 'schools', label: 'Escolas', description: 'Visão agregada e comparável das unidades escolares.', status: 'MOCK_ONLY', source_status: 'SYNTHETIC_SCHEMA_FAITHFUL', screens: ['comparar', 'mapa', 'escola'], agents: [], limitations: ['Opera somente com dados sintéticos fiéis ao schema.'], updated_at: '2026-08-26T00:00:00Z' },
  { id: 'school-identity', label: 'Identidade escolar oficial', description: 'Resolução auditável por ID interno, INEP ou designação SME.', status: 'SCHEMA_ONLY', source_status: 'KNOWN_UNAVAILABLE', screens: [], agents: [], limitations: ['Release curada do cadastro oficial ainda não está conectada.'], updated_at: '2026-08-26T00:00:00Z' },
  { id: 'learning', label: 'Aprendizagem', description: 'Indicadores de avaliações e aprendizagem.', status: 'DEGRADED', source_status: 'SYNTHETIC_SCHEMA_FAITHFUL', screens: ['comparar'], agents: [], limitations: ['Cobertura insuficiente na 4ª e na 5ª CRE bloqueia a leitura do indicador.'], updated_at: '2026-08-26T00:00:00Z' },
  { id: 'attendance', label: 'Frequência', description: 'Indicadores de frequência e fluxo escolar.', status: 'MOCK_ONLY', source_status: 'SYNTHETIC_SCHEMA_FAITHFUL', screens: ['comparar'], agents: [], limitations: ['Opera somente com dados sintéticos agregados.'], updated_at: '2026-08-26T00:00:00Z' },
  { id: 'capacity', label: 'Capacidade', description: 'Indicadores de vagas, salas e ocupação.', status: 'DEGRADED', source_status: 'SYNTHETIC_INFERRED', screens: ['comparar'], agents: [], limitations: ['Denominador de capacidade ausente em parte da 9ª CRE.'], updated_at: '2026-08-26T00:00:00Z' },
  { id: 'staffing', label: 'Pessoal', description: 'Indicadores de carência e alocação docente.', status: 'MOCK_ONLY', source_status: 'SYNTHETIC_INFERRED', screens: ['comparar'], agents: [], limitations: ['Opera somente com dados sintéticos de schema inferido.'], updated_at: '2026-08-26T00:00:00Z' },
  { id: 'equity', label: 'Equidade', description: 'Recortes agregados de equidade.', status: 'UNAVAILABLE', source_status: 'KNOWN_UNAVAILABLE', screens: ['equidade'], agents: [], limitations: ['Atributos, cobertura e base legal ainda não foram confirmados.'], updated_at: '2026-08-26T00:00:00Z' },
  { id: 'interventions', label: 'Intervenções', description: 'Programas, ações e intervenções da rede.', status: 'DISABLED', source_status: 'KNOWN_UNAVAILABLE', screens: ['intervencoes'], agents: [], limitations: ['Módulo desabilitado por configuração.'], updated_at: '2026-08-26T00:00:00Z' },
];

/**
 * Situações: fixture do contrato antecipado de `/api/v1/network/snapshot`.
 * NÃO são computadas pelo front-end. Priorização governada é responsabilidade
 * do backend determinístico + agente revisado.
 */
export const FIXTURE_SITUATIONS: Situation[] = [
  {
    id: 'SIT-2026-0841',
    title: 'Frequência abaixo do padrão da rede em 11 escolas da 5ª CRE',
    level: 'critical',
    meta: '8.412 alunos · persistente há 3 meses · cobertura 96%',
    confidence: 0.96,
    agent: 'Sentinela da Rede',
    cre: 5,
    indicator: 'attendance_rate',
  },
  {
    id: 'SIT-2026-0839',
    title: 'Queda aparente de desempenho na 4ª CRE, bloqueada pelo Guardião',
    level: 'unreadable',
    meta: 'cobertura 41%, abaixo do limiar de 50% · pode ser ausência de lançamento, não de aprendizagem',
    confidence: null,
    agent: 'Guardião de Dados',
    cre: 4,
    indicator: 'assessment_score',
    blockedReason: 'Nenhum número desta situação é exibido enquanto a cobertura não atingir 50%.',
  },
  {
    id: 'SIT-2026-0837',
    title: 'Carência docente concentrada em Matemática e Ciências na 7ª CRE',
    level: 'attention',
    meta: '340 h/semana em 9 unidades · sem identificação de profissional · cobertura 88%',
    confidence: 0.81,
    agent: 'Sentinela da Rede',
    cre: 7,
    indicator: 'teacher_shortage_rate',
  },
  {
    id: 'SIT-2026-0834',
    title: 'Ocupação acima de 100% em 6 unidades de educação infantil da 9ª CRE',
    level: 'degraded',
    meta: 'o denominador de capacidade falta em 4 unidades · cobertura 71%',
    confidence: 0.46,
    agent: 'Sentinela da Rede',
    cre: 9,
    indicator: 'capacity_utilization',
  },
];
