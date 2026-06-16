import { clsx, type ClassValue } from 'clsx';

/** Conditional className join. Kept as its own module for a stable import path. */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
