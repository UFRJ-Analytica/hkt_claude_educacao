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
 * Situação priorizada. NÃO existe endpoint para isto ainda — a priorização
 * governada (gravidade × tendência × persistência × população × confiança) é
 * responsabilidade do backend determinístico com revisão de agente. O front
 * consome esta forma como fixture e a tela de Hoje declara a origem.
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

/* ============================================================
   Contratos analíticos e de IA — implementados no backend
   (app/analytics/contracts.py e app/ai/contracts.py).
   ============================================================ */

export type ScopeType = 'NETWORK' | 'CRE' | 'SCHOOL';
export interface AnalyticsScope {
  type: ScopeType;
  id: string;
}

export type AnalyticsIndicatorId = IndicatorId;

export interface ObservationRecordV1 {
  observation_id: string;
  evidence_id: string;
  scope: AnalyticsScope;
  indicator_id: AnalyticsIndicatorId;
  value: number | null;
  unit: string;
  numerator: number | null;
  denominator: number | null;
  period_start: string;
  period_end: string;
  published_at: string | null;
  coverage_numerator: number;
  coverage_denominator: number;
  quality: QualityStatus;
  interpretable: boolean;
  formula_version: string;
  provenance: Provenance;
  limitations: string[];
  suppressed?: boolean;
}

export interface NetworkSnapshotV1 {
  api_contract_version: string;
  snapshot_id: string;
  scope: AnalyticsScope;
  school_count: number;
  observations: ObservationRecordV1[];
  generated: boolean;
  provenance: Provenance;
  limitations: string[];
}

export interface QualityCheckSummaryV1 {
  check_id: string;
  status: QualityStatus;
  affected_school_count: number;
  observed_school_count: number;
  school_count: number;
  coverage_mean: number;
  coverage_aggregation: 'mean';
}

export interface DataQualitySummaryV1 {
  api_contract_version: string;
  snapshot_id: string;
  scope: AnalyticsScope;
  checks: QualityCheckSummaryV1[];
  generated: boolean;
  provenance: Provenance;
  limitations: string[];
}

export interface EvidenceRecordV1 {
  api_contract_version: string;
  snapshot_id: string;
  evidence_id: string;
  observation: ObservationRecordV1;
}

/** Papéis do runtime de IA. Espelham o seletor de papel da interface. */
export type AIRole = 'central_manager' | 'school_manager' | 'teacher' | 'guardian';

export interface AIGovernancePolicyV1 {
  raw_rows_access: 'denied';
  decision_automation: 'denied';
  allowed_tools: string[];
  max_evidence_ids: number;
}

export interface AIBriefingResponseV1 {
  api_contract_version: string;
  provider: 'fake' | 'anthropic';
  model: string;
  role: AIRole;
  snapshot_id: string;
  used_evidence_ids: string[];
  answer: string;
  guardrails: string[];
  policy: AIGovernancePolicyV1;
}

/** `GET /api/v1/schools/official` — release curada do cadastro oficial. */
export interface OfficialSchoolRecord {
  identity: SchoolIdentity;
  coordinates: { latitude: number; longitude: number } | null;
}

export interface OfficialSchoolCollection {
  records: OfficialSchoolRecord[];
  coverage: { total: number; with_coordinates: number; returned: number };
  available_cres: number[];
  snapshot_id: string;
  generated: boolean;
  provenance: Provenance;
  limitations: string[];
}

/* ============================================================
   `GET /api/v1/schools/{id}/context` e
   `POST /api/v1/ai/school-action-plans`
   ============================================================ */

export type MetricCoverageStatus = 'IDENTITY_ONLY' | 'SYNTHETIC_SNAPSHOT_MATCHED';

export interface SchoolMetricComparison {
  indicator_id: IndicatorId;
  school_value: number;
  cre_average: number | null;
  network_average: number | null;
  delta_vs_cre: number | null;
  delta_vs_network: number | null;
  period: string | null;
  evidence_id: string | null;
  source_kind: SourceKind;
}

export interface SchoolContext {
  api_contract_version: string;
  official_record: {
    identity: SchoolIdentity;
    coordinates: { latitude: number; longitude: number } | null;
  };
  map_links: { google_maps_url: string; directions_url: string };
  metric_coverage: {
    status: MetricCoverageStatus;
    message: string;
    snapshot_id: string | null;
  };
  synthetic_profile: SchoolProfile | null;
  comparisons: SchoolMetricComparison[];
  provenance: Provenance;
  limitations: string[];
}

export interface SchoolActionPlan {
  title: string;
  observed_signals: string[];
  hypotheses_to_validate: string[];
  short_term_actions: string[];
  medium_term_actions: string[];
  data_gaps: string[];
}

export interface AISchoolActionPlanResponseV1 {
  api_contract_version: string;
  provider: 'fake' | 'anthropic';
  model: string;
  role: AIRole;
  school_context: SchoolContext;
  plan: SchoolActionPlan;
  guardrails: string[];
  policy: AIGovernancePolicyV1;
}
