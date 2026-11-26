import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { CaseStudy } from "./components/CaseStudy";
import { CommandPalette } from "./components/CommandPalette";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { CapabilitiesSection, Colophon, ContactSection, ExperienceSection } from "./components/Sections";
import { Work } from "./components/Work";
import { PROJECTS, type Project } from "./content";

const OBSERVED_SECTIONS = ["top", "work", "stack", "experience", "contact"];

function readInitialTheme(): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function readProjectFromHash(): Project | null {
  if (typeof window === "undefined") return null;
  const match = window.location.hash.match(/^#project=([a-z0-9-]+)$/i);
  if (!match) return null;
  return PROJECTS.find((p) => p.id === match[1]) ?? null;
}

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">(readInitialTheme);
  const [activeProject, setActiveProject] = useState<Project | null>(readProjectFromHash);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number>();

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2600);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("cb-theme", next);
      } catch {
        // Ignore storage errors in private mode
      }
      const meta = document.getElementById("meta-theme-color");
      if (meta) meta.setAttribute("content", next === "dark" ? "#121110" : "#F6F3EC");
      return next;
    });
  }, []);

  const openProject = useCallback((project: Project) => {
    setActiveProject(project);
    window.history.replaceState(null, "", `#project=${project.id}`);
  }, []);

  const closeProject = useCallback(() => {
    setActiveProject(null);
    if (window.location.hash.startsWith("#project=")) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const found = readProjectFromHash();
      if (found) setActiveProject(found);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const elements = OBSERVED_SECTIONS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActiveSection(visible.target.id === "top" ? null : visible.target.id);
        }
      },
      { rootMargin: "-35% 0px -50% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <a href="#work" className="skip-link">
        Skip to selected work
      </a>

      <Header
        activeSection={activeSection}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenPalette={() => setPaletteOpen(true)}
      />

      <main>
        <Hero onToast={showToast} />
        <Work onOpenProject={openProject} />
        <CapabilitiesSection />
        <ExperienceSection />
        <ContactSection onToast={showToast} />
      </main>

      <Colophon />

      <CaseStudy
        project={activeProject}
        onClose={closeProject}
        onSelectProject={openProject}
        onToast={showToast}
      />

      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenProject={openProject}
        onToast={showToast}
      />

      <AnimatePresence>
        {toast ? (
          <motion.div
            className="status-toast"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.18 }}
          >
            {toast}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
