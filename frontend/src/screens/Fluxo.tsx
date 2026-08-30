import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getByGrade, getFlow, getStaffingGap, type FlowRow } from '../api/pipeline';
import { int, pct } from '../domain/format';
import { Brief, DataTable, DerivedNote, FilterBar, FilterControl, FilterSelect, Legend, Loading, Mono, Note, Num, Pad, RowIdentity, Stat, StatLine, type DataColumn } from '../components';

/**
 * Fluxo — onde a rede perde aluno, aula e aprendizagem.
 *
 * Três perguntas de gestão que os indicadores de estoque não respondem:
 *   1. estou perdendo aluno para onde?
 *   2. onde a falta de professor está custando aula?
 *   3. por que os anos finais não andam?
 *
 * As três usam dados do pipeline da SME, hoje sintéticos nas formas reais.
 */

/**
 * O `<select>` da régua de recorte, agora `Select` do coss.
 *
 * `.ctl select` casa com o ELEMENTO `select`, e o gatilho do coss é um
 * `<button>` — a classe legada não alcança. A geometria dela é reescrita aqui
 * em utilitária: peso 500, tinta `--ink`, sem fundo, sem borda exceto a régua
 * de 1px embaixo, respiro de 1px. O resto neutraliza o cartão que o gatilho
 * traz de fábrica (raio, anel, sombra, altura e largura mínimas).
 */

export default function Fluxo() {
  const [params, setParams] = useSearchParams();
  const cre = params.get('cre') ? Number(params.get('cre')) : null;

  const flow = useQuery({ queryKey: ['flow', cre], queryFn: () => getFlow(cre) });
  const gap = useQuery({ queryKey: ['gap', cre], queryFn: () => getStaffingGap(cre) });
  const grade = useQuery({ queryKey: ['bygrade', cre], queryFn: () => getByGrade(cre) });

  if (!flow.data || !gap.data || !grade.data) return <Loading label="montando fluxo" />;

  const f = flow.data;
  const worst = f.rows.slice(0, 8);
  const cres = [...new Set(f.rows.map((r) => r.cre))].sort((a, b) => a - b);

  // Os itens do recorte chegam prontos ao `Select`: com `items` declarado, o
  // gatilho mostra o rótulo do valor escolhido sem mapa paralelo na tela.
  const creItems = [
    { label: 'rede municipal', value: '' },
    ...cres.map((c) => ({ label: `${c}ª CRE`, value: String(c) })),
  ];

  // a transição: o 6º ano é o índice 5
  const g = grade.data.rows;
  const iniciais = g.slice(0, 5);
  const finais = g.slice(5);
  const mean = (arr: typeof g, pick: (r: (typeof g)[number]) => number) =>
    arr.reduce((a, r) => a + pick(r), 0) / arr.length;
  const quedaNota = mean(iniciais, (r) => r.subject_grade_mean) - mean(finais, (r) => r.subject_grade_mean);

  const flowColumns: DataColumn<FlowRow>[] = [
    {
      header: 'Unidade com maior saída líquida',
      cell: (r) => <RowIdentity as="link" sub={`${r.cre}ª CRE`} title={r.scope_label} to={`/escola/${r.scope_id}`} />,
    },
    { header: 'Matrícula', cell: (r) => <Num tone="mut">{int(r.matricula_base)}</Num> },
    { header: 'Entradas', cell: (r) => <Num tone="mut">+{int(r.entradas)}</Num> },
    { header: 'Saída interna', cell: (r) => <Num tone="mut">−{int(r.saidas_internas)}</Num> },
    { header: 'Saída externa', cell: (r) => <Num tone="bad">−{int(r.saidas_externas)}</Num> },
    { header: 'Saldo', cell: (r) => <Num tone="worse">{r.saldo}</Num> },
    {
      header: 'Trajetória interrompida',
      // O `td` do kit nasce em `--ink-2`; este número não tem tom e precisa
      // continuar na tinta cheia, como no legado.
      className: 'text-ink',
      cell: (r) => <Num>{int(r.trajetorias_interrompidas)}</Num>,
    },
  ];

  return (
    <div>
      <FilterBar
        right={`${int(f.rows.length)} unidades de ensino fundamental · creches, EDIs e demais equipamentos ficam fora`}
      >
        <FilterControl label="Recorte">
          <FilterSelect
            ariaLabel="Recorte"
            items={creItems}
            onValueChange={(v) => setParams(v ? { cre: v } : {})}
            value={cre ? String(cre) : ''}
          />
        </FilterControl>
      </FilterBar>

      <DerivedNote variant="bar">
        <b>Sintético nos schemas do pipeline da SME.</b> Fluxo vem de{' '}
        <Mono>movimentacao</Mono>, carência de{' '}
        <Mono>disciplinas_sem_professor</Mono>, aula perdida de{' '}
        <Mono>id_situacao</Mono> em{' '}
        <Mono>frq_frequencia</Mono>. As formas são as reais — quando o dado do
        briefing entrar, muda a origem, não a tela.
      </DerivedNote>

      <Pad>
        {/* ---------- 1. fluxo de matrícula ---------- */}
        <section className="fluxosec">
          <Brief
            eyebrow="01 · para onde o aluno vai"
            headline={
              <>
                {f.totals.saldo < 0 ? 'Saldo negativo de' : 'Saldo de'} {int(Math.abs(f.totals.saldo))}{' '}
                matrículas {f.scope_label === 'rede municipal' ? 'na rede' : `na ${f.scope_label}`}.
              </>
            }
            lede={
              <>
                Abandono é medida de estoque. Movimentação é fluxo — e separa transferência dentro da rede,
                que é problema de atratividade ou território, de saída para fora, que é outro problema.
              </>
            }
            size="section"
          />

          <StatLine variant="section">
            <Stat label="Entradas" value={int(f.totals.entradas)} />
            <Stat
              label="Saída interna"
              value={
                <>
                  {int(f.totals.saidas_internas)} <em>outra unidade da rede</em>
                </>
              }
            />
            <Stat
              label="Saída externa"
              value={
                <>
                  {int(f.totals.saidas_externas)} <em className="bad">fora da rede</em>
                </>
              }
            />
            <Stat
              label="Trajetória interrompida"
              value={
                <>
                  {int(f.totals.trajetorias_interrompidas)} <em>3+ movimentações</em>
                </>
              }
            />
          </StatLine>

          <div className="tblwrap" style={{ marginTop: 20 }}>
            <DataTable
              className="m"
              columns={flowColumns}
              getRowKey={(r) => r.scope_id}
              rows={worst}
            />
          </div>
          <Note className="seclimit">
            {f.limitations.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </Note>
        </section>

        {/* ---------- 2. carência × aula perdida ---------- */}
        <section className="fluxosec">
          <Brief
            eyebrow="02 · onde a falta de professor custa aula"
            headline={
              <>
                {gap.data.rows[0].disciplina} concentra a maior carência, com {pct(gap.data.rows[0].taxa_carencia)}{' '}
                das horas sem professor.
              </>
            }
            lede={
              <>
                As duas séries abaixo <b>coincidem</b> no recorte. O dado disponível não estabelece direção
                causal entre carência e cancelamento — e a tela não afirma que estabelece.
              </>
            }
            size="section"
          />

          {/* As barras duplas seguem à mão: a largura é amplificada em 260% de
              propósito, para que diferenças de meio ponto percentual apareçam.
              Não é medidor linear, e um `Meter` diria que é. */}
          <div className="gaptable">
            {gap.data.rows.map((r) => (
              <div className="gaprow" key={r.disciplina}>
                <span className="gd">{r.disciplina}</span>
                <span className="gt">{int(r.turmas_sem_professor)} turmas</span>
                <span className="gbars">
                  <span className="gbar">
                    <i className="car" style={{ width: `${Math.min(100, r.taxa_carencia * 260)}%` }} />
                  </span>
                  <span className="gbar">
                    <i className="can" style={{ width: `${Math.min(100, r.taxa_cancelamento * 260)}%` }} />
                  </span>
                </span>
                <span className="gv mono">{pct(r.taxa_carencia)}</span>
                <span className="gv mono bad">{pct(r.taxa_cancelamento)}</span>
              </div>
            ))}
            <Legend
              className="gaplegend"
              items={[
                { swatch: 'bar', swatchClassName: 'car', label: 'horas sem professor' },
                { swatch: 'bar', swatchClassName: 'can', label: 'aulas canceladas' },
              ]}
            />
          </div>
          <Note className="seclimit">
            {gap.data.limitations.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </Note>
        </section>

        {/* ---------- 3. corte por ano ---------- */}
        <section className="fluxosec">
          <Brief
            eyebrow="03 · onde a curva quebra"
            headline={
              <>
                A nota média cai {quedaNota.toFixed(1).replace('.', ',')} ponto entre os anos iniciais e os
                finais, e a maior queda está na entrada do 6º ano.
              </>
            }
            lede={
              <>
                É a dor que a própria Secretaria expõe: IDEB dos anos iniciais subindo, anos finais parado.
                A transição do 5º para o 6º é onde a mudança de regime acontece — mais professores, mais
                disciplinas, outra rotina.
              </>
            }
            size="section"
          />

          {/* A coluna de frequência tem domínio próprio (85–98%), publicado na
              legenda logo abaixo. Continua à mão porque a escala é a leitura. */}
          <div className="gradegrid">
            {g.map((r, i) => {
              const isTransition = i === 5;
              return (
                <div className={`gradecol${isTransition ? ' transition' : ''}`} key={r.grade}>
                  <div className="gl">{r.grade}</div>
                  <div className="gbarv" title={`Frequência ${pct(r.attendance_rate)}`}>
                    <i style={{ height: `${((r.attendance_rate - 0.85) / 0.13) * 100}%` }} />
                  </div>
                  <div className="gn mono">{r.subject_grade_mean.toFixed(1).replace('.', ',')}</div>
                  <div className="gs mono">{pct(r.external_exit_rate)}</div>
                </div>
              );
            })}
          </div>
          <Legend
            className="gradekey"
            items={[
              { swatch: 'none', label: 'barra: frequência (escala 85–98%)' },
              { swatch: 'none', label: 'número: nota média do COC, 0–10' },
              { swatch: 'none', label: 'abaixo: saída externa' },
              { swatch: 'none', className: 'tr', label: 'coluna destacada: entrada dos anos finais' },
            ]}
          />
          <Note className="seclimit">
            {grade.data.limitations.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </Note>
        </section>
      </Pad>
    </div>
  );
}
