import { CheckCircle2, Landmark, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

const MAX_ENVIOS = 3;
const ESPERA_S = 60;
import { confirmarPix, enviarPixVerificacao } from '@/api/client';
import { BottomBar, Page, PageTitle, Section, TopBar } from '@/components/shell';
import { Aviso, CampoTexto, NotificacaoSimulada } from '@/components/comuns';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { usePasso } from './usePasso';

type Estado = { fase: 'inicial' } | { fase: 'enviando' } | { fase: 'enviado'; n: { valor: string; remetente: string; mensagem: string } } | { fase: 'erro'; n: { valor: string; remetente: string; mensagem: string } };

export function PassoPix() {
  const p = usePasso('pix');
  const { r, patch } = p;
  const [estado, setEstado] = useState<Estado>({ fase: 'inicial' });
  const [codigo, setCodigo] = useState('');
  const [conferindo, setConferindo] = useState(false);
  const [envios, setEnvios] = useState(0);
  const [esperaAte, setEsperaAte] = useState<number | null>(null);
  const [agora, setAgora] = useState(Date.now());

  useEffect(() => {
    if (esperaAte === null) return;
    const t = setInterval(() => setAgora(Date.now()), 1000);
    return () => clearInterval(t);
  }, [esperaAte]);
  const faltam = esperaAte ? Math.max(0, Math.ceil((esperaAte - agora) / 1000)) : 0;

  const chave = r.pix.usarCpf ? r.responsavel.cpf : r.pix.chaveAdicional;
  const podeEnviar = Boolean(chave) && estado.fase !== 'enviando' && faltam === 0 && envios < MAX_ENVIOS;

  useEffect(() => {
    if (r.pix.usarCpf && r.pix.chaveCpf !== r.responsavel.cpf) patch('pix', { chaveCpf: r.responsavel.cpf });
  }, [r.pix.usarCpf, r.pix.chaveCpf, r.responsavel.cpf, patch]);

  const enviar = async () => {
    if (!podeEnviar) return;
    setEstado({ fase: 'enviando' });
    const res = await enviarPixVerificacao(chave);
    // Cada envio custa R$ 0,01 à Prefeitura: intervalo mínimo e teto por sessão.
    setEnvios((n) => n + 1);
    setEsperaAte(Date.now() + ESPERA_S * 1000);
    setEstado({ fase: 'enviado', n: res.notificacao });
  };

  const confirmar = async () => {
    if (estado.fase !== 'enviado' && estado.fase !== 'erro') return;
    setConferindo(true);
    const ok = await confirmarPix(chave, codigo);
    setConferindo(false);
    if (ok) {
      patch('pix', { verificada: true, semChave: false });
      setEstado({ fase: 'inicial' });
    } else {
      setEstado({ fase: 'erro', n: estado.n });
    }
  };

  const alternarSemChave = (v: boolean) => {
    patch('pix', { semChave: v, verificada: v ? false : r.pix.verificada });
    if (v) setEstado({ fase: 'inicial' });
  };

  return (
    <>
      <TopBar voltarPara={p.voltarPara} passo={p.indice} total={p.total} />
      <Page comRodape>
        <PageTitle eyebrow={`Passo ${p.indice} de ${p.total}`} sub="Telefone muda, e-mail some — e a convocação não chega. Sua chave Pix fica com você: por ela a Prefeitura consegue avisar quando a vaga sair, mesmo que o número troque.">
          Um contato que não muda
        </PageTitle>

        <Aviso tipo="info" titulo="Como funciona" className="mb-4">
          A Prefeitura envia um Pix de R$ 0,01 com a mensagem do aviso. Ele aparece como notificação do seu banco. Nunca cobramos nada e não vemos seu saldo.
        </Aviso>

        {!r.pix.semChave ? (
          <Section>
            <div className="grid gap-4">
              <label className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-line-2 px-3 py-2.5">
                <Checkbox checked={r.pix.usarCpf} onCheckedChange={(v) => patch('pix', { usarCpf: Boolean(v), verificada: false })} />
                <span className="flex flex-col">
                  <span className="text-[15px] font-semibold text-ink">Minha chave Pix é o meu CPF</span>
                  <span className="text-[12px] text-ink-3">{r.responsavel.cpf || 'Preencha o CPF no passo anterior'}</span>
                </span>
              </label>

              {!r.pix.usarCpf ? (
                <CampoTexto
                  label="Chave Pix"
                  placeholder="Celular, e-mail ou chave aleatória"
                  autoCapitalize="none"
                  value={r.pix.chaveAdicional}
                  onChange={(e) => patch('pix', { chaveAdicional: e.target.value, verificada: false })}
                  dica="Use a chave da conta que você mais abre — é nela que o aviso vai aparecer."
                />
              ) : null}

              {r.pix.verificada ? (
                <div className="flex items-center gap-3 rounded-xl bg-ok-soft px-3.5 py-3 text-ok">
                  <CheckCircle2 className="size-5 shrink-0" />
                  <div>
                    <p className="text-[14px] font-semibold">Chave confirmada</p>
                    <p className="text-[12px] text-ink-2">{chave}</p>
                  </div>
                </div>
              ) : (
                <div className="grid gap-3">
                  <Button size="lg" variant="secondary" className="h-12" disabled={!podeEnviar} loading={estado.fase === 'enviando'} onClick={enviar}>
                    <Landmark />
                    {estado.fase === 'inicial' ? 'Enviar Pix de confirmação' : envios >= MAX_ENVIOS ? 'Limite de envios atingido' : faltam > 0 ? `Reenviar em ${faltam}s` : 'Enviar de novo'}
                  </Button>
                  {envios >= MAX_ENVIOS && !r.pix.verificada ? <p className="text-[13px] text-ink-3">Já enviamos {MAX_ENVIOS} confirmações. Confira a chave ou marque "Não tenho chave Pix" e siga com o WhatsApp.</p> : null}
                  {estado.fase === 'enviado' || estado.fase === 'erro' ? (
                    <>
                      <NotificacaoSimulada app="banco" titulo={`Pix recebido · ${estado.n.valor}`} texto={`${estado.n.remetente}: ${estado.n.mensagem}`} rodape="Em produção esta é a notificação real do banco; aqui é uma simulação." />
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="pix-codigo" className="text-[14px] font-semibold text-ink">
                          Código que veio na mensagem
                        </label>
                        <div className="flex gap-2">
                          <Input
                            id="pix-codigo"
                            size="lg"
                            className="font-mono uppercase tracking-[0.3em]"
                            maxLength={4}
                            autoCapitalize="characters"
                            autoComplete="one-time-code"
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                            aria-invalid={estado.fase === 'erro' ? true : undefined}
                          />
                          <Button size="lg" className="h-[38px]" disabled={codigo.length < 4} loading={conferindo} onClick={confirmar}>
                            Confirmar
                          </Button>
                        </div>
                        {estado.fase === 'erro' ? (
                          <p className="text-[13px] font-medium text-danger" role="alert">
                            Código não confere. Veja a mensagem do banco.
                          </p>
                        ) : null}
                      </div>
                    </>
                  ) : null}
                  {p.mostrarErro('pix') ? (
                    <p className="text-[13px] font-medium text-danger" role="alert">
                      {p.mostrarErro('pix')}
                    </p>
                  ) : null}
                </div>
              )}

              <label className="flex min-h-12 cursor-pointer items-start gap-3 rounded-xl border border-line-2 px-3 py-2.5">
                <Checkbox className="mt-0.5" checked={r.pix.consentimento} onCheckedChange={(v) => patch('pix', { consentimento: Boolean(v) })} />
                <span className="flex flex-col">
                  <span className="text-[14px] font-semibold text-ink">Autorizo o uso desta chave Pix para receber avisos da inscrição</span>
                  <span className="text-[12px] leading-snug text-ink-3">Finalidade: comunicação sobre a vaga na creche. Você pode retirar a autorização a qualquer momento (LGPD).</span>
                </span>
              </label>
              {p.mostrarErro('consentimento') ? (
                <p className="text-[13px] font-medium text-danger" role="alert">
                  {p.mostrarErro('consentimento')}
                </p>
              ) : null}
            </div>
          </Section>
        ) : (
          <Aviso tipo="warn" titulo="Sem chave Pix" className="mb-4">
            Tudo bem — usaremos o WhatsApp e o e-mail. Se depois você criar uma chave, dá para adicionar na tela de acompanhamento.
          </Aviso>
        )}

        <label className="flex min-h-11 cursor-pointer items-center gap-3 px-1 text-[14px] text-ink-2">
          <Checkbox checked={r.pix.semChave} onCheckedChange={(v) => alternarSemChave(Boolean(v))} />
          Não tenho chave Pix
        </label>

        <p className="mt-6 flex items-start gap-2 text-[12px] leading-snug text-ink-3">
          <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />A chave é guardada de forma protegida e usada só para enviar avisos. Ela nunca é usada para cobrar nem para receber pagamentos.
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
