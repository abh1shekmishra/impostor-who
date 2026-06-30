import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Settings } from '@/types';
import { setHapticsEnabled } from '@/lib/haptics';
import { setSoundEnabled } from '@/lib/sound';
import { track } from '@/lib/analytics';

interface SettingsState extends Settings {
  set: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  toggle: (key: 'sound' | 'animations' | 'haptics' | 'holdToReveal') => void;
}

const DEFAULTS: Settings = {
  theme: 'dark',
  sound: true,
  animations: true,
  haptics: true,
  holdToReveal: true,
};

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      ...DEFAULTS,
      set: (key, value) =>
        set((state) => {
          const next = { ...state, [key]: value };
          if (key === 'sound') setSoundEnabled(value as boolean);
          if (key === 'haptics') setHapticsEnabled(value as boolean);
          track('settings_changed', { key, value });
          return next;
        }),
      toggle: (key) =>
        set((state) => {
          const value = !state[key];
          if (key === 'sound') setSoundEnabled(value);
          if (key === 'haptics') setHapticsEnabled(value);
          track('settings_changed', { key, value });
          return { [key]: value } as Partial<SettingsState>;
        }),
    }),
    {
      name: 'uc.settings',
      // v3: Undercover.dc is a dark-only ("Cinema dark") design — force dark so a
      // previously-persisted light/system preference can't render the new UI wrong.
      version: 3,
      migrate: (persistedState) => {
        const state = persistedState as Partial<Settings> | undefined;
        return {
          ...DEFAULTS,
          ...(state ?? {}),
          theme: 'dark',
        };
      },
      partialize: (s): Settings => ({
        theme: s.theme,
        sound: s.sound,
        animations: s.animations,
        haptics: s.haptics,
        holdToReveal: s.holdToReveal,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          setSoundEnabled(state.sound);
          setHapticsEnabled(state.haptics);
        }
      },
    }
  )
);
