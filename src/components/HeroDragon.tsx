import { memo } from "react";
import heroDragon from "../assets/art/hero-dragon.webp";

/*
 * Realistic dragon perched behind a throne of blades (original Figma AI
 * render). Kept alive with restrained motion: a slow breathing rise, glowing
 * eyes that smoulder and blink, a pulsing glow behind the throne, drifting
 * embers and mouse parallax (via --mx/--my set on an ancestor).
 */

/** Eye centres in hero-dragon.webp, as fractions of the image. */
const EYES = [
  { x: 0.4705, y: 0.3175 },
  { x: 0.5325, y: 0.3175 },
];

const EMBERS = (() => {
  let seed = 11;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  return Array.from({ length: 22 }, () => ({
    left: `${8 + rnd() * 84}%`,
    top: `${35 + rnd() * 60}%`,
    size: `${2 + rnd() * 3}px`,
    delay: `${(rnd() * 7).toFixed(2)}s`,
    dur: `${(5 + rnd() * 5).toFixed(2)}s`,
    drift: `${((rnd() - 0.5) * 60).toFixed(0)}px`,
    hot: rnd() > 0.45,
  }));
})();

export const HeroDragon = memo(function HeroDragon({ breathing = false, flying = false }: { breathing?: boolean; flying?: boolean }) {
  return (
    <div className={`hero-dragon${breathing ? " is-breathing" : ""}${flying ? " is-flying" : ""}`}>
      <div className="hero-dragon__glow" aria-hidden="true" />
      <div className="hero-dragon__body">
        <img
          src={heroDragon}
          alt="A black dragon with glowing eyes perched behind a throne forged from swords"
          width={1024}
          height={1024}
          decoding="async"
          fetchPriority="high"
        />
        {EYES.map((e, i) => (
          <span key={i} className="hero-dragon__eye" style={{ left: `${e.x * 100}%`, top: `${e.y * 100}%` }} aria-hidden="true" />
        ))}
      </div>
      <div className="hero-dragon__embers" aria-hidden="true">
        {EMBERS.map((e, i) => (
          <span
            key={i}
            className={e.hot ? "is-hot" : undefined}
            style={{
              left: e.left,
              top: e.top,
              width: e.size,
              height: e.size,
              animationDelay: e.delay,
              animationDuration: e.dur,
              ["--drift" as string]: e.drift,
            }}
          />
        ))}
      </div>
    </div>
  );
});
