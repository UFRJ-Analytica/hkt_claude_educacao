/**
 * Contratos da API.
 *
 * O que existe aqui é o que o backend serve hoje. Nada de tipo especulativo:
 * quando a capacidade de unidades, fila e convocação for ligada ao extrato da
 * SME, o tipo entra junto com o endpoint que o devolve.
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

export interface Health {
  status: string;
  service: string;
  version: string;
  environment: string;
}

export interface ApiSource {
  online: boolean;
  base: string;
  note: string;
}
