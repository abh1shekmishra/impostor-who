import { cn } from '@/lib/cn';
import { feedback } from '@/lib/feedback';

interface StepperProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (next: number) => void;
  label?: string;
  suffix?: string;
}

/** A large, thumb-friendly numeric stepper for player/impostor counts. */
export function Stepper({
  value,
  min,
  max,
  step = 1,
  onChange,
  label,
  suffix,
}: StepperProps) {
  const set = (next: number) => {
    const clamped = Math.max(min, Math.min(max, next));
    if (clamped !== value) {
      feedback('tap');
      onChange(clamped);
    }
  };
  return (
    <div className="flex items-center justify-between">
      {label && <span className="text-[15px] font-medium text-ink">{label}</span>}
      <div className="flex items-center gap-3">
        <RoundBtn
          ariaLabel={`Decrease ${label ?? ''}`}
          disabled={value <= min}
          onClick={() => set(value - step)}
        >
          <MinusIcon />
        </RoundBtn>
        <div className="min-w-[3.5rem] text-center tabular-nums">
          <span className="text-2xl font-semibold text-ink">{value}</span>
          {suffix && <span className="ml-1 text-sm text-ink-3">{suffix}</span>}
        </div>
        <RoundBtn
          ariaLabel={`Increase ${label ?? ''}`}
          disabled={value >= max}
          onClick={() => set(value + step)}
        >
          <PlusIcon />
        </RoundBtn>
      </div>
    </div>
  );
}

function RoundBtn({
  children,
  onClick,
  disabled,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'h-11 w-11 grid place-items-center rounded-2xl bg-surface-2 border text-ink',
        'transition-transform duration-150 ease-spring active:scale-90',
        'disabled:opacity-30 disabled:active:scale-100'
      )}
    >
      {children}
    </button>
  );
}

const MinusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
