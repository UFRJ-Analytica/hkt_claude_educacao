import { useId, type ReactNode } from 'react';
import { Input, type InputProps } from '@/components/ui/input';
import { cn } from '@/lib/utils';

/**
 * Campo de formulário do produto: rótulo grande, dica, erro ao lado do campo
 * (nunca só no topo) e `aria-invalid` sincronizado. Usa o Input do coss.
 */
export function Campo({
  label,
  dica,
  erro,
  opcional = false,
  children,
  className,
  id: idProp,
}: {
  label: ReactNode;
  dica?: ReactNode;
  erro?: string | null;
  opcional?: boolean;
  children: (props: { id: string; 'aria-invalid': boolean | undefined; 'aria-describedby': string | undefined }) => ReactNode;
  className?: string;
  id?: string;
}) {
  const gen = useId();
  const id = idProp ?? gen;
  const descId = `${id}-desc`;
  const errId = `${id}-err`;
  return (
    <div className={cn('flex min-w-0 flex-col gap-1.5', className)}>
      <label htmlFor={id} className="flex items-baseline gap-2 text-[15px] font-semibold text-ink">
        {label}
        {opcional ? <span className="text-xs font-medium text-ink-3">opcional</span> : null}
      </label>
      {children({ id, 'aria-invalid': erro ? true : undefined, 'aria-describedby': erro ? errId : dica ? descId : undefined })}
      {erro ? (
        <p id={errId} className="text-[13px] font-medium text-danger" role="alert">
          {erro}
        </p>
      ) : dica ? (
        <p id={descId} className="text-[13px] text-ink-3">
          {dica}
        </p>
      ) : null}
    </div>
  );
}

export function CampoTexto({
  label,
  dica,
  erro,
  opcional,
  className,
  ...input
}: { label: ReactNode; dica?: ReactNode; erro?: string | null; opcional?: boolean; className?: string } & Omit<InputProps, 'size'>) {
  return (
    <Campo label={label} dica={dica} erro={erro} opcional={opcional} className={className}>
      {(a) => <Input size="lg" {...a} {...input} />}
    </Campo>
  );
}
