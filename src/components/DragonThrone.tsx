import { memo } from "react";

/*
 * Original "throne of blades + dragon" illustration. Geometry mirrors
 * src/assets/art/throne-dragon.svg (used in the Figma file); here it is split
 * into layers so wings, eyes, embers and fire can animate independently.
 */

const W = 800;
const CX = 400;
const f = (n: number) => Math.round(n * 10) / 10;
type Pt = [number, number];

const LEFT_WING: Pt[] = [[368, 312], [190, 128], [40, 96], [22, 250], [74, 392], [180, 470], [336, 430]];
const RIGHT_WING: Pt[] = LEFT_WING.map(([x, y]) => [W - x, y]);

function wingPath([S, Wr, T1, T2, T3, T4, B]: Pt[]) {
  const mid = (a: Pt, b: Pt, k: number): Pt => [
    a[0] + (b[0] - a[0]) * 0.5 + (Wr[0] - (a[0] + b[0]) / 2) * k,
    a[1] + (b[1] - a[1]) * 0.5 + (Wr[1] - (a[1] + b[1]) / 2) * k,
  ];
  const c1 = mid(T1, T2, 0.35), c2 = mid(T2, T3, 0.35), c3 = mid(T3, T4, 0.35), c4 = mid(T4, B, 0.3);
  const p = (q: Pt) => `${f(q[0])},${f(q[1])}`;
  return `M${p(S)} L${p(Wr)} L${p(T1)} Q${p(c1)} ${p(T2)} Q${p(c2)} ${p(T3)} Q${p(c3)} ${p(T4)} Q${p(c4)} ${p(B)} Z`;
}

interface Blade { body: string; shine: [number, number, number, number]; guard: [number, number, number, number]; hot: boolean }

const BLADES: Blade[] = (() => {
  const base: Pt = [CX, 610];
  const N = 17;
  const out: Blade[] = [];
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1) - 0.5;
    if (Math.abs(t) < 0.05) continue;
    const ang = (t * 120 * Math.PI) / 180;
    const len = 400 - Math.abs(t) * 300 + (i % 2 ? -36 : 0);
    const dx = Math.sin(ang), dy = -Math.cos(ang);
    const nx = -dy, ny = dx;
    const start = 70;
    const g: Pt = [base[0] + dx * start, base[1] + dy * start];
    const tip: Pt = [base[0] + dx * (start + len), base[1] + dy * (start + len)];
    const w = 7;
    const sh: Pt = [g[0] + dx * (len - 30), g[1] + dy * (len - 30)];
    const pts: Pt[] = [
      [g[0] + nx * w, g[1] + ny * w],
      [sh[0] + nx * w * 0.8, sh[1] + ny * w * 0.8],
      tip,
      [sh[0] - nx * w * 0.8, sh[1] - ny * w * 0.8],
      [g[0] - nx * w, g[1] - ny * w],
    ];
    const cg: Pt = [g[0] + dx * 4, g[1] + dy * 4];
    out.push({
      body: `M${pts.map((q) => `${f(q[0])},${f(q[1])}`).join(" L")} Z`,
      shine: [f(g[0] + dx * len * 0.08), f(g[1] + dy * len * 0.08), f(sh[0]), f(sh[1])],
      guard: [f(cg[0] + nx * 20), f(cg[1] + ny * 20), f(cg[0] - nx * 20), f(cg[1] - ny * 20)],
      hot: i % 3 === 0,
    });
  }
  return out;
})();

const EMBERS = (() => {
  let seed = 7;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  return Array.from({ length: 34 }, (_, i) => ({
    x: f(80 + rnd() * 640),
    y: f(60 + rnd() * 600),
    r: f(1 + rnd() * 3),
    hot: rnd() > 0.5,
    o: f(0.35 + rnd() * 0.6),
    delay: f((i % 9) * 0.7),
    dur: f(5 + (i % 5)),
  }));
})();

function Wing({ pts, side }: { pts: Pt[]; side: "l" | "r" }) {
  const [S, Wr, ...rest] = pts;
  const tips = rest.slice(0, 4);
  const claw = side === "l" ? `M${Wr[0]} ${Wr[1]} l-6 -22 l14 18 Z` : `M${Wr[0]} ${Wr[1]} l6 -22 l-14 18 Z`;
  return (
    <g className={`dt-wing dt-wing--${side}`} style={{ transformOrigin: `${S[0]}px ${S[1]}px` }}>
      <path d={wingPath(pts)} fill="url(#dt-wing)" stroke="#FF4F8B" strokeOpacity="0.55" strokeWidth="2" strokeLinejoin="round" />
      {tips.map((t, i) => (
        <line key={i} x1={Wr[0]} y1={Wr[1]} x2={t[0]} y2={t[1]} stroke="#F9B8D0" strokeOpacity="0.45" strokeWidth="2.5" strokeLinecap="round" />
      ))}
      <line x1={S[0]} y1={S[1]} x2={Wr[0]} y2={Wr[1]} stroke="#F9B8D0" strokeOpacity="0.6" strokeWidth="5" strokeLinecap="round" />
      <path d={claw} fill="#F9B8D0" fillOpacity="0.8" />
    </g>
  );
}

export const DragonThrone = memo(function DragonThrone({ breathing = false }: { breathing?: boolean }) {
  return (
    <svg className={`dragon-throne${breathing ? " is-breathing" : ""}`} viewBox="0 0 800 800" fill="none" role="img" aria-label="A dragon spreading its wings behind a throne forged from blades, engraved with a code symbol">
      <defs>
        <radialGradient id="dt-glow" cx="50%" cy="42%" r="50%">
          <stop offset="0" stopColor="#FF4F8B" stopOpacity="0.55" />
          <stop offset="0.45" stopColor="#FF4F8B" stopOpacity="0.16" />
          <stop offset="1" stopColor="#FF4F8B" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="dt-wing" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2B1724" />
          <stop offset="1" stopColor="#0E090D" />
        </linearGradient>
        <linearGradient id="dt-blade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F9B8D0" />
          <stop offset="0.5" stopColor="#8E7A84" />
          <stop offset="1" stopColor="#3A2C34" />
        </linearGradient>
        <linearGradient id="dt-stone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2A2028" />
          <stop offset="1" stopColor="#0A0709" />
        </linearGradient>
        <radialGradient id="dt-fire" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#FFF4E8" />
          <stop offset="0.35" stopColor="#FFB37A" />
          <stop offset="0.7" stopColor="#FF4F8B" />
          <stop offset="1" stopColor="#FF4F8B" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect className="dt-glow" width="800" height="800" fill="url(#dt-glow)" />

      <g className="dt-layer dt-layer--back">
        <Wing pts={LEFT_WING} side="l" />
        <Wing pts={RIGHT_WING} side="r" />
        <g className="dt-head">
          <path d="M374 330 C380 270 384 236 388 204 L412 204 C416 236 420 270 426 330 Z" fill="#170F15" stroke="#FF4F8B" strokeOpacity="0.4" strokeWidth="1.5" />
          <path d="M400 226 L380 208 L372 182 L362 156 L322 104 L370 138 L388 128 L400 120 L412 128 L430 138 L478 104 L438 156 L428 182 L420 208 Z" fill="#1E141B" stroke="#FF4F8B" strokeWidth="2" strokeLinejoin="round" />
          <path d="M388 128 L384 96 L396 122 Z M412 128 L416 96 L404 122 Z" fill="#F9B8D0" fillOpacity="0.7" />
          <g className="dt-eyes">
            <ellipse cx="385" cy="165" rx="6" ry="3.5" fill="#FF4F8B" />
            <ellipse cx="415" cy="165" rx="6" ry="3.5" fill="#FF4F8B" />
            <ellipse cx="385" cy="165" rx="2" ry="1.5" fill="#FFF" />
            <ellipse cx="415" cy="165" rx="2" ry="1.5" fill="#FFF" />
          </g>
          <path d="M392 214 L400 222 L408 214" stroke="#FFB37A" strokeWidth="2" strokeLinecap="round" />
        </g>
      </g>

      <g className="dt-layer dt-layer--mid">
        {BLADES.map((b, i) => (
          <g key={i} className="dt-blade" style={{ animationDelay: `${(i % 8) * 0.35}s` }}>
            <path d={b.body} fill="url(#dt-blade)" stroke="#0A0709" strokeWidth="1" />
            <line x1={b.shine[0]} y1={b.shine[1]} x2={b.shine[2]} y2={b.shine[3]} stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="1" />
            <line x1={b.guard[0]} y1={b.guard[1]} x2={b.guard[2]} y2={b.guard[3]} stroke={b.hot ? "#FF4F8B" : "#6E5A66"} strokeWidth="6" strokeLinecap="round" />
          </g>
        ))}
      </g>

      <g className="dt-layer dt-layer--front">
        <path d="M300 610 L300 360 Q300 300 400 250 Q500 300 500 360 L500 610 Z" fill="url(#dt-stone)" stroke="#FF4F8B" strokeWidth="2" />
        <path d="M322 600 L322 368 Q322 318 400 278 Q478 318 478 368 L478 600 Z" stroke="#F9B8D0" strokeOpacity="0.25" strokeWidth="1.5" />
        <g className="dt-code" stroke="#FF4F8B" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="368,392 340,424 368,456" />
          <line x1="412" y1="384" x2="388" y2="464" />
          <polyline points="432,392 460,424 432,456" />
        </g>
        <circle cx="400" cy="318" r="9" fill="#FF4F8B" className="dt-gem" />
        <circle cx="400" cy="318" r="4" fill="#F9B8D0" />
        <rect x="244" y="560" width="78" height="34" rx="14" fill="#1C161E" stroke="#FF4F8B" strokeOpacity="0.7" strokeWidth="1.5" />
        <rect x="478" y="560" width="78" height="34" rx="14" fill="#1C161E" stroke="#FF4F8B" strokeOpacity="0.7" strokeWidth="1.5" />
        <rect x="258" y="594" width="284" height="44" rx="6" fill="#241B22" stroke="#FF4F8B" strokeWidth="1.5" />
        <rect x="270" y="604" width="260" height="6" rx="3" fill="#FF4F8B" fillOpacity="0.5" />
        <rect x="220" y="652" width="360" height="26" rx="4" fill="#1A1318" stroke="#FF4F8B" strokeOpacity="0.5" strokeWidth="1.2" />
        <rect x="186" y="684" width="428" height="28" rx="4" fill="#1A1318" stroke="#FF4F8B" strokeOpacity="0.38" strokeWidth="1.2" />
        <rect x="150" y="718" width="500" height="30" rx="4" fill="#120D11" stroke="#FF4F8B" strokeOpacity="0.26" strokeWidth="1.2" />
      </g>

      <g className="dt-fire" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <ellipse key={i} cx="400" cy="226" rx="26" ry="38" fill="url(#dt-fire)" style={{ animationDelay: `${i * 0.06}s`, ["--a" as string]: `${(i - 3) * 14}deg` }} />
        ))}
      </g>

      <g className="dt-embers" aria-hidden="true">
        {EMBERS.map((e, i) => (
          <circle key={i} cx={e.x} cy={e.y} r={e.r} fill={e.hot ? "#FF4F8B" : "#FFB37A"} fillOpacity={e.o} style={{ animationDelay: `${e.delay}s`, animationDuration: `${e.dur}s` }} />
        ))}
      </g>
    </svg>
  );
});
