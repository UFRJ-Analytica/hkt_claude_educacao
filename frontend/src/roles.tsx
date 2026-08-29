import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

/**
 * Papéis do produto, em ordem de prioridade de construção.
 *
 * A escada é deliberada: a decisão que a Secretaria toma é de rede, então a
 * visão de cidade vem primeiro e é a única completa. A visão de unidade existe
 * tanto para o diretor quanto para a SME enxergar a dor de cada escola. A de
 * professor é preview de conceito. Família está fora do escopo até o evento.
 */
export type RoleId = 'sme' | 'escola' | 'professor' | 'familia';

export interface RoleDef {
  id: RoleId;
  label: string;
  scope: string;
  state: 'completo' | 'parcial' | 'preview' | 'fora-de-escopo';
  routes: { path: string; label: string; capability: string | null }[];
  note: string;
}

export const ROLES: RoleDef[] = [
  {
    id: 'sme',
    label: 'Secretaria',
    scope: 'rede municipal · 11 CREs',
    state: 'completo',
    note: 'Decisão de alocação de atenção e recurso no nível da cidade.',
    routes: [
      { path: '/hoje', label: 'Hoje', capability: 'network' },
      { path: '/comparar', label: 'Comparar', capability: 'schools' },
      { path: '/mapa', label: 'Mapa', capability: 'schools' },
      { path: '/dados', label: 'Dados', capability: null },
    ],
  },
  {
    id: 'escola',
    label: 'Escola',
    scope: 'uma unidade',
    state: 'parcial',
    note: 'A mesma tela serve ao diretor e à SME: é onde a dor da unidade aparece consolidada.',
    routes: [
      { path: '/unidade', label: 'Minha escola', capability: 'schools' },
      { path: '/comparar', label: 'Pares', capability: 'schools' },
      { path: '/dados', label: 'Dados', capability: null },
    ],
  },
  {
    id: 'professor',
    label: 'Professor',
    scope: 'turma e material',
    state: 'preview',
    note: 'Plano de aula com RAG sobre material autorizado e desempenho agregado da turma.',
    routes: [{ path: '/professor', label: 'Planejamento', capability: null }],
  },
  {
    id: 'familia',
    label: 'Família',
    scope: '—',
    state: 'fora-de-escopo',
    note: 'Fora do escopo até o evento: exige base legal, canal e consentimento que não temos.',
    routes: [],
  },
];

interface Ctx {
  role: RoleDef;
  setRole: (id: RoleId) => void;
}
const RoleContext = createContext<Ctx | null>(null);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [id, setId] = useState<RoleId>('sme');
  const value = useMemo(
    () => ({ role: ROLES.find((r) => r.id === id)!, setRole: setId }),
    [id],
  );
  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole(): Ctx {
  const c = useContext(RoleContext);
  if (!c) throw new Error('useRole fora do RoleProvider');
  return c;
}
