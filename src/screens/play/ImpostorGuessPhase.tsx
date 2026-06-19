import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Screen } from '@/components/Screen';
import { Avatar, Button, Icon } from '@/components/ui';
import { useGame } from '@/store/gameStore';
import { feedback } from '@/lib/feedback';

type Stage = 'reveal' | 'guess';

/**
 * The signature twist. If the impostor dodged the vote, they get one shot to
 * name the secret word. We first reveal who (if anyone) was ejected, then hand
 * the phone to the surviving impostor(s) for the guess.
 */
export function ImpostorGuessPhase() {
  const round = useGame((s) => s.round);
  const pendingEjectedId = useGame((s) => s.pendingEjectedId);
  const submitImpostorGuess = useGame((s) => s.submitImpostorGuess);

  const [stage, setStage] = useState<Stage>('reveal');
  const [guess, setGuess] = useState('');

  if (!round) return null;
  const ejected = pendingEjectedId
    ? round.players.find((p) => p.id === pendingEjectedId) ?? null
    : null;
  const ejectedWasImpostor = ejected?.role === 'impostor';
  const survivingImpostors = round.players.filter(
    (p) => p.role === 'impostor' && p.id !== pendingEjectedId
  );

  return (
    <Screen enter="fade" className="px-5 pb-safe">
      <AnimatePresence mode="wait">
        {stage === 'reveal' ? (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="flex-1 flex flex-col items-center justify-center text-center"
          >
            <p className="text-[12px] uppercase tracking-[0.2em] text-ink-3 mb-6">The vote is in</p>
            {ejected ? (
              <>
                <Avatar name={ejected.name} accent={ejected.accent} size="lg" />
                <h2 className="mt-5 font-display text-3xl font-semibold">{ejected.name}</h2>
                <p className="mt-2 text-ink-2">was voted out</p>
                <div
                  className={`mt-6 px-4 py-2 rounded-full text-sm font-semibold ${
                    ejectedWasImpostor ? 'bg-success/15 text-success' : 'bg-danger/15 text-danger'
                  }`}
                >
                  {ejectedWasImpostor ? '🎯 A chor!' : '😬 Innocent — the chor slipped through'}
                </div>
              </>
            ) : (
              <>
                <span className="text-6xl">🤝</span>
                <h2 className="mt-5 font-display text-3xl font-semibold">It’s a tie</h2>
                <p className="mt-2 text-ink-2">No one was voted out.</p>
              </>
            )}
            <p className="mt-8 text-ink-3 max-w-[18rem] text-balance">
              The chor survived — and now gets one chance to guess the secret word.
            </p>
            <div className="mt-8 w-full max-w-sm pb-safe">
              <Button
                size="xl"
                fullWidth
                cue="impostor"
                onClick={() => {
                  feedback('tap');
                  setStage('guess');
                }}
              >
                Hand phone to the chor
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="guess"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col"
          >
            <div className="pt-[max(env(safe-area-inset-top),1.5rem)] text-center">
              <span className="text-5xl">😈</span>
              <h2 className="mt-4 font-display text-3xl font-semibold">Your final shot</h2>
              <p className="mt-2 text-ink-2 max-w-[18rem] mx-auto text-balance">
                {survivingImpostors.length > 1
                  ? 'Chors, agree on the word.'
                  : 'Chor, what was the secret word?'}
              </p>
            </div>

            <div className="flex-1 flex flex-col justify-center">
              <input
                autoFocus
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && guess.trim()) submitImpostorGuess(guess);
                }}
                placeholder="Type your guess…"
                aria-label="Impostor word guess"
                maxLength={40}
                autoComplete="off"
                className="w-full text-center font-display text-3xl font-semibold bg-transparent outline-none border-b-2 border-brand/40 focus:border-brand pb-3 placeholder:text-ink-3/50"
              />
              <p className="text-center text-[12px] text-ink-3 mt-4">
                Spelling is forgiving — close counts.
              </p>
            </div>

            <div className="pb-safe">
              <Button
                size="xl"
                fullWidth
                cue="vote"
                disabled={!guess.trim()}
                onClick={() => submitImpostorGuess(guess)}
                leadingIcon={<Icon.Sparkle size={20} />}
              >
                Lock in guess
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  );
}
