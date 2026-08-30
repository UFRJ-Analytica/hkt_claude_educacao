import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type GateState = 'ok' | 'blocked' | 'warn';

/**
 * Um portão de prontidão: a lista do que precisa estar resolvido antes de um
 * arquivo virar dado consultável.
 *
 * Os três estados não são um semáforo de gosto. `blocked` é veto — nada
 * atravessa; `warn` é ressalva declarada, o dado passa e a limitação viaja
 * junto; `ok` é o único que não pede leitura. O glifo carrega a distinção
 * junto com a cor, porque cor sozinha não é sinal acessível.
 */
const MARK: Record<GateState, { cls: string; glyph: string; label: string }> = {
  ok: { cls: 'y', glyph: '✓', label: 'atendido' },
  blocked: { cls: 'n', glyph: '!', label: 'bloqueado' },
  warn: { cls: 'w', glyph: '~', label: 'com ressalva' },
};

export function Gate({
  state,
  title,
  detail,
  className,
}: {
  state: GateState;
  title: ReactNode;
  detail?: ReactNode;
  className?: string;
}) {
  const mark = MARK[state];
  return (
    <div className={cn('gate', className)}>
      <span aria-label={mark.label} className={`ic ${mark.cls}`} role="img">
        {mark.glyph}
      </span>
      <div>
        <b>{title}</b>
        {detail ? <span>{detail}</span> : null}
      </div>
    </div>
  );
}
