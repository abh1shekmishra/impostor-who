import { Screen } from '@/components/Screen';
import { UC, ArrowRight } from '@/components/uc';
import { useGame, type Route } from '@/store/gameStore';
import { feedback } from '@/lib/feedback';

/**
 * Library — the game station's landing hub, and the one screen that breaks out of
 * the phone canvas: full-bleed on mobile, a wide centered layout on desktop. New
 * titles get added to GAMES and wired to their own route. Cards flow in an
 * auto-fit grid (1-up on phones, 2-up+ on desktop) with no hard breakpoints.
 * RedHut Studios is credited quietly in the footer, per brief.
 */
interface GameEntry {
  key: string;
  name: string;
  tagline: string;
  blurb: string;
  icon: string;
  accent: string;
  route: Route;
  badge?: string;
}

const GAMES: GameEntry[] = [
  {
    key: 'undercover',
    name: 'Undercover',
    tagline: 'Social Deduction · 4–20 players',
    blurb: 'One word. One liar. Pass the phone around the room and sniff out the impostor.',
    icon: '🕵️',
    accent: UC.brand,
    route: 'home',
  },
  {
    key: 'glyph',
    name: 'GLYPH',
    tagline: 'Daily Emoji Puzzle · Solo',
    blurb: 'Decode the emoji — Bollywood, cricket, street food, muhavare. Five fresh puzzles every day.',
    icon: '🧩',
    accent: '#ffc24b',
    route: 'glyph',
    badge: 'NEW',
  },
];

export function LibraryScreen() {
  const navigate = useGame((s) => s.navigate);

  return (
    <Screen enter="fade" className="min-h-0">
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }} className="no-scrollbar">
        <div
          style={{
            width: '100%',
            maxWidth: 1080,
            margin: '0 auto',
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding:
              'max(env(safe-area-inset-top),clamp(26px,3.5vw,52px)) clamp(20px,4vw,48px) max(env(safe-area-inset-bottom),24px)',
          }}
        >
          {/* Top row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <span
                style={{
                  width: 13,
                  height: 13,
                  borderRadius: '50%',
                  background: UC.brand,
                  boxShadow: `0 0 16px ${UC.brand}`,
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  font: "700 12px 'Space Mono'",
                  letterSpacing: '.22em',
                  color: UC.ink3,
                  textTransform: 'uppercase',
                }}
              >
                Game Library
              </span>
            </div>
            <button
              onClick={() => {
                feedback('tap');
                navigate('settings');
              }}
              aria-label="Settings"
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
              }}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="3.2" />
                <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5 5l2.1 2.1M16.9 16.9 19 19M19 5l-2.1 2.1M7.1 16.9 5 19" />
              </svg>
            </button>
          </div>

          <div className="lib-body">
          {/* Hero */}
          <div>
            <h1
              style={{
                margin: 0,
                fontFamily: "'Anton'",
                fontSize: 'clamp(3rem, 16vw, 6rem)',
                lineHeight: 0.88,
                letterSpacing: '.01em',
                color: UC.ink,
                textTransform: 'uppercase',
              }}
            >
              Pick a game
            </h1>
            <p
              style={{
                margin: 'clamp(14px,1.6vw,22px) 0 0',
                maxWidth: 440,
                fontSize: 'clamp(15px,1.4vw,19px)',
                lineHeight: 1.45,
                color: UC.ink2,
              }}
            >
              {GAMES.length} ways to kill time. No login, no download — just tap and play.
            </p>
          </div>

          {/* Game cards — auto-fit grid: 1-up on phones, 2-up+ on desktop */}
          <div
            style={{
              display: 'grid',
              gap: 16,
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            }}
          >
            {GAMES.map((g) => (
              <button
                key={g.key}
                onClick={() => {
                  feedback('select');
                  navigate(g.route);
                }}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  width: '100%',
                  textAlign: 'left',
                  cursor: 'pointer',
                  padding: 20,
                  borderRadius: 20,
                  border: `1px solid ${UC.border}`,
                  background: UC.card,
                }}
              >
                <span
                  aria-hidden
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(130% 150% at 0% 0%, ${g.accent}14, transparent 55%)`,
                    pointerEvents: 'none',
                  }}
                />
                <span
                  style={{
                    flex: '0 0 auto',
                    width: 64,
                    height: 64,
                    borderRadius: 16,
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: 32,
                    background: `${g.accent}1f`,
                    border: `1px solid ${g.accent}3a`,
                  }}
                >
                  {g.icon}
                </span>
                <span style={{ display: 'flex', flexDirection: 'column', gap: 5, minWidth: 0, flex: 1 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ font: "700 19px 'Space Grotesk'", color: UC.ink }}>{g.name}</span>
                    {g.badge && (
                      <span
                        style={{
                          font: "700 9px 'Space Mono'",
                          letterSpacing: '.12em',
                          color: '#2a1c00',
                          background: g.accent,
                          padding: '2px 6px',
                          borderRadius: 6,
                        }}
                      >
                        {g.badge}
                      </span>
                    )}
                  </span>
                  <span
                    style={{
                      font: "600 11px 'Space Mono'",
                      letterSpacing: '.05em',
                      color: g.accent,
                      textTransform: 'uppercase',
                    }}
                  >
                    {g.tagline}
                  </span>
                  <span style={{ font: "400 13px 'Space Grotesk'", lineHeight: 1.4, color: UC.muted }}>
                    {g.blurb}
                  </span>
                </span>
                <span style={{ flex: '0 0 auto', alignSelf: 'center', color: g.accent }}>
                  <ArrowRight size={20} />
                </span>
              </button>
            ))}
          </div>

          {/* Coming soon — full-width strip below the grid */}
          <div
            aria-label="More games coming soon"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              padding: '16px 18px',
              borderRadius: 15,
              border: `1px dashed ${UC.borderDash}`,
              background: UC.card3,
            }}
          >
            <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span
                style={{
                  font: "700 11px 'Space Mono'",
                  letterSpacing: '.18em',
                  textTransform: 'uppercase',
                  color: UC.gold,
                }}
              >
                Coming soon
              </span>
              <span style={{ font: "400 12px 'Space Grotesk'", color: UC.muted }}>
                More games are in the works.
              </span>
            </span>
            <span style={{ flex: '0 0 auto', fontSize: 22, opacity: 0.5 }}>🎮</span>
          </div>

          </div>
          {/* Footer — quiet studio credit */}
          <div style={{ paddingTop: 24, display: 'flex', justifyContent: 'center' }}>
            <a
              href="https://redhutstudios.in/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => feedback('tap')}
              style={{
                font: "600 10px 'Space Mono'",
                letterSpacing: '.26em',
                textTransform: 'uppercase',
                color: UC.muted2,
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              Powered by RedHut Studios
            </a>
          </div>
        </div>
      </div>
    </Screen>
  );
}
