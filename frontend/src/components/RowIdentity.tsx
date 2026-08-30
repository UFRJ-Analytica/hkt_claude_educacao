import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

/**
 * A célula de identidade que abre a linha de uma tabela (`.creid`).
 *
 * Duas linhas: o nome do recorte e, embaixo do mesmo baseline, a contagem que
 * o qualifica ("38 un", "412 matr."). É sempre um alvo — ou aprofunda a
 * hierarquia no lugar (CRE abre suas escolas) ou navega para a unidade.
 *
 * O triângulo de revelação estava copiado em duas telas com regras
 * ligeiramente diferentes: Comparar alterna ▸/▾, Recomposição só marca ▸
 * quando há para onde descer. As duas cabem numa regra só, e ela vive aqui:
 *
 *   - `expanded` definido  → alternância ▸/▾, e `aria-expanded` junto;
 *   - `expanded` ausente + `drillable` → ▸ fixo, "há um nível abaixo";
 *   - nenhum dos dois → sem marcador (o caso do link para a escola).
 *
 * O `aria-expanded` é dívida sendo paga: hoje o triângulo é só desenho, e
 * quem usa leitor de tela não tem como saber que a linha abre. O glifo entra
 * marcado como decoração para não ser lido duas vezes.
 *
 * Elemento nativo, não `Button` do coss, e a razão é geométrica: `.creid` é
 * `display:flex` com `align-items:baseline`, enquanto o `Button` nasce
 * `inline-flex justify-center` com raio, anel de foco e `whitespace-nowrap`
 * próprios. Metade disso o reset legado de `button` já anula; a outra metade
 * exigiria desfazer utilitária por utilitária — o guia do coss chama isso de
 * lutar contra a variante. O reset legado (`font: inherit; border: 0;
 * padding: 0`) já entrega um botão neutro, e `.creid` faz o resto.
 */
export function RowIdentity({
  title,
  sub,
  as = 'button',
  to,
  onClick,
  expanded,
  drillable,
  className,
}: {
  title: ReactNode;
  sub?: ReactNode;
  as?: 'button' | 'link';
  /** Destino do router. Obrigatório quando `as="link"`. */
  to?: string;
  onClick?: () => void;
  /** Estado de revelação. Definido, vira alternância e `aria-expanded`. */
  expanded?: boolean;
  /** Há um nível abaixo, mas ele não abre aqui — abre navegando. */
  drillable?: boolean;
  className?: string;
}) {
  const marker = expanded === undefined ? (drillable ? '▸' : null) : expanded ? '▾' : '▸';

  const body = (
    <>
      <b>{title}</b>
      {sub != null || marker ? (
        <span>
          {marker ? <span aria-hidden="true">{marker} </span> : null}
          {sub}
        </span>
      ) : null}
    </>
  );

  if (as === 'link') {
    return (
      <Link className={cn('creid', className)} to={to ?? '#'}>
        {body}
      </Link>
    );
  }

  return (
    <button aria-expanded={expanded} className={cn('creid', className)} onClick={onClick} type="button">
      {body}
    </button>
  );
}
