import { Scale } from 'lucide-react';
import { BottomBar, Page, PageTitle, Section, TopBar } from '@/components/shell';
import { Aviso, SimNao } from '@/components/comuns';
import { Button } from '@/components/ui/button';
import { CRITERIOS, CRITERIOS_POR_ID, pontuar } from '@/domain/prioridade';
import { usePasso } from './usePasso';

export function PassoPrioridade() {
  const p = usePasso('prioridade');
  const { r, patch, criterios } = p;
  const pontos = pontuar(criterios);
  const respondidas = CRITERIOS.filter((c) => typeof r.prioridade[c.id] === 'boolean').length;

  return (
    <>
      <TopBar voltarPara={p.voltarPara} passo={p.indice} total={p.total} />
      <Page comRodape>
        <PageTitle eyebrow={`Passo ${p.indice} de ${p.total}`} sub="Cada resposta “sim” soma pontos na classificação e pede um documento. As perguntas aparecem para todas as famílias.">
          Situação da família
        </PageTitle>

        {r.modo === 'prioritaria' ? (
          <Aviso tipo="info" className="mb-4">
            Você disse que a família tem algum caso de prioridade. Marque abaixo quais — e só eles.
          </Aviso>
        ) : null}

        <Section>
          <div className="divide-y divide-line">
            {CRITERIOS.map((c) => (
              <SimNao key={c.id} pergunta={c.pergunta} explicacao={`${c.explicacao} Documento: ${c.documento}.`} valor={r.prioridade[c.id]} onChange={(v) => patch('prioridade', { [c.id]: v })} />
            ))}
          </div>
          {p.mostrarErro('prioridade') ? (
            <p className="mt-3 text-[13px] font-medium text-danger" role="alert">
              {p.mostrarErro('prioridade')}
            </p>
          ) : null}
        </Section>

        <Section className="border-brand-soft-2 bg-brand-soft">
          <div className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand text-brand-ink" aria-hidden="true">
              <Scale className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-2">Resumo · {respondidas}/{CRITERIOS.length} respondidas</p>
              {criterios.length === 0 ? (
                <p className="mt-1 text-[15px] font-semibold text-brand">Sem critérios de prioridade</p>
              ) : (
                <>
                  <p className="mt-1 text-[15px] font-semibold text-brand">
                    {criterios.length} {criterios.length === 1 ? 'critério' : 'critérios'} · +{pontos} pontos
                  </p>
                  <ul className="mt-2 grid gap-1 text-[13px] text-ink-2">
                    {criterios.map((id) => (
                      <li key={id} className="flex justify-between gap-2">
                        <span>{CRITERIOS_POR_ID[id].titulo}</span>
                        <span className="font-mono text-brand tnum">+{CRITERIOS_POR_ID[id].pontos}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-[12px] leading-snug text-brand-2">No próximo passo pedimos a foto de: {criterios.map((id) => CRITERIOS_POR_ID[id].documento.toLowerCase()).join('; ')}.</p>
                </>
              )}
            </div>
          </div>
        </Section>

        {r.modo === 'normal' && criterios.length > 0 ? (
          <Aviso tipo="ok" titulo="Boa notícia">
            Você marcou situações que dão prioridade. Adicionamos a etapa de documentos ao seu caminho — nada foi perdido.
          </Aviso>
        ) : null}

        <p className="mt-4 text-[12px] leading-snug text-ink-3">
          A pontuação é uma soma fixa de pesos definidos no edital, calculada por regra — não por inteligência artificial. Os pesos aqui são ilustrativos.
        </p>
      </Page>
      <BottomBar>
        <Button size="xl" onClick={p.avancar}>
          Continuar
        </Button>
      </BottomBar>
    </>
  );
}
