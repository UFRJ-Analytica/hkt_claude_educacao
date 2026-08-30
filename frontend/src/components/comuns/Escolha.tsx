import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Cartões de escolha exclusiva com alvo grande (≥ 48px) — a versão
 * "de polegar" do radio. Semântica de radiogroup mantida.
 */
export function Escolha<T extends string>({
  label,
  valor,
  onChange,
  opcoes,
  colunas = 2,
  erro,
}: {
  label: ReactNode;
  valor: T | null;
  onChange: (v: T) => void;
  opcoes: Array<{ valor: T; rotulo: ReactNode; descricao?: ReactNode; icone?: ReactNode }>;
  colunas?: 1 | 2 | 3;
  erro?: string | null;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-2" role="radiogroup" aria-label={typeof label === 'string' ? label : undefined}>
      <span className="text-[15px] font-semibold text-ink">{label}</span>
      <div className={cn('grid gap-2', colunas === 1 && 'grid-cols-1', colunas === 2 && 'grid-cols-2', colunas === 3 && 'grid-cols-3')}>
        {opcoes.map((o) => {
          const ativo = valor === o.valor;
          return (
            <button
              key={o.valor}
              type="button"
              role="radio"
              aria-checked={ativo}
              onClick={() => onChange(o.valor)}
              className={cn(
                'flex min-h-12 items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left transition-[background-color,border-color,box-shadow] duration-150',
                ativo ? 'border-brand bg-brand-soft text-brand shadow-[inset_0_0_0_1px_var(--brand)]' : 'border-line-2 bg-surface text-ink hover:border-line-3',
              )}
            >
              {o.icone ? <span className={cn('shrink-0', ativo ? 'text-brand' : 'text-ink-3')}>{o.icone}</span> : null}
              <span className="flex min-w-0 flex-col">
                <span className="text-[15px] font-semibold leading-tight">{o.rotulo}</span>
                {o.descricao ? <span className={cn('text-[12px] leading-snug', ativo ? 'text-brand-2' : 'text-ink-3')}>{o.descricao}</span> : null}
              </span>
            </button>
          );
        })}
      </div>
      {erro ? (
        <p className="text-[13px] font-medium text-danger" role="alert">
          {erro}
        </p>
      ) : null}
    </div>
  );
}

/** Sim / Não com a pergunta em cima. */
export function SimNao({ pergunta, explicacao, valor, onChange }: { pergunta: ReactNode; explicacao?: ReactNode; valor: boolean | undefined; onChange: (v: boolean) => void }) {
  return (
    <div className="flex flex-col gap-2 py-3">
      <div>
        <p className="text-[15px] font-semibold leading-snug text-ink">{pergunta}</p>
        {explicacao ? <p className="mt-0.5 text-[13px] leading-snug text-ink-3">{explicacao}</p> : null}
      </div>
      <div className="grid grid-cols-2 gap-2" role="radiogroup">
        {[
          { v: true, t: 'Sim' },
          { v: false, t: 'Não' },
        ].map((o) => {
          const ativo = valor === o.v;
          return (
            <button
              key={o.t}
              type="button"
              role="radio"
              aria-checked={ativo}
              onClick={() => onChange(o.v)}
              className={cn(
                'min-h-11 rounded-xl border text-[15px] font-semibold transition-colors',
                ativo ? 'border-brand bg-brand text-brand-ink' : 'border-line-2 bg-surface text-ink hover:border-line-3',
              )}
            >
              {o.t}
            </button>
          );
        })}
      </div>
    </div>
  );
}
