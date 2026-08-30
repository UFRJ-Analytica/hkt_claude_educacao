import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Coluna de leitura: 100% no celular, 560px centrada no desktop. */
export function Page({ children, className, comRodape = false, largo = false }: { children: ReactNode; className?: string; comRodape?: boolean; largo?: boolean }) {
  return (
    <main className={cn('step-in mx-auto w-full px-[var(--pad-x)] pt-5', largo ? 'max-w-[1100px]' : 'max-w-page', comRodape ? 'pb-[calc(var(--bottombar-h)+48px)]' : 'pb-12', className)}>
      {children}
    </main>
  );
}

export function PageTitle({ eyebrow, children, sub }: { eyebrow?: string; children: ReactNode; sub?: ReactNode }) {
  return (
    <div className="mb-5">
      {eyebrow ? <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-3">{eyebrow}</p> : null}
      <h1 className="text-[26px] font-bold leading-[1.15] tracking-tight text-ink">{children}</h1>
      {sub ? <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{sub}</p> : null}
    </div>
  );
}

export function Section({ title, children, className, id }: { title?: ReactNode; children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={cn('mb-4 min-w-0 rounded-2xl border border-line bg-surface p-4 shadow-e1 [&>*]:min-w-0', className)}>
      {title ? <h2 className="mb-3 text-[15px] font-semibold text-ink">{title}</h2> : null}
      {children}
    </section>
  );
}
