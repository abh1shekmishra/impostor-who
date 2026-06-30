import { AnimatePresence } from 'framer-motion';
import { useGame } from '@/store/gameStore';
import { useWakeLock } from '@/hooks';
import { GameMenu } from '@/components/GameMenu';
import { LobbyPhase } from './LobbyPhase';
import { RevealPhase } from './RevealPhase';
import { CluePhase } from './CluePhase';
import { DiscussPhase } from './DiscussPhase';
import { VotePhase } from './VotePhase';
import { ImpostorGuessPhase } from './ImpostorGuessPhase';
import { ResultPhase } from './ResultPhase';

/**
 * Orchestrates the in-match flow. A single AnimatePresence keyed by phase gives
 * every transition the same crisp cross-fade. Mirroring Undercover.dc, the
 * active round has no quit chrome — players exit from Result (New game / Home)
 * or back out from the lobby.
 */
export function PlayScreen() {
  const phase = useGame((s) => s.phase);
  // Keep the screen awake during the active rounds (not while just naming).
  useWakeLock(phase !== 'lobby' && phase !== 'setup');

  return (
    <div className="flex-1 flex flex-col relative">
      <AnimatePresence mode="wait" initial={false}>
        <PhaseView key={phase} phase={phase} />
      </AnimatePresence>
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
