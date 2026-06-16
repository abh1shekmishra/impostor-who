import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Screen } from '@/components/Screen';
import { Avatar, Button, Icon } from '@/components/ui';
import { useGame } from '@/store/gameStore';
import { feedback } from '@/lib/feedback';
import { cn } from '@/lib/cn';

type Stage = 'pass' | 'choose';

/**
 * Secret pass-and-play voting. Each player privately picks a suspect, then
 * passes on. A voter can't vote for themselves. When the last vote is in we
 * finalize, which routes to either the result or the impostor's last guess.
 */
export function VotePhase() {
  const round = useGame((s) => s.round);
  const voterIndex = useGame((s) => s.voterIndex);
  const castVote = useGame((s) => s.castVote);
  const finalizeVotes = useGame((s) => s.finalizeVotes);
  const [stage, setStage] = useState<Stage>('pass');
  const [picked, setPicked] = useState<string | null>(null);

  const voters = round ? round.players.filter((p) => !p.eliminated) : [];
  const voter = voters[voterIndex];

  // During the exit transition `round` may clear or the index can point past
  // the last voter; the confirm handler already scheduled finalization.
  if (!round || !voter) return null;

  const candidates = round.players.filter((p) => !p.eliminated && p.id !== voter.id);
  const isLastVoter = voterIndex >= voters.length - 1;

  const confirm = () => {
    if (!picked) return;
    feedback('vote');
    castVote(picked);
    setPicked(null);
    setStage('pass');
    if (isLastVoter) {
      // Defer to allow the cast to commit before resolving.
      setTimeout(() => finalizeVotes(), 0);
    }
  };

  return (
    <Screen enter="fade" className="px-5 pb-safe">
      <div className="pt-[max(env(safe-area-inset-top),1.25rem)] text-center">
        <p className="text-[12px] uppercase tracking-[0.2em] text-ink-3">Vote</p>
        <p className="text-sm text-ink-2 mt-1">
          {voterIndex + 1} of {voters.length} voting
        </p>
      </div>

      <AnimatePresence mode="wait">
        {stage === 'pass' ? (
          <motion.div
            key={`pass-${voterIndex}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="flex-1 flex flex-col items-center justify-center text-center"
          >
            <p className="text-ink-3 text-sm mb-6">Secret vote — pass to</p>
            <Avatar name={voter.name} accent={voter.accent} size="lg" />
            <h2 className="mt-5 font-display text-4xl font-semibold">{voter.name}</h2>
            <p className="mt-3 text-ink-3 max-w-[15rem] text-balance">
              Don’t let others see who you pick.
            </p>
            <div className="mt-10 w-full max-w-sm">
              <Button
                size="xl"
                fullWidth
                cue="flip"
                leadingIcon={<Icon.Eye size={20} />}
                onClick={() => {
                  feedback('tap');
                  setStage('choose');
                }}
              >
                Cast my vote
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={`choose-${voterIndex}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col"
          >
            <p className="text-center text-ink-2 mt-4 mb-4">
              <span className="font-semibold text-ink">{voter.name}</span>, who is the impostor?
            </p>
            <div className="flex-1 overflow-y-auto no-scrollbar grid grid-cols-2 gap-3 content-start pb-4">
              {candidates.map((c) => {
                const active = picked === c.id;
                return (
                  <motion.button
                    key={c.id}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      feedback('tap');
                      setPicked(c.id);
                    }}
                    className={cn(
                      'flex flex-col items-center gap-2.5 p-4 rounded-3xl border transition-colors',
                      active ? 'bg-brand/12 border-brand ring-1 ring-brand' : 'bg-surface hover:bg-surface-2'
                    )}
                  >
                    <Avatar name={c.name} accent={c.accent} size="md" active={active} />
                    <span className="font-medium text-[15px] truncate max-w-full">{c.name}</span>
                  </motion.button>
                );
              })}
            </div>
            <div className="pb-safe">
              <Button
                size="xl"
                fullWidth
                cue="vote"
                disabled={!picked}
                onClick={confirm}
                leadingIcon={<Icon.Check size={20} />}
              >
                {isLastVoter ? 'Lock in final vote' : 'Confirm & pass'}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  );
}
