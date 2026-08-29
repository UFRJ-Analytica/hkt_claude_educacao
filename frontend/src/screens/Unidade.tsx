import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getSchoolMap } from '../api/client';
import { INDICATORS, INDICATOR_ORDER, attentionOf, worstAttention } from '../domain/indicators';
import { Loading } from '../components';

/**
 * Visão de unidade. Serve a dois papéis ao mesmo tempo, e é isso que a torna
 * útil: o diretor vê a própria escola, e a Secretaria vê a dor consolidada de
 * qualquer escola sem precisar de outra ferramenta.
 *
 * Nada aqui produz nota de escola nem posição em ranking — é proibido pelas
 * regras de negócio e seria mal recebido pela rede.
 */

const PAIN_LABEL: Record<string, string> = {
  attendance_rate: 'Frequência abaixo do padrão da rede',
  teacher_shortage_rate: 'Carência docente acima do limiar',
  capacity_utilization: 'Ocupação acima da capacidade declarada',
  assessment_score: 'Desempenho abaixo da faixa dos pares',
};

export default function Unidade() {
  const map = useQuery({ queryKey: ['map'], queryFn: getSchoolMap });
  const [pick, setPick] = useState<string | null>(null);

  const list = useMemo(() => {
    const feats = map.data?.features ?? [];
    return [...feats]
      .map((f) => ({ f, w: worstAttention(f.properties.metrics) }))
      .sort((a, b) => {
        const rank = ['critical', 'attention', 'low', 'degraded', 'none'];
        return rank.indexOf(a.w) - rank.indexOf(b.w);
      })
      .slice(0, 200)
      .map((x) => x.f);
  }, [map.data]);

  if (!map.data) return <Loading />;

  const school = pick ? list.find((f) => f.properties.identity.school_id === pick) ?? list[0] : list[0];
  if (!school) return <Loading />;

  const p = school.properties;
  const pains = INDICATOR_ORDER.map((id) => ({ id, a: attentionOf(p.metrics[id]), m: p.metrics[id] })).filter(
    (x) => x.a === 'critical' || x.a === 'attention' || x.a === 'unreadable',
  );

  return (
    <div>
      <div className="filterbar">
        <span className="ctl">
          <span>Unidade</span>
          <select value={school.properties.identity.school_id} onChange={(e) => setPick(e.target.value)}>
            {list.slice(0, 60).map((f) => (
              <option key={f.properties.identity.school_id} value={f.properties.identity.school_id}>
                {f.properties.identity.nome} · {f.properties.identity.cre}ª CRE
              </option>
            ))}
          </select>
        </span>
        <span className="ctl">
          <span>CRE</span>
          {p.identity.cre}ª
        </span>
        <span className="right">ordenadas por gravidade · sem nota e sem posição de ranking</span>
      </div>

      <div className="pad">
        <div className="when">visão de unidade · serve ao diretor e à Secretaria</div>
        <div className="brief">
          <h2>
            {pains.length === 0
              ? 'Nenhum indicador desta unidade pede atenção agora.'
              : `${pains.length} ${pains.length === 1 ? 'frente pede' : 'frentes pedem'} atenção nesta unidade.`}
          </h2>
        </div>

        <div className="sits">
          {pains.map((x, i) => {
            const blocked = x.a === 'unreadable';
            return (
              <div key={x.id} className={`sit${blocked ? ' blocked' : ''}`}>
                <div className={`n${blocked ? ' void' : ''}`}>{blocked ? '—' : String(i + 1).padStart(2, '0')}</div>
                <div>
                  <h4>{blocked ? `${INDICATORS[x.id].label} sem leitura nesta unidade` : PAIN_LABEL[x.id]}</h4>
                  <div className="meta">
                    {blocked
                      ? `cobertura ${x.m?.coverage != null ? `${(x.m.coverage * 100).toFixed(0)}%` : '—'} · abaixo do limiar de 50%; nenhum número é exibido`
                      : `${INDICATORS[x.id].label}: ${INDICATORS[x.id].format(x.m!.value!)} · fórmula ${x.m!.formula_version} · cobertura ${x.m?.coverage != null ? `${(x.m.coverage * 100).toFixed(0)}%` : '—'}`}
                  </div>
                  <span className="agentchip">
                    <i />
                    {blocked ? 'Guardião de Dados bloqueou a leitura' : 'Sentinela da Rede sinalizou'}
                  </span>
                </div>
                <div className="side">
                  {blocked ? <span className="hatchbar" /> : <span className={`gauge ${x.a}`}><i style={{ width: x.a === 'critical' ? '88%' : '58%' }} /></span>}
                  <div className="glab">
                    <span>{blocked ? 'Sem leitura' : x.a === 'critical' ? 'Crítico' : 'Atenção'}</span>
                    <b>{p.enrolment ?? '—'} matrículas</b>
                  </div>
                </div>
              </div>
            );
          })}
          {pains.length === 0 && (
            <div className="sit">
              <div className="n">—</div>
              <div>
                <h4>Todos os indicadores desta unidade estão dentro da faixa da rede.</h4>
                <div className="meta">
                  Isso não significa que a escola vá bem em tudo — significa que nada, entre os quatro
                  indicadores carregados, cruzou um limiar publicado.
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="footnote">
          <span>{p.identity.school_id}</span>
          <span>{p.identity.bairro}</span>
          <span>
            <Link to={`/escola/${p.identity.school_id}`} style={{ textDecoration: 'underline', textUnderlineOffset: 3 }}>
              abrir a série completa e os pares comparáveis
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
