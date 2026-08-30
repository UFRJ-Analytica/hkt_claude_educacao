import type { Capability } from '@/api/types';
import { CapabilityTag } from '@/components/StatusTag';
import { Empty } from '@/components/ui/empty';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

/**
 * A tela que aparece quando não há o que mostrar — e que, neste produto, é uma
 * tela de primeira classe: explica por que o dado não está aqui em vez de
 * devolver um erro genérico ou, pior, um número plausível.
 *
 * Sobre o `Empty` do coss, virado de centralizado para bloco de leitura à
 * esquerda: o texto é longo e argumentativo, não um cartaz. `.statepage`
 * continua governando padding, medida de 62ch e a tipografia dos filhos —
 * por isso o `h2`, o `p` e a `ul` seguem sendo elementos de verdade, e não
 * `EmptyTitle`/`EmptyDescription`, que renderizam `div` e escapariam dos
 * seletores do legado.
 *
 * O `Alert` do coss ficou de fora deliberadamente: `.statepage` não tem caixa
 * de aviso, e introduzir borda e fundo aqui inventaria um elemento visual que
 * a tela nunca teve.
 */
export function CapabilityState({ capability, screen }: { capability?: Capability; screen: string }) {
  const status = capability?.status ?? 'UNAVAILABLE';
  const copy: Record<string, { title: string; body: string }> = {
    SCHEMA_ONLY: {
      title: 'A estrutura é conhecida. As linhas não chegaram.',
      body: 'O schema deste domínio está mapeado, mas nenhuma linha de dado está disponível. Não há gráfico nem valor nesta tela — inventar um número aqui seria o erro que este produto existe para evitar.',
    },
    UNAVAILABLE: {
      title: 'Esta capacidade não tem pré-requisito atendido.',
      body: 'A fonte ainda não foi confirmada, ou a base legal e a cobertura não foram verificadas. A rota continua acessível por link direto para explicar o que falta, em vez de devolver um erro genérico.',
    },
    DISABLED: {
      title: 'Módulo desabilitado por configuração.',
      body: 'Alguém decidiu explicitamente remover este domínio da composição. Não é ausência de dado — é decisão de configuração, e as duas coisas não devem parecer a mesma na interface.',
    },
    DEGRADED: {
      title: 'Operação parcial.',
      body: 'A capacidade responde, mas com limitações declaradas. Leia os valores com a cobertura ao lado.',
    },
  };
  const text = copy[status] ?? copy.UNAVAILABLE;
  return (
    <Empty
      className={cn(
        'statepage',
        // Desliga a centralização e o balanceamento de texto do Empty: o corpo
        // é parágrafo corrido e precisa quebrar como parágrafo.
        'block flex-none items-start justify-start gap-0 text-left text-wrap',
      )}
    >
      <div className="k">
        {screen} · <CapabilityTag status={status} />
      </div>
      <h2>{text.title}</h2>
      <p>{text.body}</p>
      {capability?.limitations?.length ? (
        <ul>
          {capability.limitations.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      ) : null}
    </Empty>
  );
}

/**
 * Espera. O rótulo diz o que está sendo feito ("cruzando sinais"), não um
 * "carregando" vazio — a tela leva alguns segundos e a pessoa merece saber o
 * que se passa. O `Spinner` do coss entra só como marca de atividade; quem
 * anuncia o estado ao leitor de tela é o texto, dentro do `role="status"`.
 */
export function Loading({ label = 'carregando' }: { label?: string }) {
  return (
    <div aria-live="polite" className="loading flex items-center gap-[9px]" role="status">
      <Spinner aria-hidden="true" aria-label={undefined} className="size-3 shrink-0" role={undefined} />
      {label}…
    </div>
  );
}
