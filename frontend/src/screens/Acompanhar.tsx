import { AlertTriangle, Check, ChevronDown, Clock, Landmark, Mail, MessageCircle, Pencil, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { consultarInscricao, responderConvocacao, simularEvento } from '@/api/client';
import type { Inscricao, StatusInscricao } from '@/api/types';
import { Page, PageTitle, Section, TopBar } from '@/components/shell';
import { Aviso, CampoTexto, DemandaTag, NotificacaoSimulada } from '@/components/comuns';
import { Button } from '@/components/ui/button';
import { mascararCpf } from '@/domain/cpf';
import { formatarDataBr } from '@/domain/grupamento';
import { CRITERIOS_POR_ID } from '@/domain/prioridade';
import { percentualRisco, riscoDaUnidade } from '@/mocks/risco';
import { cn } from '@/lib/utils';
import { useRascunho } from '@/store/rascunho';

const STATUS: Record<StatusInscricao, { rotulo: string; cls: string }> = {
  recebida: { rotulo: 'Recebida', cls: 'bg-brand-soft text-brand' },
  documentos_pendentes: { rotulo: 'Documentos pendentes', cls: 'bg-warn-soft text-warn' },
  pre_classificada: { rotulo: 'Na fila', cls: 'bg-brand-soft text-brand' },
  convocada: { rotulo: 'Vaga disponível', cls: 'bg-ok-soft text-ok' },
  matriculada: { rotulo: 'Vaga aceita', cls: 'bg-ok-soft text-ok' },
  vaga_recusada: { rotulo: 'Vaga recusada', cls: 'bg-surface-2 text-ink-2' },
  prazo_expirado: { rotulo: 'Prazo expirado', cls: 'bg-danger-soft text-danger' },
};

function restante(prazo: string): { texto: string; urgente: boolean } {
  const ms = new Date(prazo).getTime() - Date.now();
  if (ms <= 0) return { texto: 'prazo encerrado', urgente: true };
  const h = Math.floor(ms / 3600000);
  const d = Math.floor(h / 24);
  if (d >= 1) return { texto: `${d} dia${d > 1 ? 's' : ''} e ${h % 24}h`, urgente: d < 1 };
  const m = Math.floor((ms % 3600000) / 60000);
  return { texto: `${h}h ${m}min`, urgente: true };
}

function dataHora(iso: string): string {
  return new Date(iso).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
}

export function Acompanhar() {
  const { codigo: codigoRota } = useParams();
  const nav = useNavigate();
  const { carregarParaEdicao } = useRascunho();
  const [codigo, setCodigo] = useState(codigoRota ?? '');
  const [cpf, setCpf] = useState('');
  const [insc, setInsc] = useState<Inscricao | null>(null);
  const [buscando, setBuscando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [confirmarRecusa, setConfirmarRecusa] = useState(false);
  const [respondendo, setRespondendo] = useState(false);
  const [porque, setPorque] = useState(false);
  const [, tick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => tick((x) => x + 1), 60000);
    return () => clearInterval(t);
  }, []);

  const buscar = async (cod = codigo, doc = cpf) => {
    setBuscando(true);
    setErro(null);
    const r = await consultarInscricao(cod, doc);
    setBuscando(false);
    if (!r) {
      setErro('Não encontramos inscrição com esse código e CPF. Confira o código (ele tem o formato RIO-XXXX-XXXX).');
      setInsc(null);
      return;
    }
    setInsc(r);
    if (cod !== codigoRota) nav(`/acompanhar/${cod.toUpperCase()}`, { replace: true });
  };

  useEffect(() => {
    if (codigoRota) void buscar(codigoRota, '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codigoRota]);

  const responder = async (aceite: boolean) => {
    if (!insc) return;
    setRespondendo(true);
    const r = await responderConvocacao(insc.codigo, aceite);
    setRespondendo(false);
    setConfirmarRecusa(false);
    if (r) setInsc(r);
  };
  const simular = async (ev: 'convocar' | 'reiniciar') => {
    if (!insc) return;
    const r = await simularEvento(insc.codigo, ev);
    if (r) setInsc(r);
  };

  const conv = insc?.convocacao;
  const prazo = conv ? restante(conv.prazo) : null;
  // Risco de não-alocação da 1ª opção, previsto pelo modelo XGBoost do BigQuery.
  const primeiraOpcao = insc?.classificacao?.porOpcao[0] ?? null;
  const risco = primeiraOpcao ? riscoDaUnidade(primeiraOpcao.unidadeId) : null;

  return (
    <>
      <TopBar voltarPara="/app" />
      <Page>
        <PageTitle eyebrow="Acompanhamento" sub={insc ? undefined : 'Digite o código que você recebeu e o CPF do responsável.'}>
          {insc ? `Inscrição de ${insc.crianca.nome.split(' ')[0]}` : 'Minha inscrição'}
        </PageTitle>

        {!insc ? (
          <>
            <Section>
              <form
                className="grid gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  void buscar();
                }}
              >
                <CampoTexto label="Código da inscrição" placeholder="RIO-XXXX-XXXX" autoCapitalize="characters" className="font-mono" value={codigo} onChange={(e) => setCodigo(e.target.value.toUpperCase())} />
                <CampoTexto label="CPF do responsável" inputMode="numeric" placeholder="000.000.000-00" value={cpf} onChange={(e) => setCpf(mascararCpf(e.target.value))} />
                {erro ? (
                  <Aviso tipo="danger">{erro}</Aviso>
                ) : null}
                <Button type="submit" size="xl" loading={buscando} disabled={codigo.trim().length < 6}>
                  <Search />
                  Ver situação
                </Button>
              </form>
            </Section>
            <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-3">Exemplos para demonstração</p>
            <div className="grid gap-2">
              <Button variant="outline" size="lg" className="justify-start" onClick={() => { setCodigo('DEMO-2027-FILA'); void buscar('DEMO-2027-FILA', ''); }}>
                Família na fila · pré-classificada
              </Button>
              <Button variant="outline" size="lg" className="justify-start" onClick={() => { setCodigo('DEMO-2027-VAGA'); void buscar('DEMO-2027-VAGA', ''); }}>
                Família convocada · vaga para responder
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className={cn('inline-flex h-7 items-center rounded-md px-2 text-[13px] font-semibold', STATUS[insc.status].cls)}>{STATUS[insc.status].rotulo}</span>
              <span className="font-mono text-[13px] text-ink-3">{insc.codigo}</span>
              <span className="text-[13px] text-ink-3">· {insc.grupamento} · {insc.horario}</span>
              <button type="button" className="ml-auto text-[13px] font-semibold text-brand" onClick={() => { setInsc(null); nav('/acompanhar', { replace: true }); }}>
                Trocar
              </button>
            </div>

            {conv && insc.status === 'convocada' ? (
              <section className="mb-4 overflow-hidden rounded-3xl border border-ok/30 bg-surface shadow-e3">
                <div className="bg-ok px-5 py-4 text-white">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80">Vaga disponível</p>
                  <h2 className="mt-1 text-[22px] font-bold leading-tight">{conv.unidadeNome}</h2>
                  <p className={cn('mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[13px] font-semibold', prazo?.urgente && 'bg-white text-danger')}>
                    <Clock className="size-4" />
                    Responda em {prazo?.texto}
                  </p>
                </div>
                <div className="grid gap-3 p-4">
                  <p className="text-[14px] leading-snug text-ink-2">
                    Aceitando, você tem até <b className="text-ink">{new Date(conv.prazo).toLocaleDateString('pt-BR')}</b> para levar os documentos originais à creche e concluir a matrícula. Precisa de mais um dia útil? Dá para pedir com justificativa dentro do prazo.
                  </p>
                  <p className="flex flex-wrap items-center gap-2 text-[12px] text-ink-3">
                    Aviso enviado por:
                    {conv.canais.includes('pix') ? <span className="inline-flex items-center gap-1 rounded-md bg-brand-soft px-1.5 py-0.5 font-semibold text-brand"><Landmark className="size-3.5" /> Pix</span> : null}
                    {conv.canais.includes('whatsapp') ? <span className="inline-flex items-center gap-1 rounded-md bg-surface-2 px-1.5 py-0.5 font-semibold text-ink-2"><MessageCircle className="size-3.5" /> WhatsApp</span> : null}
                    {conv.canais.includes('email') ? <span className="inline-flex items-center gap-1 rounded-md bg-surface-2 px-1.5 py-0.5 font-semibold text-ink-2"><Mail className="size-3.5" /> e-mail</span> : null}
                  </p>
                  {conv.canais.includes('pix') ? (
                    <NotificacaoSimulada app="banco" titulo="Pix recebido · R$ 0,01" texto={`PREFEITURA DO RIO – EDUCAÇÃO: Vaga para ${insc.crianca.nome.split(' ')[0]} na ${conv.unidadeNome}. Responda até ${new Date(conv.prazo).toLocaleDateString('pt-BR')} em matricula.rio/a/${insc.codigo}`} />
                  ) : null}
                  {!confirmarRecusa ? (
                    <div className="grid grid-cols-[1fr_1.6fr] gap-2">
                      <Button size="xl" variant="outline" className="border-danger/40 text-danger hover:bg-danger-soft" onClick={() => setConfirmarRecusa(true)}>
                        <X />
                        Recusar
                      </Button>
                      <Button size="xl" className="border-ok bg-ok hover:bg-ok/90" loading={respondendo} onClick={() => responder(true)}>
                        <Check />
                        Aceitar a vaga
                      </Button>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-danger/30 bg-danger-soft p-3">
                      <p className="flex items-start gap-2 text-[14px] text-ink">
                        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-danger" />
                        Ao recusar, a vaga vai na hora para a próxima família. Sua inscrição continua ativa nas outras opções.
                      </p>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <Button size="lg" variant="outline" onClick={() => setConfirmarRecusa(false)}>
                          Voltar
                        </Button>
                        <Button size="lg" variant="destructive" loading={respondendo} onClick={() => responder(false)}>
                          Confirmar recusa
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            ) : null}

            {insc.status === 'matriculada' && conv ? (
              <Aviso tipo="ok" titulo="Vaga aceita" className="mb-4">
                Leve os documentos originais à {conv.unidadeNome} até {new Date(conv.prazo).toLocaleDateString('pt-BR')}. A creche já foi avisada.
              </Aviso>
            ) : null}
            {insc.status === 'vaga_recusada' ? (
              <Aviso tipo="info" titulo="Vaga liberada para a próxima família" className="mb-4">
                Você continua na fila das outras opções. Obrigado por responder rápido — é isso que evita vaga parada.
              </Aviso>
            ) : null}
            {insc.status === 'documentos_pendentes' ? (
              <Aviso tipo="warn" titulo="Há documento pendente" className="mb-4">
                Envie pela inscrição ou leve o original à creche da 1ª opção. Sem ele, o critério não vale na classificação.
              </Aviso>
            ) : null}

            {risco && primeiraOpcao ? (
              <Aviso
                tipo={risco.nivel === 'alto' ? 'warn' : 'ok'}
                titulo={risco.nivel === 'alto' ? `Risco alto de não conseguir vaga na ${primeiraOpcao.unidadeNome}` : `Risco baixo na ${primeiraOpcao.unidadeNome}`}
                className="mb-4"
              >
                O modelo estima {percentualRisco(risco)} de chance de a alocação não se confirmar nessa creche
                {risco.nivel === 'alto' ? ' — vale manter opções de demanda menor na sua lista.' : '.'}
              </Aviso>
            ) : null}

            <Section title={`Posição por creche · atualizado ${insc.classificacao ? dataHora(insc.classificacao.atualizadoEm) : '—'}`}>
              <ol className="grid gap-2">
                {insc.classificacao?.porOpcao.map((o) => (
                  <li key={o.unidadeId} className="flex min-w-0 items-center gap-2 rounded-xl border border-line bg-surface-2 p-2.5">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand font-mono text-[12px] font-bold text-brand-ink">{o.ordem}</span>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-[13px] font-semibold leading-snug text-ink">{o.unidadeNome}</p>
                      <p className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[12px] text-ink-3 tnum">
                        <span>{o.vagas} vagas</span>
                        <DemandaTag demanda={o.demanda} curta className="h-5 px-1 text-[11px]" />
                      </p>
                    </div>
                    <div className="w-[68px] shrink-0 text-right">
                      <p className={cn('font-mono text-[18px] font-semibold leading-none tnum', o.posicao <= o.vagas ? 'text-ok' : 'text-ink')}>{o.posicao}ª</p>
                      <p className="text-[10px] leading-tight text-ink-3">{o.posicao <= o.vagas ? 'dentro das vagas' : 'fila de espera'}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <button type="button" className="mt-3 inline-flex min-h-9 items-center gap-1 text-[13px] font-semibold text-brand" onClick={() => setPorque((v) => !v)} aria-expanded={porque}>
                Por que esta posição? <ChevronDown className={cn('size-4 transition-transform', porque && 'rotate-180')} />
              </button>
              {porque ? (
                <div className="mt-2 rounded-xl bg-brand-soft p-3 text-[13px] text-ink-2">
                  <p className="mb-2 font-semibold text-brand">{insc.criterios.length === 0 ? 'Inscrição comum' : `Inscrição prioritária · ${insc.criterios.length} ${insc.criterios.length === 1 ? 'critério' : 'critérios'}`}</p>
                  {insc.criterios.length === 0 ? (
                    <p>Sem critério de prioridade, a ordem entre as inscrições segue a data da inscrição.</p>
                  ) : (
                    <ul className="grid gap-1">
                      {insc.criterios.map((c) => (
                        <li key={c}>
                          {CRITERIOS_POR_ID[c].titulo}
                          <span className="text-ink-3"> · {insc.criteriosRecusados?.includes(c) ? 'não aceito pela unidade' : insc.documentos[c]?.status === 'pre_aprovado' ? 'doc. pré-aprovado' : insc.documentos[c]?.status === 'revisar' ? 'doc. a conferir' : 'doc. pendente'}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <p className="mt-2 text-[12px] leading-snug text-ink-3">A posição segue regra fixa do edital (critérios de prioridade e data da inscrição), a mesma para todas as famílias, e pode ser auditada pela SME. Inscrita em {formatarDataBr(insc.criadaEm.slice(0, 10))}.</p>
                </div>
              ) : null}
            </Section>

            {insc.status !== 'matriculada' && insc.status !== 'prazo_expirado' && insc.status !== 'convocada' ? (
              <Button
                size="lg"
                variant="outline"
                className="mb-4 h-11 w-full"
                onClick={() => {
                  carregarParaEdicao(insc);
                  nav('/inscricao/unidades');
                }}
              >
                <Pencil />
                Alterar creches escolhidas
              </Button>
            ) : null}

            <Section title="Histórico">
              <ol className="relative grid gap-3 border-l border-line pl-4">
                {[...insc.timeline].reverse().map((ev, i) => (
                  <li key={`${ev.em}-${i}`} className="relative">
                    <span className={cn('absolute -left-[21px] top-1.5 size-2.5 rounded-full ring-2 ring-surface', ev.tipo === 'ok' ? 'bg-ok' : ev.tipo === 'warn' ? 'bg-warn' : ev.tipo === 'danger' ? 'bg-danger' : 'bg-brand-2')} aria-hidden="true" />
                    <p className="text-[14px] font-semibold leading-snug text-ink">{ev.titulo}</p>
                    {ev.detalhe ? <p className="text-[13px] leading-snug text-ink-2">{ev.detalhe}</p> : null}
                    <p className="text-[11px] text-ink-3">{dataHora(ev.em)}</p>
                  </li>
                ))}
              </ol>
            </Section>

            <Section title="Contatos para aviso">
              <ul className="grid gap-1.5 text-[14px] text-ink-2">
                <li className="flex items-center gap-2"><MessageCircle className="size-4 text-ink-3" /> {insc.responsavel.telefone}{insc.contato.telefoneVerificado ? ' · confirmado' : ''}</li>
                {insc.responsavel.email ? <li className="flex items-center gap-2"><Mail className="size-4 text-ink-3" /> {insc.responsavel.email}</li> : null}
                <li className="flex items-center gap-2"><Landmark className="size-4 text-ink-3" /> {insc.contato.pixChaves.length ? `Pix ${insc.contato.pixChaves[0]}${insc.contato.pixVerificada ? ' · confirmada' : ''}` : 'Sem chave Pix cadastrada'}</li>
              </ul>
            </Section>

            <div className="mt-6 rounded-2xl border border-dashed border-line-2 p-3">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-3">Somente na demonstração</p>
              <div className="flex flex-wrap gap-2">
                {insc.status !== 'convocada' ? (
                  <Button size="sm" variant="outline" onClick={() => simular('convocar')}>
                    Simular convocação
                  </Button>
                ) : null}
                <Button size="sm" variant="ghost" onClick={() => simular('reiniciar')}>
                  Voltar para a fila
                </Button>
                <Button size="sm" variant="ghost" render={<Link to="/app" />}>
                  Início
                </Button>
              </div>
            </div>
          </>
        )}
      </Page>
    </>
  );
}
