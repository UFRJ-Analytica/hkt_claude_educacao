import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { getCapabilities, getSchoolMap, mapOrigin } from './api/client';
import type { Capability } from './api/types';
import Hoje from './screens/Hoje';
import Comparar from './screens/Comparar';
import Mapa from './screens/Mapa';
import Escola from './screens/Escola';
import Unidade from './screens/Unidade';
import Professor from './screens/Professor';
import Dados from './screens/Dados';
import Copiloto from './Copiloto';
import { ROLES, useRole } from './roles';
import { CapabilityState, Loading } from './components';

function isUsable(cap: Capability | undefined) {
  return cap ? ['AVAILABLE', 'MOCK_ONLY', 'DEGRADED'].includes(cap.status) : false;
}

/** Capacidades que produzem INDICADOR (distintas do cadastro de escolas). */
const INDICATOR_CAPS = ['network', 'learning', 'attendance', 'capacity', 'staffing'];

export default function App() {
  const caps = useQuery({ queryKey: ['capabilities'], queryFn: getCapabilities });
  const map = useQuery({ queryKey: ['map'], queryFn: getSchoolMap });
  const { role, setRole } = useRole();
  const [copilot, setCopilot] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCopilot((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const byId = new Map((caps.data ?? []).map((c) => [c.id, c]));
  const origin = map.data ? mapOrigin() : { mode: 'fixture' as const, note: 'carregando', geoReal: false };
  const live = origin.mode === 'live';

  // O cadastro oficial sozinho já sustenta mapa e drill-down de identidade,
  // mesmo com todas as capacidades de indicador em SCHEMA_ONLY.
  const registryReal = byId.get('school-identity')?.status === 'AVAILABLE';
  const schoolsUsable = isUsable(byId.get('schools')) || registryReal;
  const anyIndicator = INDICATOR_CAPS.some((id) => isUsable(byId.get(id)));

  const visible = role.routes.filter((r) => byId.get(r.capability ?? '')?.status !== 'DISABLED');

  return (
    <div className="shell">
      <nav className="nav">
        <span className="wordmark">
          <i />
          Pulso
        </span>

        <div className="roleswitch" role="group" aria-label="Papel">
          {ROLES.map((r) => (
            <button
              key={r.id}
              type="button"
              className={role.id === r.id ? 'on' : ''}
              disabled={r.state === 'fora-de-escopo'}
              title={r.state === 'fora-de-escopo' ? r.note : `${r.scope} — ${r.note}`}
              onClick={() => setRole(r.id)}
            >
              {r.label}
            </button>
          ))}
        </div>

        <div className="navlinks">
          {visible.map((r) => (
            <NavLink key={r.path} to={r.path} className={({ isActive }) => (isActive ? 'cur' : '')}>
              {r.label}
            </NavLink>
          ))}
        </div>

        <div className="navr">
          <span className={`seal${live ? ' live' : ''}`} title={origin.note}>
            <i />
            {origin.geoReal ? 'REDE REAL · IND. SINTÉTICOS' : live ? 'SINTÉTICO · API' : 'SINTÉTICO · FIXTURE'}
            <span className="hidden-sm">{` · ${map.data ? map.data.snapshot_id.slice(0, 8) : '········'}`}</span>
          </span>
          <button type="button" className="askbtn" onClick={() => setCopilot(true)}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
              <path d="M12 3l2.2 5.6L20 11l-5.8 2.4L12 19l-2.2-5.6L4 11l5.8-2.4z" />
            </svg>
            Copiloto
            <kbd>⌘K</kbd>
          </button>
        </div>
      </nav>

      {!anyIndicator && map.data && (
        <div className="demobar">
          <b>Indicadores em modo demonstração.</b> A API declara{' '}
          <span className="mono">network</span>, <span className="mono">learning</span>,{' '}
          <span className="mono">attendance</span>, <span className="mono">capacity</span> e{' '}
          <span className="mono">staffing</span> como <span className="mono">SCHEMA_ONLY</span> — não há
          indicador real carregado.
          {registryReal
            ? ' Identidade, CRE, tipo e coordenada das escolas são reais (Data.Rio/SME, CC-BY 4.0); os números exibidos são sintéticos.'
            : ' Tudo nesta tela é sintético.'}
        </div>
      )}

      <main className="page">
        {caps.isLoading || map.isLoading ? (
          <Loading label="resolvendo capacidades" />
        ) : (
          <Routes>
            <Route path="/" element={<Navigate to={role.routes[0]?.path ?? '/hoje'} replace />} />
            <Route
              path="/hoje"
              element={schoolsUsable ? <Hoje /> : <CapabilityState capability={byId.get('network')} screen="hoje" />}
            />
            <Route
              path="/comparar"
              element={schoolsUsable ? <Comparar /> : <CapabilityState capability={byId.get('schools')} screen="comparar" />}
            />
            <Route
              path="/mapa"
              element={schoolsUsable ? <Mapa /> : <CapabilityState capability={byId.get('schools')} screen="mapa" />}
            />
            <Route path="/unidade" element={<Unidade />} />
            <Route path="/escola/:id" element={<Escola />} />
            <Route path="/professor" element={<Professor />} />
            <Route path="/dados" element={<Dados />} />
            <Route path="*" element={<CapabilityState screen="rota desconhecida" />} />
          </Routes>
        )}
      </main>

      {copilot && <Copiloto onClose={() => setCopilot(false)} />}
    </div>
  );
}
