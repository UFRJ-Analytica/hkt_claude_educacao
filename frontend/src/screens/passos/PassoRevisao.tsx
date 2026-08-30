import { Pencil, Send } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { criarInscricao, obterUnidade } from '@/api/client';
import type { Unidade } from '@/api/types';
import { BottomBar, Page, PageTitle, TopBar } from '@/components/shell';
import { Aviso } from '@/components/comuns';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ANO_LETIVO, classificarIdade, formatarDataBr } from '@/domain/grupamento';
import { primeiroPassoPendente } from '@/domain/passos';
import { CRITERIOS_POR_ID, pontuar } from '@/domain/prioridade';
import { usePasso } from './usePasso';

function Bloco({ titulo, rota, children }: { titulo: string; rota: string; children: ReactNode }) {
  return (
    <section className="mb-3 rounded-2xl border border-line bg-surface p-4 shadow-e1">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-[15px] font-semibold text-ink">{titulo}</h2>
        <Link to={rota} className="inline-flex min-h-9 items-center gap-1 rounded-md px-2 text-[13px] font-semibold text-brand hover:bg-brand-soft">
          <Pencil className="size-3.5" /> Editar
        </Link>
      </div>
      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[14px]">{children}</dl>
    </section>
  );
}
function L({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div className="contents">
      <dt className="text-ink-3">{k}</dt>
      <dd className="font-medium text-ink">{v}</dd>
    </div>
  );
}

export function PassoRevisao() {
  const p = usePasso('revisao');
  const { r, set, criterios, reset } = p;
  const nav = useNavigate();
  const [declaro, setDeclaro] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [unidades, setUnidades] = useState<Record<string, Unidade>>({});
  const pendente = primeiroPassoPendente(r);
  const cls = classificarIdade(r.crianca.nascimento);
  const pontos = pontuar(criterios);

  useEffect(() => {
    Promise.all(r.opcoes.map((id) => obterUnidade(id))).then((lista) => {
      const m: Record<string, Unidade> = {};
      lista.forEach((u) => {
        if (u) m[u.id] = u;
      });
      setUnidades(m);
    });
  }, [r.opcoes]);

  const enviar = async () => {
    if (pendente || !declaro) return;
    setEnviando(true);
    setErro(null);
    try {
      const insc = await criarInscricao({
        anoLetivo: ANO_LETIVO,
        modo: r.modo ?? 'normal',
        crianca: r.crianca,
        grupamento: cls?.grupamento ?? 'Maternal I',
        horario: r.horario,
        responsavel: { nome: r.responsavel.nome, cpf: r.responsavel.cpf, parentesco: r.responsavel.parentesco, telefone: r.responsavel.telefone, email: r.responsavel.email },
        contato: {
          pixChaves: r.pix.semChave ? [] : [r.pix.usarCpf ? r.responsavel.cpf : r.pix.chaveAdicional].filter(Boolean),
          pixVerificada: r.pix.verificada && !r.pix.semChave,
          telefoneVerificado: r.responsavel.telefoneVerificado,
        },
        endereco: r.endereco,
        trabalho: r.usarTrabalho ? r.trabalho : null,
        criterios,
        documentos: r.documentos,
        opcoes: r.opcoes,
        aceitaRealocacao: r.aceitaRealocacao,
      });
      reset();
      nav(`/inscricao/confirmacao/${insc.codigo}`, { state: { inscricao: insc }, replace: true });
    } catch {
      setErro('Não conseguimos enviar agora. Seus dados estão salvos — tente de novo em instantes.');
      setEnviando(false);
    }
  };

  return (
    <>
      <TopBar voltarPara={p.voltarPara} passo={p.indice} total={p.total} />
      <Page comRodape>
        <PageTitle eyebrow={`Passo ${p.indice} de ${p.total}`} sub="Confira tudo antes de enviar. Depois do envio você recebe um código para acompanhar.">
          Revise e envie
        </PageTitle>

        {pendente ? (
          <Aviso tipo="warn" titulo={`Falta completar: ${pendente.titulo}`} className="mb-4">
            <Link to={pendente.rota} className="font-semibold text-brand underline-offset-2 hover:underline">
              Ir para o passo
            </Link>
          </Aviso>
        ) : null}

        <Bloco titulo="Criança" rota="/inscricao/crianca">
          <L k="Nome" v={r.crianca.nome || '—'} />
          <L k="Nascimento" v={r.crianca.nascimento ? formatarDataBr(r.crianca.nascimento) : '—'} />
          <L k="Turma" v={cls?.grupamento ? `${cls.grupamento} · ${r.horario}` : '—'} />
        </Bloco>
        <Bloco titulo="Responsável" rota="/inscricao/responsavel">
          <L k="Nome" v={r.responsavel.nome || '—'} />
          <L k="CPF" v={r.responsavel.cpf || '—'} />
          <L k="Celular" v={r.responsavel.telefone ? `${r.responsavel.telefone}${r.responsavel.telefoneVerificado ? ' ✓' : ' (não confirmado)'}` : '—'} />
          {r.responsavel.email ? <L k="E-mail" v={r.responsavel.email} /> : null}
        </Bloco>
        <Bloco titulo="Contato Pix" rota="/inscricao/pix">
          <L k="Chave" v={r.pix.semChave ? 'Sem chave Pix — avisos por WhatsApp e e-mail' : `${r.pix.usarCpf ? r.responsavel.cpf : r.pix.chaveAdicional}${r.pix.verificada ? ' ✓ confirmada' : ' (não confirmada)'}`} />
        </Bloco>
        <Bloco titulo="Endereço" rota="/inscricao/endereco">
          <L k="Casa" v={`${r.endereco.logradouro}${r.endereco.numero ? `, ${r.endereco.numero}` : ''}${r.endereco.complemento ? ` – ${r.endereco.complemento}` : ''} · ${r.endereco.bairro}`} />
          {r.usarTrabalho ? <L k="Trabalho" v={`${r.trabalho.logradouro ? `${r.trabalho.logradouro}, ` : ''}${r.trabalho.bairro}`} /> : null}
        </Bloco>
        <Bloco titulo="Prioridade" rota="/inscricao/prioridade">
          {criterios.length === 0 ? (
            <L k="Critérios" v="Nenhum" />
          ) : (
            <>
              {criterios.map((id) => {
                const d = r.documentos[id];
                const st = d?.status === 'pre_aprovado' ? 'documento pré-aprovado' : d?.status === 'revisar' ? 'documento a conferir na unidade' : 'documento pendente';
                return <L key={id} k={`+${CRITERIOS_POR_ID[id].pontos} pts`} v={`${CRITERIOS_POR_ID[id].titulo} · ${st}`} />;
              })}
              <L k="Total" v={<span className="font-mono tnum">{pontos} pontos</span>} />
            </>
          )}
        </Bloco>
        <Bloco titulo={`Creches (${r.opcoes.length})`} rota="/inscricao/unidades">
          {r.opcoes.length === 0 ? (
            <L k="—" v="Nenhuma escolhida" />
          ) : (
            r.opcoes.map((id, i) => <L key={id} k={`${i + 1}ª`} v={`${unidades[id]?.nome ?? id}${unidades[id] ? ` · ${unidades[id].bairro}` : ''}`} />)
          )}
          <L k="Realocação" v={r.aceitaRealocacao ? 'Aceito vaga em qualquer opção' : 'Só na ordem escolhida'} />
        </Bloco>

        <label className="mb-3 flex min-h-12 cursor-pointer items-start gap-3 rounded-xl border border-line-2 bg-surface px-3 py-2.5">
          <Checkbox className="mt-0.5" checked={r.aceitaRealocacao} onCheckedChange={(v) => set('aceitaRealocacao', Boolean(v))} />
          <span className="text-[14px] text-ink">Aceito ser chamado para qualquer uma das creches escolhidas, na ordem acima.</span>
        </label>
        <label className="mb-3 flex min-h-12 cursor-pointer items-start gap-3 rounded-xl border border-line-2 bg-surface px-3 py-2.5">
          <Checkbox className="mt-0.5" checked={declaro} onCheckedChange={(v) => setDeclaro(Boolean(v))} />
          <span className="text-[14px] text-ink">Declaro que as informações são verdadeiras e sei que a validação final é feita pela unidade com os documentos originais.</span>
        </label>
        {erro ? (
          <Aviso tipo="danger" className="mb-3">
            {erro}
          </Aviso>
        ) : null}
      </Page>
      <BottomBar note={!declaro && !pendente ? 'Marque a declaração para enviar' : undefined}>
        <Button size="xl" onClick={enviar} disabled={Boolean(pendente) || !declaro} loading={enviando}>
          <Send />
          Enviar inscrição
        </Button>
      </BottomBar>
    </>
  );
}
