import type { ReactNode } from 'react';

/**
 * Barra de ação fixa no rodapé: no celular é onde o polegar está; no desktop
 * continua alinhada à coluna de leitura.
 */
export function BottomBar({ children, note }: { children: ReactNode; note?: ReactNode }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 shadow-up backdrop-blur supports-[backdrop-filter]:bg-surface/90">
      <div className="mx-auto flex w-full max-w-page flex-col gap-2 px-[var(--pad-x)] pt-3 safe-bottom">
        {note ? <div className="text-center text-xs text-ink-3">{note}</div> : null}
        <div className="flex items-center gap-2 [&>*]:min-h-11 [&>*:last-child]:flex-1">{children}</div>
      </div>
    </div>
  );
}
