import { useEffect, useRef, useState } from 'react';
import { createFluidGlass } from '../lib/fluidGlass';
import s from './HeroBackdrop.module.css';

/** Ink colour of the pointer trail (matches the reference hero). */
const TRAIL_INK = '#ff5f03';

/**
 * Hero background: a WebGL fluted-glass surface whose ink trail follows the
 * pointer. The CSS layers underneath are the static fallback, shown before the
 * canvas is ready and whenever WebGL is unavailable.
 */
export function HeroBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const engine = createFluidGlass(canvas, {
      ink: TRAIL_INK,
      base: '#ffffff',
      swirl: '#eeeeee',
      angle: 31,
      frequency: 8,
      still,
      onReady: () => setReady(true),
    });
    return () => engine?.destroy();
  }, []);

  return (
    <div className={s.backdrop} aria-hidden="true">
      <div className={s.streaks} />
      <div className={s.prism} />
      <div className={s.veil} />
      <canvas ref={canvasRef} className={s.canvas} data-ready={ready} />
    </div>
  );
}
