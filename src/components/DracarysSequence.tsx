import { useEffect, useRef } from "react";
import dragonBreath from "../assets/art/dragon-breath.webp";
import fireBlast from "../assets/art/fire-blast.webp";

/*
 * Full-screen "Dracarys" cinematic, one continuous shot: a realistic black
 * dragon glides in toward the camera with fire gathering in its jaws, then
 * breathes a stream of fire that floods the screen while it keeps coming,
 * and passes through the camera. The dragon is scaled around its mouth, so
 * the flight and the fire share one anchor point and never cut.
 * Images are original renders (Figma AI), not a film character.
 */

export const DRACARYS_DURATION = 3800; // ms

const APPROACH_START = 0.25;
const PASS_THROUGH = 3.25; // dragon reaches the camera
const FIRE_START = 1.55;
const FIRE_END = 3.0;
/** Mouth position in dragon-breath.webp, as a fraction of its width/height. */
const MOUTH = { x: 0.498, y: 0.497 };
const FIRE_LAYERS = 5;
const FIRE_CYCLE = 0.75; // s for one fireball to travel "through" the screen

/** Decode the images ahead of time so the cinematic never starts on a blank frame. */
export function preloadDracarys() {
  [dragonBreath, fireBlast].forEach((src) => {
    const img = new Image();
    img.src = src;
    img.decode?.().catch(() => {});
  });
}

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const easeOut = (k: number) => 1 - Math.pow(1 - k, 3);

/**
 * The dragon's flight, one smooth curve in log-scale: it rushes in from the
 * distance, is nearly full-frame by the time it breathes, then keeps pressing
 * toward the camera while slowing slightly — a dragon braking to breathe.
 * Position settles from high-left to centre as it banks level. No cuts.
 */
function flight(t: number) {
  const k = seg(t, APPROACH_START, PASS_THROUGH);
  const s = Math.exp(lerp(Math.log(0.06), Math.log(3), 1 - Math.pow(1 - k, 2)));
  const settle = easeOut(seg(t, APPROACH_START, 1.6));
  return {
    s,
    x: lerp(-10, 0, settle), // vw
    y: lerp(-20, 3, settle) + Math.sin(t * 2.6) * 0.6 * (1 - settle), // vh, a slow glide
    rot: lerp(-8, 0, settle),
    o: seg(t, APPROACH_START, 0.55) * (1 - seg(t, 3.05, 3.45)),
  };
}

/** Fireball layer i at time t: grows from the mouth past the camera, then relaunches. */
function firePose(t: number, i: number) {
  const offset = (i * FIRE_CYCLE) / FIRE_LAYERS;
  const local = t - FIRE_START - offset;
  if (local < 0) return null;
  const cycle = Math.floor(local / FIRE_CYCLE);
  if (FIRE_START + offset + cycle * FIRE_CYCLE > FIRE_END) return null;
  const k = (local % FIRE_CYCLE) / FIRE_CYCLE;
  // The very first burst starts smaller so the fire visibly leaves the jaws.
  const first = cycle === 0 && i === 0 ? 0.6 : 1;
  return {
    s: lerp(0.08, 4.6, Math.pow(k, 1.6)) * first,
    o: Math.pow(Math.sin(Math.PI * Math.min(1, k * 1.15)), 0.7),
    rot: (i * 72 + cycle * 47 + k * 50) * (i % 2 ? -1 : 1),
  };
}

interface Spark { x: number; y: number; vx: number; vy: number; age: number; life: number; r: number; hot: boolean }

function makeSprite(stops: [number, string][]) {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  stops.forEach(([o, col]) => grad.addColorStop(o, col));
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return c;
}

export function DracarysSequence({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const dragonRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const fireRefs = useRef<(HTMLDivElement | null)[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      canvas.width = Math.round(innerWidth * dpr);
      canvas.height = Math.round(innerHeight * dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const hot = makeSprite([[0, "rgba(255,250,235,1)"], [0.3, "rgba(255,190,120,0.8)"], [1, "rgba(255,120,80,0)"]]);
    const pink = makeSprite([[0, "rgba(255,220,235,1)"], [0.3, "rgba(255,90,150,0.8)"], [1, "rgba(194,24,91,0)"]]);

    const sparks: Spark[] = [];
    const root = document.documentElement;
    let start = 0;
    let last = 0;
    let raf = 0;

    const frame = (now: number) => {
      if (!start) start = last = now;
      const t = (now - start) / 1000;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const W = innerWidth, H = innerHeight;
      const unit = Math.max(W, H) / 1000;
      const fireK = t < FIRE_START ? 0 : t < FIRE_END ? 1 : 1 - seg(t, FIRE_END, 3.5);

      // Dragon (scaled around its mouth, so mouth = screen centre + offset)
      const f = flight(t);
      const dragon = dragonRef.current!;
      dragon.style.opacity = String(f.o);
      dragon.style.transform = `translate(calc(-${MOUTH.x * 100}% + ${f.x}vw), calc(-${MOUTH.y * 100}% + ${f.y}vh)) rotate(${f.rot}deg) scale(${f.s})`;
      dragon.style.filter = `brightness(${1 + fireK * (0.18 + 0.12 * Math.sin(t * 43))})`;
      const mx = W / 2 + (f.x / 100) * W;
      const my = H / 2 + (f.y / 100) * H;

      // Fire gathering in the jaws before the breath
      const gather = seg(t, 1.05, FIRE_START) * (1 - seg(t, FIRE_END - 0.2, FIRE_END + 0.3));
      const glow = glowRef.current!;
      glow.style.opacity = String(gather * (0.85 + Math.random() * 0.15));
      glow.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%) scale(${0.4 + gather * 0.8 + f.s * 0.3})`;

      // Fireball stream
      for (let i = 0; i < FIRE_LAYERS; i++) {
        const el = fireRefs.current[i];
        if (!el) continue;
        const p = firePose(t, i);
        if (!p) {
          el.style.opacity = "0";
          continue;
        }
        el.style.opacity = String(p.o * (0.9 + Math.random() * 0.2));
        el.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%) scale(${p.s}) rotate(${p.rot}deg)`;
      }

      // Veil, heat and camera shake
      rootRef.current!.style.setProperty("--veil", String(seg(t, 0.05, 0.5) * 0.95 * (1 - seg(t, 3.3, 3.8))));
      rootRef.current!.style.setProperty("--heat", String(fireK));
      const shake = t > FIRE_START && t < FIRE_END ? 7 * (1 - seg(t, FIRE_START, FIRE_END) * 0.5) : 0;
      root.style.setProperty("--shake-x", `${(Math.random() - 0.5) * shake}px`);
      root.style.setProperty("--shake-y", `${(Math.random() - 0.5) * shake}px`);

      // Sparks: a few while the fire gathers, a storm during the breath
      const rate = t > FIRE_START && t < FIRE_END ? 9 : gather > 0.2 && t < FIRE_START ? 1 : 0;
      for (let i = 0; i < rate; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = (t < FIRE_START ? 120 + Math.random() * 200 : 300 + Math.random() * 1100) * unit;
        sparks.push({
          x: mx, y: my,
          vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
          age: 0, life: 0.5 + Math.random() * 0.9,
          r: (2 + Math.random() * 6) * unit, hot: Math.random() > 0.4,
        });
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.age += dt;
        if (s.age >= s.life) {
          sparks.splice(i, 1);
          continue;
        }
        const k = s.age / s.life;
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.vy += 120 * unit * dt; // embers fall as they cool
        const size = s.r * (1 + k * 3); // grow as they approach the camera
        ctx.globalAlpha = (1 - k) * 0.9;
        ctx.drawImage(s.hot ? hot : pink, s.x - size, s.y - size, size * 2, size * 2);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      if (t * 1000 < DRACARYS_DURATION || sparks.length) {
        raf = requestAnimationFrame(frame);
      } else {
        doneRef.current();
      }
    };
    raf = requestAnimationFrame(frame);
    document.body.classList.add("is-dracarys");

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.body.classList.remove("is-dracarys");
      root.style.removeProperty("--shake-x");
      root.style.removeProperty("--shake-y");
    };
  }, []);

  return (
    <div ref={rootRef} className="dracarys" aria-hidden="true">
      <div className="dracarys__veil" />
      <div ref={dragonRef} className="dracarys__dragon" style={{ transformOrigin: `${MOUTH.x * 100}% ${MOUTH.y * 100}%` }}>
        <img src={dragonBreath} alt="" />
      </div>
      <div ref={glowRef} className="dracarys__gather" />
      {Array.from({ length: FIRE_LAYERS }, (_, i) => (
        <div key={i} ref={(el) => (fireRefs.current[i] = el)} className="dracarys__blast">
          <img src={fireBlast} alt="" />
        </div>
      ))}
      <canvas ref={canvasRef} className="dracarys__fire" />
      <div className="dracarys__heat" />
    </div>
  );
}
