import { ArrowRight, Baby, CalendarDays, MapPinned, ShieldCheck, Wallet } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiSource } from '@/api/client';
import { Page, TopBar, Wordmark } from '@/components/shell';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogPanel, DialogPopup, DialogTitle } from '@/components/ui/dialog';
import { ANO_LETIVO } from '@/domain/grupamento';
import { CRITERIOS } from '@/domain/prioridade';
import { useRascunho } from '@/store/rascunho';

export function Inicio() {
  const { r, set, reset } = useRascunho();
  const nav = useNavigate();
  const [aberto, setAberto] = useState(false);
  const [lido, setLido] = useState(false);
  const [origem, setOrigem] = useState<string | null>(null);
  const topoModal = useRef<HTMLParagraphElement | null>(null);
  const temRascunho = Boolean(r.atualizadoEm) && r.modo !== null;
  const editando = r.editandoCodigo;

  useEffect(() => {
    apiSource().then((s) => setOrigem(s.mode === 'live' ? null : s.note));
  }, []);

  const escolher = (modo: 'prioritaria' | 'normal') => {
    if (temRascunho) reset();
    set('modo', modo);
    setAberto(false);
    nav('/inscricao/crianca');
  };

  return (
    <>
      <TopBar />
      <Page>
        <section className="mb-6 overflow-hidden rounded-3xl bg-brand px-5 pb-6 pt-7 text-brand-ink shadow-e3">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-ink/70">Creche pública · ano letivo {ANO_LETIVO}</p>
          <h1 className="text-[30px] font-bold leading-[1.1] tracking-tight">Vaga na creche para a sua criança, direto do celular.</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-brand-ink/85">
            Inscrição em cerca de 10 minutos. Você escolhe até 5 creches no mapa, vê quanta gente disputa cada uma e acompanha tudo por aqui.
          </p>
          <div className="mt-5 flex flex-col gap-2">
            {temRascunho ? (
              <Button size="xl" className="w-full border-white bg-white text-brand hover:bg-white/90" render={<Link to={editando ? '/inscricao/unidades' : '/inscricao/crianca'} />}>
                {editando ? `Continuar alteração das creches (${editando})` : `Continuar inscrição de ${r.crianca.nome.split(' ')[0] || 'sua criança'}`}
                <ArrowRight />
              </Button>
            ) : null}
            <Button
              size="xl"
              className={temRascunho ? 'w-full border-white/40 bg-transparent text-brand-ink hover:bg-white/10' : 'w-full border-white bg-white text-brand hover:bg-white/90'}
              onClick={() => setAberto(true)}
            >
              {temRascunho ? 'Começar outra inscrição' : 'Inscrever criança'}
              {!temRascunho && <ArrowRight />}
            </Button>
            <Button size="xl" variant="ghost" className="w-full text-brand-ink hover:bg-white/10" render={<Link to="/acompanhar" />}>
              Já tenho inscrição — acompanhar
            </Button>
          </div>
        </section>

        <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-3">Como funciona</h2>
        <ol className="mb-6 grid gap-2">
          {[
            { I: Baby, t: 'Você conta sobre a criança e a família', d: 'Nome, data de nascimento, endereço e a situação da família. Dá para parar e voltar depois: nada se perde.' },
            { I: MapPinned, t: 'Escolhe até 5 creches no mapa', d: 'Perto de casa ou do trabalho, com a demanda de cada uma à vista para você escolher bem.' },
            { I: Wallet, t: 'Deixa um contato que não muda', d: 'Sua chave Pix vira um canal de aviso: a convocação chega mesmo se o telefone trocar.' },
            { I: CalendarDays, t: 'Acompanha e responde à convocação', d: 'Pré-classificação atualizada todo dia. Quando a vaga sair, você aceita ou recusa no app em 3 dias.' },
          ].map((p, i) => (
            <li key={p.t} className="flex gap-3 rounded-2xl border border-line bg-surface p-3.5 shadow-e1">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand" aria-hidden="true">
                <p.I className="size-5" />
              </span>
              <div>
                <p className="text-[15px] font-semibold leading-snug text-ink">
                  <span className="mr-1.5 font-mono text-[12px] text-ink-3">{i + 1}.</span>
                  {p.t}
                </p>
                <p className="mt-0.5 text-[13px] leading-snug text-ink-2">{p.d}</p>
              </div>
            </li>
          ))}
        </ol>

        <section className="mb-6 rounded-2xl border border-line bg-surface p-4 shadow-e1">
          <h2 className="mb-2 flex items-center gap-2 text-[15px] font-semibold text-ink">
            <ShieldCheck className="size-4.5 text-brand" aria-hidden="true" />O que você precisa ter em mãos
          </h2>
          <ul className="grid gap-1.5 text-[14px] text-ink-2">
            <li>• CPF do responsável (será conferido na Receita Federal)</li>
            <li>• Data de nascimento da criança</li>
            <li>• CEP de casa (e do trabalho, se quiser buscar creche perto dele)</li>
            <li>• Celular com WhatsApp e, se tiver, chave Pix</li>
            <li>• Documentos de prioridade, se a família tiver direito (a lista aparece antes de começar)</li>
          </ul>
        </section>

        <p className="text-center text-[12px] leading-relaxed text-ink-3">
          Protótipo do hackathon Claude · 30/08/2026. {origem ? `${origem}. ` : ''}As creches vêm do extrato da SME e a classificação é ilustrativa; a regra real é a do edital vigente.
        </p>
        <div className="mt-6 flex justify-center">
          <Wordmark />
        </div>
      </Page>

      <Dialog open={aberto} onOpenChange={setAberto}>
        <DialogPopup className="sm:max-w-xl" initialFocus={topoModal}>
          <DialogHeader>
            <DialogTitle>Sua família tem prioridade?</DialogTitle>
            <DialogDescription>
              Famílias em alguma destas situações têm prioridade na classificação. Se for o seu caso, separe o documento indicado — você poderá enviar a foto pelo app.
            </DialogDescription>
          </DialogHeader>
          <DialogPanel className="max-h-[52vh] pb-4">
            <p ref={topoModal} tabIndex={-1} className="mb-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-3 outline-none">
              Leia a lista até o fim
            </p>
            <ul className="grid gap-2">
              {CRITERIOS.map((c) => (
                <li key={c.id} className="flex items-start justify-between gap-3 rounded-xl border border-line bg-surface-2 px-3 py-2.5">
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold leading-snug text-ink">{c.titulo}</p>
                    <p className="text-[12px] leading-snug text-ink-3">Documento: {c.documento}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[12px] leading-snug text-ink-3">
              Não tem certeza? Escolha "Tenho um desses casos": as perguntas aparecem no caminho e, se nenhuma se aplicar, nada muda. Quem escolhe "Não tenho" segue direto, sem essas perguntas.
            </p>
            <label className="mt-4 flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-line-2 bg-surface px-3 py-2 text-[14px] font-medium text-ink">
              <Checkbox checked={lido} onCheckedChange={(v) => setLido(Boolean(v))} />
              Li e entendi quem tem prioridade
            </label>
          </DialogPanel>
          <DialogFooter variant="bare" className="flex-col gap-2 sm:flex-row">
            <Button size="lg" variant="outline" className="w-full sm:w-auto" disabled={!lido} onClick={() => escolher('normal')}>
              Não tenho
            </Button>
            <Button size="lg" className="w-full sm:flex-1" disabled={!lido} onClick={() => escolher('prioritaria')}>
              Tenho um desses casos
              <ArrowRight />
            </Button>
          </DialogFooter>
        </DialogPopup>
      </Dialog>
    </>
  );
}
