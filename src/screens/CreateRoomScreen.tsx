import { useState, type CSSProperties } from 'react';
import { Screen } from '@/components/Screen';
import { UC, TopBar, PrimaryButton, ArrowRight, Switch } from '@/components/uc';
import { useGame } from '@/store/gameStore';
import { GAME_MODES, MODE_BY_ID } from '@/data/modes';
import { ALL_WORDS } from '@/data/words';
import type { Difficulty } from '@/types';
import { feedback } from '@/lib/feedback';

const TIMERS: { label: string; value: number | null }[] = [
  { label: '45s', value: 45 },
  { label: '90s', value: 90 },
  { label: '3 min', value: 180 },
  { label: 'Off', value: null },
];

const DIFFS: { id: Difficulty; label: string }[] = [
  { id: 'easy', label: 'Chill' },
  { id: 'medium', label: 'Normal' },
  { id: 'hard', label: 'Ruthless' },
];

const TOGGLES = [
  { key: 'familySafe', label: 'Family-safe', desc: 'Hide spicy words' },
  { key: 'adult', label: '18+ content', desc: 'After-dark word pool' },
  { key: 'groupVote', label: 'Group vote', desc: 'Decide out loud, not in secret' },
] as const;

const card: CSSProperties = {
  padding: 16,
  borderRadius: 16,
  border: `1px solid ${UC.border}`,
  background: UC.card,
};

function chipStyle(active: boolean): CSSProperties {
  return {
    padding: '11px 17px',
    borderRadius: 999,
    border: `1px solid ${active ? UC.brand : UC.border2}`,
    background: active ? '#f5402e24' : 'transparent',
    color: active ? UC.ink : UC.ink3,
    font: "600 14px 'Space Grotesk'",
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  };
}

const stepBtn: CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: 11,
  border: `1px solid ${UC.border2}`,
  background: '#1d1c25',
  color: UC.ink,
  fontSize: 22,
  cursor: 'pointer',
  lineHeight: 1,
};

export function CreateRoomScreen() {
  const navigate = useGame((s) => s.navigate);
  const config = useGame((s) => s.config);
  const patchConfig = useGame((s) => s.patchConfig);
  const toggleDifficulty = useGame((s) => s.toggleDifficulty);
  const setMode = useGame((s) => s.setMode);
  const [modeSheet, setModeSheet] = useState(false);

  const mode = MODE_BY_ID.get(config.modeId)!;

  const toggle = (key: (typeof TOGGLES)[number]['key']) => {
    feedback('tap');
    if (key === 'familySafe') {
      patchConfig({ familySafe: !config.familySafe, allowAdult: !config.familySafe ? false : config.allowAdult });
    } else if (key === 'adult') {
      patchConfig({ allowAdult: !config.allowAdult });
    } else {
      patchConfig({ groupVote: !config.groupVote });
    }
  };
  const toggleValue = (key: (typeof TOGGLES)[number]['key']) =>
    key === 'familySafe' ? config.familySafe : key === 'adult' ? config.allowAdult : config.groupVote;

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
        <TopBar title="New Game" subtitle={`${ALL_WORDS.length} words ready`} onBack={() => navigate('home')} marginBottom={22} />

        <div className="no-scrollbar" style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1, overflowY: 'auto', minHeight: 0 }}>
          {/* Mode card */}
          <button
            onClick={() => setModeSheet(true)}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: 15,
              padding: 18,
              borderRadius: 18,
              border: `1px solid ${UC.border2}`,
              background: 'linear-gradient(135deg,#1c1a24,#141219)',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <span
              style={{
                flex: '0 0 auto',
                width: 50,
                height: 50,
                borderRadius: 14,
                background: '#f5402e1f',
                border: '1px solid #f5402e44',
                display: 'grid',
                placeItems: 'center',
                color: UC.brand,
                fontFamily: "'Anton'",
                fontSize: 24,
              }}
            >
              {mode.name[0]}
            </span>
            <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <span style={{ font: "700 11px 'Space Mono'", letterSpacing: '.16em', textTransform: 'uppercase', color: UC.muted }}>
                Mode
              </span>
              <span style={{ font: "700 18px 'Space Grotesk'", color: UC.ink }}>{mode.name}</span>
              <span style={{ font: "400 12px 'Space Grotesk'", color: UC.ink3, lineHeight: 1.35 }}>{mode.description}</span>
            </span>
            <span style={{ color: UC.muted2 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </span>
          </button>

          {/* Steppers */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ ...card, display: 'flex', flexDirection: 'column', gap: 13 }}>
              <span style={{ font: "600 13px 'Space Grotesk'", color: UC.ink3 }}>Players</span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <button style={stepBtn} onClick={() => patchConfig({ playerCount: config.playerCount - 1 })} aria-label="Fewer players">
                  −
                </button>
                <span style={{ fontFamily: "'Anton'", fontSize: 30, color: UC.ink }}>{config.playerCount}</span>
                <button style={stepBtn} onClick={() => patchConfig({ playerCount: config.playerCount + 1 })} aria-label="More players">
                  +
                </button>
              </div>
            </div>
            <div style={{ ...card, display: 'flex', flexDirection: 'column', gap: 13 }}>
              <span style={{ font: "600 13px 'Space Grotesk'", color: UC.ink3 }}>Impostors</span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <button style={stepBtn} onClick={() => patchConfig({ impostorCount: config.impostorCount - 1 })} aria-label="Fewer impostors">
                  −
                </button>
                <span style={{ fontFamily: "'Anton'", fontSize: 30, color: UC.brand }}>{config.impostorCount}</span>
                <button style={stepBtn} onClick={() => patchConfig({ impostorCount: config.impostorCount + 1 })} aria-label="More impostors">
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Timer */}
          <div style={{ ...card, padding: '16px 16px 18px', display: 'flex', flexDirection: 'column', gap: 13 }}>
            <span style={{ font: "600 13px 'Space Grotesk'", color: UC.ink3 }}>Discussion timer</span>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {TIMERS.map((t) => (
                <button key={t.label} style={chipStyle(config.timerSeconds === t.value)} onClick={() => patchConfig({ timerSeconds: t.value })}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div style={{ ...card, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <span style={{ font: "600 13px 'Space Grotesk'", color: UC.ink3 }}>Categories</span>
              <span style={{ font: "400 12px 'Space Grotesk'", color: UC.muted2 }}>More categories coming soon</span>
            </div>
            <span
              style={{
                padding: '10px 15px',
                borderRadius: 999,
                border: '1px solid #46c2ff55',
                background: '#46c2ff1a',
                color: '#9fd9ff',
                font: "700 13px 'Space Grotesk'",
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: UC.blue }} />
              Mix
            </span>
          </div>

          {/* Difficulty */}
          <div style={{ ...card, padding: '16px 16px 18px', display: 'flex', flexDirection: 'column', gap: 13 }}>
            <span style={{ font: "600 13px 'Space Grotesk'", color: UC.ink3 }}>Difficulty</span>
            <div style={{ display: 'flex', gap: 8 }}>
              {DIFFS.map((d) => (
                <button key={d.id} style={chipStyle(config.difficulty.includes(d.id))} onClick={() => toggleDifficulty(d.id)}>
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div style={{ padding: '2px 16px', borderRadius: 16, border: `1px solid ${UC.border}`, background: UC.card }}>
            {TOGGLES.map((t) => {
              const on = toggleValue(t.key);
              return (
                <button
                  key={t.key}
                  onClick={() => toggle(t.key)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 16,
                    width: '100%',
                    background: 'transparent',
                    border: 0,
                    borderTop: `1px solid ${UC.border}`,
                    padding: '16px 0',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ font: "600 15px 'Space Grotesk'", color: UC.ink }}>{t.label}</span>
                    <span style={{ font: "400 12px 'Space Grotesk'", color: UC.muted }}>{t.desc}</span>
                  </span>
                  <Switch on={on} />
                </button>
              );
            })}
          </div>
        </div>

        <PrimaryButton
          onClick={() => {
            feedback('select');
            navigate('play');
            useGame.setState({ phase: 'lobby' });
          }}
          trailing={<ArrowRight />}
          style={{ marginTop: 18 }}
        >
          Add Players
        </PrimaryButton>
      </section>

      {modeSheet && (
        <ModeSheet
          activeId={config.modeId}
          onClose={() => setModeSheet(false)}
          onPick={(id) => {
            feedback('select');
            setMode(id);
            setModeSheet(false);
          }}
        />
      )}
    </Screen>
  );
}

function ModeSheet({
  activeId,
  onClose,
  onPick,
}: {
  activeId: string;
  onClose: () => void;
  onPick: (id: (typeof GAME_MODES)[number]['id']) => void;
}) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(6,5,9,.72)',
        backdropFilter: 'blur(3px)',
        zIndex: 20,
        display: 'flex',
        alignItems: 'flex-end',
        animation: 'uc-popIn .2s ease both',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          background: UC.card2,
          borderTopLeftRadius: 26,
          borderTopRightRadius: 26,
          borderTop: `1px solid ${UC.border2}`,
          padding: '14px 20px max(env(safe-area-inset-bottom),22px)',
          animation: 'uc-screenIn .28s ease both',
        }}
      >
        <div style={{ width: 44, height: 5, borderRadius: 999, background: UC.borderDash, margin: '0 auto 16px' }} />
        <h3 style={{ margin: '0 0 4px', fontFamily: "'Anton'", fontSize: 26, textTransform: 'uppercase', color: UC.ink }}>
          Game Mode
        </h3>
        <p style={{ margin: '0 0 16px', font: "400 13px 'Space Grotesk'", color: UC.muted }}>How cruel do you want it?</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {GAME_MODES.map((m) => {
            const active = m.id === activeId;
            return (
              <button
                key={m.id}
                onClick={() => onPick(m.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 13,
                  padding: 14,
                  borderRadius: 16,
                  border: `1px solid ${active ? UC.brand : UC.border}`,
                  background: active ? '#f5402e14' : UC.card3,
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                <span
                  style={{
                    flex: '0 0 auto',
                    width: 46,
                    height: 46,
                    borderRadius: 13,
                    display: 'grid',
                    placeItems: 'center',
                    color: UC.brand,
                    background: '#f5402e1a',
                    border: '1px solid #f5402e44',
                    fontFamily: "'Anton'",
                    fontSize: 22,
                  }}
                >
                  {m.name[0]}
                </span>
                <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'left' }}>
                  <span style={{ font: "700 16px 'Space Grotesk'", color: UC.ink }}>{m.name}</span>
                  <span style={{ font: "400 12px 'Space Grotesk'", color: UC.ink3, lineHeight: 1.35 }}>{m.description}</span>
                </span>
                {active && (
                  <span style={{ flex: '0 0 auto', width: 24, height: 24, borderRadius: '50%', background: UC.brand, display: 'grid', placeItems: 'center' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                      <path d="M5 12l5 5 9-11" />
                    </svg>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
