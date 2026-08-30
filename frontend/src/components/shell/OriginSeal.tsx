import type React from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipPopup, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export interface OriginSealProps {
  /** A API respondeu e sustenta a leitura de rede. */
  live: boolean;
  /** O cadastro é a rede real do Data.Rio/SME (indicadores seguem sintéticos). */
  geoReal: boolean;
  /** Procedência longa, exibida no tooltip. */
  note: string;
  /** `snapshot_id` do mapa; `null` enquanto carrega. */
  snapshot: string | null;
}

/**
 * Selo de procedência.
 *
 * É a peça mais importante da barra: diz, sem eufemismo, o que a tela está
 * lendo. A nota longa saía em `title` — invisível para teclado — e agora sai
 * por Tooltip. O selo é focável de propósito: sem `tabIndex` nenhum caminho de
 * teclado chegaria à procedência, que é justamente o que não pode ficar oculto.
 */
export function OriginSeal({ live, geoReal, note, snapshot }: OriginSealProps): React.ReactElement {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Badge
            className={cn(
              'h-auto min-w-0 gap-[6px] whitespace-nowrap rounded-full border-line bg-surface',
              'px-[10px] py-[4px] font-mono text-[10px] font-normal tracking-[0.06em] text-ink-3',
              'sm:h-auto sm:min-w-0 sm:text-[10px] focus-visible:ring-0',
            )}
            tabIndex={0}
            variant="outline"
          />
        }
      >
        <i
          aria-hidden
          className={cn('block size-[5px] flex-none rounded-full', live ? 'bg-ok' : 'bg-attn-2')}
        />
        {geoReal ? 'REDE REAL · IND. SINTÉTICOS' : live ? 'SINTÉTICO · API' : 'SINTÉTICO · FIXTURE'}
        <span className="hidden min-[760px]:inline">{` · ${snapshot ?? '········'}`}</span>
      </TooltipTrigger>
      <TooltipPopup className="max-w-80">{note}</TooltipPopup>
    </Tooltip>
  );
}
