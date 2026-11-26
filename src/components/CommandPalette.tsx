import { Command } from "cmdk";
import { ArrowUpRight, Copy, FolderOpen, Hash, Moon, Phone, Search, Sun, X } from "lucide-react";
import { useEffect } from "react";
import { PROFILE, PROJECTS, type Project } from "../content";
import { NAV_ITEMS } from "./Header";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
  onOpenProject: (project: Project) => void;
  onToast: (message: string) => void;
}

export function CommandPalette({
  open,
  onOpenChange,
  theme,
  onToggleTheme,
  onOpenProject,
  onToast,
}: CommandPaletteProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      } else if (e.key === "Escape" && open) {
        onOpenChange(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  if (!open) return null;

  const runAndClose = (fn: () => void) => {
    onOpenChange(false);
    fn();
  };

  return (
    <div
      className="cmdk-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onOpenChange(false);
      }}
    >
      <div className="cmdk-dialog" role="dialog" aria-modal="true" aria-label="Quick navigation and actions">
        <Command label="Command Menu">
          <div className="cmdk-input-row">
            <Search size={16} className="mono-meta" aria-hidden="true" />
            <Command.Input autoFocus placeholder="Jump to a case study, section, or action…" />
            <button
              type="button"
              className="tool-btn"
              style={{ height: 28, padding: "0 8px" }}
              onClick={() => onOpenChange(false)}
              aria-label="Close command menu"
            >
              <X size={13} aria-hidden="true" />
            </button>
          </div>

          <Command.List>
            <Command.Empty>No matching projects or commands.</Command.Empty>

            <Command.Group heading="Case Studies">
              {PROJECTS.map((project) => (
                <Command.Item
                  key={project.id}
                  value={`${project.title} ${project.subtitle} ${project.stack.join(" ")}`}
                  onSelect={() => runAndClose(() => onOpenProject(project))}
                >
                  <span className="cmdk-item-left">
                    <FolderOpen size={14} className="mono-meta--accent" aria-hidden="true" />
                    <span>{project.title}</span>
                  </span>
                  <span className="mono-meta">{project.disciplineLabel}</span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Sections">
              {NAV_ITEMS.map((nav) => (
                <Command.Item
                  key={nav.id}
                  value={`Go to ${nav.label}`}
                  onSelect={() =>
                    runAndClose(() => {
                      document.getElementById(nav.id)?.scrollIntoView({ behavior: "smooth" });
                    })
                  }
                >
                  <span className="cmdk-item-left">
                    <Hash size={14} aria-hidden="true" />
                    <span>{nav.label}</span>
                  </span>
                  <span className="mono-meta">{nav.num}</span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Preferences & Contact">
              <Command.Item
                value="Toggle theme light dark mode daylight darkroom"
                onSelect={() => runAndClose(onToggleTheme)}
              >
                <span className="cmdk-item-left">
                  {theme === "light" ? <Moon size={14} aria-hidden="true" /> : <Sun size={14} aria-hidden="true" />}
                  <span>Switch to {theme === "light" ? "Darkroom" : "Daylight"} theme</span>
                </span>
                <span className="mono-meta">Theme</span>
              </Command.Item>

              <Command.Item
                value={`Copy email ${PROFILE.email}`}
                onSelect={() =>
                  runAndClose(async () => {
                    await navigator.clipboard.writeText(PROFILE.email);
                    onToast(`Copied ${PROFILE.email}`);
                  })
                }
              >
                <span className="cmdk-item-left">
                  <Copy size={14} aria-hidden="true" />
                  <span>Copy Email Address</span>
                </span>
                <span className="mono-meta">{PROFILE.email}</span>
              </Command.Item>

              <Command.Item
                value={`Copy phone ${PROFILE.phone}`}
                onSelect={() =>
                  runAndClose(async () => {
                    await navigator.clipboard.writeText(PROFILE.phone);
                    onToast(`Copied ${PROFILE.phone}`);
                  })
                }
              >
                <span className="cmdk-item-left">
                  <Phone size={14} aria-hidden="true" />
                  <span>Copy Phone Number</span>
                </span>
                <span className="mono-meta">{PROFILE.phone}</span>
              </Command.Item>

              <Command.Item
                value="Open GitHub profile Ytian-DEV"
                onSelect={() =>
                  runAndClose(() => {
                    window.open(PROFILE.github, "_blank", "noopener,noreferrer");
                  })
                }
              >
                <span className="cmdk-item-left">
                  <ArrowUpRight size={14} aria-hidden="true" />
                  <span>Open GitHub Profile</span>
                </span>
                <span className="mono-meta">Ytian-DEV</span>
              </Command.Item>
            </Command.Group>
          </Command.List>

          <div className="cmdk-footer">
            <span>↑↓ Navigate · ↵ Select</span>
            <span>ESC to close</span>
          </div>
        </Command>
      </div>
    </div>
  );
}
