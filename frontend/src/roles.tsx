import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

/**
 * Duas roles, e elas não são duas visões do mesmo produto.
 *
 * A família responde "onde meu filho consegue vaga"; a SME e a CRE respondem
 * "onde abro vaga e quem eu chamo primeiro". São públicos, linguagens e
 * decisões diferentes — por isso não compartilham tela, só o motor por baixo.
 *
 * A construção começa por `inscricao`: é onde o processo encosta no cidadão e
 * onde o território pode entrar antes de a fila existir.
 */
export type RoleId = 'inscricao' | 'gestor';

export interface RoleDef {
  id: RoleId;
  label: string;
  scope: string;
  routes: { path: string; label: string; capability: string | null }[];
  note: string;
}

export const ROLES: RoleDef[] = [
  {
    id: 'inscricao',
    label: 'Inscrição',
    scope: 'responsável pela criança',
    note: 'O fluxo do matricula.rio, com território: as unidades próximas da que ele quis.',
    routes: [{ path: '/inscricao', label: 'Inscrição', capability: 'inscricao' }],
  },
  {
    id: 'gestor',
    label: 'Gestor',
    scope: 'SME e 11 CREs',
    note: 'Planejamento da oferta, fila por unidade e turno, e convocação com prazo.',
    routes: [{ path: '/gestor', label: 'Painel', capability: 'fila' }],
  },
];

interface Ctx {
  role: RoleDef;
  setRole: (id: RoleId) => void;
}
const RoleContext = createContext<Ctx | null>(null);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [id, setId] = useState<RoleId>('inscricao');
  const value = useMemo(() => ({ role: ROLES.find((r) => r.id === id)!, setRole: setId }), [id]);
  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole(): Ctx {
  const c = useContext(RoleContext);
  if (!c) throw new Error('useRole fora do RoleProvider');
  return c;
}
