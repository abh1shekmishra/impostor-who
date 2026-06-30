import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { feedback, type FeedbackCue } from '@/lib/feedback';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
type Size = 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  /** Feedback cue fired on press; set null to silence. */
  cue?: FeedbackCue | null;
  loading?: boolean;
}

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-brand text-brand-ink shadow-glow hover:brightness-[1.03] active:brightness-95',
  secondary:
    'bg-surface/80 text-ink border backdrop-blur-xl hover:bg-elevated active:bg-elevated',
  ghost: 'bg-transparent text-ink-2 hover:bg-surface/70 active:bg-surface/70',
  danger: 'bg-danger text-white shadow-soft hover:brightness-[1.03] active:brightness-95',
  success: 'bg-success text-white shadow-soft hover:brightness-[1.03] active:brightness-95',
};

const SIZES: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm rounded-xl gap-1.5',
  md: 'h-11 px-5 text-[15px] rounded-2xl gap-2',
  lg: 'h-[3.25rem] px-6 text-base rounded-2xl gap-2',
  xl: 'h-[4.25rem] px-7 text-[17px] rounded-[1.4rem] gap-2.5 font-semibold',
};

/**
 * The single button primitive used everywhere. Built on a motion.button so the
 * press has a subtle, consistent spring. Touch targets meet the 44px minimum.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    fullWidth,
    leadingIcon,
    trailingIcon,
    cue = 'tap',
    loading,
    className,
    children,
    disabled,
    onClick,
    ...rest
  },
  ref
) {
  return (
    <motion.button
      ref={ref}
      whileTap={{ scale: disabled || loading ? 1 : 0.96 }}
      transition={{ type: 'spring', stiffness: 600, damping: 30 }}
      className={cn(
        'relative inline-flex items-center justify-center font-medium select-none',
        'transition-colors duration-150 ease-spring outline-none',
        'disabled:opacity-50 disabled:pointer-events-none',
        VARIANTS[variant],
        SIZES[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || loading}
      onClick={(e) => {
        if (cue) feedback(cue);
        onClick?.(e);
      }}
      {...rest}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <Spinner />
          <span className="opacity-80">{children}</span>
        </span>
      ) : (
        <>
          {leadingIcon && <span className="shrink-0">{leadingIcon}</span>}
          {children}
          {trailingIcon && <span className="shrink-0">{trailingIcon}</span>}
        </>
      )}
    </motion.button>
  );
});

function Spinner() {
  return (
    <span
      className="inline-block h-4 w-4 rounded-full border-2 border-current border-r-transparent animate-spin"
      aria-hidden
    />
  );
}
