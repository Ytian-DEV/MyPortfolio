import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Figma } from "lucide-react";
import { useState } from "react";
import {
  ARCHIVE_PROJECTS,
  FEATURED_PROJECTS,
  PROJECTS,
  WORK_FILTERS,
  type Project,
  type ProjectCategory,
} from "../content";

interface WorkProps {
  onOpenProject: (project: Project) => void;
}

function ProjectVisualStage({ project, onOpen }: { project: Project; onOpen: () => void }) {
  if (project.mobile && project.secondaryPreviews && project.secondaryPreviews.length >= 2) {
    const screens = [project.cover, project.secondaryPreviews[0], project.secondaryPreviews[1]];
    return (
      <button
        type="button"
        className="stage-card"
        onClick={onOpen}
        aria-label={`Open ${project.title} case study (${project.gallery.length} screens)`}
      >
        <div className="stage-card__bar">
          <span className="stage-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span>
            {project.id === "agapay"
              ? "Live Mobile App · Offline + SMS Ready"
              : project.id === "ryde"
                ? "Dev Build · iOS 26 Liquid Glass"
                : "Mobile System"}{" "}
            · {project.gallery.length} Screens
          </span>
        </div>
        <div className="stage-triptych">
          {screens.map((src, idx) => (
            <div key={idx} className="stage-phone">
              <img
                src={src}
                alt={`${project.title} mobile screen preview ${idx + 1}`}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </button>
    );
  }

  if (project.tabletPortrait && project.secondaryPreviews?.[0]) {
    const tablets = [project.cover, project.secondaryPreviews[0]];
    return (
      <button
        type="button"
        className="stage-card"
        onClick={onOpen}
        aria-label={`Open ${project.title} case study (${project.gallery.length} screens)`}
      >
        <div className="stage-card__bar">
          <span className="stage-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span>Portrait iPad Kiosk · {project.gallery.length} Screens</span>
        </div>
        <div className="stage-tablet-duo">
          {tablets.map((src, idx) => (
            <div key={idx} className="stage-tablet">
              <img
                src={src}
                alt={`${project.title} portrait iPad screen ${idx + 1}`}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </button>
    );
  }

  if (project.id === "kheryne" && project.secondaryPreviews?.[0]) {
    return (
      <button
        type="button"
        className="stage-card"
        onClick={onOpen}
        aria-label={`Open ${project.title} case study (${project.gallery.length} screens)`}
      >
        <div className="stage-card__bar">
          <span className="stage-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span>Paired Windows Lab + Android Eyepiece · {project.gallery.length} Screens</span>
        </div>
        <div className="stage-hybrid">
          <div className="stage-frame">
            <img src={project.cover} alt={`${project.title} desktop workspace`} loading="lazy" decoding="async" />
          </div>
          <div className="stage-hybrid__inset">
            <img
              src={project.secondaryPreviews[0]}
              alt={`${project.title} companion mobile screen`}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      className="stage-card"
      onClick={onOpen}
      aria-label={`Open ${project.title} case study`}
    >
      <div className="stage-card__bar">
        <span className="stage-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span>{project.live ? "Production Web App" : "Design Blueprint"}</span>
      </div>
      <div className="stage-frame">
        <img src={project.cover} alt={`${project.title} interface preview`} loading="lazy" decoding="async" />
      </div>
    </button>
  );
}

export function Work({ onOpenProject }: WorkProps) {
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all");
  const [activeArchiveId, setActiveArchiveId] = useState<string>(ARCHIVE_PROJECTS[0]?.id ?? "");

  const featured =
    filter === "all" ? FEATURED_PROJECTS : FEATURED_PROJECTS.filter((p) => p.category === filter);
  const archive =
    filter === "all" ? ARCHIVE_PROJECTS : ARCHIVE_PROJECTS.filter((p) => p.category === filter);

  const previewProject =
    archive.find((p) => p.id === activeArchiveId) ?? archive[0] ?? ARCHIVE_PROJECTS[0];

  const getCount = (id: "all" | ProjectCategory) =>
    id === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.category === id).length;

  return (
    <section id="work" className="section-band" aria-labelledby="work-heading">
      <div className="container">
        <header className="section-intro">
          <div>
            <p className="section-kicker mono-meta">
              <span className="section-kicker__tick" aria-hidden="true" />
              01 // Selected Work
            </p>
            <h2 id="work-heading" className="serif-section">
              Shipped platforms &amp; <em>system blueprints</em>.
            </h2>
          </div>
          <p className="section-summary">
            Curated case studies across full-stack web engineering and cross-platform product design—each built around
            real campus, scientific, and local business workflows.
          </p>
        </header>

        <div className="work-controls">
          <div className="filter-group" role="tablist" aria-label="Filter projects by discipline">
            {WORK_FILTERS.map((item) => {
              const active = filter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  className={`filter-tab${active ? " is-active" : ""}`}
                  onClick={() => setFilter(item.id)}
                >
                  {active ? (
                    <motion.span
                      layoutId="workFilterPill"
                      className="filter-tab__pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <span className="filter-tab__text">
                    {item.label} ({String(getCount(item.id)).padStart(2, "0")})
                  </span>
                </button>
              );
            })}
          </div>

          <span className="mono-meta">Click any project to inspect screens &amp; architecture</span>
        </div>

        {featured.length > 0 ? (
          <div className="featured-stack">
            {featured.map((project, idx) => (
              <article
                key={project.id}
                className={`spread${idx % 2 === 1 ? " spread--reverse" : ""}`}
              >
                <div className="spread__info">
                  <div className="spread__topline">
                    <span className="spread__index">
                      {project.index} · {project.disciplineLabel}
                    </span>
                    <span className="mono-meta">{project.period}</span>
                  </div>

                  <h3 className="serif-project">{project.title}</h3>
                  <p className="spread__subtitle">{project.subtitle}</p>
                  <p className="spread__summary">{project.summary}</p>

                  {project.metrics ? (
                    <dl className="spread__metrics">
                      {project.metrics.map((m) => (
                        <div key={m.label}>
                          <dt className="metric-item__label">{m.label}</dt>
                          <dd className="metric-item__val">{m.value}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}

                  <ul className="spread__tags" aria-label={`${project.title} technology stack`}>
                    {project.stack.map((tech) => (
                      <li key={tech} className="tag">
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <div className="spread__actions">
                    <button
                      type="button"
                      className="btn btn--primary"
                      onClick={() => onOpenProject(project)}
                    >
                      Read Case Study
                      <ArrowRight size={15} aria-hidden="true" />
                    </button>

                    {project.live ? (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--outline"
                      >
                        Live App
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
                        Figma System
                      </a>
                    ) : null}
                  </div>
                </div>

                <div className="spread__stage">
                  <ProjectVisualStage project={project} onOpen={() => onOpenProject(project)} />
                </div>
              </article>
            ))}
          </div>
        ) : null}

        {archive.length > 0 ? (
          <div className="archive-section">
            <div className="archive-head">
              <div>
                <p className="mono-meta mono-meta--accent" style={{ marginBottom: 4 }}>
                  PRODUCTION ARCHIVE
                </p>
                <h3 className="archive-title">Additional Full-Stack Builds</h3>
              </div>
              <span className="mono-meta">Hover or focus a row to preview · Click for full breakdown</span>
            </div>

            <div className="archive-layout">
              <div className="archive-ledger" role="list">
                {archive.map((project) => {
                  const isHighlighted = previewProject?.id === project.id;
                  return (
                    <button
                      key={project.id}
                      type="button"
                      role="listitem"
                      className={`archive-row${isHighlighted ? " is-highlighted" : ""}`}
                      onMouseEnter={() => setActiveArchiveId(project.id)}
                      onFocus={() => setActiveArchiveId(project.id)}
                      onClick={() => onOpenProject(project)}
                    >
                      <span className="archive-row__idx">{project.index}</span>
                      <span>
                        <span className="archive-row__name">{project.title}</span>
                        <span className="archive-row__role">
                          {project.disciplineLabel} · {project.year}
                        </span>
                      </span>
                      <span className="archive-row__desc">{project.subtitle}</span>
                      <span className="archive-row__cta">
                        Inspect
                        <ArrowRight size={13} aria-hidden="true" />
                      </span>
                    </button>
                  );
                })}
              </div>

              {previewProject ? (
                <aside className="archive-preview" aria-label="Selected archive project preview">
                  <div className="archive-preview__img">
                    <img
                      src={previewProject.cover}
                      alt={`${previewProject.title} preview`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="archive-preview__meta">
                    <span className="archive-preview__title">{previewProject.title}</span>
                    <span className="mono-meta mono-meta--accent">
                      {previewProject.gallery.length}{" "}
                      {previewProject.gallery.length === 1 ? "screen" : "screens"}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.55 }}>
                    {previewProject.summary}
                  </p>
                  <div className="archive-preview__stack">
                    {previewProject.stack.slice(0, 4).map((tech) => (
                      <span key={tech} className="tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </aside>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
