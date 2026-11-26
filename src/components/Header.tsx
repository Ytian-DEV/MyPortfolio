import { Command, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { PROFILE } from "../content";

export const NAV_ITEMS = [
  { id: "work", num: "01", label: "Work" },
  { id: "stack", num: "02", label: "Capabilities" },
  { id: "experience", num: "03", label: "Experience" },
  { id: "contact", num: "04", label: "Contact" },
] as const;

interface HeaderProps {
  activeSection: string | null;
  theme: "light" | "dark";
  onToggleTheme: () => void;
  onOpenPalette: () => void;
}

function formatManilaTime(): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: PROFILE.timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date());
  } catch {
    return "UTC+8";
  }
}

export function Header({ activeSection, theme, onToggleTheme, onOpenPalette }: HeaderProps) {
  const [clock, setClock] = useState<string>(() => formatManilaTime());
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => setClock(formatManilaTime()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a href="#top" className="brand-lockup" aria-label={`${PROFILE.name} — back to top`}>
          <span className="brand-mark" aria-hidden="true">
            CB
          </span>
          <span className="brand-text">
            <span className="brand-name">{PROFILE.name}</span>
            <span className="brand-status">
              <span className="status-dot" aria-hidden="true" />
              Available · 2026
            </span>
          </span>
        </a>

        <nav className="header-nav" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`header-nav__link${isActive ? " is-active" : ""}`}
                aria-current={isActive ? "true" : undefined}
              >
                <span className="header-nav__num">{item.num}</span>
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="header-tools">
          <span className="clock-pill" title="Current local time in Baybay City, Philippines">
            {clock} PHT
          </span>

          <button
            type="button"
            className="tool-btn"
            onClick={onOpenPalette}
            aria-label="Open command menu (Ctrl or Command + K)"
          >
            <Command size={13} aria-hidden="true" />
            <span className="cmd-label-text">Jump</span>
            <kbd>K</kbd>
          </button>

          <button
            type="button"
            className="tool-btn"
            onClick={onToggleTheme}
            aria-label={theme === "light" ? "Switch to darkroom theme" : "Switch to daylight theme"}
            title={theme === "light" ? "Switch to Darkroom" : "Switch to Daylight"}
          >
            {theme === "light" ? <Moon size={14} aria-hidden="true" /> : <Sun size={14} aria-hidden="true" />}
            <span>{theme === "light" ? "Dark" : "Light"}</span>
          </button>

          <button
            type="button"
            className="tool-btn mobile-menu-btn"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileOpen ? <X size={16} aria-hidden="true" /> : <Menu size={16} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <nav id="mobile-nav-drawer" className="mobile-drawer" aria-label="Mobile navigation">
          <div className="mobile-drawer__links">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="mobile-drawer__link"
                onClick={() => setMobileOpen(false)}
              >
                <span>{item.label}</span>
                <span className="mono-meta mono-meta--accent">{item.num}</span>
              </a>
            ))}
          </div>
          <div className="mobile-drawer__meta">
            <span className="mono-meta">
              {PROFILE.location} · {clock} PHT
            </span>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
