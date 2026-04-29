"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* ───── FadeUp ─────
 * Fades + translates a child into view when it intersects the viewport. */
export function FadeUp({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLElement>(null);
  // Default to visible so SSR and first paint never show a blank page.
  // Elements below the fold re-hide after mount and animate in on scroll.
  const [shown, setShown] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    // Above-the-fold content stays visible — no animation, no flash.
    if (r.top < window.innerHeight) return;

    // Below the fold — hide, then reveal when it enters the viewport.
    setShown(false);
    const failsafe = window.setTimeout(() => setShown(true), 2500);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  // Cast Tag to a generic so we can attach a ref + style without TS friction
  // for the union of intrinsic elements.
  const Component = Tag as unknown as (
    p: React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }
  ) => React.JSX.Element;

  return (
    <Component
      ref={ref}
      className={`fade-up ${shown ? "revealed" : ""} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Component>
  );
}

/* ───── SplitText ─────
 * Splits a string into words and animates each word's vertical translate when
 * the parent enters the viewport. Intentionally word-level (not char) so
 * non-Latin scripts (RU, DE compounds) and dictionary swaps render predictably. */
export function SplitText({
  children,
  as: Tag = "span",
  className = "",
  delayOffset = 0,
}: {
  children: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  delayOffset?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight) {
      requestAnimationFrame(() => setShown(true));
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.01, rootMargin: "0px 0px -5% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const segments = String(children).split(/(\s+)/);
  const Component = Tag as unknown as (
    p: React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }
  ) => React.JSX.Element;

  let wordIdx = 0;
  return (
    <Component
      ref={ref}
      className={`split ${shown ? "revealed" : ""} ${className}`.trim()}
    >
      {segments.map((seg, i) => {
        if (/^\s+$/.test(seg)) return <span key={i}>{seg}</span>;
        const i2 = wordIdx++;
        return (
          <span key={i} className="split-word">
            <span
              className="split-char"
              style={{ ["--i" as string]: i2 + delayOffset }}
            >
              {seg}
            </span>
          </span>
        );
      })}
    </Component>
  );
}

/* ───── MagneticButton ─────
 * Attracts inner span toward cursor while hovering parent. Falls back to a
 * normal button on touch (no mousemove fired). */
function useMagnetic(strength = 0.25) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;
    const onMove = (e: MouseEvent) => {
      const r = parent.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const onLeave = () => {
      el.style.transform = "";
    };
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);
  return ref;
}

export function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  variant = "primary",
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "on-dark" | "on-forest";
  ariaLabel?: string;
}) {
  const innerRef = useMagnetic(0.22);
  const cls = `btn btn--${variant} ${className}`.trim();
  const inner = (
    <span ref={innerRef} className="magnetic">
      {children}
    </span>
  );
  if (href) {
    return (
      <a href={href} className={cls} aria-label={ariaLabel}>
        {inner}
      </a>
    );
  }
  return (
    <button className={cls} onClick={onClick} aria-label={ariaLabel} type="button">
      {inner}
    </button>
  );
}

/* ───── Icons ───── */
export function ArrowIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M3 13L13 3M13 3H5M13 3v8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GiftIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3.5" y="9.5" width="17" height="10.5" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M2.5 7.5h19v2.5h-19z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 7.5V20" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 7.5c-1-2-3-3.5-4.5-2.5s-.5 2.5 1 2.5H12zM12 7.5c1-2 3-3.5 4.5-2.5s.5 2.5-1 2.5H12z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlusIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function PhoneIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 4.5c0-.55.45-1 1-1h2.6c.5 0 .92.36 1 .85l.7 4.13a1 1 0 0 1-.27.86l-1.84 1.84a14.04 14.04 0 0 0 6.62 6.62l1.84-1.84a1 1 0 0 1 .86-.27l4.13.7c.49.08.85.5.85 1V20a1 1 0 0 1-1 1A16 16 0 0 1 5 5v-.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MailIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 6.5l8.5 6.5 8.5-6.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function TelegramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21.5 4.2 2.7 11.6c-.9.36-.9 1.65 0 2l4.7 1.6 1.8 5.7c.2.65 1 .85 1.5.4l2.7-2.4 4.7 3.5c.6.45 1.5.1 1.6-.65L21.95 5.3c.1-.75-.6-1.4-1.45-1.1Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="m9.2 15.2 7.8-6.4-5.4 7.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
