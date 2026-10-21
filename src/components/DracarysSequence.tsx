import { useEffect, useRef } from "react";
import dragonFly from "../assets/art/dragon-fly.webp";
import dragonRoar from "../assets/art/dragon-roar.webp";
import fireBlast from "../assets/art/fire-blast.webp";

/*
 * Full-screen "Dracarys" cinematic: a realistic black dragon flies in toward
 * the viewer, cuts to a roaring close-up, lunges at the screen and floods it
 * with fire, then bursts through the camera. One rAF clock drives the image
 * transforms, the fire layers and the spark particles so everything stays in
 * sync. Dragon and fire images are original AI renders (Figma AI), not a film
 * character.
 */

export const DRACARYS_DURATION = 3600; // ms

const FIRE_START = 1.5;
const FIRE_END = 2.85;
/** Throat position in dragon-roar.webp, as a fraction of its width/height. */
const MOUTH = { x: 0.5, y: 0.56 };
/** Fire is a stream of fireball layers rushing from the mouth toward the camera. */
const FIRE_LAYERS = 5;
const FIRE_CYCLE = 0.75; // s for one fireball to travel "through" the screen

/** Decode the images ahead of time so the cinematic never starts on a blank frame. */
export function preloadDracarys() {
  [dragonFly, dragonRoar, fireBlast].forEach((src) => {
    const img = new Image();
    img.src = src;
    img.decode?.().catch(() => {});
  });
}

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const easeOut = (k: number) => 1 - Math.pow(1 - k, 3);
const easeIn = (k: number) => k * k * k;
const easeInOut = (k: number) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);

/** Flying shot: rushes in from the distance, bobbing with each wingbeat. */
function flyPose(t: number) {
  const k = easeOut(seg(t, 0.25, 1.3));
  const beat = Math.sin(t * 13);
  return {
    s: lerp(0.05, 1, k),
    sy: 1 + beat * 0.05 * (1 - k * 0.5),
    y: lerp(-30, 0, k) + beat * 1.4,
    o: seg(t, 0.25, 0.5) * (1 - seg(t, 1.2, 1.45)),
  };
}

/** Roaring close-up: settles, then lunges at the screen while breathing fire. */
function roarPose(t: number) {
  let s: number;
  if (t < FIRE_START) s = lerp(0.72, 0.84, easeInOut(seg(t, 1.2, FIRE_START)));
  else if (t < 2.9) s = lerp(0.84, 2.1, easeOut(seg(t, FIRE_START, 2.9)));
  else s = lerp(2.1, 3.8, easeIn(seg(t, 2.9, 3.5)));
  return { s, o: seg(t, 1.2, 1.45) * (1 - seg(t, 2.95, 3.4)) };
}

/** Fireball layer i at time t: grows from the mouth past the camera, then relaunches. */
function firePose(t: number, i: number) {
  const local = t - FIRE_START - (i * FIRE_CYCLE) / FIRE_LAYERS;
  if (local < 0) return null;
  const cycle = Math.floor(local / FIRE_CYCLE);
  // No new fireballs after the breath ends; let the last ones finish.
  if (FIRE_START + (i * FIRE_CYCLE) / FIRE_LAYERS + cycle * FIRE_CYCLE > FIRE_END) return null;
  const k = (local % FIRE_CYCLE) / FIRE_CYCLE;
  return {
    s: lerp(0.12, 4.6, Math.pow(k, 1.6)),
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
  const flyRef = useRef<HTMLDivElement>(null);
  const roarRef = useRef<HTMLDivElement>(null);
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

      // Dragon
      const f = flyPose(t);
      const fly = flyRef.current!;
      fly.style.opacity = String(f.o);
      fly.style.transform = `translate(-50%, calc(-50% + ${f.y}vh)) scale(${f.s}, ${f.s * f.sy})`;
      const r = roarPose(t);
      const roar = roarRef.current!;
      roar.style.opacity = String(r.o);
      roar.style.transform = `translate(-50%, -50%) scale(${r.s})`;
      roar.style.filter = `brightness(${1 + fireK * (0.22 + 0.14 * Math.sin(t * 43))})`;

      // Mouth position on screen (fire origin)
      const rect = roar.getBoundingClientRect();
      const mx = rect.left + rect.width * MOUTH.x;
      const my = rect.top + rect.height * MOUTH.y;

      // Fireball stream
      for (let i = 0; i < FIRE_LAYERS; i++) {
        const el = fireRefs.current[i];
        if (!el) continue;
        const p = firePose(t, i);
        if (!p) {
          el.style.opacity = "0";
          continue;
        }
        const flicker = 0.9 + Math.random() * 0.2;
        el.style.opacity = String(p.o * flicker);
        el.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%) scale(${p.s}) rotate(${p.rot}deg)`;
      }

      // Veil, heat and page shake
      rootRef.current!.style.setProperty("--veil", String(seg(t, 0.1, 0.6) * 0.95 * (1 - seg(t, 3.15, 3.6))));
      rootRef.current!.style.setProperty("--heat", String(fireK));
      const shake = t > FIRE_START && t < FIRE_END ? 8 * (1 - seg(t, FIRE_START, FIRE_END) * 0.6) : 0;
      root.style.setProperty("--shake-x", `${(Math.random() - 0.5) * shake}px`);
      root.style.setProperty("--shake-y", `${(Math.random() - 0.5) * shake}px`);

      // Sparks & embers flying out of the blast toward the viewer
      if (t > FIRE_START && t < FIRE_END) {
        const count = Math.round(9 * seg(t, FIRE_START, FIRE_START + 0.2));
        for (let i = 0; i < count; i++) {
          const a = Math.random() * Math.PI * 2;
          const sp = (300 + Math.random() * 1100) * unit;
          sparks.push({
            x: mx, y: my,
            vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
            age: 0, life: 0.5 + Math.random() * 0.9,
            r: (2 + Math.random() * 6) * unit, hot: Math.random() > 0.4,
          });
        }
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
      <div ref={flyRef} className="dracarys__img dracarys__img--fly">
        <img src={dragonFly} alt="" />
      </div>
      <div ref={roarRef} className="dracarys__img dracarys__img--roar">
        <img src={dragonRoar} alt="" />
      </div>
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
