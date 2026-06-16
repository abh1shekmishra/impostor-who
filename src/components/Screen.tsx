import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks';
import { cn } from '@/lib/cn';

interface ScreenProps {
  children: ReactNode;
  className?: string;
  /** Direction of the enter animation. */
  enter?: 'right' | 'up' | 'fade';
}

/**
 * Wraps a screen with a consistent, fast enter transition. Respects reduced
 * motion (renders instantly). Designed to sit inside <AnimatePresence> keyed by
 * route/phase so screens cross-fade as the player advances.
 */
export function Screen({ children, className, enter = 'right' }: ScreenProps) {
  const reduced = useReducedMotion();
  const variants = {
    right: { initial: { opacity: 0, x: 24 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -16 } },
    up: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -12 } },
    fade: { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } },
  }[enter];

  if (reduced) {
    return <div className={cn('flex-1 flex flex-col', className)}>{children}</div>;
  }

  return (
    <motion.div
      initial={variants.initial}
      animate={variants.animate}
      exit={variants.exit}
      transition={{ type: 'spring', stiffness: 420, damping: 38, mass: 0.7 }}
      className={cn('flex-1 flex flex-col', className)}
    >
      {children}
    </motion.div>
  );
}
