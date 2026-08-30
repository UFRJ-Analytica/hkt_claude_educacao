import { Baby } from 'lucide-react';
import { BottomBar, Page, PageTitle, Section, TopBar } from '@/components/shell';
import { Aviso, CampoTexto, Escolha, SimNao } from '@/components/comuns';
import { Button } from '@/components/ui/button';
import { ANO_LETIVO, classificarIdade } from '@/domain/grupamento';
import { usePasso } from './usePasso';

export function PassoCrianca() {
  const p = usePasso('crianca');
  const { r, patch } = p;
  const cls = classificarIdade(r.crianca.nascimento);
  const hoje = new Date().toISOString().slice(0, 10);

  return (
    <>
      <TopBar voltarPara={p.voltarPara} passo={p.indice} total={p.total} />
      <Page comRodape>
        <PageTitle eyebrow={`Passo ${p.indice} de ${p.total}`} sub="Com a data de nascimento a gente já descobre a turma certa e mostra só as creches que têm vaga para essa idade.">
          Sobre a criança
        </PageTitle>

        <Section>
          <div className="grid gap-4">
            <CampoTexto
              label="Nome completo da criança"
              value={r.crianca.nome}
              onChange={(e) => patch('crianca', { nome: e.target.value })}
              autoComplete="off"
              autoCapitalize="words"
              erro={p.mostrarErro('nome')}
              placeholder="Como está na certidão"
            />
            <CampoTexto
              label="Data de nascimento"
              type="date"
              max={hoje}
              min="2021-01-01"
              value={r.crianca.nascimento}
              onChange={(e) => patch('crianca', { nascimento: e.target.value })}
              erro={p.mostrarErro('nascimento')}
              dica={`A turma é definida pela idade em 31/03/${ANO_LETIVO}.`}
            />
            {cls?.grupamento ? (
              <div className="flex items-center gap-3 rounded-xl border border-brand-soft-2 bg-brand-soft px-3.5 py-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand text-brand-ink" aria-hidden="true">
                  <Baby className="size-5" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-2">Turma em {ANO_LETIVO}</p>
                  <p className="text-[17px] font-bold leading-tight text-brand">{cls.grupamento}</p>
                  <p className="text-[12px] text-brand-2">{cls.motivo}</p>
                </div>
              </div>
            ) : cls && !cls.grupamento && r.crianca.nascimento ? (
              <Aviso tipo="warn" titulo="Fora da faixa da creche">
                {cls.motivo}
              </Aviso>
            ) : null}
          </div>
        </Section>

        <Section>
          <div className="grid gap-5">
            <Escolha
              label="Horário que a família precisa"
              valor={r.horario}
              onChange={(v) => p.set('horario', v)}
              opcoes={[
                { valor: 'Integral', rotulo: 'Integral', descricao: 'Manhã e tarde' },
                { valor: 'Parcial', rotulo: 'Parcial', descricao: 'Só um turno' },
              ]}
            />
            <Escolha
              label="Sexo da criança"
              valor={r.crianca.sexo}
              onChange={(v) => patch('crianca', { sexo: v })}
              colunas={3}
              opcoes={[
                { valor: 'F', rotulo: 'Menina' },
                { valor: 'M', rotulo: 'Menino' },
                { valor: 'nao_informar', rotulo: 'Não informar' },
              ]}
            />
            <SimNao
              pergunta="A criança já frequentou creche da rede municipal?"
              explicacao="Se sim, vamos localizar o cadastro anterior para não pedir nada duas vezes."
              valor={r.crianca.jaEstudou}
              onChange={(v) => patch('crianca', { jaEstudou: v })}
            />
          </div>
        </Section>
      </Page>
      <BottomBar>
        <Button size="xl" onClick={p.avancar}>
          Continuar
        </Button>
      </BottomBar>
    </>
  );
}
