import type { CSSProperties } from 'react';
import { HatchBar } from '@/components/Bar';
import { Tooltip, TooltipPopup, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

/**
 * A hachura de 45°: NÃO É ZERO, É "NÃO DÁ PARA LER".
 *
 * É a afirmação mais carregada do produto. Um valor baixo pede ação; uma
 * leitura bloqueada pede dado. Confundir os dois faz a rede correr atrás da
 * escola errada — por isso a distinção mora na TEXTURA e nunca na cor: cor de
 * dado aqui é a rampa de atenção, e ausência de informação não tem lugar
 * numa rampa ordinal.
 *
 * Quatro formas, uma semântica. Cada uma tem sua regra em `legacy.css`
 * (`.hatchbar`, `.blockcell`, `.hatchcell`, e o `i` da legenda), e é lá que
 * a geometria continua: como `legacy.css` não está em `@layer`, aquelas
 * declarações ganham das utilitárias abaixo. As utilitárias existem só como
 * piso — o dia em que a regra legada sair, a hachura continua de pé.
 *
 * `reason` fecha uma lacuna de acessibilidade real: hoje o motivo viaja num
 * `title=`, que teclado nenhum alcança. Com o Tooltip do coss o mesmo texto
 * chega no foco, e o elemento ganha nome acessível — porque uma hachura sem
 * explicação é indistinguível de um erro de renderização.
 */

export type NoReadingShape = 'bar' | 'cell' | 'block' | 'swatch';

/**
 * O gradiente é escrito como utilitária arbitrária de propósito: assim ele
 * nasce em `@layer utilities` e PERDE para qualquer regra legada na mesma
 * caixa. É o que permite a `.legrow i.hatch` continuar sendo o tracejado que
 * sempre foi, sem que este componente sobreponha textura por cima.
 */
const HATCH_4 = 'bg-[image:repeating-linear-gradient(45deg,var(--void)_0_1px,transparent_1px_4px)]';
const HATCH_5 = 'bg-[image:repeating-linear-gradient(45deg,var(--void)_0_1px,transparent_1px_5px)]';

const SHAPE: Record<NoReadingShape, { legacy: string; fallback: string }> = {
  /** Faixa de 5px no lugar de uma barra de medida. */
  bar: { legacy: 'hatchbar', fallback: cn('h-[5px] rounded-[3px] border-b border-line-2', HATCH_4) },
  /** Célula larga de tabela e de sparkline. */
  cell: {
    legacy: 'blockcell',
    fallback: cn('inline-block h-[10px] w-[50px] border-b border-line-2', HATCH_5),
  },
  /** Quadro da matriz de habilidades — o único com borda tracejada. */
  block: {
    legacy: 'hatchcell',
    fallback: cn(
      'inline-block h-[26px] w-[34px] rounded-[4px] border border-line-2 border-dashed',
      HATCH_5,
    ),
  },
  /** Amostra de legenda. Sem classe legada: quem manda é o `i` do contêiner. */
  swatch: {
    legacy: '',
    fallback: cn('mr-[7px] inline-block size-2.5 rounded-[2px] border border-line-2', HATCH_4),
  },
};

export function NoReading({
  shape = 'bar',
  reason,
  className,
  style,
}: {
  shape?: NoReadingShape;
  /** Por que não há leitura. Vira tooltip alcançável por teclado e nome acessível. */
  reason?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const { legacy, fallback } = SHAPE[shape];
  const cls = cn(fallback, legacy, className);

  // `swatch` precisa ser `<i>`: as legendas legadas selecionam por elemento
  // (`.legrow i`, `.aulalegend i`), e um `<span>` sairia sem geometria.
  const Tag = shape === 'swatch' ? 'i' : 'span';

  if (!reason) {
    // Sem motivo declarado a hachura é pura apresentação — nada a anunciar.
    // A barra delega para `HatchBar`, que já é este mesmo `<span.hatchbar>`:
    // a textura existe uma vez só, na regra `.hatchbar` do legado.
    if (shape === 'bar') return <HatchBar className={cn(fallback, className)} />;
    return <Tag aria-hidden="true" className={cls} role="presentation" style={style} />;
  }

  return (
    <Tooltip>
      {/* `render` mantém o elemento original: trocar por um `<button>` mudaria
          `display` e o alinhamento dentro da célula. `tabIndex` é o que torna
          o motivo alcançável sem mouse — a dívida que o `title=` deixou. */}
      <TooltipTrigger
        render={
          <Tag aria-label={reason} className={cls} role="img" style={style} tabIndex={0} />
        }
      />
      <TooltipPopup>{reason}</TooltipPopup>
    </Tooltip>
  );
}
