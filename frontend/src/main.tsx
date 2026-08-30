import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { RoleProvider } from './roles';
import './styles/index.css';

const client = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000, retry: 0, refetchOnWindowFocus: false } },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <RoleProvider>
          <App />
        </RoleProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
