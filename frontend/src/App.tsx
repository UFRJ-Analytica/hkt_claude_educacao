import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getCapabilities, getSchoolMap, mapOrigin } from './api/client';
import type { Capability } from './api/types';
import Hoje from './screens/Hoje';
import Comparar from './screens/Comparar';
import Mapa from './screens/Mapa';
import Escola from './screens/Escola';
import Unidade from './screens/Unidade';
import Professor from './screens/Professor';
import Recomposicao from './screens/Recomposicao';
import Fluxo from './screens/Fluxo';
import Dados from './screens/Dados';
import Copiloto from './Copiloto';
import { useRole } from './roles';
import { CapabilityState, Loading } from './components';
import { DemoBar, TopNav } from '@/components/shell';

function isUsable(cap: Capability | undefined) {
  return cap ? ['AVAILABLE', 'MOCK_ONLY', 'DEGRADED'].includes(cap.status) : false;
}

/** Capacidades que produzem INDICADOR (distintas do cadastro de escolas). */
const INDICATOR_CAPS = ['network', 'learning', 'attendance', 'capacity', 'staffing'];

export default function App() {
  const caps = useQuery({ queryKey: ['capabilities'], queryFn: getCapabilities });
  const map = useQuery({ queryKey: ['map'], queryFn: getSchoolMap });
  const { role } = useRole();
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
      <TopNav
        geoReal={origin.geoReal}
        links={visible}
        live={live}
        note={origin.note}
        onOpenCopilot={() => setCopilot(true)}
        snapshot={map.data ? map.data.snapshot_id.slice(0, 8) : null}
      />

      {!anyIndicator && map.data && <DemoBar registryReal={registryReal} />}

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
            <Route path="/recomposicao" element={schoolsUsable ? <Recomposicao /> : <CapabilityState capability={byId.get('learning')} screen="recomposicao" />} />
            <Route path="/fluxo" element={schoolsUsable ? <Fluxo /> : <CapabilityState capability={byId.get('network')} screen="fluxo" />} />
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
