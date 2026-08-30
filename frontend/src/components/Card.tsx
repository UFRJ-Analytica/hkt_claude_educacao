import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card as Surface } from '@/components/ui/card';
import { cn } from '@/lib/utils';

/**
 * O cartão do produto: uma superfície, cinco nomes no CSS legado.
 *
 * `.chartblock`, `.panel`, `.agentcard`, `.aula` e `.mapcard` declaram a mesma
 * receita — fundo `--surface`, borda de 1px em `--line`, raio `--r`, sombra
 * `--sh-1` — e divergem só em padding, elevação e no formato do cabeçalho.
 * Eram cinco blocos de markup repetidos em nove telas; aqui viram uma variante.
 *
 * Sobre o `Card` do coss. Como `legacy.css` está fora de `@layer`, cada uma das
 * cinco classes ganha em TODA propriedade que declara — e as cinco declaram
 * fundo, borda, raio, padding e sombra. Sobram do coss duas coisas que nenhuma
 * delas declara e que precisam morrer: o `flex-col` (o cartão é fluxo de bloco;
 * empilhar como flex muda como as margens dos filhos se comportam) e o `::before`,
 * que desenha uma linha de luz interna que este produto não usa. O `relative`
 * fica de propósito: é ele que ancora o `.cardclose` quando a variante não é o
 * `.mapcard`, que já nasce absoluto.
 *
 * Convive com `Panel.tsx`: `Card variant="panel"` renderiza exatamente o mesmo
 * markup de `<Panel>` e o substitui. `Panel` fica como apelido até as telas
 * migrarem — não invente uma terceira coisa ligada a `.panel`.
 */
export type CardVariant = 'chart' | 'panel' | 'agent' | 'lesson' | 'map' | 'flat';

const SURFACE: Record<CardVariant, string> = {
  /** `.chartblock` — o bloco de gráfico de Escola, nove ocorrências. */
  chart: 'chartblock',
  /** `.panel` — o cartão de conteúdo com título de 15px. */
  panel: 'panel',
  /** `.agentcard` — a trilha de agentes de Hoje, com elevação no hover. */
  agent: 'agentcard',
  /** `.aula` — a decomposição da aula entregue, em página. */
  lesson: 'aula',
  /** `.mapcard` — o painel flutuante do mapa: absoluto, sombra `--sh-3`. */
  map: 'mapcard',
  /** `.aula.compact` — a mesma estrutura sem cromo nenhum, para embutir. */
  flat: 'aula compact',
};

/**
 * O rótulo mono do cabeçalho. `.mapcard .k`, `.aulahead .k`, `.coverkard .k` e
 * `.st .k` declaram os mesmos cinco valores; onde a variante tem regra própria
 * ela ganha (mesmo resultado), e onde não tem, o utilitário serve o slot em vez
 * de deixar o rótulo cair no corpo de texto.
 */
const EYEBROW = 'font-mono text-[9.5px] uppercase tracking-[0.13em] text-ink-3';

/** O que o `Card` do coss acrescenta e o legado não declara. Nada além disto. */
const NEUTRALIZE = 'block before:hidden';

/**
 * A elevação no hover que `.agentcard` já tem de graça no CSS. Existe como prop
 * para que outra variante possa pedir o mesmo gesto sem herdar `.agentcard`
 * inteiro — e não muda nada quando a variante já é `agent`, porque os valores
 * são os mesmos e o legado ganha.
 */
const INTERACTIVE =
  'transition-[box-shadow,transform] duration-[0.18s] ease-pulso hover:-translate-y-px hover:shadow-e2';

/**
 * O `×` do `.mapcard`. É `Button` do coss pelo foco e pelo alvo de toque; o
 * `.cardclose` continua mandando em posição, corpo, cor e entrelinha. Sai do
 * coss a caixa de 32px do tamanho `icon` (o legado ancora por `right`/`top` e
 * espera largura de conteúdo), o raio, o `::before` e o anel de foco — este
 * último porque `:focus-visible` global já desenha um contorno, e dois anéis
 * empilhados seriam ruído.
 */
const CLOSE = 'size-auto rounded-none before:hidden focus-visible:ring-0 sm:size-auto';

export function Card({
  variant = 'chart',
  title,
  subtitle,
  eyebrow,
  children,
  footer,
  interactive,
  onClose,
  closeLabel = 'Fechar',
  className,
}: {
  variant?: CardVariant;
  /** Título do cabeçalho. Em `lesson` é o bloco de número grande, não texto. */
  title?: ReactNode;
  /** Segunda linha do cabeçalho: `.cs`, `.sub`, `.stt2` ou `.aulasub`. */
  subtitle?: ReactNode;
  /** Rótulo mono acima do título. Em `agent` é o nó cru que abre o `.top`. */
  eyebrow?: ReactNode;
  children?: ReactNode;
  /** Vai depois do corpo, sem invólucro — é onde mora o `.hint` das telas. */
  footer?: ReactNode;
  interactive?: boolean;
  onClose?: () => void;
  closeLabel?: string;
  className?: string;
}) {
  const eyebrowNode = eyebrow ? <div className={cn('k', EYEBROW)}>{eyebrow}</div> : null;

  let header: ReactNode = null;
  if (variant === 'panel') {
    header = (
      <>
        {eyebrowNode}
        {title ? <h4>{title}</h4> : null}
        {subtitle ? <p className="sub">{subtitle}</p> : null}
      </>
    );
  } else if (variant === 'agent') {
    // `.top` é uma linha só: marca de estado, nome, situação encostada à
    // direita por `margin-left:auto`. O eyebrow entra cru porque ali ele é um
    // ponto pulsante, não um rótulo de texto.
    header =
      eyebrow || title || subtitle ? (
        <div className="top">
          {eyebrow}
          {title ? <span className="nm">{title}</span> : null}
          {subtitle}
        </div>
      ) : null;
  } else if (variant === 'lesson') {
    header =
      eyebrow || title || subtitle ? (
        <div className="aulahead">
          <div>
            {eyebrowNode}
            {title}
          </div>
          {subtitle ? <p className="aulasub">{subtitle}</p> : null}
        </div>
      ) : null;
  } else if (variant === 'map') {
    header = (
      <>
        {eyebrowNode}
        {title ? <h5>{title}</h5> : null}
      </>
    );
  } else if (variant === 'chart') {
    // `.ct` alinha h5 e `.cs` pela linha de base e joga a legenda para a
    // direita. Sem os dois, não há régua nenhuma para desenhar.
    header = (
      <>
        {eyebrowNode}
        {title || subtitle ? (
          <div className="ct">
            {title ? <h5>{title}</h5> : null}
            {subtitle ? <span className="cs">{subtitle}</span> : null}
          </div>
        ) : null}
      </>
    );
  }

  const body = variant === 'agent' && children ? <div className="ln">{children}</div> : children;

  return (
    <Surface
      className={cn(SURFACE[variant], NEUTRALIZE, interactive && INTERACTIVE, className)}
      render={variant === 'panel' ? <section /> : variant === 'map' ? <aside /> : undefined}
    >
      {onClose ? (
        <Button
          aria-label={closeLabel}
          className={cn('cardclose', CLOSE)}
          onClick={onClose}
          size="icon"
          variant="ghost"
        >
          ×
        </Button>
      ) : null}
      {header}
      {body}
      {footer}
    </Surface>
  );
}
