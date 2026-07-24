import { Screen } from '@/components/Screen';
import { BackButton } from '@/components/uc';
import { useGame } from '@/store/gameStore';
import { feedback } from '@/lib/feedback';

/**
 * GLYPH — the emoji-rebus daily puzzle. The game itself is a self-contained page
 * served from /public/glyph.html; this screen frames it with a slim app bar so
 * players can return to the library. Ported to a native React screen later.
 */
export function GlyphScreen() {
  const navigate = useGame((s) => s.navigate);

  return (
    <Screen enter="up" className="min-h-0">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, background: '#120e1d' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: 'max(env(safe-area-inset-top),10px) 14px 10px',
            background: '#0e0b17',
            borderBottom: '1px solid #241d3c',
            flex: '0 0 auto',
          }}
        >
          <BackButton
            onClick={() => {
              feedback('tap');
              navigate('library');
            }}
          />
          <span
            style={{
              font: "700 13px 'Space Mono'",
              letterSpacing: '.18em',
              color: '#a89cc4',
              textTransform: 'uppercase',
            }}
          >
            GLYPH
          </span>
        </div>
        <iframe
          src="/glyph.html"
          title="GLYPH — the emoji you decode"
          style={{ flex: 1, width: '100%', border: 0, minHeight: 0, display: 'block' }}
        />
      </div>
    </Screen>
  );
}
