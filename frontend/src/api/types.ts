/**
 * Espelha os contratos Pydantic do backend (`app/contracts`, `app/schools/contracts.py`).
 * Nenhum campo é inventado aqui: o que não existe no contrato vive em `FixtureExtras`
 * e é explicitamente marcado na interface como indisponível em modo live.
 */

export type CapabilityStatus =
  | 'AVAILABLE'
  | 'MOCK_ONLY'
  | 'SCHEMA_ONLY'
  | 'UNAVAILABLE'
  | 'DISABLED'
  | 'DEGRADED';

export type SourceKind =
  | 'REAL_PUBLIC'
  | 'METADATA_CONFIRMED'
  | 'SYNTHETIC_SCHEMA_FAITHFUL'
  | 'SYNTHETIC_INFERRED'
  | 'KNOWN_UNAVAILABLE';

export type QualityStatus = 'OK' | 'DEGRADED' | 'BLOCKED';

export type IndicatorId =
  | 'attendance_rate'
  | 'assessment_score'
  | 'capacity_utilization'
  | 'teacher_shortage_rate';

export interface Capability {
  id: string;
  label: string;
  description: string;
  status: CapabilityStatus;
  source_status: SourceKind;
  screens: string[];
  agents: string[];
  limitations: string[];
  updated_at: string;
}

export interface Provenance {
  source_id: string;
  source_kind: SourceKind;
  generated: boolean;
  as_of: string | null;
  data_version: string | null;
  generation_seed: number | null;
  scenario_reference: string | null;
  scenario_hash: string | null;
  limitations: string[];
}

export interface SchoolIdentity {
  school_id: string;
  nome: string;
  inep_id: string | null;
  sme_designation: string | null;
  cre: number;
  bairro: string | null;
  dependency: string;
  school_type: string | null;
  source_kind: SourceKind;
  limitations: string[];
}

export interface LocationMetadata {
  location_source: 'SME_SCHOOL_CATALOG' | 'DATARIO' | 'CENSO_ESCOLAR' | 'SYNTHETIC';
  match_method: 'OFFICIAL_ID' | 'SME_DESIGNATION' | 'EXACT_NAME_NEIGHBORHOOD' | 'SYNTHETIC';
  quality: 'CONFIRMED' | 'MATCHED' | 'SYNTHETIC' | 'MISSING';
}

export interface SchoolMetric {
  indicator_id: IndicatorId;
  value: number | null;
  period: string | null;
  quality_status: QualityStatus;
  source_kind: SourceKind;
  formula_version: string;
  provenance: Provenance;
  evidence_id: string | null;
  interpretable: boolean;
  /** Fora do contrato do backend. Só existe em modo fixture. Ver `FixtureExtras`. */
  series?: number[] | null;
  /** Fora do contrato. Cobertura declarada por indicador; só em fixture. */
  coverage?: number | null;
}

export type MetricMap = Partial<Record<IndicatorId, SchoolMetric>>;

export interface SchoolMapFeature {
  type: 'Feature';
  geometry: { type: 'Point'; coordinates: [number, number] };
  properties: {
    identity: SchoolIdentity;
    location: LocationMetadata;
    metrics: MetricMap;
    quality_status: QualityStatus;
    /** Fora do contrato. Matrículas atendidas; só em fixture. */
    enrolment?: number;
  };
}

export interface MapCoverage {
  total: number;
  geolocated: number;
  missing: number;
  returned: number;
  truncated: boolean;
  coverage_ratio: number;
}

export interface SchoolMapCollection {
  type: 'FeatureCollection';
  features: SchoolMapFeature[];
  coverage: MapCoverage;
  available_cres: number[];
  snapshot_id: string;
  generated: boolean;
  provenance: Provenance;
  limitations: string[];
}

export interface SchoolProfile {
  identity: SchoolIdentity;
  coordinates: { latitude: number; longitude: number } | null;
  location: LocationMetadata;
  metrics: MetricMap;
  quality_status: QualityStatus;
  snapshot_id: string;
  generated: boolean;
  provenance: Provenance;
}

/**
 * Contrato ANTECIPADO de `GET /api/v1/network/snapshot`, ainda não implementado
 * no backend (fase B3 da correção de rota). O front consome esta forma para que
 * a integração seja troca de URL. Em modo live, a tela declara que a origem é
 * fixture.
 */
export interface Situation {
  id: string;
  title: string;
  level: 'critical' | 'attention' | 'low' | 'degraded' | 'unreadable';
  meta: string;
  confidence: number | null;
  agent: string;
  cre: number | null;
  indicator: IndicatorId | null;
  blockedReason?: string;
}

export type ApiMode = 'live' | 'fixture';

export interface ApiSource {
  mode: ApiMode;
  base: string | null;
  note: string;
}
