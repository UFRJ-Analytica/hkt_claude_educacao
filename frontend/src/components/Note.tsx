import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * A letra miúda do produto. Não é decoração: é onde o Pulso admite o que não
 * sabe. Manter esta família junta é o que impede cada tela de inventar um
 * tom próprio para dizer "isto aqui é derivado, não medido".
 */

/**
 * Legenda genérica. Renderiza `<div>`, não `<p>`, de propósito: `legacy.css`
 * não está em camada e sua regra `p { margin: 0 }` mataria qualquer margem
 * vinda de utilitário. Com `div`, quem chama controla o respiro com `mt-*`
 * normal, sem `!`.
 */
export function Note({
  children,
  mono,
  className,
}: {
  children: ReactNode;
  mono?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'text-[11.5px] leading-[1.55] text-ink-3',
        mono && 'font-mono tabular-nums',
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * A divulgação de derivação — o aviso âmbar de que o número foi montado no
 * cliente porque o endpoint governado ainda não existe.
 *
 * `inline` é o bloco dentro da página; `bar` é a faixa de largura total logo
 * abaixo da barra de filtros; `governed` é a mesma faixa quando quem derivou
 * foi o backend, e aí a cor migra do âmbar para o acento, porque a mensagem
 * deixa de ser uma ressalva e passa a ser uma procedência.
 */
export function DerivedNote({
  children,
  variant = 'inline',
  className,
}: {
  children: ReactNode;
  variant?: 'inline' | 'bar' | 'governed';
  className?: string;
}) {
  return (
    <div
      className={cn(
        variant === 'inline' ? 'derivedinline' : 'derived',
        variant === 'governed' && 'governed',
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Rodapé de contagens: uma fileira de `<span>` mono no pé da página. */
export function Footnote({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('footnote', className)}>{children}</div>;
}

/** Trecho mono no meio da frase — nome de endpoint, coluna, identificador. */
export function Mono({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn('mono', className)}>{children}</span>;
}
