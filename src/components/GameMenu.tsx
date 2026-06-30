import { useState, type ReactNode } from 'react';
import { UC } from './uc';
import { useGame } from '@/store/gameStore';
import { feedback } from '@/lib/feedback';

/**
 * The in-game options button. A persistent ✕ in the top-right of every active
 * round screen opens a sheet with three clear choices: re-roll the word, keep
 * playing, or bail out to home.
 */
export function GameMenu() {
  const [open, setOpen] = useState(false);
  const redealRound = useGame((s) => s.redealRound);
  const quitToHome = useGame((s) => s.quitToHome);

  return (
    <>
      <button
        onClick={() => {
          feedback('tap');
          setOpen(true);
        }}
        aria-label="Game options"
        style={{
          position: 'absolute',
          top: 'max(env(safe-area-inset-top),14px)',
          right: 14,
          zIndex: 30,
          width: 42,
          height: 42,
          borderRadius: '50%',
          border: `1px solid ${UC.border2}`,
          background: UC.card2,
          color: '#c9c6d4',
          cursor: 'pointer',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(6,5,9,.72)',
            backdropFilter: 'blur(3px)',
            zIndex: 50,
            display: 'flex',
            alignItems: 'flex-end',
            animation: 'uc-popIn .2s ease both',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              background: UC.card2,
              borderTopLeftRadius: 26,
              borderTopRightRadius: 26,
              borderTop: `1px solid ${UC.border2}`,
              padding: '14px 20px max(env(safe-area-inset-bottom),22px)',
              animation: 'uc-screenIn .28s ease both',
            }}
          >
            <div style={{ width: 44, height: 5, borderRadius: 999, background: UC.borderDash, margin: '0 auto 16px' }} />
            <h3 style={{ margin: '0 0 4px', fontFamily: "'Anton'", fontSize: 26, textTransform: 'uppercase', color: UC.ink }}>
              Game options
            </h3>
            <p style={{ margin: '0 0 16px', font: "400 13px 'Space Grotesk'", color: UC.muted }}>
              Bad word, or someone peeked? Re-roll, keep going, or leave.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Option
                tint={UC.blue}
                label="New word & restart reveal"
                onClick={() => {
                  feedback('select');
                  redealRound();
                  setOpen(false);
                }}
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                    <path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
                  </svg>
                }
              />
              <Option
                tint={UC.green}
                label="Keep this word"
                onClick={() => {
                  feedback('tap');
                  setOpen(false);
                }}
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M5 12l5 5 9-11" />
                  </svg>
                }
              />
              <Option
                danger
                label="Leave game"
                onClick={() => {
                  feedback('lose');
                  quitToHome();
                }}
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                  </svg>
                }
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Option({
  icon,
  label,
  onClick,
  tint = UC.brand,
  danger,
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  tint?: string;
  danger?: boolean;
}) {
  const color = danger ? '#f5402e' : tint;
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 13,
        padding: 16,
        borderRadius: 16,
        border: `1px solid ${danger ? '#3a2526' : UC.border}`,
        background: danger ? '#1a0e0f' : UC.card3,
        cursor: 'pointer',
        width: '100%',
        textAlign: 'left',
      }}
    >
      <span
        style={{
          flex: '0 0 auto',
          width: 42,
          height: 42,
          borderRadius: 12,
          display: 'grid',
          placeItems: 'center',
          color,
          background: `${color}1a`,
          border: `1px solid ${color}44`,
        }}
      >
        {icon}
      </span>
      <span style={{ font: "700 16px 'Space Grotesk'", color: danger ? '#f3a59c' : UC.ink }}>{label}</span>
    </button>
  );
}
