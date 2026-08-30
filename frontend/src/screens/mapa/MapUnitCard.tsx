import { Link } from 'react-router-dom';
import type { SchoolContext, SchoolMapFeature } from '../../api/types';
import { INDICATORS, INDICATOR_ORDER, attentionOf, isNotApplicable } from '../../domain/indicators';
import { takesAdr } from '../../api/turmas';
import {
  Bar,
  Card,
  Codes,
  CoverageCard,
  ListRow,
  NoReading,
  Note,
  type CodeItem,
} from '../../components';
import { Button } from '../../components/ui/button';

/**
 * O que o `Button` do coss acrescenta e `.btn` não declara.
 *
 * `.btn` é `display:block; width:100%` fora de camada, então ele já ganha do
 * `inline-flex`, do raio, da borda, do padding, do corpo e do peso. Sobram
 * quatro coisas: a altura fixa do tamanho `default` (o botão aqui cresce com o
 * conteúdo), o `whitespace-nowrap` — que faria "Abrir Escola 360 + plano IA"
 * vazar dos 286px do cartão — e o `::before` da linha de luz, que este produto
 * não usa. O anel de foco do coss fica: `outline-none` do `buttonVariants`
 * apaga o contorno global, e sem o anel o botão ficaria sem foco visível.
 *
 * A variante é `ghost` de propósito. `default` traria `bg-primary`, e petróleo
 * é IA, ação e foco — nunca a cor de fundo de um link de cartão. O `.btn.solid`
 * legado já pinta o seu próprio acento, fora de camada.
 */
const BTN = 'h-auto whitespace-normal before:hidden sm:h-auto';

/** O painel flutuante da unidade selecionada. */
export function MapUnitCard({
  sel,
  context,
  isFetching,
  onClose,
}: {
  sel: SchoolMapFeature;
  context: SchoolContext | null | undefined;
  isFetching: boolean;
  onClose: () => void;
}) {
  const identity = sel.properties.identity;

  const codes: CodeItem[] = [{ label: `${identity.cre}ª CRE` }];
  if (identity.school_type) codes.push({ label: identity.school_type });
  if (identity.sme_designation) codes.push({ label: `SME ${identity.sme_designation}` });
  codes.push({ label: 'identidade real', real: true });

  const identityOnly = context?.metric_coverage.status === 'IDENTITY_ONLY';

  return (
    <Card
      closeLabel="Fechar"
      eyebrow="Unidade real selecionada"
      onClose={onClose}
      title={identity.nome}
      variant="map"
    >
      <Codes items={codes} />

      {/* O ponto no mapa já está pintado por um indicador desta unidade.
          Dizer aqui "sem indicadores" enquanto a cor afirma o contrário é
          incoerente — o card mostra os mesmos números que pintaram o dot. */}
      <div className="selmetrics">
        {INDICATOR_ORDER.map((iid) => {
          const m = sel.properties.metrics[iid];
          const spec = INDICATORS[iid];
          const blocked = !m || m.value === null;
          return (
            <ListRow
              className="selrow"
              key={iid}
              label={spec.label}
              layout="cells"
              meta={
                isNotApplicable(m)
                  ? 'não se aplica'
                  : blocked
                    ? 'sem leitura'
                    : spec.format(m.value!)
              }
              // `.nm` e `.sv` são as colunas 1 e 3 da grade `1fr 46px 62px`;
              // a medida do meio entra sem invólucro porque a largura de 46px
              // é declarada no próprio elemento (`.bar.mini`, `.hatchbar.mini`).
              slots={{ label: 'nm', meta: `mono sv${blocked ? ' off' : ''}` }}
              trailing={
                blocked ? (
                  <NoReading className="mini" shape="bar" />
                ) : (
                  <Bar
                    className="bar mini"
                    indicatorClassName="rounded-[2px]"
                    label={spec.label}
                    level={attentionOf(m)}
                    value={Math.max(
                      0,
                      Math.min(1, (m.value! - spec.scale[0]) / (spec.scale[1] - spec.scale[0])),
                    )}
                  />
                )
              }
            />
          );
        })}
      </div>

      <CoverageCard
        alert={identityOnly}
        eyebrow={isFetching ? 'carregando contexto…' : 'indicadores de demonstração'}
        size="sm"
      >
        {identityOnly
          ? 'Identidade, CRE, tipo e coordenada são reais. O snapshot do backend não tem métrica para este identificador — os números acima vêm da camada de demonstração local, a mesma que define a cor do ponto.'
          : (context?.metric_coverage.message ??
            'Identidade, CRE, tipo e coordenada vêm do cadastro real. Os indicadores acima são de demonstração.')}
      </CoverageCard>

      <div className="mapactions">
        {context?.map_links.google_maps_url && (
          <Button
            className={`btn ghost inline ${BTN}`}
            render={
              <a
                href={context.map_links.google_maps_url}
                rel="noreferrer noopener"
                target="_blank"
              />
            }
            variant="ghost"
          >
            Google Maps
          </Button>
        )}
        {context?.map_links.directions_url && (
          <Button
            className={`btn ghost inline ${BTN}`}
            render={
              <a
                href={context.map_links.directions_url}
                rel="noreferrer noopener"
                target="_blank"
              />
            }
            variant="ghost"
          >
            Rotas
          </Button>
        )}
      </div>

      <Button
        className={`btn solid ${BTN}`}
        render={<Link to={`/escola/${identity.school_id}`} />}
        variant="ghost"
      >
        Abrir Escola 360 + plano IA
      </Button>
      {takesAdr(identity.school_type) ? (
        <Button
          className={`btn ${BTN}`}
          render={
            <Link
              to={`/recomposicao?cre=${identity.cre}&escola=${encodeURIComponent(identity.school_id)}`}
            />
          }
          variant="ghost"
        >
          Recomposição por turma
        </Button>
      ) : (
        <Note className="cardnote">
          Esta unidade não participa da avaliação diagnóstica — não há matriz de habilidades
          para ela.
        </Note>
      )}
    </Card>
  );
}
