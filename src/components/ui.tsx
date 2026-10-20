import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useRef, useState, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";

export function Eyebrow({ numeral, children }: { numeral: string; children: ReactNode }) {
  return (
    <p className="eyebrow">
      <span className="eyebrow__num">{numeral}</span>
      <span className="eyebrow__line" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return <span className="chip">{children}</span>;
}

/** Fades + lifts children in when they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "article" | "header";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}

type ButtonProps = {
  variant?: "primary" | "ghost";
  icon?: ReactNode | false;
  children: ReactNode;
  className?: string;
} & (
  | ({ href: string } & Omit<ComponentPropsWithoutRef<"a">, "className" | "children">)
  | ({ href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">)
);

/** Pill button that leans toward the cursor. */
export function MagneticButton({ variant = "primary", icon, children, className = "", ...rest }: ButtonProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const reset = () => { x.set(0); y.set(0); };

  const content = (
    <>
      <span>{children}</span>
      {icon === false ? null : <span className="btn__icon">{icon ?? <ArrowRight size={18} strokeWidth={2.2} />}</span>}
    </>
  );
  const cls = `btn btn--${variant} ${className}`;
  const motionProps = { style: { x, y }, onPointerMove: onMove, onPointerLeave: reset };

  if ("href" in rest && rest.href) {
    const { href, ...anchor } = rest as ComponentPropsWithoutRef<"a">;
    return (
      <motion.a ref={ref as React.Ref<HTMLAnchorElement>} className={cls} href={href} {...(anchor as object)} {...motionProps}>
        {content}
      </motion.a>
    );
  }
  return (
    <motion.button ref={ref as React.Ref<HTMLButtonElement>} type="button" className={cls} {...(rest as object)} {...motionProps}>
      {content}
    </motion.button>
  );
}

/** Counts from 0 to `to` once visible. */
export function CountUp({ to, pad = false }: { to: number; pad?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? to : 0);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) {
      setN(to);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1600);
          setN(Math.round(to * (1 - Math.pow(1 - t, 4))));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reduce, to]);

  return <span ref={ref}>{pad ? String(n).padStart(2, "0") : n}</span>;
}

export function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 19c-4 1.5-4-2-6-2.5M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 00-1.3-3.2 4.2 4.2 0 00-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 00-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 00-.1 3.2A4.6 4.6 0 004 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Sigil({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" className="sigil">
      <path d="M32 3 L57 12 V32 C57 46 46 56 32 61 C18 56 7 46 7 32 V12 Z" fill="#141016" stroke="#FF4F8B" strokeWidth="2" />
      <path d="M32 46 L25 40 L22 31 L19 24 L10 14 L21 20 L27 18 L32 16 L37 18 L43 20 L54 14 L45 24 L42 31 L39 40 Z" fill="#FF4F8B" />
      <ellipse cx="27.5" cy="28" rx="2.4" ry="1.4" fill="#0A0709" />
      <ellipse cx="36.5" cy="28" rx="2.4" ry="1.4" fill="#0A0709" />
      <path d="M29 40 L32 43 L35 40" stroke="#0A0709" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
