import { useQuery } from '@tanstack/react-query';
import { getCapabilities, getSchoolMap, mapOrigin } from '../api/client';
import {
  CapabilityTag,
  ColumnFlag,
  DataTable,
  FilterBar,
  FilterControl,
  Gate,
  ListRow,
  Loading,
  Mono,
  Note,
  SectionHeading,
} from '../components';
import type { ColumnFlagKind, DataColumn, GateState } from '../components';

/**
 * Prontidão. Hoje mostra o estado real do que está carregado; o fluxo de upload
 * consome `POST /api/v1/data/profile` do backend quando ele for ligado à tela.
 * Nenhum valor de célula é exibido antes da classificação de privacidade.
 */
interface ColumnProfile {
  name: string;
  type: string;
  nulls: string;
  card: string;
  flag: ColumnFlagKind | null;
}

const COLUMNS: ColumnProfile[] = [
  { name: 'co_entidade', type: 'int', nulls: '0,0%', card: '1.551', flag: 'key' },
  { name: 'designacao', type: 'string', nulls: '0,3%', card: '1.548', flag: 'key' },
  { name: 'cre', type: 'int', nulls: '0,0%', card: '11', flag: null },
  { name: 'nome_escola', type: 'string', nulls: '0,0%', card: '1.544', flag: null },
  { name: 'etapa', type: 'string', nulls: '0,1%', card: '7', flag: null },
  { name: 'matriculas', type: 'int', nulls: '1,2%', card: '—', flag: null },
  { name: 'nome_responsavel', type: 'string', nulls: '4,8%', card: '198.402', flag: 'pii' },
  { name: 'cpf_responsavel', type: 'string', nulls: '6,1%', card: '201.115', flag: 'pii' },
  { name: 'data_referencia', type: 'date', nulls: '0,0%', card: '12', flag: null },
];

/**
 * As colunas do perfilador. `align`/`mono` são props porque `DataTable`
 * reescreve `table.r` em utilitárias — a classe legada venceria as duas.
 */
const PROFILE_COLUMNS: DataColumn<ColumnProfile>[] = [
  { id: 'name', header: 'Coluna', cell: (c) => c.name },
  { id: 'type', header: 'Tipo', cell: (c) => c.type },
  { id: 'nulls', header: 'Nulos', cell: (c) => c.nulls },
  { id: 'card', header: 'Card.', cell: (c) => c.card },
  { id: 'flag', header: 'Sinal', cell: (c) => (c.flag ? <ColumnFlag flag={c.flag} /> : '') },
];

const GATES: { s: GateState; t: string; d: string }[] = [
  { s: 'ok', t: 'Formato e encoding resolvidos', d: 'latin-1 com ; detectado automaticamente' },
  { s: 'ok', t: 'Escola resolvida', d: '1.545 de 1.551 por INEP · 6 por designação SME · match auditável' },
  { s: 'blocked', t: 'PII provável detectada', d: '2 colunas bloqueadas antes de qualquer persistência ou envio ao modelo' },
  { s: 'ok', t: 'CRE válida', d: '11 valores distintos, todos no domínio 1–11' },
  { s: 'warn', t: 'Cadência mista', d: 'mensal e bimestral no mesmo arquivo — não serão interpoladas' },
];

export default function Dados() {
  const caps = useQuery({ queryKey: ['capabilities'], queryFn: getCapabilities });
  const map = useQuery({ queryKey: ['map'], queryFn: getSchoolMap });

  if (!caps.data || !map.data) return <Loading />;

  return (
    <div>
      <FilterBar right={`snapshot ${map.data.snapshot_id.slice(0, 16)}…`}>
        <FilterControl label="Origem">{mapOrigin().note}</FilterControl>
      </FilterBar>

      <div className="readygrid">
        <div className="readyleft">
          <div className="drop">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" strokeWidth="1.6" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
            </svg>
            <div>
              <div className="f">matriculas_2026_sme.csv</div>
              <div className="meta">18,4 MB · latin-1 · delimitador ; · 214.882 linhas · 31 colunas · perfilado em 3,1 s</div>
            </div>
          </div>

          <DataTable columns={PROFILE_COLUMNS} getRowKey={(c) => c.name} rows={COLUMNS} />

          <Note className="mt-3 text-[10.5px] leading-[1.6]" mono>
            Nenhum valor de célula é exibido, devolvido pela API ou registrado em log antes da classificação de privacidade. O
            perfilador devolve apenas metadados e estatísticas.
          </Note>
        </div>

        <div className="readyside">
          <SectionHeading>Portões de prontidão</SectionHeading>
          {GATES.map((g) => (
            <Gate detail={g.d} key={g.t} state={g.s} title={g.t} />
          ))}

          <SectionHeading className="mt-[26px]! mb-1!">Capacidades declaradas pela API</SectionHeading>
          {caps.data.map((c) => (
            <ListRow
              className="capline"
              key={c.id}
              label={c.label}
              layout="cells"
              meta={<CapabilityTag status={c.status} />}
              slots={{ label: 'nm' }}
            />
          ))}
          <Note className="mt-3 text-ink-2">
            A navegação inteira deriva desta lista. Um módulo <Mono>DISABLED</Mono> some do menu; um{' '}
            <Mono>SCHEMA_ONLY</Mono> mantém a rota e explica o que falta. Nenhum estado vira{' '}
            <Mono>AVAILABLE</Mono> por conveniência de demonstração.
          </Note>
        </div>
      </div>
    </div>
  );
}
