import { CalendarPlus, CheckCircle2, Copy, MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { consultarInscricao } from '@/api/client';
import type { Inscricao } from '@/api/types';
import { Page, Section, TopBar } from '@/components/shell';
import { Button } from '@/components/ui/button';

function ics(insc: Inscricao): string {
  const dt = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const inicio = new Date();
  inicio.setDate(inicio.getDate() + 1);
  inicio.setHours(6, 0, 0, 0);
  const fim = new Date(inicio.getTime() + 30 * 60 * 1000);
  const corpo = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Matricula Carioca//Creche//PT', 'BEGIN:VEVENT', `UID:${insc.codigo}@matricula.rio`, `DTSTAMP:${dt(new Date())}`, `DTSTART:${dt(inicio)}`, `DTEND:${dt(fim)}`, `SUMMARY:Ver pré-classificação da creche (${insc.codigo})`, `DESCRIPTION:Acompanhe em matricula.rio/acompanhar/${insc.codigo}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(corpo)}`;
}

export function Confirmacao() {
  const { codigo = '' } = useParams();
  const loc = useLocation() as { state?: { inscricao?: Inscricao } };
  const [insc, setInsc] = useState<Inscricao | null>(loc.state?.inscricao ?? null);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    if (!insc && codigo) consultarInscricao(codigo, '').then(setInsc);
  }, [insc, codigo]);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(codigo);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 1800);
    } catch {
      /* sem clipboard */
    }
  };
  const zap = `https://wa.me/?text=${encodeURIComponent(`Inscrição na creche enviada! Código: ${codigo}. Acompanhe em ${window.location.origin}/acompanhar/${codigo}`)}`;
  const primeiro = insc?.crianca.nome.split(' ')[0];

  return (
    <>
      <TopBar />
      <Page>
        <div className="mb-5 flex flex-col items-center text-center">
          <span className="mb-3 grid size-16 place-items-center rounded-full bg-ok-soft text-ok pulse-ring" aria-hidden="true">
            <CheckCircle2 className="size-9" />
          </span>
          <h1 className="text-[26px] font-bold leading-tight tracking-tight text-ink">Inscrição enviada{primeiro ? `, ${primeiro} está na fila` : ''}!</h1>
          <p className="mt-2 text-[15px] text-ink-2">Guarde o código. É com ele (e seu CPF) que você acompanha a classificação e responde à convocação.</p>
        </div>

        <section className="mb-4 rounded-3xl border border-brand-soft-2 bg-brand px-5 py-6 text-center text-brand-ink shadow-e3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-ink/70">Código da inscrição</p>
          <p className="mt-2 font-mono text-[30px] font-semibold tracking-[0.08em]" aria-label={`Código ${codigo}`}>
            {codigo}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button size="lg" className="border-white/40 bg-white/10 text-brand-ink hover:bg-white/20" onClick={copiar}>
              <Copy />
              {copiado ? 'Copiado!' : 'Copiar'}
            </Button>
            <Button size="lg" className="border-white bg-white text-brand hover:bg-white/90" render={<a href={zap} target="_blank" rel="noreferrer" />}>
              <MessageCircle />
              WhatsApp
            </Button>
          </div>
        </section>

        <Section title="O que acontece agora">
          <ol className="grid gap-3 text-[14px] text-ink-2">
            {[
              ['Hoje', 'Sua inscrição entrou na pré-classificação. A posição em cada creche é atualizada todo dia às 6h.'],
              [insc?.status === 'documentos_pendentes' ? 'Documentos' : 'Conferência', insc?.status === 'documentos_pendentes' ? 'Há documento pendente: envie pelo acompanhamento ou leve o original à creche da 1ª opção.' : 'A creche confere os documentos que você enviou. Se algo faltar, avisamos por WhatsApp e Pix.'],
              ['Convocação', 'Quando a vaga sair, você recebe o aviso e tem 3 dias para aceitar ou recusar pelo app. Recusar libera a vaga para a próxima família — sem prejuízo para as suas outras opções.'],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-3">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-soft font-mono text-[12px] font-bold text-brand">{i + 1}</span>
                <div>
                  <p className="font-semibold text-ink">{t}</p>
                  <p className="leading-snug">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <div className="grid gap-2">
          <Button size="xl" render={<Link to={`/acompanhar/${codigo}`} />}>
            Acompanhar inscrição
          </Button>
          <Button size="xl" variant="outline" render={<a href={insc ? ics(insc) : '#'} download={`matricula-${codigo}.ics`} />}>
            <CalendarPlus />
            Lembrete no calendário
          </Button>
          <Button size="lg" variant="ghost" render={<Link to="/app" />}>
            Voltar ao início
          </Button>
        </div>
      </Page>
    </>
  );
}
