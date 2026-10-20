import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PROJECTS, type Project } from "../content";
import { Chip, MagneticButton } from "./ui";

export function CaseStudy({ project, onClose, onNavigate }: { project: Project | null; onClose: () => void; onNavigate: (p: Project) => void }) {
  return (
    <AnimatePresence>
      {project ? <Dialog key={project.id} project={project} onClose={onClose} onNavigate={onNavigate} /> : null}
    </AnimatePresence>
  );
}

function Dialog({ project, onClose, onNavigate }: { project: Project; onClose: () => void; onNavigate: (p: Project) => void }) {
  const [slide, setSlide] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const count = project.gallery.length;
  const idx = PROJECTS.findIndex((p) => p.id === project.id);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (count > 1 && e.key === "ArrowRight") setSlide((s) => (s + 1) % count);
      if (count > 1 && e.key === "ArrowLeft") setSlide((s) => (s - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      prevFocus?.focus?.();
    };
  }, [count, onClose]);

  return (
    <motion.div className="cs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        className="cs__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cs-title"
        initial={{ y: 60, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} type="button" className="icon-btn cs__close" onClick={onClose} aria-label="Close case study">
          <X size={20} />
        </button>

        <header className="cs__head">
          <p className="label label--fire">
            Case study {project.index} — {project.kicker}
          </p>
          <h2 id="cs-title" className="display">{project.title}</h2>
          <p className="label label--dim">{project.period}</p>
        </header>

        <div className={`cs__gallery${project.mobile ? " cs__gallery--mobile" : ""}`}>
          <div className="cs__stage">
            <AnimatePresence mode="wait">
              <motion.figure
                key={slide}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35 }}
              >
                <img src={project.gallery[slide].src} alt={project.gallery[slide].caption} decoding="async" />
                <figcaption>{project.gallery[slide].caption}</figcaption>
              </motion.figure>
            </AnimatePresence>
            {count > 1 ? (
              <>
                <button type="button" className="icon-btn cs__nav cs__nav--l" onClick={() => setSlide((s) => (s - 1 + count) % count)} aria-label="Previous image">
                  <ChevronLeft size={20} />
                </button>
                <button type="button" className="icon-btn cs__nav cs__nav--r" onClick={() => setSlide((s) => (s + 1) % count)} aria-label="Next image">
                  <ChevronRight size={20} />
                </button>
                <span className="cs__count">{slide + 1} / {count}</span>
              </>
            ) : null}
          </div>
          {count > 1 ? (
            <div className="cs__thumbs">
              {project.gallery.map((g, i) => (
                <button key={g.caption} type="button" className={`cs__thumb${i === slide ? " is-active" : ""}`} onClick={() => setSlide(i)} aria-label={`Show ${g.caption}`}>
                  <img src={g.src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="cs__grid">
          <section>
            <h3 className="label label--fire">The problem</h3>
            <p>{project.problem}</p>
            <h3 className="label label--fire">My role</h3>
            <p>{project.role}</p>
          </section>
          <section>
            <h3 className="label label--fire">What I built</h3>
            <ul className="cs__list">
              {project.built.map((b) => <li key={b}>{b}</li>)}
            </ul>
            <div className="chips">{project.stack.map((s) => <Chip key={s}>{s}</Chip>)}</div>
          </section>
        </div>

        <footer className="cs__foot">
          <div className="row">
            {project.live ? (
              <MagneticButton href={project.live} target="_blank" rel="noreferrer" icon={<ArrowUpRight size={18} />}>
                Visit live site
              </MagneticButton>
            ) : null}
            {project.extraLink ? (
              <MagneticButton variant="ghost" href={project.extraLink.href} target="_blank" rel="noreferrer" icon={<ArrowUpRight size={18} />}>
                {project.extraLink.label}
              </MagneticButton>
            ) : null}
          </div>
          <button type="button" className="cs__next" onClick={() => onNavigate(next)}>
            <span className="label label--dim">Next realm</span>
            <span className="cs__next-title">{next.title} →</span>
          </button>
        </footer>
      </motion.div>
    </motion.div>
  );
}
