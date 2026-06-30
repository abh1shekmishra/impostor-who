import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { IconButton } from './IconButton';
import { Close } from './icons';

interface SheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

/**
 * A bottom sheet with a scrim. Traps Escape, locks body scroll, and animates in
 * from the bottom (a familiar mobile pattern). Used for confirmations and
 * secondary flows so we never hard-navigate away mid-game.
 */
export function Sheet({ open, onClose, title, children }: SheetProps) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/66 backdrop-blur-md"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 38 }}
            className="relative w-full max-w-[480px] glass border-t rounded-t-[2rem] p-5 pb-safe shadow-float"
          >
            <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-ink/20" />
            <div className="flex items-center justify-between mb-3">
              {title && <h3 className="text-lg font-semibold text-ink">{title}</h3>}
              <IconButton label="Close" variant="plain" onClick={onClose} className="ml-auto">
                <Close size={20} />
              </IconButton>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
