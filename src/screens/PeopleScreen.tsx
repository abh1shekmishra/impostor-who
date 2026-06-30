import { useState } from 'react';
import { Screen } from '@/components/Screen';
import { Avatar } from '@/components/ui';
import { UC, TopBar } from '@/components/uc';
import { useGame } from '@/store/gameStore';
import { useRoster } from '@/store/rosterStore';
import { feedback } from '@/lib/feedback';

/**
 * People — the saved roster you play with most. Add once, then they're one tap
 * away in the lobby. Ported from Undercover.dc.
 */
export function PeopleScreen() {
  const navigate = useGame((s) => s.navigate);
  const people = useRoster((s) => s.people);
  const add = useRoster((s) => s.add);
  const remove = useRoster((s) => s.remove);
  const [draft, setDraft] = useState('');

  const commit = () => {
    const n = draft.trim();
    if (!n) return;
    feedback('select');
    add(n);
    setDraft('');
  };

  return (
    <Screen enter="up">
      <section
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          padding: 'max(env(safe-area-inset-top),22px) 22px max(env(safe-area-inset-bottom),24px)',
        }}
      >
        <TopBar title="People" subtitle={`${people.length} saved`} onBack={() => navigate('home')} marginBottom={18} />

        <div style={{ display: 'flex', gap: 9, marginBottom: 14 }}>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commit();
            }}
            placeholder="Add someone…"
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
            onClick={commit}
            aria-label="Add person"
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

        {people.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 14 }}>
            <span style={{ width: 70, height: 70, borderRadius: 22, border: `1px dashed ${UC.borderDash}`, display: 'grid', placeItems: 'center', fontSize: 30 }}>
              👋
            </span>
            <span style={{ font: "700 18px 'Space Grotesk'", color: UC.ink }}>No regulars yet</span>
            <span style={{ font: "400 14px 'Space Grotesk'", color: UC.muted, maxWidth: 230 }}>
              Save the people you play with most so setup takes one tap next time.
            </span>
          </div>
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 9, overflowY: 'auto', minHeight: 0 }} className="no-scrollbar">
            {people.map((p, i) => (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 13,
                  padding: '12px 14px',
                  borderRadius: 14,
                  border: `1px solid ${UC.border}`,
                  background: UC.card,
                }}
              >
                <Avatar name={p.name} accent={i} size="sm" />
                <span style={{ flex: 1, font: "600 16px 'Space Grotesk'", color: UC.ink }}>{p.name}</span>
                <button
                  onClick={() => {
                    feedback('tap');
                    remove(p.id);
                  }}
                  aria-label={`Remove ${p.name}`}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
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
          </div>
        )}
      </section>
    </Screen>
  );
}
