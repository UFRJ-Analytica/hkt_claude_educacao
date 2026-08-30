import { CheckCircle2, MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { enviarOtp, verificarOtp } from '@/api/client';
import { BottomBar, Page, PageTitle, Section, TopBar } from '@/components/shell';
import { Campo, CampoTexto, Escolha, NotificacaoSimulada } from '@/components/comuns';
import { Button } from '@/components/ui/button';
import { OTPField, OTPFieldInput } from '@/components/ui/otp-field';
import { cpfValido, mascararCpf, mascararTelefone, somenteDigitos, telefoneValido } from '@/domain/cpf';
import { usePasso } from './usePasso';

type OtpEstado = { fase: 'inicial' } | { fase: 'enviando' } | { fase: 'enviado'; codigoSimulado: string } | { fase: 'verificando'; codigoSimulado: string } | { fase: 'erro'; codigoSimulado: string };

export function PassoResponsavel() {
  const p = usePasso('responsavel');
  const { r, patch } = p;
  const [otp, setOtp] = useState<OtpEstado>({ fase: 'inicial' });
  const [codigo, setCodigo] = useState('');
  const telOk = telefoneValido(r.responsavel.telefone);
  const cpfOk = cpfValido(r.responsavel.cpf);

  useEffect(() => {
    // trocar de número invalida a verificação anterior
    setOtp({ fase: 'inicial' });
    setCodigo('');
  }, [r.responsavel.telefone]);

  const enviar = async () => {
    setOtp({ fase: 'enviando' });
    const res = await enviarOtp(somenteDigitos(r.responsavel.telefone));
    setOtp({ fase: 'enviado', codigoSimulado: res.codigoSimulado });
  };

  const verificar = async (valor: string) => {
    if (otp.fase !== 'enviado' && otp.fase !== 'erro') return;
    const sim = otp.codigoSimulado;
    setOtp({ fase: 'verificando', codigoSimulado: sim });
    const ok = await verificarOtp(somenteDigitos(r.responsavel.telefone), valor);
    if (ok) {
      patch('responsavel', { telefoneVerificado: true });
      setOtp({ fase: 'inicial' });
    } else {
      setOtp({ fase: 'erro', codigoSimulado: sim });
    }
  };

  return (
    <>
      <TopBar voltarPara={p.voltarPara} passo={p.indice} total={p.total} />
      <Page comRodape>
        <PageTitle eyebrow={`Passo ${p.indice} de ${p.total}`} sub="Quem vai responder pela inscrição. O CPF é conferido na Receita Federal e só pode ter uma inscrição ativa por vez.">
          Quem é o responsável
        </PageTitle>

        <Section>
          <div className="grid gap-4">
            <CampoTexto
              label="Seu nome completo"
              value={r.responsavel.nome}
              onChange={(e) => patch('responsavel', { nome: e.target.value })}
              autoComplete="name"
              autoCapitalize="words"
              erro={p.mostrarErro('nome')}
            />
            <Escolha
              label="Você é"
              valor={r.responsavel.parentesco}
              onChange={(v) => patch('responsavel', { parentesco: v })}
              opcoes={[
                { valor: 'mae', rotulo: 'Mãe' },
                { valor: 'pai', rotulo: 'Pai' },
                { valor: 'avo', rotulo: 'Avó ou avô' },
                { valor: 'outro', rotulo: 'Outro responsável' },
              ]}
            />
            <CampoTexto
              label="CPF"
              inputMode="numeric"
              autoComplete="off"
              placeholder="000.000.000-00"
              value={r.responsavel.cpf}
              onChange={(e) => patch('responsavel', { cpf: mascararCpf(e.target.value) })}
              erro={p.mostrarErro('cpf')}
              dica={
                cpfOk ? (
                  <span className="inline-flex items-center gap-1 text-ok">
                    <CheckCircle2 className="size-3.5" /> CPF válido · conferência na Receita simulada
                  </span>
                ) : (
                  'Só números. Vamos conferir na Receita Federal.'
                )
              }
            />
          </div>
        </Section>

        <Section title="Celular com WhatsApp">
          <div className="grid gap-3">
            <Campo label="Número com DDD" erro={p.mostrarErro('telefone')} dica={r.responsavel.telefoneVerificado ? undefined : 'Enviamos um código de 6 números para confirmar.'}>
              {(a) => (
                <div className="flex min-w-0 gap-2">
                  <input
                    {...a}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    placeholder="(21) 99999-9999"
                    value={r.responsavel.telefone}
                    onChange={(e) => patch('responsavel', { telefone: mascararTelefone(e.target.value), telefoneVerificado: false })}
                    className="h-12 w-0 min-w-0 flex-1 rounded-lg border border-input bg-background px-3 text-base text-foreground outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/24 aria-invalid:border-destructive/60"
                  />
                  {r.responsavel.telefoneVerificado ? (
                    <span className="inline-flex items-center gap-1 rounded-lg bg-ok-soft px-3 text-[13px] font-semibold text-ok">
                      <CheckCircle2 className="size-4" /> Confirmado
                    </span>
                  ) : (
                    <Button type="button" size="lg" variant="secondary" className="h-12" disabled={!telOk || otp.fase === 'enviando'} loading={otp.fase === 'enviando'} onClick={enviar}>
                      <MessageCircle />
                      {otp.fase === 'inicial' ? 'Enviar código' : 'Reenviar'}
                    </Button>
                  )}
                </div>
              )}
            </Campo>

            {!r.responsavel.telefoneVerificado && (otp.fase === 'enviado' || otp.fase === 'verificando' || otp.fase === 'erro') ? (
              <div className="grid gap-3">
                <NotificacaoSimulada app="whatsapp" titulo="Matrícula Carioca" texto={`Seu código de confirmação é ${otp.codigoSimulado}. Ele vale por 10 minutos.`} />
                <div className="flex flex-col gap-2">
                  <span className="text-[14px] font-semibold text-ink">Digite o código recebido</span>
                  <OTPField
                    aria-label="Código de confirmação"
                    length={6}
                    size="lg"
                    value={codigo}
                    onValueChange={(v) => {
                      setCodigo(v);
                      if (v.length === 6) void verificar(v);
                    }}
                    disabled={otp.fase === 'verificando'}
                  >
                    <OTPFieldInput />
                    <OTPFieldInput aria-label="Dígito 2 de 6" />
                    <OTPFieldInput aria-label="Dígito 3 de 6" />
                    <OTPFieldInput aria-label="Dígito 4 de 6" />
                    <OTPFieldInput aria-label="Dígito 5 de 6" />
                    <OTPFieldInput aria-label="Dígito 6 de 6" />
                  </OTPField>
                  {otp.fase === 'erro' ? (
                    <p className="text-[13px] font-medium text-danger" role="alert">
                      Código não confere. Veja a mensagem e tente de novo.
                    </p>
                  ) : otp.fase === 'verificando' ? (
                    <p className="text-[13px] text-ink-3">Conferindo…</p>
                  ) : null}
                </div>
              </div>
            ) : null}

            <CampoTexto
              label="E-mail"
              opcional
              type="email"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              value={r.responsavel.email}
              onChange={(e) => patch('responsavel', { email: e.target.value })}
              erro={p.mostrarErro('email')}
              dica="Segundo canal de aviso, além do WhatsApp e do Pix."
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
