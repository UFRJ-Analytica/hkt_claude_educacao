/**
 * Cliente da API.
 *
 * Não há mais fallback para fixture. O fallback existia porque, na véspera do
 * evento, o dado era desconhecido e a tela precisava de algo para desenhar —
 * era sintético honesto. Agora o dado é real e está no extrato da SME: se a API
 * não responde, a tela diz que não respondeu, e não inventa uma rede.
 */

import type { Capability, Health } from './types';

const BASE = (import.meta.env.VITE_API_BASE as string | undefined) ?? 'http://127.0.0.1:8000';

export function apiBase(): string {
  return BASE;
}

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) {
    throw new Error(`${path} respondeu ${res.status}`);
  }
  return (await res.json()) as T;
}

export function getHealth(): Promise<Health> {
  return get<Health>('/health');
}

export function getCapabilities(): Promise<Capability[]> {
  return get<Capability[]>('/api/v1/capabilities');
}
