import type { ReactNode } from 'react';
import type { Attention } from '@/domain/indicators';
import { formatDelta } from '@/components/Stat';
import { cn } from '@/lib/utils';

/**
 * O número medido e a variação que o acompanha.
 *
 * São duas peças e não uma porque respondem a perguntas diferentes: `Num` diz
 * quanto é agora, `Delta` diz para onde andou. Juntar as duas num componente
 * só obrigaria toda tela que só tem o valor a inventar um delta vazio.
 *
 * A cor aqui sai da rampa de atenção (`--a2`, `--a3`) e de mais nada — um
 * número nunca é petróleo, porque petróleo é ação e IA. `mut` é o cinza de
 * "está aqui, mas não é o que você veio ver".
 */

export type NumTone = 'default' | 'mut' | 'bad' | 'worse';

/**
 * Traduz o nível de atenção canônico para o tom do número.
 *
 * Existe para que a decisão "crítico pinta em --a3" fique escrita uma vez.
 * `MetricCell` (Bespoke.tsx) monta hoje essa mesma string à mão dentro da
 * célula; quando ele adotar `Num`, esta função passa a ser a única fonte.
 */
export function toneForAttention(level: Attention): NumTone {
  if (level === 'critical') return 'worse';
  if (level === 'attention') return 'bad';
  if (level === 'none' || level === 'unreadable') return 'mut';
  return 'default';
}

/**
 * O número mono das tabelas e células (`.num`).
 *
 * Renderiza `<span>` sem `display` declarado, como no legado: `.num` só
 * carrega família e corpo, e quem decide o fluxo é o pai (`.cell`, `<td>`,
 * `.gv`). Toda a geometria continua em `legacy.css`, que ganha das utilidades
 * do Tailwind por não estar em camada.
 */
export function Num({
  children,
  tone = 'default',
  title,
  className,
}: {
  children: ReactNode;
  tone?: NumTone;
  /** Explicação curta do valor. Só use quando a frase não couber na tela. */
  title?: string;
  className?: string;
}) {
  return (
    <span className={cn('num', tone !== 'default' && tone, className)} title={title}>
      {children}
    </span>
  );
}

/**
 * A pastilha de variação isolada (`.delta`), a que vive fora do `.st .v`.
 *
 * A formatação é a de `formatDelta` — a mesma de `StatDelta`, importada e não
 * reescrita: se o piso de ruído mudar, muda nos dois lugares de uma vez.
 *
 * O que `formatDelta` não decide é a GRAVIDADE. Ele devolve só "isto é má
 * notícia?"; a tela precisa de três degraus (neutro, `bad`, `worse`) porque
 * uma queda de meio ponto e uma de três pontos não podem sair na mesma cor.
 * `severeAt` é esse segundo limiar, com o mesmo valor que as telas já usam
 * hoje (1 pp), e continua sendo parâmetro para que uma tela possa publicá-lo
 * na própria legenda.
 */
export function Delta({
  delta,
  worse = 'low',
  severeAt = 0.01,
  threshold,
  scale,
  digits,
  unit,
  emptyText = '—',
  title,
  className,
  children,
}: {
  delta: number | null | undefined;
  worse?: 'low' | 'high';
  /** Magnitude absoluta a partir da qual a variação sobe para `worse`. */
  severeAt?: number;
  threshold?: number;
  scale?: number;
  digits?: number;
  unit?: string;
  /** Texto quando não há variação para mostrar. */
  emptyText?: ReactNode;
  title?: string;
  className?: string;
  /**
   * Sobrescreve só o texto, preservando a decisão de tom. Serve à variante
   * "+1,2 pp vs CRE" da tela de escola, que compara contra outro recorte e
   * por isso não usa seta.
   */
  children?: ReactNode;
}) {
  const d = formatDelta(delta, { worse, threshold, scale, digits, unit });
  if (!d && children === undefined) {
    return <span className={cn('delta', className)}>{emptyText}</span>;
  }
  const magnitude = typeof delta === 'number' ? Math.abs(delta) : 0;
  const tone = d?.bad ? (magnitude >= severeAt ? 'worse' : 'bad') : undefined;
  return (
    <span className={cn('delta', tone, className)} title={title}>
      {children ?? d?.text}
    </span>
  );
}
