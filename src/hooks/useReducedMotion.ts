import { useEffect, useState } from 'react';
import { useSettings } from '@/store/settingsStore';

/**
 * True when motion should be minimized — either the user disabled animations
 * in settings or the OS requests reduced motion. Components use this to swap
 * springy transitions for instant ones.
 */
export function useReducedMotion(): boolean {
  const animationsEnabled = useSettings((s) => s.animations);
  const [osReduced, setOsReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setOsReduced(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  return !animationsEnabled || osReduced;
}
