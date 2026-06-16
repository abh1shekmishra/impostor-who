import { cn } from '@/lib/cn';

interface ProgressRingProps {
  /** 0–1 progress. */
  progress: number;
  size?: number;
  stroke?: number;
  children?: React.ReactNode;
  className?: string;
  /** Turns the ring warning/danger as it depletes. */
  urgency?: 'normal' | 'warn' | 'danger';
}

/** SVG progress ring used by the discussion timer. GPU-cheap, no layout. */
export function ProgressRing({
  progress,
  size = 120,
  stroke = 8,
  children,
  className,
  urgency = 'normal',
}: ProgressRingProps) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(1, progress));
  const dash = circumference * (1 - clamped);
  const color =
    urgency === 'danger'
      ? 'rgb(var(--c-danger))'
      : urgency === 'warn'
        ? 'rgb(var(--c-warning))'
        : 'rgb(var(--c-brand))';

  return (
    <div className={cn('relative grid place-items-center', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgb(var(--c-ink) / 0.08)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dash}
          style={{ transition: 'stroke-dashoffset 0.3s linear, stroke 0.4s ease' }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  );
}
