import { Command } from "cmdk";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { PROFILE, PROJECTS, type Project } from "../content";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
  onOpenProject: (p: Project) => void;
  onDracarys: () => void;
  onToast: (msg: string) => void;
}

const SECTIONS = [
  ["#work", "Selected conquests", "Work"],
  ["#stack", "The arsenal", "Stack"],
  ["#process", "The campaign", "Process"],
  ["#journey", "The chronicle", "Journey"],
  ["#contact", "Send a raven", "Contact"],
] as const;

export function CommandPalette({ open, setOpen, onOpenProject, onDracarys, onToast }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const run = (fn: () => void) => () => {
    setOpen(false);
    fn();
  };
  const go = (hash: string) => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });

  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="cmdk-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Command label="Command menu" className="cmdk">
              <Command.Input autoFocus placeholder="Where shall the raven fly?" />
              <Command.List>
                <Command.Empty>No realm by that name.</Command.Empty>
                <Command.Group heading="Navigate">
                  {SECTIONS.map(([hash, label, short]) => (
                    <Command.Item key={hash} value={`${short} ${label}`} onSelect={run(() => go(hash))}>
                      <span>{label}</span>
                      <span className="cmdk__hint">{short}</span>
                    </Command.Item>
                  ))}
                </Command.Group>
                <Command.Group heading="Case studies">
                  {PROJECTS.map((p) => (
                    <Command.Item key={p.id} value={`${p.title} ${p.kicker}`} onSelect={run(() => onOpenProject(p))}>
                      <span>{p.title}</span>
                      <span className="cmdk__hint">{p.kicker}</span>
                    </Command.Item>
                  ))}
                </Command.Group>
                <Command.Group heading="Actions">
                  <Command.Item
                    value="copy email"
                    onSelect={run(() => {
                      navigator.clipboard?.writeText(PROFILE.email).then(
                        () => onToast("Email copied — the raven is ready."),
                        () => onToast(PROFILE.email),
                      );
                    })}
                  >
                    <span>Copy email address</span>
                    <span className="cmdk__hint">{PROFILE.email}</span>
                  </Command.Item>
                  <Command.Item value="github open" onSelect={run(() => window.open(PROFILE.github, "_blank", "noopener"))}>
                    <span>Open GitHub</span>
                    <span className="cmdk__hint">Ytian-DEV</span>
                  </Command.Item>
                  <Command.Item value="dracarys fire dragon" onSelect={run(onDracarys)}>
                    <span>Dracarys</span>
                    <span className="cmdk__hint">🔥</span>
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
