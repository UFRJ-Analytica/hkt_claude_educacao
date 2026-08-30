/**
 * Cliente da API. No modo `auto`, o backend so e usado quando declara as
 * capacidades necessarias como AVAILABLE. Ate la, a interface identifica os
 * dados de demonstracao em vez de tratar um /health bem-sucedido como prova de
 * que os endpoints de negocio existem.
 */
import { haversineKm } from '../domain/geo';
import { mockConsultarInscricao, mockCriarInscricao, mockResponderConvocacao, mockSimularEvento } from '../mocks/inscricoes';
import {
  buscarCepViaCep,
  geocodificar,
  mockConfirmarPix,
  mockEnviarOtp,
  mockEnviarPixVerificacao,
  mockPreAnalisarDocumento,
  mockVerificarOtp,
  type OtpEnvio,
  type PixEnvio,
} from '../mocks/servicos';
import { todasUnidades, unidadePorId } from '../mocks/unidades';
import type { ApiSource, CriterioId, DocumentoAnalise, Endereco, Grupamento, Horario, Inscricao, Unidade, UnidadeProxima } from './types';

type RequestedApiMode = 'auto' | 'live' | 'fixture';

interface CapabilitySummary {
  id: string;
  status: string;
}

const REQUIRED_CAPABILITIES = ['unidades', 'inscricao'] as const;
const DEFAULT_BASE = 'http://127.0.0.1:8000';

function normalizeApiBase(raw: string | undefined): string {
  const candidate = (raw?.trim() || DEFAULT_BASE).replace(/\/+$/, '');
  const url = new URL(candidate);

  // Browsers block HTTP APIs when the frontend itself was loaded over HTTPS.
  if (import.meta.env.PROD && url.protocol === 'http:') url.protocol = 'https:';
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('VITE_API_BASE deve usar http:// ou https://');
  }

  return url.toString().replace(/\/$/, '');
}

function requestedApiMode(raw: string | undefined): RequestedApiMode {
  const mode = raw?.trim() || 'auto';
  if (mode === 'auto' || mode === 'live' || mode === 'fixture') return mode;
  throw new Error('VITE_API_MODE deve ser auto, live ou fixture');
}

const BASE = normalizeApiBase(import.meta.env.VITE_API_BASE as string | undefined);
const MODE = requestedApiMode(import.meta.env.VITE_API_MODE as string | undefined);

let resolved: ApiSource | null = null;

async function probe(): Promise<ApiSource> {
  if (MODE === 'fixture') return { mode: 'fixture', base: null, note: 'Dados de demonstração (VITE_API_MODE=fixture)' };

  const ctrl = new AbortController();
  const timeout = setTimeout(() => ctrl.abort(), 3000);
  try {
    const health = await fetch(`${BASE}/health`, { signal: ctrl.signal });
    if (!health.ok) throw new Error(`health respondeu ${health.status}`);

    const response = await fetch(`${BASE}/api/v1/capabilities`, { signal: ctrl.signal });
    if (!response.ok) throw new Error(`capabilities respondeu ${response.status}`);

    const capabilities = (await response.json()) as CapabilitySummary[];
    const unavailable = REQUIRED_CAPABILITIES.filter(
      (id) => capabilities.find((capability) => capability.id === id)?.status !== 'AVAILABLE',
    );
    if (unavailable.length === 0) {
      return { mode: 'live', base: BASE, note: `Backend em ${BASE}` };
    }

    return {
      mode: 'fixture',
      base: null,
      note: `Backend conectado; dados reais ainda indisponíveis (${unavailable.join(', ')})`,
    };
  } catch {
    return { mode: 'fixture', base: null, note: 'Dados de demonstração — backend não respondeu' };
  } finally {
    clearTimeout(timeout);
  }
}

export async function apiSource(): Promise<ApiSource> {
  if (!resolved) resolved = await probe();
  return resolved;
}

async function live<T>(path: string, init?: RequestInit): Promise<T | null> {
  const src = await apiSource();
  if (src.mode !== 'live' || !src.base) return null;
  try {
    const res = await fetch(`${src.base}/api/v1${path}`, init);
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/* ---------- Unidades ---------- */
export interface BuscaUnidades {
  lat: number;
  lon: number;
  grupamento: Grupamento;
  horario?: Horario | null;
  bairro?: string | null;
  limite?: number;
}

export async function listarUnidades(q: BuscaUnidades): Promise<UnidadeProxima[]> {
  const params = new URLSearchParams({ lat: String(q.lat), lon: String(q.lon), grupamento: q.grupamento });
  if (q.horario) params.set('horario', q.horario);
  if (q.bairro) params.set('bairro', q.bairro);
  const remoto = await live<UnidadeProxima[]>(`/unidades?${params.toString()}`);
  if (remoto) return remoto;

  const base = todasUnidades();
  const bairroN = q.bairro?.trim().toLowerCase();
  const lista: UnidadeProxima[] = base
    .filter((u) => (bairroN ? u.bairro.toLowerCase().includes(bairroN) : true))
    .map((u) => {
      const oferta =
        u.ofertas.find((o) => o.grupamento === q.grupamento && (!q.horario || o.horario === q.horario)) ??
        u.ofertas.find((o) => o.grupamento === q.grupamento) ??
        null;
      return { ...u, distanciaKm: haversineKm(q.lat, q.lon, u.lat, u.lon), oferta };
    })
    .filter((u) => u.oferta !== null)
    .sort((a, b) => a.distanciaKm - b.distanciaKm);
  return lista.slice(0, q.limite ?? 60);
}

export async function obterUnidade(id: string): Promise<Unidade | null> {
  return (await live<Unidade>(`/unidades/${encodeURIComponent(id)}`)) ?? unidadePorId(id);
}

/* ---------- Endereço ---------- */
export async function buscarCep(cep: string): Promise<Partial<Endereco> | null> {
  return (await live<Partial<Endereco>>(`/cep/${cep.replace(/\D/g, '')}`)) ?? buscarCepViaCep(cep);
}
export { geocodificar };

/* ---------- Verificações de contato ---------- */
export async function enviarOtp(telefone: string): Promise<OtpEnvio> {
  return (await live<OtpEnvio>('/otp', { method: 'POST', body: JSON.stringify({ telefone }), headers: { 'Content-Type': 'application/json' } })) ?? mockEnviarOtp(telefone);
}
export async function verificarOtp(telefone: string, codigo: string): Promise<boolean> {
  const r = await live<{ ok: boolean }>('/otp/verificar', { method: 'POST', body: JSON.stringify({ telefone, codigo }), headers: { 'Content-Type': 'application/json' } });
  return r ? r.ok : mockVerificarOtp(telefone, codigo);
}
export async function enviarPixVerificacao(chave: string): Promise<PixEnvio> {
  return (await live<PixEnvio>('/pix/verificar', { method: 'POST', body: JSON.stringify({ chave }), headers: { 'Content-Type': 'application/json' } })) ?? mockEnviarPixVerificacao(chave);
}
export async function confirmarPix(chave: string, codigo: string): Promise<boolean> {
  const r = await live<{ ok: boolean }>('/pix/confirmar', { method: 'POST', body: JSON.stringify({ chave, codigo }), headers: { 'Content-Type': 'application/json' } });
  return r ? r.ok : mockConfirmarPix(chave, codigo);
}

/* ---------- Documentos ---------- */
export async function preAnalisarDocumento(criterio: CriterioId, file: File, contexto: { nomeCrianca: string; nomeResponsavel: string }): Promise<DocumentoAnalise> {
  const fd = new FormData();
  fd.set('criterio', criterio);
  fd.set('arquivo', file);
  fd.set('contexto', JSON.stringify(contexto));
  return (await live<DocumentoAnalise>('/documentos/pre-analise', { method: 'POST', body: fd })) ?? mockPreAnalisarDocumento(criterio, file, contexto);
}

/* ---------- Inscrição ---------- */
export type NovaInscricao = Parameters<typeof mockCriarInscricao>[0];
export async function criarInscricao(dados: NovaInscricao): Promise<Inscricao> {
  return (await live<Inscricao>('/inscricoes', { method: 'POST', body: JSON.stringify(dados), headers: { 'Content-Type': 'application/json' } })) ?? mockCriarInscricao(dados);
}
export async function consultarInscricao(codigo: string, cpf: string): Promise<Inscricao | null> {
  return (await live<Inscricao>(`/inscricoes/${encodeURIComponent(codigo)}?cpf=${cpf.replace(/\D/g, '')}`)) ?? mockConsultarInscricao(codigo, cpf);
}
export async function responderConvocacao(codigo: string, aceite: boolean): Promise<Inscricao | null> {
  return (await live<Inscricao>(`/inscricoes/${encodeURIComponent(codigo)}/convocacao`, { method: 'POST', body: JSON.stringify({ aceite }), headers: { 'Content-Type': 'application/json' } })) ?? mockResponderConvocacao(codigo, aceite);
}
export async function simularEvento(codigo: string, evento: 'convocar' | 'reiniciar'): Promise<Inscricao | null> {
  return mockSimularEvento(codigo, evento);
}
