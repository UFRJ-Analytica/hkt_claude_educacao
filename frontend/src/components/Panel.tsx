import type { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

/**
 * O cartão de conteúdo do produto, sobre o `Card` do coss.
 *
 * `.panel` continua sendo a fonte da verdade visual — fundo, borda de 1px,
 * raio de 7px, sombra e1 e o padding 18/20 — e ganha do Card por estar fora de
 * `@layer`. Sobram do coss duas coisas que o legado não declara e que foram
 * desligadas: o `flex-col` (o painel é fluxo de bloco; empilhar como flex muda
 * como as margens dos filhos se comportam) e o pseudo `::before`, que desenha
 * uma linha de luz interna que este produto não usa.
 */
export function Panel({
  children,
  title,
  description,
  className,
}: {
  children?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn('panel block before:hidden', className)} render={<section />}>
      {title ? <h4>{title}</h4> : null}
      {description ? <p className="sub">{description}</p> : null}
      {children}
    </Card>
  );
}

/**
 * O respiro da página: padding em clamp e largura máxima de 1240px. Não é um
 * container genérico — é o gabarito de leitura, e por isso é componente e não
 * uma classe repetida em nove telas.
 */
export function Pad({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('pad', className)}>{children}</div>;
}
