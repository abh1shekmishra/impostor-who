import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { feedback } from '@/lib/feedback';

interface ChipProps {
  selected?: boolean;
  onClick?: () => void;
  children: ReactNode;
  leading?: ReactNode;
  size?: 'sm' | 'md';
  className?: string;
  ariaLabel?: string;
}

/** Selectable pill used for categories, difficulties, timers, and filters. */
export function Chip({
  selected,
  onClick,
  children,
  leading,
  size = 'md',
  className,
  ariaLabel,
}: ChipProps) {
  return (
    <motion.button
      type="button"
      aria-pressed={selected}
      aria-label={ariaLabel}
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 600, damping: 28 }}
      onClick={() => {
        feedback('select');
        onClick?.();
      }}
      className={cn(
        'inline-flex items-center gap-1.5 font-medium border transition-colors duration-150 ease-spring whitespace-nowrap',
        size === 'sm' ? 'h-8 px-3 text-[13px] rounded-xl' : 'h-10 px-4 text-sm rounded-2xl',
        selected
          ? 'bg-brand text-brand-ink border-transparent shadow-soft'
          : 'bg-surface-2 text-ink-2 hover:text-ink',
        className
      )}
    >
      {leading && <span className="text-base leading-none">{leading}</span>}
      {children}
    </motion.button>
  );
}
