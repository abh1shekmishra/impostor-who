import { useEffect } from 'react';
import { Screen } from '@/components/Screen';
import { UC, PrimaryButton } from '@/components/uc';
import { useGame } from '@/store/gameStore';
import { feedback } from '@/lib/feedback';

/**
 * Outcome screen: the verdict, the reveal of the impostor and secret word, the
 * running civ/imp tally, and the choice to play on. Ported from Undercover.dc.
 */
export function ResultPhase() {
  const round = useGame((s) => s.round);
  const matchScore = useGame((s) => s.matchScore);
  const nextRound = useGame((s) => s.nextRound);
  const navigate = useGame((s) => s.navigate);
  const quitToHome = useGame((s) => s.quitToHome);

  const result = round?.result ?? null;
  const civWon = result?.outcome === 'civilians-win';

  useEffect(() => {
    if (!result) return;
    feedback(civWon ? 'win' : 'lose');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!round || !result) return null;

  const color = civWon ? UC.blue : UC.brand;
  const headline = civWon ? 'Civilians Win' : 'Impostor Wins';
  const badge = civWon ? 'Justice served' : 'Got away with it';
  const reason = civWon
    ? result.reason === 'impostor-ejected'
      ? 'The table unmasked the impostor.'
      : 'The impostor guessed wrong — civilians escape.'
    : result.reason === 'impostor-guessed-word'
      ? 'The impostor stole the secret word.'
      : 'The impostor slipped through the vote.';

  const impostorReveal = round.players.filter((p) => result.impostorIds.includes(p.id)).map((p) => p.name).join(' & ') || '—';
  const votedOut = round.players.find((p) => p.id === result.ejectedId)?.name ?? '—';

  const ghostBtn = {
    flex: 1,
    borderRadius: 16,
    border: `1px solid ${UC.border2}`,
    background: UC.card2,
    color: '#c9c6d4',
    font: "700 15px 'Space Grotesk'",
    padding: 16,
    cursor: 'pointer',
  } as const;

  return (
    <Screen enter="up">
      <section
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: 'max(env(safe-area-inset-top),28px) 24px max(env(safe-area-inset-bottom),22px)',
        }}
      >
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 22 }}>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
            <span
              style={{
                padding: '7px 15px',
                borderRadius: 999,
                border: `1px solid ${civWon ? '#46c2ff55' : '#f5402e55'}`,
                background: civWon ? '#46c2ff1a' : '#f5402e1a',
                color,
                font: "700 11px 'Space Mono'",
                letterSpacing: '.18em',
                textTransform: 'uppercase',
              }}
            >
              {badge}
            </span>
            <h2 style={{ margin: 0, fontFamily: "'Anton'", fontSize: 60, lineHeight: 0.86, textTransform: 'uppercase', color }}>
              {headline}
            </h2>
            <p style={{ margin: 0, maxWidth: 280, fontSize: 15, lineHeight: 1.45, color: UC.ink2 }}>{reason}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16, borderRadius: 16, border: '1px solid #f5402e44', background: '#1a0e0f' }}>
              <span style={{ font: "700 11px 'Space Mono'", letterSpacing: '.14em', textTransform: 'uppercase', color: UC.brand, flex: 1 }}>
                Impostor
              </span>
              <span style={{ font: "700 18px 'Space Grotesk'", color: UC.ink }}>{impostorReveal}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16, borderRadius: 16, border: '1px solid #46c2ff44', background: '#0e1a22' }}>
              <span style={{ font: "700 11px 'Space Mono'", letterSpacing: '.14em', textTransform: 'uppercase', color: UC.blue, flex: 1 }}>
                Secret word
              </span>
              <span style={{ font: "700 18px 'Space Grotesk'", color: UC.ink }}>{round.word.text}</span>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ flex: 1, padding: '15px 16px', borderRadius: 16, border: `1px solid ${UC.border}`, background: UC.card, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ font: "600 11px 'Space Mono'", letterSpacing: '.1em', textTransform: 'uppercase', color: UC.muted }}>Voted out</span>
                <span style={{ font: "700 16px 'Space Grotesk'", color: UC.ink }}>{votedOut}</span>
              </div>
              <div style={{ flex: 1, padding: '15px 16px', borderRadius: 16, border: `1px solid ${UC.border}`, background: UC.card, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ font: "600 11px 'Space Mono'", letterSpacing: '.1em', textTransform: 'uppercase', color: UC.muted }}>Score · civ / imp</span>
                <span style={{ font: "700 16px 'Space Grotesk'", color: UC.ink }}>
                  {matchScore.civ} / {matchScore.imp}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <PrimaryButton
            onClick={() => {
              feedback('select');
              nextRound();
            }}
          >
            Next round
          </PrimaryButton>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              style={ghostBtn}
              onClick={() => {
                useGame.setState({ phase: 'setup' });
                navigate('create');
              }}
            >
              New game
            </button>
            <button style={ghostBtn} onClick={quitToHome}>
              Home
            </button>
          </div>
        </div>
      </section>
    </Screen>
  );
}
