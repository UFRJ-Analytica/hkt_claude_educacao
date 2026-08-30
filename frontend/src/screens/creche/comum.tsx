import { CheckCircle2, Landmark, Mail, MessageCircle, Phone, Smartphone } from 'lucide-react';
import type { ReactNode } from 'react';
import type { CanalAviso, EstadoValidacao, EvidenciaTipo, Grupamento, Horario, SituacaoChamada } from '@/api/types';
import { CANAL_LABEL, ESTADO_LABEL, EVIDENCIA_LABEL, SITUACAO_LABEL } from '@/domain/validacao';
import { cn } from '@/lib/utils';

/** Peças compartilhadas entre as abas do perfil da creche. */

export function Pilula({ children, tom = 'neutro', className, title }: { children: ReactNode; tom?: 'neutro' | 'brand' | 'ok' | 'warn' | 'danger'; className?: string; title?: string }) {
  const cls = {
    neutro: 'bg-surface-2 text-ink-2 border-line',
    brand: 'bg-brand-soft text-brand border-brand-soft-2',
    ok: 'bg-ok-soft text-ok border-ok/20',
    warn: 'bg-warn-soft text-warn border-warn/20',
    danger: 'bg-danger-soft text-danger border-danger/20',
  }[tom];
  return (
    <span title={title} className={cn('inline-flex h-6 shrink-0 items-center gap-1 rounded-md border px-1.5 text-[12px] font-semibold whitespace-nowrap', cls, className)}>
      {children}
    </span>
  );
}

export function PilulaEvidencia({ tipo }: { tipo: EvidenciaTipo }) {
  const tom = tipo === 'rmi' ? 'brand' : tipo === 'pre_analise' ? 'ok' : tipo === 'base' ? 'brand' : 'warn';
  return (
    <Pilula tom={tom} title={EVIDENCIA_LABEL[tipo].descricao}>
      {EVIDENCIA_LABEL[tipo].pilula}
    </Pilula>
  );
}

export function PilulaEstado({ estado }: { estado: EstadoValidacao }) {
  const tom = estado === 'confirmado' ? 'ok' : estado === 'recusado' ? 'danger' : 'neutro';
  return <Pilula tom={tom}>{ESTADO_LABEL[estado]}</Pilula>;
}

export function PilulaSituacao({ situacao }: { situacao: SituacaoChamada }) {
  const tom = situacao === 'agendado' || situacao === 'falei' ? 'ok' : situacao === 'sem_contato' ? 'danger' : situacao === 'tentando' ? 'warn' : situacao === 'encerrada' ? 'neutro' : 'brand';
  return <Pilula tom={tom}>{SITUACAO_LABEL[situacao]}</Pilula>;
}

const ICONE_CANAL: Record<CanalAviso, typeof Mail> = { app: Smartphone, pix: Landmark, email: Mail, whatsapp: MessageCircle, sms: MessageCircle, ligacao: Phone };

export function IconeCanal({ canal, className }: { canal: CanalAviso; className?: string }) {
  const I = ICONE_CANAL[canal];
  return <I className={cn('size-3.5', className)} aria-label={CANAL_LABEL[canal]} />;
}

/** Barra de progresso de critérios confirmados. */
export function ProgressoCriterios({ confirmados, total, className }: { confirmados: number; total: number; className?: string }) {
  const pct = total === 0 ? 100 : Math.round((confirmados / total) * 100);
  return (
    <div className={cn('flex items-center gap-2', className)} aria-label={`${confirmados} de ${total} critérios confirmados`}>
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-line" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={confirmados}>
        <div className={cn('h-full rounded-full', confirmados === total ? 'bg-ok' : 'bg-brand')} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[12px] text-ink-3 tnum">
        {confirmados} de {total}
      </span>
    </div>
  );
}

export function OpcaoTag({ opcao, aceitaRealocacao }: { opcao: number; aceitaRealocacao: boolean }) {
  return (
    <span className="inline-flex items-center gap-1 text-[12px] text-ink-2" title={aceitaRealocacao ? 'Família aceita vaga em qualquer opção' : 'Família só aceita na ordem escolhida'}>
      <span className={cn('inline-grid size-5 place-items-center rounded-full font-mono text-[11px] font-bold', opcao === 1 ? 'bg-brand text-brand-ink' : 'bg-surface-2 text-ink-2')}>{opcao}ª</span>
      {aceitaRealocacao ? <CheckCircle2 className="size-3.5 text-ok" aria-label="aceita realocação" /> : null}
    </span>
  );
}

export function rotuloPar(g: Grupamento, h: Horario): string {
  return `${g} · ${h}`;
}

export function primeiroNome(nome: string): string {
  return nome.trim().split(/\s+/)[0] ?? nome;
}
