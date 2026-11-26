import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Figma, Link2, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { PROJECTS, type Project } from "../content";

interface CaseStudyProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  onToast: (message: string) => void;
}

export function CaseStudy({ project, onClose, onSelectProject, onToast }: CaseStudyProps) {
  const [activeGroup, setActiveGroup] = useState<string>("All");
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveGroup("All");
    setSlideIndex(0);
  }, [project?.id]);

  const groups = useMemo(() => {
    if (!project) return [];
    const unique = Array.from(new Set(project.gallery.map((g) => g.group).filter(Boolean))) as string[];
    return unique.length > 1 ? ["All", ...unique] : [];
  }, [project]);

  const filteredSlides = useMemo(() => {
    if (!project) return [];
    if (activeGroup === "All") return project.gallery;
    return project.gallery.filter((g) => g.group === activeGroup);
  }, [project, activeGroup]);

  const currentSlide = filteredSlides[slideIndex] ?? filteredSlides[0];

  useEffect(() => {
    if (!project) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.classList.add("lock-scroll");
    window.setTimeout(() => closeBtnRef.current?.focus(), 30);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowRight" && filteredSlides.length > 1) {
        setSlideIndex((prev) => (prev + 1) % filteredSlides.length);
      } else if (e.key === "ArrowLeft" && filteredSlides.length > 1) {
        setSlideIndex((prev) => (prev - 1 + filteredSlides.length) % filteredSlides.length);
      } else if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("lock-scroll");
      window.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus?.();
    };
  }, [project, filteredSlides.length, onClose]);

  const handleCopyShareLink = async () => {
    if (!project) return;
    const url = `${window.location.origin}${window.location.pathname}#project=${project.id}`;
    try {
      await navigator.clipboard.writeText(url);
      onToast(`Copied direct link to ${project.title}`);
    } catch {
      onToast(url);
    }
  };

  const projectIdx = project ? PROJECTS.findIndex((p) => p.id === project.id) : -1;
  const prevProject = projectIdx >= 0 ? PROJECTS[(projectIdx - 1 + PROJECTS.length) % PROJECTS.length] : null;
  const nextProject = projectIdx >= 0 ? PROJECTS[(projectIdx + 1) % PROJECTS.length] : null;

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="drawer-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={panelRef}
            className="drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
          >
            <div className="drawer-topbar">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="mono-meta mono-meta--accent">CASE STUDY {project.index}</span>
                <span className="mono-meta">· {project.disciplineLabel}</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button
                  type="button"
                  className="tool-btn"
                  onClick={handleCopyShareLink}
                  title="Copy shareable case study URL"
                >
                  <Link2 size={13} aria-hidden="true" />
                  <span>Share URL</span>
                </button>

                <button
                  ref={closeBtnRef}
                  type="button"
                  className="tool-btn"
                  onClick={onClose}
                  aria-label="Close case study drawer"
                >
                  <X size={15} aria-hidden="true" />
                  <span>Close</span>
                </button>
              </div>
            </div>

            <div className="drawer-scroll">
              <header className="drawer-header">
                <p className="mono-meta" style={{ marginBottom: 8 }}>
                  {project.period}
                </p>
                <h2 id="case-study-title" className="serif-section" style={{ marginBottom: 8 }}>
                  {project.title}
                </h2>
                <p style={{ fontSize: 17, color: "var(--ink-2)", maxWidth: "62ch" }}>{project.summary}</p>

                <div className="drawer-links">
                  {project.live ? (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--accent"
                    >
                      Open Live App
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                  ) : null}

                  {project.figma ? (
                    <a
                      href={project.figma}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--outline"
                    >
                      <Figma size={14} aria-hidden="true" />
                      Inspect in Figma
                    </a>
                  ) : null}
                </div>
              </header>

              {currentSlide ? (
                <section className="gallery-box" aria-label={`${project.title} interface gallery`}>
                  {groups.length > 0 || filteredSlides.length > 1 ? (
                    <div className="gallery-box__controls">
                      {groups.length > 0 ? (
                        <div className="gallery-groups" role="tablist" aria-label="Filter screens by surface">
                          {groups.map((grp) => {
                            const count =
                              grp === "All"
                                ? project.gallery.length
                                : project.gallery.filter((g) => g.group === grp).length;
                            return (
                              <button
                                key={grp}
                                type="button"
                                role="tab"
                                aria-selected={activeGroup === grp}
                                className={`group-chip${activeGroup === grp ? " is-active" : ""}`}
                                onClick={() => {
                                  setActiveGroup(grp);
                                  setSlideIndex(0);
                                }}
                              >
                                {grp} ({count})
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <span className="mono-meta">Interface Gallery</span>
                      )}

                      {filteredSlides.length > 1 ? (
                        <span className="mono-meta">
                          {slideIndex + 1} / {filteredSlides.length} (Use ← → keys)
                        </span>
                      ) : null}
                    </div>
                  ) : null}

                  <div
                    className={`gallery-viewport${
                      currentSlide.portrait || project.mobile ? " is-portrait" : ""
                    }`}
                  >
                    <img src={currentSlide.src} alt={`${project.title} — ${currentSlide.caption}`} />
                  </div>

                  <div className="gallery-caption-bar">
                    <p className="mono-meta" style={{ color: "var(--ink)" }}>
                      {currentSlide.caption}
                    </p>

                    {filteredSlides.length > 1 ? (
                      <div className="gallery-nav-btns">
                        <button
                          type="button"
                          className="tool-btn"
                          onClick={() =>
                            setSlideIndex((prev) => (prev - 1 + filteredSlides.length) % filteredSlides.length)
                          }
                          aria-label="Previous screen"
                        >
                          <ChevronLeft size={15} aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          className="tool-btn"
                          onClick={() => setSlideIndex((prev) => (prev + 1) % filteredSlides.length)}
                          aria-label="Next screen"
                        >
                          <ChevronRight size={15} aria-hidden="true" />
                        </button>
                      </div>
                    ) : null}
                  </div>

                  {filteredSlides.length > 1 ? (
                    <div className="gallery-thumbs" role="list">
                      {filteredSlides.map((slide, idx) => (
                        <button
                          key={slide.caption + idx}
                          type="button"
                          className={`gallery-thumb${idx === slideIndex ? " is-active" : ""}`}
                          onClick={() => setSlideIndex(idx)}
                          aria-label={`View screen ${idx + 1}: ${slide.caption}`}
                        >
                          <img src={slide.src} alt="" loading="lazy" />
                        </button>
                      ))}
                    </div>
                  ) : null}
                </section>
              ) : null}

              <div className="drawer-columns">
                <div className="spec-card">
                  <h3>01 // The Problem</h3>
                  <p>{project.problem}</p>
                </div>
                <div className="spec-card">
                  <h3>02 // Role &amp; Ownership</h3>
                  <p>{project.role}</p>
                </div>
              </div>

              <div className="spec-card" style={{ marginBottom: 24 }}>
                <h3>03 // System &amp; Design Architecture</h3>
                <p>{project.architectureNote}</p>
              </div>

              <div className="spec-card" style={{ marginBottom: 24 }}>
                <h3>04 // Key Deliverables</h3>
                <ul className="built-list">
                  {project.built.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mono-meta" style={{ marginBottom: 10 }}>
                  STACK &amp; METHODS
                </p>
                <ul className="spread__tags">
                  {project.stack.map((tech) => (
                    <li key={tech} className="tag">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {prevProject && nextProject ? (
              <footer className="drawer-footer">
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={() => onSelectProject(prevProject)}
                >
                  <ArrowLeft size={14} aria-hidden="true" />
                  {prevProject.title}
                </button>

                <span className="mono-meta">
                  {project.index} / {String(PROJECTS.length).padStart(2, "0")}
                </span>

                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={() => onSelectProject(nextProject)}
                >
                  {nextProject.title}
                  <ArrowRight size={14} aria-hidden="true" />
                </button>
              </footer>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
