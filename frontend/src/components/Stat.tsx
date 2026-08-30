import type { ReactNode } from 'react';
import { DELTA_NOISE_FLOOR } from '@/domain/format';
import { cn } from '@/lib/utils';

/**
 * A linha de estado da rede — o primeiro bloco que a tela mostra.
 *
 * Duas variantes convivem no CSS legado e as duas continuam existindo aqui
 * porque significam coisas diferentes: `header` (.stateline) fecha o topo da
 * página com uma régua; `section` (.statline) abre uma seção interna e não
 * carrega régua nenhuma. Trocar uma pela outra muda a hierarquia da leitura,
 * não só o espaçamento — por isso é prop, não className solto.
 */
export function StatLine({
  children,
  variant = 'header',
  tight,
  className,
}: {
  children: ReactNode;
  variant?: 'header' | 'section';
  /** Aperta o respiro entre colunas quando a linha vive dentro de um painel. */
  tight?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(variant === 'header' ? 'stateline' : 'statline', tight && 'tight', className)}>
      {children}
    </div>
  );
}

/**
 * Um número da linha de estado: rótulo mono em caixa alta, valor grande e um
 * delta opcional. `muted` é o estado em que o quadro não tem número para
 * mostrar — ele encolhe e perde peso de propósito, porque uma ausência de
 * leitura não pode competir visualmente com uma medida.
 */
export function Stat({
  label,
  value,
  delta,
  muted,
  tone = 'neutral',
  className,
}: {
  label: ReactNode;
  value: ReactNode;
  delta?: ReactNode;
  muted?: boolean;
  /** `bad` pinta o valor no topo da rampa de atenção. Nunca use o acento aqui. */
  tone?: 'neutral' | 'bad';
  className?: string;
}) {
  return (
    <div className={cn('st', muted && 'mut', className)}>
      <div className="k">{label}</div>
      <div className={cn('v', tone === 'bad' && 'worse text-attn-3')}>
        {value}
        {delta}
      </div>
    </div>
  );
}

export interface FormattedDelta {
  text: string;
  /** Verdadeiro quando a variação anda na direção que pede atenção. */
  bad: boolean;
}

/**
 * A regra de variação que quatro telas repetiam palavra por palavra.
 *
 * Duas decisões estão embutidas e são de produto, não de formatação:
 * 1. abaixo do limiar a variação não é sinal — vira "estável", sem seta, para
 *    não transformar ruído de arredondamento em movimento;
 * 2. a seta é geométrica (sobe/desce) e a cor é semântica (`worse` decide),
 *    porque queda de frequência e alta de carência são a mesma má notícia com
 *    sinais aritméticos opostos.
 */
export function formatDelta(
  delta: number | null | undefined,
  {
    worse = 'low',
    threshold = DELTA_NOISE_FLOOR,
    scale = 100,
    digits = 1,
    unit = 'pp',
  }: {
    worse?: 'low' | 'high';
    threshold?: number;
    scale?: number;
    digits?: number;
    unit?: string;
  } = {},
): FormattedDelta | null {
  if (delta === null || delta === undefined || Number.isNaN(delta)) return null;
  if (Math.abs(delta) < threshold) return { text: 'estável', bad: false };
  const arrow = delta < 0 ? '▼' : '▲';
  const magnitude = Math.abs(delta * scale).toFixed(digits).replace('.', ',');
  return {
    text: `${arrow} ${magnitude} ${unit}`,
    bad: worse === 'low' ? delta < 0 : delta > 0,
  };
}

/**
 * O `<em>` que mora dentro do valor. Precisa ser filho de `.st .v` para herdar
 * o corpo mono de 11px — por isso ele é passado ao `Stat` pela prop `delta`.
 */
export function StatDelta({
  delta,
  worse = 'low',
  threshold,
  scale,
  digits,
  unit,
}: {
  delta: number | null | undefined;
  worse?: 'low' | 'high';
  threshold?: number;
  scale?: number;
  digits?: number;
  unit?: string;
}) {
  const d = formatDelta(delta, { worse, threshold, scale, digits, unit });
  if (!d) return null;
  return <em className={d.bad ? 'bad' : undefined}>{d.text}</em>;
}
