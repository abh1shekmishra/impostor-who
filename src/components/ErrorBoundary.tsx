import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button, LogoMark } from './ui';

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
}

/**
 * Last-line safety net. If any screen throws, we show a calm recovery card and
 * a button to return home rather than a blank white screen. Game progress lives
 * in persisted stores, so recovery is graceful.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Surface in dev tools; in production this is where telemetry would hook in.
    console.error('Undercover crashed:', error, info.componentStack);
  }

  private recover = () => {
    try {
      // Reset only the volatile in-match state; keep settings & stats.
      const raw = localStorage.getItem('uc.game');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.state) {
          parsed.state.route = 'home';
          parsed.state.phase = 'setup';
          parsed.state.round = null;
          localStorage.setItem('uc.game', JSON.stringify(parsed));
        }
      }
    } catch {
      /* ignore */
    }
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div className="app-frame items-center justify-center px-6 text-center gap-5">
        <LogoMark size={72} />
        <div>
          <h1 className="font-display text-2xl font-semibold">Something tripped up</h1>
          <p className="text-ink-3 mt-2 max-w-[18rem]">
            The round hit an unexpected snag. Your settings and stats are safe.
          </p>
        </div>
        <Button size="lg" onClick={this.recover}>
          Back to home
        </Button>
      </div>
    );
  }
}
