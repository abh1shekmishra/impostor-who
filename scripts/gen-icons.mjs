// One-off: rasterize the brand mark into PWA icons.
// Run with: node scripts/gen-icons.mjs
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(root, 'public', 'icons');
mkdirSync(out, { recursive: true });

const GRAD_A = '#8184FF';
const GRAD_B = '#A78BFA';
const BG = '#0B0B0F';

function mark({ size, rounded = true, padding = 0, bg = null }) {
  const r = rounded ? size * 0.28 : 0;
  const inner = size - padding * 2;
  const ox = padding;
  const oy = padding;
  // Logo mark drawn on a 64-grid, scaled into the inner box.
  const s = inner / 64;
  const g = (n) => (n * s + ox).toFixed(2);
  const gy = (n) => (n * s + oy).toFixed(2);
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${GRAD_A}"/>
      <stop offset="100%" stop-color="${GRAD_B}"/>
    </linearGradient>
  </defs>
  ${bg ? `<rect width="${size}" height="${size}" fill="${bg}"/>` : ''}
  <rect x="${ox}" y="${oy}" width="${inner}" height="${inner}" rx="${(r).toFixed(2)}" fill="url(#g)"/>
  <path d="M${g(14)} ${gy(34)}c${(4 * s).toFixed(2)} ${(-7 * s).toFixed(2)} ${(11 * s).toFixed(2)} ${(-11 * s).toFixed(2)} ${(18 * s).toFixed(2)} ${(-11 * s).toFixed(2)}s${(14 * s).toFixed(2)} ${(4 * s).toFixed(2)} ${(18 * s).toFixed(2)} ${(11 * s).toFixed(2)}c${(-4 * s).toFixed(2)} ${(7 * s).toFixed(2)} ${(-11 * s).toFixed(2)} ${(11 * s).toFixed(2)} ${(-18 * s).toFixed(2)} ${(11 * s).toFixed(2)}s${(-14 * s).toFixed(2)} ${(-4 * s).toFixed(2)} ${(-18 * s).toFixed(2)} ${(-11 * s).toFixed(2)}z" fill="${BG}" fill-opacity="0.16"/>
  <circle cx="${g(32)}" cy="${gy(34)}" r="${(8.5 * s).toFixed(2)}" fill="${BG}"/>
  <circle cx="${g(32)}" cy="${gy(34)}" r="${(4 * s).toFixed(2)}" fill="url(#g)"/>
  <circle cx="${g(34.5)}" cy="${gy(31.5)}" r="${(1.4 * s).toFixed(2)}" fill="${BG}"/>
</svg>`;
}

async function render(svg, file) {
  await sharp(Buffer.from(svg)).png().toFile(resolve(out, file));
  console.log('wrote', file);
}

await render(mark({ size: 192 }), 'icon-192.png');
await render(mark({ size: 512 }), 'icon-512.png');
// Maskable: extra padding so the mark stays inside the safe zone, solid bg.
await render(mark({ size: 512, padding: 80, bg: BG }), 'icon-maskable-512.png');
await render(mark({ size: 180 }), '../apple-touch-icon.png');
console.log('done');
