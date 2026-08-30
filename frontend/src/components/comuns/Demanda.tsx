import type { Demanda } from '@/api/types';
import { DEMANDA_CLASS, DEMANDA_LABEL } from '@/domain/demanda';
import { cn } from '@/lib/utils';

export function DemandaTag({ demanda, className, curta = false }: { demanda: Demanda; className?: string; curta?: boolean }) {
  return (
    <span className={cn('inline-flex h-6 items-center gap-1 rounded-md px-1.5 text-[12px] font-semibold', DEMANDA_CLASS[demanda], className)}>
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {curta ? DEMANDA_LABEL[demanda].replace('Demanda ', '') : DEMANDA_LABEL[demanda]}
    </span>
  );
}
