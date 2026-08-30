import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * O rótulo de seção: mono, caixa alta, entreletra aberta. Era um `style`
 * inline de sete propriedades repetido em cada painel.
 *
 * Os dois `!` não são preguiça. `legacy.css` não está dentro de `@layer`, e
 * declaração sem camada ganha de qualquer utilitário Tailwind — inclusive da
 * regra global `h1..h5 { font-weight: 600; letter-spacing: -0.028em }`. Só o
 * peso e a entreletra colidem; o resto passa limpo. Pelo mesmo motivo, quem
 * precisar de margem aqui tem de pedir com `!` (`className="mt-[26px]!"`).
 */
export function SectionHeading({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h5
      className={cn(
        'font-mono text-[9.5px] font-medium! uppercase tracking-[0.13em]! text-ink-3',
        className,
      )}
    >
      {children}
    </h5>
  );
}
