import { Screen } from '@/components/Screen';
import { UC } from '@/components/uc';
import { useGame } from '@/store/gameStore';
import { useCountdown } from '@/hooks';
import { feedback } from '@/lib/feedback';

const CIRC = 829.38; // 2π·132, the design's ring circumference

/**
 * Free discussion with a drift-free ring timer. Starts paused; the host taps to
 * run it, then calls the vote whenever the room is ready. Ported from Undercover.dc.
 */
export function DiscussPhase() {
  const round = useGame((s) => s.round);
  const startVote = useGame((s) => s.startVote);
  const duration = round?.config.timerSeconds ?? null;

  const { remaining, running, start, pause } = useCountdown(duration, () => feedback('lose'));

  if (!round) return null;

  const noTimer = duration === null;
  const expired = !noTimer && remaining <= 0;
  const progress = !noTimer && duration ? 1 - remaining / duration : 0;
  const ringColor = !noTimer && remaining <= 10 ? UC.brand : UC.blue;
  const timeLabel = noTimer ? '∞' : `${Math.floor(remaining / 60)}:${String(remaining % 60).padStart(2, '0')}`;
  const timeState = noTimer ? 'No timer' : expired ? 'Time’s up' : running ? 'On the clock' : 'Paused';
  const btnLabel = noTimer ? 'Talk it out' : expired ? 'Time’s up' : running ? 'Pause' : 'Start timer';

  const toggle = () => {
    if (noTimer) return;
    feedback('tap');
    running ? pause() : start();
  };

  return (
    <Screen enter="fade">
      <section
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 'max(env(safe-area-inset-top),30px) 24px max(env(safe-area-inset-bottom),24px)',
        }}
      >
        <span style={{ fontFamily: "'Anton'", fontSize: 40, textTransform: 'uppercase', color: UC.ink, letterSpacing: '.02em' }}>
          Discuss
        </span>
        <p style={{ margin: '8px 0 0', fontSize: 15, color: UC.ink3, textAlign: 'center', maxWidth: 250 }}>
          Find the liar. Defend your word. Don’t overshare.
        </p>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <div style={{ position: 'relative', width: 268, height: 268, display: 'grid', placeItems: 'center' }}>
            <svg width="268" height="268" viewBox="0 0 300 300" style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
              <circle cx="150" cy="150" r="132" fill="none" stroke={UC.border} strokeWidth="14" />
              <circle
                cx="150"
                cy="150"
                r="132"
                fill="none"
                stroke={ringColor}
                strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray={CIRC}
                strokeDashoffset={CIRC * progress}
                style={{ transition: 'stroke-dashoffset 1s linear, stroke .3s' }}
              />
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <span style={{ fontFamily: "'Anton'", fontSize: 64, lineHeight: 1, color: UC.ink }}>{timeLabel}</span>
              <span style={{ font: "700 11px 'Space Mono'", letterSpacing: '.2em', textTransform: 'uppercase', color: UC.muted }}>
                {timeState}
              </span>
            </div>
          </div>
        </div>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            onClick={toggle}
            style={{
              width: '100%',
              border: 0,
              borderRadius: 18,
              padding: 18,
              background: UC.brand,
              color: '#fff',
              font: "700 17px 'Space Grotesk'",
              cursor: 'pointer',
              boxShadow: '0 12px 30px -12px #f5402ecc',
            }}
          >
            {btnLabel}
          </button>
          <button
            onClick={() => {
              feedback('select');
              startVote();
            }}
            style={{
              width: '100%',
              border: `1px solid ${UC.border2}`,
              borderRadius: 18,
              padding: 18,
              background: 'transparent',
              color: '#c9c6d4',
              font: "700 16px 'Space Grotesk'",
              cursor: 'pointer',
            }}
          >
            Call the vote
          </button>
        </div>
      </section>
    </Screen>
  );
}
