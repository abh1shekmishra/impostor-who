import { useCallback, useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  size: number;
  color: string;
  life: number;
}

const COLORS = ['#8184FF', '#A78BFA', '#34C78E', '#F5B84A', '#FF6370', '#63B3FF'];

/**
 * Lightweight canvas confetti — no dependency, no DOM thrash. Returns a `fire`
 * callback and a canvas ref to mount full-screen. Respects reduced motion by
 * doing nothing. Particles are GC'd when the burst settles.
 */
export function useConfetti() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<Particle[]>([]);
  const raf = useRef<number>(0);
  const reduced = useReducedMotion();

  const loop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);
    const list = particles.current;
    for (const p of list) {
      p.vy += 0.12; // gravity
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      p.life -= 1;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, Math.min(1, p.life / 60));
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    }
    particles.current = list.filter((p) => p.life > 0 && p.y < height + 40);
    if (particles.current.length > 0) {
      raf.current = requestAnimationFrame(loop);
    }
  }, []);

  const fire = useCallback(
    (originX?: number, originY?: number) => {
      if (reduced) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = canvas.clientWidth * window.devicePixelRatio;
      canvas.height = canvas.clientHeight * window.devicePixelRatio;
      const cx = (originX ?? canvas.clientWidth / 2) * window.devicePixelRatio;
      const cy = (originY ?? canvas.clientHeight / 3) * window.devicePixelRatio;
      const count = 90;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random();
        const speed = 4 + Math.random() * 7;
        particles.current.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 3,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.3,
          size: (6 + Math.random() * 8) * window.devicePixelRatio,
          color: COLORS[Math.floor(Math.random() * COLORS.length)]!,
          life: 60 + Math.random() * 40,
        });
      }
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(loop);
    },
    [loop, reduced]
  );

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return { canvasRef, fire };
}
