import { useMemo, useState } from 'react';
import { Screen } from '@/components/Screen';
import { AppBar, Button, Card, Chip, Sheet, Stepper, Toggle, Icon } from '@/components/ui';
import { useGame } from '@/store/gameStore';
import { GAME_MODES, MODE_BY_ID } from '@/data/modes';
import {
  CATEGORY_BY_ID,
  CATEGORY_GROUPS,
  LIVE_CATEGORIES,
  wordsForCategory,
} from '@/data/categories';
import { countPlayable } from '@/lib/content';
import type { CategoryGroup, CategoryId, Difficulty } from '@/types';
import { feedback } from '@/lib/feedback';
import { cn } from '@/lib/cn';

const TIMERS: { label: string; value: number | null }[] = [
  { label: '30s', value: 30 },
  { label: '45s', value: 45 },
  { label: '60s', value: 60 },
  { label: '90s', value: 90 },
  { label: '2m', value: 120 },
  { label: '∞', value: null },
];

const DIFFICULTIES: { id: Difficulty; label: string; emoji: string }[] = [
  { id: 'easy', label: 'Easy', emoji: '🟢' },
  { id: 'medium', label: 'Medium', emoji: '🟡' },
  { id: 'hard', label: 'Hard', emoji: '🟠' },
  { id: 'evil', label: 'Evil', emoji: '🔴' },
];

export function CreateRoomScreen() {
  const navigate = useGame((s) => s.navigate);
  const config = useGame((s) => s.config);
  const patchConfig = useGame((s) => s.patchConfig);
  const toggleCategory = useGame((s) => s.toggleCategory);
  const setCategories = useGame((s) => s.setCategories);
  const toggleDifficulty = useGame((s) => s.toggleDifficulty);
  const setMode = useGame((s) => s.setMode);

  const [modeSheet, setModeSheet] = useState(false);
  const [catSheet, setCatSheet] = useState(false);
  // Long-press a category chip to preview its words. 'everything' = all live words.
  const [wordsSheet, setWordsSheet] = useState<CategoryId | 'everything' | null>(null);

  const previewWords =
    wordsSheet === 'everything'
      ? LIVE_CATEGORIES.flatMap((c) => wordsForCategory(c.id)).sort((a, b) => a.localeCompare(b))
      : wordsSheet
        ? wordsForCategory(wordsSheet)
        : [];
  const previewTitle =
    wordsSheet === 'everything'
      ? 'Everything'
      : wordsSheet
        ? `${CATEGORY_BY_ID.get(wordsSheet)?.emoji ?? ''} ${CATEGORY_BY_ID.get(wordsSheet)?.label ?? ''}`
        : '';

  const mode = MODE_BY_ID.get(config.modeId)!;
  const playable = useMemo(() => countPlayable(config, mode), [config, mode]);
  const tooFew = playable < 5;

  const selectedCatCount = config.categories.length;

  return (
    <Screen className="pb-safe">
      <AppBar
        title="New Game"
        onBack={() => navigate('home')}
        subtitle={`${playable} words ready`}
      />
      <div className="px-5 py-5 space-y-5 overflow-y-auto no-scrollbar">
        {/* Mode */}
        <Card interactive onClick={() => setModeSheet(true)}>
          <div className="flex items-center gap-4">
            <span className="text-3xl">{mode.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] uppercase tracking-wider text-ink-3 font-semibold">Mode</p>
              <p className="text-[17px] font-semibold">{mode.name}</p>
              <p className="text-[13px] text-ink-3 truncate">{mode.tagline}</p>
            </div>
            <Icon.ChevronRight className="text-ink-3" />
          </div>
        </Card>

        {/* Players & impostors */}
        <Card className="space-y-4">
          <Stepper
            label="Players"
            value={config.playerCount}
            min={3}
            max={20}
            onChange={(n) => patchConfig({ playerCount: n })}
          />
          <div className="h-px bg-ink/5" />
          <Stepper
            label="Impostors"
            value={config.impostorCount}
            min={1}
            max={Math.min(3, config.playerCount - 1)}
            onChange={(n) => patchConfig({ impostorCount: n })}
            suffix={config.impostorCount > 1 ? 'hidden' : ''}
          />
          {MODE_BY_ID.get(config.modeId)?.rules.impostors && (
            <p className="text-[12px] text-ink-3">
              {mode.name} fixes the impostor count for balance.
            </p>
          )}
        </Card>

        {/* Timer */}
        <section>
          <SectionLabel icon={<Icon.Timer size={14} />}>Discussion timer</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {TIMERS.map((t) => (
              <Chip
                key={t.label}
                selected={config.timerSeconds === t.value}
                onClick={() => patchConfig({ timerSeconds: t.value })}
              >
                {t.label}
              </Chip>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section>
          <SectionLabel>
            Categories
            <span className="ml-auto text-ink-3 font-normal normal-case tracking-normal">
              {selectedCatCount === 0 ? 'Everything' : `${selectedCatCount} selected`}
            </span>
          </SectionLabel>
          <div className="flex flex-wrap gap-2">
            <Chip
              selected={selectedCatCount === 0}
              onClick={() => setCategories([])}
              onLongPress={() => setWordsSheet('everything')}
              leading="✨"
            >
              Everything
            </Chip>
            {LIVE_CATEGORIES.slice(0, 8).map((c) => (
              <Chip
                key={c.id}
                selected={config.categories.includes(c.id)}
                onClick={() => toggleCategory(c.id)}
                onLongPress={() => setWordsSheet(c.id)}
                leading={c.emoji}
              >
                {c.label}
              </Chip>
            ))}
            {LIVE_CATEGORIES.length > 8 && (
              <Chip onClick={() => setCatSheet(true)} leading="➕">
                More
              </Chip>
            )}
          </div>
          <p className="text-[12px] text-ink-3 mt-2 px-1">
            Tip: press &amp; hold a category for 5s to preview its words.
          </p>
        </section>

        {/* Difficulty */}
        <section>
          <SectionLabel>Difficulty</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {DIFFICULTIES.map((d) => (
              <Chip
                key={d.id}
                selected={config.difficulty.includes(d.id)}
                onClick={() => toggleDifficulty(d.id)}
                leading={d.emoji}
              >
                {d.label}
              </Chip>
            ))}
          </div>
        </section>

        {/* Toggles */}
        <Card padded={false} className="px-5">
          <Toggle
            label="Family safe"
            description="Hide anything not kid-friendly"
            checked={config.familySafe}
            onChange={(v) => patchConfig({ familySafe: v, allowAdult: v ? false : config.allowAdult })}
          />
          <div className="h-px bg-ink/5 -mx-5" />
          <Toggle
            label="18+ content"
            description="Allow adult-oriented words"
            checked={config.allowAdult}
            disabled={config.familySafe}
            onChange={(v) => patchConfig({ allowAdult: v })}
          />
          <div className="h-px bg-ink/5 -mx-5" />
          <Toggle
            label="English only"
            description="Exclude Hindi / Hinglish words"
            checked={config.englishOnly}
            onChange={(v) => patchConfig({ englishOnly: v })}
          />
        </Card>

        {tooFew && (
          <div className="flex items-start gap-2 rounded-2xl bg-warning/10 text-warning px-4 py-3 text-[13px]">
            <span>⚠️</span>
            <span>
              Only {playable} words match these filters. Add categories or
              difficulties for more variety.
            </span>
          </div>
        )}
      </div>

      <div className="px-5 pt-3 pb-safe glass border-t">
        <Button
          size="xl"
          fullWidth
          cue="pop"
          disabled={playable === 0}
          trailingIcon={<Icon.ChevronRight size={20} />}
          onClick={() => {
            feedback('select');
            navigate('play');
            useGame.setState({ phase: 'lobby' });
          }}
        >
          Add players
        </Button>
      </div>

      {/* Mode picker */}
      <Sheet open={modeSheet} onClose={() => setModeSheet(false)} title="Choose a mode">
        <div className="space-y-2 max-h-[60vh] overflow-y-auto no-scrollbar -mx-1 px-1">
          {GAME_MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                feedback('select');
                setMode(m.id);
                setModeSheet(false);
              }}
              className={cn(
                'w-full flex items-center gap-3 p-3 rounded-2xl text-left transition-colors',
                m.id === config.modeId ? 'bg-brand/12 ring-1 ring-brand/40' : 'hover:bg-surface-2'
              )}
            >
              <span className="text-2xl shrink-0">{m.emoji}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">{m.name}</span>
                <span className="block text-[13px] text-ink-3 line-clamp-2">{m.description}</span>
              </span>
              {m.id === config.modeId && <Icon.Check className="text-brand shrink-0" />}
            </button>
          ))}
        </div>
      </Sheet>

      {/* Full category picker grouped */}
      <Sheet open={catSheet} onClose={() => setCatSheet(false)} title="Categories">
        <div className="max-h-[62vh] overflow-y-auto no-scrollbar space-y-4 -mx-1 px-1">
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" onClick={() => setCategories([])}>
              Everything
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setCategories(LIVE_CATEGORIES.map((c) => c.id))}
            >
              Select all
            </Button>
          </div>
          {CATEGORY_GROUPS.filter((group) =>
            LIVE_CATEGORIES.some((c) => c.group === group.id)
          ).map((group) => (
            <CategoryGroupBlock
              key={group.id}
              group={group.id}
              label={`${group.emoji} ${group.label}`}
              onPreview={setWordsSheet}
            />
          ))}
        </div>
        <div className="pt-3">
          <Button fullWidth onClick={() => setCatSheet(false)}>
            Done · {playable} words
          </Button>
        </div>
      </Sheet>

      {/* Long-press preview: every word currently in a category */}
      <Sheet
        open={wordsSheet !== null}
        onClose={() => setWordsSheet(null)}
        title={previewTitle}
      >
        <p className="text-[12px] text-ink-3 mb-3">{previewWords.length} words in the deck</p>
        <div className="max-h-[58vh] overflow-y-auto no-scrollbar flex flex-wrap gap-2 -mx-1 px-1">
          {previewWords.map((w) => (
            <span
              key={w}
              className="px-3 py-1.5 rounded-xl bg-surface-2 text-[13px] text-ink-2"
            >
              {w}
            </span>
          ))}
        </div>
      </Sheet>
    </Screen>
  );
}

function CategoryGroupBlock({
  group,
  label,
  onPreview,
}: {
  group: CategoryGroup;
  label: string;
  onPreview: (id: CategoryId) => void;
}) {
  const config = useGame((s) => s.config);
  const toggleCategory = useGame((s) => s.toggleCategory);
  const cats = LIVE_CATEGORIES.filter((c) => c.group === group);
  return (
    <div>
      <p className="text-[12px] font-semibold uppercase tracking-wider text-ink-3 mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {cats.map((c) => (
          <Chip
            key={c.id}
            size="sm"
            selected={config.categories.includes(c.id)}
            onClick={() => toggleCategory(c.id)}
            onLongPress={() => onPreview(c.id)}
            leading={c.emoji}
          >
            {c.label}
          </Chip>
        ))}
      </div>
    </div>
  );
}

function SectionLabel({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <h2 className="text-[12px] font-semibold uppercase tracking-wider text-ink-3 mb-2 px-1 flex items-center gap-1.5">
      {icon}
      {children}
    </h2>
  );
}
