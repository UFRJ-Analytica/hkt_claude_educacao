import type { ReactNode } from 'react';
import { Empty } from '@/components/ui/empty';
import { cn } from '@/lib/utils';

/**
 * A casca de `.statepage`: a tela que aparece quando não há o que mostrar.
 *
 * Neste produto ela é de primeira classe — explica por que o dado não está
 * aqui em vez de devolver um erro genérico ou, pior, um número plausível. Duas
 * telas a usam com conteúdo próprio (identificador fora do recorte, em Escola;
 * unidade fora da ADR, em Recomposição) e uma terceira, `CapabilityState`,
 * preenche o mesmo molde a partir do status de uma capacidade.
 *
 * `CapabilityState` (em `States.tsx`) é hoje uma cópia desta estrutura com a
 * cópia de texto embutida. Ela pode passar a ser `<EmptyState>` com `badge`
 * recebendo a `<CapabilityTag>` — o markup resultante é idêntico ao atual.
 *
 * Sobre o `Empty` do coss, virado de cartaz centralizado para bloco de leitura
 * à esquerda: o texto é longo e argumentativo. `.statepage` continua governando
 * padding, medida de 62ch e a tipografia dos filhos — por isso `h2`, `p` e `ul`
 * seguem sendo elementos de verdade, e não `EmptyTitle`/`EmptyDescription`, que
 * renderizam `div` e escapariam dos seletores do legado.
 */
const NEUTRALIZE = 'block flex-none items-start justify-start gap-0 text-left text-wrap';

export function EmptyState({
  eyebrow,
  badge,
  title,
  body,
  items,
  action,
  className,
}: {
  /** O nome da tela, em mono e caixa alta. */
  eyebrow: ReactNode;
  /** Uma `<CapabilityTag>` ao lado do rótulo, quando o estado tem status. */
  badge?: ReactNode;
  title: ReactNode;
  body: ReactNode;
  /** Limitações declaradas, uma por linha, com régua entre elas. */
  items?: string[];
  /** Saída da tela — normalmente um `.btn`. Sem invólucro: `.statepage` não
   *  tem slot de rodapé, e inventar um mudaria o respiro. */
  action?: ReactNode;
  className?: string;
}) {
  return (
    <Empty className={cn('statepage', NEUTRALIZE, className)}>
      {eyebrow || badge ? (
        <div className="k">
          {eyebrow}
          {badge ? <> · {badge}</> : null}
        </div>
      ) : null}
      <h2>{title}</h2>
      {body ? <p>{body}</p> : null}
      {items?.length ? (
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {action}
    </Empty>
  );
}
