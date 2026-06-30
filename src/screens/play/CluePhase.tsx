import { Screen } from '@/components/Screen';
import { Avatar } from '@/components/ui';
import { UC, PrimaryButton } from '@/components/uc';
import { useGame } from '@/store/gameStore';
import { feedback } from '@/lib/feedback';

/**
 * Turn-by-turn clue prompt. The app keeps the order honest; clues are spoken in
 * the room. One evocative word per player. Ported from Undercover.dc.
 */
export function CluePhase() {
  const round = useGame((s) => s.round);
  const clueIndex = useGame((s) => s.clueIndex);
  const nextClue = useGame((s) => s.nextClue);
  if (!round) return null;

  const order = round.clueOrder;
  const currentId = order[clueIndex];
  const player = round.players.find((p) => p.id === currentId);
  if (!player) return null;
  const isLast = clueIndex >= order.length - 1;

  return (
    <Screen enter="fade">
      <section
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: 'max(env(safe-area-inset-top),26px) 24px max(env(safe-area-inset-bottom),24px)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ font: "700 12px 'Space Mono'", letterSpacing: '.22em', textTransform: 'uppercase', color: UC.gold }}>
            Clue round
          </span>
          <span style={{ font: "600 13px 'Space Grotesk'", color: UC.muted }}>
            {clueIndex + 1} / {order.length}
          </span>
        </div>

        <div style={{ display: 'flex', gap: 7, marginTop: 14 }}>
          {order.map((id, i) => (
            <span
              key={id}
              style={{
                flex: 1,
                height: 6,
                borderRadius: 999,
                background: i < clueIndex ? UC.gold : i === clueIndex ? UC.ink : UC.border,
                transition: 'background .3s',
              }}
            />
          ))}
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 22 }}>
          <span style={{ font: "600 13px 'Space Grotesk'", color: UC.muted }}>It’s your turn,</span>
          <Avatar name={player.name} accent={clueIndex} size="xl" glow />
          <h2 style={{ margin: 0, fontFamily: "'Anton'", fontSize: 60, lineHeight: 0.9, textTransform: 'uppercase', color: UC.ink }}>
            {player.name}
          </h2>
          <p style={{ margin: 0, maxWidth: 260, fontSize: 16, lineHeight: 1.45, color: UC.ink2 }}>
            Say <b style={{ color: UC.ink }}>one word</b> that hints at your secret — clever enough to prove you know it, vague
            enough to survive.
          </p>
        </div>

        <PrimaryButton
          onClick={() => {
            feedback('select');
            nextClue();
          }}
        >
          {isLast ? 'Start the discussion' : 'Next player'}
        </PrimaryButton>
      </section>
    </Screen>
  );
}
