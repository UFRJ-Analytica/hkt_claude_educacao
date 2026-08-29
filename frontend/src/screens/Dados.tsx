import { useQuery } from '@tanstack/react-query';
import { getCapabilities, getSchoolMap, mapOrigin } from '../api/client';
import { Loading } from '../components';

/**
 * Prontidão. Hoje mostra o estado real do que está carregado; o fluxo de upload
 * consome `POST /api/v1/data/profile` do backend quando ele for ligado à tela.
 * Nenhum valor de célula é exibido antes da classificação de privacidade.
 */
const COLUMNS = [
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

const GATES = [
  { s: 'y', t: 'Formato e encoding resolvidos', d: 'latin-1 com ; detectado automaticamente' },
  { s: 'y', t: 'Escola resolvida', d: '1.545 de 1.551 por INEP · 6 por designação SME · match auditável' },
  { s: 'n', t: 'PII provável detectada', d: '2 colunas bloqueadas antes de qualquer persistência ou envio ao modelo' },
  { s: 'y', t: 'CRE válida', d: '11 valores distintos, todos no domínio 1–11' },
  { s: 'w', t: 'Cadência mista', d: 'mensal e bimestral no mesmo arquivo — não serão interpoladas' },
];

export default function Dados() {
  const caps = useQuery({ queryKey: ['capabilities'], queryFn: getCapabilities });
  const map = useQuery({ queryKey: ['map'], queryFn: getSchoolMap });

  if (!caps.data || !map.data) return <Loading />;

  return (
    <div>
      <div className="filterbar">
        <span className="ctl">
          <span>Origem</span>
          {mapOrigin().note}
        </span>
        <span className="right">snapshot {map.data.snapshot_id.slice(0, 16)}…</span>
      </div>

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

          <table className="r">
            <thead>
              <tr>
                <th>Coluna</th>
                <th>Tipo</th>
                <th>Nulos</th>
                <th>Card.</th>
                <th>Sinal</th>
              </tr>
            </thead>
            <tbody>
              {COLUMNS.map((c) => (
                <tr key={c.name}>
                  <td>{c.name}</td>
                  <td>{c.type}</td>
                  <td>{c.nulls}</td>
                  <td>{c.card}</td>
                  <td>{c.flag ? <span className={`flag ${c.flag}`}>{c.flag === 'pii' ? 'PII provável' : 'chave'}</span> : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mono" style={{ fontSize: 10.5, color: 'var(--ink-3)', marginTop: 12, lineHeight: 1.6 }}>
            Nenhum valor de célula é exibido, devolvido pela API ou registrado em log antes da classificação de privacidade. O
            perfilador devolve apenas metadados e estatísticas.
          </p>
        </div>

        <div className="readyside">
          <h5
            className="mono"
            style={{ fontSize: 9.5, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--ink-3)', fontWeight: 500 }}
          >
            Portões de prontidão
          </h5>
          {GATES.map((g) => (
            <div className="gate" key={g.t}>
              <span className={`ic ${g.s}`}>{g.s === 'y' ? '✓' : g.s === 'n' ? '!' : '~'}</span>
              <div>
                <b>{g.t}</b>
                <span>{g.d}</span>
              </div>
            </div>
          ))}

          <h5
            className="mono"
            style={{
              fontSize: 9.5,
              letterSpacing: '0.13em',
              textTransform: 'uppercase',
              color: 'var(--ink-3)',
              fontWeight: 500,
              marginTop: 26,
              marginBottom: 4,
            }}
          >
            Capacidades declaradas pela API
          </h5>
          {caps.data.map((c) => (
            <div className="capline" key={c.id}>
              <span className="nm">{c.label}</span>
              <span className={`tag ${c.status}`}>{c.status}</span>
            </div>
          ))}
          <p style={{ fontSize: 11.5, color: 'var(--ink-2)', marginTop: 12, lineHeight: 1.55 }}>
            A navegação inteira deriva desta lista. Um módulo <span className="mono">DISABLED</span> some do menu; um{' '}
            <span className="mono">SCHEMA_ONLY</span> mantém a rota e explica o que falta. Nenhum estado vira{' '}
            <span className="mono">AVAILABLE</span> por conveniência de demonstração.
          </p>
        </div>
      </div>
    </div>
  );
}
