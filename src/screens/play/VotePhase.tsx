import { useState, type CSSProperties } from 'react';
import { Screen } from '@/components/Screen';
import { Avatar } from '@/components/ui';
import { UC, PrimaryButton } from '@/components/uc';
import { useGame } from '@/store/gameStore';
import { feedback } from '@/lib/feedback';

/**
 * Voting. Individual mode: each player privately picks a suspect (can't vote for
 * self), then passes on. Group mode: one shared decision. Ported from Undercover.dc.
 */
export function VotePhase() {
  const round = useGame((s) => s.round);
  const voterIndex = useGame((s) => s.voterIndex);
  const castVote = useGame((s) => s.castVote);
  const finalizeVotes = useGame((s) => s.finalizeVotes);
  const [picked, setPicked] = useState<string | null>(null);

  if (!round) return null;
  const groupVote = round.config.groupVote;
  const voters = round.players.filter((p) => !p.eliminated);
  const voter = voters[voterIndex];

  // Individual mode can't vote for the active voter.
  const candidates = round.players.filter((p) => !p.eliminated && (groupVote || p.id !== voter?.id));
  const isLastVoter = voterIndex >= voters.length - 1;
  const pickedName = picked ? round.players.find((p) => p.id === picked)?.name ?? '' : '';

  const kicker = groupVote ? 'Decide together' : `Ballot ${voterIndex + 1} of ${voters.length}`;
  const header = groupVote ? 'Group Vote' : voter?.name ?? 'Vote';
  const sub = groupVote ? 'One final tap. No takebacks.' : 'Tap who you suspect, then pass the phone on.';
  const confirmLabel = !picked ? 'Tap a player' : groupVote ? `Vote out ${pickedName}` : 'Lock in vote';

  const confirm = () => {
    if (!picked) return;
    feedback('vote');
    if (groupVote) {
      candidates.forEach(() => castVote(picked));
      setTimeout(() => finalizeVotes(), 0);
      return;
    }
    castVote(picked);
    setPicked(null);
    if (isLastVoter) setTimeout(() => finalizeVotes(), 0);
  };

  const cardBase: CSSProperties = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 11,
    padding: '18px 12px',
    borderRadius: 18,
    cursor: 'pointer',
  };

  return (
    <Screen enter="fade">
      <section
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          padding: 'max(env(safe-area-inset-top),26px) 22px max(env(safe-area-inset-bottom),22px)',
        }}
      >
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ font: "700 12px 'Space Mono'", letterSpacing: '.22em', textTransform: 'uppercase', color: UC.brand }}>
            {kicker}
          </span>
          <h2 style={{ margin: 0, fontFamily: "'Anton'", fontSize: 38, lineHeight: 0.95, textTransform: 'uppercase', color: UC.ink }}>
            {header}
          </h2>
          <span style={{ font: "500 13px 'Space Grotesk'", color: UC.ink3 }}>{sub}</span>
        </div>

        <div
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 11,
            alignContent: 'center',
            padding: '22px 0',
            overflowY: 'auto',
            minHeight: 0,
          }}
          className="no-scrollbar"
        >
          {candidates.map((c) => {
            const selected = picked === c.id;
            const accent = round.players.findIndex((p) => p.id === c.id);
            return (
              <button
                key={c.id}
                onClick={() => {
                  feedback('tap');
                  setPicked(c.id);
                }}
                style={{
                  ...cardBase,
                  border: `1px solid ${selected ? UC.brand : UC.border}`,
                  background: selected ? '#f5402e1f' : UC.card,
                  boxShadow: selected ? '0 0 32px -8px #f5402e' : undefined,
                }}
              >
                <Avatar name={c.name} accent={accent} size="md" />
                <span style={{ font: "700 17px 'Space Grotesk'", color: UC.ink }}>{c.name}</span>
                {selected && (
                  <span
                    style={{
                      position: 'absolute',
                      top: 9,
                      right: 9,
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      background: UC.brand,
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                      <path d="M5 12l5 5 9-11" />
                    </svg>
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <PrimaryButton onClick={confirm} disabled={!picked}>
          {confirmLabel}
        </PrimaryButton>
      </section>
    </Screen>
  );
}
