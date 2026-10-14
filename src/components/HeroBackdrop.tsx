import { useEffect, useRef, useState } from 'react';
import { createFluidGlass } from '../lib/fluidGlass';
import s from './HeroBackdrop.module.css';

/** Ink colour of the pointer trail (matches the reference hero). */
const TRAIL_INK = '#ff5f03';

/**
 * Whether to skip the WebGL backdrop and keep the static CSS fallback. True for
 * reduced-motion, very low-end devices, and software/no-GPU renderers (Lighthouse,
 * headless, VMs) where a per-frame fluid simulation is far too expensive.
 */
function prefersStaticBackdrop(): boolean {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
    const mem = (navigator as { deviceMemory?: number }).deviceMemory;
    if (typeof mem === 'number' && mem <= 2) return true;
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) return true;
    const probe = document.createElement('canvas');
    const gl = probe.getContext('webgl') ?? probe.getContext('experimental-webgl');
    if (!gl) return true;
    const dbg = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
    const renderer = dbg
      ? String((gl as WebGLRenderingContext).getParameter(dbg.UNMASKED_RENDERER_WEBGL))
      : '';
    if (/swiftshader|llvmpipe|software|basic render|microsoft basic|mesa offscreen/i.test(renderer)) return true;
  } catch {
    return true;
  }
  return false;
}

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
    // Low-end / software-rendered contexts keep the static CSS fallback (no WebGL loop).
    if (prefersStaticBackdrop()) return;
    const engine = createFluidGlass(canvas, {
      ink: TRAIL_INK,
      base: '#ffffff',
      swirl: '#eeeeee',
      angle: 31,
      frequency: 8,
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
