import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getSchoolMap } from '../api/client';
import { INDICATORS, INDICATOR_ORDER, attentionOf, worstAttention } from '../domain/indicators';
import { pct0 } from '../domain/format';
import { Bar, Brief, FilterBar, FilterControl, FilterSelect, Footnote, Loading, NoReading, Pad, SignalList, SignalRow } from '../components';

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

/**
 * A régua `.ctl select` do legado seleciona pelo ELEMENTO `select`. O gatilho
 * do coss é um `<button>`, então aquela regra deixa de alcançá-lo e a variante
 * padrão (raio, borda de 1px nos quatro lados, altura mínima de 36px, sombra)
 * apareceria no lugar. Estas declarações são a cópia literal de `.ctl select` e
 * vão inline porque estilo inline é a única coisa que vence a utilitária sem
 * depender da ordem em que o Tailwind emite cada propriedade.
 */
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

  // O padrão items-first do coss: as opções existem antes da hidratação, então
  // o `SelectValue` já sabe qual rótulo mostrar no primeiro render.
  const units = list.slice(0, 60).map((f) => ({
    label: `${f.properties.identity.nome} · ${f.properties.identity.cre}ª CRE`,
    value: f.properties.identity.school_id,
  }));

  return (
    <div>
      <FilterBar right="ordenadas por gravidade · sem nota e sem posição de ranking">
        <FilterControl label="Unidade">
          <FilterSelect
            ariaLabel="Unidade"
            items={units}
            onValueChange={setPick}
            value={school.properties.identity.school_id}
          />
        </FilterControl>
        <FilterControl label="CRE">{p.identity.cre}ª</FilterControl>
      </FilterBar>

      <Pad>
        <Brief
          eyebrow="visão de unidade · serve ao diretor e à Secretaria"
          headline={
            pains.length === 0
              ? 'Nenhum indicador desta unidade pede atenção agora.'
              : `${pains.length} ${pains.length === 1 ? 'frente pede' : 'frentes pedem'} atenção nesta unidade.`
          }
          size="hero"
        />

        <SignalList>
          {pains.map((x, i) => {
            const blocked = x.a === 'unreadable';
            const coverage = x.m?.coverage != null ? pct0(x.m.coverage) : '—';
            // O motivo do bloqueio é uma frase só: ela abre a `.meta` e, como
            // esta linha não é botão, também pode virar o tooltip da hachura
            // sem enfiar um ponto de foco dentro de um controle.
            const blockedReason = `cobertura ${coverage} · abaixo do limiar de 50%; nenhum número é exibido`;
            return (
              <SignalRow
                agent={blocked ? 'Guardião de Dados bloqueou a leitura' : 'Sentinela da Rede sinalizou'}
                blocked={blocked}
                footer={`${p.enrolment ?? '—'} matrículas`}
                index={blocked ? '—' : String(i + 1).padStart(2, '0')}
                key={x.id}
                levelLabel={blocked ? 'Sem leitura' : x.a === 'critical' ? 'Crítico' : 'Atenção'}
                meta={
                  blocked
                    ? blockedReason
                    : `${INDICATORS[x.id].label}: ${INDICATORS[x.id].format(x.m!.value!)} · fórmula ${x.m!.formula_version} · cobertura ${coverage}`
                }
                side={
                  blocked ? (
                    <NoReading reason={blockedReason} shape="bar" />
                  ) : (
                    <Bar className="gauge" level={x.a} value={x.a === 'critical' ? 0.88 : 0.58} />
                  )
                }
                title={blocked ? `${INDICATORS[x.id].label} sem leitura nesta unidade` : PAIN_LABEL[x.id]}
              />
            );
          })}
          {pains.length === 0 && (
            <SignalRow
              index="—"
              meta="Isso não significa que a escola vá bem em tudo — significa que nada, entre os quatro indicadores carregados, cruzou um limiar publicado."
              title="Todos os indicadores desta unidade estão dentro da faixa da rede."
            />
          )}
        </SignalList>

        <Footnote>
          <span>{p.identity.school_id}</span>
          <span>{p.identity.bairro}</span>
          <span>
            <Link to={`/escola/${p.identity.school_id}`} style={{ textDecoration: 'underline', textUnderlineOffset: 3 }}>
              abrir a série completa e os pares comparáveis
            </Link>
          </span>
        </Footnote>
      </Pad>
    </div>
  );
}
