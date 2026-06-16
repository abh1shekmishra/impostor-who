import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Screen } from '@/components/Screen';
import { Avatar, Button, Icon } from '@/components/ui';
import { useGame } from '@/store/gameStore';
import { useSettings } from '@/store/settingsStore';
import { useReducedMotion } from '@/hooks';
import { MODE_BY_ID } from '@/data/modes';
import { CATEGORY_BY_ID } from '@/data/categories';
import { feedback } from '@/lib/feedback';
import { cn } from '@/lib/cn';

type Stage = 'pass' | 'card';

/**
 * The reveal carousel. Each player privately sees their role, then hides it and
 * passes the phone. A "pass" gate between players prevents accidental peeking.
 *
 * Two interaction models share one surface — the card itself:
 *  - Tap mode: tap the card to reveal; it stays visible until you pass.
 *  - Hold mode: press and hold the card to view; releasing hides it (max privacy).
 * Keeping the card as the single gesture target avoids any awkward hand-off
 * between a button and the card.
 */
export function RevealPhase() {
  const round = useGame((s) => s.round);
  const revealIndex = useGame((s) => s.revealIndex);
  const revealCurrent = useGame((s) => s.revealCurrent);
  const advanceReveal = useGame((s) => s.advanceReveal);
  const holdToReveal = useSettings((s) => s.holdToReveal);
  const reduced = useReducedMotion();

  const [stage, setStage] = useState<Stage>('pass');
  const [viewing, setViewing] = useState(false);
  const [revealedOnce, setRevealedOnce] = useState(false);

  // During exit transitions `round` may be cleared or the index may point past
  // the array (the phase already advanced). Render nothing rather than crash.
  if (!round) return null;
  const player = round.players[revealIndex];
  if (!player) return null;
  const isImpostor = player.role === 'impostor';
  const mode = MODE_BY_ID.get(round.config.modeId)!;
  const isLast = revealIndex >= round.players.length - 1;
  const category = CATEGORY_BY_ID.get(round.word.category);

  const markRevealed = () => {
    if (!revealedOnce) {
      feedback(isImpostor ? 'impostor' : 'reveal');
      revealCurrent();
      setRevealedOnce(true);
    }
  };

  const enterCard = () => {
    feedback('flip');
    setStage('card');
  };

  const onNext = () => {
    feedback('tap');
    setStage('pass');
    setViewing(false);
    setRevealedOnce(false);
    advanceReveal();
  };

  // Tap model handlers (toggle visibility on tap).
  const tapHandlers = {
    onClick: () => {
      if (!viewing) {
        markRevealed();
        setViewing(true);
      }
    },
  };
  // Hold model handlers (visible only while pressed).
  const holdHandlers = {
    onPointerDown: () => {
      markRevealed();
      setViewing(true);
    },
    onPointerUp: () => setViewing(false),
    onPointerLeave: () => setViewing(false),
    onPointerCancel: () => setViewing(false),
  };

  return (
    <Screen enter="fade" className="px-5 pb-safe">
      <div className="pt-[max(env(safe-area-inset-top),1rem)] flex items-center justify-center gap-1.5">
        {round.players.map((_, i) => (
          <span
            key={i}
            className={cn(
              'h-1.5 rounded-full transition-all duration-300',
              i < revealIndex ? 'w-1.5 bg-brand' : i === revealIndex ? 'w-6 bg-brand' : 'w-1.5 bg-ink/15'
            )}
          />
        ))}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {stage === 'pass' ? (
            <motion.div
              key={`pass-${revealIndex}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="flex flex-col items-center text-center w-full"
            >
              <p className="text-ink-3 text-sm mb-6">Pass the phone to</p>
              <Avatar name={player.name} accent={player.accent} size="lg" />
              <h2 className="mt-5 font-display text-4xl font-semibold">{player.name}</h2>
              <p className="mt-3 text-ink-3 max-w-[16rem] text-balance">
                Make sure no one else can see the screen.
              </p>
              <div className="mt-10 w-full max-w-sm">
                <Button
                  size="xl"
                  fullWidth
                  cue="flip"
                  leadingIcon={<Icon.Eye size={20} />}
                  onClick={enterCard}
                >
                  I’ve got the phone
                </Button>
                <p className="mt-3 text-[12px] text-ink-3">
                  {holdToReveal ? 'You’ll press and hold to view your role' : 'You’ll tap to view your role'}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`card-${revealIndex}`}
              initial={reduced ? false : { rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              style={{ perspective: 1000 }}
              className="w-full max-w-sm"
            >
              <RoleCard
                visible={viewing}
                isImpostor={isImpostor}
                word={player.shownWord}
                blind={mode.rules.blindImpostor && isImpostor}
                decoyHint={mode.rules.impostorGetsDecoy && isImpostor}
                categoryHint={!isImpostor || !mode.rules.blindImpostor ? category?.label : undefined}
                holdMode={holdToReveal}
                revealedOnce={revealedOnce}
                handlers={holdToReveal ? holdHandlers : tapHandlers}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {stage === 'card' && revealedOnce && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="pb-safe"
          >
            <Button
              size="xl"
              fullWidth
              variant={isImpostor ? 'secondary' : 'primary'}
              cue="tap"
              onClick={onNext}
              leadingIcon={isLast ? <Icon.Check size={20} /> : <Icon.Users size={20} />}
            >
              {isLast ? 'Everyone’s ready' : 'Hide & pass on'}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  );
}

interface RoleCardProps {
  visible: boolean;
  isImpostor: boolean;
  word: string | null;
  blind: boolean;
  decoyHint: boolean;
  categoryHint?: string | undefined;
  holdMode: boolean;
  revealedOnce: boolean;
  handlers: Record<string, (() => void) | undefined>;
}

function RoleCard({
  visible,
  isImpostor,
  word,
  blind,
  decoyHint,
  categoryHint,
  holdMode,
  revealedOnce,
  handlers,
}: RoleCardProps) {
  return (
    <button
      type="button"
      {...handlers}
      aria-label="Reveal your secret role"
      className={cn(
        'relative w-full aspect-[3/4] max-h-[58vh] rounded-[2rem] p-6 grid place-items-center text-center select-none overflow-hidden outline-none',
        isImpostor && visible
          ? 'bg-gradient-to-br from-[#2a1230] to-[#140a1c] text-white'
          : 'bg-surface border shadow-card'
      )}
    >
      {/* Cover shown until revealed / between holds. */}
      {!visible && (
        <div className="absolute inset-0 grid place-items-center bg-surface-2 z-10">
          <div className="flex flex-col items-center text-ink-2">
            <motion.span
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="text-4xl"
            >
              {holdMode ? '👆' : '🃏'}
            </motion.span>
            <span className="mt-3 text-[15px] font-medium">
              {holdMode
                ? revealedOnce
                  ? 'Hold to view again'
                  : 'Press & hold to reveal'
                : 'Tap to reveal your role'}
            </span>
          </div>
        </div>
      )}

      {visible &&
        (isImpostor ? (
          <div className="flex flex-col items-center">
            <motion.span
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 240, damping: 16 }}
              className="text-6xl"
            >
              🕵️
            </motion.span>
            <h3 className="mt-5 font-display text-3xl font-bold leading-tight">
              You are the<br />Impostor
            </h3>
            {decoyHint && word ? (
              <p className="mt-4 text-white/70 text-sm">
                Your decoy word is
                <span className="block mt-1 text-xl font-semibold text-white">{word}</span>
              </p>
            ) : (
              <ul className="mt-5 space-y-1.5 text-white/70 text-[15px]">
                <li>Blend in.</li>
                <li>Observe carefully.</li>
                <li>Don’t get caught.</li>
              </ul>
            )}
            {blind && !decoyHint && (
              <p className="mt-5 text-[12px] text-white/40">No word. No category. Pure bluff.</p>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-[12px] uppercase tracking-[0.2em] text-ink-3">Your secret word</p>
            <motion.h3
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 240, damping: 18 }}
              className="mt-4 font-display text-4xl font-bold text-balance leading-tight"
            >
              {word}
            </motion.h3>
            {categoryHint && (
              <span className="mt-5 text-[13px] text-ink-3 px-3 py-1 rounded-full bg-surface-2">
                {categoryHint}
              </span>
            )}
          </div>
        ))}
    </button>
  );
}
