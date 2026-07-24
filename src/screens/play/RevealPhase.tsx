import { useState } from 'react';
import { Screen } from '@/components/Screen';
import { Avatar } from '@/components/ui';
import { UC, PrimaryButton } from '@/components/uc';
import { useGame } from '@/store/gameStore';
import { useSettings } from '@/store/settingsStore';
import { MODE_BY_ID } from '@/data/modes';
import { feedback } from '@/lib/feedback';

/**
 * The reveal carousel. Each player privately sees their role on a typographic
 * card — civilian (blue) gets the secret word, impostor (red, danger-glow) gets
 * a decoy or nothing. A pass cover gates each hand-off. Ported from Undercover.dc.
 *
 * Tap mode: tap to reveal; the card stays until you pass on.
 * Hold mode (default): press & hold to peek; releasing hides it (max privacy),
 * then a persistent "pass on" affordance advances the carousel.
 */
export function RevealPhase() {
  const round = useGame((s) => s.round);
  const revealIndex = useGame((s) => s.revealIndex);
  const revealCurrent = useGame((s) => s.revealCurrent);
  const advanceReveal = useGame((s) => s.advanceReveal);
  const holdToReveal = useSettings((s) => s.holdToReveal);

  const [shown, setShown] = useState(false);
  const [revealedOnce, setRevealedOnce] = useState(false);

  if (!round) return null;
  const player = round.players[revealIndex];
  if (!player) return null;

  const isImpostor = player.role === 'impostor';
  const mode = MODE_BY_ID.get(round.config.modeId)!;
  const blank = mode.rules.blindImpostor || !player.shownWord;
  const isLast = revealIndex >= round.players.length - 1;
  const nextLabel = isLast ? 'Got it — start clues' : 'Got it — pass on';

  const show = () => {
    if (!revealedOnce) {
      feedback(isImpostor ? 'impostor' : 'reveal');
      revealCurrent();
      setRevealedOnce(true);
    }
    setShown(true);
  };
  const onNext = () => {
    feedback('tap');
    setShown(false);
    setRevealedOnce(false);
    advanceReveal();
  };

  // Hold mode: reveal while pressed. Listen for release on the window so the
  // gesture still ends correctly even though the button unmounts on reveal.
  const startHold = () => {
    show();
    const end = () => {
      setShown(false);
      window.removeEventListener('pointerup', end);
      window.removeEventListener('pointercancel', end);
    };
    window.addEventListener('pointerup', end);
    window.addEventListener('pointercancel', end);
  };

  const holdButtonStyle = {
    width: '100%',
    borderRadius: 18,
    padding: 20,
    background: '#1d1c25',
    border: `1px solid ${UC.border2}`,
    color: UC.ink,
    font: "700 17px 'Space Grotesk'",
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    userSelect: 'none',
    touchAction: 'none',
  } as const;

  const PowerIcon = (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2v6M5 8a7 7 0 1 0 14 0" />
    </svg>
  );

  return (
    <Screen enter="fade">
      <section
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: 'max(env(safe-area-inset-top),24px) 24px max(env(safe-area-inset-bottom),24px)',
        }}
      >
        {!shown ? (
          // ── Pass cover ──
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 20 }}>
            <span style={{ font: "700 12px 'Space Mono'", letterSpacing: '.24em', textTransform: 'uppercase', color: UC.muted }}>
              {revealIndex + 1} of {round.players.length}
            </span>

            {/* Phone pass card */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '26px 28px 22px',
              borderRadius: 28,
              border: `1px solid ${UC.border2}`,
              background: UC.card2,
              width: '100%',
            }}>
              <span style={{
                font: "700 11px 'Space Mono'",
                letterSpacing: '.22em',
                textTransform: 'uppercase',
                color: UC.muted,
                marginBottom: 18,
              }}>
                📱 Hand the phone to
              </span>
              <div className="uc-floaty" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                <Avatar name={player.name} accent={revealIndex} size="lg" glow />
                <h2 style={{
                  margin: 0,
                  fontFamily: "'Anton'",
                  fontSize: 56,
                  lineHeight: 0.92,
                  textTransform: 'uppercase',
                  color: UC.ink,
                }}>
                  {player.name}
                </h2>
              </div>
              <div style={{ width: '100%', height: 1, background: UC.border, margin: '18px 0' }} />
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: UC.ink2 }}>
                Everyone else — <b style={{ color: UC.ink }}>look away!</b>
                <br />
                {player.name}, press below to see your secret role.
              </p>
            </div>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                {...(holdToReveal ? { onPointerDown: startHold } : { onClick: show })}
                style={holdButtonStyle}
              >
                {PowerIcon}
                {holdToReveal ? (revealedOnce ? 'Hold to view again' : 'Hold to reveal') : 'Tap to reveal'}
              </button>
              {holdToReveal && revealedOnce && <PrimaryButton onClick={onNext}>{nextLabel}</PrimaryButton>}
            </div>
          </div>
        ) : (
          // ── Revealed ──
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {!isImpostor ? (
              <div
                className="uc-pop"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: 18,
                  padding: '34px 22px',
                  borderRadius: 26,
                  border: '1px solid #46c2ff55',
                  background: 'radial-gradient(120% 90% at 50% 0%,#13212e,#101019)',
                  boxShadow: '0 0 60px -18px #46c2ff88',
                }}
              >
                <span style={{ font: "700 12px 'Space Mono'", letterSpacing: '.24em', textTransform: 'uppercase', color: UC.blue }}>
                  Civilian
                </span>
                <p style={{ margin: 0, fontSize: 15, color: '#9fd9ff' }}>Your secret word is</p>
                <h2 style={{ margin: 0, fontFamily: "'Anton'", fontSize: 58, lineHeight: 0.92, textTransform: 'uppercase', color: UC.ink }}>
                  {player.shownWord}
                </h2>
                <p style={{ margin: 0, maxWidth: 230, fontSize: 14, lineHeight: 1.45, color: '#8fb8cf' }}>
                  Memorize it. Drop a clue — never say it out loud.
                </p>
              </div>
            ) : (
              <div
                className="uc-danger-glow"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: 14,
                  padding: '36px 22px 30px',
                  borderRadius: 26,
                  border: '2px solid #f5402e88',
                  background: 'radial-gradient(130% 100% at 50% 0%,#2e0f10,#15090b)',
                  boxShadow: '0 0 80px -20px #f5402eaa',
                }}
              >
                {/* Big impostor warning badge */}
                <div style={{
                  background: UC.brand,
                  borderRadius: 12,
                  padding: '6px 18px',
                  marginBottom: 4,
                }}>
                  <span style={{ font: "700 13px 'Space Mono'", letterSpacing: '.18em', textTransform: 'uppercase', color: '#fff' }}>
                    ⚠ Your role
                  </span>
                </div>

                {/* Giant impostor headline */}
                <h1 style={{
                  margin: 0,
                  fontFamily: "'Anton'",
                  fontSize: 64,
                  lineHeight: 0.9,
                  textTransform: 'uppercase',
                  color: UC.brand,
                  textShadow: '0 0 40px #f5402e99',
                  letterSpacing: '.02em',
                }}>
                  You are<br />the<br />Impostor!
                </h1>

                <div style={{ width: '100%', height: 1, background: '#f5402e33', margin: '4px 0' }} />

                <p style={{ margin: 0, fontSize: 15, color: '#f3a59c', fontWeight: 600 }}>
                  {blank ? 'You have NO secret word.' : 'Your decoy word is:'}
                </p>
                {!blank && (
                  <h2 style={{ margin: 0, fontFamily: "'Anton'", fontSize: 46, lineHeight: 0.92, textTransform: 'uppercase', color: UC.ink }}>
                    {player.shownWord}
                  </h2>
                )}
                <p style={{ margin: 0, maxWidth: 240, fontSize: 14, lineHeight: 1.5, color: '#cf938c' }}>
                  Blend in. Give clues that sound real. Do NOT get caught!
                </p>
              </div>
            )}
            {/* Tap mode: the card stays, so advance from here. Hold mode advances from the cover. */}
            {!holdToReveal && (
              <PrimaryButton onClick={onNext} style={{ marginTop: 24 }}>
                {nextLabel}
              </PrimaryButton>
            )}
          </div>
        )}
      </section>
    </Screen>
  );
}
