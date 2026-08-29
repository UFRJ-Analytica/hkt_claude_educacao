import type { ReactNode } from 'react';
import type { Capability, SchoolMetric } from './api/types';
import { INDICATORS, type Attention } from './domain/indicators';

export function Sparkline({
  series,
  level,
  width = 66,
  height = 20,
  domain,
}: {
  series: number[] | null | undefined;
  level: Attention;
  width?: number;
  height?: number;
  /** Domínio compartilhado pela coluna: sem ele, cada linha se auto-escala e
   *  ruído vira sinal. Pequenos múltiplos só comparam sob a mesma escala. */
  domain?: [number, number];
}) {
  if (!series || series.length < 2) {
    return (
      <span
        className="blockcell"
        style={{ width, height: 8 }}
        title="Série temporal não faz parte do contrato atual do backend"
      />
    );
  }
  const min = domain ? domain[0] : Math.min(...series);
  const max = domain ? domain[1] : Math.max(...series);
  const span = max - min || 1;
  const pts = series
    .map((v, i) => {
      const x = 1 + (i / (series.length - 1)) * (width - 2);
      const y = height - 3 - ((v - min) / span) * (height - 6);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
  const stroke =
    level === 'critical'
      ? 'var(--a3)'
      : level === 'attention'
        ? 'var(--a2)'
        : level === 'low' || level === 'degraded'
          ? 'var(--a1)'
          : 'var(--ink-3)';
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <polyline points={pts} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function CoverageTicks({ ratio }: { ratio: number }) {
  const filled = Math.round(ratio * 5);
  const warn = ratio < 0.8;
  return (
    <span className="covtick" title={`cobertura ${(ratio * 100).toFixed(0)}%`}>
      {[4, 6, 8, 10, 12].map((h, i) => (
        <i key={h} className={i < filled ? (warn ? 'warn' : 'on') : ''} style={{ height: h }} />
      ))}
    </span>
  );
}

export function MetricCell({ metric }: { metric: SchoolMetric | undefined }) {
  if (!metric || metric.value === null || metric.quality_status === 'BLOCKED') {
    return <span className="blockcell" title="Sem leitura: cobertura abaixo do limiar" />;
  }
  const spec = INDICATORS[metric.indicator_id];
  const level = attention(metric);
  const [min, max] = spec.scale;
  const w = Math.max(0, Math.min(1, (metric.value - min) / (max - min))) * 100;
  return (
    <span className="cell">
      <span className={`num${level === 'critical' ? ' worse' : level === 'attention' ? ' bad' : level === 'none' ? ' mut' : ''}`}>
        {spec.format(metric.value)}
      </span>
      <span className="bar">
        <i className={level} style={{ width: `${w}%` }} />
      </span>
    </span>
  );
}

function attention(metric: SchoolMetric): Attention {
  if (metric.quality_status === 'BLOCKED' || metric.value === null) return 'unreadable';
  if (metric.quality_status === 'DEGRADED') return 'degraded';
  const spec = INDICATORS[metric.indicator_id];
  const [t1, t2, t3] = spec.thresholds;
  const v = metric.value;
  if (spec.worse === 'low') {
    if (v < t3) return 'critical';
    if (v < t2) return 'attention';
    if (v < t1) return 'low';
    return 'none';
  }
  if (v > t3) return 'critical';
  if (v > t2) return 'attention';
  if (v > t1) return 'low';
  return 'none';
}

export function CapabilityState({ capability, screen }: { capability?: Capability; screen: string }) {
  const status = capability?.status ?? 'UNAVAILABLE';
  const copy: Record<string, { title: string; body: string }> = {
    SCHEMA_ONLY: {
      title: 'A estrutura é conhecida. As linhas não chegaram.',
      body: 'O schema deste domínio está mapeado, mas nenhuma linha de dado está disponível. Não há gráfico nem valor nesta tela — inventar um número aqui seria o erro que este produto existe para evitar.',
    },
    UNAVAILABLE: {
      title: 'Esta capacidade não tem pré-requisito atendido.',
      body: 'A fonte ainda não foi confirmada, ou a base legal e a cobertura não foram verificadas. A rota continua acessível por link direto para explicar o que falta, em vez de devolver um erro genérico.',
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

export function Section({ children }: { children: ReactNode }) {
  return <div className="pad">{children}</div>;
}
