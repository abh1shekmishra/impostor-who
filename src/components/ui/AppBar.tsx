import type { ReactNode } from 'react';
import { IconButton } from './IconButton';
import { ChevronLeft } from './icons';
import { cn } from '@/lib/cn';

interface AppBarProps {
  title?: string;
  onBack?: () => void;
  trailing?: ReactNode;
  subtitle?: string;
  uppercaseTitle?: boolean;
}

/** Sticky, glassy top bar with optional back affordance. */
export function AppBar({ title, onBack, trailing, subtitle, uppercaseTitle }: AppBarProps) {
  return (
    <header className="sticky top-0 z-30 glass border-b pt-safe">
      <div className="h-[4.65rem] px-4 flex items-center gap-3">
        {onBack ? (
          <IconButton label="Go back" variant="surface" onClick={onBack} className="rounded-full">
            <ChevronLeft />
          </IconButton>
        ) : (
          <span className="w-11" />
        )}
        <div className="flex-1 min-w-0 text-center leading-none">
          {title && (
            <h1 className={cn('font-display text-[2rem] tracking-[-0.05em] text-ink truncate', uppercaseTitle && 'uppercase')}>
              {uppercaseTitle ? title.toUpperCase() : title}
            </h1>
          )}
          {subtitle && (
            <p className="mt-1 text-[12px] font-mono tracking-[0.18em] text-ink-3 truncate">
              {subtitle}
            </p>
          )}
        </div>
        <div className="w-11 flex justify-end">{trailing}</div>
      </div>
    </header>
  );
}
