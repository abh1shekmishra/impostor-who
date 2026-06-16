import { useState } from 'react';
import { Screen } from '@/components/Screen';
import {
  AppBar,
  Card,
  Divider,
  ListRow,
  SegmentedControl,
  Sheet,
  Button,
  Toggle,
  Icon,
} from '@/components/ui';
import { useGame } from '@/store/gameStore';
import { useSettings } from '@/store/settingsStore';
import { useStats } from '@/store/statsStore';
import type { LanguagePreference, ThemePreference } from '@/types';
import { feedback } from '@/lib/feedback';

export function SettingsScreen() {
  const navigate = useGame((s) => s.navigate);
  const s = useSettings();
  const resetStats = useStats((st) => st.reset);
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <Screen className="pb-safe">
      <AppBar title="Settings" onBack={() => navigate('home')} />
      <div className="px-5 py-5 space-y-5 overflow-y-auto no-scrollbar">
        <section>
          <SectionLabel>Appearance</SectionLabel>
          <Card>
            <p className="text-[13px] text-ink-3 mb-3">Theme</p>
            <SegmentedControl<ThemePreference>
              ariaLabel="Theme"
              value={s.theme}
              onChange={(v) => s.set('theme', v)}
              segments={[
                { value: 'light', label: 'Light', icon: <Icon.Sun size={16} /> },
                { value: 'dark', label: 'Dark', icon: <Icon.Moon size={16} /> },
                { value: 'system', label: 'Auto' },
              ]}
            />
          </Card>
        </section>

        <section>
          <SectionLabel>Feel</SectionLabel>
          <Card padded={false} className="px-5">
            <Toggle
              id="set-sound"
              label="Sound"
              description="Tiny, pleasant cues"
              checked={s.sound}
              onChange={() => s.toggle('sound')}
            />
            <Divider />
            <Toggle
              id="set-anim"
              label="Animations"
              description="Card flips and transitions"
              checked={s.animations}
              onChange={() => s.toggle('animations')}
            />
            <Divider />
            <Toggle
              id="set-haptics"
              label="Haptics"
              description="Subtle vibration feedback"
              checked={s.haptics}
              onChange={() => s.toggle('haptics')}
            />
            <Divider />
            <Toggle
              id="set-hold"
              label="Hold to reveal"
              description="Press and hold your role card for privacy"
              checked={s.holdToReveal}
              onChange={() => s.toggle('holdToReveal')}
            />
          </Card>
        </section>

        <section>
          <SectionLabel>Language</SectionLabel>
          <Card>
            <SegmentedControl<LanguagePreference>
              ariaLabel="Language"
              value={s.language}
              onChange={(v) => s.set('language', v)}
              segments={[
                { value: 'en', label: 'English' },
                { value: 'hinglish', label: 'Hinglish' },
                { value: 'hi', label: 'हिंदी' },
              ]}
            />
            <p className="text-[12px] text-ink-3 mt-3">
              Affects interface labels. Word packs already mix English & Hinglish
              based on your category and “English only” choices.
            </p>
          </Card>
        </section>

        <section>
          <SectionLabel>Data</SectionLabel>
          <Card padded={false} className="px-5">
            <ListRow
              title="Reset statistics"
              subtitle="Clears your local play history"
              leading={<Icon.Chart size={20} />}
              trailing={<Icon.ChevronRight size={18} className="text-ink-3" />}
              onClick={() => {
                feedback('tap');
                setConfirmReset(true);
              }}
            />
          </Card>
          <p className="text-[12px] text-ink-3 mt-3 px-1 leading-relaxed">
            Undercover runs entirely on your device. No account, no login, no
            data leaves your phone. Works fully offline once installed.
          </p>
        </section>

        <p className="text-center text-[12px] text-ink-3 pt-2">Undercover · v1.0.0</p>
      </div>

      <Sheet open={confirmReset} onClose={() => setConfirmReset(false)} title="Reset statistics?">
        <p className="text-ink-2 text-sm mb-5">
          This permanently clears your games played, win rates and records on this
          device. This can’t be undone.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary" onClick={() => setConfirmReset(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            cue="lose"
            onClick={() => {
              resetStats();
              setConfirmReset(false);
            }}
          >
            Reset
          </Button>
        </div>
      </Sheet>
    </Screen>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[12px] font-semibold uppercase tracking-wider text-ink-3 mb-2 px-1">
      {children}
    </h2>
  );
}
