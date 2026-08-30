import { Check, Eye, FileImage, ImageOff, MessageSquareWarning, RotateCcw, X } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { registrarValidacao } from '@/api/client';
import type { CriterioId, CriterioValidacao, DocumentoAnalise, DocumentoStatus, EstadoValidacao, EventoValidacao, InscritoUnidade, MotivoRecusa, Unidade } from '@/api/types';
import { Aviso } from '@/components/comuns';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogPanel, DialogPopup, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerDescription, DrawerHeader, DrawerPanel, DrawerPopup, DrawerTitle } from '@/components/ui/drawer';
import { Radio, RadioGroup } from '@/components/ui/radio-group';
import { Sheet, SheetDescription, SheetHeader, SheetPanel, SheetPopup, SheetTitle } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { toastManager } from '@/components/ui/toast';
import { formatarDataBr } from '@/domain/grupamento';
import { JANELA_DESFAZER_MS, MOTIVOS_RECUSA, MOTIVO_LABEL } from '@/domain/validacao';
import { cn } from '@/lib/utils';
import { podeDesfazer } from '@/mocks/creche';
import { OpcaoTag, Pilula, PilulaEstado, PilulaEvidencia, rotuloPar } from './comum';

/* ---------- helpers compartilhados com a lista ---------- */

export function idadeTexto(nascimentoIso: string): string {
  const m = idadeEmMeses(nascimentoIso);
  return m === 1 ? '1 mês' : `${m} meses`;
}

export function idadeEmMeses(nascimentoIso: string): number {
  const base = nascimentoIso.length === 10 ? `${nascimentoIso}T00:00:00` : nascimentoIso;
  const n = new Date(base);
  if (Number.isNaN(n.getTime())) return 0;
  const h = new Date();
  return Math.max(0, (h.getFullYear() - n.getFullYear()) * 12 + (h.getMonth() - n.getMonth()) - (h.getDate() < n.getDate() ? 1 : 0));
}

export const SEXO_LABEL: Record<InscritoUnidade['crianca']['sexo'], string> = { F: 'Menina', M: 'Menino', nao_informar: 'Sexo não informado' };

export function dataHoraBr(iso: string): string {
  const d = new Date(iso);
  return `${d.toLocaleDateString('pt-BR')} às ${d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
}

function horaBr(ms: number): string {
  return new Date(ms).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

/** Confirmação em 1 clique: a evidência veio de base (RMI/base) ou a IA pré-aprovou a foto. Caso contrário, o diretor precisa declarar que viu o original. */
function confirmaDireto(c: CriterioValidacao): boolean {
  const ev = c.evidencia;
  // 1 clique só com evidência de base municipal ou pré-análise aprovada; o resto exige ver o original.
  return ev.tipo === 'rmi' || (ev.tipo === 'pre_analise' && ev.analise?.status === 'pre_aprovado');
}

const ANALISE: Record<DocumentoStatus, { rotulo: string; tom: 'neutro' | 'brand' | 'ok' | 'warn' | 'danger' }> = {
  pendente: { rotulo: 'Sem foto', tom: 'neutro' },
  analisando: { rotulo: 'Analisando…', tom: 'brand' },
  pre_aprovado: { rotulo: 'Pré-aprovado pela IA', tom: 'ok' },
  revisar: { rotulo: 'Conferir o original', tom: 'warn' },
  ilegivel: { rotulo: 'Foto ilegível', tom: 'danger' },
};

function descreverEvento(e: EventoValidacao): string {
  const verbo = e.estado === 'confirmado' ? 'Confirmado' : e.estado === 'recusado' ? 'Recusado' : 'Desfeito';
  return `${verbo} por ${e.autor} em ${dataHoraBr(e.em)}`;
}

/* ---------- painel ---------- */

export interface DetalheInscritoProps {
  inscrito: InscritoUnidade | null;
  aberto: boolean;
  /** < 1024px: Drawer inferior. Caso contrário, Sheet à direita. */
  mobile: boolean;
  unidade: Unidade;
  onFechar: () => void;
  /** Depois de qualquer gravação: recarrega a lista e avisa o cabeçalho. */
  onMudou: () => Promise<void> | void;
  onCobrarDocumento: (inscrito: InscritoUnidade, criterio: CriterioId) => void;
}

export function DetalheInscrito({ inscrito, aberto, mobile, unidade, onFechar, onMudou, onCobrarDocumento }: DetalheInscritoProps) {
  // Mantém o último inscrito para a animação de saída não esvaziar o painel (estado ajustado durante o render).
  const [ultimo, setUltimo] = useState<InscritoUnidade | null>(inscrito);
  if (inscrito && inscrito !== ultimo) setUltimo(inscrito);
  const i = inscrito ?? ultimo;

  const titulo = i?.crianca.nome ?? 'Inscrito';
  const sub = i ? `Nascimento ${formatarDataBr(i.crianca.nascimento.slice(0, 10))} · ${idadeTexto(i.crianca.nascimento)} · ${SEXO_LABEL[i.crianca.sexo]}` : '';
  const pilulas = i ? (
    <div className="flex flex-wrap gap-1.5">
      {i.origem === 'app' ? <Pilula tom="brand">inscrição do app</Pilula> : null}
      {i.decideVaga ? <Pilula tom="warn">decide vaga</Pilula> : null}
      {i.criterios.some((c) => c.estado === 'pendente') ? <Pilula tom="neutro">{i.criterios.filter((c) => c.estado === 'pendente').length} pendente(s)</Pilula> : null}
    </div>
  ) : null;
  const conteudo = i ? <Conteudo inscrito={i} unidade={unidade} onMudou={onMudou} onFechar={onFechar} onCobrarDocumento={onCobrarDocumento} /> : null;

  if (mobile) {
    return (
      <Drawer open={aberto} onOpenChange={(o) => !o && onFechar()}>
        <DrawerPopup showBar showCloseButton className="max-h-[92dvh]">
          <DrawerHeader className="pr-12">
            <DrawerTitle className="text-[20px] leading-tight">{titulo}</DrawerTitle>
            <DrawerDescription className="text-ink-2">{sub}</DrawerDescription>
            {pilulas}
          </DrawerHeader>
          <DrawerPanel>{conteudo}</DrawerPanel>
        </DrawerPopup>
      </Drawer>
    );
  }
  return (
    <Sheet open={aberto} onOpenChange={(o) => !o && onFechar()}>
      <SheetPopup side="right" className="max-w-xl" closeProps={{ 'aria-label': 'Fechar' }}>
        <SheetHeader className="pr-14">
          <SheetTitle className="text-[20px] leading-tight">{titulo}</SheetTitle>
          <SheetDescription className="text-ink-2">{sub}</SheetDescription>
          {pilulas}
        </SheetHeader>
        <SheetPanel>{conteudo}</SheetPanel>
      </SheetPopup>
    </Sheet>
  );
}

/* ---------- corpo do painel ---------- */

type Dialogo = { tipo: 'confirmar' | 'recusar'; criterio: CriterioValidacao };

interface Gravacao {
  estado: EstadoValidacao;
  motivo?: MotivoRecusa;
  observacao?: string;
  desfazDe?: string;
}

function Conteudo({ inscrito, unidade, onMudou, onFechar, onCobrarDocumento }: { inscrito: InscritoUnidade; unidade: Unidade; onMudou: () => Promise<void> | void; onFechar: () => void; onCobrarDocumento: (inscrito: InscritoUnidade, criterio: CriterioId) => void }) {
  const [ocupado, setOcupado] = useState<CriterioId | null>(null);
  const [dialogo, setDialogo] = useState<Dialogo | null>(null);
  const [, tick] = useState(0);

  // A janela de 15 minutos do "Desfazer" fecha sozinha: re-renderiza de tempos em tempos.
  useEffect(() => {
    const t = setInterval(() => tick((x) => x + 1), 30000);
    return () => clearInterval(t);
  }, []);

  const gravar = async (criterio: CriterioValidacao, dados: Gravacao, aviso: { title: string; description?: string; type: 'success' | 'info' | 'warning' }) => {
    setOcupado(criterio.id);
    try {
      await registrarValidacao({ inscricao: inscrito.codigo, unidadeId: unidade.id, criterio: criterio.id, ...dados });
      await onMudou();
      setDialogo(null);
      toastManager.add(aviso);
    } catch {
      toastManager.add({ title: 'Não foi possível registrar.', description: 'Tente de novo em instantes.', type: 'error' });
    } finally {
      setOcupado(null);
    }
  };

  const confirmar = (c: CriterioValidacao, observacao?: string) => gravar(c, { estado: 'confirmado', observacao: observacao?.trim() || undefined }, { title: 'Critério confirmado.', description: 'Posição recalculada.', type: 'success' });
  const recusar = (c: CriterioValidacao, motivo: MotivoRecusa, observacao?: string) => gravar(c, { estado: 'recusado', motivo, observacao: observacao?.trim() || undefined }, { title: 'Critério recusado.', description: `Motivo registrado: ${MOTIVO_LABEL[motivo].toLowerCase()}.`, type: 'warning' });
  const desfazer = (c: CriterioValidacao) => {
    if (!c.ultimoEvento) return;
    return gravar(c, { estado: 'pendente', desfazDe: c.ultimoEvento.id }, { title: 'Validação desfeita.', description: 'O critério voltou a pendente. O registro anterior foi mantido.', type: 'info' });
  };
  const cobrar = (c: CriterioValidacao) => {
    onFechar();
    onCobrarDocumento(inscrito, c.id);
  };

  const dentro = inscrito.posicao <= inscrito.vagasDoPar;
  const confirmados = inscrito.criterios.filter((c) => c.estado === 'confirmado').length;

  return (
    <div className="grid gap-4">
      {/* topo: quem é, onde mora, onde está na fila */}
      <dl className="grid grid-cols-2 gap-x-3 gap-y-2.5 rounded-2xl border border-line bg-surface-2 px-3.5 py-3 text-[13px]">
        <Fato rotulo="Responsável">
          <span className="font-medium text-ink">{inscrito.responsavel.nome}</span>
          <span className="block text-ink-3">
            {inscrito.responsavel.bairro} · CEP {inscrito.responsavel.cep}
          </span>
        </Fato>
        <Fato rotulo="Inscrição">
          <span className="font-medium text-ink">{new Date(inscrito.criadaEm).toLocaleDateString('pt-BR')}</span>
          <span className="block font-mono text-[12px] text-ink-3">{inscrito.codigo}</span>
        </Fato>
        <Fato rotulo="Fila">
          <span className={cn('font-mono text-[15px] font-semibold tnum', dentro ? 'text-ok' : 'text-ink')}>
            {inscrito.posicao}ª<span className="text-[12px] font-normal text-ink-3"> de {inscrito.vagasDoPar} vagas</span>
          </span>
          <span className="block text-ink-3">
            {rotuloPar(inscrito.grupamento, inscrito.horario)} · {dentro ? 'dentro das vagas' : 'fora das vagas'}
          </span>
        </Fato>
        <Fato rotulo="Opção">
          <OpcaoTag opcao={inscrito.opcao} aceitaRealocacao={inscrito.aceitaRealocacao} />
          <span className="block text-ink-3">{inscrito.aceitaRealocacao ? 'aceita vaga em qualquer opção' : 'só na ordem escolhida'}</span>
        </Fato>
        <Fato rotulo="Pontos" className="col-span-2">
          <span className="font-mono text-[15px] font-semibold text-ink tnum">{inscrito.pontosConfirmados}</span>
          <span className="text-ink-3"> confirmados de </span>
          <span className="font-mono text-ink-2 tnum">{inscrito.pontosDeclarados}</span>
          <span className="text-ink-3"> declarados · </span>
          <span className="text-ink-3 tnum">
            {confirmados} de {inscrito.criterios.length} critério(s)
          </span>
        </Fato>
      </dl>

      {inscrito.criterios.length === 0 ? (
        <Aviso tipo="info" titulo="Sem critério declarado — nada a validar">
          A família não marcou nenhuma situação de prioridade. A posição na fila segue só pela data da inscrição.
        </Aviso>
      ) : (
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-3">Critérios declarados · o diretor confirma cada um</p>
          <ol className="grid gap-3">
            {inscrito.criterios.map((c) => (
              <BlocoCriterio
                key={c.id}
                c={c}
                ocupado={ocupado === c.id}
                bloqueado={ocupado !== null}
                onConfirmar={() => (confirmaDireto(c) ? confirmar(c) : setDialogo({ tipo: 'confirmar', criterio: c }))}
                onRecusar={() => setDialogo({ tipo: 'recusar', criterio: c })}
                onDesfazer={() => desfazer(c)}
                onCobrar={() => cobrar(c)}
              />
            ))}
          </ol>
        </div>
      )}

      {dialogo?.tipo === 'confirmar' ? <DialogoConfirmar key={dialogo.criterio.id} criterio={dialogo.criterio} ocupado={ocupado !== null} onFechar={() => setDialogo(null)} onConfirmar={(obs) => confirmar(dialogo.criterio, obs)} /> : null}
      {dialogo?.tipo === 'recusar' ? <DialogoRecusar key={dialogo.criterio.id} criterio={dialogo.criterio} ocupado={ocupado !== null} onFechar={() => setDialogo(null)} onRecusar={(m, obs) => recusar(dialogo.criterio, m, obs)} /> : null}
    </div>
  );
}

function Fato({ rotulo, children, className }: { rotulo: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn('min-w-0', className)}>
      <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-3">{rotulo}</dt>
      <dd className="mt-0.5 leading-snug">{children}</dd>
    </div>
  );
}

/* ---------- um critério ---------- */

function BlocoCriterio({ c, ocupado, bloqueado, onConfirmar, onRecusar, onDesfazer, onCobrar }: { c: CriterioValidacao; ocupado: boolean; bloqueado: boolean; onConfirmar: () => void; onRecusar: () => void; onDesfazer: () => void; onCobrar: () => void }) {
  const ev = c.evidencia;
  const direto = confirmaDireto(c);
  const desfazivel = podeDesfazer(c.ultimoEvento);
  const limite = c.ultimoEvento ? new Date(c.ultimoEvento.em).getTime() + JANELA_DESFAZER_MS : 0;

  return (
    <li className={cn('rounded-2xl border bg-surface p-3.5 shadow-e1', c.estado === 'confirmado' ? 'border-ok/30' : c.estado === 'recusado' ? 'border-danger/30' : 'border-line')} aria-busy={ocupado}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-3">{c.titulo}</p>
          <p className="text-[14px] font-semibold leading-snug text-ink">{c.pergunta}</p>
        </div>
        <span className="shrink-0 rounded-md bg-brand-soft px-1.5 py-0.5 font-mono text-[12px] font-medium text-brand tnum">+{c.pontos} pts</span>
      </div>

      <dl className="mt-3 grid gap-2.5 text-[13px]">
        <Linha rotulo="Resposta">
          <span className="font-semibold text-ink">Sim</span>
          <span className="text-ink-3"> — declarado pela família</span>
        </Linha>
        <Linha rotulo="Evidência">
          <div className="flex flex-wrap items-center gap-1.5">
            <PilulaEvidencia tipo={ev.tipo} />
            <span className="text-ink-2">{ev.texto}</span>
          </div>
          {ev.analise ? <Analise a={ev.analise} /> : null}
          {ev.tipo === 'pre_analise' || ev.tipo === 'documento' ? <DocumentoVisual analise={ev.analise} documento={c.documento} /> : null}
          {ev.tipo === 'documento' ? <p className="mt-1 text-ink-3">Documento esperado: {c.documento}.</p> : null}
        </Linha>
        <Linha rotulo="Estado">
          <div className="flex flex-wrap items-center gap-1.5">
            <PilulaEstado estado={c.estado} />
            {c.ultimoEvento ? <span className="text-ink-3">{descreverEvento(c.ultimoEvento)}</span> : <span className="text-ink-3">aguardando a direção</span>}
          </div>
          {c.ultimoEvento?.motivo ? <p className="mt-1 text-ink-2">Motivo: {MOTIVO_LABEL[c.ultimoEvento.motivo]}</p> : null}
          {c.ultimoEvento?.observacao ? <p className="mt-0.5 text-ink-2">Observação: {c.ultimoEvento.observacao}</p> : null}
        </Linha>
      </dl>

      <div className="mt-3 flex flex-wrap gap-2">
        {c.estado === 'pendente' ? (
          <>
            <Button size="lg" className="max-lg:h-11" loading={ocupado} disabled={bloqueado} onClick={onConfirmar} title={direto ? 'Confirma em um clique: a evidência já veio pronta' : 'Abre a confirmação: exige ter visto o documento original'}>
              <Check />
              {direto ? 'Confirmar' : 'Confirmar…'}
            </Button>
            <Button size="lg" variant="destructive-outline" className="max-lg:h-11" disabled={bloqueado} onClick={onRecusar}>
              <X />
              Recusar…
            </Button>
            {ev.tipo === 'documento' ? (
              <Button size="lg" variant="outline" className="max-lg:h-11" disabled={bloqueado} onClick={onCobrar}>
                <MessageSquareWarning />
                Cobrar documento
              </Button>
            ) : null}
          </>
        ) : desfazivel ? (
          <Button size="lg" variant="outline" className="max-lg:h-11" loading={ocupado} disabled={bloqueado} onClick={onDesfazer}>
            <RotateCcw />
            Desfazer
            <span className="text-[12px] font-normal text-ink-3">até {horaBr(limite)}</span>
          </Button>
        ) : (
          <p className="text-[12px] leading-snug text-ink-3">Registrado com autor e horário. O prazo de 15 minutos para desfazer terminou.</p>
        )}
      </div>
    </li>
  );
}

function Linha({ rotulo, children }: { rotulo: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[76px_1fr] gap-x-2">
      <dt className="pt-0.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-3">{rotulo}</dt>
      <dd className="min-w-0 leading-snug">{children}</dd>
    </div>
  );
}

/** Pré-análise da foto enviada pelo app: status, explicação e o que a IA leu (mesma tabela que a família vê). */
function Analise({ a }: { a: DocumentoAnalise }) {
  const s = ANALISE[a.status];
  const campos = Object.entries(a.camposLidos);
  return (
    <div className="mt-2 grid gap-1.5 rounded-xl border border-line bg-surface-2 p-2.5">
      <div className="flex flex-wrap items-center gap-1.5">
        <Pilula tom={s.tom}>{s.rotulo}</Pilula>
        <span className="text-[12px] text-ink-3">analisado em {dataHoraBr(a.analisadoEm)}</span>
      </div>
      {a.motivo ? <p className="text-[13px] leading-snug text-ink-2">{a.motivo}</p> : null}
      {campos.length > 0 ? (
        <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 rounded-lg bg-surface px-2.5 py-2 text-[13px]">
          {campos.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="text-ink-3">{k}</dt>
              <dd className="font-medium text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      <p className="text-[12px] leading-snug text-ink-3">A IA só leu a foto. Quem confirma é a direção.</p>
    </div>
  );
}

/* ---------- diálogos ---------- */

function ResumoCriterio({ c }: { c: CriterioValidacao }) {
  return (
    <div className="rounded-xl border border-line bg-surface-2 px-3 py-2.5 text-[13px]">
      <div className="flex items-start justify-between gap-2">
        <p className="font-semibold leading-snug text-ink">{c.pergunta}</p>
        <span className="shrink-0 font-mono text-[12px] font-medium text-brand tnum">+{c.pontos} pts</span>
      </div>
      <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
        <PilulaEvidencia tipo={c.evidencia.tipo} />
        <span className="text-ink-2">{c.evidencia.texto}</span>
      </div>
    </div>
  );
}

function DialogoConfirmar({ criterio, ocupado, onFechar, onConfirmar }: { criterio: CriterioValidacao; ocupado: boolean; onFechar: () => void; onConfirmar: (observacao: string) => void }) {
  const [vi, setVi] = useState(false);
  const [obs, setObs] = useState('');
  const revisar = criterio.evidencia.tipo === 'pre_analise';
  return (
    <Dialog open onOpenChange={(o) => !o && onFechar()}>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>Confirmar critério</DialogTitle>
          <DialogDescription>{revisar ? 'A pré-análise pediu conferência do original. Confirme só depois de ver o documento.' : 'Não há registro em base para este critério. A confirmação exige ver o documento original.'}</DialogDescription>
        </DialogHeader>
        <DialogPanel className="grid gap-3">
          <ResumoCriterio c={criterio} />
          <label className="flex min-h-11 cursor-pointer items-start gap-3 rounded-xl border border-line-2 px-3 py-2.5">
            <Checkbox className="mt-0.5" checked={vi} onCheckedChange={(v) => setVi(Boolean(v))} />
            <span className="flex flex-col">
              <span className="text-[14px] font-semibold text-ink">Vi o documento original</span>
              <span className="text-[12px] leading-snug text-ink-3">{criterio.documento}</span>
            </span>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[14px] font-semibold text-ink">
              Observação <span className="text-[12px] font-medium text-ink-3">opcional</span>
            </span>
            <Textarea value={obs} onChange={(e) => setObs(e.target.value)} placeholder="Ex.: laudo de 2025, apresentado pela avó" maxLength={280} />
          </label>
        </DialogPanel>
        <DialogFooter>
          <Button size="lg" variant="ghost" className="max-lg:h-11" onClick={onFechar} disabled={ocupado}>
            Cancelar
          </Button>
          <Button size="lg" className="max-lg:h-11" disabled={!vi} loading={ocupado} onClick={() => onConfirmar(obs)}>
            <Check />
            Confirmar critério
          </Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}

function DialogoRecusar({ criterio, ocupado, onFechar, onRecusar }: { criterio: CriterioValidacao; ocupado: boolean; onFechar: () => void; onRecusar: (motivo: MotivoRecusa, observacao: string) => void }) {
  const [motivo, setMotivo] = useState<MotivoRecusa | null>(null);
  const [obs, setObs] = useState('');
  const precisaTexto = motivo === 'outro';
  const pronto = motivo !== null && (!precisaTexto || obs.trim().length > 0);
  return (
    <Dialog open onOpenChange={(o) => !o && onFechar()}>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>Recusar critério</DialogTitle>
          <DialogDescription>Recusa sem motivo não existe: é o que permite a família contestar e a CRE auditar. O critério sai da pontuação.</DialogDescription>
        </DialogHeader>
        <DialogPanel className="grid gap-3">
          <ResumoCriterio c={criterio} />
          <RadioGroup aria-label="Motivo da recusa" value={motivo ?? ''} onValueChange={(v) => setMotivo(String(v) as MotivoRecusa)} className="gap-2">
            {MOTIVOS_RECUSA.map((m) => {
              const ativo = motivo === m.id;
              return (
                <label key={m.id} className={cn('flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border px-3 py-2 text-[14px] font-medium transition-colors', ativo ? 'border-brand bg-brand-soft text-brand' : 'border-line-2 bg-surface text-ink hover:border-line-3')}>
                  <Radio value={m.id} />
                  {m.rotulo}
                </label>
              );
            })}
          </RadioGroup>
          <label className="flex flex-col gap-1.5">
            <span className="text-[14px] font-semibold text-ink">
              {precisaTexto ? 'Descreva o motivo' : 'Observação'} {precisaTexto ? null : <span className="text-[12px] font-medium text-ink-3">opcional</span>}
            </span>
            <Textarea value={obs} onChange={(e) => setObs(e.target.value)} placeholder={precisaTexto ? 'Obrigatório quando o motivo é "outro"' : 'Ex.: documento em nome de outra pessoa'} maxLength={280} aria-invalid={precisaTexto && obs.trim().length === 0 ? true : undefined} />
          </label>
        </DialogPanel>
        <DialogFooter>
          <Button size="lg" variant="ghost" className="max-lg:h-11" onClick={onFechar} disabled={ocupado}>
            Cancelar
          </Button>
          <Button size="lg" variant="destructive" className="max-lg:h-11" disabled={!pronto} loading={ocupado} onClick={() => motivo && onRecusar(motivo, obs)}>
            <X />
            Recusar critério
          </Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}

/* ---------- documento: miniatura/placeholder e visualização ---------- */

/**
 * Toda confirmação que depende de documento mostra a foto enviada pelo app
 * (miniatura guardada com a inscrição) ou um placeholder quando ainda não há
 * foto. "Ver documento" abre em tamanho maior, com o que a pré-análise leu —
 * é o que a direção usa para resolver um problema sem chamar a família.
 */
function DocumentoVisual({ analise, documento }: { analise: DocumentoAnalise | undefined; documento: string }) {
  const [aberto, setAberto] = useState(false);
  const temFoto = Boolean(analise?.miniatura);
  const enviada = Boolean(analise);
  return (
    <div className="mt-2 flex items-center gap-3 rounded-xl border border-dashed border-line-2 bg-surface p-2">
      <button
        type="button"
        onClick={() => setAberto(true)}
        className="relative grid h-16 w-20 shrink-0 place-items-center overflow-hidden rounded-lg bg-surface-2 text-ink-3 hover:ring-2 hover:ring-brand-soft-2"
        aria-label={temFoto ? 'Ver a foto do documento' : 'Ver detalhes do documento'}
      >
        {temFoto ? <img src={analise!.miniatura} alt={`Foto: ${documento}`} className="h-full w-full object-cover" /> : enviada ? <FileImage className="size-7" /> : <ImageOff className="size-7" />}
      </button>
      <div className="min-w-0 flex-1 text-[12px] leading-snug">
        <p className="font-semibold text-ink">{documento}</p>
        <p className="text-ink-3">{temFoto ? `Foto enviada pelo app${analise?.nomeArquivo ? ` · ${analise.nomeArquivo}` : ''}` : enviada ? 'Foto enviada pelo app · miniatura indisponível nesta inscrição de demonstração' : 'Sem foto ainda — a família pode enviar pelo app ou trazer o original'}</p>
      </div>
      <Button size="sm" variant="outline" className="h-9 shrink-0" onClick={() => setAberto(true)}>
        <Eye />
        Ver
      </Button>
      {aberto ? (
        <Dialog open onOpenChange={(o) => !o && setAberto(false)}>
          <DialogPopup className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>{documento}</DialogTitle>
              <DialogDescription>{temFoto ? 'Foto enviada pela família pelo app. O original continua obrigatório na matrícula.' : enviada ? 'A família enviou a foto pelo app; nesta demonstração a imagem não está disponível.' : 'Ainda não há foto deste documento. Use “Cobrar documento” ou confira o original na unidade.'}</DialogDescription>
            </DialogHeader>
            <DialogPanel className="grid gap-3">
              <div className="grid min-h-[240px] place-items-center overflow-hidden rounded-xl bg-surface-2">
                {temFoto ? <img src={analise!.miniatura} alt={`Foto: ${documento}`} className="max-h-[60vh] w-auto max-w-full object-contain" /> : <div className="flex flex-col items-center gap-2 p-6 text-ink-3">{enviada ? <FileImage className="size-12" /> : <ImageOff className="size-12" />}<span className="text-[13px]">{enviada ? 'imagem indisponível' : 'sem foto'}</span></div>}
              </div>
              {analise && Object.keys(analise.camposLidos).length > 0 ? (
                <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 rounded-lg bg-surface-2 px-3 py-2 text-[13px]">
                  {Object.entries(analise.camposLidos).map(([k, v]) => (
                    <div key={k} className="contents">
                      <dt className="text-ink-3">{k}</dt>
                      <dd className="font-medium text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              {analise?.motivo ? <p className="text-[13px] leading-snug text-ink-2">{analise.motivo}</p> : null}
            </DialogPanel>
            <DialogFooter>
              <Button size="lg" variant="outline" className="max-lg:h-11" onClick={() => setAberto(false)}>
                Fechar
              </Button>
            </DialogFooter>
          </DialogPopup>
        </Dialog>
      ) : null}
    </div>
  );
}
