import type { ReactNode } from 'react';
import { IconButton } from './IconButton';
import { ChevronLeft } from './icons';

interface AppBarProps {
  title?: string;
  onBack?: () => void;
  trailing?: ReactNode;
  subtitle?: string;
}

/** Sticky, glassy top bar with optional back affordance. */
export function AppBar({ title, onBack, trailing, subtitle }: AppBarProps) {
  return (
    <header className="sticky top-0 z-30 glass border-b pt-safe">
      <div className="h-14 px-3 flex items-center gap-2">
        {onBack ? (
          <IconButton label="Go back" variant="plain" onClick={onBack}>
            <ChevronLeft />
          </IconButton>
        ) : (
          <span className="w-11" />
        )}
        <div className="flex-1 min-w-0 text-center">
          {title && <h1 className="text-[17px] font-semibold text-ink truncate">{title}</h1>}
          {subtitle && <p className="text-xs text-ink-3 truncate">{subtitle}</p>}
        </div>
        <div className="w-11 flex justify-end">{trailing}</div>
      </div>
    </header>
  );
}
