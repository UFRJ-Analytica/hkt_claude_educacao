import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { PERIOD_LABEL, getSkillMatrix, type MatrixScope } from '../api/turmas';
import { SKILL_MASTERY } from '../domain/indicators';
import type { Attention } from '../domain/indicators';
import type { SkillCell } from '../api/types';
import {
  Brief,
  DerivedNote,
  EmptyState,
  FilterBar,
  FilterControl,
  Footnote,
  Legend,
  Loading,
  Mono,
  NoReading,
  Num,
  Pad,
  RowIdentity,
} from '../components';

/**
 * Limiares da matriz: distância em pontos percentuais para a média da rede NO
 * MESMO descritor. Publicados na legenda.
 *
 * Por que relativo e não absoluto: a dificuldade varia muito entre descritores.
 * Um descritor em que a rede inteira acerta 35% não é problema de escola, é
 * problema de currículo — e colorir tudo de vermelho esconde exatamente a
 * turma que está pior que suas pares na mesma habilidade. A linha "média do
 * recorte", no rodapé da tabela, é onde a fragilidade absoluta aparece.
 */
const GAP_THRESHOLDS: [number, number, number] = [-0.03, -0.08, -0.15];

function levelForGap(gap: number | null): Attention {
  if (gap === null) return 'unreadable';
  const [t1, t2, t3] = GAP_THRESHOLDS;
  if (gap < t3) return 'critical';
  if (gap < t2) return 'attention';
  if (gap < t1) return 'low';
  return 'none';
}

/**
 * Matriz de recomposição — a devolutiva da avaliação diagnóstica virando decisão.
 *
 * Linhas mudam com o recorte: CREs na rede, escolas dentro de uma CRE, turmas
 * dentro de uma escola. Colunas são sempre os descritores.
 *
 * A cor da célula é ATENÇÃO, não desempenho: acerto baixo é o que pede
 * recomposição. Célula suprimida não tem cor nem número — hachura, como em todo
 * o resto do produto.
 */
export default function Recomposicao() {
  const [params, setParams] = useSearchParams();
  const [pick, setPick] = useState<string | null>(null);

  const cre = params.get('cre') ? Number(params.get('cre')) : null;
  const schoolId = params.get('escola');

  const scope: MatrixScope = schoolId
    ? { type: 'SCHOOL', schoolId }
    : cre
      ? { type: 'CRE', cre }
      : { type: 'NETWORK' };

  const matrix = useQuery({
    queryKey: ['skills', scope.type, cre, schoolId],
    queryFn: () => getSkillMatrix(scope),
  });

  const byKey = useMemo(() => {
    const m = new Map<string, SkillCell>();
    for (const c of matrix.data?.cells ?? []) m.set(`${c.scope_id}|${c.skill_id}`, c);
    return m;
  }, [matrix.data]);

  if (matrix.isLoading) return <Loading label="montando matriz" />;

  // Unidade fora da ADR devolve null. Isso não é erro nem ausência de leitura:
  // é inaplicabilidade, e a tela precisa dizer qual das duas é — senão fica
  // carregando para sempre, que é o pior dos três estados.
  if (!matrix.data) {
    return (
      <EmptyState
        // O segundo parágrafo viaja em `action` porque `body` do kit rende um
        // `<p>` só, e `<p>` dentro de `<p>` é aninhamento inválido. A ordem no
        // DOM sai idêntica à de antes: `.k`, `h2`, `p`, `p`, `.btn`.
        action={
          <>
            <p>
              Para educação infantil, o que se acompanha é acesso, demanda, frequência, infraestrutura e
              território — não acerto por habilidade.
            </p>
            <button type="button" className="btn" style={{ maxWidth: 260 }} onClick={() => setParams({})}>
              Voltar para a rede
            </button>
          </>
        }
        body={
          <>
            A Atividade Diagnóstica em Rede cobre do 1º ao 9º ano do Ensino Fundamental. Creche, EDI,
            Clube Escolar, Núcleo de Arte e Biblioteca Escolar não fazem a avaliação — não existe matriz
            de descritores para elas, e exibir uma vazia sugeriria que o dado deveria estar lá.
          </>
        }
        eyebrow="recomposição"
        title="Esta unidade não participa da avaliação diagnóstica."
      />
    );
  }
  const data = matrix.data;

  /** Média por descritor no recorte — mostra qual habilidade é a mais frágil. */
  const skillMeans = data.skills.map((s) => {
    const vals = data.cells
      .filter((c) => c.skill_id === s.skill_id && c.value !== null)
      .map((c) => c.value!);
    return {
      skill: s,
      mean: vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null,
      readable: vals.length,
    };
  });
  const weakest = [...skillMeans]
    .filter((x) => x.mean !== null)
    .sort((a, b) => a.mean! - b.mean!)[0];

  const meanBySkill = new Map(skillMeans.map((s) => [s.skill.skill_id, s.mean]));
  const suppressedCells = data.cells.filter((c) => c.suppressed).length;
  const subjects = [...new Set(data.skills.map((s) => s.subject))];

  return (
    <div>
      <FilterBar
        right={`${data.rows.length} linhas · ${data.skills.length} descritores · ${suppressedCells} células suprimidas`}
      >
        <FilterControl label="Recorte">{data.scope.label}</FilterControl>
        <FilterControl label="Período">{PERIOD_LABEL}</FilterControl>
        {(cre || schoolId) && (
          <button
            type="button"
            className="linkish"
            style={{ textTransform: 'none', fontSize: 12.5 }}
            onClick={() => setParams({})}
          >
            ← voltar para a rede
          </button>
        )}
      </FilterBar>

      {data.origin === 'api' ? (
        <DerivedNote variant="governed">
          <b>Matriz governada pelo backend.</b> As células vêm de{' '}
          <Mono>GET /api/v1/schools/{'{id}'}/skills</Mono>, com supressão e{' '}
          <Mono>evidence_id</Mono> declarados por célula.
        </DerivedNote>
      ) : (
        <DerivedNote variant="bar">
          <b>Fixture do contrato.</b> O contrato de turma e{' '}
          <Mono>skill_mastery_rate</Mono> já existem no backend, mas o release atual
          ainda não tem asset granular de turma e habilidade — o endpoint responde 404 sanitizado.
          {data.scope.type !== 'SCHOOL' &&
            ' O rollup por rede e por CRE também segue derivado: o contrato governado cobre o recorte de escola.'}{' '}
          As formas aqui são as do contrato: quando o dado entrar, muda a origem, não a tela.
        </DerivedNote>
      )}

      {weakest && (
        // `.pad` declara `padding` de uma vez e está fora de camada — sem `!` a
        // utilitária de zerar o rodapé perderia para a abreviação.
        <Pad className="pb-0!">
          <Brief
            eyebrow="o que a matriz diz"
            headline={
              <>
                {weakest.skill.skill_label} é o descritor mais frágil do recorte, com{' '}
                {SKILL_MASTERY.format(weakest.mean!)} de acerto.
              </>
            }
            lede={
              <>
                Acerto por descritor não é nota de estudante, não é avaliação de professor e não deve virar
                ranking de turma. É insumo para decidir onde a recomposição entra primeiro — e a coluna
                fraca costuma indicar lacuna de ensino, não de esforço.
              </>
            }
          />
        </Pad>
      )}

      {/* O mapa de calor segue à mão, e de propósito. O cabeçalho é de dois
          níveis (`colSpan` por disciplina, `rowSpan` na identidade e na média),
          coisa que o modelo de coluna do `DataTable` não expressa; e a rampa
          divergente das células (`#dfe8f3`, `#c9d6e6`, `--a3`) não tem
          equivalente em token. Só as legendas ao redor viraram kit. */}
      <div className="tblwrap" style={{ marginTop: 22 }}>
        <table className="m matrix">
          <thead>
            <tr>
              <th rowSpan={2}>{data.scope.type === 'SCHOOL' ? 'Turma' : data.scope.type === 'CRE' ? 'Unidade' : 'Coordenadoria'}</th>
              {subjects.map((sub) => (
                <th
                  key={sub}
                  colSpan={data.skills.filter((s) => s.subject === sub).length}
                  className="subjhead"
                >
                  {sub}
                </th>
              ))}
              <th rowSpan={2}>Média</th>
            </tr>
            <tr>
              {data.skills.map((s) => (
                <th key={s.skill_id} className="skillhead" title={s.skill_label}>
                  <span>{s.skill_label}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row) => {
              const rowCells = data.skills.map((s) => byKey.get(`${row.id}|${s.skill_id}`));
              const vals = rowCells.filter((c) => c && c.value !== null).map((c) => c!.value!);
              const mean = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
              const drillable = data.scope.type !== 'SCHOOL';
              return (
                <tr key={row.id} className={pick === row.id ? 'focus' : ''}>
                  <td>
                    <RowIdentity
                      drillable={drillable}
                      onClick={() => {
                        if (!drillable) {
                          setPick(pick === row.id ? null : row.id);
                          return;
                        }
                        if (data.scope.type === 'NETWORK') setParams({ cre: row.id });
                        else setParams({ cre: String(cre), escola: row.id });
                      }}
                      sub={row.sublabel}
                      title={row.label}
                    />
                  </td>
                  {rowCells.map((c, i) => {
                    const skill = data.skills[i];
                    if (!c || c.suppressed) {
                      return (
                        <td key={skill.skill_id} className="cellbox">
                          <NoReading
                            reason={
                              c?.suppression_reason === 'SMALL_GROUP'
                                ? `Suprimida: menos de ${data.privacy_min_unit_count} estudantes avaliados`
                                : 'Sem leitura'
                            }
                            shape="block"
                          />
                        </td>
                      );
                    }
                    const netMean = meanBySkill.get(skill.skill_id) ?? null;
                    const gap = netMean === null ? null : c.value! - netMean;
                    const lvl = levelForGap(gap);
                    return (
                      <td
                        key={skill.skill_id}
                        className={`cellbox lv-${lvl}`}
                        title={`${skill.skill_label}: ${SKILL_MASTERY.format(c.value!)}${
                          gap === null
                            ? ''
                            : ` · ${gap >= 0 ? '+' : ''}${(gap * 100).toFixed(1).replace('.', ',')} pp vs média da rede`
                        }`}
                      >
                        <span className="cv">{Math.round(c.value! * 100)}</span>
                      </td>
                    );
                  })}
                  <td>
                    <Num tone="mut">{mean === null ? '—' : SKILL_MASTERY.format(mean)}</Num>
                  </td>
                </tr>
              );
            })}
            <tr className="meanrow">
              <td>
                <Mono className="text-[11px] text-ink-3">média do recorte</Mono>
              </td>
              {skillMeans.map((s) => (
                <td key={s.skill.skill_id} className="cellbox">
                  <Mono className="text-[11px] text-ink-2">
                    {s.mean === null ? '—' : Math.round(s.mean * 100)}
                  </Mono>
                </td>
              ))}
              <td />
            </tr>
          </tbody>
        </table>
      </div>

      <Pad className="pt-[22px]!">
        <Legend
          className="matrixlegend"
          items={[
            { swatch: 'square', swatchClassName: 'lv-none', label: 'sem sinal' },
            { swatch: 'square', swatchClassName: 'lv-low', label: 'baixa' },
            { swatch: 'square', swatchClassName: 'lv-attention', label: 'atenção' },
            { swatch: 'square', swatchClassName: 'lv-critical', label: 'crítico' },
            { swatch: 'hatch', swatchClassName: 'hatchcell', label: 'suprimida' },
          ]}
          rule={
            <>
              A cor é a distância para a média da rede no mesmo descritor · sem sinal ≥ −3 pp · baixa &lt; −3 pp ·
              atenção &lt; −8 pp · crítico &lt; −15 pp. O número é o acerto.
            </>
          }
        />
        <Footnote>
          {data.limitations.map((l) => (
            <span key={l} style={{ display: 'block', marginBottom: 4 }}>
              {l}
            </span>
          ))}
        </Footnote>
      </Pad>
    </div>
  );
}
