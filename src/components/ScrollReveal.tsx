"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Compatibility wrapper around the new fade-up reveal. Same API as before but
 * emits the editorial design's `fade-up` class instead of `reveal`.
 */
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const failsafe = window.setTimeout(() => el?.classList.add("revealed"), 2500);
    if (!el) return () => window.clearTimeout(failsafe);
    el.classList.remove("revealed");

    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight) {
      const t = window.setTimeout(() => el.classList.add("revealed"), 50 + delay);
      return () => {
        window.clearTimeout(t);
        window.clearTimeout(failsafe);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => el.classList.add("revealed"), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -20px 0px" }
    );

    requestAnimationFrame(() => observer.observe(el));
    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [delay]);

  return (
    <div ref={ref} className={`fade-up ${className}`.trim()} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
