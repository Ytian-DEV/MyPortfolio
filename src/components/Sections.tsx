import { ArrowUp, ArrowUpRight, Check, Copy, FileText, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import portrait from "../assets/profile-headshot.webp";
import { CAPABILITIES, CREDENTIALS, EXPERIENCE, PROFILE } from "../content";

export function CapabilitiesSection() {
  return (
    <section id="stack" className="section-band section-band--alt" aria-labelledby="stack-heading">
      <div className="container">
        <header className="section-intro">
          <div>
            <p className="section-kicker mono-meta">
              <span className="section-kicker__tick" aria-hidden="true" />
              02 // Capabilities &amp; Stack
            </p>
            <h2 id="stack-heading" className="serif-section">
              From Figma token to <em>relational query</em>.
            </h2>
          </div>
          <p className="section-summary">
            End-to-end execution across product design, web and mobile frontends, and backend services.
          </p>
        </header>

        <div className="cap-matrix">
          {CAPABILITIES.map((pillar) => (
            <article key={pillar.index} className="cap-col">
              <div>
                <span className="mono-meta mono-meta--accent">{pillar.index}</span>
                <h3 className="cap-col__title">{pillar.title}</h3>
                <p className="cap-col__desc">{pillar.blurb}</p>
              </div>

              <ul className="cap-tools" aria-label={`${pillar.title} tools and technologies`}>
                {pillar.tools.map((tool) => (
                  <li key={tool} className="tag">
                    {tool}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="section-band" aria-labelledby="experience-heading">
      <div className="container">
        <header className="section-intro">
          <div>
            <p className="section-kicker mono-meta">
              <span className="section-kicker__tick" aria-hidden="true" />
              03 // Background &amp; Recognition
            </p>
            <h2 id="experience-heading" className="serif-section">
              Product sensibility backed by <em>shipping habits</em>.
            </h2>
          </div>
          <p className="section-summary">
            Currently in my 4th year of BS Computer Science at Visayas State University, building software for real
            campus communities, researchers, and local businesses.
          </p>
        </header>

        <div className="about-layout">
          <aside className="portrait-sheet" aria-label="About Christian Boyles">
            <div className="portrait-frame">
              <img
                src={portrait}
                alt={`Portrait of ${PROFILE.fullName}`}
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="portrait-caption">
              <div>
                <p style={{ fontWeight: 700, fontSize: 15 }}>{PROFILE.fullName}</p>
                <p className="mono-meta">{PROFILE.education}</p>
              </div>
              <span className="tag tag--accent">PH · UTC+8</span>
            </div>

            <div className="bio-copy">
              <p>
                I started on the frontend in 2024, expanded into product systems and full-stack architecture in 2025,
                and now take projects from initial user interviews and Figma prototypes all the way to PostgreSQL
                schemas, Express/Supabase backends, and deployed web or mobile interfaces.
              </p>
              <p>
                I care deeply about the quiet details—legible hierarchy, keyboard accessibility, predictable state, and
                data models that prevent bugs before they reach the UI.
              </p>
            </div>
          </aside>

          <div>
            <div className="ledger" role="list" aria-label="Experience and education timeline">
              {EXPERIENCE.map((item) => (
                <div key={item.role + item.period} className="ledger__row" role="listitem">
                  <div>
                    <p className="mono-meta" style={{ color: item.highlight ? "var(--ink)" : undefined }}>
                      {item.period}
                    </p>
                    <span className="tag" style={{ marginTop: 6 }}>
                      {item.type}
                    </span>
                  </div>
                  <div>
                    <h3 className="ledger__role">{item.role}</h3>
                    <p className="ledger__org">{item.org}</p>
                    <p className="ledger__details">{item.details}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="certs-block" aria-labelledby="certs-heading">
              <h3 id="certs-heading" className="certs-block__title">
                Honors &amp; Credentials
              </h3>

              <div className="creds-register" role="list">
                {CREDENTIALS.map((cred) => (
                  <div key={cred.title} className="creds-row" role="listitem">
                    <p className="mono-meta creds-row__date">{cred.date}</p>

                    <div className="creds-row__body">
                      <h4 className="ledger__role">{cred.title}</h4>
                      <p className="ledger__org">{cred.issuer}</p>
                      {cred.summary ? <p className="ledger__details">{cred.summary}</p> : null}
                    </div>

                    <div className="creds-row__meta">
                      {cred.certificateUrl ? (
                        <a
                          href={cred.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn--ghost"
                        >
                          Certificate PDF
                          <ArrowUpRight size={13} aria-hidden="true" />
                        </a>
                      ) : (
                        <span className="mono-meta">{cred.note}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ContactProps {
  onToast: (message: string) => void;
}

export function ContactSection({ onToast }: ContactProps) {
  const [copiedField, setCopiedField] = useState<"email" | "phone" | null>(null);

  const copyValue = async (field: "email" | "phone", value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      onToast(`Copied ${label} to clipboard`);
      window.setTimeout(() => setCopiedField(null), 2000);
    } catch {
      onToast(value);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();
    const subject = encodeURIComponent(`Software Engineering Inquiry — ${name || "Portfolio Visitor"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}${email ? ` (${email})` : ""}`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    onToast("Opening your email client…");
  };

  return (
    <section id="contact" className="section-band" aria-labelledby="contact-heading">
      <div className="container contact-layout">
        <div>
          <p className="section-kicker mono-meta">
            <span className="section-kicker__tick" aria-hidden="true" />
            04 // Contact
          </p>
          <h2 id="contact-heading" className="serif-section" style={{ marginBottom: 16 }}>
            Let’s build software that <em>holds up</em> in the real world.
          </h2>
          <p style={{ color: "var(--ink-2)", fontSize: 16, maxWidth: "48ch" }}>
            Open to junior software engineering roles (UI/UX, frontend, or full-stack), internships, and select product
            collaborations. I typically respond within 24 hours.
          </p>

          <div className="contact-list">
            <div className="contact-row">
              <div className="contact-row__left">
                <span className="mono-meta">EMAIL</span>
                <a href={`mailto:${PROFILE.email}`} className="contact-row__val">
                  {PROFILE.email}
                </a>
              </div>
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => copyValue("email", PROFILE.email, "email address")}
              >
                {copiedField === "email" ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                {copiedField === "email" ? "Copied" : "Copy"}
              </button>
            </div>

            <div className="contact-row">
              <div className="contact-row__left">
                <span className="mono-meta">PHONE · PH</span>
                <a href={PROFILE.phoneHref} className="contact-row__val">
                  {PROFILE.phone}
                </a>
              </div>
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => copyValue("phone", PROFILE.phone, "phone number")}
              >
                {copiedField === "phone" ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                {copiedField === "phone" ? "Copied" : "Copy"}
              </button>
            </div>

            <div className="contact-row">
              <div className="contact-row__left">
                <span className="mono-meta">GITHUB</span>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-row__val"
                >
                  {PROFILE.githubLabel}
                </a>
              </div>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost"
              >
                Profile
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>

            <div className="contact-row">
              <div className="contact-row__left">
                <span className="mono-meta">RESUME / CV</span>
                <span style={{ fontSize: 14.5, color: "var(--ink-2)" }}>
                  {PROFILE.resumeUrl ? "Updated PDF ready for download" : "Finalizing updated 2026 PDF — available on request"}
                </span>
              </div>
              {PROFILE.resumeUrl ? (
                <a href={PROFILE.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
                  <FileText size={14} aria-hidden="true" />
                  Download
                </a>
              ) : (
                <a
                  href={`mailto:${PROFILE.email}?subject=${encodeURIComponent("Resume Request — Christian Boyles")}`}
                  className="btn btn--ghost"
                >
                  <FileText size={14} aria-hidden="true" />
                  Request Copy
                </a>
              )}
            </div>
          </div>
        </div>

        <form className="inquiry-card" onSubmit={handleSubmit} aria-label="Send a direct message">
          <p className="mono-meta mono-meta--accent" style={{ marginBottom: 16 }}>
            DIRECT DISPATCH
          </p>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="contact-name" className="mono-meta">
                Your Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Alex Rivera · Engineering Manager"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="contact-email" className="mono-meta">
                Email Address
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="alex@company.com"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="contact-message" className="mono-meta">
                Role or Project Context
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                placeholder="Tell me about the team, product problem, or timeline…"
                required
              />
            </div>

            <button type="submit" className="btn btn--primary" style={{ width: "100%" }}>
              Compose Email
              <Send size={14} aria-hidden="true" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export function Colophon() {
  return (
    <footer className="colophon">
      <div className="container colophon__inner">
        <p className="mono-meta">
          © {new Date().getFullYear()} {PROFILE.fullName} · Baybay City, Philippines
        </p>

        <a href="#top" className="btn btn--ghost">
          Top
          <ArrowUp size={13} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
