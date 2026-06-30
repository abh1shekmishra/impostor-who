import { useState } from 'react';
import { Screen } from '@/components/Screen';
import { UC, PrimaryButton } from '@/components/uc';
import { useGame } from '@/store/gameStore';

/**
 * The signature twist. The impostor dodged the vote and gets one shot to name
 * the civilians' secret word and steal the win. Ported from Undercover.dc.
 */
export function ImpostorGuessPhase() {
  const round = useGame((s) => s.round);
  const pendingEjectedId = useGame((s) => s.pendingEjectedId);
  const submitImpostorGuess = useGame((s) => s.submitImpostorGuess);
  const [guess, setGuess] = useState('');

  if (!round) return null;
  const ejected = pendingEjectedId ? round.players.find((p) => p.id === pendingEjectedId) ?? null : null;
  // Single-impostor games only reach this screen when a civilian was ejected.
  // In Rivals, one impostor can fall while another survives to guess.
  const kicker = !ejected
    ? 'The vote tied'
    : ejected.role === 'impostor'
      ? `${ejected.name} fell — one remains`
      : `${ejected.name} was innocent`;
  const canSubmit = !!guess.trim();

  return (
    <Screen enter="fade">
      <section
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 22,
          padding: 'max(env(safe-area-inset-top),26px) 26px max(env(safe-area-inset-bottom),26px)',
          background: 'radial-gradient(120% 60% at 50% 0%,#220f10,transparent 70%)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
          <span style={{ font: "700 12px 'Space Mono'", letterSpacing: '.24em', textTransform: 'uppercase', color: UC.brand }}>
            {kicker}
          </span>
          <h2 style={{ margin: 0, fontFamily: "'Anton'", fontSize: 50, lineHeight: 0.92, textTransform: 'uppercase', color: UC.ink }}>
            The impostor
            <br />
            survived
          </h2>
          <p style={{ margin: 0, maxWidth: 270, fontSize: 16, lineHeight: 1.45, color: '#cf938c' }}>
            One word. One shot. Name the civilians’ secret and steal the win.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            autoFocus
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && canSubmit) submitImpostorGuess(guess);
            }}
            placeholder="Type your guess…"
            aria-label="Impostor word guess"
            maxLength={40}
            autoComplete="off"
            style={{
              width: '100%',
              textAlign: 'center',
              padding: 22,
              borderRadius: 18,
              border: '1px solid #f5402e66',
              background: '#160b0c',
              color: UC.ink,
              fontFamily: "'Anton'",
              fontSize: 30,
              textTransform: 'uppercase',
              outline: 'none',
            }}
          />
          <span style={{ font: "500 12px 'Space Grotesk'", color: UC.muted }}>
            One civilian word · spelling doesn’t have to be perfect
          </span>
        </div>

        <PrimaryButton onClick={() => canSubmit && submitImpostorGuess(guess)} disabled={!canSubmit}>
          Lock in the guess
        </PrimaryButton>
      </section>
    </Screen>
  );
}
