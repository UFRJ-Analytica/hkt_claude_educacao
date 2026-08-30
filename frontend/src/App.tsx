import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ToastProvider } from '@/components/ui/toast';
import { Acompanhar } from './screens/Acompanhar';
import { Confirmacao } from './screens/Confirmacao';
import { Inicio } from './screens/Inicio';
import { NaoEncontrado } from './screens/NaoEncontrado';
import { PerfilCreche } from './screens/creche/PerfilCreche';
import { Portal } from './screens/Portal';
import { PassoCrianca } from './screens/passos/PassoCrianca';
import { PassoDocumentos } from './screens/passos/PassoDocumentos';
import { PassoEndereco } from './screens/passos/PassoEndereco';
import { PassoPix } from './screens/passos/PassoPix';
import { PassoPrioridade } from './screens/passos/PassoPrioridade';
import { PassoResponsavel } from './screens/passos/PassoResponsavel';
import { PassoRevisao } from './screens/passos/PassoRevisao';
import { PassoUnidades } from './screens/passos/PassoUnidades';

function ScrollTopo() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return null;
}

export function App() {
  return (
    <ToastProvider>
      <ScrollTopo />
      <Routes>
        <Route path="/" element={<Portal />} />
        <Route path="/app" element={<Inicio />} />
        <Route path="/app/*" element={<Navigate to="/app" replace />} />
        <Route path="/creche" element={<PerfilCreche />} />
        <Route path="/inscricao" element={<Navigate to="/inscricao/crianca" replace />} />
        <Route path="/inscricao/crianca" element={<PassoCrianca />} />
        <Route path="/inscricao/responsavel" element={<PassoResponsavel />} />
        <Route path="/inscricao/pix" element={<PassoPix />} />
        <Route path="/inscricao/endereco" element={<PassoEndereco />} />
        <Route path="/inscricao/prioridade" element={<PassoPrioridade />} />
        <Route path="/inscricao/documentos" element={<PassoDocumentos />} />
        <Route path="/inscricao/unidades" element={<PassoUnidades />} />
        <Route path="/inscricao/revisao" element={<PassoRevisao />} />
        <Route path="/inscricao/confirmacao/:codigo" element={<Confirmacao />} />
        <Route path="/acompanhar" element={<Acompanhar />} />
        <Route path="/acompanhar/:codigo" element={<Acompanhar />} />
        <Route path="*" element={<NaoEncontrado />} />
      </Routes>
    </ToastProvider>
  );
}
