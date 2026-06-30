import { cn } from '@/lib/cn';
import { firstInitial, ucColor } from '@/lib/format';

interface AvatarProps {
  name: string;
  accent: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Adds the design's coloured drop-glow under the tile (used on big avatars). */
  glow?: boolean;
  active?: boolean;
  className?: string;
}

/**
 * Square initial avatar, matching Undercover.dc: a solid palette tile with a
 * single uppercase initial in near-black ink. Deterministic colour keeps each
 * player recognizable across the reveal, clue, vote and lobby screens.
 */
const SIZES: Record<NonNullable<AvatarProps['size']>, { box: number; radius: number; font: number }> = {
  sm: { box: 40, radius: 12, font: 17 },
  md: { box: 54, radius: 16, font: 24 },
  lg: { box: 96, radius: 28, font: 42 },
  xl: { box: 108, radius: 32, font: 48 },
};

export function Avatar({ name, accent, size = 'md', glow, active, className }: AvatarProps) {
  const { box, radius, font } = SIZES[size];
  const color = ucColor(accent);
  return (
    <span
      className={cn('grid place-items-center font-sans font-bold shrink-0 select-none', className)}
      style={{
        width: box,
        height: box,
        borderRadius: radius,
        fontSize: font,
        color: '#0b0a0f',
        background: color,
        boxShadow: glow ? `0 18px 50px -12px ${color}` : undefined,
        outline: active ? `2px solid ${color}` : undefined,
        outlineOffset: active ? 2 : undefined,
      }}
      aria-hidden
    >
      {firstInitial(name)}
    </span>
  );
}
