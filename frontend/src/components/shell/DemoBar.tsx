import type React from 'react';
import { Alert } from '@/components/ui/alert';

export interface DemoBarProps {
  /** O cadastro oficial está carregado, mesmo sem nenhum indicador real. */
  registryReal: boolean;
}

/** O trecho monoespaçado que nomeia capacidades da API, como no `.demobar .mono`. */
const CAP = 'font-mono text-[11px] tabular-nums';

/**
 * Aviso global de indicador sintético.
 *
 * A redação é a divulgação de honestidade do produto e não pode ser reescrita:
 * ela nomeia as capacidades exatas que a API declara como `SCHEMA_ONLY` e separa
 * o que é real (cadastro) do que é sintético (número). O fundo quente e a
 * borda são literais herdados — não são tokens porque não descrevem dado,
 * descrevem um aviso, e criar token para eles espalharia a cor sem contrato.
 */
export function DemoBar({ registryReal }: DemoBarProps): React.ReactElement {
  return (
    <Alert className="block rounded-none border-0 border-b border-b-[#e6d8cd] bg-[#fbf6f2] px-[var(--pad-x)] py-[9px] text-[12px] leading-[1.55] text-ink-2">
      <b className="font-semibold text-attn-3">Indicadores em modo demonstração.</b> A API declara{' '}
      <span className={CAP}>network</span>, <span className={CAP}>learning</span>,{' '}
      <span className={CAP}>attendance</span>, <span className={CAP}>capacity</span> e{' '}
      <span className={CAP}>staffing</span> como <span className={CAP}>SCHEMA_ONLY</span> — não há
      indicador real carregado.
      {registryReal
        ? ' Identidade, CRE, tipo e coordenada das escolas são reais (Data.Rio/SME, CC-BY 4.0); os números exibidos são sintéticos.'
        : ' Tudo nesta tela é sintético.'}
    </Alert>
  );
}
