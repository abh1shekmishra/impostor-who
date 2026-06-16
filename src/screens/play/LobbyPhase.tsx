import { useEffect, useRef, useState } from 'react';
import { Screen } from '@/components/Screen';
import { AppBar, Avatar, Button, Icon } from '@/components/ui';
import { useGame } from '@/store/gameStore';
import { MODE_BY_ID } from '@/data/modes';
import { feedback } from '@/lib/feedback';
import { cn } from '@/lib/cn';

const SUGGESTED = [
  'Aarav', 'Diya', 'Kabir', 'Mira', 'Rohan', 'Sara', 'Veer', 'Anaya',
  'Ishaan', 'Tara', 'Arjun', 'Nisha', 'Dev', 'Riya', 'Om', 'Zoya',
  'Yash', 'Kiara', 'Reyansh', 'Myra',
];

/**
 * Name entry. The player count comes from Create Room; here we fill names.
 * Empty names auto-fill with friendly defaults so play is never blocked.
 */
export function LobbyPhase() {
  const navigate = useGame((s) => s.navigate);
  const config = useGame((s) => s.config);
  const playerNames = useGame((s) => s.playerNames);
  const setPlayerNames = useGame((s) => s.setPlayerNames);
  const startMatch = useGame((s) => s.startMatch);
  const mode = MODE_BY_ID.get(config.modeId)!;

  const [names, setNames] = useState<string[]>(() => {
    const base = Array.from({ length: config.playerCount }, (_, i) => playerNames[i] ?? '');
    return base;
  });
  const lastInputRef = useRef<HTMLInputElement | null>(null);

  // Keep the names array length in sync if player count changed.
  useEffect(() => {
    setNames((prev) => {
      const next = Array.from({ length: config.playerCount }, (_, i) => prev[i] ?? '');
      return next;
    });
  }, [config.playerCount]);

  const update = (i: number, value: string) => {
    setNames((prev) => prev.map((n, idx) => (idx === i ? value : n)));
  };

  const filledCount = names.filter((n) => n.trim()).length;

  const start = () => {
    const finalNames = names.map((n, i) => n.trim() || SUGGESTED[i % SUGGESTED.length]!);
    setPlayerNames(finalNames);
    feedback('pop');
    startMatch();
  };

  return (
    <Screen className="pb-safe">
      <AppBar
        title="Players"
        subtitle={`${mode.emoji} ${mode.name} · ${config.playerCount} players`}
        onBack={() => {
          useGame.setState({ phase: 'setup' });
          navigate('create');
        }}
      />
      <div className="px-5 py-5 space-y-2.5 overflow-y-auto no-scrollbar">
        {names.map((name, i) => (
          <div
            key={i}
            className={cn(
              'flex items-center gap-3 rounded-2xl bg-surface border px-3 py-2.5 transition-colors',
              name.trim() && 'border-brand/30'
            )}
          >
            <Avatar name={name || `Player ${i + 1}`} accent={i} size="sm" />
            <input
              ref={i === names.length - 1 ? lastInputRef : undefined}
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
          </div>
        ))}
        <p className="text-[12px] text-ink-3 px-1 pt-1">
          Leave names blank to auto-fill them. {filledCount}/{config.playerCount} named.
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
