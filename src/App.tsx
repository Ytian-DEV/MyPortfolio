import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Command as CommandIcon, Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { CaseStudy } from "./components/CaseStudy";
import { CommandPalette } from "./components/CommandPalette";
import { Hero } from "./components/Hero";
import { Arsenal, Campaign, Chronicle, Contact, Footer, Marquee, Stats } from "./components/Sections";
import { MagneticButton, Sigil } from "./components/ui";
import { Work } from "./components/Work";
import { PROFILE, type Project } from "./content";

const NAV = [
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
];
const OBSERVED = ["top", "work", "stack", "process", "journey", "contact"];

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

export default function App() {
  const [project, setProject] = useState<Project | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [breathing, setBreathing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const toastTimer = useRef<number>();
  // "top" and "process" are observed too so no link stays lit while they are on screen.
  const active = useActiveSection(OBSERVED);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2600);
  }, []);

  const dracarys = useCallback(() => {
    setBreathing(true);
    showToast("Dracarys! 🔥");
    window.setTimeout(() => setBreathing(false), 1900);
  }, [showToast]);

  // Typing "dracarys" anywhere (outside inputs) wakes the dragon.
  useEffect(() => {
    let buffer = "";
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, [contenteditable]") || e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-8);
      if (buffer === "dracarys") {
        buffer = "";
        if (window.scrollY > window.innerHeight * 0.6) {
          window.scrollTo({ top: 0, behavior: "smooth" });
          window.setTimeout(dracarys, 600);
        } else dracarys();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dracarys]);

  // Cursor spotlight + nav background on scroll.
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        root.style.setProperty("--cx", `${e.clientX}px`);
        root.style.setProperty("--cy", `${e.clientY}px`);
      });
    };
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
  }, [menuOpen]);

  return (
    <div className="app">
      <a className="skip-link" href="#work">Skip to work</a>
      <motion.div className="progress" style={{ scaleX: progress }} aria-hidden="true" />
      <div className="spotlight" aria-hidden="true" />

      <header className={`nav${scrolled ? " is-scrolled" : ""}`}>
        <div className="container nav__row">
          <a href="#top" className="brand" aria-label={`${PROFILE.name} — home`}>
            <Sigil size={38} />
            <span className="brand__name">{PROFILE.name}</span>
          </a>
          <nav className="nav__links" aria-label="Primary">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} className={active === n.id ? "is-active" : undefined} aria-current={active === n.id ? "true" : undefined}>
                {n.label}
              </a>
            ))}
          </nav>
          <div className="nav__actions">
            <button type="button" className="kbd-btn" onClick={() => setPaletteOpen(true)} aria-label="Open command menu">
              <CommandIcon size={14} /> K
            </button>
            <MagneticButton href="#contact" className="btn--sm nav__hire">Hire me</MagneticButton>
            <button type="button" className="icon-btn nav__menu" onClick={() => setMenuOpen((o) => !o)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? "Close menu" : "Open menu"}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav id="mobile-menu" className="mobile-menu" aria-label="Mobile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {NAV.map((n, i) => (
              <motion.a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.06 }}
              >
                <span className="label label--fire">0{i + 1}</span> {n.label}
              </motion.a>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>

      <main>
        <Hero breathing={breathing} onDragonClick={dracarys} />
        <Stats />
        <Work onOpen={setProject} />
        <Marquee />
        <Arsenal />
        <Campaign />
        <Chronicle />
        <Contact onToast={showToast} />
      </main>
      <Footer />

      <CaseStudy project={project} onClose={() => setProject(null)} onNavigate={setProject} />
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} onOpenProject={setProject} onDracarys={dracarys} onToast={showToast} />

      <AnimatePresence>
        {breathing ? <motion.div key="flash" className="fire-flash" initial={{ opacity: 0 }} animate={{ opacity: [0, 0.6, 0] }} exit={{ opacity: 0 }} transition={{ duration: 1.4 }} aria-hidden="true" /> : null}
      </AnimatePresence>
      <AnimatePresence>
        {toast ? (
          <motion.div className="toast" role="status" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            {toast}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
