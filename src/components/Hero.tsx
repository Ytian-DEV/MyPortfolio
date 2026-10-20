import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { PROFILE } from "../content";
import { DragonThrone } from "./DragonThrone";
import { Chip, MagneticButton } from "./ui";

const HEADLINE = ["I", "forge", "web", "apps", "worthy", "of", "the"];

export function Hero({ breathing, onDragonClick }: { breathing: boolean; onDragonClick: () => void }) {
  const artRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const reduce = useReducedMotion();

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse") return;
    const { innerWidth: w, innerHeight: h } = window;
    const mx = (e.clientX / w - 0.5) * 2;
    const my = (e.clientY / h - 0.5) * 2;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      artRef.current?.style.setProperty("--mx", mx.toFixed(3));
      artRef.current?.style.setProperty("--my", my.toFixed(3));
    });
  };

  const word = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: "0.6em", filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.9, delay: 0.15 + i * 0.07, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section id="top" className="hero" onPointerMove={onMove}>
      <div className="hero__grid" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__copy">
          <motion.p className="status" {...word(0)}>
            <span className="status__dot" aria-hidden="true" />
            {PROFILE.availability}
          </motion.p>
          <motion.p className="hero__role" {...word(1)}>
            {PROFILE.role} <span aria-hidden="true">·</span> {PROFILE.location}
          </motion.p>

          <h1 className="hero__title" aria-label="I forge web apps worthy of the throne.">
            {HEADLINE.map((w, i) => (
              <motion.span key={w + i} className="hero__word" aria-hidden="true" {...word(i + 2)}>
                {w}
              </motion.span>
            ))}
            <motion.span className="hero__word hero__word--fire" aria-hidden="true" {...word(HEADLINE.length + 2)}>
              throne.
            </motion.span>
          </h1>

          <motion.p className="hero__sub" {...word(11)}>
            React, TypeScript &amp; Supabase — from database schema to pixel-perfect interface. Five
            production apps shipped for students, restaurants and campus organisations.
          </motion.p>

          <motion.div className="hero__ctas" {...word(12)}>
            <MagneticButton href="#work">See my conquests</MagneticButton>
            <MagneticButton href="#contact" variant="ghost">Send a raven</MagneticButton>
          </motion.div>

          <motion.div className="hero__stack" {...word(13)}>
            {["React", "TypeScript", "Next.js", "Supabase", "Tailwind"].map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </motion.div>
        </div>

        <motion.div
          ref={artRef}
          className="hero__art"
          initial={reduce ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <button type="button" className="hero__dragon" onClick={onDragonClick} aria-label="Wake the dragon">
            <DragonThrone breathing={breathing} />
          </button>
          <p className="hero__hint" aria-hidden="true">
            click the dragon — or type <kbd>dracarys</kbd>
          </p>
        </motion.div>
      </div>

      <div className="container hero__foot">
        <a href="#work" className="scroll-cue">
          <span className="scroll-cue__line" aria-hidden="true" />
          Scroll to enter the realm
        </a>
        <p className="hero__quote">“Ship it, or it didn't happen.”</p>
      </div>
    </section>
  );
}
