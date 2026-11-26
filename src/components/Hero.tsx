import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, Copy, FileText } from "lucide-react";
import { useState } from "react";
import { FEATURED_PROJECTS, PROFILE, PROJECTS, type Project } from "../content";

interface HeroProps {
  onToast: (message: string) => void;
  onOpenProject: (project: Project) => void;
}

const DOSSIER_STACK = [
  "React",
  "TypeScript",
  "React Native",
  "Flutter",
  "Node / Express",
  "Python",
  "Supabase",
  "PostgreSQL",
  "Figma",
];

export function Hero({ onToast, onOpenProject }: HeroProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      onToast("Copied christian02613@gmail.com to clipboard");
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  const handleResumeAction = () => {
    if (PROFILE.resumeUrl) {
      window.open(PROFILE.resumeUrl, "_blank", "noopener,noreferrer");
      return;
    }
    const subject = encodeURIComponent("Resume request — Junior Software Engineer");
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}`;
    onToast("Resume PDF is being finalized — opening email request");
  };

  return (
    <section id="top" className="hero" aria-labelledby="hero-heading">
      <div className="container">
        <div className="hero__spec-bar">
          <span className="mono-meta mono-meta--accent">{PROFILE.role}</span>
          <span className="hero__spec-divider" aria-hidden="true" />
          <span className="mono-meta">{PROFILE.specialization}</span>
          <span className="hero__spec-divider" aria-hidden="true" />
          <span className="mono-meta">{PROFILE.location}</span>
        </div>

        <div className="hero__split">
          <div className="hero__main">
            <h1 id="hero-heading" className="serif-hero hero__title">
              Interfaces shaped with <em>editorial clarity</em>; engineered cleanly down to the schema.
            </h1>

            <p className="hero__lead">
              I’m <strong>{PROFILE.name}</strong>, a 4th-year Computer Science student and full-stack developer building
              end-to-end software—from tokenized Figma systems on web and mobile to typed{" "}
              <strong>React, React Native, Node/Express</strong>, and <strong>PostgreSQL</strong> applications.
            </p>

            <div className="hero__actions">
              <a href="#work" className="btn btn--primary">
                Selected Work
                <ArrowDownRight size={16} aria-hidden="true" />
              </a>

              <button type="button" className="btn btn--outline" onClick={handleCopyEmail}>
                {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                {copied ? "Email Copied" : "Copy Email"}
              </button>

              <button type="button" className="btn btn--ghost" onClick={handleResumeAction}>
                <FileText size={15} aria-hidden="true" />
                {PROFILE.resumeUrl ? "Resume PDF" : "Request Resume"}
              </button>
            </div>
          </div>

          <aside className="dossier" aria-label="Engineer specification dossier">
            <div className="dossier__head">
              <span className="mono-meta">ENGINEER DOSSIER // 2026</span>
              <span className="dossier__status">
                <span className="status-dot" aria-hidden="true" />
                Open to Roles
              </span>
            </div>

            <dl className="dossier__specs">
              <div className="dossier__row">
                <dt className="mono-meta">FOCUS</dt>
                <dd>UI/UX Systems · Web &amp; Mobile · Backend APIs</dd>
              </div>

              <div className="dossier__row">
                <dt className="mono-meta">EDUCATION</dt>
                <dd>BS Computer Science (4th Yr) · VSU</dd>
              </div>

              <div className="dossier__row dossier__row--stack">
                <dt className="mono-meta">CORE STACK</dt>
                <dd className="dossier__tags">
                  {DOSSIER_STACK.map((item) => (
                    <span key={item} className="tag">
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>

            <div className="dossier__index">
              <div className="dossier__index-head">
                <span className="mono-meta mono-meta--accent">FEATURED INDEX</span>
                <span className="mono-meta">Quick Jump</span>
              </div>

              <div className="dossier__links" role="list">
                {FEATURED_PROJECTS.slice(0, 5).map((project) => (
                  <button
                    key={project.id}
                    type="button"
                    role="listitem"
                    className="dossier__jump"
                    onClick={() => onOpenProject(project)}
                  >
                    <span className="dossier__jump-left">
                      <span className="mono-meta mono-meta--accent">{project.index}</span>
                      <span className="dossier__jump-title">{project.title}</span>
                    </span>
                    <span className="dossier__jump-right">
                      <span className="mono-meta">{project.category === "design" ? "UI/UX" : "Full-Stack"}</span>
                      <ArrowRight size={13} className="dossier__arrow" aria-hidden="true" />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="dossier__foot">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="dossier__ext"
              >
                {PROFILE.githubLabel}
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
              <span className="mono-meta">{String(PROJECTS.length).padStart(2, "0")} Shipped Builds</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
