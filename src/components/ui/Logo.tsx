import { cn } from '@/lib/cn';

interface LogoProps {
  size?: number;
  className?: string;
  withWordmark?: boolean;
}

/**
 * The Undercover mark: a soft-rounded squircle with a single peeking eye —
 * "one of you is hidden". Pure SVG, scales crisply, themes via currentColor.
 */
export function LogoMark({ size = 64, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="uc-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgb(var(--c-brand))" />
          <stop offset="100%" stopColor="rgb(var(--c-brand-2))" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="18" fill="url(#uc-grad)" />
      <path
        d="M14 34c4-7 11-11 18-11s14 4 18 11c-4 7-11 11-18 11s-14-4-18-11z"
        fill="rgb(var(--c-brand-ink))"
        fillOpacity="0.16"
      />
      <circle cx="32" cy="34" r="8.5" fill="rgb(var(--c-brand-ink))" />
      <circle cx="32" cy="34" r="4" fill="url(#uc-grad)" />
      <circle cx="34.5" cy="31.5" r="1.4" fill="rgb(var(--c-brand-ink))" />
    </svg>
  );
}

export function Logo({ size = 64, className, withWordmark = true }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <LogoMark size={size} />
      {withWordmark && (
        <span className="font-display text-2xl font-semibold tracking-tight text-ink">
          Undercover
        </span>
      )}
    </div>
  );
}
