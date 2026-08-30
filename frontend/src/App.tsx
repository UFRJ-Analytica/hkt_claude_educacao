import { useQuery } from '@tanstack/react-query';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { apiBase, getCapabilities } from './api/client';
import { CapabilityState, Loading, Offline } from './components';
import { ROLES, useRole } from './roles';

/**
 * A casca.
 *
 * Cada role tem as suas rotas e elas não se cruzam: o responsável nunca vê a
 * fila da CRE, o gestor nunca vê o formulário da família. Enquanto uma tela não
 * existe, a rota devolve o estado declarado pela capacidade — que hoje é
 * SCHEMA_ONLY para todas, porque o extrato da SME ainda não está conectado.
 */
export default function App() {
  const caps = useQuery({ queryKey: ['capabilities'], queryFn: getCapabilities, retry: false });
  const { role, setRole } = useRole();

  const byId = new Map((caps.data ?? []).map((c) => [c.id, c]));

  return (
    <div className="shell">
      <nav className="nav">
        <span className="wordmark">
          <i />
          Vaga Certa
        </span>

        <div className="roleswitch" role="group" aria-label="Papel">
          {ROLES.map((r) => (
            <button
              key={r.id}
              type="button"
              className={role.id === r.id ? 'on' : ''}
              title={`${r.scope} — ${r.note}`}
              onClick={() => setRole(r.id)}
            >
              {r.label}
            </button>
          ))}
        </div>

        <div className="navlinks">
          {role.routes.map((r) => (
            <NavLink key={r.path} to={r.path} className={({ isActive }) => (isActive ? 'cur' : '')}>
              {r.label}
            </NavLink>
          ))}
        </div>

        <div className="navr">
          <span className="seal" title="Extrato anonimizado da SME-Rio, processos 2021–2025">
            <i />
            SME · 2021–2025
          </span>
        </div>
      </nav>

      <main className="page">
        {caps.isLoading ? (
          <Loading label="resolvendo capacidades" />
        ) : caps.isError ? (
          <Offline base={apiBase()} />
        ) : (
          <Routes>
            <Route path="/" element={<Navigate to={role.routes[0].path} replace />} />
            <Route
              path="/inscricao"
              element={<CapabilityState capability={byId.get('inscricao')} screen="inscrição" />}
            />
            <Route
              path="/gestor"
              element={<CapabilityState capability={byId.get('fila')} screen="painel do gestor" />}
            />
            <Route path="*" element={<CapabilityState screen="rota desconhecida" />} />
          </Routes>
        )}
      </main>
    </div>
  );
}
