import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';
import { getByGrade, getFlow, getStaffingGap } from '../api/pipeline';
import { Loading } from '../components';

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

const pct = (v: number) => `${(v * 100).toFixed(1).replace('.', ',')}%`;
const int = (v: number) => v.toLocaleString('pt-BR');

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

  // a transição: o 6º ano é o índice 5
  const g = grade.data.rows;
  const iniciais = g.slice(0, 5);
  const finais = g.slice(5);
  const mean = (arr: typeof g, pick: (r: (typeof g)[number]) => number) =>
    arr.reduce((a, r) => a + pick(r), 0) / arr.length;
  const quedaNota = mean(iniciais, (r) => r.subject_grade_mean) - mean(finais, (r) => r.subject_grade_mean);

  return (
    <div>
      <div className="filterbar">
        <span className="ctl">
          <span>Recorte</span>
          <select
            value={cre ?? ''}
            onChange={(e) => setParams(e.target.value ? { cre: e.target.value } : {})}
          >
            <option value="">rede municipal</option>
            {cres.map((c) => (
              <option key={c} value={c}>
                {c}ª CRE
              </option>
            ))}
          </select>
        </span>
        <span className="right">
          {int(f.rows.length)} unidades de ensino fundamental · creches, EDIs e demais equipamentos ficam fora
        </span>
      </div>

      <div className="derived">
        <b>Sintético nos schemas do pipeline da SME.</b> Fluxo vem de{' '}
        <span className="mono">movimentacao</span>, carência de{' '}
        <span className="mono">disciplinas_sem_professor</span>, aula perdida de{' '}
        <span className="mono">id_situacao</span> em{' '}
        <span className="mono">frq_frequencia</span>. As formas são as reais — quando o dado do
        briefing entrar, muda a origem, não a tela.
      </div>

      <div className="pad">
        {/* ---------- 1. fluxo de matrícula ---------- */}
        <section className="fluxosec">
          <div className="when">01 · para onde o aluno vai</div>
          <h2 className="fluxoh">
            {f.totals.saldo < 0 ? 'Saldo negativo de' : 'Saldo de'} {int(Math.abs(f.totals.saldo))}{' '}
            matrículas {f.scope_label === 'rede municipal' ? 'na rede' : `na ${f.scope_label}`}.
          </h2>
          <p className="fluxop">
            Abandono é medida de estoque. Movimentação é fluxo — e separa transferência dentro da rede,
            que é problema de atratividade ou território, de saída para fora, que é outro problema.
          </p>

          <div className="statline">
            <div className="st">
              <div className="k">Entradas</div>
              <div className="v">{int(f.totals.entradas)}</div>
            </div>
            <div className="st">
              <div className="k">Saída interna</div>
              <div className="v">
                {int(f.totals.saidas_internas)} <em>outra unidade da rede</em>
              </div>
            </div>
            <div className="st">
              <div className="k">Saída externa</div>
              <div className="v">
                {int(f.totals.saidas_externas)} <em className="bad">fora da rede</em>
              </div>
            </div>
            <div className="st">
              <div className="k">Trajetória interrompida</div>
              <div className="v">
                {int(f.totals.trajetorias_interrompidas)} <em>3+ movimentações</em>
              </div>
            </div>
          </div>

          <div className="tblwrap" style={{ marginTop: 20 }}>
            <table className="m">
              <thead>
                <tr>
                  <th>Unidade com maior saída líquida</th>
                  <th>Matrícula</th>
                  <th>Entradas</th>
                  <th>Saída interna</th>
                  <th>Saída externa</th>
                  <th>Saldo</th>
                  <th>Trajetória interrompida</th>
                </tr>
              </thead>
              <tbody>
                {worst.map((r) => (
                  <tr key={r.scope_id}>
                    <td>
                      <Link className="creid" to={`/escola/${r.scope_id}`}>
                        <b>{r.scope_label}</b>
                        <span>{r.cre}ª CRE</span>
                      </Link>
                    </td>
                    <td><span className="num mut">{int(r.matricula_base)}</span></td>
                    <td><span className="num mut">+{int(r.entradas)}</span></td>
                    <td><span className="num mut">−{int(r.saidas_internas)}</span></td>
                    <td><span className="num bad">−{int(r.saidas_externas)}</span></td>
                    <td><span className="num worse">{r.saldo}</span></td>
                    <td><span className="num">{int(r.trajetorias_interrompidas)}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="seclimit">
            {f.limitations.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </p>
        </section>

        {/* ---------- 2. carência × aula perdida ---------- */}
        <section className="fluxosec">
          <div className="when">02 · onde a falta de professor custa aula</div>
          <h2 className="fluxoh">
            {gap.data.rows[0].disciplina} concentra a maior carência, com {pct(gap.data.rows[0].taxa_carencia)}{' '}
            das horas sem professor.
          </h2>
          <p className="fluxop">
            As duas séries abaixo <b>coincidem</b> no recorte. O dado disponível não estabelece direção
            causal entre carência e cancelamento — e a tela não afirma que estabelece.
          </p>

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
            <div className="gaplegend">
              <span><i className="car" />horas sem professor</span>
              <span><i className="can" />aulas canceladas</span>
            </div>
          </div>
          <p className="seclimit">
            {gap.data.limitations.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </p>
        </section>

        {/* ---------- 3. corte por ano ---------- */}
        <section className="fluxosec">
          <div className="when">03 · onde a curva quebra</div>
          <h2 className="fluxoh">
            A nota média cai {quedaNota.toFixed(1).replace('.', ',')} ponto entre os anos iniciais e os
            finais, e a maior queda está na entrada do 6º ano.
          </h2>
          <p className="fluxop">
            É a dor que a própria Secretaria expõe: IDEB dos anos iniciais subindo, anos finais parado.
            A transição do 5º para o 6º é onde a mudança de regime acontece — mais professores, mais
            disciplinas, outra rotina.
          </p>

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
          <div className="gradekey">
            <span>barra: frequência (escala 85–98%)</span>
            <span>número: nota média do COC, 0–10</span>
            <span>abaixo: saída externa</span>
            <span className="tr">coluna destacada: entrada dos anos finais</span>
          </div>
          <p className="seclimit">
            {grade.data.limitations.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </p>
        </section>
      </div>
    </div>
  );
}
