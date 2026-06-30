import { Screen } from '@/components/Screen';
import { UC, TopBar } from '@/components/uc';
import { useGame } from '@/store/gameStore';
import { ALL_WORDS } from '@/data/words';

type PackState = 'active' | 'soon' | 'seasonal' | 'ai';

const BADGE: Record<PackState, string> = {
  active: UC.green,
  soon: UC.muted,
  seasonal: UC.blue,
  ai: UC.purple,
};

const PACKS: { name: string; desc: string; emoji: string; status: string; state: PackState }[] = [
  { name: 'Core Mix', desc: `The everyday party deck · ${ALL_WORDS.length} word pairs`, emoji: '🎲', status: 'Active', state: 'active' },
  { name: 'Movies & TV', desc: 'Blockbusters, binges and cult classics', emoji: '🎬', status: 'Soon', state: 'soon' },
  { name: 'After Dark', desc: 'Spicier prompts for grown-up tables · 18+', emoji: '🌙', status: 'Soon', state: 'soon' },
  { name: 'Frostbite', desc: 'Limited seasonal winter drop', emoji: '❄️', status: 'Seasonal', state: 'seasonal' },
  { name: 'Word Forge', desc: 'AI-generated packs on any theme you name', emoji: '✨', status: 'Beta', state: 'ai' },
];

/** Word Packs — a catalog that keeps growing. Ported from Undercover.dc. */
export function PacksScreen() {
  const navigate = useGame((s) => s.navigate);

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
        <TopBar title="Word Packs" onBack={() => navigate('home')} marginBottom={6} />
        <p style={{ margin: '0 0 16px 56px', font: "400 13px 'Space Grotesk'", color: UC.muted }}>
          A catalog that keeps growing.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 11, flex: 1 }}>
          {PACKS.map((p) => {
            const active = p.state === 'active';
            const badgeC = BADGE[p.state];
            return (
              <div
                key={p.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: 16,
                  borderRadius: 18,
                  ...(active
                    ? { border: '1px solid #36c98a44', background: 'linear-gradient(135deg,#102018,#12131a)' }
                    : { border: '1px dashed #2f2d3a', background: UC.card3, opacity: 0.85 }),
                }}
              >
                <span
                  style={{
                    flex: '0 0 auto',
                    width: 52,
                    height: 52,
                    borderRadius: 15,
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: 26,
                    background: active ? '#36c98a1a' : '#1d1c25',
                    border: `1px solid ${active ? '#36c98a44' : UC.border2}`,
                  }}
                >
                  {p.emoji}
                </span>
                <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <span style={{ font: "700 16px 'Space Grotesk'", color: UC.ink }}>{p.name}</span>
                  <span style={{ font: "400 12px 'Space Grotesk'", color: UC.muted, lineHeight: 1.35 }}>{p.desc}</span>
                </span>
                <span
                  style={{
                    flex: '0 0 auto',
                    padding: '6px 12px',
                    borderRadius: 999,
                    font: "700 10px 'Space Mono'",
                    letterSpacing: '.1em',
                    textTransform: 'uppercase',
                    color: badgeC,
                    border: `1px solid ${badgeC}55`,
                    background: `${badgeC}1a`,
                  }}
                >
                  {p.status}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </Screen>
  );
}
