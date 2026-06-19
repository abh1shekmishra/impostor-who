import { useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { feedback } from '@/lib/feedback';
import { haptic } from '@/lib/haptics';

interface ChipProps {
  selected?: boolean;
  onClick?: () => void;
  /** Fires after the chip is held for `longPressMs`. Suppresses the tap. */
  onLongPress?: () => void;
  longPressMs?: number;
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
  onLongPress,
  longPressMs = 5000,
  children,
  leading,
  size = 'md',
  className,
  ariaLabel,
}: ChipProps) {
  const timer = useRef<number | undefined>(undefined);
  const fired = useRef(false);
  const [holding, setHolding] = useState(false);

  const startHold = () => {
    if (!onLongPress) return;
    fired.current = false;
    setHolding(true);
    timer.current = window.setTimeout(() => {
      fired.current = true;
      setHolding(false);
      haptic('success');
      onLongPress();
    }, longPressMs);
  };
  const cancelHold = () => {
    if (!onLongPress) return;
    setHolding(false);
    if (timer.current) window.clearTimeout(timer.current);
  };

  return (
    <motion.button
      type="button"
      aria-pressed={selected}
      aria-label={ariaLabel}
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 600, damping: 28 }}
      onPointerDown={startHold}
      onPointerUp={cancelHold}
      onPointerLeave={cancelHold}
      onPointerCancel={cancelHold}
      onClick={() => {
        // A completed long-press already handled the interaction — swallow the tap.
        if (fired.current) {
          fired.current = false;
          return;
        }
        feedback('select');
        onClick?.();
      }}
      className={cn(
        'relative inline-flex items-center gap-1.5 font-medium border transition-colors duration-150 ease-spring whitespace-nowrap overflow-hidden',
        size === 'sm' ? 'h-8 px-3 text-[13px] rounded-xl' : 'h-10 px-4 text-sm rounded-2xl',
        selected
          ? 'bg-brand text-brand-ink border-transparent shadow-soft'
          : 'bg-surface-2 text-ink-2 hover:text-ink',
        className
      )}
    >
      {leading && <span className="text-base leading-none">{leading}</span>}
      {children}
      {onLongPress && (
        <span
          aria-hidden
          className={cn(
            'pointer-events-none absolute bottom-0 left-0 h-0.5',
            selected ? 'bg-brand-ink/70' : 'bg-brand/70'
          )}
          style={{
            width: holding ? '100%' : '0%',
            transition: holding ? `width ${longPressMs}ms linear` : 'width 150ms ease',
          }}
        />
      )}
    </motion.button>
  );
}
