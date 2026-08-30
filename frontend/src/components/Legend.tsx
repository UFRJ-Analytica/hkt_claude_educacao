import type { CSSProperties, ReactNode } from 'react';
import { NoReading } from '@/components/NoReading';
import { cn } from '@/lib/utils';

/**
 * A legenda que publica o limiar.
 *
 * Este produto só pode afirmar "crítico" se disser, na mesma tela, o que fez
 * a leitura ser crítica. As cinco legendas do sistema (`.legrow`,
 * `.matrixlegend`, `.aulalegend`, `.gaplegend`, `.gradekey`) são a mesma
 * frase repetida: amostra + nome + às vezes um número. Só mudam a geometria
 * da amostra e o contêiner — e as duas coisas continuam em `legacy.css`.
 *
 * Por isso `className` é obrigatório na prática: é a classe legada que carrega
 * o `display`, o `gap`, a família mono e o tamanho de cada `i`. O que este
 * componente traz é a ESTRUTURA e um piso de geometria em utilitárias, que
 * por estarem em camada perdem para o legado sempre que ele existir.
 */

export type LegendSwatchKind = 'dot' | 'square' | 'bar' | 'hatch' | 'none';

export interface LegendItem {
  /** `none` é a legenda puramente textual da régua de anos (`.gradekey`). */
  swatch?: LegendSwatchKind;
  /** Classe da amostra: `lv-critical`, `naolancada`, `car`, `hatch`… */
  swatchClassName?: string;
  /** Cor vinda de dado — o mapa pinta a amostra com a mesma escala do ponto. */
  swatchStyle?: CSSProperties;
  label: ReactNode;
  /** Contagem que fecha a linha. */
  value?: ReactNode;
  className?: string;
  /** Motivo, quando a amostra é hachura: vira tooltip alcançável por teclado. */
  reason?: string;
}

/**
 * Piso de geometria por tipo de amostra. Todas em `@layer utilities`, logo
 * perdem para `.legrow i`, `.matrixlegend i`, `.aulalegend i` e `.gaplegend i`.
 */
const SWATCH: Record<Exclude<LegendSwatchKind, 'hatch' | 'none'>, string> = {
  dot: 'mr-1.5 inline-block size-2 rounded-full align-[-1px]',
  square: 'mr-[7px] inline-block size-2.5 rounded-[2px] align-[-1px]',
  bar: 'mr-[7px] inline-block h-[7px] w-3.5 rounded-[2px] align-[0px]',
};

export function Legend({
  items,
  rule,
  strongValue,
  className,
}: {
  items: LegendItem[];
  /**
   * A regra publicada que fecha a legenda da matriz (`.rule` empurrada para a
   * direita). É texto de contrato, não decoração: diz qual limiar pintou o quê.
   */
  rule?: ReactNode;
  /** `.aulalegend b` — número em mono destacado. O mapa conta em texto corrido. */
  strongValue?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      {items.map((item, i) => {
        const kind = item.swatch ?? 'dot';
        return (
          // A ordem é estável (vem de uma escala ordinal, não de dado mutável),
          // então o índice serve de chave sem risco de reordenação.
          <span className={item.className} key={i}>
            {kind === 'hatch' ? (
              <NoReading className={item.swatchClassName} reason={item.reason} shape="swatch" />
            ) : kind === 'none' ? null : (
              <i
                aria-hidden="true"
                className={cn(SWATCH[kind], item.swatchClassName)}
                style={item.swatchStyle}
              />
            )}
            {item.label}
            {item.value != null ? (
              <>
                {' '}
                {strongValue ? <b>{item.value}</b> : item.value}
              </>
            ) : null}
          </span>
        );
      })}
      {rule != null ? <span className="rule">{rule}</span> : null}
    </div>
  );
}
