import { Landmark, MessageCircle } from 'lucide-react';
import type { ReactNode } from 'react';

/**
 * Uma "notificação de celular" desenhada dentro da página. Existe porque o
 * protótipo não envia mensagem de verdade: mostra o que a família veria no
 * app do banco ou no WhatsApp — e é assim que o pitch explica o canal Pix.
 */
export function NotificacaoSimulada({ app, titulo, texto, rodape }: { app: 'banco' | 'whatsapp'; titulo: ReactNode; texto: ReactNode; rodape?: ReactNode }) {
  const banco = app === 'banco';
  return (
    <div className="step-in rounded-2xl border border-line-2 bg-surface-2 p-3 shadow-e2" role="status" aria-live="polite">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-3">Simulação · o que aparece no celular</p>
      <div className="flex gap-3 rounded-xl bg-surface p-3 shadow-e1">
        <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${banco ? 'bg-brand text-brand-ink' : 'bg-[#25d366] text-white'}`} aria-hidden="true">
          {banco ? <Landmark className="size-5" /> : <MessageCircle className="size-5" />}
        </span>
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-[12px] font-medium text-ink-3">
            {banco ? 'Seu banco' : 'WhatsApp'} <span aria-hidden="true">·</span> agora
          </p>
          <p className="text-[14px] font-semibold text-ink">{titulo}</p>
          <p className="text-[13px] leading-snug text-ink-2">{texto}</p>
        </div>
      </div>
      {rodape ? <p className="mt-2 text-[12px] text-ink-3">{rodape}</p> : null}
    </div>
  );
}
