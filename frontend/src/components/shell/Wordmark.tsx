import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function Wordmark({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link to="/app" className={cn('inline-flex items-center gap-2.5 rounded-md', className)} aria-label="Matrícula Carioca — início">
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand text-brand-ink shadow-e1" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12.5l4.2 4.2L19 7.5" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-bold text-[15px] tracking-tight text-brand">Matrícula Carioca</span>
        {!compact && <span className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.12em] text-ink-3">Prefeitura do Rio · Educação</span>}
      </span>
    </Link>
  );
}
