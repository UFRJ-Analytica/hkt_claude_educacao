import { Camera, CheckCircle2, FileWarning, RefreshCw, ScanLine } from 'lucide-react';
import { useRef, useState } from 'react';
import { preAnalisarDocumento } from '@/api/client';
import type { CriterioId, DocumentoAnalise } from '@/api/types';
import { BottomBar, Page, PageTitle, Section, TopBar } from '@/components/shell';
import { Aviso } from '@/components/comuns';
import { Button } from '@/components/ui/button';
import { CRITERIOS_POR_ID } from '@/domain/prioridade';
import { cn } from '@/lib/utils';
import { usePasso } from './usePasso';

const ESTADO: Record<DocumentoAnalise['status'], { rotulo: string; cls: string; I: typeof CheckCircle2 }> = {
  pendente: { rotulo: 'Pendente', cls: 'bg-surface-2 text-ink-2', I: FileWarning },
  analisando: { rotulo: 'Analisando…', cls: 'bg-brand-soft text-brand', I: ScanLine },
  pre_aprovado: { rotulo: 'Pré-aprovado', cls: 'bg-ok-soft text-ok', I: CheckCircle2 },
  revisar: { rotulo: 'Conferir na unidade', cls: 'bg-warn-soft text-warn', I: FileWarning },
  ilegivel: { rotulo: 'Foto ilegível', cls: 'bg-danger-soft text-danger', I: FileWarning },
};

function CartaoDocumento({ criterio, analise, onArquivo, contexto }: { criterio: CriterioId; analise: DocumentoAnalise | undefined; onArquivo: (f: File) => void; contexto: string }) {
  const c = CRITERIOS_POR_ID[criterio];
  const inputRef = useRef<HTMLInputElement | null>(null);
  const status = analise?.status ?? 'pendente';
  const E = ESTADO[status];
  const analisando = status === 'analisando';
  return (
    <section className={cn('rounded-2xl border bg-surface p-4 shadow-e1', status === 'pre_aprovado' ? 'border-ok/30' : status === 'ilegivel' ? 'border-danger/30' : 'border-line')} aria-busy={analisando}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-3">{c.titulo}</p>
          <h2 className="text-[16px] font-bold leading-snug text-ink">{c.documento}</h2>
          <p className="mt-0.5 text-[13px] leading-snug text-ink-3">{c.documentoDica}</p>
        </div>
        <span className={cn('inline-flex h-7 shrink-0 items-center gap-1 rounded-md px-2 text-[12px] font-semibold', E.cls)}>
          <E.I className={cn('size-3.5', analisando && 'animate-pulse')} />
          {E.rotulo}
        </span>
      </div>

      {analisando ? (
        <div className="mt-3 grid gap-2">
          <div className="h-3 w-3/4 rounded shimmer" />
          <div className="h-3 w-1/2 rounded shimmer" />
          <p className="text-[12px] text-ink-3">Lendo o documento e conferindo se bate com {contexto}…</p>
        </div>
      ) : analise && status !== 'pendente' ? (
        <div className="mt-3 grid gap-2">
          <p className="text-[14px] leading-snug text-ink-2">{analise.motivo}</p>
          {Object.keys(analise.camposLidos).length > 0 ? (
            <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 rounded-xl bg-surface-2 px-3 py-2 text-[13px]">
              {Object.entries(analise.camposLidos).map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="text-ink-3">{k}</dt>
                  <dd className="font-medium text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      ) : null}

      <input
        ref={inputRef}
        type="file"
        accept="image/*,application/pdf"
        capture="environment"
        className="sr-only"
        aria-label={`Enviar ${c.documento}`}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onArquivo(f);
          e.target.value = '';
        }}
      />
      <div className="mt-3 flex gap-2">
        <Button type="button" size="lg" variant={status === 'pre_aprovado' ? 'outline' : 'default'} className="h-11 flex-1" disabled={analisando} onClick={() => inputRef.current?.click()}>
          {status === 'pendente' ? <Camera /> : <RefreshCw />}
          {status === 'pendente' ? 'Tirar foto ou escolher arquivo' : 'Enviar outra foto'}
        </Button>
      </div>
    </section>
  );
}

/**
 * Miniatura da foto (máx. 640 px, JPEG) guardada junto da inscrição: é o que a
 * unidade abre quando a pré-análise pede conferência. PDF não gera miniatura.
 */
async function miniaturaDe(f: File): Promise<string | null> {
  if (!f.type.startsWith('image/')) return null;
  try {
    const bitmap = await createImageBitmap(f);
    const escala = Math.min(1, 640 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(bitmap.width * escala));
    canvas.height = Math.max(1, Math.round(bitmap.height * escala));
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    return canvas.toDataURL('image/jpeg', 0.72);
  } catch {
    return null;
  }
}

export function PassoDocumentos() {
  const p = usePasso('documentos');
  const { r, patch, criterios } = p;
  const [erro, setErro] = useState<string | null>(null);
  const contexto = { nomeCrianca: r.crianca.nome, nomeResponsavel: r.responsavel.nome };

  const enviar = async (criterio: CriterioId, f: File) => {
    setErro(null);
    patch('documentos', { [criterio]: { status: 'analisando', motivo: '', camposLidos: {}, analisadoEm: new Date().toISOString() } });
    try {
      const [res, miniatura] = await Promise.all([preAnalisarDocumento(criterio, f, contexto), miniaturaDe(f)]);
      patch('documentos', { [criterio]: { ...res, miniatura: miniatura ?? undefined, nomeArquivo: f.name } });
    } catch {
      patch('documentos', { [criterio]: { status: 'pendente', motivo: '', camposLidos: {}, analisadoEm: new Date().toISOString() } });
      setErro('Não foi possível analisar agora. Você pode tentar de novo ou levar o documento à unidade.');
    }
  };

  const prontos = criterios.filter((c) => r.documentos[c]?.status === 'pre_aprovado' || r.documentos[c]?.status === 'revisar').length;
  const pendentes = criterios.length - prontos;

  return (
    <>
      <TopBar voltarPara={p.voltarPara} passo={p.indice} total={p.total} />
      <Page comRodape>
        <PageTitle eyebrow={`Passo ${p.indice} de ${p.total}`} sub="Tire uma foto de cada documento. Uma inteligência artificial faz a leitura na hora e diz se está legível e se bate com a inscrição — assim você não perde a viagem à creche.">
          Documentos de prioridade
        </PageTitle>

        <Aviso tipo="info" className="mb-4" titulo="Pré-análise, não decisão">
          A IA só lê e confere o documento. Os pontos são calculados por regra fixa e a unidade faz a validação final no dia da matrícula, com o original em mãos.
        </Aviso>

        {erro ? (
          <Aviso tipo="danger" className="mb-4">
            {erro}
          </Aviso>
        ) : null}

        <div className="grid gap-3">
          {criterios.map((c) => (
            <CartaoDocumento key={c} criterio={c} analise={r.documentos[c]} onArquivo={(f) => enviar(c, f)} contexto={r.crianca.nome ? `"${r.crianca.nome}"` : 'a inscrição'} />
          ))}
          {criterios.length === 0 ? (
            <Section>
              <p className="text-[15px] text-ink-2">Nenhum critério de prioridade marcado — não há documento a enviar. Pode continuar.</p>
            </Section>
          ) : null}
        </div>

        <p className="mt-4 text-[12px] leading-snug text-ink-3">
          Não conseguiu agora? Continue mesmo assim: os documentos pendentes podem ser enviados depois pela tela de acompanhamento ou levados à creche da sua 1ª opção.
        </p>
      </Page>
      <BottomBar note={criterios.length > 0 ? `${prontos} de ${criterios.length} analisados${pendentes > 0 ? ` · ${pendentes} pendente(s)` : ''}` : undefined}>
        <Button size="xl" onClick={p.avancar} variant={pendentes > 0 && criterios.length > 0 ? 'outline' : 'default'}>
          {pendentes > 0 && criterios.length > 0 ? 'Continuar e enviar depois' : 'Continuar'}
        </Button>
      </BottomBar>
    </>
  );
}
