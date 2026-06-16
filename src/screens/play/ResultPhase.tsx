import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Screen } from '@/components/Screen';
import { Avatar, Button, Card, Icon } from '@/components/ui';
import { useGame } from '@/store/gameStore';
import { useConfetti } from '@/hooks';
import { CATEGORY_BY_ID } from '@/data/categories';
import { feedback } from '@/lib/feedback';
import { cn } from '@/lib/cn';

/**
 * Outcome screen: a clear verdict, the reveal of the word and impostor(s), a
 * running scoreboard, and the choice to play on. Civilians winning fires
 * confetti; the impostor stealing it gets its own sly treatment.
 */
export function ResultPhase() {
  const round = useGame((s) => s.round);
  const players = useGame((s) => s.players);
  const nextRound = useGame((s) => s.nextRound);
  const endMatch = useGame((s) => s.endMatch);
  const lastGuessCorrect = useGame((s) => s.lastGuessCorrect);
  const { canvasRef, fire } = useConfetti();

  const result = round?.result ?? null;
  const civiliansWon = result?.outcome === 'civilians-win';

  useEffect(() => {
    if (!result) return;
    if (civiliansWon) {
      feedback('win');
      setTimeout(() => fire(), 120);
    } else {
      feedback('lose');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Exit transition after starting the next round can clear the result.
  if (!round || !result) return null;

  const impostors = round.players.filter((p) => result.impostorIds.includes(p.id));
  const category = CATEGORY_BY_ID.get(round.word.category);
  const ranked = [...players].sort((a, b) => b.score - a.score);
  const topScore = ranked[0]?.score ?? 0;

  const headline = civiliansWon ? 'Civilians win!' : 'Impostor wins!';
  const subline = reasonCopy(result.reason, lastGuessCorrect);

  return (
    <Screen enter="up" className="px-5 pb-safe relative">
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 w-full h-full z-50"
        aria-hidden
      />
      <div className="pt-[max(env(safe-area-inset-top),2rem)] text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 240, damping: 16 }}
          className="text-6xl"
        >
          {civiliansWon ? '🎉' : '🕵️'}
        </motion.div>
        <h1
          className={cn(
            'mt-4 font-display text-4xl font-bold',
            civiliansWon ? 'text-gradient-brand' : 'text-danger'
          )}
        >
          {headline}
        </h1>
        <p className="mt-2 text-ink-2 text-balance max-w-[20rem] mx-auto">{subline}</p>
      </div>

      <div className="mt-6 space-y-3 overflow-y-auto no-scrollbar flex-1">
        {/* Word reveal */}
        <Card className="text-center">
          <p className="text-[12px] uppercase tracking-[0.2em] text-ink-3">The word was</p>
          <p className="mt-2 font-display text-3xl font-bold">{round.word.text}</p>
          {category && (
            <span className="inline-block mt-3 text-[13px] text-ink-3 px-3 py-1 rounded-full bg-surface-2">
              {category.emoji} {category.label}
            </span>
          )}
        </Card>

        {/* Impostor reveal */}
        <Card>
          <p className="text-[12px] uppercase tracking-[0.2em] text-ink-3 mb-3">
            {impostors.length > 1 ? 'The impostors were' : 'The impostor was'}
          </p>
          <div className="flex flex-wrap gap-2">
            {impostors.map((p) => (
              <div key={p.id} className="flex items-center gap-2 pr-3 pl-1.5 py-1.5 rounded-full bg-surface-2">
                <Avatar name={p.name} accent={p.accent} size="sm" />
                <span className="font-medium text-sm">{p.name}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Scoreboard */}
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <Icon.Trophy size={18} className="text-warning" />
            <p className="text-[12px] uppercase tracking-[0.2em] text-ink-3">Scoreboard</p>
          </div>
          <div className="space-y-1">
            {ranked.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3 py-1.5">
                <span className="w-5 text-center text-sm text-ink-3 tabular-nums">{i + 1}</span>
                <Avatar name={p.name} accent={p.accent} size="sm" />
                <span className="flex-1 font-medium text-[15px] truncate">{p.name}</span>
                {p.score === topScore && topScore > 0 && <span className="text-sm">👑</span>}
                <span className="font-semibold tabular-nums text-ink">{p.score}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="pt-3 pb-safe space-y-2.5">
        <Button
          size="xl"
          fullWidth
          cue="pop"
          leadingIcon={<Icon.Shuffle size={20} />}
          onClick={() => {
            feedback('select');
            nextRound();
          }}
        >
          Next round
        </Button>
        <Button variant="ghost" size="md" fullWidth cue="tap" onClick={endMatch} leadingIcon={<Icon.Home size={18} />}>
          End game
        </Button>
      </div>
    </Screen>
  );
}

function reasonCopy(reason: string, guessedCorrectly: boolean | null): string {
  switch (reason) {
    case 'impostor-ejected':
      return 'You caught the impostor red-handed. Sharp work.';
    case 'impostor-guessed-word':
      return 'They survived the vote AND nailed the secret word. Ice cold.';
    case 'impostor-survived':
      return 'The impostor dodged the vote and got away with it.';
    case 'wrong-civilian-ejected':
      return guessedCorrectly === false
        ? 'Wrong guess — but you voted out an innocent, so the impostor still wins.'
        : 'You voted out an innocent. The impostor walks free.';
    default:
      return '';
  }
}
