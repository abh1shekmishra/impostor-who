import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGame } from '@/store/gameStore';
import { useWakeLock } from '@/hooks';
import { Sheet } from '@/components/ui';
import { UC } from '@/components/uc';
import { feedback } from '@/lib/feedback';
import { LobbyPhase } from './LobbyPhase';
import { RevealPhase } from './RevealPhase';
import { CluePhase } from './CluePhase';
import { DiscussPhase } from './DiscussPhase';
import { VotePhase } from './VotePhase';
import { ImpostorGuessPhase } from './ImpostorGuessPhase';
import { ResultPhase } from './ResultPhase';

const ACTIVE_PHASES = new Set(['reveal', 'clue', 'discuss', 'vote', 'impostor-guess']);

/**
 * Orchestrates the in-match flow. A single AnimatePresence keyed by phase gives
 * every transition the same crisp cross-fade. The X button is available on all
 * active phases so players can quickly get a new word, stay, or bail out.
 */
export function PlayScreen() {
  const phase = useGame((s) => s.phase);
  const redealRound = useGame((s) => s.redealRound);
  const quitToHome = useGame((s) => s.quitToHome);
  const [menuOpen, setMenuOpen] = useState(false);

  // Keep the screen awake during the active rounds (not while just naming).
  useWakeLock(phase !== 'lobby' && phase !== 'setup');

  return (
    <div className="flex-1 flex flex-col relative">
      <AnimatePresence mode="wait" initial={false}>
        <PhaseView key={phase} phase={phase} />
      </AnimatePresence>

      {/* ── X button: visible on all active game phases ── */}
      {ACTIVE_PHASES.has(phase) && (
        <button
          onClick={() => { feedback('tap'); setMenuOpen(true); }}
          aria-label="Game options"
          style={{
            position: 'fixed',
            top: 'max(env(safe-area-inset-top), 16px)',
            right: 16,
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: `1px solid ${UC.border2}`,
            background: 'rgba(20,19,26,0.88)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            color: UC.ink3,
            cursor: 'pointer',
            display: 'grid',
            placeItems: 'center',
            zIndex: 40,
            flexShrink: 0,
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      )}

      {/* ── Game options sheet ── */}
      <Sheet open={menuOpen} onClose={() => setMenuOpen(false)} title="Game Options">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 8 }}>
          {/* New word */}
          <button
            onClick={() => { setMenuOpen(false); redealRound(); }}
            style={{
              width: '100%', padding: '15px 18px', borderRadius: 16,
              border: `1px solid ${UC.border2}`, background: UC.card2,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14,
              textAlign: 'left',
            }}
          >
            <span style={{ fontSize: 24, lineHeight: 1, flexShrink: 0 }}>🔄</span>
            <div>
              <div style={{ font: "700 16px 'Space Grotesk'", color: UC.ink }}>New word &amp; restart reveal</div>
              <div style={{ font: "400 12px 'Space Grotesk'", color: UC.muted, marginTop: 3 }}>Pick a different word and deal roles again</div>
            </div>
          </button>

          {/* Keep word */}
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              width: '100%', padding: '15px 18px', borderRadius: 16,
              border: `1px solid ${UC.border2}`, background: UC.card2,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14,
              textAlign: 'left',
            }}
          >
            <span style={{ fontSize: 24, lineHeight: 1, flexShrink: 0 }}>✅</span>
            <div>
              <div style={{ font: "700 16px 'Space Grotesk'", color: UC.ink }}>Keep this word</div>
              <div style={{ font: "400 12px 'Space Grotesk'", color: UC.muted, marginTop: 3 }}>Continue with the current game</div>
            </div>
          </button>

          {/* Leave game */}
          <button
            onClick={() => { setMenuOpen(false); quitToHome(); }}
            style={{
              width: '100%', padding: '15px 18px', borderRadius: 16,
              border: '1px solid #f5402e44', background: '#1a0c0c',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14,
              textAlign: 'left',
            }}
          >
            <span style={{ fontSize: 24, lineHeight: 1, flexShrink: 0 }}>🚪</span>
            <div>
              <div style={{ font: "700 16px 'Space Grotesk'", color: UC.brand }}>Leave game</div>
              <div style={{ font: "400 12px 'Space Grotesk'", color: '#cf938c', marginTop: 3 }}>End this session and go back home</div>
            </div>
          </button>
        </div>
      </Sheet>
    </div>
  );
}

function PhaseView({ phase }: { phase: string }) {
  switch (phase) {
    case 'lobby':
      return <LobbyPhase />;
    case 'reveal':
      return <RevealPhase />;
    case 'clue':
      return <CluePhase />;
    case 'discuss':
      return <DiscussPhase />;
    case 'vote':
      return <VotePhase />;
    case 'impostor-guess':
      return <ImpostorGuessPhase />;
    case 'result':
      return <ResultPhase />;
    default:
      // 'setup' should never render under the play route; show lobby as a safe fallback.
      return <LobbyPhase />;
  }
}
