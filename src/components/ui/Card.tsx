import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Adds interactive affordances (cursor, hover lift). */
  interactive?: boolean;
  padded?: boolean;
}

/** A surface container with the standard rounded/soft-shadow treatment. */
export function Card({
  children,
  interactive,
  padded = true,
  className,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        'panel noise-overlay',
        padded && 'p-5',
        interactive &&
          'cursor-pointer transition-all duration-200 ease-spring hover:-translate-y-1 hover:shadow-float active:translate-y-0',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
