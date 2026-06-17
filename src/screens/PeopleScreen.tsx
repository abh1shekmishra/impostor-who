import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Screen } from '@/components/Screen';
import { AppBar, Avatar, Button, Card, IconButton, Icon } from '@/components/ui';
import { useGame } from '@/store/gameStore';
import { useRoster } from '@/store/rosterStore';
import { feedback } from '@/lib/feedback';

/**
 * "My People" — manage the saved roster of friends/family you play with often.
 * Add once here and they're one tap away every time you set up a room.
 */
export function PeopleScreen() {
  const navigate = useGame((s) => s.navigate);
  const people = useRoster((s) => s.people);
  const add = useRoster((s) => s.add);
  const remove = useRoster((s) => s.remove);
  const [draft, setDraft] = useState('');

  const commit = () => {
    const name = draft.trim();
    if (!name) return;
    feedback('select');
    add(name);
    setDraft('');
  };

  return (
    <Screen className="pb-safe">
      <AppBar title="My People" onBack={() => navigate('home')} subtitle="Your regular squad" />
      <div className="px-5 py-5 space-y-5 overflow-y-auto no-scrollbar">
        <Card padded={false} className="p-3">
          <div className="flex items-center gap-2">
            <Avatar name={draft || '+'} accent={people.length} size="sm" />
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') commit();
              }}
              placeholder="Add a name…"
              aria-label="New person name"
              maxLength={16}
              autoComplete="off"
              autoCapitalize="words"
              spellCheck={false}
              className="flex-1 min-w-0 bg-transparent outline-none text-[16px] font-medium placeholder:text-ink-3"
            />
            <Button size="sm" cue="pop" disabled={!draft.trim()} onClick={commit} leadingIcon={<Icon.Plus size={16} />}>
              Add
            </Button>
          </div>
        </Card>

        {people.length === 0 ? (
          <div className="flex flex-col items-center text-center py-12">
            <span className="text-5xl mb-4">👋</span>
            <h2 className="text-lg font-semibold">No one saved yet</h2>
            <p className="text-ink-3 mt-2 max-w-[18rem] text-balance">
              Add the people you play with most. Next time you start a game, just
              tap their names — no retyping.
            </p>
          </div>
        ) : (
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-wider text-ink-3 mb-2 px-1">
              {people.length} {people.length === 1 ? 'person' : 'people'}
            </p>
            <Card padded={false} className="px-3">
              <AnimatePresence initial={false}>
                {people.map((p, i) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                    className="flex items-center gap-3 py-2.5 border-b last:border-0 hairline"
                  >
                    <Avatar name={p.name} accent={p.accent} size="sm" />
                    <span className="flex-1 font-medium text-[15px] truncate">{p.name}</span>
                    <IconButton
                      label={`Remove ${p.name}`}
                      variant="plain"
                      onClick={() => {
                        feedback('tap');
                        remove(p.id);
                      }}
                    >
                      <Icon.Close size={18} />
                    </IconButton>
                    <span className="sr-only">{i + 1}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </Card>
          </div>
        )}

        <p className="text-[12px] text-ink-3 px-1 leading-relaxed">
          Saved on this device only. Used to quickly fill players when you create a room.
        </p>
      </div>
    </Screen>
  );
}
