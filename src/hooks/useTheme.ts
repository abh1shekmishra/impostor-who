import { useEffect } from 'react';
import { useSettings } from '@/store/settingsStore';

/**
 * Applies the user's theme preference to <html> and keeps it in sync with the
 * OS when set to "system". Also updates the browser theme-color meta so the
 * PWA chrome matches. Mounted once near the app root.
 */
export function useThemeEffect(): void {
  const theme = useSettings((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');

    const apply = () => {
      const dark = theme === 'dark' || (theme === 'system' && mql.matches);
      root.classList.toggle('dark', dark);
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', dark ? '#0B0B0F' : '#F7F7F9');
    };

    apply();
    if (theme === 'system') {
      mql.addEventListener('change', apply);
      return () => mql.removeEventListener('change', apply);
    }
    return undefined;
  }, [theme]);
}
