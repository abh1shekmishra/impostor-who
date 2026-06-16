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
        'panel',
        padded && 'p-5',
        interactive &&
          'cursor-pointer transition-transform duration-200 ease-spring hover:-translate-y-0.5 active:translate-y-0',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
