import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { feedback } from '@/lib/feedback';

interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'> {
  children: ReactNode;
  label: string; // required for a11y
  variant?: 'plain' | 'surface';
}

/** A square, accessible icon button. `label` becomes the aria-label. */
export function IconButton({
  children,
  label,
  variant = 'surface',
  className,
  onClick,
  ...rest
}: IconButtonProps) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 600, damping: 28 }}
      onClick={(e) => {
        feedback('tap');
        onClick?.(e);
      }}
      className={cn(
        'h-11 w-11 grid place-items-center rounded-2xl text-ink-2 outline-none transition-colors',
        variant === 'surface' && 'bg-surface/80 border backdrop-blur-xl hover:text-ink hover:bg-surface',
        variant === 'plain' && 'hover:bg-white/5 hover:text-ink',
        className
      )}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
