import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface ListRowProps {
  leading?: ReactNode;
  title: string;
  subtitle?: string;
  trailing?: ReactNode;
  onClick?: () => void;
  className?: string;
}

/** A settings/stat row. Becomes a button when `onClick` is provided. */
export function ListRow({
  leading,
  title,
  subtitle,
  trailing,
  onClick,
  className,
}: ListRowProps) {
  const inner = (
    <>
      {leading && <span className="shrink-0 text-ink-2">{leading}</span>}
      <span className="min-w-0 flex-1 text-left">
        <span className="block text-[15px] font-medium text-ink">{title}</span>
        {subtitle && <span className="block text-[13px] text-ink-3 mt-0.5">{subtitle}</span>}
      </span>
      {trailing && <span className="shrink-0">{trailing}</span>}
    </>
  );
  const cls = cn('flex items-center gap-3 py-3', className);
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={cn(cls, 'w-full active:opacity-70')}>
        {inner}
      </button>
    );
  }
  return <div className={cls}>{inner}</div>;
}

export function Divider() {
  return <div className="h-px bg-ink/5 -mx-5" />;
}
