import { AnimatePresence } from 'framer-motion';
import { useThemeEffect } from '@/hooks';
import { useGame, type Route } from '@/store/gameStore';
import {
  CreateRoomScreen,
  HomeScreen,
  HowToScreen,
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

  return (
    <div className="app-frame">
      <AnimatePresence mode="wait" initial={false}>
        <RouteView key={route} route={route} />
      </AnimatePresence>
    </div>
  );
}

function RouteView({ route }: { route: Route }) {
  switch (route) {
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
      return <HomeScreen />;
  }
}
