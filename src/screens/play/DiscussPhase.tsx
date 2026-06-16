import { useEffect } from 'react';
import { Screen } from '@/components/Screen';
import { Button, IconButton, ProgressRing, Icon } from '@/components/ui';
import { useGame } from '@/store/gameStore';
import { useCountdown } from '@/hooks';
import { feedback } from '@/lib/feedback';
import { formatTime } from '@/lib/format';

/**
 * Free discussion with a drift-free timer. Unlimited timers just show a stopwatch
 * vibe with no pressure. When the timer expires we nudge (sound + haptic) but
 * never force — the host decides when to move to the vote.
 */
export function DiscussPhase() {
  const round = useGame((s) => s.round);
  const startVote = useGame((s) => s.startVote);
  const duration = round?.config.timerSeconds ?? null;

  const { remaining, running, progress, start, pause, reset } = useCountdown(duration, () => {
    feedback('lose');
  });

  // Auto-start the timer when the phase mounts.
  useEffect(() => {
    if (duration !== null) start();
    return () => pause();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!round) return null;
  const urgency = duration && remaining <= 5 ? 'danger' : duration && remaining <= 10 ? 'warn' : 'normal';
  const expired = duration !== null && remaining <= 0;

  return (
    <Screen enter="fade" className="px-5 pb-safe">
      <div className="pt-[max(env(safe-area-inset-top),1.25rem)] text-center">
        <p className="text-[12px] uppercase tracking-[0.2em] text-ink-3">Discuss</p>
        <p className="text-sm text-ink-2 mt-1 max-w-[18rem] mx-auto text-balance">
          Who sounded unsure? Compare clues. Find the impostor.
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        {duration === null ? (
          <div className="flex flex-col items-center text-center">
            <span className="text-6xl mb-4">🗣️</span>
            <p className="text-xl font-semibold">Take your time</p>
            <p className="text-ink-3 mt-2">No timer — vote whenever you’re ready.</p>
          </div>
        ) : (
          <ProgressRing progress={progress} size={220} stroke={12} urgency={urgency}>
            <div className="text-center">
              <p
                className={`font-display text-6xl font-bold tabular-nums ${
                  urgency === 'danger' ? 'text-danger' : urgency === 'warn' ? 'text-warning' : 'text-ink'
                }`}
              >
                {formatTime(remaining)}
              </p>
              <p className="text-[13px] text-ink-3 mt-1">{expired ? 'Time’s up!' : 'remaining'}</p>
            </div>
          </ProgressRing>
        )}

        {duration !== null && (
          <div className="mt-8 flex items-center gap-3">
            <IconButton
              label={running ? 'Pause timer' : 'Resume timer'}
              onClick={() => (running ? pause() : start())}
            >
              {running ? <PauseIcon /> : <Icon.Play size={18} />}
            </IconButton>
            <IconButton label="Reset timer" onClick={() => reset()}>
              <Icon.Shuffle size={18} />
            </IconButton>
          </div>
        )}
      </div>

      <div className="pb-safe">
        <Button
          size="xl"
          fullWidth
          cue="vote"
          variant={expired ? 'primary' : 'secondary'}
          leadingIcon={<Icon.Users size={20} />}
          onClick={() => {
            feedback('select');
            startVote();
          }}
        >
          Go to vote
        </Button>
      </div>
    </Screen>
  );
}

const PauseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <rect x="6" y="5" width="4" height="14" rx="1.2" />
    <rect x="14" y="5" width="4" height="14" rx="1.2" />
  </svg>
);
