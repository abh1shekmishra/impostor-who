/** Formatting helpers. */

export function formatTime(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export function pluralize(n: number, singular: string, plural?: string): string {
  return `${n} ${n === 1 ? singular : plural ?? `${singular}s`}`;
}

/** Avatar accent palette indices map to brand-adjacent hues (HSL). */
export const AVATAR_ACCENTS = [
  'hsl(245 80% 62%)',
  'hsl(280 70% 62%)',
  'hsl(330 75% 60%)',
  'hsl(160 65% 45%)',
  'hsl(20 85% 60%)',
  'hsl(200 80% 55%)',
  'hsl(45 90% 55%)',
  'hsl(0 75% 60%)',
] as const;

export function accentFor(index: number): string {
  return AVATAR_ACCENTS[index % AVATAR_ACCENTS.length]!;
}

/** Deterministic initials for an avatar. */
export function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || !parts[0]) return '?';
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}
