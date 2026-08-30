import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import './styles/index.css';
import { App } from './App';
import { RascunhoProvider } from './store/rascunho';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <RascunhoProvider>
        <App />
      </RascunhoProvider>
    </BrowserRouter>
  </StrictMode>,
);
