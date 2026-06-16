import { Screen } from '@/components/Screen';
import { AppBar, Button, Card } from '@/components/ui';
import { useGame } from '@/store/gameStore';

const STEPS = [
  { emoji: '👥', title: 'Gather round', body: 'Everyone sits together with one phone. Add names and hit start.' },
  { emoji: '🤫', title: 'Pass & reveal', body: 'Each player privately taps to see their secret word. One of you sees “You are the impostor” instead.' },
  { emoji: '💬', title: 'Drop a clue', body: 'Going in turn, say one clue about the word — close enough to prove you know it, vague enough not to give it away.' },
  { emoji: '🗳️', title: 'Discuss & vote', body: 'Argue, suspect, defend. Then everyone votes for who they think is faking it.' },
  { emoji: '🎯', title: 'The twist', body: 'If the impostor survives the vote, they get one shot to guess the secret word. Guess right and they steal the win.' },
];

export function HowToScreen() {
  const navigate = useGame((s) => s.navigate);
  return (
    <Screen className="pb-safe">
      <AppBar title="How to play" onBack={() => navigate('home')} />
      <div className="px-5 py-5 space-y-3 overflow-y-auto no-scrollbar">
        {STEPS.map((step, i) => (
          <Card key={step.title} className="flex gap-4">
            <div className="shrink-0 h-12 w-12 grid place-items-center rounded-2xl bg-surface-2 text-2xl relative">
              {step.emoji}
              <span className="absolute -top-1.5 -left-1.5 h-5 w-5 grid place-items-center rounded-full bg-brand text-brand-ink text-[11px] font-bold">
                {i + 1}
              </span>
            </div>
            <div>
              <h3 className="text-[16px] font-semibold">{step.title}</h3>
              <p className="text-[14px] text-ink-2 mt-1 leading-relaxed">{step.body}</p>
            </div>
          </Card>
        ))}
        <div className="pt-2">
          <Button size="lg" fullWidth cue="pop" onClick={() => navigate('create')}>
            Got it — let’s play
          </Button>
        </div>
      </div>
    </Screen>
  );
}
