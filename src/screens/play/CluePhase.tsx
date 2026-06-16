import { AnimatePresence, motion } from 'framer-motion';
import { Screen } from '@/components/Screen';
import { Avatar, Button, Icon } from '@/components/ui';
import { useGame } from '@/store/gameStore';
import { MODE_BY_ID } from '@/data/modes';
import { feedback } from '@/lib/feedback';
import { cn } from '@/lib/cn';

const CLUE_STYLE_COPY: Record<string, { title: string; hint: string; emoji: string }> = {
  word: { title: 'Say one clue', hint: 'A single word or short phrase about your word', emoji: '💬' },
  'one-word': { title: 'Exactly one word', hint: 'You may say only ONE word. Choose it wisely.', emoji: '1️⃣' },
  emoji: { title: 'Describe with emojis', hint: 'Give your clue using only emojis', emoji: '😶‍🌫️' },
  silent: { title: 'No talking', hint: 'Gestures and expressions only — not a sound', emoji: '🤫' },
  gesture: { title: 'Act it out', hint: 'Mime your clue. No words allowed.', emoji: '🎬' },
};

/**
 * Turn-by-turn clue guidance. The app keeps order honest; clues are spoken in
 * the room. Hot-seat mode walks the order in reverse for extra pressure.
 */
export function CluePhase() {
  const round = useGame((s) => s.round);
  const clueIndex = useGame((s) => s.clueIndex);
  const nextClue = useGame((s) => s.nextClue);
  if (!round) return null;
  const mode = MODE_BY_ID.get(round.config.modeId)!;

  const order = mode.rules.hotSeat ? [...round.clueOrder].reverse() : round.clueOrder;
  const currentId = order[clueIndex];
  const player = round.players.find((p) => p.id === currentId);
  // Guard the brief out-of-range moment during the exit transition.
  if (!player) return null;
  const style = CLUE_STYLE_COPY[mode.rules.clueStyle] ?? CLUE_STYLE_COPY.word!;
  const isLast = clueIndex >= order.length - 1;
  const position = clueIndex + 1;

  return (
    <Screen enter="fade" className="px-5 pb-safe">
      <div className="pt-[max(env(safe-area-inset-top),1.25rem)] text-center">
        <p className="text-[12px] uppercase tracking-[0.2em] text-ink-3">Clue round</p>
        <p className="text-sm text-ink-2 mt-1">
          {position} of {order.length}
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentId}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="flex flex-col items-center"
          >
            <Avatar name={player.name} accent={player.accent} size="lg" active />
            <h2 className="mt-5 font-display text-4xl font-semibold">{player.name}</h2>
            <div className="mt-8 px-6 py-5 rounded-3xl bg-surface border shadow-soft max-w-xs">
              <span className="text-4xl">{style.emoji}</span>
              <h3 className="mt-3 text-xl font-semibold">{style.title}</h3>
              <p className="mt-2 text-[14px] text-ink-3 text-balance">{style.hint}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Turn dots */}
      <div className="flex items-center justify-center gap-1.5 mb-5">
        {order.map((id, i) => (
          <span
            key={id}
            className={cn(
              'h-1.5 rounded-full transition-all duration-300',
              i < clueIndex ? 'w-1.5 bg-brand' : i === clueIndex ? 'w-6 bg-brand' : 'w-1.5 bg-ink/15'
            )}
          />
        ))}
      </div>

      <div className="pb-safe">
        <Button
          size="xl"
          fullWidth
          cue="tap"
          onClick={() => {
            feedback('select');
            nextClue();
          }}
          trailingIcon={<Icon.ChevronRight size={20} />}
        >
          {isLast ? 'Start discussion' : 'Next player'}
        </Button>
      </div>
    </Screen>
  );
}
