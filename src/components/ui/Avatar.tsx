import { cn } from '@/lib/cn';
import { accentFor, initials } from '@/lib/format';

interface AvatarProps {
  name: string;
  accent: number;
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
  className?: string;
}

const SIZES = {
  sm: 'h-9 w-9 text-xs',
  md: 'h-12 w-12 text-sm',
  lg: 'h-16 w-16 text-lg',
};

/** A colourful initial-based avatar. Deterministic accent keeps players recognizable. */
export function Avatar({ name, accent, size = 'md', active, className }: AvatarProps) {
  return (
    <span
      className={cn(
        'relative grid place-items-center rounded-full font-semibold text-white shrink-0 select-none',
        SIZES[size],
        active && 'ring-2 ring-offset-2 ring-offset-canvas ring-brand',
        className
      )}
      style={{
        background: `linear-gradient(135deg, ${accentFor(accent)}, ${accentFor(accent + 3)})`,
      }}
      aria-hidden
    >
      {initials(name)}
    </span>
  );
}
