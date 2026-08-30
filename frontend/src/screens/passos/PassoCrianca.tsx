import { Baby } from 'lucide-react';
import { BottomBar, Page, PageTitle, Section, TopBar } from '@/components/shell';
import { Aviso, CampoTexto, Escolha } from '@/components/comuns';
import { Button } from '@/components/ui/button';
import type { Grupamento } from '@/api/types';
import { ANO_LETIVO, classificarIdade } from '@/domain/grupamento';
import { usePasso } from './usePasso';

const GRUPAMENTOS: Grupamento[] = ['Berçário', 'Maternal I', 'Maternal II'];

export function PassoCrianca() {
  const p = usePasso('crianca');
  const { r, patch, set } = p;
  const cls = classificarIdade(r.crianca.nascimento);
  const sugerido = cls?.grupamento ?? null;
  const hoje = new Date().toISOString().slice(0, 10);

  const mudarNascimento = (v: string) => {
    patch('crianca', { nascimento: v });
    // A turma é sugerida pela idade, mas a família pode ajustar (situação escolar da criança).
    set('grupamento', classificarIdade(v)?.grupamento ?? null);
  };

  return (
    <>
      <TopBar voltarPara={p.voltarPara} passo={p.indice} total={p.total} />
      <Page comRodape>
        <PageTitle eyebrow={`Passo ${p.indice} de ${p.total}`} sub="Com a data de nascimento sugerimos a turma; você confirma ou ajusta. Só mostramos creches com vaga para essa turma.">
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
              onChange={(e) => mudarNascimento(e.target.value)}
              erro={p.mostrarErro('nascimento')}
              dica={`A sugestão de turma considera a idade em 31/03/${ANO_LETIVO}.`}
            />
            {cls && !cls.grupamento && r.crianca.nascimento ? (
              <Aviso tipo="warn" titulo="Fora da faixa sugerida">
                {cls.motivo} Se a situação escolar da criança for outra, escolha a turma abaixo.
              </Aviso>
            ) : null}
            <Escolha
              label="Turma em 2027"
              valor={r.grupamento}
              onChange={(v) => set('grupamento', v)}
              colunas={3}
              erro={p.mostrarErro('grupamento')}
              opcoes={GRUPAMENTOS.map((g) => ({
                valor: g,
                rotulo: g,
                descricao: g === sugerido ? 'sugerida pela idade' : undefined,
                icone: g === sugerido ? <Baby className="size-4" /> : undefined,
              }))}
            />
            {sugerido && r.grupamento && r.grupamento !== sugerido ? (
              <Aviso tipo="info">
                Pela data de nascimento a turma sugerida é {sugerido}. A unidade confere a turma na matrícula.
              </Aviso>
            ) : null}
            <Escolha
              label="Sexo da criança"
              valor={r.crianca.sexo || null}
              onChange={(v) => patch('crianca', { sexo: v })}
              erro={p.mostrarErro('sexo')}
              opcoes={[
                { valor: 'F' as const, rotulo: 'Menina' },
                { valor: 'M' as const, rotulo: 'Menino' },
              ]}
            />
          </div>
        </Section>

        <Section>
          <div className="grid gap-5">
            <Escolha
              label="Horário que a família precisa"
              valor={r.horario}
              onChange={(v) => set('horario', v)}
              erro={p.mostrarErro('horario')}
              opcoes={[
                { valor: 'Integral' as const, rotulo: 'Integral', descricao: 'Manhã e tarde' },
                { valor: 'Parcial' as const, rotulo: 'Parcial', descricao: 'Só um turno' },
              ]}
            />
            <Escolha
              label="A criança já frequentou creche da rede municipal?"
              valor={r.crianca.jaEstudou === null ? null : r.crianca.jaEstudou ? 'sim' : 'nao'}
              onChange={(v) => patch('crianca', { jaEstudou: v === 'sim' })}
              erro={p.mostrarErro('jaEstudou')}
              opcoes={[
                { valor: 'sim' as const, rotulo: 'Sim', descricao: 'Vamos localizar o cadastro' },
                { valor: 'nao' as const, rotulo: 'Não', descricao: 'Primeira inscrição' },
              ]}
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
