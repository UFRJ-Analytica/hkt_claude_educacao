import type React from 'react';
import { Kbd } from '@/components/ui/kbd';

export interface CopilotButtonProps {
  onClick: () => void;
}

/**
 * Abre o Copiloto.
 *
 * Único botão de acento petróleo da barra — acento é IA, ação e foco, nunca
 * dado. O `.askbtn` legado permanece porque o reset global `button { background:
 * none; padding: 0 }` está fora de camada e derrotaria as utilitárias do
 * Tailwind; o atalho, esse sim, virou `Kbd` do coss, achatado para o mesmo
 * caractere translúcido de antes.
 */
export function CopilotButton({ onClick }: CopilotButtonProps): React.ReactElement {
  return (
    <button className="askbtn" onClick={onClick} type="button">
      <svg fill="none" height="13" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24" width="13">
        <path d="M12 3l2.2 5.6L20 11l-5.8 2.4L12 19l-2.2-5.6L4 11l5.8-2.4z" />
      </svg>
      Copiloto
      <Kbd className="h-auto min-w-0 bg-transparent px-0 text-inherit">⌘K</Kbd>
    </button>
  );
}
