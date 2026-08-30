import { ClipboardCheck, FileSearch, Megaphone, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Page, PageTitle, Section, TopBar } from '@/components/shell';
import { Aviso } from '@/components/comuns';
import { Button } from '@/components/ui/button';

/** Entrada da unidade (diretor/secretaria). Esboço do painel — próximo incremento. */
export function PaginaCreche() {
  return (
    <>
      <TopBar voltarPara="/" />
      <Page>
        <PageTitle eyebrow="Unidade escolar" sub="O painel da creche fecha o ciclo: a unidade confere os documentos pré-analisados, confirma matrículas e vê a fila da própria unidade — sem planilha nem telefone.">
          Página da creche
        </PageTitle>
        <Aviso tipo="info" titulo="Esboço" className="mb-4">
          Esta área ainda não tem dados. Ela lista o que a unidade passa a fazer no mesmo sistema em que a família se inscreve.
        </Aviso>
        <Section>
          <ul className="grid gap-3 text-[14px] text-ink-2">
            {[
              { I: FileSearch, t: 'Conferir documentos', d: 'Fila de documentos com pré-análise: pré-aprovado, a conferir, ilegível. A unidade confirma com o original em mãos.' },
              { I: Users, t: 'Fila e vagas da unidade', d: 'Inscritos por grupamento e horário, vagas prioritárias e gerais, posição de cada família.' },
              { I: Megaphone, t: 'Convocações', d: 'Quem foi chamado, por qual canal (Pix, WhatsApp, e-mail), quem respondeu e prazos vencendo.' },
              { I: ClipboardCheck, t: 'Matrícula', d: 'Confirmar presença com documentos, registrar pendências e liberar a vaga no ato da recusa.' },
            ].map((x) => (
              <li key={x.t} className="flex gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand" aria-hidden="true">
                  <x.I className="size-4.5" />
                </span>
                <div>
                  <p className="font-semibold text-ink">{x.t}</p>
                  <p className="leading-snug">{x.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>
        <div className="grid gap-2">
          <Button size="xl" variant="outline" render={<Link to="/" />}>
            Voltar ao portal
          </Button>
          <Button size="lg" variant="ghost" render={<Link to="/app" />}>
            Ir para a inscrição
          </Button>
        </div>
      </Page>
    </>
  );
}
