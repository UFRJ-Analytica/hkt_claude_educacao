import { ChevronUp, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ANO_LETIVO } from '@/domain/grupamento';
import { cn } from '@/lib/utils';

/**
 * Portal no estilo do matricula.rio: barra escura, cabeçalho institucional,
 * faixa de datas, cartões de ação e perguntas frequentes. Só dois cartões:
 * o de inscrição leva ao app mobile-first; o da creche, ao painel da unidade.
 */
const FAQ = [
  {
    p: 'Posso ir até a CRE ou diretamente à creche, uma vez que não encontrei a vaga no site?',
    r: 'Não. A inscrição é feita somente pelo site ou pelo app. A creche e a CRE não fazem inscrição presencial; elas orientam e conferem documentos na matrícula.',
  },
  {
    p: 'Qual será o horário de funcionamento do site matricula.rio?',
    r: 'O site e o app ficam disponíveis 24 horas durante o período de inscrição. A pré-classificação é atualizada uma vez por dia, às 6h.',
  },
  {
    p: 'Quem não tiver Internet, como fazer para acessar o site?',
    r: 'Todas as unidades da rede e as Naves do Conhecimento oferecem acesso gratuito à internet para realizar a inscrição.',
  },
];

function Social({ className }: { className?: string }) {
  const icones = [
    { nome: 'X', d: 'M18.9 2H22l-7.2 8.2L23 22h-6.6l-5.2-6.8L5.3 22H2.2l7.7-8.8L1.6 2h6.8l4.7 6.2L18.9 2Zm-1.2 18.2h1.8L7.3 3.7H5.4l12.3 16.5Z' },
    { nome: 'Facebook', d: 'M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.4H7.6V14h2.8v8h3.1Z' },
    { nome: 'Instagram', d: 'M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm5.9-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM21 8.2c-.1-1.5-.4-2.8-1.5-3.9S17.3 2.9 15.8 2.8C14.2 2.7 9.8 2.7 8.2 2.8 6.7 2.9 5.4 3.2 4.3 4.3S2.9 6.7 2.8 8.2c-.1 1.6-.1 6 0 7.6.1 1.5.4 2.8 1.5 3.9s2.4 1.4 3.9 1.5c1.6.1 6 .1 7.6 0 1.5-.1 2.8-.4 3.9-1.5s1.4-2.4 1.5-3.9c.1-1.6.1-6 0-7.6Zm-2 9.2a3 3 0 0 1-1.7 1.7c-1.2.5-4 .4-5.3.4s-4.1.1-5.3-.4a3 3 0 0 1-1.7-1.7c-.5-1.2-.4-4-.4-5.3s-.1-4.1.4-5.3A3 3 0 0 1 6.7 5c1.2-.5 4-.4 5.3-.4s4.1-.1 5.3.4a3 3 0 0 1 1.7 1.7c.5 1.2.4 4 .4 5.3s.1 4.1-.4 5.3Z' },
    { nome: 'YouTube', d: 'M23 7.2a2.9 2.9 0 0 0-2-2C19.2 4.7 12 4.7 12 4.7s-7.2 0-9 .5a2.9 2.9 0 0 0-2 2C.5 9 .5 12 .5 12s0 3 .5 4.8a2.9 2.9 0 0 0 2 2c1.8.5 9 .5 9 .5s7.2 0 9-.5a2.9 2.9 0 0 0 2-2c.5-1.8.5-4.8.5-4.8s0-3-.5-4.8ZM9.7 15.1V8.9l6 3.1-6 3.1Z' },
  ];
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      {icones.map((i) => (
        <span key={i.nome} className="grid size-7 place-items-center rounded-[5px] bg-white text-[#3b3b3b]" aria-label={i.nome} role="img">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
            <path d={i.d} />
          </svg>
        </span>
      ))}
    </div>
  );
}

export function Portal() {
  const [aberta, setAberta] = useState<number | null>(0);
  return (
    <div className="portal min-h-full bg-white text-[#1d1d1d]" style={{ fontFamily: "'Nunito', 'Schibsted Grotesk', system-ui, sans-serif" }}>
      {/* barra superior escura */}
      <div className="bg-[#3b3b3b] text-white">
        <div className="mx-auto flex h-12 max-w-[1240px] items-center justify-between gap-4 px-4">
          <span className="text-[16px] font-extrabold tracking-wide">
            <span className="text-[#3fb0ec]">PREFEITURA</span>.RIO
          </span>
          <div className="hidden items-center gap-6 text-[10px] font-extrabold uppercase leading-[1.05] tracking-wide md:flex">
            <span className="flex items-center gap-2">
              <span className="grid size-7 place-items-center rounded-full border-2 border-white/80" aria-hidden="true">
                <span className="size-2.5 rounded-full border-2 border-white/80" />
              </span>
              Carioca
              <br />
              Digital
            </span>
            <span className="text-[24px] font-black leading-none tracking-tight">1746</span>
            <span className="flex items-center gap-2">
              <span className="grid size-7 place-items-center rounded-full bg-[#f5b400] text-[15px] font-black text-[#3b3b3b]" aria-hidden="true">
                i
              </span>
              Acesso à<br />Informação
            </span>
          </div>
          <Social />
        </div>
      </div>

      {/* cabeçalho institucional */}
      <header className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-x-8 gap-y-4 px-4 py-5">
        <div className="flex items-center gap-4">
          <div className="leading-none text-[#13335a]">
            <span className="block text-[9px] font-extrabold tracking-[0.22em]">PREFEITURA</span>
            <span className="block text-[30px] font-black tracking-tight">RIO</span>
          </div>
          <span className="h-11 w-px bg-[#bdbdbd]" aria-hidden="true" />
          <span className="text-[18px] text-[#333]">Educação</span>
        </div>
        <div className="relative text-[24px] font-black uppercase leading-[0.9] tracking-tight text-[#13335a]">
          <span className="absolute -top-3 left-[3.6em] text-[#3fb0ec]" aria-hidden="true">✓</span>
          Matrícula
          <br />
          Cari<span className="text-[#3fb0ec]">o</span>ca
        </div>
        <nav className="ml-auto flex gap-8 text-[12px] font-extrabold uppercase tracking-[0.12em] text-[#666]" aria-label="Seções">
          <Link to="/app" className="hover:text-[#13335a]">
            Inscrição
          </Link>
          <Link to="/app/inscricao/unidades" className="hover:text-[#13335a]">
            Escolas por região
          </Link>
        </nav>
      </header>

      {/* faixa de datas + título */}
      <section className="mx-auto max-w-[900px] px-4 pt-4">
        <div className="grid items-center gap-6 sm:grid-cols-[auto_1fr]">
          <div className="flex w-fit overflow-hidden">
            <div className="flex w-[52px] items-center justify-center bg-[#3fb0ec] text-white">
              <span className="text-[24px] font-black tracking-[0.08em]" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                {ANO_LETIVO}
              </span>
            </div>
            <div className="flex flex-col items-center bg-[#13335a] px-7 py-3 text-white">
              <span className="text-[34px] font-black leading-none tracking-wide">01 SET</span>
              <span className="my-1 rounded-[3px] bg-[#3fb0ec] px-1.5 text-[11px] font-extrabold leading-4">a</span>
              <span className="text-[34px] font-black leading-none tracking-wide">15 OUT</span>
            </div>
          </div>
          <h1 className="text-[34px] font-black leading-[1.05] text-[#13335a] sm:text-[40px]">
            Educação Infantil
            <br />
            Creche
            <br />
            <span className="text-[#3fb0ec]">Alunos Novos</span>
          </h1>
        </div>

        {/* cartões de ação */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            to="/app"
            className="grid min-h-[128px] place-items-center rounded-[6px] bg-[#ececec] px-6 text-center text-[14px] font-extrabold uppercase tracking-wide text-[#13335a] transition-colors hover:bg-[#e2e2e2] focus-visible:outline-2"
          >
            Inscreva-se aqui!
          </Link>
          <Link
            to="/creche"
            className="grid min-h-[128px] place-items-center rounded-[6px] bg-[#ececec] px-6 text-center text-[14px] font-extrabold uppercase tracking-wide text-[#13335a] transition-colors hover:bg-[#e2e2e2] focus-visible:outline-2"
          >
            Página da creche
          </Link>
        </div>
      </section>

      {/* perguntas frequentes */}
      <section className="mx-auto max-w-[900px] px-4 pb-12 pt-12">
        <h2 className="mb-6 text-center text-[26px] font-black uppercase tracking-wide text-[#13335a] sm:text-[30px]">Perguntas mais frequentes:</h2>
        <ul className="grid gap-2">
          {FAQ.map((f, i) => {
            const on = aberta === i;
            return (
              <li key={f.p} className="overflow-hidden rounded-[4px] bg-[#0d3b6e] text-white">
                <button type="button" className="flex w-full items-center justify-between gap-4 px-5 py-3.5 text-left text-[14px] font-extrabold" aria-expanded={on} onClick={() => setAberta(on ? null : i)}>
                  {f.p}
                  {on ? <Minus className="size-4 shrink-0" /> : <Plus className="size-4 shrink-0" />}
                </button>
                {on ? <p className="border-t border-white/15 bg-white px-5 py-4 text-[14px] leading-relaxed text-[#333]">{f.r}</p> : null}
              </li>
            );
          })}
        </ul>
      </section>

      {/* rodapé */}
      <footer className="bg-[#ececec]">
        <div className="mx-auto grid max-w-[1240px] gap-6 px-4 py-8 sm:grid-cols-[auto_1fr_auto] sm:items-start">
          <Social className="[&>span]:bg-transparent [&>span]:size-9 [&>span]:rounded-full [&>span]:border-2 [&>span]:border-[#3fb0ec] [&>span]:text-[#3fb0ec]" />
          <p className="max-w-[720px] text-[13px] leading-relaxed text-[#333]">
            A <b>Secretaria Municipal de Educação (SME)</b> é o órgão da Prefeitura do Rio de Janeiro responsável por elaborar a política educacional do município do Rio de Janeiro, coordenar a sua implantação e avaliar os resultados, com o objetivo de assegurar a excelência na Educação Infantil e no Ensino Fundamental.
          </p>
          <a href="#topo" className="grid size-10 place-items-center rounded-full border-2 border-[#13335a] text-[#13335a]" aria-label="Voltar ao topo">
            <ChevronUp className="size-5" />
          </a>
        </div>
        <p className="pb-4 text-center text-[11px] text-[#666]">Protótipo do hackathon Claude · 30/08/2026 · reprodução do estilo do matricula.rio para demonstração</p>
      </footer>
    </div>
  );
}
