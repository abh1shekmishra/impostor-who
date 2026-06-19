import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGame } from '@/store/gameStore';
import { useWakeLock } from '@/hooks';
import { Button, IconButton, Sheet, Icon } from '@/components/ui';
import { LobbyPhase } from './LobbyPhase';
import { RevealPhase } from './RevealPhase';
import { CluePhase } from './CluePhase';
import { DiscussPhase } from './DiscussPhase';
import { VotePhase } from './VotePhase';
import { ImpostorGuessPhase } from './ImpostorGuessPhase';
import { ResultPhase } from './ResultPhase';
import { feedback } from '@/lib/feedback';

/**
 * Orchestrates the in-match flow. A single AnimatePresence keyed by phase gives
 * every transition the same crisp cross-fade. A persistent quit affordance lets
 * the host bail out without trapping anyone mid-game (with a guard so it isn't
 * triggered by accident).
 */
export function PlayScreen() {
  const phase = useGame((s) => s.phase);
  const quitToHome = useGame((s) => s.quitToHome);
  const redealRound = useGame((s) => s.redealRound);
  const [confirmQuit, setConfirmQuit] = useState(false);
  const [revealMenu, setRevealMenu] = useState(false);

  // Keep the screen awake during the active rounds (not while just naming).
  useWakeLock(phase !== 'lobby' && phase !== 'setup');

  // The plain quit button is available on the calmer phases. During the reveal a
  // separate control opens a small menu so the table can bail out *or* re-roll a
  // repeated/unwanted word before clues begin — previously you were stuck until
  // everyone had peeked. The vote stays locked down to avoid mis-taps.
  const showQuit = phase === 'clue' || phase === 'discuss' || phase === 'result';
  const showRevealMenu = phase === 'reveal';

  return (
    <div className="flex-1 flex flex-col relative">
      {(showQuit || showRevealMenu) && (
        <div className="absolute top-0 right-0 z-40 pt-safe pr-2">
          <IconButton
            label={showRevealMenu ? 'Round options' : 'Quit game'}
            variant="plain"
            onClick={() => {
              feedback('tap');
              if (showRevealMenu) setRevealMenu(true);
              else setConfirmQuit(true);
            }}
          >
            <Icon.Close size={20} />
          </IconButton>
        </div>
      )}

      <AnimatePresence mode="wait" initial={false}>
        <PhaseView key={phase} phase={phase} />
      </AnimatePresence>

      <Sheet open={confirmQuit} onClose={() => setConfirmQuit(false)} title="Leave the game?">
        <p className="text-ink-2 text-sm mb-5">
          Your current round will end and scores for this match will be lost.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary" onClick={() => setConfirmQuit(false)}>
            Keep playing
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setConfirmQuit(false);
              quitToHome();
            }}
          >
            Leave game
          </Button>
        </div>
      </Sheet>

      <Sheet open={revealMenu} onClose={() => setRevealMenu(false)} title="Restart the round?">
        <p className="text-ink-2 text-sm mb-5">
          Word repeated or not a great fit? Deal a fresh word and start the reveal
          over from the first player — or leave the game entirely.
        </p>
        <div className="grid gap-3">
          <Button
            fullWidth
            leadingIcon={<Icon.Shuffle size={20} />}
            onClick={() => {
              setRevealMenu(false);
              redealRound();
            }}
          >
            New word & restart reveal
          </Button>
          <Button variant="secondary" fullWidth onClick={() => setRevealMenu(false)}>
            Keep this word
          </Button>
          <Button
            variant="danger"
            fullWidth
            onClick={() => {
              setRevealMenu(false);
              quitToHome();
            }}
          >
            Leave game
          </Button>
        </div>
      </Sheet>
    </div>
  );
}

function PhaseView({ phase }: { phase: string }) {
  switch (phase) {
    case 'lobby':
      return <LobbyPhase />;
    case 'reveal':
      return <RevealPhase />;
    case 'clue':
      return <CluePhase />;
    case 'discuss':
      return <DiscussPhase />;
    case 'vote':
      return <VotePhase />;
    case 'impostor-guess':
      return <ImpostorGuessPhase />;
    case 'result':
      return <ResultPhase />;
    default:
      // 'setup' should never render under the play route; show lobby as a safe fallback.
      return <LobbyPhase />;
  }
}
