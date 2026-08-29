import { useQuery } from '@tanstack/react-query';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { getCapabilities, getSchoolMap, mapOrigin } from './api/client';
import type { Capability } from './api/types';
import Hoje from './screens/Hoje';
import Comparar from './screens/Comparar';
import Mapa from './screens/Mapa';
import Escola from './screens/Escola';
import Dados from './screens/Dados';
import { CapabilityState, Loading } from './components';

const ROUTES = [
  { path: '/hoje', label: 'Hoje', capability: 'network' },
  { path: '/comparar', label: 'Comparar', capability: 'schools' },
  { path: '/mapa', label: 'Mapa', capability: 'schools' },
  { path: '/dados', label: 'Dados', capability: null },
  { path: '/equidade', label: 'Equidade', capability: 'equity' },
];

/** A navegação deriva de /api/v1/capabilities. Nada é habilitado por build. */
function isHidden(cap: Capability | undefined) {
  return cap?.status === 'DISABLED';
}
function isUsable(cap: Capability | undefined) {
  return cap ? ['AVAILABLE', 'MOCK_ONLY', 'DEGRADED'].includes(cap.status) : false;
}

export default function App() {
  const caps = useQuery({ queryKey: ['capabilities'], queryFn: getCapabilities });
  const map = useQuery({ queryKey: ['map'], queryFn: getSchoolMap });
  const byId = new Map((caps.data ?? []).map((c) => [c.id, c]));
  // O selo segue a origem do dado exibido, não a saúde da API.
  const origin = map.data ? mapOrigin() : { mode: 'fixture' as const, note: 'carregando' };
  const live = origin.mode === 'live';

  return (
    <div className="shell">
      <nav className="nav">
        <span className="wordmark">Pulso</span>
        <div className="navlinks">
          {ROUTES.filter((r) => !isHidden(byId.get(r.capability ?? ''))).map((r) => {
            const cap = r.capability ? byId.get(r.capability) : undefined;
            const off = r.capability ? !isUsable(cap) : false;
            return (
              <NavLink key={r.path} to={r.path} className={({ isActive }) => (isActive ? 'cur' : off ? 'off' : '')}>
                {r.label}
              </NavLink>
            );
          })}
        </div>
        <div className="navr">
          <span className={`seal${live ? ' live' : ''}`} title={origin.note}>
            <i />
            {live ? 'SINTÉTICO · API' : 'SINTÉTICO · FIXTURE'}
            <span className="hidden-sm">
              {' · '}
              {map.data ? map.data.snapshot_id.slice(0, 8) : '········'}
            </span>
          </span>
          <span className="kbd">⌘K</span>
        </div>
      </nav>

      <main className="page">
        {caps.isLoading || map.isLoading ? (
          <Loading label="resolvendo capacidades" />
        ) : (
          <Routes>
            <Route path="/" element={<Navigate to="/hoje" replace />} />
            <Route
              path="/hoje"
              element={isUsable(byId.get('network')) ? <Hoje /> : <CapabilityState capability={byId.get('network')} screen="hoje" />}
            />
            <Route
              path="/comparar"
              element={isUsable(byId.get('schools')) ? <Comparar /> : <CapabilityState capability={byId.get('schools')} screen="comparar" />}
            />
            <Route
              path="/mapa"
              element={isUsable(byId.get('schools')) ? <Mapa /> : <CapabilityState capability={byId.get('schools')} screen="mapa" />}
            />
            <Route path="/escola/:id" element={<Escola />} />
            <Route path="/dados" element={<Dados />} />
            <Route path="/equidade" element={<CapabilityState capability={byId.get('equity')} screen="equidade" />} />
            <Route path="*" element={<CapabilityState screen="rota desconhecida" />} />
          </Routes>
        )}
      </main>
    </div>
  );
}
