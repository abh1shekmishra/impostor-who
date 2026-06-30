import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { feedback } from '@/lib/feedback';

interface ToggleProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  id?: string;
}

/** Accessible switch with a spring thumb. Renders as a labelled row when given a label. */
export function Toggle({
  checked,
  onChange,
  label,
  description,
  disabled,
  id,
}: ToggleProps) {
  const control = (
    <button
      type="button"
      role="switch"
      id={id}
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => {
        feedback('select');
        onChange(!checked);
      }}
      className={cn(
        'relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200 ease-spring outline-none border border-white/5',
        'disabled:opacity-40',
        checked ? 'bg-brand shadow-glow' : 'bg-white/10'
      )}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 700, damping: 34 }}
        className={cn(
          'absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm',
          checked ? 'left-6' : 'left-1'
        )}
      />
    </button>
  );

  if (!label) return control;

  return (
    <label
      htmlFor={id}
      className="flex items-center justify-between gap-4 py-2.5 cursor-pointer"
    >
      <span className="min-w-0">
        <span className="block text-[15px] font-medium text-ink">{label}</span>
        {description && (
          <span className="block text-[13px] text-ink-3 mt-0.5">{description}</span>
        )}
      </span>
      {control}
    </label>
  );
}
