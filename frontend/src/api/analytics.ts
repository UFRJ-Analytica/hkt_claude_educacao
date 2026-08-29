/**
 * Cliente das APIs analíticas e de IA governada.
 *
 * Diferente de `client.ts`, estes endpoints não têm fallback para fixture: se a
 * API não responde, a tela declara isso e usa o caminho determinístico local.
 * A regra do produto é essa mesma — Claude é aditivo, nunca ponto de falha.
 */

import { apiSource } from './client';
import type {
  AIBriefingResponseV1,
  AIRole,
  AISchoolActionPlanResponseV1,
  SchoolContext,
  DataQualitySummaryV1,
  EvidenceRecordV1,
  NetworkSnapshotV1,
} from './types';

async function base(): Promise<string | null> {
  const src = await apiSource();
  return src.mode === 'live' ? src.base : null;
}

export async function getNetworkSnapshot(cre?: number | null): Promise<NetworkSnapshotV1 | null> {
  const b = await base();
  if (!b) return null;
  try {
    const res = await fetch(`${b}/api/v1/network/snapshot${cre ? `?cre=${cre}` : ''}`);
    if (!res.ok) return null;
    return (await res.json()) as NetworkSnapshotV1;
  } catch {
    return null;
  }
}

export async function getDataQuality(cre?: number | null): Promise<DataQualitySummaryV1 | null> {
  const b = await base();
  if (!b) return null;
  try {
    const res = await fetch(`${b}/api/v1/data/quality${cre ? `?cre=${cre}` : ''}`);
    if (!res.ok) return null;
    return (await res.json()) as DataQualitySummaryV1;
  } catch {
    return null;
  }
}

export async function getEvidence(evidenceId: string): Promise<EvidenceRecordV1 | null> {
  const b = await base();
  if (!b) return null;
  try {
    const res = await fetch(`${b}/api/v1/evidence/${encodeURIComponent(evidenceId)}`);
    if (!res.ok) return null;
    return (await res.json()) as EvidenceRecordV1;
  } catch {
    return null;
  }
}

export interface BriefingOutcome {
  ok: boolean;
  response: AIBriefingResponseV1 | null;
  /** Motivo legível quando a IA não pôde responder. Vai para a tela. */
  reason: string | null;
}

/**
 * O contrato exige `evidence_ids` resolvidos ANTES da chamada: o modelo nunca
 * consulta o banco, ele narra evidências que já passaram pela governança. O
 * front escolhe as evidências a partir do snapshot e envia no máximo 8.
 */
export async function askBriefing(
  question: string,
  role: AIRole,
  evidenceIds: string[],
): Promise<BriefingOutcome> {
  const b = await base();
  if (!b) return { ok: false, response: null, reason: 'API indisponível' };
  if (evidenceIds.length === 0) {
    return { ok: false, response: null, reason: 'nenhuma evidência elegível no snapshot' };
  }
  try {
    const res = await fetch(`${b}/api/v1/ai/briefings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, role, evidence_ids: evidenceIds.slice(0, 8) }),
    });
    if (!res.ok) {
      const body = (await res.json().catch(() => null)) as { error?: { message?: string } } | null;
      return { ok: false, response: null, reason: body?.error?.message ?? `HTTP ${res.status}` };
    }
    return { ok: true, response: (await res.json()) as AIBriefingResponseV1, reason: null };
  } catch {
    return { ok: false, response: null, reason: 'falha de rede' };
  }
}

export const AI_ROLE_BY_UI: Record<string, AIRole> = {
  sme: 'central_manager',
  escola: 'school_manager',
  professor: 'teacher',
  familia: 'guardian',
};

/**
 * Contexto de uma escola REAL. Abre sempre: quando não há métrica carregada para
 * o identificador, o backend devolve `metric_coverage.status = IDENTITY_ONLY`
 * com identidade e coordenadas reais — nunca um 404.
 */
export async function getSchoolContext(schoolId: string): Promise<SchoolContext | null> {
  const b = await base();
  if (!b) return null;
  try {
    const res = await fetch(`${b}/api/v1/schools/${encodeURIComponent(schoolId)}/context`);
    if (!res.ok) return null;
    return (await res.json()) as SchoolContext;
  } catch {
    return null;
  }
}

export interface ActionPlanOutcome {
  ok: boolean;
  response: AISchoolActionPlanResponseV1 | null;
  /** Mensagem pronta para a tela quando a IA não pôde responder. */
  reason: string | null;
}

export async function postSchoolActionPlan(
  schoolId: string,
  role: AIRole,
  focus: string,
): Promise<ActionPlanOutcome> {
  const b = await base();
  if (!b) return { ok: false, response: null, reason: 'API indisponível' };
  try {
    const res = await fetch(`${b}/api/v1/ai/school-action-plans`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ school_id: schoolId, role, focus }),
    });
    if (res.status === 503) {
      return { ok: false, response: null, reason: 'IA indisponível ou configuração pendente' };
    }
    if (res.status === 422) {
      return { ok: false, response: null, reason: 'Pedido fora da governança' };
    }
    if (!res.ok) return { ok: false, response: null, reason: `HTTP ${res.status}` };
    return { ok: true, response: (await res.json()) as AISchoolActionPlanResponseV1, reason: null };
  } catch {
    return { ok: false, response: null, reason: 'falha de rede' };
  }
}
