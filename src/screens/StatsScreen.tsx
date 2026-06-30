import { Screen } from '@/components/Screen';
import { UC, TopBar } from '@/components/uc';
import { useGame } from '@/store/gameStore';
import { useStats } from '@/store/statsStore';
import { CATEGORY_BY_ID } from '@/data/categories';
import type { CategoryId } from '@/types';

/**
 * Your Record — headline rates, an outcome breakdown, and quick tallies. Layout
 * ported from Undercover.dc, bound to the device's real local stats.
 */
export function StatsScreen() {
  const navigate = useGame((s) => s.navigate);
  const stats = useStats();

  const rounds = stats.roundsPlayed;
  const civWinRate = rounds ? Math.round((stats.civilianWins / rounds) * 100) : 0;
  const escapeRate = stats.timesImpostor
    ? Math.round(((stats.timesImpostor - stats.timesCaught) / stats.timesImpostor) * 100)
    : 0;
  const favCat = stats.favoriteCategory ? CATEGORY_BY_ID.get(stats.favoriteCategory as CategoryId) : null;
  const mostPlayed = favCat?.label ?? 'Mix';

  const total = Math.max(1, rounds);
  const bars = [
    { label: 'Civilians caught the impostor', value: stats.civilianWins, color: UC.blue },
    { label: 'Impostor survived the vote', value: Math.max(0, stats.impostorWins - stats.impostorWordGuesses), color: UC.gold },
    { label: 'Impostor stole the word', value: stats.impostorWordGuesses, color: UC.brand },
  ];

  const bigCard = {
    padding: 18,
    borderRadius: 18,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  } as const;
  const cell = {
    padding: 15,
    borderRadius: 16,
    border: `1px solid ${UC.border}`,
    background: UC.card,
    textAlign: 'center',
  } as const;

  return (
    <Screen enter="up">
      <section
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          minHeight: 0,
          padding: 'max(env(safe-area-inset-top),22px) 22px max(env(safe-area-inset-bottom),24px)',
        }}
        className="no-scrollbar"
      >
        <TopBar title="Your Record" onBack={() => navigate('home')} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 11 }}>
            <div style={{ ...bigCard, border: '1px solid #46c2ff33', background: 'linear-gradient(160deg,#0e1a22,#11131a)' }}>
              <span style={{ fontFamily: "'Anton'", fontSize: 40, color: UC.blue }}>{civWinRate}%</span>
              <span style={{ font: "600 13px 'Space Grotesk'", color: UC.ink3 }}>Civilian win rate</span>
            </div>
            <div style={{ ...bigCard, border: '1px solid #f5402e33', background: 'linear-gradient(160deg,#1a0e0f,#14111a)' }}>
              <span style={{ fontFamily: "'Anton'", fontSize: 40, color: UC.brand }}>{escapeRate}%</span>
              <span style={{ font: "600 13px 'Space Grotesk'", color: UC.ink3 }}>Impostor escape rate</span>
            </div>
          </div>

          <div style={{ padding: 18, borderRadius: 18, border: `1px solid ${UC.border}`, background: UC.card, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <span style={{ font: "600 13px 'Space Grotesk'", color: UC.ink3 }}>Outcomes across {rounds} rounds</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              {bars.map((b) => (
                <div key={b.label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ font: "600 13px 'Space Grotesk'", color: '#d9d6e2' }}>{b.label}</span>
                    <span style={{ font: "700 13px 'Space Mono'", color: UC.ink3 }}>{b.value}</span>
                  </div>
                  <div style={{ height: 9, borderRadius: 999, background: UC.border, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(b.value / total) * 100}%`, borderRadius: 999, background: b.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 11 }}>
            <div style={cell}>
              <div style={{ fontFamily: "'Anton'", fontSize: 28, color: UC.ink }}>{rounds}</div>
              <div style={{ font: "600 11px 'Space Grotesk'", color: UC.muted }}>Rounds</div>
            </div>
            <div style={cell}>
              <div style={{ fontFamily: "'Anton'", fontSize: 28, color: UC.gold }}>{stats.bestStreak}</div>
              <div style={{ font: "600 11px 'Space Grotesk'", color: UC.muted }}>Best streak</div>
            </div>
            <div style={cell}>
              <div style={{ fontFamily: "'Anton'", fontSize: 28, color: UC.ink }}>{mostPlayed}</div>
              <div style={{ font: "600 11px 'Space Grotesk'", color: UC.muted }}>Most played</div>
            </div>
          </div>
        </div>
      </section>
    </Screen>
  );
}
