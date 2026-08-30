import { CalendarClock, CheckCircle2, ClipboardCheck, Send, XCircle } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { estenderPrazo, listarChamadas, registrarComparecimento } from '@/api/client';
import type { Chamada, CriterioId, FiltrosUnidade, InscritoUnidade, ModeloId, Tentativa, Unidade } from '@/api/types';
import { Aviso } from '@/components/comuns';
import { Button } from '@/components/ui/button';
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogPanel, DialogPopup, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { toastManager } from '@/components/ui/toast';
import { CRITERIOS_POR_ID } from '@/domain/prioridade';
import { CANAL_LABEL, idadeDoDado, mascararTelefone, restante } from '@/domain/validacao';
import { cn } from '@/lib/utils';
import { IconeCanal, OpcaoTag, Pilula, PilulaSituacao, primeiroNome, rotuloPar } from './comum';
import { PainelMensagem, type AlvoAvulso } from './PainelMensagem';

export interface CobrancaDocumento {
  inscrito: InscritoUnidade;
  criterio: CriterioId;
}

export interface AbaConvocacaoProps {
  unidade: Unidade;
  telefoneUnidade: string;
  filtros: FiltrosUnidade;
  versao: number;
  onMudou: () => void;
  /** Quando vem da aba de validação: abre o painel de mensagem com M4 para esta criança. */
  cobranca: CobrancaDocumento | null;
  onCobrancaTratada: () => void;
}

/* ---------- regras de leitura da chamada ---------- */

type Filtro = 'todas' | 'sem_resposta' | 'vence_hoje' | 'encerradas';
const CHIPS: Array<{ id: Filtro; rotulo: string }> = [
  { id: 'todas', rotulo: 'Todas' },
  { id: 'sem_resposta', rotulo: 'Sem resposta' },
  { id: 'vence_hoje', rotulo: 'Vence hoje' },
  { id: 'encerradas', rotulo: 'Encerradas' },
];
/** Limite de tentativas manuais por chamada (uma por dia de prazo). */
const MAX_TENTATIVAS = 3;
const H24 = 24 * 3600000;
const DADO_FRIO_MS = 60 * 86400000;

function aberta(c: Chamada): boolean {
  return c.situacao !== 'encerrada';
}
function semResposta(c: Chamada): boolean {
  return aberta(c) && c.respostaApp === null && c.situacao !== 'falei' && c.situacao !== 'agendado';
}
function semRespostaHaMaisDe24h(c: Chamada): boolean {
  return semResposta(c) && Date.now() - new Date(c.emitidaEm).getTime() > H24;
}
/** Contato frio: a inscrição é antiga e o telefone pode ter mudado (causa raiz apontada pela SME). */
function contatoFrio(c: Chamada): boolean {
  return Date.now() - new Date(c.contato.atualizadoEm).getTime() > DADO_FRIO_MS;
}
function venceHoje(c: Chamada): boolean {
  if (!aberta(c)) return false;
  const r = restante(c.prazo);
  if (r.ms <= 0) return false;
  return r.dia === 3 || new Date(c.prazo).toDateString() === new Date().toDateString();
}
function aceitaNoApp(c: Chamada): boolean {
  return aberta(c) && c.respostaApp?.resposta === 'aceita';
}
function manuais(c: Chamada): Tentativa[] {
  return c.tentativas.filter((t) => !t.automatica);
}
function tentativaPendente(c: Chamada): Tentativa | null {
  return c.tentativas.findLast((t) => !t.automatica && t.desfecho === null) ?? null;
}
function passaFiltro(c: Chamada, f: Filtro): boolean {
  if (f === 'sem_resposta') return semResposta(c);
  if (f === 'vence_hoje') return venceHoje(c);
  if (f === 'encerradas') return !aberta(c);
  return true;
}
function dataHora(iso: string): string {
  return new Date(iso).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
}
function chaveDe(unidadeId: string, f: FiltrosUnidade): string {
  return `${unidadeId}|${f.grupamento ?? ''}|${f.horario ?? ''}`;
}

/** Tarja lateral: neutra no dia 1, warn no dia 2, danger no dia 3, fundo danger quando vencido. */
function tarja(c: Chamada): { borda: string; fundo: string; cor: string } {
  if (!aberta(c)) return { borda: 'border-l-line', fundo: '', cor: 'text-ink-3' };
  const r = restante(c.prazo);
  if (r.dia === 4) return { borda: 'border-l-danger', fundo: 'bg-danger-soft', cor: 'text-danger' };
  if (r.dia === 3) return { borda: 'border-l-danger', fundo: '', cor: 'text-danger' };
  if (r.dia === 2) return { borda: 'border-l-warn', fundo: '', cor: 'text-warn' };
  return { borda: 'border-l-line-2', fundo: '', cor: 'text-ink' };
}

/* ---------- aba ---------- */

export function AbaConvocacao({ unidade, telefoneUnidade, filtros, versao, onMudou, cobranca, onCobrancaTratada }: AbaConvocacaoProps) {
  const [chamadas, setChamadas] = useState<Chamada[]>([]);
  const [chaveCarregada, setChaveCarregada] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<Filtro>('todas');
  const [painelId, setPainelId] = useState<string | null>(null);
  const [estender, setEstender] = useState<Chamada | null>(null);
  const [comparecer, setComparecer] = useState<Chamada | null>(null);
  const [ocupado, setOcupado] = useState<string | null>(null);
  const [modeloForcado, setModeloForcado] = useState<ModeloId | null>(null);
  const [, tick] = useState(0);

  const chave = chaveDe(unidade.id, filtros);
  const carregando = chaveCarregada !== chave;

  useEffect(() => {
    let vivo = true;
    listarChamadas(unidade.id, filtros).then((lista) => {
      if (!vivo) return;
      setChamadas(lista);
      setChaveCarregada(chaveDe(unidade.id, filtros));
    });
    return () => {
      vivo = false;
    };
  }, [unidade.id, filtros, versao]);

  // o "tempo restante" precisa andar sem interação
  useEffect(() => {
    const t = setInterval(() => tick((x) => x + 1), 60000);
    return () => clearInterval(t);
  }, []);

  const alvoAvulso = useMemo<AlvoAvulso | null>(
    () =>
      cobranca
        ? {
            codigo: cobranca.inscrito.codigo,
            criterio: cobranca.criterio,
            origem: cobranca.inscrito.origem,
            nome: cobranca.inscrito.crianca.nome,
            grupamento: cobranca.inscrito.grupamento,
            horario: cobranca.inscrito.horario,
            telefone: cobranca.inscrito.responsavel.telefone,
            documentoPendente: CRITERIOS_POR_ID[cobranca.criterio].documento,
          }
        : null,
    [cobranca],
  );
  // "Cobrar documento" com chamada já aberta para a criança: usa a chamada (fica registrado) e força o M4.
  useEffect(() => {
    if (!cobranca) {
      setModeloForcado(null);
      return;
    }
    const existente = chamadas.find((c) => c.inscricao === cobranca.inscrito.codigo && c.situacao !== 'encerrada');
    if (existente) {
      setPainelId(existente.id);
      setModeloForcado('M4');
    }
  }, [cobranca, chamadas]);
  const chamadaPainel = painelId ? (chamadas.find((c) => c.id === painelId) ?? null) : null;
  const painelAberto = chamadaPainel !== null || alvoAvulso !== null;

  const fecharPainel = () => {
    setPainelId(null);
    setModeloForcado(null);
    if (cobranca) onCobrancaTratada();
  };
  const abrirMensagem = (c: Chamada) => {
    if (cobranca) onCobrancaTratada();
    setModeloForcado(null);
    setPainelId(c.id);
  };
  const atualizarLinha = (nova: Chamada) => setChamadas((l) => l.map((c) => (c.id === nova.id ? nova : c)));

  const confirmarExtensao = async (c: Chamada, justificativa: string) => {
    setOcupado('estender');
    const nova = await estenderPrazo(c.id, justificativa);
    setOcupado(null);
    if (!nova) {
      toastManager.add({ title: 'Não foi possível estender o prazo', description: 'Tente de novo em instantes.', type: 'error' });
      return;
    }
    atualizarLinha(nova);
    onMudou();
    setEstender(null);
    toastManager.add({ title: 'Prazo estendido em 1 dia útil', description: `Novo prazo: ${dataHora(nova.prazo)}. Justificativa gravada com autor e horário.`, type: 'success' });
  };

  const confirmarComparecimento = async (c: Chamada, resultado: 'matriculou' | 'nao_compareceu') => {
    setOcupado(resultado);
    const nova = await registrarComparecimento(c.id, resultado);
    setOcupado(null);
    if (!nova) {
      toastManager.add({ title: 'Não foi possível registrar', description: 'Tente de novo em instantes.', type: 'error' });
      return;
    }
    atualizarLinha(nova);
    onMudou();
    setComparecer(null);
    if (resultado === 'matriculou') {
      toastManager.add({ title: 'Matrícula registrada', description: `${primeiroNome(c.crianca.nome)} está na turma. Chamada encerrada.`, type: 'success' });
    } else {
      toastManager.add({ title: 'Vaga liberada para o próximo', description: 'Chamada encerrada sem comparecimento. A próxima família da lista pode ser convocada.', type: 'warning' });
    }
  };

  const n24 = chamadas.filter(semRespostaHaMaisDe24h).length;
  const nHoje = chamadas.filter(venceHoje).length;
  const nAceitas = chamadas.filter(aceitaNoApp).length;
  const filtradas = chamadas.filter((c) => passaFiltro(c, filtro));
  const contagem = (f: Filtro) => chamadas.filter((c) => passaFiltro(c, f)).length;

  const acoes = { onMensagem: abrirMensagem, onEstender: setEstender, onComparecer: setComparecer };

  return (
    <div className="step-in">
      {/* faixa de situação */}
      <p className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-ink-2" aria-live="polite">
        <span className={cn('font-semibold', n24 > 0 ? 'text-warn' : 'text-ink-2')}>
          {n24 === 1 ? '1 família sem resposta' : `${n24} famílias sem resposta`} há mais de 24h
        </span>
        <span aria-hidden="true">·</span>
        <span className={cn('font-semibold', nHoje > 0 ? 'text-danger' : 'text-ink-2')}>{nHoje === 1 ? '1 prazo vence hoje' : `${nHoje} prazos vencem hoje`}</span>
        <span aria-hidden="true">·</span>
        <span className={cn('font-semibold', nAceitas > 0 ? 'text-ok' : 'text-ink-2')}>{nAceitas === 1 ? '1 aceita pelo app' : `${nAceitas} aceitas pelo app`}</span>
      </p>

      {/* filtro rápido */}
      <div className="mb-3 flex flex-wrap gap-2" role="group" aria-label="Filtro rápido">
        {CHIPS.map((ch) => (
          <button
            key={ch.id}
            type="button"
            aria-pressed={filtro === ch.id}
            onClick={() => setFiltro(ch.id)}
            className={cn(
              'inline-flex h-11 items-center gap-1.5 rounded-full border px-3.5 text-[13px] font-semibold transition-colors lg:h-9 lg:px-3',
              filtro === ch.id ? 'border-brand bg-brand text-brand-ink' : 'border-line-2 bg-surface text-ink-2 hover:border-line-3',
            )}
          >
            {ch.rotulo}
            <span className={cn('font-mono text-[11px] tnum', filtro === ch.id ? 'text-brand-ink/80' : 'text-ink-3')}>{carregando ? '…' : contagem(ch.id)}</span>
          </button>
        ))}
      </div>

      {carregando ? (
        <ul className="grid gap-2" aria-busy="true" aria-label="Carregando convocações">
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i} className="h-[132px] rounded-2xl shimmer lg:h-16 lg:rounded-xl" />
          ))}
        </ul>
      ) : filtradas.length === 0 ? (
        <Aviso tipo="info">Nenhuma convocação em andamento para este filtro.</Aviso>
      ) : (
        <>
          {/* < 1024px: cartões */}
          <ul className="grid gap-2 lg:hidden">
            {filtradas.map((c) => (
              <Cartao key={c.id} c={c} {...acoes} />
            ))}
          </ul>
          {/* ≥ 1024px: tabela */}
          <div className="hidden overflow-hidden rounded-xl border border-line bg-surface shadow-e1 lg:block">
            <Table className="text-[13px]">
              <TableHeader>
                <TableRow className="bg-surface-2 hover:bg-surface-2">
                  <TableHead className="pl-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-3">Prazo</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-3">Criança</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-3">Resposta no app</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-3">Contato</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-3">Situação</TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-3">Tentativas</TableHead>
                  <TableHead className="pr-3 text-right text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-3">Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtradas.map((c) => {
                  const t = tarja(c);
                  return (
                    <TableRow key={c.id} className={cn(t.fundo, !aberta(c) && 'opacity-70')}>
                      <TableCell className={cn('border-l-4 pl-3 align-top', t.borda)}>
                        <Prazo c={c} />
                      </TableCell>
                      <TableCell className="min-w-[220px] whitespace-normal align-top leading-snug">
                        <p className="text-[14px] font-semibold text-ink">{c.crianca.nome}</p>
                        <p className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[12px] text-ink-3">
                          {rotuloPar(c.crianca.grupamento, c.crianca.horario)}
                          <OpcaoTag opcao={c.opcao} aceitaRealocacao={c.aceitaRealocacao} />
                        </p>
                      </TableCell>
                      <TableCell className="align-top leading-snug">
                        <Resposta c={c} />
                      </TableCell>
                      <TableCell className="align-top leading-snug">
                        <Contato c={c} />
                      </TableCell>
                      <TableCell className="align-top leading-snug">
                        <Situacao c={c} />
                      </TableCell>
                      <TableCell className="align-top leading-snug">
                        <Tentativas c={c} />
                      </TableCell>
                      <TableCell className="w-[1%] whitespace-nowrap pr-3 text-right align-top">
                        <Acoes c={c} {...acoes} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </>
      )}

      <p className="mt-3 text-[12px] leading-snug text-ink-3">
        O aviso automático (app, Pix, WhatsApp e e-mail) abre o prazo de 3 dias. A chamada manual é o reforço para quem não respondeu; sem desfecho registrado, a tentativa não conta. Nenhuma mensagem carrega pontuação,
        posição ou critério.
      </p>

      <PainelMensagem
        aberto={painelAberto}
        onFechar={fecharPainel}
        chamada={chamadaPainel}
        alvoAvulso={chamadaPainel ? null : alvoAvulso}
        modeloForcado={modeloForcado}
        unidade={unidade}
        telefoneUnidade={telefoneUnidade}
        onMudou={onMudou}
        onChamadaAtualizada={atualizarLinha}
      />
      <DialogEstender chamada={estender} ocupado={ocupado === 'estender'} onFechar={() => setEstender(null)} onConfirmar={confirmarExtensao} />
      <DialogComparecimento chamada={comparecer} ocupado={ocupado} onFechar={() => setComparecer(null)} onConfirmar={confirmarComparecimento} />
    </div>
  );
}

/* ---------- células ---------- */

function Prazo({ c, direita = false }: { c: Chamada; direita?: boolean }) {
  if (!aberta(c)) {
    return (
      <div className={cn(direita && 'text-right')}>
        <p className="font-mono text-[16px] font-semibold leading-tight text-ink-3">—</p>
        <p className="text-[11px] text-ink-3">encerrada</p>
      </div>
    );
  }
  const r = restante(c.prazo);
  const t = tarja(c);
  return (
    <div className={cn('shrink-0', direita && 'text-right')}>
      <p className={cn('font-mono text-[16px] font-semibold leading-tight tnum', t.cor)}>{r.texto}</p>
      <p className="text-[11px] text-ink-3 tnum">
        {r.dia === 4 ? 'venceu' : 'até'} {dataHora(c.prazo)}
        {c.prorrogacao ? <span className="font-semibold text-warn"> · +1 dia útil</span> : null}
      </p>
    </div>
  );
}

function Resposta({ c }: { c: Chamada }) {
  const r = c.respostaApp;
  const autos = c.tentativas.filter((t) => t.automatica);
  return (
    <div className="flex flex-col items-start gap-1">
      {r?.resposta === 'aceita' ? (
        <Pilula tom="ok" title={`Aceitou no app em ${dataHora(r.em)}`}>
          <CheckCircle2 className="size-3.5" /> Aceitou no app
        </Pilula>
      ) : r?.resposta === 'recusada' ? (
        <Pilula tom="danger" title={`Recusou no app em ${dataHora(r.em)}`}>
          <XCircle className="size-3.5" /> Recusou no app
        </Pilula>
      ) : (
        <Pilula tom="warn">Sem resposta no app</Pilula>
      )}
      {autos.length ? (
        <span className="inline-flex items-center gap-0.5 text-[11px] text-ink-3" title={`Aviso automático em ${dataHora(autos[0].em)}: ${autos.map((t) => CANAL_LABEL[t.canal]).join(', ')}`}>
          <span className="mr-0.5">aviso:</span>
          {autos.map((t) => {
            const pixOk = t.canal === 'pix' && c.contato.pixVerificada;
            return (
              <span key={t.id} className={cn('inline-grid size-5 place-items-center rounded-md', pixOk ? 'bg-brand-soft text-brand' : 'text-ink-3')} title={pixOk ? 'Pix verificado — o aviso chega pelo banco mesmo se o telefone mudou' : CANAL_LABEL[t.canal]}>
                <IconeCanal canal={t.canal} />
              </span>
            );
          })}
        </span>
      ) : null}
    </div>
  );
}

function Contato({ c }: { c: Chamada }) {
  const frio = contatoFrio(c);
  return (
    <div className="leading-snug">
      <p className="inline-flex items-center gap-1 font-mono text-[13px] text-ink tnum">
        {mascararTelefone(c.contato.telefone)}
        {c.contato.telefoneVerificado ? <CheckCircle2 className="size-3.5 text-ok" aria-label="telefone verificado" /> : null}
      </p>
      <p className={cn('text-[11px]', frio ? 'font-medium text-warn' : 'text-ink-3')} title={frio ? 'Contato frio: a inscrição é antiga e o telefone pode ter mudado' : undefined}>
        dado de {idadeDoDado(c.contato.atualizadoEm)}
        {c.contato.historico.length ? ' · corrigido' : ''}
      </p>
    </div>
  );
}

function Situacao({ c }: { c: Chamada }) {
  return (
    <div className="flex flex-col items-start gap-1">
      <PilulaSituacao situacao={c.situacao} />
      {c.situacao === 'agendado' && c.dataPrevista ? <span className="text-[11px] text-ink-3 tnum">previsto {dataHora(c.dataPrevista)}</span> : null}
      {c.comparecimento ? <span className="text-[11px] text-ink-3">{c.comparecimento.resultado === 'matriculou' ? 'matriculou' : 'não compareceu'}</span> : null}
    </div>
  );
}

function Tentativas({ c }: { c: Chamada }) {
  const m = manuais(c);
  const contadas = m.filter((t) => t.desfecho !== null).length;
  const pend = tentativaPendente(c);
  return (
    <div className="flex flex-col items-start gap-1">
      <span className="inline-flex items-center gap-1.5 text-[13px] text-ink tnum">
        {contadas} de {MAX_TENTATIVAS}
        {m.length ? (
          <span className="inline-flex gap-0.5 text-ink-3" aria-label={`canais: ${m.map((t) => CANAL_LABEL[t.canal]).join(', ')}`}>
            {m.map((t) => (
              <IconeCanal key={t.id} canal={t.canal} />
            ))}
          </span>
        ) : null}
      </span>
      {pend ? (
        <Pilula tom="warn" className="h-5 text-[11px]">
          aguardando desfecho
        </Pilula>
      ) : null}
    </div>
  );
}

interface AcoesProps {
  c: Chamada;
  onMensagem: (c: Chamada) => void;
  onEstender: (c: Chamada) => void;
  onComparecer: (c: Chamada) => void;
  cheio?: boolean;
}

function Acoes({ c, onMensagem, onEstender, onComparecer, cheio = false }: AcoesProps) {
  if (!aberta(c)) {
    return (
      <span className="text-[12px] text-ink-3">
        {c.comparecimento ? (c.comparecimento.resultado === 'matriculou' ? 'Matriculou' : 'Vaga liberada') : c.respostaApp?.resposta === 'recusada' ? 'Recusou a vaga' : 'Encerrada'}
      </span>
    );
  }
  const r = restante(c.prazo);
  const vencida = r.dia === 4;
  const podeEstender = r.dia === 3 && !c.prorrogacao;
  const agendou = c.situacao === 'agendado' || c.situacao === 'falei';
  // Vencida sem agendamento também precisa de encerramento explícito: é o que libera a vaga.
  const podeComparecer = agendou || vencida;
  const cls = cheio ? 'h-11 flex-1' : 'h-9';
  return (
    <div className={cn('flex flex-wrap gap-2', cheio ? 'w-full' : 'justify-end')}>
      {podeComparecer ? (
        <Button size="sm" variant="outline" className={cn(cls, vencida && !agendou && 'border-danger/40 text-danger hover:bg-danger-soft')} onClick={() => onComparecer(c)}>
          <ClipboardCheck />
          {vencida && !agendou ? 'Encerrar por prazo' : 'Registrar comparecimento'}
        </Button>
      ) : null}
      {podeEstender ? (
        <Button size="sm" variant="outline" className={cn(cls, 'border-warn/40 text-warn hover:bg-warn-soft')} onClick={() => onEstender(c)}>
          <CalendarClock />
          Estender prazo
        </Button>
      ) : null}
      <Button size="sm" className={cls} onClick={() => onMensagem(c)}>
        <Send />
        Mensagem
      </Button>
    </div>
  );
}

function Cartao({ c, ...acoes }: Omit<AcoesProps, 'cheio'>) {
  const t = tarja(c);
  return (
    <li className={cn('rounded-2xl border border-line border-l-4 bg-surface p-3.5 shadow-e1', t.borda, t.fundo, !aberta(c) && 'opacity-80')}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[15px] font-bold leading-snug text-ink">{c.crianca.nome}</p>
          <p className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[12px] text-ink-3">
            {rotuloPar(c.crianca.grupamento, c.crianca.horario)}
            <OpcaoTag opcao={c.opcao} aceitaRealocacao={c.aceitaRealocacao} />
          </p>
        </div>
        <Prazo c={c} direita />
      </div>
      <div className="mt-2.5 flex flex-wrap items-start gap-x-3 gap-y-1.5">
        <Resposta c={c} />
        <Situacao c={c} />
      </div>
      <div className="mt-2.5 grid grid-cols-2 gap-3">
        <Contato c={c} />
        <Tentativas c={c} />
      </div>
      <div className="mt-3">
        <Acoes c={c} cheio {...acoes} />
      </div>
    </li>
  );
}

/* ---------- diálogos ---------- */

function DialogEstender({ chamada, ocupado, onFechar, onConfirmar }: { chamada: Chamada | null; ocupado: boolean; onFechar: () => void; onConfirmar: (c: Chamada, justificativa: string) => void }) {
  return (
    <Dialog open={chamada !== null} onOpenChange={(o) => !o && onFechar()}>
      <DialogPopup>{chamada ? <CorpoEstender chamada={chamada} ocupado={ocupado} onFechar={onFechar} onConfirmar={onConfirmar} /> : null}</DialogPopup>
    </Dialog>
  );
}

/** Estado local dentro do popup: desmonta ao fechar, então a justificativa nunca vaza para outra chamada. */
function CorpoEstender({ chamada, ocupado, onFechar, onConfirmar }: { chamada: Chamada; ocupado: boolean; onFechar: () => void; onConfirmar: (c: Chamada, justificativa: string) => void }) {
  const [justificativa, setJustificativa] = useState('');
  const valida = justificativa.trim().length >= 10;
  return (
    <>
      <DialogHeader>
        <DialogTitle>Estender prazo em 1 dia útil</DialogTitle>
        <DialogDescription>
          {primeiroNome(chamada.crianca.nome)} · prazo atual {dataHora(chamada.prazo)}. A resolução da SME permite a extensão uma única vez, mediante justificativa apresentada dentro do prazo original.
        </DialogDescription>
      </DialogHeader>
      <DialogPanel>
        <label htmlFor="justificativa-prazo" className="mb-1.5 block text-[15px] font-semibold text-ink">
          Justificativa <span className="text-[12px] font-medium text-danger">obrigatória</span>
        </label>
        <Textarea
          id="justificativa-prazo"
          autoFocus
          value={justificativa}
          onChange={(e) => setJustificativa(e.target.value)}
          placeholder="Ex.: a família confirmou por telefone que só consegue vir amanhã por causa do trabalho."
          className="text-[14px]"
        />
        <p className="mt-1.5 text-[12px] text-ink-3">{valida ? 'Fica gravada com autor e horário. Não pode ser apagada.' : 'Escreva ao menos 10 caracteres — a justificativa é o que permite a CRE auditar a extensão.'}</p>
      </DialogPanel>
      <DialogFooter>
        <Button variant="outline" size="lg" onClick={onFechar}>
          Cancelar
        </Button>
        <Button size="lg" disabled={!valida} loading={ocupado} onClick={() => onConfirmar(chamada, justificativa.trim())}>
          <CalendarClock />
          Estender prazo
        </Button>
      </DialogFooter>
    </>
  );
}

function DialogComparecimento({
  chamada,
  ocupado,
  onFechar,
  onConfirmar,
}: {
  chamada: Chamada | null;
  ocupado: string | null;
  onFechar: () => void;
  onConfirmar: (c: Chamada, resultado: 'matriculou' | 'nao_compareceu') => void;
}) {
  return (
    <Dialog open={chamada !== null} onOpenChange={(o) => !o && onFechar()}>
      <DialogPopup>
        {chamada ? (
          <>
            <DialogHeader>
              <DialogTitle>Registrar comparecimento</DialogTitle>
              <DialogDescription>
                {chamada.crianca.nome} · {rotuloPar(chamada.crianca.grupamento, chamada.crianca.horario)}
                {chamada.dataPrevista ? ` · previsto para ${dataHora(chamada.dataPrevista)}` : ' · sem data combinada'}. Isto encerra a chamada. Se a família não veio, a vaga é oferecida à próxima da lista.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter variant="bare" className="flex-col gap-2 sm:flex-row">
              <Button variant="ghost" size="lg" className="h-11 w-full sm:w-auto" disabled={ocupado !== null} onClick={onFechar}>
                Cancelar
              </Button>
              <Button variant="destructive-outline" size="lg" className="h-11 w-full sm:w-auto" disabled={ocupado !== null} loading={ocupado === 'nao_compareceu'} onClick={() => onConfirmar(chamada, 'nao_compareceu')}>
                <XCircle />
                Não compareceu
              </Button>
              <Button size="lg" className="h-11 w-full sm:flex-1" disabled={ocupado !== null} loading={ocupado === 'matriculou'} onClick={() => onConfirmar(chamada, 'matriculou')}>
                <CheckCircle2 />
                Compareceu e matriculou
              </Button>
            </DialogFooter>
          </>
        ) : null}
      </DialogPopup>
    </Dialog>
  );
}
