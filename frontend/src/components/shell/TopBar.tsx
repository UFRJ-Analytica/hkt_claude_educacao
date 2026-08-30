import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Wordmark } from './Wordmark';

export function TopBar({ voltarPara, passo, total, cheio = false }: { voltarPara?: string | null; passo?: number; total?: number; cheio?: boolean }) {
  const comProgresso = typeof passo === 'number' && typeof total === 'number';
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/85">
      <div className={cheio ? 'mx-auto flex h-topbar w-full max-w-none items-center gap-2 px-4 lg:px-6 2xl:px-8' : 'mx-auto flex h-topbar w-full max-w-page items-center gap-2 px-[var(--pad-x)]'}>
        {voltarPara ? (
          <Link to={voltarPara} className="-ml-2 grid size-11 shrink-0 place-items-center rounded-full text-brand hover:bg-brand-soft" aria-label="Voltar">
            <ArrowLeft className="size-5" />
          </Link>
        ) : null}
        <Wordmark compact={comProgresso} />
        {comProgresso ? (
          <span className="ml-auto rounded-full bg-brand-soft px-2.5 py-1 font-mono text-[12px] font-medium text-brand tnum" aria-label={`Passo ${passo} de ${total}`}>
            {passo}/{total}
          </span>
        ) : null}
      </div>
      {comProgresso ? (
        <div className="h-1 w-full bg-line" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={passo} aria-label="Progresso da inscrição">
          <div className="h-full bg-brand transition-[width] duration-300 ease-app" style={{ width: `${(passo / total) * 100}%` }} />
        </div>
      ) : null}
    </header>
  );
}
