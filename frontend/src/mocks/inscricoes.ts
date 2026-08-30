import type { Convocacao, CriterioId, EstadoValidacao, EventoTimeline, Inscricao, MotivoRecusa, PosicaoOpcao } from '../api/types';
import { CRITERIOS_POR_ID, pontuar } from '../domain/prioridade';
import { MOTIVO_LABEL } from '../domain/validacao';
import { todasUnidades, unidadePorId } from './unidades';

/**
 * Repositório local de inscrições (localStorage). Em produção isto é o
 * backend + BigQuery; aqui serve para o fluxo fechar de ponta a ponta —
 * inclusive consultar depois pelo código.
 */
const KEY = 'creche-app:inscricoes:v1';
const espera = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function ler(): Record<string, Inscricao> {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Record<string, Inscricao>) : {};
  } catch {
    return {};
  }
}
function gravar(db: Record<string, Inscricao>) {
  try {
    localStorage.setItem(KEY, JSON.stringify(db));
  } catch {
    /* sem armazenamento: a sessão segue em memória */
  }
}

const ALFABETO = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
export function gerarCodigo(): string {
  const bloco = () => Array.from({ length: 4 }, () => ALFABETO[Math.floor(Math.random() * ALFABETO.length)]).join('');
  return `RIO-${bloco()}-${bloco()}`;
}

function somaDias(iso: string, dias: number): string {
  const d = new Date(iso);
  d.setDate(d.getDate() + dias);
  return d.toISOString();
}

/**
 * Pré-classificação determinística de demonstração: posição estimada a
 * partir de quantos inscritos há na oferta e de quantos deles a pontuação
 * supera. Em produção, vem da rotina diária da SME — e a tela mostra os
 * critérios e pesos usados, que é o que a torna auditável.
 */
export function preClassificar(insc: Pick<Inscricao, 'opcoes' | 'pontuacao' | 'grupamento' | 'horario'>): PosicaoOpcao[] {
  return insc.opcoes.map((id, i) => {
    const u = unidadePorId(id);
    const o = u?.ofertas.find((x) => x.grupamento === insc.grupamento && x.horario === insc.horario) ?? u?.ofertas.find((x) => x.grupamento === insc.grupamento) ?? null;
    const inscritos = o?.inscritos ?? 40;
    const vagas = o?.vagas ?? 20;
    // fração de inscritos com pontuação maior — mock: escala logística em torno de 20 pontos
    const acima = 1 / (1 + Math.exp((insc.pontuacao - 20) / 9));
    const posicao = Math.max(1, Math.round(inscritos * acima) + 1);
    return { unidadeId: id, unidadeNome: u?.nome ?? id, ordem: i + 1, posicao, vagas, demanda: o?.demanda ?? 'media' };
  });
}

export async function mockCriarInscricao(dados: Omit<Inscricao, 'codigo' | 'criadaEm' | 'status' | 'timeline' | 'classificacao' | 'convocacao' | 'pontuacao'>): Promise<Inscricao> {
  await espera(900);
  const criadaEm = new Date().toISOString();
  const pontuacao = pontuar(dados.criterios);
  const pendentes = dados.criterios.filter((c) => {
    const d = dados.documentos[c];
    return !d || d.status === 'ilegivel' || d.status === 'pendente';
  });
  const status: Inscricao['status'] = pendentes.length > 0 ? 'documentos_pendentes' : 'recebida';
  const timeline: EventoTimeline[] = [
    { em: criadaEm, titulo: 'Inscrição recebida', detalhe: `Código ${''}gerado. Guarde-o para acompanhar.`, tipo: 'ok' },
  ];
  if (pendentes.length > 0) {
    timeline.push({ em: criadaEm, titulo: `${pendentes.length} documento(s) pendente(s)`, detalhe: 'Envie pelo app ou leve à unidade da 1ª opção.', tipo: 'warn' });
  } else if (dados.criterios.length > 0) {
    timeline.push({ em: criadaEm, titulo: 'Documentos pré-analisados', detalhe: 'A validação final é feita pela unidade na matrícula.', tipo: 'info' });
  }
  const insc: Inscricao = {
    ...dados,
    codigo: gerarCodigo(),
    criadaEm,
    pontuacao,
    status,
    timeline,
    classificacao: { atualizadoEm: criadaEm, porOpcao: preClassificar({ ...dados, pontuacao }) },
    convocacao: null,
  };
  insc.timeline[0].detalhe = `Código ${insc.codigo}. Guarde-o para acompanhar.`;
  insc.timeline.push({ em: criadaEm, titulo: 'Pré-classificação inicial', detalhe: 'Atualiza todo dia às 6h com as inscrições do dia anterior.', tipo: 'info' });
  const db = ler();
  db[insc.codigo] = insc;
  gravar(db);
  return insc;
}

export async function mockConsultarInscricao(codigo: string, cpf: string): Promise<Inscricao | null> {
  await espera(600);
  const cod = codigo.trim().toUpperCase();
  const demo = inscricaoDemo(cod);
  if (demo) return demo;
  const insc = ler()[cod];
  if (!insc) return null;
  const digitos = cpf.replace(/\D/g, '');
  if (digitos && insc.responsavel.cpf.replace(/\D/g, '') !== digitos) return null;
  return insc;
}

export async function mockResponderConvocacao(codigo: string, aceite: boolean): Promise<Inscricao | null> {
  await espera(600);
  const db = ler();
  const cod = codigo.trim().toUpperCase();
  const insc = db[cod] ?? inscricaoDemo(cod);
  if (!insc || !insc.convocacao) return null;
  const agora = new Date().toISOString();
  insc.convocacao.resposta = aceite ? 'aceita' : 'recusada';
  if (aceite) {
    insc.status = 'matriculada';
    insc.timeline.push({ em: agora, titulo: 'Vaga aceita', detalhe: `Compareça à ${insc.convocacao.unidadeNome} até ${new Date(insc.convocacao.prazo).toLocaleDateString('pt-BR')} com os documentos originais.`, tipo: 'ok' });
  } else {
    insc.status = 'vaga_recusada';
    insc.timeline.push({ em: agora, titulo: 'Vaga recusada', detalhe: 'A vaga foi liberada na hora para a próxima família da fila. Sua inscrição continua ativa nas outras opções.', tipo: 'warn' });
  }
  db[cod] = insc;
  gravar(db);
  return insc;
}

/** Avança o estado para a demonstração (não existe em produção). */
export async function mockSimularEvento(codigo: string, evento: 'convocar' | 'reiniciar'): Promise<Inscricao | null> {
  await espera(500);
  const db = ler();
  const cod = codigo.trim().toUpperCase();
  const insc = db[cod] ?? inscricaoDemo(cod);
  if (!insc) return null;
  const agora = new Date().toISOString();
  if (evento === 'convocar') {
    const alvo = insc.classificacao?.porOpcao[0] ?? null;
    const unidadeId = alvo?.unidadeId ?? insc.opcoes[0];
    const u = unidadePorId(unidadeId);
    const conv: Convocacao = {
      unidadeId,
      unidadeNome: u?.nome ?? alvo?.unidadeNome ?? unidadeId,
      emitidaEm: agora,
      prazo: somaDias(agora, 3),
      canais: insc.contato.pixVerificada ? ['pix', 'whatsapp', 'email'] : ['whatsapp', 'email'],
      resposta: null,
    };
    insc.convocacao = conv;
    insc.status = 'convocada';
    insc.timeline.push({ em: agora, titulo: 'Vaga disponível — você foi convocado', detalhe: `Responda até ${new Date(conv.prazo).toLocaleDateString('pt-BR')}. Aviso enviado por ${conv.canais.map((c) => ({ pix: 'Pix', whatsapp: 'WhatsApp', email: 'e-mail' })[c]).join(', ')}.`, tipo: 'ok' });
  } else {
    insc.convocacao = null;
    insc.status = 'pre_classificada';
    insc.timeline = insc.timeline.filter((t) => !/convocad|aceita|recusada/i.test(t.titulo));
  }
  db[cod] = insc;
  gravar(db);
  return insc;
}

/** Inscrições de exemplo para a apresentação. */
function inscricaoDemo(codigo: string): Inscricao | null {
  if (codigo !== 'DEMO-2027-VAGA' && codigo !== 'DEMO-2027-FILA') return null;
  const db = ler();
  if (db[codigo]) return db[codigo];
  const criadaEm = somaDias(new Date().toISOString(), -6);
  // Cinco creches de Campo Grande (CRE 7) com oferta de Maternal I, na ordem do gerador.
  const opcoes = todasUnidades()
    .filter((u) => u.cre === 7 && u.ofertas.some((o) => o.grupamento === 'Maternal I'))
    .slice(0, 5)
    .map((u) => u.id);
  const base: Inscricao = {
    codigo,
    criadaEm,
    anoLetivo: 2027,
    modo: 'prioritaria',
    crianca: { nome: 'Alice Ferreira', nascimento: '2025-03-14', sexo: 'F', jaEstudou: false },
    grupamento: 'Maternal I',
    horario: 'Integral',
    responsavel: { nome: 'Juliana Ferreira', cpf: '123.456.789-09', parentesco: 'mae', telefone: '(21) 99876-5432', email: 'juliana@example.com' },
    contato: { pixChaves: ['123.456.789-09'], pixVerificada: true, telefoneVerificado: true },
    endereco: { cep: '23052-000', logradouro: 'Rua Artur Rios', numero: '120', complemento: '', bairro: 'Campo Grande', cidade: 'Rio de Janeiro', uf: 'RJ', lat: -22.9035, lon: -43.5605 },
    trabalho: null,
    criterios: ['bolsa_familia', 'responsavel_trabalha'],
    pontuacao: 30,
    documentos: {
      bolsa_familia: { status: 'pre_aprovado', motivo: 'Documento legível e compatível. Pré-aprovado — a validação final é da unidade.', camposLidos: { Tipo: 'Folha resumo CadÚnico', Situação: 'atualizado' }, analisadoEm: criadaEm },
      responsavel_trabalha: { status: 'pre_aprovado', motivo: 'Documento legível e compatível. Pré-aprovado — a validação final é da unidade.', camposLidos: { Tipo: 'Carteira de trabalho' }, analisadoEm: criadaEm },
    },
    opcoes,
    aceitaRealocacao: true,
    status: 'pre_classificada',
    timeline: [
      { em: criadaEm, titulo: 'Inscrição recebida', detalhe: `Código ${codigo}.`, tipo: 'ok' },
      { em: criadaEm, titulo: 'Documentos pré-analisados', detalhe: '2 de 2 pré-aprovados.', tipo: 'info' },
      { em: somaDias(criadaEm, 1), titulo: 'Pré-classificação atualizada', detalhe: 'Posição 3ª na 1ª opção.', tipo: 'info' },
    ],
    classificacao: { atualizadoEm: somaDias(new Date().toISOString(), 0), porOpcao: [] },
    convocacao: null,
  };
  base.classificacao = { atualizadoEm: new Date().toISOString(), porOpcao: preClassificar(base).map((p, i) => (i === 0 ? { ...p, posicao: 3 } : p)) };
  if (codigo === 'DEMO-2027-VAGA') {
    const agora = new Date().toISOString();
    const u = unidadePorId(opcoes[0]);
    base.status = 'convocada';
    base.convocacao = { unidadeId: opcoes[0], unidadeNome: u?.nome ?? opcoes[0], emitidaEm: agora, prazo: somaDias(agora, 2), canais: ['pix', 'whatsapp', 'email'], resposta: null };
    base.timeline.push({ em: agora, titulo: 'Vaga disponível — você foi convocada', detalhe: 'Aviso enviado por Pix, WhatsApp e e-mail.', tipo: 'ok' });
  }
  db[codigo] = base;
  gravar(db);
  return base;
}

/* ---------- Ponte com o perfil da creche ---------- */

export function todasInscricoesLocais(): Inscricao[] {
  return Object.values(ler());
}

/**
 * A validação feita pela unidade aparece no histórico da família e altera a
 * pontuação (critério recusado sai da conta) e a posição estimada.
 */
export function aplicarValidacaoNaFamilia(codigo: string, criterio: CriterioId, estado: EstadoValidacao, motivo?: MotivoRecusa, observacao?: string): void {
  const db = ler();
  const insc = db[codigo];
  if (!insc) return;
  const c = CRITERIOS_POR_ID[criterio];
  const recusados = new Set(insc.criteriosRecusados ?? []);
  if (estado === 'recusado') recusados.add(criterio);
  else recusados.delete(criterio);
  insc.criteriosRecusados = [...recusados];
  insc.pontuacao = pontuar(insc.criterios.filter((id) => !recusados.has(id)));
  insc.classificacao = { atualizadoEm: new Date().toISOString(), porOpcao: preClassificar(insc) };
  const agora = new Date().toISOString();
  if (estado === 'confirmado') {
    insc.timeline.push({ em: agora, titulo: `Critério confirmado pela unidade: ${c.titulo}`, detalhe: observacao || 'Documento conferido. Os pontos já valem na classificação.', tipo: 'ok' });
  } else if (estado === 'recusado') {
    insc.timeline.push({ em: agora, titulo: `Critério não aceito pela unidade: ${c.titulo}`, detalhe: `${motivo ? MOTIVO_LABEL[motivo] : 'Sem motivo informado'}${observacao ? ` — ${observacao}` : ''}. Você pode contestar na unidade ou enviar outro documento pelo app.`, tipo: 'warn' });
  } else {
    insc.timeline.push({ em: agora, titulo: `Validação desfeita pela unidade: ${c.titulo}`, detalhe: 'O critério voltou a aguardar conferência.', tipo: 'info' });
  }
  db[codigo] = insc;
  gravar(db);
}

export function aplicarComparecimentoNaFamilia(codigo: string, resultado: 'matriculou' | 'nao_compareceu'): void {
  const db = ler();
  const insc = db[codigo];
  if (!insc || !insc.convocacao) return;
  const agora = new Date().toISOString();
  if (resultado === 'matriculou') {
    insc.status = 'matriculada';
    insc.timeline.push({ em: agora, titulo: 'Matrícula concluída na unidade', detalhe: `${insc.convocacao.unidadeNome} confirmou a matrícula.`, tipo: 'ok' });
  } else {
    insc.status = 'prazo_expirado';
    insc.timeline.push({ em: agora, titulo: 'Prazo encerrado sem comparecimento', detalhe: 'A vaga foi oferecida à próxima família. A inscrição continua ativa nas outras opções.', tipo: 'danger' });
  }
  db[codigo] = insc;
  gravar(db);
}

export function atualizarTelefoneDaFamilia(codigo: string, telefone: string): void {
  const db = ler();
  const insc = db[codigo];
  if (!insc) return;
  insc.responsavel.telefone = telefone;
  insc.timeline.push({ em: new Date().toISOString(), titulo: 'Telefone atualizado pela unidade', detalhe: `Novo contato: ${telefone}.`, tipo: 'info' });
  db[codigo] = insc;
  gravar(db);
}

export function registrarCobrancaNaFamilia(codigo: string, documento: string): void {
  const db = ler();
  const insc = db[codigo];
  if (!insc) return;
  insc.timeline.push({ em: new Date().toISOString(), titulo: 'A unidade pediu um documento', detalhe: `${documento}. Envie a foto pelo app ou leve o original à unidade.`, tipo: 'warn' });
  if (insc.status === 'recebida' || insc.status === 'pre_classificada') insc.status = 'documentos_pendentes';
  db[codigo] = insc;
  gravar(db);
}
