import type React from 'react';
import { NavLink } from 'react-router-dom';

export interface NavLinksProps {
  /** Rotas já filtradas pelo papel e pelas capacidades da API. */
  links: { path: string; label: string }[];
}

/**
 * Lista de rotas do papel corrente.
 *
 * Navegação é link, não aba nem toggle: o item corrente é o URL, e o
 * `NavLink` já marca `aria-current="page"` — que é exatamente o estado que o
 * padrão de segmento do coss espera para navegação.
 *
 * O visual continua em `.navlinks`/`.cur` do CSS legado de propósito: o reset
 * global `a { color: inherit }` mora fora de camada e ganharia de qualquer
 * utilitário de cor do Tailwind, então reescrever isto em classe utilitária
 * exigiria `!important` em cada regra sem nenhum ganho de fidelidade.
 */
export function NavLinks({ links }: NavLinksProps): React.ReactElement {
  return (
    <div className="navlinks">
      {links.map((r) => (
        <NavLink className={({ isActive }) => (isActive ? 'cur' : '')} key={r.path} to={r.path}>
          {r.label}
        </NavLink>
      ))}
    </div>
  );
}
