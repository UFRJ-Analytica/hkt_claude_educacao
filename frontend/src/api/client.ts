/**
 * Cliente da API. Modo `auto` tenta o backend local e cai para fixture quando
 * ele não responde — a mesma regra do produto: a interface nunca é ponto de
 * falha, e a origem do dado é sempre declarada na tela.
 */

import {
  FIXTURE_CAPABILITIES,
  FIXTURE_SITUATIONS,
  fixtureMap,
  fixtureSchool,
  syntheticMetricsFor,
  syntheticQualityFor,
} from './fixtures';
import type {
  ApiMode,
  ApiSource,
  Capability,
  OfficialSchoolCollection,
  SchoolMapFeature,
  SchoolMapCollection,
  SchoolProfile,
  Situation,
} from './types';

const BASE = (import.meta.env.VITE_API_BASE as string | undefined) ?? 'http://127.0.0.1:8000';
const MODE = (import.meta.env.VITE_API_MODE as string | undefined) ?? 'auto';

let resolved: ApiSource | null = null;

async function probe(): Promise<ApiSource> {
  if (MODE === 'fixture') {
    return { mode: 'fixture', base: null, note: 'Fixture local (VITE_API_MODE=fixture)' };
  }
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 1500);
    const res = await fetch(`${BASE}/health`, { signal: controller.signal });
    clearTimeout(timer);
    if (res.ok) return { mode: 'live', base: BASE, note: `API local em ${BASE}` };
  } catch {
    /* backend ausente: segue para fixture */
  }
  if (MODE === 'live') {
    return { mode: 'fixture', base: null, note: 'API indisponível — fixture local em uso' };
  }
  return { mode: 'fixture', base: null, note: 'API não respondeu — fixture local em uso' };
}

export async function apiSource(): Promise<ApiSource> {
  if (!resolved) resolved = await probe();
  return resolved;
}

async function get<T>(path: string): Promise<T | null> {
  const src = await apiSource();
  if (src.mode !== 'live' || !src.base) return null;
  try {
    const res = await fetch(`${src.base}${path}`);
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getCapabilities(): Promise<Capability[]> {
  return (await get<Capability[]>('/api/v1/capabilities')) ?? FIXTURE_CAPABILITIES;
}

/**
 * Origem REAL dos dados exibidos — diferente de `apiSource()`, que só diz se a
 * API respondeu. A API pode estar de pé e ainda assim não sustentar a leitura
 * de rede; nesse caso o selo do topo precisa dizer fixture, não live.
 */
let lastMapOrigin: { mode: ApiMode; note: string; geoReal: boolean } = {
  mode: 'fixture',
  note: 'fixture local',
  geoReal: false,
};
export function mapOrigin() {
  return lastMapOrigin;
}

/**
 * Rede real do município: identidade, CRE, tipo e coordenada da release oficial
 * Data.Rio/SME. Não traz indicador — só o cadastro.
 */
export async function getOfficialSchools(): Promise<OfficialSchoolCollection | null> {
  return get<OfficialSchoolCollection>('/api/v1/schools/official?limit=2000');
}

/**
 * Compõe a rede real com indicadores sintéticos.
 *
 * A identidade é REAL_PUBLIC e cada métrica carrega a própria proveniência
 * SYNTHETIC_*. As duas origens convivem no mesmo objeto porque o contrato
 * separa `identity.source_kind` de `metric.source_kind` — e a interface mostra
 * as duas. Não é dado real de desempenho, e a tela nunca diz que é.
 */
function composeFromOfficial(official: OfficialSchoolCollection): SchoolMapCollection {
  const features: SchoolMapFeature[] = [];
  let missing = 0;

  for (const r of official.records) {
    if (!r.coordinates) {
      missing += 1;
      continue;
    }
    const { metrics, enrolment } = syntheticMetricsFor(r.identity.school_id, r.identity.cre);
    features.push({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [r.coordinates.longitude, r.coordinates.latitude],
      },
      properties: {
        identity: r.identity,
        location: {
          location_source: 'DATARIO',
          match_method: 'SME_DESIGNATION',
          quality: 'CONFIRMED',
        },
        metrics,
        quality_status: syntheticQualityFor(r.identity.cre),
        enrolment,
      },
    });
  }

  const total = features.length + missing;
  return {
    type: 'FeatureCollection',
    features,
    coverage: {
      total,
      geolocated: features.length,
      missing,
      returned: features.length,
      truncated: false,
      coverage_ratio: total === 0 ? 0 : features.length / total,
    },
    available_cres: official.available_cres,
    snapshot_id: official.snapshot_id,
    generated: false,
    provenance: official.provenance,
    limitations: [
      ...official.limitations,
      'Identidade, CRE, tipo e coordenada são reais. Os INDICADORES exibidos são sintéticos e cada métrica declara a própria proveniência.',
    ],
  };
}

export async function getSchoolMap(): Promise<SchoolMapCollection> {
  // 1) rede real do cadastro oficial, quando disponível
  const official = await getOfficialSchools();
  if (official && official.records.length >= 200) {
    lastMapOrigin = {
      mode: 'live',
      note: `cadastro oficial Data.Rio/SME · ${official.coverage.total.toLocaleString('pt-BR')} unidades reais · indicadores sintéticos`,
      geoReal: true,
    };
    return composeFromOfficial(official);
  }

  // 2) dataset sintético governado do backend
  const live = await get<SchoolMapCollection>('/api/v1/map/schools?limit=2000');
  // O dataset governado atual traz poucas unidades; quando ele não sustenta a
  // leitura de rede, a tela declara a fixture em vez de fingir cobertura.
  if (live && live.features.length >= 200) {
    lastMapOrigin = { mode: 'live', note: `API local · ${live.features.length} unidades`, geoReal: false };
    return live;
  }
  if (live) {
    lastMapOrigin = {
      mode: 'fixture',
      note: `API de pé, mas com ${live.features.length} unidades — insuficiente para leitura de rede. Fixture em uso.`,
      geoReal: false,
    };
    return {
      ...fixtureMap(),
      limitations: [
        ...fixtureMap().limitations,
        `A API respondeu com ${live.features.length} unidades — insuficiente para a leitura de rede. Fixture em uso.`,
      ],
    };
  }
  lastMapOrigin = { mode: 'fixture', note: 'API não respondeu — fixture local em uso', geoReal: false };
  return fixtureMap();
}

export async function getSchoolProfile(id: string): Promise<SchoolProfile | null> {
  const live = await get<SchoolProfile>(`/api/v1/schools/${encodeURIComponent(id)}/profile`);
  if (live) return live;
  const f = fixtureSchool(id);
  if (!f) return null;
  return {
    identity: f.properties.identity,
    coordinates: {
      latitude: f.geometry.coordinates[1],
      longitude: f.geometry.coordinates[0],
    },
    location: f.properties.location,
    metrics: f.properties.metrics,
    quality_status: f.properties.quality_status,
    snapshot_id: fixtureMap().snapshot_id,
    generated: true,
    provenance: fixtureMap().provenance,
  };
}

/** Contrato antecipado; ainda não existe endpoint. Ver types.ts. */
export async function getSituations(): Promise<Situation[]> {
  return FIXTURE_SITUATIONS;
}
