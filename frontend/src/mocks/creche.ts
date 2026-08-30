import type {
  CanalAviso,
  Chamada,
  CriterioId,
  CriterioValidacao,
  DesfechoTentativa,
  DocumentoAnalise,
  EstadoValidacao,
  EventoValidacao,
  Evidencia,
  FiltrosUnidade,
  Grupamento,
  Horario,
  Inscricao,
  InscritoUnidade,
  MotivoRecusa,
  ResumoUnidade,
  SituacaoChamada,
  Tentativa,
  Unidade,
} from '../api/types';
import { CRITERIOS, CRITERIOS_POR_ID, pontuar } from '../domain/prioridade';
import { JANELA_DESFAZER_MS, somarDiasUteis } from '../domain/validacao';
import { BAIRROS, normalizar } from './bairros';
import { aplicarComparecimentoNaFamilia, aplicarValidacaoNaFamilia, atualizarTelefoneDaFamilia, registrarCobrancaNaFamilia, todasInscricoesLocais } from './inscricoes';
import { todasUnidades, unidadePorId } from './unidades';

/**
 * Perfil da creche — dados de demonstração.
 *
 * Inscritos e chamadas de cada unidade são gerados de forma determinística
 * (mesma semente das creches) e mesclados com as inscrições feitas neste
 * aparelho pelo app da família. O que o diretor faz (validar, disparar
 * mensagem, registrar desfecho, corrigir telefone) fica em `localStorage`,
 * em registros append-only, e reflete no acompanhamento da família.
 */
const SEED = 20260830;
const AUTOR_PADRAO = 'Direção da unidade';

function mulberry32(a: number) {
  return function rand() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function id(prefixo: string): string {
  return `${prefixo}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

const MENINAS = ['Alice', 'Helena', 'Laura', 'Maria', 'Valentina', 'Heloísa', 'Cecília', 'Júlia', 'Isis', 'Maitê', 'Aurora', 'Ana Clara', 'Sophia', 'Lívia', 'Elisa', 'Maya', 'Yasmin', 'Luna', 'Agatha', 'Esther'];
const MENINOS = ['Miguel', 'Arthur', 'Gael', 'Théo', 'Heitor', 'Ravi', 'Davi', 'Bernardo', 'Noah', 'Gabriel', 'Samuel', 'Pedro', 'Anthony', 'Isaac', 'Benício', 'Benjamin', 'Matheus', 'Lucas', 'Joaquim', 'Nicolas'];
const SOBRENOMES = ['da Silva', 'dos Santos', 'de Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes', 'Costa', 'Ribeiro', 'Martins', 'Carvalho', 'Almeida', 'Lopes', 'Soares', 'Fernandes', 'Vieira', 'Barbosa', 'Rocha', 'Dias', 'Nascimento', 'Andrade', 'Moreira', 'Nunes', 'Marques', 'Machado', 'Mendes', 'Freitas'];
const RESPONSAVEIS = ['Juliana', 'Camila', 'Amanda', 'Bruna', 'Jéssica', 'Letícia', 'Fernanda', 'Aline', 'Patrícia', 'Vanessa', 'Priscila', 'Tatiane', 'Carla', 'Renata', 'Débora', 'Rafael', 'Thiago', 'Diego', 'Leandro', 'Rodrigo'];

const PROB_CRITERIO: Record<CriterioId, number> = {
  bolsa_familia: 0.36,
  responsavel_trabalha: 0.46,
  deficiencia_crianca: 0.06,
  mae_adolescente: 0.05,
  responsavel_idoso: 0.08,
  responsavel_deficiente: 0.04,
  violencia_domestica: 0.03,
  familiar_encarcerado: 0.03,
};

/** Faixa de nascimento compatível com o grupamento em 31/03/2027. */
const FAIXA: Record<Grupamento, [string, string]> = {
  Berçário: ['2025-04-01', '2026-07-31'],
  'Maternal I': ['2024-04-01', '2025-03-31'],
  'Maternal II': ['2023-04-01', '2024-03-31'],
};

function isoEntre(rand: () => number, a: string, b: string): string {
  const t0 = new Date(a).getTime();
  const t1 = new Date(b).getTime();
  return new Date(t0 + rand() * (t1 - t0)).toISOString().slice(0, 10);
}
function dataBr(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR');
}
function agoraMenos(ms: number): string {
  return new Date(Date.now() - ms).toISOString();
}

export function telefoneUnidade(u: Unidade): string {
  const h = hash(u.id);
  return `(21) 3${String(100 + (h % 900))}-${String(1000 + ((h >>> 8) % 9000))}`;
}

/* ---------- evidência por critério ---------- */

function evidenciaSintetica(rand: () => number, criterio: CriterioId, nomeResp: string, nomeCrianca: string, criadaEm: string): Evidencia {
  const c = CRITERIOS_POR_ID[criterio];
  const r = rand();
  if (criterio === 'bolsa_familia' && r < 0.8) {
    const em = agoraMenos(rand() * 20 * 86400000);
    return { tipo: 'rmi', texto: `CadÚnico ativo · retorno do Data Lake (RMI) em ${dataBr(em)}`, em };
  }
  const pFoto = criterio === 'responsavel_trabalha' ? 0.55 : criterio === 'violencia_domestica' || criterio === 'familiar_encarcerado' ? 0.3 : 0.55;
  if (r < 0.8 * pFoto + 0.2) {
    const revisar = rand() < 0.25;
    const em = new Date(new Date(criadaEm).getTime() + rand() * 3 * 86400000).toISOString();
    const campos: Record<string, string> = { Tipo: c.documento, Nome: criterio === 'deficiencia_crianca' ? nomeCrianca : nomeResp, Emissão: dataBr(agoraMenos(rand() * 400 * 86400000)) };
    const analise: DocumentoAnalise = {
      status: revisar ? 'revisar' : 'pre_aprovado',
      motivo: revisar ? 'Documento reconhecido, mas um dado importante não bateu ou está vencido. Conferir o original.' : `Documento legível e compatível com "${c.titulo}". Pré-aprovado — a validação final é da unidade.`,
      camposLidos: campos,
      analisadoEm: em,
    };
    return { tipo: 'pre_analise', texto: revisar ? `Foto enviada pelo app em ${dataBr(em)} · pré-análise: conferir o original` : `Foto enviada pelo app em ${dataBr(em)} · pré-análise: legível e compatível`, em, analise };
  }
  return { tipo: 'documento', texto: 'Nenhum registro na base — exige comprovação: foto pelo app ou original na unidade.' };
}

function evidenciaDoApp(insc: Inscricao, criterio: CriterioId): Evidencia {
  const d = insc.documentos[criterio];
  if (d && (d.status === 'pre_aprovado' || d.status === 'revisar')) {
    return {
      tipo: 'pre_analise',
      texto: d.status === 'pre_aprovado' ? `Foto enviada pelo app em ${dataBr(d.analisadoEm)} · pré-análise: legível e compatível` : `Foto enviada pelo app em ${dataBr(d.analisadoEm)} · pré-análise: conferir o original`,
      em: d.analisadoEm,
      analise: d,
    };
  }
  if (criterio === 'bolsa_familia') return { tipo: 'rmi', texto: `CadÚnico ativo · retorno do Data Lake (RMI) em ${dataBr(new Date().toISOString())}`, em: new Date().toISOString() };
  return { tipo: 'documento', texto: d?.status === 'ilegivel' ? 'Foto enviada pelo app ficou ilegível — exige nova foto ou original na unidade.' : 'Nenhum registro na base — exige comprovação: foto pelo app ou original na unidade.' };
}

/* ---------- registro de validação (append-only) ---------- */

const KEY_VALIDACOES = 'creche-app:validacoes:v1';
function lerValidacoes(): EventoValidacao[] {
  try {
    const raw = localStorage.getItem(KEY_VALIDACOES);
    return raw ? (JSON.parse(raw) as EventoValidacao[]) : [];
  } catch {
    return [];
  }
}
function gravarValidacoes(v: EventoValidacao[]) {
  try {
    localStorage.setItem(KEY_VALIDACOES, JSON.stringify(v));
  } catch {
    /* sem armazenamento */
  }
}
function ultimoEventoDe(codigo: string, criterio: CriterioId, todos = lerValidacoes()): EventoValidacao | null {
  for (let i = todos.length - 1; i >= 0; i -= 1) {
    const e = todos[i];
    if (e.inscricao === codigo && e.criterio === criterio) return e;
  }
  return null;
}

export function podeDesfazer(e: EventoValidacao | null): boolean {
  if (!e || e.estado === 'pendente') return false;
  return Date.now() - new Date(e.em).getTime() <= JANELA_DESFAZER_MS;
}

export interface NovaValidacao {
  inscricao: string;
  unidadeId: string;
  criterio: CriterioId;
  estado: EstadoValidacao;
  motivo?: MotivoRecusa;
  observacao?: string;
  autor?: string;
  desfazDe?: string;
}

export function mockRegistrarValidacao(n: NovaValidacao): EventoValidacao {
  const todos = lerValidacoes();
  const evento: EventoValidacao = {
    id: id('VAL'),
    inscricao: n.inscricao,
    unidadeId: n.unidadeId,
    criterio: n.criterio,
    estado: n.estado,
    motivo: n.motivo,
    observacao: n.observacao,
    autor: n.autor ?? AUTOR_PADRAO,
    em: new Date().toISOString(),
    desfazDe: n.desfazDe,
  };
  todos.push(evento);
  gravarValidacoes(todos);
  aplicarValidacaoNaFamilia(n.inscricao, n.criterio, n.estado, n.motivo, n.observacao);
  return evento;
}

/* ---------- inscritos da unidade ---------- */

interface Base {
  codigo: string;
  crianca: InscritoUnidade['crianca'];
  responsavel: InscritoUnidade['responsavel'];
  grupamento: Grupamento;
  horario: Horario;
  opcao: number;
  aceitaRealocacao: boolean;
  criadaEm: string;
  criterios: Array<{ id: CriterioId; evidencia: Evidencia }>;
  contato: { telefoneVerificado: boolean; pixVerificada: boolean; email: string };
  origem: 'app' | 'demo';
}

const cacheBase = new Map<string, Base[]>();

function gerarBase(u: Unidade): Base[] {
  const rand = mulberry32(SEED ^ hash(u.id));
  const vizinhos = BAIRROS.filter((b) => b.cre === u.cre);
  const out: Base[] = [];
  let seq = 0;
  for (const o of u.ofertas) {
    const n = Math.min(o.inscritos, 12 + Math.floor(rand() * 8));
    for (let i = 0; i < n; i += 1) {
      seq += 1;
      const menina = rand() < 0.5;
      const sobrenome = SOBRENOMES[Math.floor(rand() * SOBRENOMES.length)];
      const nome = `${(menina ? MENINAS : MENINOS)[Math.floor(rand() * 20)]} ${sobrenome}${rand() < 0.5 ? ` ${SOBRENOMES[Math.floor(rand() * SOBRENOMES.length)]}` : ''}`;
      const nomeResp = `${RESPONSAVEIS[Math.floor(rand() * RESPONSAVEIS.length)]} ${sobrenome}`;
      const bairro = rand() < 0.6 ? u.bairro : (vizinhos[Math.floor(rand() * vizinhos.length)]?.nome ?? u.bairro);
      const criadaEm = agoraMenos((3 + rand() * 60) * 86400000);
      const r = rand();
      const opcao = r < 0.45 ? 1 : r < 0.7 ? 2 : r < 0.85 ? 3 : r < 0.95 ? 4 : 5;
      const criterios = CRITERIOS.filter((c) => rand() < PROB_CRITERIO[c.id]).map((c) => ({ id: c.id, evidencia: evidenciaSintetica(rand, c.id, nomeResp, nome, criadaEm) }));
      out.push({
        codigo: `RIO-${u.id.slice(-4)}${String(seq).padStart(3, '0')}-${(hash(u.id + seq) % 46656).toString(36).toUpperCase().padStart(3, '0')}`,
        crianca: { nome, nascimento: isoEntre(rand, FAIXA[o.grupamento][0], FAIXA[o.grupamento][1]), sexo: menina ? 'F' : 'M' },
        responsavel: { nome: nomeResp, bairro, cep: `2${String(1000 + Math.floor(rand() * 4000))}-${String(Math.floor(rand() * 1000)).padStart(3, '0')}`, telefone: `(21) 9${String(6000 + Math.floor(rand() * 4000))}-${String(Math.floor(rand() * 10000)).padStart(4, '0')}` },
        grupamento: o.grupamento,
        horario: o.horario,
        opcao,
        aceitaRealocacao: rand() < 0.7,
        criadaEm,
        criterios,
        contato: { telefoneVerificado: rand() < 0.85, pixVerificada: rand() < 0.6, email: rand() < 0.5 ? `${nomeResp.split(' ')[0].toLowerCase()}@example.com` : '' },
        origem: 'demo',
      });
    }
  }
  return out;
}

function baseDoApp(u: Unidade): Base[] {
  return todasInscricoesLocais()
    .filter((i) => i.opcoes.includes(u.id))
    .map((i) => ({
      codigo: i.codigo,
      crianca: { nome: i.crianca.nome, nascimento: i.crianca.nascimento, sexo: i.crianca.sexo },
      responsavel: { nome: i.responsavel.nome, bairro: i.endereco.bairro, cep: i.endereco.cep, telefone: i.responsavel.telefone },
      grupamento: i.grupamento,
      horario: i.horario,
      opcao: i.opcoes.indexOf(u.id) + 1,
      aceitaRealocacao: i.aceitaRealocacao,
      criadaEm: i.criadaEm,
      criterios: i.criterios.map((c) => ({ id: c, evidencia: evidenciaDoApp(i, c) })),
      contato: { telefoneVerificado: i.contato.telefoneVerificado, pixVerificada: i.contato.pixVerificada, email: i.responsavel.email },
      origem: 'app' as const,
    }));
}

function basesDaUnidade(u: Unidade): Base[] {
  let b = cacheBase.get(u.id);
  if (!b) {
    b = gerarBase(u);
    cacheBase.set(u.id, b);
  }
  const app = baseDoApp(u);
  const codigosApp = new Set(app.map((x) => x.codigo));
  return [...app, ...b.filter((x) => !codigosApp.has(x.codigo))];
}

function montarInscritos(u: Unidade): InscritoUnidade[] {
  const validacoes = lerValidacoes();
  const bases = basesDaUnidade(u);
  const itens: InscritoUnidade[] = bases.map((b) => {
    const criterios: CriterioValidacao[] = b.criterios.map((c) => {
      const def = CRITERIOS_POR_ID[c.id];
      const ultimo = ultimoEventoDe(b.codigo, c.id, validacoes);
      return { id: c.id, titulo: def.titulo, pergunta: def.pergunta, pontos: def.pontos, documento: def.documento, evidencia: c.evidencia, estado: ultimo?.estado ?? 'pendente', ultimoEvento: ultimo };
    });
    const pontosDeclarados = pontuar(criterios.map((c) => c.id));
    const pontosConfirmados = pontuar(criterios.filter((c) => c.estado === 'confirmado').map((c) => c.id));
    return { codigo: b.codigo, crianca: b.crianca, responsavel: b.responsavel, grupamento: b.grupamento, horario: b.horario, opcao: b.opcao, aceitaRealocacao: b.aceitaRealocacao, criadaEm: b.criadaEm, pontosDeclarados, pontosConfirmados, criterios, posicao: 0, vagasDoPar: 0, decideVaga: false, origem: b.origem };
  });
  // posição por par grupamento × turno: pontuação válida (declarada menos recusada) desc, data asc
  for (const o of u.ofertas) {
    const par = itens
      .filter((i) => i.grupamento === o.grupamento && i.horario === o.horario)
      .sort((a, b) => {
        const pa = a.pontosDeclarados - pontuar(a.criterios.filter((c) => c.estado === 'recusado').map((c) => c.id));
        const pb = b.pontosDeclarados - pontuar(b.criterios.filter((c) => c.estado === 'recusado').map((c) => c.id));
        return pb - pa || a.criadaEm.localeCompare(b.criadaEm);
      });
    par.forEach((i, idx) => {
      i.posicao = idx + 1;
      i.vagasDoPar = o.vagas;
      i.decideVaga = Math.abs(i.posicao - o.vagas) <= 5 || (par.length <= o.vagas && idx >= par.length - 3);
    });
  }
  return itens;
}

function filtrar<T extends { grupamento: Grupamento; horario: Horario }>(lista: T[], f: FiltrosUnidade): T[] {
  return lista.filter((i) => (!f.grupamento || i.grupamento === f.grupamento) && (!f.horario || i.horario === f.horario));
}

export async function mockListarInscritos(unidadeId: string, f: FiltrosUnidade): Promise<InscritoUnidade[]> {
  const u = unidadePorId(unidadeId);
  if (!u) return [];
  return filtrar(montarInscritos(u), f).sort((a, b) => a.posicao - b.posicao || b.pontosDeclarados - a.pontosDeclarados);
}

export async function mockResumoUnidade(unidadeId: string, f: FiltrosUnidade): Promise<ResumoUnidade | null> {
  const u = unidadePorId(unidadeId);
  if (!u) return null;
  const rand = mulberry32(SEED ^ hash(u.id + 'vagas'));
  const chamadasU = todasChamadas(u);
  const matriculados = chamadasU.filter((c) => c.comparecimento?.resultado === 'matriculou');
  const codigosMatriculados = new Set(matriculados.map((c) => c.inscricao));
  const inscritos = filtrar(montarInscritos(u), f).filter((i) => !codigosMatriculados.has(i.codigo));
  const ofertas = filtrar(u.ofertas, f);
  let total = 0;
  let prioritarias = 0;
  for (const o of ofertas) {
    const confirmados = Math.round(o.vagas * (0.3 + rand() * 0.3));
    const matriculadosDoPar = matriculados.filter((c) => c.crianca.grupamento === o.grupamento && c.crianca.horario === o.horario).length;
    const abertas = Math.max(0, o.vagas - confirmados - matriculadosDoPar);
    total += abertas;
    prioritarias += Math.round((abertas * o.vagasPrioritarias) / Math.max(1, o.vagas));
  }
  return {
    unidade: u,
    telefone: telefoneUnidade(u),
    naFila: inscritos.length,
    aguardandoValidacao: inscritos.filter((i) => i.criterios.some((c) => c.estado === 'pendente')).length,
    vagasAbertas: { total, prioritarias, gerais: total - prioritarias },
    proxyVagas: 'vaga aberta = vagas ofertadas do par − matrículas já confirmadas no processo (proxy; a base não define vaga)',
  };
}

export function mockBuscarUnidades(termo: string): Unidade[] {
  const t = normalizar(termo);
  const todas = todasUnidades();
  if (!t) return todas.slice(0, 12);
  return todas.filter((u) => normalizar(u.nome).includes(t) || normalizar(u.bairro).includes(t) || u.id.toLowerCase().includes(t)).slice(0, 12);
}

/* ---------- chamadas (convocação) ---------- */

const KEY_CHAMADAS = 'creche-app:chamadas:v1';
function lerChamadas(): Record<string, Chamada> {
  try {
    const raw = localStorage.getItem(KEY_CHAMADAS);
    return raw ? (JSON.parse(raw) as Record<string, Chamada>) : {};
  } catch {
    return {};
  }
}
function gravarChamada(c: Chamada) {
  const db = lerChamadas();
  db[c.id] = c;
  try {
    localStorage.setItem(KEY_CHAMADAS, JSON.stringify(db));
  } catch {
    /* sem armazenamento */
  }
}

function tentativasAutomaticas(em: string, pix: boolean, email: boolean): Tentativa[] {
  const canais: CanalAviso[] = ['app', ...(pix ? (['pix'] as CanalAviso[]) : []), 'whatsapp', ...(email ? (['email'] as CanalAviso[]) : [])];
  return canais.map((canal, i) => ({ id: `auto-${canal}-${i}`, em, canal, automatica: true, desfecho: null, autor: 'sistema' }));
}

const cacheChamadas = new Map<string, Chamada[]>();

function gerarChamadas(u: Unidade): Chamada[] {
  const rand = mulberry32(SEED ^ hash(u.id + 'chamadas'));
  const inscritos = montarInscritos(u).filter((i) => i.origem === 'demo');
  const out: Chamada[] = [];
  for (const o of u.ofertas) {
    const topo = inscritos.filter((i) => i.grupamento === o.grupamento && i.horario === o.horario && i.posicao <= Math.min(o.vagas, 3));
    for (const i of topo) {
      const horas = 2 + rand() * 70;
      const emitidaEm = agoraMenos(horas * 3600000);
      const prazo = new Date(new Date(emitidaEm).getTime() + 72 * 3600000).toISOString();
      const base = basesDaUnidade(u).find((b) => b.codigo === i.codigo)!;
      const r = rand();
      let respostaApp: Chamada['respostaApp'] = null;
      let situacao: SituacaoChamada = 'a_chamar';
      let dataPrevista: string | null = null;
      const tentativas = tentativasAutomaticas(emitidaEm, base.contato.pixVerificada, Boolean(base.contato.email));
      if (r < 0.3) {
        respostaApp = { resposta: 'aceita', em: new Date(new Date(emitidaEm).getTime() + rand() * 20 * 3600000).toISOString() };
        situacao = 'agendado';
        dataPrevista = new Date(new Date(prazo).getTime() - 20 * 3600000).toISOString();
      } else if (r < 0.4) {
        respostaApp = { resposta: 'recusada', em: new Date(new Date(emitidaEm).getTime() + rand() * 30 * 3600000).toISOString() };
        situacao = 'encerrada';
      } else if (horas > 20) {
        const k = Math.floor(rand() * 3);
        for (let t = 0; t < k; t += 1) {
          const em = new Date(new Date(emitidaEm).getTime() + (t + 1) * 9 * 3600000).toISOString();
          const canal: CanalAviso = t % 2 === 0 ? 'whatsapp' : 'ligacao';
          const rr = rand();
          const desfecho: DesfechoTentativa = rr < 0.6 ? 'nao_atendeu' : rr < 0.8 ? 'falei' : 'numero_errado';
          tentativas.push({ id: `t-${t}`, em, canal, automatica: false, modelo: t === 0 ? 'M1' : 'M2', desfecho, autor: AUTOR_PADRAO });
          if (desfecho === 'falei') situacao = 'falei';
          else if (desfecho === 'numero_errado') situacao = 'sem_contato';
          else if (situacao === 'a_chamar') situacao = 'tentando';
        }
      }
      out.push({
        id: `CH-${i.codigo}`,
        inscricao: i.codigo,
        unidadeId: u.id,
        crianca: { nome: i.crianca.nome, grupamento: i.grupamento, horario: i.horario },
        opcao: i.opcao,
        aceitaRealocacao: i.aceitaRealocacao,
        contato: { telefone: i.responsavel.telefone, telefoneVerificado: base.contato.telefoneVerificado, pixVerificada: base.contato.pixVerificada, email: base.contato.email, atualizadoEm: i.criadaEm, historico: [] },
        emitidaEm,
        prazo,
        prorrogacao: null,
        respostaApp,
        situacao,
        tentativas,
        dataPrevista,
        comparecimento: null,
        origem: 'demo',
      });
    }
  }
  return out;
}

function chamadasDoApp(u: Unidade): Chamada[] {
  return todasInscricoesLocais()
    .filter((i) => i.convocacao && i.convocacao.unidadeId === u.id)
    .map((i) => {
      const c = i.convocacao!;
      const situacao: SituacaoChamada = i.status === 'matriculada' || i.status === 'prazo_expirado' ? 'encerrada' : c.resposta === 'aceita' ? 'agendado' : c.resposta === 'recusada' ? 'encerrada' : 'a_chamar';
      return {
        id: `CH-${i.codigo}`,
        inscricao: i.codigo,
        unidadeId: u.id,
        crianca: { nome: i.crianca.nome, grupamento: i.grupamento, horario: i.horario },
        opcao: i.opcoes.indexOf(u.id) + 1,
        aceitaRealocacao: i.aceitaRealocacao,
        contato: { telefone: i.responsavel.telefone, telefoneVerificado: i.contato.telefoneVerificado, pixVerificada: i.contato.pixVerificada, email: i.responsavel.email, atualizadoEm: i.criadaEm, historico: [] },
        emitidaEm: c.emitidaEm,
        prazo: c.prazo,
        prorrogacao: null,
        respostaApp: c.resposta ? { resposta: c.resposta, em: c.emitidaEm } : null,
        situacao,
        tentativas: tentativasAutomaticas(c.emitidaEm, i.contato.pixVerificada, Boolean(i.responsavel.email)),
        dataPrevista: c.resposta === 'aceita' ? c.prazo : null,
        comparecimento: i.status === 'matriculada' ? { resultado: 'matriculou', em: c.emitidaEm, autor: AUTOR_PADRAO } : i.status === 'prazo_expirado' ? { resultado: 'nao_compareceu', em: c.emitidaEm, autor: AUTOR_PADRAO } : null,
        origem: 'app' as const,
      };
    });
}

function todasChamadas(u: Unidade): Chamada[] {
  let geradas = cacheChamadas.get(u.id);
  if (!geradas) {
    geradas = gerarChamadas(u);
    cacheChamadas.set(u.id, geradas);
  }
  const app = chamadasDoApp(u);
  const ids = new Set(app.map((c) => c.id));
  const salvas = lerChamadas();
  return [...app, ...geradas.filter((c) => !ids.has(c.id))].map((c) => salvas[c.id] ?? c);
}

export async function mockListarChamadas(unidadeId: string, f: FiltrosUnidade): Promise<Chamada[]> {
  const u = unidadePorId(unidadeId);
  if (!u) return [];
  return todasChamadas(u)
    .filter((c) => (!f.grupamento || c.crianca.grupamento === f.grupamento) && (!f.horario || c.crianca.horario === f.horario))
    .sort((a, b) => {
      const ea = a.situacao === 'encerrada' ? 1 : 0;
      const eb = b.situacao === 'encerrada' ? 1 : 0;
      return ea - eb || new Date(a.prazo).getTime() - new Date(b.prazo).getTime();
    });
}

function obterChamada(id: string): Chamada | null {
  const salva = lerChamadas()[id];
  if (salva) return salva;
  for (const u of todasUnidades()) {
    if (!id.includes(u.id.slice(-4)) && !todasInscricoesLocais().some((i) => `CH-${i.codigo}` === id)) continue;
    const c = todasChamadas(u).find((x) => x.id === id);
    if (c) return c;
  }
  // fallback: varre tudo
  for (const u of todasUnidades()) {
    const c = todasChamadas(u).find((x) => x.id === id);
    if (c) return c;
  }
  return null;
}

export async function mockRegistrarMensagem(id: string, dados: { modelo: string; canal: CanalAviso; texto: string; autor?: string }): Promise<Chamada | null> {
  const c = obterChamada(id);
  if (!c) return null;
  const t: Tentativa = { id: `t-${Date.now().toString(36)}`, em: new Date().toISOString(), canal: dados.canal, automatica: false, modelo: dados.modelo, texto: dados.texto, desfecho: null, autor: dados.autor ?? AUTOR_PADRAO };
  c.tentativas = [...c.tentativas, t];
  gravarChamada(c);
  return c;
}

export async function mockRegistrarDesfecho(id: string, tentativaId: string, desfecho: DesfechoTentativa, extra: { dataPrevista?: string; novoTelefone?: string; autor?: string } = {}): Promise<Chamada | null> {
  const c = obterChamada(id);
  if (!c) return null;
  const agora = new Date().toISOString();
  c.tentativas = c.tentativas.map((t) => (t.id === tentativaId ? { ...t, desfecho, desfechoEm: agora, desfechoAutor: extra.autor ?? AUTOR_PADRAO } : t));
  if (desfecho === 'falei') {
    c.situacao = extra.dataPrevista ? 'agendado' : 'falei';
    c.dataPrevista = extra.dataPrevista ?? c.dataPrevista;
  } else if (desfecho === 'nao_atendeu') {
    if (c.situacao === 'a_chamar' || c.situacao === 'tentando') c.situacao = 'tentando';
  } else if (desfecho === 'numero_errado') {
    if (extra.novoTelefone) {
      c.contato.historico = [...c.contato.historico, { telefone: c.contato.telefone, em: agora, autor: extra.autor ?? AUTOR_PADRAO }];
      c.contato.telefone = extra.novoTelefone;
      c.contato.telefoneVerificado = false;
      c.contato.atualizadoEm = agora;
      if (c.origem === 'app') atualizarTelefoneDaFamilia(c.inscricao, extra.novoTelefone);
    }
    // Spec: número errado marca "sem contato" — com ou sem número novo; a próxima tentativa reabre.
    c.situacao = 'sem_contato';
  }
  gravarChamada(c);
  return c;
}

export async function mockEstenderPrazo(id: string, justificativa: string, autor = AUTOR_PADRAO): Promise<Chamada | null> {
  const c = obterChamada(id);
  if (!c || c.prorrogacao) return c;
  c.prazo = somarDiasUteis(c.prazo, 1);
  c.prorrogacao = { em: new Date().toISOString(), justificativa, autor };
  gravarChamada(c);
  return c;
}

export async function mockRegistrarComparecimento(id: string, resultado: 'matriculou' | 'nao_compareceu', autor = AUTOR_PADRAO): Promise<Chamada | null> {
  const c = obterChamada(id);
  if (!c) return null;
  c.comparecimento = { resultado, em: new Date().toISOString(), autor };
  c.situacao = 'encerrada';
  if (c.origem === 'app') aplicarComparecimentoNaFamilia(c.inscricao, resultado);
  gravarChamada(c);
  return c;
}

/* ---------- cobrança de documento (sem chamada aberta) ---------- */

const KEY_COBRANCAS = 'creche-app:cobrancas:v1';
export interface Cobranca {
  id: string;
  inscricao: string;
  criterio: CriterioId;
  canal: CanalAviso;
  texto: string;
  autor: string;
  em: string;
}
export async function mockRegistrarCobranca(inscricao: string, criterio: CriterioId, canal: CanalAviso, texto: string, autor = AUTOR_PADRAO): Promise<Cobranca> {
  const c: Cobranca = { id: id('COB'), inscricao, criterio, canal, texto, autor, em: new Date().toISOString() };
  try {
    const raw = localStorage.getItem(KEY_COBRANCAS);
    const lista = raw ? (JSON.parse(raw) as Cobranca[]) : [];
    lista.push(c);
    localStorage.setItem(KEY_COBRANCAS, JSON.stringify(lista));
  } catch {
    /* sem armazenamento */
  }
  registrarCobrancaNaFamilia(inscricao, CRITERIOS_POR_ID[criterio].documento);
  return c;
}

/** Só na demonstração: limpa o que a direção registrou neste aparelho. */
export function limparRegistrosDaDirecao(): void {
  try {
    localStorage.removeItem(KEY_VALIDACOES);
    localStorage.removeItem(KEY_CHAMADAS);
  } catch {
    /* nada */
  }
}
