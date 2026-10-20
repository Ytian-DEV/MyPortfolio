import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { FILTERS, PROJECTS, type Project } from "../content";
import { Eyebrow, MagneticButton, Reveal } from "./ui";

type FilterId = (typeof FILTERS)[number]["id"];

function Tilt({ children, className, onClick, label }: { children: ReactNode; className: string; onClick: () => void; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || reduce || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - py) * 7}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * 9}deg`);
    el.style.setProperty("--gx", `${px * 100}%`);
    el.style.setProperty("--gy", `${py * 100}%`);
  };
  const reset = () => {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={ref}
      className={`tilt ${className}`}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={label}
    >
      {children}
      <span className="tilt__glare" aria-hidden="true" />
    </div>
  );
}

function Flagship({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  return (
    <Reveal>
      <article className="flagship">
        <Tilt className="flagship__shot" onClick={() => onOpen(project)} label={`Open ${project.title} case study`}>
          <img src={project.cover} alt={`${project.title} live site`} loading="lazy" decoding="async" />
        </Tilt>
        <div className="flagship__body">
          <span className="badge">
            <span aria-hidden="true">♛</span> Flagship · Live
          </span>
          <p className="label label--dim">
            {project.index} — {project.period}
          </p>
          <h3 className="flagship__title">{project.title}</h3>
          <p className="muted">{project.summary}</p>
          <dl className="facts">
            <div><dt>Role</dt><dd>Product design → full-stack build</dd></div>
            <div><dt>Stack</dt><dd>{project.stack.slice(0, 4).join(" · ")}</dd></div>
            <div><dt>Evolution</dt><dd>Figma concept → v1 → v2 rebuild</dd></div>
          </dl>
          <div className="row">
            {project.live ? (
              <MagneticButton href={project.live} target="_blank" rel="noreferrer" icon={<ArrowUpRight size={18} />}>
                Visit live site
              </MagneticButton>
            ) : null}
            <MagneticButton variant="ghost" onClick={() => onOpen(project)}>
              Read case study
            </MagneticButton>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  return (
    <Tilt className={`card${project.mobile ? " card--mobile" : ""}`} onClick={() => onOpen(project)} label={`Open ${project.title} case study`}>
      <div className="card__shot">
        <img src={project.cover} alt={`${project.title} preview`} loading="lazy" decoding="async" />
        <span className="card__view">View case study</span>
      </div>
      <div className="card__body">
        <p className="card__meta">
          <span className="label label--fire">{project.index} — {project.kicker}</span>
          <span className="label label--dim">{project.period}</span>
        </p>
        <h3 className="card__title">{project.title}</h3>
        <p className="muted">{project.summary}</p>
        <p className="label label--blush">{project.stack.join(" · ")}</p>
        {project.live ? (
          <a className="card__link" href={project.live} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
            Visit live site <ArrowUpRight size={16} />
          </a>
        ) : (
          <span className="card__link">Figma blueprint <ArrowUpRight size={16} /></span>
        )}
      </div>
    </Tilt>
  );
}

export function Work({ onOpen }: { onOpen: (p: Project) => void }) {
  const [filter, setFilter] = useState<FilterId>("all");
  const flagship = PROJECTS.find((p) => p.flagship)!;
  const showFlagship = filter === "all" || filter === flagship.category;
  const rest = PROJECTS.filter((p) => !p.flagship && (filter === "all" || p.category === filter));

  return (
    <section id="work" className="section">
      <div className="container">
        <Reveal as="header" className="section__head">
          <div>
            <Eyebrow numeral="I">Selected conquests</Eyebrow>
            <h2 className="display">Realms I've built</h2>
          </div>
          <p className="muted section__desc">
            Real products with real users — each one designed, coded, and deployed end-to-end by me.
          </p>
        </Reveal>

        <div className="filters" role="tablist" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              className={`filter${filter === f.id ? " is-active" : ""}`}
              onClick={() => setFilter(f.id)}
            >
              {filter === f.id ? <motion.span layoutId="filter-pill" className="filter__pill" transition={{ type: "spring", stiffness: 380, damping: 30 }} /> : null}
              <span className="filter__label">{f.label}</span>
            </button>
          ))}
        </div>

        <div className="work">
          {showFlagship ? <Flagship project={flagship} onOpen={onOpen} /> : null}
          <motion.div layout className="work__grid">
            <AnimatePresence mode="popLayout">
              {rest.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProjectCard project={p} onOpen={onOpen} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
