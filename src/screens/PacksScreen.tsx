import { Screen } from '@/components/Screen';
import { AppBar, Card, Icon } from '@/components/ui';
import { useGame } from '@/store/gameStore';
import { CONTENT_PACKS, getSeasonalPackForToday } from '@/data/packs';
import { ALL_WORDS } from '@/data/words';
import { ALL_CATEGORY_IDS } from '@/data/categories';
import type { ContentPack } from '@/types';
import { feedback } from '@/lib/feedback';

/** Count how many seed words a pack currently exposes (for the card subtitle). */
function packSize(pack: ContentPack): number {
  if (pack.categories.length === 0) return ALL_WORDS.length;
  const cats = new Set(pack.categories);
  return ALL_WORDS.filter((w) => cats.has(w.category)).length;
}

export function PacksScreen() {
  const navigate = useGame((s) => s.navigate);
  const patchConfig = useGame((s) => s.patchConfig);
  const setCategories = useGame((s) => s.setCategories);
  const seasonal = getSeasonalPackForToday();

  const playPack = (pack: ContentPack) => {
    feedback('select');
    if (pack.categories.length === 0) {
      setCategories([]); // Everything
    } else {
      setCategories(pack.categories);
    }
    if (pack.filter?.difficulty) patchConfig({ difficulty: pack.filter.difficulty });
    if (pack.filter?.safeOnly) patchConfig({ familySafe: true });
    navigate('create');
  };

  const core = CONTENT_PACKS.filter((p) => p.kind === 'core');
  const fresh = CONTENT_PACKS.filter((p) => p.kind === 'seasonal' || p.kind === 'ai');

  return (
    <Screen className="pb-safe">
      <AppBar title="Content Packs" onBack={() => navigate('home')} subtitle={`${ALL_WORDS.length} words · ${ALL_CATEGORY_IDS.length} categories`} />
      <div className="px-5 py-5 space-y-6 overflow-y-auto no-scrollbar">
        {seasonal && (
          <section>
            <h2 className="text-[12px] font-semibold uppercase tracking-wider text-ink-3 mb-2 px-1 flex items-center gap-1.5">
              <Icon.Sparkle size={13} /> Today’s pack
            </h2>
            <PackCard pack={seasonal} highlighted onPlay={() => playPack(seasonal)} />
          </section>
        )}

        <section>
          <h2 className="text-[12px] font-semibold uppercase tracking-wider text-ink-3 mb-2 px-1">
            Curated
          </h2>
          <div className="space-y-3">
            {core.map((pack) => (
              <PackCard key={pack.id} pack={pack} onPlay={() => playPack(pack)} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[12px] font-semibold uppercase tracking-wider text-ink-3 mb-2 px-1">
            Fresh & seasonal
          </h2>
          <div className="space-y-3">
            {fresh.map((pack) => (
              <PackCard key={pack.id} pack={pack} onPlay={() => playPack(pack)} />
            ))}
          </div>
          <p className="text-[12px] text-ink-3 mt-3 px-1 leading-relaxed">
            Seasonal & daily packs are designed to be refreshed by an automated
            content pipeline — new IPL, festival and meme words drop in without an
            app update.
          </p>
        </section>
      </div>
    </Screen>
  );
}

function PackCard({
  pack,
  onPlay,
  highlighted,
}: {
  pack: ContentPack;
  onPlay: () => void;
  highlighted?: boolean;
}) {
  return (
    <Card
      interactive
      onClick={onPlay}
      className={highlighted ? 'shadow-glow' : ''}
      style={highlighted ? { boxShadow: `0 8px 40px -8px rgb(${pack.accent} / 0.5)` } : undefined}
    >
      <div className="flex items-center gap-4">
        <div
          className="h-14 w-14 shrink-0 grid place-items-center rounded-2xl text-3xl"
          style={{ background: `rgb(${pack.accent} / 0.16)` }}
        >
          {pack.emoji}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-[16px] font-semibold truncate">{pack.name}</h3>
            {pack.kind === 'ai' && <Tag>AI</Tag>}
            {pack.kind === 'seasonal' && <Tag>Seasonal</Tag>}
          </div>
          <p className="text-[13px] text-ink-3 mt-0.5 line-clamp-2">{pack.description}</p>
          <p className="text-[12px] text-ink-3 mt-1">{packSize(pack)} words ready</p>
        </div>
        <Icon.ChevronRight className="text-ink-3 shrink-0" />
      </div>
    </Card>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-md bg-brand/15 text-brand">
      {children}
    </span>
  );
}
