import { motion } from 'framer-motion';
import { Screen } from '@/components/Screen';
import { Button, IconButton, Icon, LogoMark } from '@/components/ui';
import { useGame } from '@/store/gameStore';
import { useStats } from '@/store/statsStore';
import { feedback } from '@/lib/feedback';

/**
 * Home: a calm hero with the mark, a single dominant Play action, and quiet
 * secondary entries. No clutter, no ads — the room sets the energy.
 */
export function HomeScreen() {
  const navigate = useGame((s) => s.navigate);
  const roundsPlayed = useStats((s) => s.roundsPlayed);

  return (
    <Screen enter="fade" className="px-5 pt-safe pb-safe">
      <div className="flex items-center justify-end pt-3">
        <IconButton label="Settings" variant="plain" onClick={() => navigate('settings')}>
          <Icon.Settings size={22} />
        </IconButton>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <LogoMark size={104} className="drop-shadow-[0_12px_40px_rgba(129,132,255,0.45)]" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="mt-6 font-display text-5xl font-semibold tracking-tight"
        >
          Undercover
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
          className="mt-3 text-ink-2 text-balance max-w-[18rem]"
        >
          One phone. One secret word. One of you is faking it. Find the impostor.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <Button
          size="xl"
          fullWidth
          cue="pop"
          leadingIcon={<Icon.Play size={20} />}
          onClick={() => {
            feedback('select');
            navigate('create');
          }}
        >
          Play
        </Button>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary" size="lg" onClick={() => navigate('packs')} leadingIcon={<Icon.Stack size={18} />}>
            Packs
          </Button>
          <Button variant="secondary" size="lg" onClick={() => navigate('stats')} leadingIcon={<Icon.Chart size={18} />}>
            Stats
          </Button>
        </div>
        <button
          onClick={() => navigate('how-to')}
          className="w-full text-center text-sm text-ink-3 hover:text-ink-2 py-2"
        >
          How to play{roundsPlayed > 0 ? ` · ${roundsPlayed} rounds played` : ''}
        </button>
      </motion.div>
    </Screen>
  );
}
