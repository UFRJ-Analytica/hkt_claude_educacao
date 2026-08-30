import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * A linha de lista — a forma mais repetida do produto.
 *
 * Treze classes legadas (`.emptyrow`, `.selrow`, `.cmprow`, `.gaprow`,
 * `.turmacell`, `.srcrow`, `.capline`, `.crerow`, `.typerow`, `.results
 * button`, `.cop-item`, `.gate`) descrevem a MESMA leitura: um nome à
 * esquerda, uma medida no meio, um número à direita, às vezes um ícone antes
 * e uma legenda embaixo. O que difere entre elas é grade e corpo de texto —
 * decisão de densidade, não de estrutura.
 *
 * Então a divisão é esta: `legacy.css` continua dono da GEOMETRIA (colunas,
 * gaps, bordas, tamanhos) e este componente é dono da ESTRUTURA (quais
 * caixas existem, em que ordem, com que semântica). A classe legada chega
 * inteira por `className` e, por estar fora de `@layer`, ganha de toda
 * utilitária que o Tailwind acrescentar aqui. É o que torna a troca
 * pixel-neutra.
 *
 * ## Por que os nomes das caixas chegam por `slots`
 *
 * `.emptyrow .nm`, `.gaprow .gd`, `.crerow .ct` e `.typerow .tt` são a mesma
 * caixa com quatro nomes. Inventar um nome canônico obrigaria a mexer no CSS
 * legado — que está fora do escopo desta migração e é justamente o que
 * garante a fidelidade. `slots` deixa cada tela dizer o nome que sua regra
 * já espera, sem que a estrutura precise saber disso.
 *
 * ## Por que um `<button>` nativo e não o `Button` do coss
 *
 * O guia do coss é explícito em não recompor estilo de botão por fora das
 * variantes — e é exatamente o que seria preciso aqui. `buttonVariants` nasce
 * `inline-flex justify-center whitespace-nowrap` com raio, sombra e anel de
 * foco próprios; `.crerow` é grade, `.cop-item` é flex com `align-items:
 * flex-start` e texto que PRECISA quebrar. `whitespace-nowrap` e
 * `justify-center` não são declarados pelo legado, logo passariam — e
 * quebrariam as duas. O reset legado (`button { font: inherit; border: 0;
 * padding: 0; background: none }`) já entrega o botão neutro que estas linhas
 * assumem; sobrepor o `Button` seria desfazer seis utilitárias para chegar no
 * mesmo lugar.
 *
 * ## `.gate`
 *
 * A forma abaixo comporta o portão de prontidão — `leading` seria o glifo,
 * `layout="stacked"` com `labelAs="b"` daria o par título/detalhe. Não é
 * migrado porque `Gate.tsx` já existe e porque `.gate b` e `.gate span`
 * selecionam por ELEMENTO: o `<span>` de corpo desta linha seria capturado
 * pela regra do detalhe. Duplicar seria pior do que manter os dois.
 */

export type ListRowTone = 'default' | 'muted' | 'attention' | 'critical';

export interface ListRowSlots {
  leading?: string;
  /** Contêiner de `label` + `sub` no layout empilhado (`.cl`, ou nenhum). */
  body?: string;
  label?: string;
  sub?: string;
  trailing?: string;
  meta?: string;
}

const TONE: Record<ListRowTone, string | undefined> = {
  default: undefined,
  muted: 'text-ink-3',
  attention: 'text-attn-2',
  critical: 'text-attn-3',
};

/**
 * Piso de geometria. Todas as treze classes legadas declaram `display`,
 * `align-items` e `gap`, então nenhuma destas utilitárias chega a pintar nas
 * telas de hoje — elas existem para que uma linha nova, sem classe legada,
 * já nasça legível.
 */
const BASE = 'flex w-full items-center gap-[10px] text-left';

export function ListRow({
  as = 'div',
  href,
  onClick,
  leading,
  label,
  sub,
  trailing,
  meta,
  children,
  layout = 'stacked',
  labelAs = 'span',
  slots,
  selected,
  interactive,
  tone = 'default',
  title,
  className,
  style,
}: {
  as?: 'div' | 'button' | 'a';
  href?: string;
  onClick?: () => void;
  /** Ordinal, ícone ou marca que abre a linha (`.ico`, `.cn`, `.ci`). */
  leading?: ReactNode;
  label: ReactNode;
  /** Segunda leitura do mesmo assunto: contagem, unidade, hint. */
  sub?: ReactNode;
  /** A medida — barra, hachura, trio comparativo. */
  trailing?: ReactNode;
  /** O número que fecha a linha à direita. */
  meta?: ReactNode;
  /** Colunas extras da grade, quando a linha tem mais de quatro. */
  children?: ReactNode;
  /**
   * `stacked` embrulha `label` e `sub` numa caixa só (flex de uma coluna);
   * `cells` os emite como células irmãs da grade. É a diferença entre
   * `.crerow` e `.gaprow`, e ela muda a contagem de colunas — por isso é
   * prop e não algo inferido.
   */
  layout?: 'stacked' | 'cells';
  /** `b` para os casos em que a regra legada seleciona o elemento. */
  labelAs?: 'span' | 'b';
  slots?: ListRowSlots;
  /** Linha ativa do filtro. Vira a classe legada `on` e estado ARIA. */
  selected?: boolean;
  interactive?: boolean;
  tone?: ListRowTone;
  title?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const Label = labelAs;
  const labelNode = <Label className={slots?.label}>{label}</Label>;

  const content = (
    <>
      {/* Uma caixa só é embrulhada quando a tela nomeia o slot: `.emptyrow`
          entrega o próprio `<span class="bar">` como filho direto da grade, e
          um invólucro a mais o tiraria da coluna — e da largura. */}
      {leading != null
        ? slots?.leading
          ? <span className={slots.leading}>{leading}</span>
          : leading
        : null}

      {layout === 'stacked' ? (
        <span className={slots?.body}>
          {labelNode}
          {sub != null ? (slots?.sub ? <span className={slots.sub}>{sub}</span> : sub) : null}
        </span>
      ) : (
        <>
          {labelNode}
          {sub != null ? (slots?.sub ? <span className={slots.sub}>{sub}</span> : sub) : null}
        </>
      )}

      {trailing != null
        ? slots?.trailing
          ? <span className={slots.trailing}>{trailing}</span>
          : trailing
        : null}

      {meta != null ? (slots?.meta ? <span className={slots.meta}>{meta}</span> : meta) : null}

      {children}
    </>
  );

  const cls = cn(
    BASE,
    interactive && 'cursor-pointer',
    TONE[tone],
    // `on` é o modificador que `.crerow` e `.typerow` já esperam: seleção
    // pinta em `--accent-soft` porque é ESTADO DA INTERFACE, não dado.
    selected && 'on',
    className,
  );

  if (as === 'button') {
    return (
      <button
        aria-pressed={selected}
        className={cls}
        onClick={onClick}
        style={style}
        title={title}
        type="button"
      >
        {content}
      </button>
    );
  }

  if (as === 'a') {
    return (
      <a
        aria-current={selected ? 'true' : undefined}
        className={cls}
        href={href}
        onClick={onClick}
        style={style}
        title={title}
      >
        {content}
      </a>
    );
  }

  // A linha `div` não recebe `onClick` de propósito: alvo clicável sem
  // elemento nativo é alvo que o teclado não alcança. Linha que responde a
  // clique pede `as="button"`.
  return (
    <div className={cls} style={style} title={title}>
      {content}
    </div>
  );
}
