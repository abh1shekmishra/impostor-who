import { Screen } from '@/components/Screen';
import { AppBar, Card, Icon } from '@/components/ui';
import { useGame } from '@/store/gameStore';
import { useStats } from '@/store/statsStore';
import { CATEGORY_BY_ID } from '@/data/categories';
import type { CategoryId } from '@/types';
import { formatTime } from '@/lib/format';

export function StatsScreen() {
  const navigate = useGame((s) => s.navigate);
  const stats = useStats();

  const totalRoles = stats.timesImpostor + Math.max(0, stats.roundsPlayed - stats.timesImpostor);
  const civWinRate = stats.roundsPlayed ? Math.round((stats.civilianWins / stats.roundsPlayed) * 100) : 0;
  const impostorEscapeRate = stats.timesImpostor
    ? Math.round(((stats.timesImpostor - stats.timesCaught) / stats.timesImpostor) * 100)
    : 0;
  const favCat = stats.favoriteCategory
    ? CATEGORY_BY_ID.get(stats.favoriteCategory as CategoryId)
    : null;

  return (
    <Screen className="pb-safe">
      <AppBar title="Statistics" onBack={() => navigate('home')} />
      <div className="px-5 py-5 space-y-5 overflow-y-auto no-scrollbar">
        {stats.roundsPlayed === 0 ? (
          <EmptyStats />
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3">
              <StatTile label="Games" value={stats.gamesPlayed} icon={<Icon.Play size={18} />} />
              <StatTile label="Rounds" value={stats.roundsPlayed} icon={<Icon.Shuffle size={18} />} />
              <StatTile label="Civilian win rate" value={`${civWinRate}%`} icon={<Icon.Users size={18} />} />
              <StatTile label="Impostor escapes" value={`${impostorEscapeRate}%`} icon={<Icon.Eye size={18} />} />
            </div>

            <Card>
              <h3 className="text-[15px] font-semibold mb-4">Your impostor record</h3>
              <Row label="Times impostor" value={stats.timesImpostor} />
              <Row label="Times caught" value={stats.timesCaught} />
              <Row label="Clutch word guesses" value={stats.impostorWordGuesses} />
              <Row
                label="Fastest catch"
                value={stats.fastestEjectionMs != null ? formatTime(stats.fastestEjectionMs / 1000) : '—'}
              />
            </Card>

            {favCat && (
              <Card className="flex items-center gap-4">
                <span className="text-3xl">{favCat.emoji}</span>
                <div>
                  <p className="text-[13px] text-ink-3">Most played category</p>
                  <p className="text-lg font-semibold">{favCat.label}</p>
                </div>
              </Card>
            )}

            <Card>
              <h3 className="text-[15px] font-semibold mb-2">Outcome split</h3>
              <SplitBar civilians={stats.civilianWins} impostors={stats.impostorWins} />
              <div className="flex justify-between text-[13px] mt-2 text-ink-2">
                <span>Civilians {stats.civilianWins}</span>
                <span>Impostors {stats.impostorWins}</span>
              </div>
            </Card>
            <p className="sr-only">{`Total roles dealt: ${totalRoles}`}</p>
          </>
        )}
      </div>
    </Screen>
  );
}

function StatTile({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) {
  return (
    <Card padded={false} className="p-4">
      <div className="text-ink-3 mb-2">{icon}</div>
      <p className="text-2xl font-semibold tabular-nums">{value}</p>
      <p className="text-[13px] text-ink-3 mt-0.5">{label}</p>
    </Card>
  );
}

function Row({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between py-2 border-b last:border-0 hairline">
      <span className="text-[14px] text-ink-2">{label}</span>
      <span className="text-[15px] font-semibold tabular-nums">{value}</span>
    </div>
  );
}

function SplitBar({ civilians, impostors }: { civilians: number; impostors: number }) {
  const total = Math.max(1, civilians + impostors);
  const civPct = (civilians / total) * 100;
  return (
    <div className="h-3 rounded-full overflow-hidden bg-surface-2 flex">
      <div className="h-full bg-brand transition-all" style={{ width: `${civPct}%` }} />
      <div className="h-full bg-danger transition-all" style={{ width: `${100 - civPct}%` }} />
    </div>
  );
}

function EmptyStats() {
  return (
    <div className="flex flex-col items-center text-center py-16">
      <span className="text-5xl mb-4">📊</span>
      <h2 className="text-xl font-semibold">No games yet</h2>
      <p className="text-ink-3 mt-2 max-w-[16rem]">
        Play your first round and your records will start appearing here.
      </p>
    </div>
  );
}
