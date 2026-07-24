import { Screen } from '@/components/Screen';
import { UC, ArrowRight, BackButton } from '@/components/uc';
import { useGame } from '@/store/gameStore';
import { useStats } from '@/store/statsStore';
import { feedback } from '@/lib/feedback';

/**
 * Home — the cinematic hero. One dominant "Start a Game" action, a 2×2 grid of
 * quiet secondary entries, and a teaser for online multiplayer. Ported 1:1 from
 * Undercover.dc.
 */
const NAV_CARDS = [
  { key: 'people', label: 'People', desc: 'Saved names', icon: '👥', route: 'people' as const },
  { key: 'packs', label: 'Packs', desc: 'Word sets', icon: '📦', route: 'packs' as const },
  { key: 'stats', label: 'Stats', desc: 'Your record', icon: '📊', route: 'stats' as const },
  { key: 'howto', label: 'How to play', desc: '60 seconds', icon: '？', route: 'how-to' as const },
];

export function HomeScreen() {
  const navigate = useGame((s) => s.navigate);
  const roundsPlayed = useStats((s) => s.roundsPlayed);

  return (
    <Screen enter="fade">
      <section
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: 'max(env(safe-area-inset-top),26px) 24px max(env(safe-area-inset-bottom),24px)',
        }}
      >
        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <BackButton onClick={() => navigate('library')} />
            <span
              style={{
                font: "700 12px 'Space Mono'",
                letterSpacing: '.22em',
                color: UC.ink3,
                textTransform: 'uppercase',
              }}
            >
              Library
            </span>
          </div>
          <button
            onClick={() => navigate('settings')}
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

        {/* Hero */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 18,
            padding: '30px 0',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignSelf: 'flex-start',
              alignItems: 'center',
              gap: 8,
              padding: '7px 13px',
              borderRadius: 999,
              border: `1px solid ${UC.border2}`,
              background: '#ffffff06',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: UC.green }} />
            <span style={{ font: "600 12px 'Space Grotesk'", color: '#c9c6d4' }}>
              You’ve hosted {roundsPlayed} rounds
            </span>
          </div>
          <h1
            style={{
              margin: 0,
              fontFamily: "'Anton'",
              fontSize: 'clamp(3.4rem, 21vw, 5.25rem)',
              lineHeight: 0.86,
              letterSpacing: '.01em',
              color: UC.ink,
              textTransform: 'uppercase',
            }}
          >
            Under
            <br />
            cover
          </h1>
          <p style={{ margin: 0, maxWidth: 300, fontSize: 18, lineHeight: 1.4, color: UC.ink2 }}>
            One word. One liar.
            <br />
            One phone going around the room.
          </p>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <button
            onClick={() => {
              feedback('select');
              navigate('create');
            }}
            style={{
              width: '100%',
              border: 0,
              borderRadius: 18,
              padding: 21,
              background: UC.brand,
              color: '#fff',
              font: "700 19px 'Space Grotesk'",
              letterSpacing: '.01em',
              cursor: 'pointer',
              boxShadow: '0 14px 34px -10px #f5402ecc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
            }}
          >
            Start a Game
            <ArrowRight size={20} />
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {NAV_CARDS.map((n) => (
              <button
                key={n.key}
                onClick={() => {
                  feedback('tap');
                  navigate(n.route);
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 10,
                  padding: 16,
                  borderRadius: 15,
                  border: `1px solid ${UC.border}`,
                  background: UC.card,
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span style={{ color: UC.brand, fontSize: 20, lineHeight: 1 }}>{n.icon}</span>
                <span style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <span style={{ font: "700 15px 'Space Grotesk'", color: UC.ink }}>{n.label}</span>
                  <span style={{ font: "400 12px 'Space Grotesk'", color: UC.muted }}>{n.desc}</span>
                </span>
              </button>
            ))}
          </div>

          <div
            aria-label="Online multiplayer — coming soon"
            style={{
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              padding: '16px 18px',
              borderRadius: 15,
              border: `1px dashed ${UC.borderDash}`,
              background: UC.card3,
              textAlign: 'left',
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
              <span style={{ font: "600 15px 'Space Grotesk'", color: '#d9d6e2' }}>Online multiplayer</span>
              <span style={{ font: "400 12px 'Space Grotesk'", color: UC.muted }}>
                Play across the room — or across the world.
              </span>
            </span>
            <span
              style={{
                flex: '0 0 auto',
                width: 38,
                height: 38,
                borderRadius: 11,
                border: `1px solid ${UC.border2}`,
                display: 'grid',
                placeItems: 'center',
                color: UC.muted2,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="5" width="18" height="13" rx="2" />
                <path d="M8 21h8M12 18v3" />
              </svg>
            </span>
          </div>
        </div>
      </section>
    </Screen>
  );
}
