import { ArrowDownRight, Award, Check, Copy, FileText } from "lucide-react";
import { useState } from "react";
import { PROFILE, SPOTLIGHT_MILESTONE } from "../content";
import { DisciplineInspector } from "./DisciplineInspector";

interface HeroProps {
  onToast: (message: string) => void;
}

export function Hero({ onToast }: HeroProps) {
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
      <div className="container hero__grid">
        <div className="hero__intro">
          <div className="hero__spec-bar">
            <span className="mono-meta mono-meta--accent">{PROFILE.role}</span>
            <span className="hero__spec-divider" aria-hidden="true" />
            <span className="mono-meta">{PROFILE.specialization}</span>
            <span className="hero__spec-divider" aria-hidden="true" />
            <span className="mono-meta">{PROFILE.location}</span>
          </div>

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

          <div className="hero__Callout">
            <Award size={18} className="mono-meta--accent" style={{ flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
            <div>
              <p className="hero__callout-badge">{SPOTLIGHT_MILESTONE.badge}</p>
              <p className="hero__callout-text">
                <strong>PhilSA Space Business Innovation Camp 2026 Finalist</strong> — selected nationwide to present at
                the Final Demo Day on November 23, 2026.
              </p>
            </div>
          </div>
        </div>

        <DisciplineInspector />
      </div>
    </section>
  );
}
