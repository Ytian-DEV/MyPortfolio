import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Check, Code2, Copy, Database, Mail, Phone, Sparkles } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import portrait from "../assets/profile-headshot.webp";
import { ARSENAL, CAMPAIGN, MARQUEE, PROFILE, STATS, TIMELINE } from "../content";
import { Chip, CountUp, Eyebrow, GithubIcon, MagneticButton, Reveal, Sigil } from "./ui";

export function Stats() {
  return (
    <section className="stats" aria-label="At a glance">
      <div className="container stats__row">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="stat">
            <p className="stat__value">
              <CountUp to={s.value} pad={s.pad} />
              {s.suffix ? <span className="fire">{s.suffix}</span> : null}
            </p>
            <p className="label">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Marquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {items.map((m, i) => (
          <span key={i} className="marquee__item">
            {m} <span className="marquee__sep">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const ICONS = { code: Code2, database: Database, star: Sparkles };

export function Arsenal() {
  return (
    <section id="stack" className="section">
      <div className="container">
        <Reveal as="header" className="section__head">
          <div>
            <Eyebrow numeral="II">The arsenal</Eyebrow>
            <h2 className="display">Weapons of choice</h2>
          </div>
          <p className="muted section__desc">A modern, type-safe stack that takes an idea from Figma frame to production URL.</p>
        </Reveal>
        <div className="arsenal">
          {ARSENAL.map((a, i) => {
            const Icon = ICONS[a.icon];
            return (
              <Reveal key={a.title} delay={i * 0.1} as="article" className="panel arsenal__card">
                <span className="icon-box"><Icon size={22} /></span>
                <h3 className="heading">{a.title}</h3>
                <p className="muted">{a.blurb}</p>
                <div className="chips">{a.items.map((it) => <Chip key={it}>{it}</Chip>)}</div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Campaign() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const [active, setActive] = useState(reduce ? CAMPAIGN.length - 1 : -1);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!reduce) setActive(Math.min(CAMPAIGN.length - 1, Math.floor(v * CAMPAIGN.length * 0.999)));
  });

  return (
    <section id="process" className="section section--alt">
      <div className="container">
        <Reveal as="header" className="section__head">
          <div>
            <Eyebrow numeral="III">The campaign</Eyebrow>
            <h2 className="display">How I take a realm</h2>
          </div>
          <p className="muted section__desc">Four stages, every project. No surprises for clients, no rewrites for teams.</p>
        </Reveal>
        <div className="campaign" ref={ref}>
          <div className="campaign__track" aria-hidden="true">
            <motion.div className="campaign__fill" style={{ scaleX: reduce ? 1 : scaleX }} />
          </div>
          <ol className="campaign__steps">
            {CAMPAIGN.map((s, i) => (
              <li key={s.n} className={`step${i <= active ? " is-lit" : ""}${i === active ? " is-current" : ""}`}>
                <span className="step__num">{s.n}</span>
                <h3 className="heading">{s.title}</h3>
                <p className="muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function Chronicle() {
  return (
    <section id="journey" className="section">
      <div className="container">
        <Reveal as="header" className="section__head">
          <div>
            <Eyebrow numeral="IV">The chronicle</Eyebrow>
            <h2 className="display">The developer behind the dragon</h2>
          </div>
        </Reveal>
        <div className="chronicle">
          <Reveal as="article" className="panel about">
            <div className="about__photo">
              <img src={portrait} alt={`Portrait of ${PROFILE.fullName}`} loading="lazy" decoding="async" />
            </div>
            <h3 className="heading heading--sans">{PROFILE.fullName}</h3>
            <p className="muted">
              Fourth-year Computer Science student at Visayas State University who fell in love with
              shipping. I started on the front-end in 2024, grew into full-stack in 2025, and now build
              products end-to-end — schema, API, interface and deploy.
            </p>
            <p className="accent">“I care about the details users never notice — because they'd notice if they were missing.”</p>
          </Reveal>
          <Reveal delay={0.1} className="panel timeline">
            <p className="label label--fire">Campaign log</p>
            <ol>
              {TIMELINE.map((t) => (
                <li key={t.role} className={`timeline__item${t.active ? " is-active" : ""}`}>
                  <span className="timeline__dot" aria-hidden="true" />
                  <p className="label label--dim timeline__when">{t.when}</p>
                  <div>
                    <h3 className="timeline__role">
                      {t.role} <span className="timeline__org">· {t.org}</span>
                    </h3>
                    <p className="muted small">{t.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Contact({ onToast }: { onToast: (msg: string) => void }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      onToast("Email copied — the raven is ready.");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const from = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const subject = encodeURIComponent(`Portfolio inquiry from ${name || "a visitor"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}${from ? ` (${from})` : ""}`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    onToast("Opening your mail app…");
  };

  return (
    <section id="contact" className="section section--contact">
      <div className="container">
        <Reveal className="raven">
          <div className="raven__pitch">
            <Eyebrow numeral="V">Send a raven</Eyebrow>
            <h2 className="display">
              Have a realm that needs <span className="fire">building?</span>
            </h2>
            <p className="muted lead">Hiring for a full-stack or front-end role, or need a product built? I reply within 24 hours.</p>
            <ul className="lines">
              <li>
                <Mail size={20} className="fire" />
                <span className="label label--dim">Email</span>
                <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
                <button type="button" className="icon-btn icon-btn--sm" onClick={copyEmail} aria-label="Copy email address">
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </li>
              <li>
                <Phone size={20} className="fire" />
                <span className="label label--dim">Phone</span>
                <a href={PROFILE.phoneHref}>{PROFILE.phone}</a>
              </li>
              <li>
                <span className="fire"><GithubIcon /></span>
                <span className="label label--dim">GitHub</span>
                <a href={PROFILE.github} target="_blank" rel="noreferrer">{PROFILE.githubLabel}</a>
              </li>
            </ul>
          </div>
          <form className="raven__form" onSubmit={onSubmit}>
            <label>
              <span className="label">Your name</span>
              <input name="name" autoComplete="name" placeholder="Daenerys from Acme Inc." required />
            </label>
            <label>
              <span className="label">Email</span>
              <input name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
            </label>
            <label>
              <span className="label">Message</span>
              <textarea name="message" rows={4} placeholder="Tell me about the realm you're building…" required />
            </label>
            <MagneticButton type="submit" className="btn--block">Send the raven</MagneticButton>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__row">
        <p className="footer__brand">
          <Sigil size={28} /> © {new Date().getFullYear()} {PROFILE.name} — forged with React &amp; TypeScript.
        </p>
        <a href="#top" className="label label--blush">Back to the throne ↑</a>
      </div>
    </footer>
  );
}
