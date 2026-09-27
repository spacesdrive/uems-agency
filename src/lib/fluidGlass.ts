/**
 * Fluted-glass hero background with a pointer-driven ink trail.
 *
 * Three WebGL passes, written for this site:
 *  1. Trail  – low-resolution ping-pong buffer. Pointer movement paints ink
 *              (strength follows pointer speed) plus a wider, slower "shadow".
 *              Both drift with the motion, diffuse and decay.
 *  2. Scene  – a soft two-tone swirl, darkened by the shadow and tinted by the
 *              ink colour ramp, rendered at reduced resolution so everything
 *              seen through the glass is naturally blurred.
 *  3. Glass  – rotated rounded flutes. Each flute magnifies its centre and
 *              compresses its edges (cylindrical refraction) with per-channel
 *              dispersion, a bright rim and gently wavering edges, then grain.
 */

export interface FluidGlassOptions {
  /** Ink colour painted by the pointer. */
  ink: string;
  /** Background swirl colours. */
  base: string;
  swirl: string;
  /** Flute tilt from vertical, in degrees. */
  angle?: number;
  /** Flutes per viewport height. */
  frequency?: number;
  /** Render the first frame only (reduced motion). */
  still?: boolean;
  /** Called once the first frame has been drawn. */
  onReady?: () => void;
}

export interface FluidGlass {
  destroy: () => void;
}

const vertexSource = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

// R = ink, G/B = motion direction (0.5-centred), A = shadow.
const trailSource = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uPrev;
uniform vec2 uTexel;
uniform float uAspect;
uniform vec2 uFrom;
uniform vec2 uTo;
uniform float uStrength;
uniform float uRadius;
uniform float uDecay;
uniform float uShadowDecay;

float segmentDistance(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-6), 0.0, 1.0);
  return length(pa - ba * h);
}

vec4 blur4(vec2 uv, float spread) {
  return (
    texture2D(uPrev, uv + vec2(uTexel.x, 0.0) * spread) +
    texture2D(uPrev, uv - vec2(uTexel.x, 0.0) * spread) +
    texture2D(uPrev, uv + vec2(0.0, uTexel.y) * spread) +
    texture2D(uPrev, uv - vec2(0.0, uTexel.y) * spread)
  ) * 0.25;
}

void main() {
  vec4 center = texture2D(uPrev, vUv);
  vec2 flow = (center.gb - 0.5) * 2.0;

  // Momentum: ink keeps travelling a little in the direction it was pushed.
  vec2 uv = vUv - flow * uTexel * 1.6;
  vec4 moved = texture2D(uPrev, uv);
  vec4 near = blur4(uv, 1.0);
  vec4 far = blur4(uv, 2.0);

  float ink = mix(moved.r, near.r, 0.3);
  float shadow = mix(moved.a, far.a, 0.55);
  vec2 dir = mix(moved.gb, near.gb, 0.3);

  ink = max(ink * uDecay - 0.0025, 0.0);
  shadow = max(shadow * uShadowDecay - 0.0015, 0.0);
  dir = mix(vec2(0.5), dir, 0.97);

  vec2 scale = vec2(uAspect, 1.0);
  float d = segmentDistance(vUv * scale, uFrom * scale, uTo * scale);
  float brush = exp(-(d * d) / (uRadius * uRadius)) * uStrength;
  float wide = exp(-(d * d) / (uRadius * uRadius * 4.0)) * uStrength;
  vec2 motion = (uTo - uFrom) * scale;
  vec2 motionDir = length(motion) > 1e-5 ? normalize(motion) : vec2(0.0);

  ink = min(ink + brush * 0.55, 1.0);
  shadow = min(shadow + wide * 0.35, 1.0);
  dir = mix(dir, motionDir * 0.5 + 0.5, clamp(brush * 2.0, 0.0, 1.0));
  gl_FragColor = vec4(ink, dir, shadow);
}`;

const sceneSource = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTrail;
uniform float uAspect;
uniform float uTime;
uniform vec3 uInk;
uniform vec3 uBase;
uniform vec3 uSwirl;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

void main() {
  vec2 p = vec2(vUv.x * uAspect, vUv.y) * 1.35;
  float t = uTime * 0.04;

  // Large, low-contrast swirl: two layers of domain-warped noise.
  vec2 q = vec2(noise(p + vec2(0.0, t)), noise(p + vec2(4.7, 1.9) - t));
  vec2 r = vec2(noise(p + q * 2.2 + vec2(1.7, 9.2) + t * 0.7), noise(p + q * 2.2 + vec2(8.3, 2.8) - t * 0.5));
  float n = noise(p + r * 1.8);
  // Mostly the soft grey tone, opening into brighter white areas.
  vec3 color = mix(uBase, uSwirl, smoothstep(0.2, 0.62, n));
  color *= 1.0 - 0.03 * smoothstep(0.6, 0.95, n);

  vec4 trail = texture2D(uTrail, vUv);
  // Soft shadow the moving ink casts on the surface around it.
  color *= 1.0 - 0.12 * smoothstep(0.0, 0.6, trail.a);

  // Ink ramp: pink fringe -> salmon -> saturated core, all derived from uInk.
  vec3 core = mix(uInk, vec3(0.78, 0.62, 0.55), 0.35);
  vec3 salmon = mix(core, vec3(0.9, 0.75, 0.72), 0.55);
  vec3 blush = mix(core, vec3(0.93, 0.84, 0.84), 0.75);
  float ink = trail.r;
  color = mix(color, blush, smoothstep(0.01, 0.35, ink) * 0.8);
  color = mix(color, salmon, smoothstep(0.18, 0.7, ink) * 0.9);
  color = mix(color, core, smoothstep(0.5, 1.05, ink) * 0.88);

  gl_FragColor = vec4(color, 1.0);
}`;

const glassSource = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uScene;
uniform vec2 uSceneTexel;
uniform vec2 uResolution;
uniform float uTime;
uniform float uAngle;
uniform float uFrequency;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

// Read the low-resolution scene smeared along the flute axis, the way ribbed
// glass stretches whatever sits behind it into soft streaks.
vec3 sceneAt(vec2 uv, vec2 alongStep) {
  return
    texture2D(uScene, uv - alongStep * 2.0).rgb * 0.12 +
    texture2D(uScene, uv - alongStep).rgb * 0.22 +
    texture2D(uScene, uv).rgb * 0.32 +
    texture2D(uScene, uv + alongStep).rgb * 0.22 +
    texture2D(uScene, uv + alongStep * 2.0).rgb * 0.12;
}

// Thin-film style spectrum for the iridescent edge lines (0..1 across the band).
vec3 spectrum(float t) {
  return clamp(vec3(
    1.6 - abs(t - 0.78) * 4.2,
    1.35 - abs(t - 0.52) * 3.6,
    1.5 - abs(t - 0.2) * 4.4
  ), 0.0, 1.0);
}

// Shade one flute position x (-1..1) for the pixel at uv.
vec3 flute(float x, vec2 uv, vec2 acrossDir, vec2 alongStep, float width) {
  // Cylindrical refraction: magnified centre, strongly compressed edges.
  float bend = x / sqrt(max(1.0 - 0.985 * x * x, 0.012));
  vec2 offset = acrossDir * (-bend * width * 0.72);

  // Dispersion grows towards the edges, splitting colour into streak lines.
  float spread = 0.1 + 0.14 * smoothstep(0.55, 1.0, abs(x));
  vec3 color;
  color.r = sceneAt(uv + offset * (1.0 + spread), alongStep).r;
  color.g = sceneAt(uv + offset, alongStep).g;
  color.b = sceneAt(uv + offset * (1.0 - spread), alongStep).b;

  // Compressed edges concentrate colour: lift saturation there so the
  // refracted ink reads as vivid streaks.
  float grey = dot(color, vec3(0.299, 0.587, 0.114));
  color = mix(vec3(grey), color, 1.0 + 0.45 * smoothstep(0.6, 0.95, abs(x)));

  // Soft body shading and a narrow rim on the leading edge.
  color *= 1.0 - 0.03 * smoothstep(-0.5, 0.5, x);
  float rim = pow(smoothstep(0.74, 1.0, x), 2.4);
  color = mix(color, vec3(1.0), rim * 0.34);

  // Iridescent edge lines: warm on the rim side, cool just past the edge.
  float band = smoothstep(0.82, 0.9, x) * (1.0 - smoothstep(0.975, 1.0, x));
  color = mix(color, color * 0.6 + spectrum((x - 0.82) / 0.18) * 0.5, band * 0.13);
  float cool = smoothstep(-0.9, -0.97, x) * (1.0 - smoothstep(-0.985, -1.0, x));
  color = mix(color, vec3(0.88, 0.94, 1.0), cool * 0.14);
  color = mix(color, vec3(1.0), smoothstep(-0.975, -1.0, x) * 0.35);
  return color;
}

void main() {
  float aspect = uResolution.x / uResolution.y;
  vec2 p = vec2((vUv.x - 0.5) * aspect, vUv.y - 0.5);

  float c = cos(uAngle);
  float s = sin(uAngle);
  float across = p.x * c - p.y * s;
  float along = p.x * s + p.y * c;
  vec2 acrossDir = vec2(c, -s) / vec2(aspect, 1.0);
  vec2 alongStep = vec2(s, c) / vec2(aspect, 1.0) * 0.026;

  // Gently wavering flute edges.
  across += 0.0022 * sin(along * 4.1 + uTime * 0.25) + 0.0012 * sin(along * 9.0 - uTime * 0.18);

  float width = 1.0 / uFrequency;
  float cell = fract(across * uFrequency + uTime * 0.018);
  vec3 color = flute(cell * 2.0 - 1.0, vUv, acrossDir, alongStep, width);

  // Anti-alias the hard seam between neighbouring flutes.
  float aa = 1.6 * uFrequency / uResolution.y;
  if (cell > 1.0 - aa) {
    vec3 nextFlute = flute(-1.0, vUv, acrossDir, alongStep, width);
    color = mix(color, nextFlute, smoothstep(1.0 - aa, 1.0, cell) * 0.5);
  } else if (cell < aa) {
    vec3 prevFlute = flute(0.999, vUv, acrossDir, alongStep, width);
    color = mix(prevFlute, color, 0.5 + 0.5 * smoothstep(0.0, aa, cell));
  }

  float grain = hash(vUv * uResolution + fract(uTime * 7.0) * 61.0) - 0.5;
  color += grain * 0.012;

  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}`;

function hexToRgb(hex: string): [number, number, number] {
  const v = hex.replace('#', '');
  const n = parseInt(v.length === 3 ? v.replace(/./g, (ch) => ch + ch) : v, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function compile(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('createShader failed');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile error: ${log ?? ''}`);
  }
  return shader;
}

function program(gl: WebGLRenderingContext, fragment: string) {
  const prog = gl.createProgram();
  if (!prog) throw new Error('createProgram failed');
  gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, vertexSource));
  gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, fragment));
  gl.bindAttribLocation(prog, 0, 'aPos');
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) ?? 'link failed');
  const uniforms = new Map<string, WebGLUniformLocation | null>();
  return {
    prog,
    u(name: string) {
      if (!uniforms.has(name)) uniforms.set(name, gl.getUniformLocation(prog, name));
      return uniforms.get(name) ?? null;
    },
  };
}

interface Target {
  tex: WebGLTexture;
  fbo: WebGLFramebuffer;
  w: number;
  h: number;
}

function createTarget(gl: WebGLRenderingContext, w: number, h: number, neutralTrail: boolean): Target {
  const tex = gl.createTexture();
  const fbo = gl.createFramebuffer();
  if (!tex || !fbo) throw new Error('Render target allocation failed');
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  let data: Uint8Array | null = null;
  if (neutralTrail) {
    // No ink, zero motion (0.5-centred), no shadow.
    data = new Uint8Array(w * h * 4);
    for (let i = 0; i < data.length; i += 4) {
      data[i + 1] = 128;
      data[i + 2] = 128;
    }
  }
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
  return { tex, fbo, w, h };
}

function deleteTarget(gl: WebGLRenderingContext, t: Target | null) {
  if (!t) return;
  gl.deleteTexture(t.tex);
  gl.deleteFramebuffer(t.fbo);
}

/** Returns null when WebGL is unavailable so callers can keep their fallback. */
export function createFluidGlass(canvas: HTMLCanvasElement, options: FluidGlassOptions): FluidGlass | null {
  const gl = canvas.getContext('webgl', {
    antialias: false,
    depth: false,
    stencil: false,
    alpha: false,
    powerPreference: 'low-power',
  });
  if (!gl) return null;

  let trail: ReturnType<typeof program>;
  let scene: ReturnType<typeof program>;
  let glass: ReturnType<typeof program>;
  try {
    trail = program(gl, trailSource);
    scene = program(gl, sceneSource);
    glass = program(gl, glassSource);
  } catch {
    return null;
  }

  const quad = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quad);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  const ink = hexToRgb(options.ink);
  const base = hexToRgb(options.base);
  const swirl = hexToRgb(options.swirl);
  const angle = ((options.angle ?? 31) * Math.PI) / 180;
  const frequency = options.frequency ?? 8;

  let width = 0;
  let height = 0;
  let trails: [Target, Target] | null = null;
  let sceneTarget: Target | null = null;
  let current: 0 | 1 = 0;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    const w = Math.max(1, Math.round(rect.width * dpr));
    const h = Math.max(1, Math.round(rect.height * dpr));
    if (w === width && h === height) return;
    width = canvas.width = w;
    height = canvas.height = h;

    const tw = Math.max(48, Math.round(rect.width / 6));
    const th = Math.max(32, Math.round(rect.height / 6));
    if (!trails || trails[0].w !== tw || trails[0].h !== th) {
      trails?.forEach((t) => deleteTarget(gl, t));
      trails = [createTarget(gl, tw, th, true), createTarget(gl, tw, th, true)];
    }
    const sw = Math.max(64, Math.round(rect.width / 5));
    const sh = Math.max(40, Math.round(rect.height / 5));
    if (!sceneTarget || sceneTarget.w !== sw || sceneTarget.h !== sh) {
      deleteTarget(gl, sceneTarget);
      sceneTarget = createTarget(gl, sw, sh, false);
    }
  };

  // Pointer state in normalised canvas coordinates (origin bottom-left).
  const pointer = { x: -1, y: -1, px: -1, py: -1, inside: false, moved: false };
  const onMove = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1 - (e.clientY - rect.top) / rect.height;
    const inside = x >= 0 && x <= 1 && y >= 0 && y <= 1;
    if (inside && !pointer.inside) {
      pointer.px = x;
      pointer.py = y;
    }
    pointer.inside = inside;
    pointer.x = x;
    pointer.y = y;
    pointer.moved = true;
    wake();
  };

  let frame = 0;
  let running = false;
  let visible = true;
  let last = performance.now();
  const start = last;
  let ready = false;
  let energy = 0;

  const draw = (now: number) => {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (!trails || !sceneTarget) return;
    const aspect = width / height;
    const time = (now - start) / 1000;

    // 1. Trail.
    let strength = 0;
    let from: [number, number] = [pointer.x, pointer.y];
    if (pointer.moved && pointer.inside && pointer.px >= 0) {
      const dx = (pointer.x - pointer.px) * aspect;
      const dy = pointer.y - pointer.py;
      const speed = Math.hypot(dx, dy) / Math.max(dt, 1 / 120);
      strength = Math.min(speed * 0.22, 0.6);
      from = [pointer.px, pointer.py];
      energy = 1;
    }
    pointer.px = pointer.x;
    pointer.py = pointer.y;
    pointer.moved = false;

    const next: 0 | 1 = current === 0 ? 1 : 0;
    const src = trails[current];
    const dst = trails[next];
    gl.useProgram(trail.prog);
    gl.bindFramebuffer(gl.FRAMEBUFFER, dst.fbo);
    gl.viewport(0, 0, dst.w, dst.h);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, src.tex);
    gl.uniform1i(trail.u('uPrev'), 0);
    gl.uniform2f(trail.u('uTexel'), 1 / dst.w, 1 / dst.h);
    gl.uniform1f(trail.u('uAspect'), aspect);
    gl.uniform2f(trail.u('uFrom'), from[0], from[1]);
    gl.uniform2f(trail.u('uTo'), pointer.x, pointer.y);
    gl.uniform1f(trail.u('uStrength'), strength);
    gl.uniform1f(trail.u('uRadius'), 0.082);
    gl.uniform1f(trail.u('uDecay'), Math.pow(0.958, dt * 60));
    gl.uniform1f(trail.u('uShadowDecay'), Math.pow(0.97, dt * 60));
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    current = next;

    // 2. Scene (low resolution = natural blur behind the glass).
    gl.useProgram(scene.prog);
    gl.bindFramebuffer(gl.FRAMEBUFFER, sceneTarget.fbo);
    gl.viewport(0, 0, sceneTarget.w, sceneTarget.h);
    gl.bindTexture(gl.TEXTURE_2D, dst.tex);
    gl.uniform1i(scene.u('uTrail'), 0);
    gl.uniform1f(scene.u('uAspect'), aspect);
    gl.uniform1f(scene.u('uTime'), time);
    gl.uniform3f(scene.u('uInk'), ink[0], ink[1], ink[2]);
    gl.uniform3f(scene.u('uBase'), base[0], base[1], base[2]);
    gl.uniform3f(scene.u('uSwirl'), swirl[0], swirl[1], swirl[2]);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    // 3. Glass.
    gl.useProgram(glass.prog);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, width, height);
    gl.bindTexture(gl.TEXTURE_2D, sceneTarget.tex);
    gl.uniform1i(glass.u('uScene'), 0);
    gl.uniform2f(glass.u('uSceneTexel'), 1 / sceneTarget.w, 1 / sceneTarget.h);
    gl.uniform2f(glass.u('uResolution'), width, height);
    gl.uniform1f(glass.u('uTime'), time);
    gl.uniform1f(glass.u('uAngle'), angle);
    gl.uniform1f(glass.u('uFrequency'), frequency);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    energy *= Math.pow(0.965, dt * 60);
    if (!ready) {
      ready = true;
      options.onReady?.();
    }
  };

  // Full rate while ink is on screen, ~30fps for the slow ambient drift.
  let skip = false;
  const loop = (now: number) => {
    frame = 0;
    if (!running) return;
    skip = energy < 0.01 ? !skip : false;
    if (!skip) draw(now);
    frame = requestAnimationFrame(loop);
  };

  function wake() {
    if (options.still || running || !visible || document.hidden) return;
    running = true;
    last = performance.now();
    frame = requestAnimationFrame(loop);
  }

  function sleep() {
    running = false;
    cancelAnimationFrame(frame);
    frame = 0;
  }

  resize();
  draw(performance.now());

  const resizeObserver = new ResizeObserver(() => {
    resize();
    if (!running) draw(performance.now());
  });
  resizeObserver.observe(canvas);

  const io = new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? true;
    if (visible) wake();
    else sleep();
  });
  io.observe(canvas);

  const onVisibility = () => (document.hidden ? sleep() : wake());
  document.addEventListener('visibilitychange', onVisibility);
  if (!options.still) window.addEventListener('pointermove', onMove, { passive: true });

  const onLost = (e: Event) => {
    e.preventDefault();
    sleep();
  };
  canvas.addEventListener('webglcontextlost', onLost);

  wake();

  return {
    destroy() {
      sleep();
      resizeObserver.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('webglcontextlost', onLost);
      trails?.forEach((t) => deleteTarget(gl, t));
      deleteTarget(gl, sceneTarget);
      gl.deleteBuffer(quad);
      gl.deleteProgram(trail.prog);
      gl.deleteProgram(scene.prog);
      gl.deleteProgram(glass.prog);
    },
  };
}
