import type React from 'react';
import { RadioGroupPrimitive, RadioPrimitive } from '@/components/ui/radio-group';
import { Tooltip, TooltipPopup, TooltipTrigger } from '@/components/ui/tooltip';
import { ROLES, useRole } from '@/roles';

/**
 * Seletor de papel.
 *
 * Semântica: Radio Group, não Tabs nem Toggle Group. O papel é um valor único e
 * exclusivo que precisa continuar escolhido — não há estado "nenhum papel", e
 * trocar de papel não abre um painel associado, reescreve a rota inteira. O
 * visual de segmento é só a pele; a decisão de comportamento vem antes dela.
 *
 * A explicação de cada papel (`scope` e `note`) vivia em `title`, que o teclado
 * nunca alcança. Agora sai por Tooltip do coss, que abre no foco além do hover.
 */

/** Um item do controle. Reproduz `.roleswitch button` com os tokens do domínio. */
const ITEM_CLASS =
  'cursor-pointer select-none whitespace-nowrap rounded-[3px] px-[10px] py-[4px] text-[12px] ' +
  'text-ink-3 transition-all duration-[160ms] ease-pulso ' +
  'data-checked:bg-surface data-checked:font-semibold data-checked:text-ink data-checked:shadow-e1 ' +
  'data-disabled:cursor-not-allowed data-disabled:text-ink-4';

export function RoleSwitch(): React.ReactElement {
  const { role, setRole } = useRole();

  return (
    <RadioGroupPrimitive
      aria-label="Papel"
      className="flex rounded-[5px] border border-line bg-surface-2 p-[2px]"
      onValueChange={(id) => setRole(id)}
      value={role.id}
    >
      {ROLES.map((r) => {
        const foraDeEscopo = r.state === 'fora-de-escopo';
        return (
          <Tooltip key={r.id}>
            <TooltipTrigger
              render={
                <RadioPrimitive.Root
                  className={ITEM_CLASS}
                  disabled={foraDeEscopo}
                  value={r.id}
                  // O roving tabindex do composite pula item `aria-disabled`, o
                  // que deixaria "Família" — justamente o papel que precisa se
                  // explicar — inalcançável pelo teclado. Devolvemos o tab stop
                  // só para ele: o item segue inerte, mas a razão fica legível.
                  {...(foraDeEscopo ? { tabIndex: 0 } : {})}
                />
              }
            >
              {r.label}
            </TooltipTrigger>
            <TooltipPopup className="max-w-72">
              {foraDeEscopo ? r.note : `${r.scope} — ${r.note}`}
            </TooltipPopup>
          </Tooltip>
        );
      })}
    </RadioGroupPrimitive>
  );
}
