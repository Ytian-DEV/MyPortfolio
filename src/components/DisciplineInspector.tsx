import { Bookmark, CheckCircle2, Layers, Play, RotateCcw, ShieldCheck, Terminal } from "lucide-react";
import { useState, type KeyboardEvent } from "react";

type LensId = "design" | "frontend" | "backend";

const LENSES: { id: LensId; num: string; label: string }[] = [
  { id: "design", num: "01", label: "UI/UX Specs" },
  { id: "frontend", num: "02", label: "Frontend State" },
  { id: "backend", num: "03", label: "Backend & RLS" },
];

const SLOTS = [
  { id: "sem1-aug", label: "Aug 12 · Sem 1", rate: "₱3,800/mo" },
  { id: "sem1-sep", label: "Sep 01 · Sem 1", rate: "₱3,800/mo" },
  { id: "sem2-jan", label: "Jan 15 · Sem 2", rate: "₱3,600/mo" },
] as const;

export function DisciplineInspector() {
  const [lens, setLens] = useState<LensId>("design");
  const [showSpecs, setShowSpecs] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<string>(SLOTS[0].id);
  const [saved, setSaved] = useState(false);
  const [holdStatus, setHoldStatus] = useState<"idle" | "validating" | "confirmed">("idle");
  const [traceStep, setTraceStep] = useState<"ready" | "running" | "201">("ready");

  const activeSlot = SLOTS.find((s) => s.id === selectedSlot) ?? SLOTS[0];

  const onTabKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const idx = LENSES.findIndex((l) => l.id === lens);
    const nextIdx = e.key === "ArrowRight" ? (idx + 1) % LENSES.length : (idx - 1 + LENSES.length) % LENSES.length;
    setLens(LENSES[nextIdx].id);
  };

  const triggerHold = () => {
    if (holdStatus === "confirmed") {
      setHoldStatus("idle");
      return;
    }
    setHoldStatus("validating");
    window.setTimeout(() => {
      setHoldStatus("confirmed");
    }, 360);
  };

  const runBackendTrace = () => {
    setTraceStep("running");
    window.setTimeout(() => {
      setTraceStep("201");
    }, 380);
  };

  return (
    <aside className="inspector" aria-label="Interactive 3-lens engineering specimen">
      <div className="inspector__chrome">
        <span className="inspector__chrome-title">
          <Layers size={13} aria-hidden="true" />
          Architecture Specimen · Room Hold Flow
        </span>
        <span className="mono-meta">3-Lens View</span>
      </div>

      <div
        className="inspector__tabs"
        role="tablist"
        aria-label="Inspect component by engineering discipline"
        onKeyDown={onTabKeyDown}
      >
        {LENSES.map((item) => {
          const isActive = lens === item.id;
          return (
            <button
              key={item.id}
              type="button"
              id={`tab-${item.id}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              className={`inspector__tab${isActive ? " is-active" : ""}`}
              onClick={() => setLens(item.id)}
            >
              <span className="inspector__tab-num">{item.num}</span>
              <span className="inspector__tab-label">{item.label}</span>
              {isActive ? <span className="inspector__tab-bar" aria-hidden="true" /> : null}
            </button>
          );
        })}
      </div>

      <div
        id={`panel-${lens}`}
        role="tabpanel"
        aria-labelledby={`tab-${lens}`}
        className="inspector__body"
      >
        {lens !== "backend" ? (
          <>
            <div className="specimen-toolbar">
              <span className="mono-meta">
                {lens === "design" ? "Figma Tokens & WCAG Audit" : "Interactive React + TypeScript State"}
              </span>
              {lens === "design" ? (
                <button
                  type="button"
                  className={`mini-switch${showSpecs ? " is-on" : ""}`}
                  onClick={() => setShowSpecs((s) => !s)}
                  aria-pressed={showSpecs}
                >
                  Specs: {showSpecs ? "ON" : "OFF"}
                </button>
              ) : (
                <span className="mono-meta mono-meta--accent" aria-live="polite">
                  state: {holdStatus}
                </span>
              )}
            </div>

            <div className={`specimen-card${lens === "design" && showSpecs ? " has-specs" : ""}`}>
              {lens === "design" && showSpecs ? (
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span className="caliper-badge">pad: 18px · gap: 12px</span>
                  <span className="caliper-badge">AAA 15.1:1</span>
                </div>
              ) : null}

              <div className="specimen-head">
                <div>
                  <p className="specimen-title">Narra Studio · Unit 2B</p>
                  <p className="specimen-sub">320m to VSU Lower Gate · Fiber Wi-Fi</p>
                </div>
                <span className="specimen-price">{activeSlot.rate}</span>
              </div>

              <div className="slot-pills" role="group" aria-label="Select move-in window">
                {SLOTS.map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    className={`slot-pill${selectedSlot === slot.id ? " is-selected" : ""}`}
                    onClick={() => {
                      setSelectedSlot(slot.id);
                      if (holdStatus === "confirmed") setHoldStatus("idle");
                    }}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>

              <div className="specimen-actions">
                <button
                  type="button"
                  className={`save-btn${saved ? " is-saved" : ""}`}
                  onClick={() => setSaved((s) => !s)}
                  aria-pressed={saved}
                >
                  <Bookmark size={14} aria-hidden="true" />
                  {saved ? "Saved" : "Save"}
                </button>

                <button
                  type="button"
                  className={`hold-btn${holdStatus === "confirmed" ? " is-confirmed" : ""}`}
                  onClick={triggerHold}
                >
                  {holdStatus === "confirmed" ? (
                    <>
                      <CheckCircle2 size={14} aria-hidden="true" />
                      Slot Held · Click to Reset
                    </>
                  ) : holdStatus === "validating" ? (
                    "Checking availability…"
                  ) : (
                    "Hold Room Slot"
                  )}
                </button>
              </div>
            </div>

            {lens === "design" ? (
              <div className="token-grid">
                <div className="token-cell">
                  <div className="token-cell__top">
                    <span className="swatch-dot" style={{ background: "var(--bg-surface)" }} />
                    surface
                  </div>
                  <p className="token-cell__sub">8pt spatial grid</p>
                </div>
                <div className="token-cell">
                  <div className="token-cell__top">
                    <span className="swatch-dot" style={{ background: "var(--ink)" }} />
                    ink-primary
                  </div>
                  <p className="token-cell__sub">WCAG AAA body</p>
                </div>
                <div className="token-cell">
                  <div className="token-cell__top">
                    <span className="swatch-dot" style={{ background: "var(--accent)" }} />
                    vermilion
                  </div>
                  <p className="token-cell__sub">AA 5.0:1 signal</p>
                </div>
              </div>
            ) : (
              <div className="code-terminal" aria-label="Live component state snapshot">
                <div className="code-terminal__head">
                  <span>useRoomHold.ts · Live State</span>
                  <span>aria-live=&quot;polite&quot;</span>
                </div>
                <div>
                  <span className="code-kw">const</span> state = &#123; slot:{" "}
                  <span className="code-str">&quot;{selectedSlot}&quot;</span>, saved:{" "}
                  <span className="code-fn">{String(saved)}</span>, status:{" "}
                  <span className="code-str">&quot;{holdStatus}&quot;</span> &#125;;
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="specimen-toolbar">
              <span className="mono-meta">PostgreSQL RLS + Express Validation</span>
              <span className="mono-meta" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                <ShieldCheck size={13} className="mono-meta--accent" aria-hidden="true" />
                Zero Double-Book
              </span>
            </div>

            <div className="code-terminal">
              <div className="code-terminal__head">
                <span>migrations/04_room_holds_rls.sql</span>
                <span>PostgreSQL 16</span>
              </div>
              <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                <code>
                  <span className="code-cm">-- Enforce tenant isolation &amp; conflict-free slot holds</span>
                  {"\n"}
                  <span className="code-kw">CREATE POLICY</span>{" "}
                  <span className="code-str">&quot;student_insert_own_hold&quot;</span>
                  {"\n"}
                  <span className="code-kw">ON</span> public.room_holds <span className="code-kw">FOR INSERT</span>
                  {"\n"}
                  <span className="code-kw">WITH CHECK</span> (<span className="code-fn">auth.uid</span>() = student_id
                  {"\n  "}
                  <span className="code-kw">AND NOT EXISTS</span> (
                  {"\n    "}
                  <span className="code-kw">SELECT</span> 1 <span className="code-kw">FROM</span> public.room_holds h
                  {"\n    "}
                  <span className="code-kw">WHERE</span> h.unit_id = <span className="code-str">&apos;narra-2b&apos;</span>
                  {"\n      "}
                  <span className="code-kw">AND</span> h.slot_key ={" "}
                  <span className="code-str">&apos;{selectedSlot}&apos;</span>
                  {"\n  "}));
                </code>
              </pre>
            </div>

            <div className="trace-bar">
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
                <Terminal size={13} className="mono-meta--accent" aria-hidden="true" />
                {traceStep === "ready" && `POST /api/holds (${selectedSlot})`}
                {traceStep === "running" && "Verifying JWT & RLS constraint…"}
                {traceStep === "201" && "201 Created · RLS passed (34ms)"}
              </span>

              <button
                type="button"
                className="mini-switch is-on"
                onClick={traceStep === "201" ? () => setTraceStep("ready") : runBackendTrace}
              >
                {traceStep === "201" ? (
                  <>
                    <RotateCcw size={11} aria-hidden="true" />
                    Reset
                  </>
                ) : (
                  <>
                    <Play size={11} aria-hidden="true" />
                    Test Query
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
