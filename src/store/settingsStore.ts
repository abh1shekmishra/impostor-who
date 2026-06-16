import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Settings } from '@/types';
import { setHapticsEnabled } from '@/lib/haptics';
import { setSoundEnabled } from '@/lib/sound';

interface SettingsState extends Settings {
  set: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  toggle: (key: 'sound' | 'animations' | 'haptics' | 'holdToReveal') => void;
}

const DEFAULTS: Settings = {
  theme: 'system',
  sound: true,
  animations: true,
  haptics: true,
  language: 'en',
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
          return next;
        }),
      toggle: (key) =>
        set((state) => {
          const value = !state[key];
          if (key === 'sound') setSoundEnabled(value);
          if (key === 'haptics') setHapticsEnabled(value);
          return { [key]: value } as Partial<SettingsState>;
        }),
    }),
    {
      name: 'uc.settings',
      partialize: (s): Settings => ({
        theme: s.theme,
        sound: s.sound,
        animations: s.animations,
        haptics: s.haptics,
        language: s.language,
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
