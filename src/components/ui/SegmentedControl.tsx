import { motion } from 'framer-motion';
import { useId } from 'react';
import { cn } from '@/lib/cn';
import { feedback } from '@/lib/feedback';

export interface Segment<T extends string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
}

interface SegmentedControlProps<T extends string> {
  value: T;
  segments: Segment<T>[];
  onChange: (value: T) => void;
  ariaLabel?: string;
}

/** iOS-style segmented control with a sliding selection pill (shared layout). */
export function SegmentedControl<T extends string>({
  value,
  segments,
  onChange,
  ariaLabel,
}: SegmentedControlProps<T>) {
  const groupId = useId();
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className="relative flex p-1 rounded-2xl bg-surface/80 border backdrop-blur-xl"
    >
      {segments.map((seg) => {
        const active = seg.value === value;
        return (
          <button
            key={seg.value}
            role="radio"
            aria-checked={active}
            type="button"
            onClick={() => {
              if (!active) {
                feedback('select');
                onChange(seg.value);
              }
            }}
              className={cn(
                'relative flex-1 h-10 inline-flex items-center justify-center gap-1.5 rounded-xl text-sm font-medium transition-colors duration-200 z-10',
                active ? 'text-brand-ink' : 'text-ink-3 hover:text-ink-2'
              )}
          >
            {active && (
              <motion.span
                layoutId={`seg-${groupId}`}
                transition={{ type: 'spring', stiffness: 500, damping: 36 }}
                className="absolute inset-0 -z-10 rounded-xl bg-brand shadow-glow"
              />
            )}
            {seg.icon}
            {seg.label}
          </button>
        );
      })}
    </div>
  );
}
