import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, type ReactNode } from 'react';
import type { CriterioId, DocumentoAnalise, Endereco, Grupamento, Horario, Inscricao } from '../api/types';
import { criteriosMarcados } from '../domain/prioridade';

/**
 * Rascunho da inscrição. Vive em memória e é espelhado no localStorage a
 * cada mudança: formulário no celular é interrompido o tempo todo (ligação,
 * app fechado, bateria) e a família não pode perder o que já preencheu.
 */
export const ENDERECO_VAZIO: Endereco = {
  cep: '',
  logradouro: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: 'Rio de Janeiro',
  uf: 'RJ',
  lat: null,
  lon: null,
};

export interface Rascunho {
  versao: 1;
  modo: 'prioritaria' | 'normal' | null;
  crianca: { nome: string; nascimento: string; sexo: '' | 'F' | 'M' | 'nao_informar'; jaEstudou: boolean | null };
  /** Escolhido pela família; sugerido pela data de nascimento. */
  grupamento: Grupamento | null;
  horario: Horario | null;
  responsavel: { nome: string; cpf: string; parentesco: string; telefone: string; telefoneVerificado: boolean; email: string };
  pix: { chaveCpf: string; usarCpf: boolean; chaveAdicional: string; verificada: boolean; consentimento: boolean; semChave: boolean };
  endereco: Endereco;
  precisaoEndereco: 'endereco' | 'bairro' | 'cidade' | null;
  usarTrabalho: boolean;
  trabalho: Endereco;
  prioridade: Partial<Record<CriterioId, boolean>>;
  documentos: Partial<Record<CriterioId, DocumentoAnalise>>;
  opcoes: string[];
  aceitaRealocacao: boolean;
  passoMaisAlto: number;
  /** Código da inscrição sendo alterada (só a lista de creches). */
  editandoCodigo: string | null;
  atualizadoEm: string | null;
}

export const RASCUNHO_INICIAL: Rascunho = {
  versao: 1,
  modo: null,
  crianca: { nome: '', nascimento: '', sexo: '', jaEstudou: null },
  grupamento: null,
  horario: null,
  responsavel: { nome: '', cpf: '', parentesco: 'mae', telefone: '', telefoneVerificado: false, email: '' },
  pix: { chaveCpf: '', usarCpf: true, chaveAdicional: '', verificada: false, consentimento: false, semChave: false },
  endereco: ENDERECO_VAZIO,
  precisaoEndereco: null,
  usarTrabalho: false,
  trabalho: ENDERECO_VAZIO,
  prioridade: {},
  documentos: {},
  opcoes: [],
  aceitaRealocacao: true,
  passoMaisAlto: 0,
  editandoCodigo: null,
  atualizadoEm: null,
};

type Patch<K extends keyof Rascunho> = { secao: K; valor: Partial<Rascunho[K]> | Rascunho[K] };
type Acao =
  | { tipo: 'patch'; patches: Array<Patch<keyof Rascunho>> }
  | { tipo: 'set'; chave: keyof Rascunho; valor: Rascunho[keyof Rascunho] }
  | { tipo: 'substituir'; valor: Rascunho }
  | { tipo: 'reset' };

function reducer(estado: Rascunho, acao: Acao): Rascunho {
  switch (acao.tipo) {
    case 'reset':
      return { ...RASCUNHO_INICIAL };
    case 'substituir':
      return { ...acao.valor, atualizadoEm: new Date().toISOString() };
    case 'set':
      return { ...estado, [acao.chave]: acao.valor, atualizadoEm: new Date().toISOString() };
    case 'patch': {
      let next: Rascunho = { ...estado };
      for (const p of acao.patches) {
        const atual = next[p.secao];
        const valor = p.valor;
        next = {
          ...next,
          [p.secao]: atual && typeof atual === 'object' && !Array.isArray(atual) && valor && typeof valor === 'object' && !Array.isArray(valor) ? { ...atual, ...valor } : valor,
        };
      }
      next.atualizadoEm = new Date().toISOString();
      return next;
    }
    default:
      return estado;
  }
}

const KEY = 'creche-app:rascunho:v1';

function carregar(): Rascunho {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return RASCUNHO_INICIAL;
    const r = JSON.parse(raw) as Rascunho;
    if (r.versao !== 1) return RASCUNHO_INICIAL;
    return { ...RASCUNHO_INICIAL, ...r };
  } catch {
    return RASCUNHO_INICIAL;
  }
}

interface Ctx {
  r: Rascunho;
  set: <K extends keyof Rascunho>(chave: K, valor: Rascunho[K]) => void;
  patch: <K extends keyof Rascunho>(secao: K, valor: Partial<Rascunho[K]>) => void;
  reset: () => void;
  /** Carrega uma inscrição enviada para alterar a lista de creches. */
  carregarParaEdicao: (insc: Inscricao) => void;
  criterios: CriterioId[];
  precisaDocumentos: boolean;
}

const RascunhoContext = createContext<Ctx | null>(null);

export function RascunhoProvider({ children }: { children: ReactNode }) {
  const [r, dispatch] = useReducer(reducer, undefined, carregar);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(r));
    } catch {
      /* sem armazenamento */
    }
  }, [r]);

  const set = useCallback(<K extends keyof Rascunho>(chave: K, valor: Rascunho[K]) => dispatch({ tipo: 'set', chave, valor }), []);
  const patch = useCallback(<K extends keyof Rascunho>(secao: K, valor: Partial<Rascunho[K]>) => dispatch({ tipo: 'patch', patches: [{ secao, valor } as Patch<keyof Rascunho>] }), []);
  const reset = useCallback(() => dispatch({ tipo: 'reset' }), []);
  const carregarParaEdicao = useCallback((insc: Inscricao) => {
    const prioridade: Partial<Record<CriterioId, boolean>> = {};
    for (const c of insc.criterios) prioridade[c] = true;
    dispatch({
      tipo: 'substituir',
      valor: {
        ...RASCUNHO_INICIAL,
        modo: insc.modo,
        crianca: { ...insc.crianca },
        grupamento: insc.grupamento,
        horario: insc.horario,
        responsavel: { nome: insc.responsavel.nome, cpf: insc.responsavel.cpf, parentesco: insc.responsavel.parentesco, telefone: insc.responsavel.telefone, telefoneVerificado: insc.contato.telefoneVerificado, email: insc.responsavel.email },
        pix: { chaveCpf: insc.responsavel.cpf, usarCpf: true, chaveAdicional: '', verificada: insc.contato.pixVerificada, consentimento: insc.contato.pixVerificada, semChave: insc.contato.pixChaves.length === 0 },
        endereco: { ...insc.endereco },
        precisaoEndereco: insc.endereco.lat !== null ? 'endereco' : null,
        usarTrabalho: insc.trabalho !== null,
        trabalho: insc.trabalho ? { ...insc.trabalho } : ENDERECO_VAZIO,
        prioridade,
        documentos: { ...insc.documentos },
        opcoes: [...insc.opcoes],
        aceitaRealocacao: insc.aceitaRealocacao,
        passoMaisAlto: 7,
        editandoCodigo: insc.codigo,
        atualizadoEm: new Date().toISOString(),
      },
    });
  }, []);

  const value = useMemo<Ctx>(() => {
    const criterios = criteriosMarcados(r.prioridade);
    return { r, set, patch, reset, carregarParaEdicao, criterios, precisaDocumentos: criterios.length > 0 };
  }, [r, set, patch, reset, carregarParaEdicao]);

  return <RascunhoContext.Provider value={value}>{children}</RascunhoContext.Provider>;
}

export function useRascunho(): Ctx {
  const ctx = useContext(RascunhoContext);
  if (!ctx) throw new Error('useRascunho fora do RascunhoProvider');
  return ctx;
}
