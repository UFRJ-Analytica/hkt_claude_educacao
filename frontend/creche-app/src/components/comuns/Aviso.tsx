import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

const ESTILO = {
  info: 'border-brand-soft-2 bg-brand-soft text-brand',
  ok: 'border-ok/25 bg-ok-soft text-ok',
  warn: 'border-warn/25 bg-warn-soft text-warn',
  danger: 'border-danger/25 bg-danger-soft text-danger',
} as const;
const ICONE = { info: Info, ok: CheckCircle2, warn: AlertTriangle, danger: XCircle } as const;

export function Aviso({ tipo = 'info', titulo, children, className }: { tipo?: keyof typeof ESTILO; titulo?: ReactNode; children?: ReactNode; className?: string }) {
  const I = ICONE[tipo];
  return (
    <div className={cn('flex gap-2.5 rounded-xl border px-3.5 py-3 text-[14px] leading-snug', ESTILO[tipo], className)} role={tipo === 'danger' ? 'alert' : 'status'}>
      <I className="mt-0.5 size-4.5 shrink-0" aria-hidden="true" />
      <div className="min-w-0 text-ink">
        {titulo ? <p className="font-semibold">{titulo}</p> : null}
        {children ? <div className={cn('text-ink-2', titulo && 'mt-0.5')}>{children}</div> : null}
      </div>
    </div>
  );
}
