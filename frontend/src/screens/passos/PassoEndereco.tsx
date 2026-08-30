import { Briefcase, LocateFixed } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { buscarCep, geocodificar } from '@/api/client';
import type { Endereco } from '@/api/types';
import { BottomBar, Page, PageTitle, Section, TopBar } from '@/components/shell';
import { Aviso, CampoTexto } from '@/components/comuns';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { mascararCep } from '@/domain/cpf';
import { ENDERECO_VAZIO } from '@/store/rascunho';
import { usePasso } from './usePasso';

function BlocoEndereco({
  valor,
  onChange,
  erros,
  prefixo,
  mostrarGps,
  onGps,
  gpsEstado,
}: {
  valor: Endereco;
  onChange: (v: Partial<Endereco>) => void;
  erros: Record<string, string | null>;
  prefixo: string;
  mostrarGps?: boolean;
  onGps?: () => void;
  gpsEstado?: 'inicial' | 'buscando' | 'ok' | 'negado';
}) {
  const [buscando, setBuscando] = useState(false);
  const [semCep, setSemCep] = useState(false);
  const ultimoCep = useRef('');

  useEffect(() => {
    const d = valor.cep.replace(/\D/g, '');
    if (d.length !== 8 || d === ultimoCep.current) return;
    ultimoCep.current = d;
    let vivo = true;
    setBuscando(true);
    setSemCep(false);
    buscarCep(d).then((e) => {
      if (!vivo) return;
      setBuscando(false);
      if (e) onChange({ ...e, lat: null, lon: null });
      else setSemCep(true);
    });
    return () => {
      vivo = false;
    };
  }, [valor.cep, onChange]);

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-[1fr_auto] items-end gap-2">
        <CampoTexto
          label="CEP"
          inputMode="numeric"
          autoComplete={`${prefixo} postal-code`}
          placeholder="00000-000"
          value={valor.cep}
          onChange={(e) => onChange({ cep: mascararCep(e.target.value), lat: null, lon: null })}
          erro={erros.cep}
          dica={buscando ? 'Buscando endereço…' : semCep ? 'CEP não encontrado — preencha a rua e o bairro abaixo.' : 'Preenchemos a rua e o bairro para você.'}
        />
        {mostrarGps ? (
          <Button type="button" size="lg" variant="outline" className="mb-[26px] h-[38px]" onClick={onGps} loading={gpsEstado === 'buscando'}>
            <LocateFixed />
            Usar GPS
          </Button>
        ) : null}
      </div>
      {gpsEstado === 'negado' ? <p className="-mt-2 text-[13px] text-ink-3">Sem permissão de localização — tudo bem, o CEP resolve.</p> : null}
      <CampoTexto label="Rua" autoComplete={`${prefixo} address-line1`} value={valor.logradouro} onChange={(e) => onChange({ logradouro: e.target.value, lat: null, lon: null })} erro={erros.logradouro} />
      <div className="grid grid-cols-[1fr_1.4fr] gap-3">
        <CampoTexto label="Número" inputMode="numeric" value={valor.numero} onChange={(e) => onChange({ numero: e.target.value })} erro={erros.numero} />
        <CampoTexto label="Complemento" opcional value={valor.complemento} onChange={(e) => onChange({ complemento: e.target.value })} placeholder="Casa 2, bloco B…" />
      </div>
      <CampoTexto label="Bairro" autoComplete={`${prefixo} address-level3`} value={valor.bairro} onChange={(e) => onChange({ bairro: e.target.value, lat: null, lon: null })} erro={erros.bairro} />
    </div>
  );
}

export function PassoEndereco() {
  const p = usePasso('endereco');
  const { r, patch, set } = p;
  const [gps, setGps] = useState<'inicial' | 'buscando' | 'ok' | 'negado'>('inicial');
  const [avancando, setAvancando] = useState(false);

  const usarGps = () => {
    if (!('geolocation' in navigator)) {
      setGps('negado');
      return;
    }
    setGps('buscando');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        patch('endereco', { lat: pos.coords.latitude, lon: pos.coords.longitude });
        set('precisaoEndereco', 'endereco');
        setGps('ok');
      },
      () => setGps('negado'),
      { enableHighAccuracy: true, timeout: 8000 },
    );
  };

  const continuar = async () => {
    if (Object.keys(p.erros).length > 0) {
      p.avancar();
      return;
    }
    setAvancando(true);
    if (r.endereco.lat === null || r.endereco.lon === null) {
      const g = await geocodificar(r.endereco);
      patch('endereco', { lat: g.lat, lon: g.lon });
      set('precisaoEndereco', g.precisao);
    }
    if (r.usarTrabalho && (r.trabalho.lat === null || r.trabalho.lon === null)) {
      const g = await geocodificar(r.trabalho);
      patch('trabalho', { lat: g.lat, lon: g.lon });
    }
    setAvancando(false);
    p.avancar();
  };

  return (
    <>
      <TopBar voltarPara={p.voltarPara} passo={p.indice} total={p.total} />
      <Page comRodape>
        <PageTitle eyebrow={`Passo ${p.indice} de ${p.total}`} sub="Com o endereço mostramos as creches mais próximas primeiro. Ele também é o comprovante de residência da matrícula.">
          Onde a família mora
        </PageTitle>

        <Section>
          <BlocoEndereco
            valor={r.endereco}
            onChange={(v) => patch('endereco', v)}
            erros={{ cep: p.mostrarErro('cep'), logradouro: p.mostrarErro('logradouro'), numero: p.mostrarErro('numero'), bairro: p.mostrarErro('bairro') }}
            prefixo="home"
            mostrarGps
            onGps={usarGps}
            gpsEstado={gps}
          />
          {gps === 'ok' ? (
            <Aviso tipo="ok" className="mt-4">
              Localização capturada. As creches serão ordenadas a partir de onde você está.
            </Aviso>
          ) : null}
        </Section>

        <Section>
          <label className="flex min-h-12 cursor-pointer items-start gap-3">
            <Checkbox className="mt-1" checked={r.usarTrabalho} onCheckedChange={(v) => set('usarTrabalho', Boolean(v))} />
            <span className="flex flex-col">
              <span className="flex items-center gap-2 text-[15px] font-semibold text-ink">
                <Briefcase className="size-4 text-brand" aria-hidden="true" />
                Também buscar creche perto do trabalho
              </span>
              <span className="text-[13px] leading-snug text-ink-3">Para quem prefere deixar a criança no caminho. A casa continua sendo o endereço oficial.</span>
            </span>
          </label>
          {r.usarTrabalho ? (
            <div className="mt-4 border-t border-line pt-4">
              <BlocoEndereco valor={r.trabalho} onChange={(v) => patch('trabalho', { ...ENDERECO_VAZIO, ...r.trabalho, ...v })} erros={{ bairro: p.mostrarErro('trabalhoBairro') }} prefixo="work" />
            </div>
          ) : null}
        </Section>
      </Page>
      <BottomBar note={avancando ? 'Localizando o endereço no mapa…' : undefined}>
        <Button size="xl" onClick={continuar} loading={avancando}>
          Continuar
        </Button>
      </BottomBar>
    </>
  );
}
