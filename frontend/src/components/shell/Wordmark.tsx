import type React from 'react';

/**
 * Marca do produto.
 *
 * O ponto herda `--a2` porque é assinatura de marca, não leitura de dado — a
 * rampa de atenção continua reservada ao dado em todo o resto da interface.
 * Trocar a cor aqui quebraria o reconhecimento da barra sem ganhar nada.
 */
export function Wordmark(): React.ReactElement {
  return (
    <span className="flex flex-none items-center gap-2 text-[15.5px] font-extrabold tracking-[-0.04em]">
      <i
        aria-hidden
        className="block size-[9px] rounded-full bg-attn-2 shadow-[0_0_0_3px_rgba(178,92,49,0.16)]"
      />
      Pulso
    </span>
  );
}
