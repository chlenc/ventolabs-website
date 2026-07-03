import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="section section--paper" style={{ minHeight: "55vh", display: "flex", alignItems: "center" }}>
      <div className="container container--narrow text-center">
        <p className="eyebrow">404</p>
        <h1 style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)", marginTop: "1rem" }}>
          This page doesn&rsquo;t exist.
        </h1>
        <p className="text-muted" style={{ marginTop: "1.5rem", fontSize: "1.05rem" }}>
          The link may be outdated — but the agents are still here.
        </p>
        <p style={{ marginTop: "2rem", display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link className="text-link" href="/">Home</Link>
          <Link className="text-link" href="/#services">Services</Link>
          <Link className="text-link" href="/cases/">Case studies</Link>
          <a className="text-link" href="mailto:alexey@ventolabs.com">alexey@ventolabs.com</a>
        </p>
      </div>
    </section>
  );
}
