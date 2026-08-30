import type React from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { CopilotButton } from './CopilotButton';
import { NavLinks, type NavLinksProps } from './NavLinks';
import { OriginSeal, type OriginSealProps } from './OriginSeal';
import { RoleSwitch } from './RoleSwitch';
import { Wordmark } from './Wordmark';

export interface TopNavProps extends NavLinksProps, OriginSealProps {
  onOpenCopilot: () => void;
}

/**
 * Barra do produto: marca, papel, rotas e procedência.
 *
 * A ordem é a hierarquia de leitura: quem sou (marca), de que lugar eu olho
 * (papel), para onde eu vou (rotas) e — encostado à direita, onde o olho para —
 * de onde vem o número (selo) e como perguntar (Copiloto).
 *
 * `.nav`/`.navr` seguem no CSS legado: são caixa de layout pura, sem primitiva
 * coss correspondente, e reescrevê-las só trocaria uma linha por outra.
 */
export function TopNav({
  links,
  live,
  geoReal,
  note,
  snapshot,
  onOpenCopilot,
}: TopNavProps): React.ReactElement {
  return (
    // Um provider só para os dois grupos de tooltip da barra, para que passar de
    // um papel ao vizinho não recomece a contagem de atraso a cada item.
    <TooltipProvider>
      <nav className="nav">
        <Wordmark />
        <RoleSwitch />
        <NavLinks links={links} />

        <div className="navr">
          <OriginSeal geoReal={geoReal} live={live} note={note} snapshot={snapshot} />
          <CopilotButton onClick={onOpenCopilot} />
        </div>
      </nav>
    </TooltipProvider>
  );
}
