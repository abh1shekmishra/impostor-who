import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useThemeEffect } from '@/hooks';
import { page } from '@/lib/analytics';
import { useGame, type Route } from '@/store/gameStore';
import {
  CreateRoomScreen,
  GlyphScreen,
  HomeScreen,
  HowToScreen,
  LibraryScreen,
  PacksScreen,
  PeopleScreen,
  PlayScreen,
  SettingsScreen,
  StatsScreen,
} from '@/screens';

/**
 * Root shell. A single phone-width frame hosts a route-keyed AnimatePresence so
 * top-level navigation cross-fades. The in-match flow lives entirely under the
 * `play` route, which runs its own phase machine.
 */
export default function App() {
  useThemeEffect();
  const route = useGame((s) => s.route);

  useEffect(() => {
    page(route);
  }, [route]);

  // The library is a full-width landing that uses the whole screen on desktop;
  // every game runs inside the centered phone canvas.
  const fullBleed = route === 'library';

  return (
    <div className={fullBleed ? 'landing-shell' : 'app-frame'}>
      <AnimatePresence mode="wait" initial={false}>
        <RouteView key={route} route={route} />
      </AnimatePresence>
    </div>
  );
}

function RouteView({ route }: { route: Route }) {
  switch (route) {
    case 'library':
      return <LibraryScreen />;
    case 'glyph':
      return <GlyphScreen />;
    case 'home':
      return <HomeScreen />;
    case 'create':
      return <CreateRoomScreen />;
    case 'play':
      return <PlayScreen />;
    case 'settings':
      return <SettingsScreen />;
    case 'stats':
      return <StatsScreen />;
    case 'packs':
      return <PacksScreen />;
    case 'people':
      return <PeopleScreen />;
    case 'how-to':
      return <HowToScreen />;
    default:
      return <LibraryScreen />;
  }
}
