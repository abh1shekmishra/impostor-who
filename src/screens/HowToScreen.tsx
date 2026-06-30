import { Screen } from '@/components/Screen';
import { UC, TopBar, PrimaryButton } from '@/components/uc';
import { useGame } from '@/store/gameStore';
import { feedback } from '@/lib/feedback';

const STEPS = [
  { n: '1', color: UC.blue, title: 'Everyone gets a word', body: 'All but one player share a secret word. The impostor gets a believable decoy — or nothing at all.' },
  { n: '2', color: UC.gold, title: 'Drop a one-word clue', body: 'Go around the table. Prove you know the word without ever saying it.' },
  { n: '3', color: UC.brand, title: 'Discuss & accuse', body: 'Debate who’s faking it. Beware clues that play it too safe.' },
  { n: '4', color: UC.purple, title: 'Vote someone out', body: 'In secret or as a group. Guess wrong and the impostor only gets bolder.' },
  { n: '5', color: UC.green, title: 'The last chance', body: 'If the impostor survives the vote, they can still steal the win by naming the word.' },
];

/** How to Play — five steps, then straight into setup. Ported from Undercover.dc. */
export function HowToScreen() {
  const navigate = useGame((s) => s.navigate);

  return (
    <Screen enter="up">
      <section
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          padding: 'max(env(safe-area-inset-top),22px) 22px max(env(safe-area-inset-bottom),24px)',
        }}
      >
        <TopBar title="How to Play" onBack={() => navigate('home')} marginBottom={18} />

        <div className="no-scrollbar" style={{ display: 'flex', flexDirection: 'column', gap: 11, flex: 1, overflowY: 'auto', minHeight: 0 }}>
          {STEPS.map((s) => (
            <div
              key={s.n}
              style={{
                display: 'flex',
                gap: 15,
                padding: 17,
                borderRadius: 16,
                border: `1px solid ${UC.border}`,
                background: UC.card,
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
                  fontFamily: "'Anton'",
                  fontSize: 22,
                  color: s.color,
                  border: `1px solid ${s.color}55`,
                  background: `${s.color}1a`,
                }}
              >
                {s.n}
              </span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ font: "700 16px 'Space Grotesk'", color: UC.ink }}>{s.title}</span>
                <span style={{ font: "400 13px 'Space Grotesk'", color: UC.ink3, lineHeight: 1.4 }}>{s.body}</span>
              </span>
            </div>
          ))}
        </div>

        <PrimaryButton
          onClick={() => {
            feedback('select');
            navigate('create');
          }}
          style={{ marginTop: 16 }}
        >
          Got it — let’s play
        </PrimaryButton>
      </section>
    </Screen>
  );
}
