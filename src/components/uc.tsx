import type { CSSProperties, ReactNode } from 'react';

/**
 * Shared building blocks for the Undercover.dc port. These mirror the design's
 * inline styling verbatim (palette, radii, typography) so every screen stays
 * pixel-consistent without re-declaring the same chrome.
 */

export const UC = {
  ink: '#f4f2f7',
  ink2: '#b6b3c2',
  ink3: '#9a97a8',
  muted: '#8b8898',
  muted2: '#6b6878',
  brand: '#f5402e',
  blue: '#46c2ff',
  gold: '#e8b339',
  green: '#36c98a',
  purple: '#b083ff',
  card: '#14131a',
  card2: '#16151c',
  card3: '#100f15',
  border: '#232230',
  border2: '#2a2935',
  borderDash: '#3a3848',
} as const;

/** Standard screen section padding from the design. */
export const sectionPad: CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  padding:
    'max(env(safe-area-inset-top),22px) 22px max(env(safe-area-inset-bottom),24px)',
};

export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Back"
      style={{
        width: 42,
        height: 42,
        borderRadius: '50%',
        border: `1px solid ${UC.border2}`,
        background: UC.card2,
        color: '#c9c6d4',
        cursor: 'pointer',
        display: 'grid',
        placeItems: 'center',
        flex: '0 0 auto',
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M15 6l-6 6 6 6" />
      </svg>
    </button>
  );
}

export function TopBar({
  title,
  subtitle,
  onBack,
  right,
  marginBottom = 20,
}: {
  title: string;
  subtitle?: string;
  onBack: () => void;
  right?: ReactNode;
  marginBottom?: number;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom }}>
      <BackButton onClick={onBack} />
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <h2
          style={{
            margin: 0,
            fontFamily: "'Anton'",
            fontSize: 30,
            lineHeight: 1,
            textTransform: 'uppercase',
            color: UC.ink,
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <span style={{ font: "500 12px 'Space Mono'", color: UC.muted, letterSpacing: '.05em' }}>
            {subtitle}
          </span>
        )}
      </div>
      {right && <div style={{ marginLeft: 'auto' }}>{right}</div>}
    </div>
  );
}

export function ArrowRight({ size = 19 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** The pill toggle switch used by Create and Settings. */
export function Switch({ on }: { on: boolean }) {
  return (
    <span
      style={{
        flex: '0 0 auto',
        width: 52,
        height: 31,
        borderRadius: 999,
        padding: 3,
        display: 'flex',
        alignItems: 'center',
        transition: 'background .2s',
        background: on ? UC.brand : UC.border2,
      }}
    >
      <span
        style={{
          width: 25,
          height: 25,
          borderRadius: '50%',
          background: '#fff',
          transition: 'transform .2s',
          transform: `translateX(${on ? '21px' : '0px'})`,
          boxShadow: '0 2px 6px rgba(0,0,0,.4)',
        }}
      />
    </span>
  );
}

/** The big red call-to-action used across the design. */
export function PrimaryButton({
  children,
  onClick,
  disabled,
  trailing,
  style,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  trailing?: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: '100%',
        border: 0,
        borderRadius: 18,
        padding: 20,
        font: "700 18px 'Space Grotesk'",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        ...(disabled
          ? { background: '#1d1c25', color: UC.muted2, cursor: 'not-allowed' }
          : {
              background: UC.brand,
              color: '#fff',
              cursor: 'pointer',
              boxShadow: '0 14px 34px -12px #f5402ecc',
            }),
        ...style,
      }}
    >
      {children}
      {trailing}
    </button>
  );
}
