import { useState } from 'react';
import { Screen } from '@/components/Screen';
import { Avatar } from '@/components/ui';
import { UC, TopBar } from '@/components/uc';
import { useGame } from '@/store/gameStore';
import { useRoster } from '@/store/rosterStore';
import { feedback } from '@/lib/feedback';

/**
 * The Table — the seated roster for the match. Add names, pull in saved players,
 * reshuffle the seating, then deal. Ported from Undercover.dc's lobby.
 */
export function LobbyPhase() {
  const navigate = useGame((s) => s.navigate);
  const config = useGame((s) => s.config);
  const playerNames = useGame((s) => s.playerNames);
  const setPlayerNames = useGame((s) => s.setPlayerNames);
  const patchConfig = useGame((s) => s.patchConfig);
  const startMatch = useGame((s) => s.startMatch);

  const roster = useRoster((s) => s.people);
  const addPerson = useRoster((s) => s.add);

  // Seed the table: keep prior names if a full table exists, otherwise prefill
  // from the saved roster up to the configured player count (matches the design).
  const [names, setNames] = useState<string[]>(() => {
    if (playerNames.length >= 3) return [...playerNames];
    return roster.slice(0, config.playerCount).map((p) => p.name);
  });
  const [draft, setDraft] = useState('');

  const used = new Set(names.map((n) => n.toLowerCase()));
  const suggestions = roster.filter((p) => !used.has(p.name.toLowerCase())).slice(0, 6);

  const addName = (raw: string) => {
    const n = raw.trim();
    if (!n || used.has(n.toLowerCase())) return;
    setNames((prev) => [...prev, n]);
  };
  const commitDraft = () => {
    const n = draft.trim();
    if (!n) return;
    feedback('select');
    addName(n);
    addPerson(n);
    setDraft('');
  };
  const remove = (name: string) => {
    feedback('tap');
    setNames((prev) => prev.filter((p) => p !== name));
  };
  const reshuffle = () => {
    feedback('tap');
    setNames((prev) => [...prev].sort(() => Math.random() - 0.5));
  };
  const start = () => {
    if (names.length < 3) return;
    feedback('pop');
    setPlayerNames(names);
    patchConfig({ playerCount: names.length });
    startMatch();
  };

  const tooFew = names.length < 3;
  const status = tooFew ? `Add ${3 - names.length} more to start` : `${names.length} seated · ready when you are`;

  return (
    <Screen enter="up">
      <section
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          padding: 'max(env(safe-area-inset-top),22px) 22px max(env(safe-area-inset-bottom),22px)',
        }}
      >
        <TopBar
          title="The Table"
          subtitle={status}
          onBack={() => {
            useGame.setState({ phase: 'setup' });
            navigate('create');
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, flex: 1, overflowY: 'auto', minHeight: 0 }} className="no-scrollbar">
          {names.map((name, i) => (
            <div
              key={`${name}-${i}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 13,
                padding: '13px 15px',
                borderRadius: 14,
                border: `1px solid ${UC.border}`,
                background: UC.card,
              }}
            >
              <Avatar name={name} accent={i} size="sm" />
              <span style={{ flex: 1, font: "600 16px 'Space Grotesk'", color: UC.ink }}>{name}</span>
              <span style={{ font: "500 11px 'Space Mono'", color: UC.muted2 }}>Seat {i + 1}</span>
              <button
                onClick={() => remove(name)}
                aria-label={`Remove ${name}`}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 9,
                  border: `1px solid ${UC.border2}`,
                  background: 'transparent',
                  color: UC.muted,
                  cursor: 'pointer',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
          ))}

          <div style={{ display: 'flex', gap: 9, marginTop: 4 }}>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') commitDraft();
              }}
              placeholder="Add a name…"
              maxLength={16}
              autoComplete="off"
              spellCheck={false}
              style={{
                flex: 1,
                minWidth: 0,
                padding: '14px 15px',
                borderRadius: 14,
                border: `1px solid ${UC.border2}`,
                background: UC.card3,
                color: UC.ink,
                font: "600 15px 'Space Grotesk'",
                outline: 'none',
              }}
            />
            <button
              onClick={commitDraft}
              aria-label="Add player"
              style={{
                flex: '0 0 auto',
                width: 52,
                borderRadius: 14,
                border: '1px solid #f5402e55',
                background: '#f5402e1f',
                color: UC.brand,
                fontSize: 26,
                cursor: 'pointer',
                lineHeight: 1,
              }}
            >
              +
            </button>
          </div>

          {suggestions.length > 0 && (
            <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 9 }}>
              <span style={{ font: "600 11px 'Space Mono'", letterSpacing: '.14em', textTransform: 'uppercase', color: UC.muted2 }}>
                Saved players
              </span>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {suggestions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      feedback('tap');
                      addName(s.name);
                    }}
                    style={{
                      padding: '9px 14px',
                      borderRadius: 999,
                      border: `1px solid ${UC.border2}`,
                      background: UC.card2,
                      color: '#c9c6d4',
                      font: "600 13px 'Space Grotesk'",
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    + {s.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <button
            onClick={reshuffle}
            aria-label="Reshuffle seats"
            style={{
              flex: '0 0 auto',
              width: 58,
              borderRadius: 18,
              border: `1px solid ${UC.border2}`,
              background: UC.card2,
              color: '#c9c6d4',
              cursor: 'pointer',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
            </svg>
          </button>
          <button
            onClick={start}
            disabled={tooFew}
            style={{
              flex: 1,
              border: 0,
              borderRadius: 18,
              padding: 20,
              font: "700 18px 'Space Grotesk'",
              ...(tooFew
                ? { background: '#1d1c25', color: UC.muted2, cursor: 'not-allowed' }
                : { background: UC.brand, color: '#fff', cursor: 'pointer', boxShadow: '0 14px 34px -12px #f5402ecc' }),
            }}
          >
            {tooFew ? 'Need 3+ players' : 'Start Game'}
          </button>
        </div>
      </section>
    </Screen>
  );
}
