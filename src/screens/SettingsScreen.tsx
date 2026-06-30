import { useEffect, useState } from 'react';
import { Screen } from '@/components/Screen';
import { UC, TopBar, Switch } from '@/components/uc';
import { useGame } from '@/store/gameStore';
import { useSettings } from '@/store/settingsStore';
import { useStats } from '@/store/statsStore';
import { useRoster } from '@/store/rosterStore';
import { feedback } from '@/lib/feedback';

const TOGGLES = [
  { key: 'sound', label: 'Sound', desc: 'Cues, stings and the timer beep' },
  { key: 'animations', label: 'Animations', desc: 'Motion and screen transitions' },
  { key: 'haptics', label: 'Haptics', desc: 'A buzz on the big moments' },
  { key: 'holdToReveal', label: 'Hold to reveal', desc: 'Press and hold to expose your role' },
] as const;

const sectionLabel = {
  font: "700 11px 'Space Mono'",
  letterSpacing: '.16em',
  textTransform: 'uppercase',
  color: UC.muted2,
} as const;

export function SettingsScreen() {
  const navigate = useGame((s) => s.navigate);
  const settings = useSettings();
  const resetStats = useStats((s) => s.reset);
  const clearRoster = useRoster((s) => s.clear);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!armed) return;
    const t = setTimeout(() => setArmed(false), 3000);
    return () => clearTimeout(t);
  }, [armed]);

  const onReset = () => {
    feedback('tap');
    if (!armed) {
      setArmed(true);
      return;
    }
    resetStats();
    clearRoster();
    setArmed(false);
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
        <TopBar title="Settings" onBack={() => navigate('home')} />

        <div className="no-scrollbar" style={{ display: 'flex', flexDirection: 'column', gap: 18, flex: 1, overflowY: 'auto', minHeight: 0 }}>
          {/* Appearance */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            <span style={sectionLabel}>Appearance</span>
            <div
              style={{
                padding: 16,
                borderRadius: 16,
                border: `1px solid ${UC.border}`,
                background: UC.card,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ font: "600 15px 'Space Grotesk'", color: UC.ink }}>Theme</span>
                <span style={{ font: "400 12px 'Space Grotesk'", color: UC.muted }}>Tuned for dark rooms</span>
              </div>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  padding: '9px 14px',
                  borderRadius: 999,
                  border: `1px solid ${UC.border2}`,
                  color: '#c9c6d4',
                  font: "600 13px 'Space Grotesk'",
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#0b0a0f', border: '1px solid #555' }} />
                Cinema dark
              </span>
            </div>
          </div>

          {/* Feel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            <span style={sectionLabel}>Feel</span>
            <div style={{ padding: '2px 16px', borderRadius: 16, border: `1px solid ${UC.border}`, background: UC.card }}>
              {TOGGLES.map((t) => (
                <button
                  key={t.key}
                  onClick={() => {
                    feedback('tap');
                    settings.toggle(t.key);
                  }}
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
                  <Switch on={settings[t.key]} />
                </button>
              ))}
            </div>
          </div>

          {/* Data */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            <span style={sectionLabel}>Data</span>
            <p style={{ margin: 0, font: "400 12px 'Space Grotesk'", color: UC.muted2, lineHeight: 1.5 }}>
              Everything stays on this phone. No accounts, no tracking, no internet required.
            </p>
            <button
              onClick={onReset}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: 16,
                borderRadius: 16,
                border: '1px solid #3a2526',
                background: '#1a0e0f',
                color: '#f3a59c',
                font: "600 15px 'Space Grotesk'",
                cursor: 'pointer',
              }}
            >
              {armed ? 'Tap again to confirm reset' : 'Reset stats & saved players'}
            </button>
          </div>
        </div>

        <span style={{ textAlign: 'center', font: "500 11px 'Space Mono'", color: '#4f4d5a', marginTop: 14 }}>
          Undercover · v1.0 · made for the room
        </span>
      </section>
    </Screen>
  );
}
