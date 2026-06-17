import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Screen } from '@/components/Screen';
import { AppBar, Avatar, Button, Chip, Icon } from '@/components/ui';
import { useGame } from '@/store/gameStore';
import { useRoster } from '@/store/rosterStore';
import { MODE_BY_ID } from '@/data/modes';
import { feedback } from '@/lib/feedback';
import { cn } from '@/lib/cn';

/**
 * Name entry. The player count comes from Create Room; here we fill names.
 *
 * Two ways to fill: tap people from your saved roster (one-tap), or type a
 * guest name. Any slot left blank simply becomes "Player N" — never a random
 * name, so the board reads predictably.
 */
export function LobbyPhase() {
  const navigate = useGame((s) => s.navigate);
  const config = useGame((s) => s.config);
  const playerNames = useGame((s) => s.playerNames);
  const setPlayerNames = useGame((s) => s.setPlayerNames);
  const patchConfig = useGame((s) => s.patchConfig);
  const startMatch = useGame((s) => s.startMatch);
  const mode = MODE_BY_ID.get(config.modeId)!;

  const people = useRoster((s) => s.people);
  const addPerson = useRoster((s) => s.add);

  const [names, setNames] = useState<string[]>(() =>
    Array.from({ length: config.playerCount }, (_, i) => playerNames[i] ?? '')
  );

  // Keep the names array length in sync if the player count changed elsewhere.
  useEffect(() => {
    setNames((prev) =>
      Array.from({ length: config.playerCount }, (_, i) => prev[i] ?? '')
    );
  }, [config.playerCount]);

  const update = (i: number, value: string) => {
    setNames((prev) => prev.map((n, idx) => (idx === i ? value : n)));
  };

  const filledCount = names.filter((n) => n.trim()).length;
  const usedNames = new Set(names.map((n) => n.trim().toLowerCase()).filter(Boolean));

  /** Place a roster person into the first empty slot, growing the room if full. */
  const pickPerson = (name: string) => {
    if (usedNames.has(name.toLowerCase())) return;
    feedback('select');
    const emptyIndex = names.findIndex((n) => !n.trim());
    if (emptyIndex >= 0) {
      update(emptyIndex, name);
    } else if (names.length < 20) {
      const next = [...names, name];
      setNames(next);
      patchConfig({ playerCount: next.length });
    }
  };

  const start = () => {
    // Blank slots become "Player N" — predictable, never random.
    const finalNames = names.map((n, i) => n.trim() || `Player ${i + 1}`);
    // Auto-save any typed guest names so they're handy next time.
    finalNames.forEach((n, i) => {
      if (names[i]?.trim()) addPerson(n);
    });
    patchConfig({ playerCount: finalNames.length });
    setPlayerNames(finalNames);
    feedback('pop');
    startMatch();
  };

  const available = people.filter((p) => !usedNames.has(p.name.toLowerCase()));

  return (
    <Screen className="pb-safe">
      <AppBar
        title="Players"
        subtitle={`${mode.emoji} ${mode.name} · ${names.length} players`}
        onBack={() => {
          useGame.setState({ phase: 'setup' });
          navigate('create');
        }}
      />
      <div className="px-5 py-5 space-y-4 overflow-y-auto no-scrollbar">
        {/* Quick-pick from saved roster */}
        {people.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-ink-3">
                Your people
              </span>
              <button
                onClick={() => navigate('people')}
                className="text-[13px] font-medium text-brand"
              >
                Manage
              </button>
            </div>
            {available.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {available.map((p) => (
                  <Chip key={p.id} size="sm" onClick={() => pickPerson(p.name)} leading="＋">
                    {p.name}
                  </Chip>
                ))}
              </div>
            ) : (
              <p className="text-[13px] text-ink-3 px-1">Everyone’s in. 🎉</p>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate('people')}
            className="w-full flex items-center gap-3 rounded-2xl bg-surface-2 border px-4 py-3 text-left"
          >
            <span className="h-9 w-9 grid place-items-center rounded-full bg-brand/15 text-brand">
              <Icon.Users size={18} />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-[14px] font-medium text-ink">Save your regular squad</span>
              <span className="block text-[12px] text-ink-3">Add people once, tap to add them next time</span>
            </span>
            <Icon.ChevronRight className="text-ink-3" />
          </button>
        )}

        {/* Player slots */}
        <div className="space-y-2.5">
          {names.map((name, i) => (
            <motion.div
              key={i}
              layout
              className={cn(
                'flex items-center gap-3 rounded-2xl bg-surface border px-3 py-2.5 transition-colors',
                name.trim() && 'border-brand/30'
              )}
            >
              <Avatar name={name || `Player ${i + 1}`} accent={i} size="sm" />
              <input
                value={name}
                onChange={(e) => update(i, e.target.value)}
                placeholder={`Player ${i + 1}`}
                aria-label={`Name for player ${i + 1}`}
                maxLength={16}
                autoComplete="off"
                autoCapitalize="words"
                spellCheck={false}
                className="flex-1 min-w-0 bg-transparent outline-none text-[16px] font-medium placeholder:text-ink-3"
              />
              {name.trim() && (
                <button
                  aria-label={`Clear name ${i + 1}`}
                  onClick={() => update(i, '')}
                  className="text-ink-3 hover:text-ink p-1"
                >
                  <Icon.Close size={16} />
                </button>
              )}
            </motion.div>
          ))}
        </div>

        <p className="text-[12px] text-ink-3 px-1">
          Blank slots become “Player 1”, “Player 2”… {filledCount}/{names.length} named.
        </p>
      </div>

      <div className="px-5 pt-3 pb-safe glass border-t">
        <Button size="xl" fullWidth cue="pop" leadingIcon={<Icon.Play size={20} />} onClick={start}>
          Start game
        </Button>
      </div>
    </Screen>
  );
}
