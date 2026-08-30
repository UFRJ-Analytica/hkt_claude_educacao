import type { ReactNode } from 'react';
import type { Capability } from './api/types';

/**
 * O que sobrou de compartilhado depois da limpeza: os estados que a interface
 * precisa saber declarar. Sparkline, célula de métrica e barra de cobertura
 * foram embora com os indicadores sintéticos que existiam para alimentá-las.
 */

export function CapabilityState({ capability, screen }: { capability?: Capability; screen: string }) {
  const status = capability?.status ?? 'UNAVAILABLE';
  const copy: Record<string, { title: string; body: string }> = {
    SCHEMA_ONLY: {
      title: 'A estrutura é conhecida. As linhas não chegaram.',
      body: 'O schema deste domínio está mapeado, mas nenhuma linha de dado está conectada. Não há número nesta tela — inventar um aqui seria o erro que este produto existe para evitar.',
    },
    UNAVAILABLE: {
      title: 'Esta capacidade não tem pré-requisito atendido.',
      body: 'A fonte ainda não foi confirmada, ou a base legal e a cobertura não foram verificadas. A rota continua acessível para explicar o que falta, em vez de devolver um erro genérico.',
    },
    DISABLED: {
      title: 'Módulo desabilitado por configuração.',
      body: 'Alguém decidiu explicitamente remover este domínio da composição. Não é ausência de dado — é decisão de configuração, e as duas coisas não devem parecer a mesma na interface.',
    },
    DEGRADED: {
      title: 'Operação parcial.',
      body: 'A capacidade responde, mas com limitações declaradas. Leia os valores com a cobertura ao lado.',
    },
  };
  const text = copy[status] ?? copy.UNAVAILABLE;
  return (
    <div className="statepage">
      <div className="k">
        {screen} · <span className={`tag ${status}`}>{status}</span>
      </div>
      <h2>{text.title}</h2>
      <p>{text.body}</p>
      {capability?.limitations?.length ? (
        <ul>
          {capability.limitations.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function Loading({ label = 'carregando' }: { label?: string }) {
  return <div className="loading">{label}…</div>;
}

export function Offline({ base }: { base: string }) {
  return (
    <div className="statepage">
      <div className="k">
        conexão · <span className="tag UNAVAILABLE">OFFLINE</span>
      </div>
      <h2>A API não respondeu.</h2>
      <p>
        A interface não substitui o backend por dado local. Suba a API em <span className="mono">{base}</span> e
        recarregue.
      </p>
    </div>
  );
}

export function Section({ children }: { children: ReactNode }) {
  return <div className="pad">{children}</div>;
}
