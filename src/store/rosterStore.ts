import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Person {
  id: string;
  name: string;
  /** Stable avatar accent index, assigned on creation. */
  accent: number;
}

interface RosterState {
  people: Person[];
  add: (name: string) => Person | null;
  remove: (id: string) => void;
  rename: (id: string, name: string) => void;
  clear: () => void;
}

const norm = (s: string) => s.trim().replace(/\s+/g, ' ');

/**
 * The "your people" roster — friends/family you play with regularly. Persisted
 * locally so they're one tap away when setting up the next room. No accounts,
 * no sync; it lives entirely on the device like everything else.
 */
export const useRoster = create<RosterState>()(
  persist(
    (set, get) => ({
      people: [],
      add: (rawName) => {
        const name = norm(rawName);
        if (!name) return null;
        const existing = get().people.find(
          (p) => p.name.toLowerCase() === name.toLowerCase()
        );
        if (existing) return existing;
        const person: Person = {
          id: `person-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
          name,
          accent: get().people.length % 8,
        };
        set((s) => ({ people: [...s.people, person] }));
        return person;
      },
      remove: (id) => set((s) => ({ people: s.people.filter((p) => p.id !== id) })),
      rename: (id, rawName) => {
        const name = norm(rawName);
        if (!name) return;
        set((s) => ({
          people: s.people.map((p) => (p.id === id ? { ...p, name } : p)),
        }));
      },
      clear: () => set({ people: [] }),
    }),
    { name: 'uc.roster' }
  )
);
