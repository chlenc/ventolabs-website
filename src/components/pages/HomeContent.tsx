"use client";

import { useEffect, useRef, useState } from "react";
import { FadeUp, MagneticButton, ArrowIcon, CheckIcon, GiftIcon } from "@/components/Primitives";
import { HeroSection } from "@/components/HeroSection";
import { TrustBar } from "@/components/TrustBar";
import { FaqSection } from "@/components/FaqSection";
import { useLocale } from "@/components/LocaleProvider";
import { getDictionary } from "@/lib/i18n";
import { servicesSlugs } from "@/lib/services";
import { asset, href } from "@/lib/utils";

const roiLinks = [
  "https://www.nber.org/papers/w31161",
  "https://www.science.org/doi/10.1126/science.adh2586",
  "https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/",
];

const serviceImages: Record<string, string> = {
  "ai-assistant": "/images/page-ai-agent.jpg",
  "ai-automation": "/images/page-automation.png",
  "ai-training": "/images/service-ai-training.jpg",
  "ai-workspace": "/images/service-ai-workspace.jpg",
};

const caseCards = [
  {
    key: "content-factory",
    company: "Content Factory",
    industry: "E-commerce / Marketplaces",
    img: "/images/case-content-factory.png",
    metric: "SKU → flow",
    title: "Turn a catalog into a stream of discovery content across channels.",
  },
  {
    key: "supplier-agent",
    company: "Supplier Agent",
    industry: "Supplier Operations",
    img: "/images/case-supplier-agent.png",
    metric: "Chaos → structure",
    title: "Emails, chats and price lists become live catalog updates by rule.",
  },
  {
    key: "erp-agent",
    company: "1C Agent",
    industry: "Enterprise / 1C",
    img: "/images/case-erp-agent.png",
    metric: "Safe by role",
    title: "A permissioned AI layer over 1C with dev and manager flows.",
  },
];

function useCountUp(target: number, duration = 1800, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return val;
}

function StatCounter({ value, prefix = "", suffix = "", start }: {
  value: number; prefix?: string; suffix?: string; start: boolean;
}) {
  const n = useCountUp(value, 1800, start);
  return <span>{prefix}{n}{suffix}</span>;
}

function parseStat(stat: string): { prefix: string; value: number; suffix: string } {
  // Accept: ASCII +/-, tilde, en-dash (–), em-dash (—), minus sign (−), x/× multipliers.
  const m = stat.match(/^([+\-~–—−×x]?)\s*(\d+(?:\.\d+)?)(.*)$/);
  if (!m) return { prefix: "", value: 0, suffix: stat };
  return {
    prefix: m[1] === "-" ? "−" : m[1],
    value: parseFloat(m[2]),
    suffix: m[3] || "",
  };
}

export function HomeContent() {
  const locale = useLocale();
  const dict = getDictionary(locale);

  // Trigger stat counters when section enters view
  const statsRef = useRef<HTMLElement>(null);
  const [statsShown, setStatsShown] = useState(false);
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight) {
      setStatsShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStatsShown(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <HeroSection />
      <TrustBar />

      {/* Services — three editorial cards */}
      <section className="section section--paper" id="services">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <div className="section-header__left">
                <p className="eyebrow">{dict.services.eyebrow}</p>
                <h2>{dict.services.heading}</h2>
              </div>
              <div className="section-header__right">
                <p>
                  We cover the full cycle — from idea to production release. Every
                  engagement starts with a free AI agent, so you see value before
                  you commit.
                </p>
              </div>
            </div>
          </FadeUp>
          <div className="service-grid">
            {servicesSlugs.map((slug, i) => {
              const s = dict.services_pages[slug];
              if (!s) return null;
              return (
                <FadeUp key={slug} delay={i * 100}>
                  <a
                    href={href(`/services/${slug}`, locale)}
                    className="service-card"
                  >
                    <div className="service-card__image">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={asset(serviceImages[slug])} alt={s.title} loading="lazy" />
                      <div className="service-card__wordmark">
                        <span>Vento</span>
                        <span>Labs</span>
                      </div>
                      <div className="service-card__arrow">
                        <ArrowIcon size={14} />
                      </div>
                    </div>
                    <div className="service-card__body">
                      <h3>{s.title}</h3>
                      <p>{s.cardSummary}</p>
                    </div>
                  </a>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process — forest section */}
      <section className="section section--forest" id="process">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <div className="section-header__left">
                <p className="eyebrow">{dict.solution.eyebrow}</p>
                <h2>{dict.solution.heading}</h2>
              </div>
              <div className="section-header__right">
                <p>
                  Three phases, zero fluff. We start small, prove value, then
                  scale — so you&apos;re never stuck paying for something that
                  doesn&apos;t work.
                </p>
              </div>
            </div>
          </FadeUp>
          <ul className="process-list">
            {dict.solution.steps.map((s, i) => (
              <FadeUp key={s.title} delay={i * 100} as="li" className="process-row">
                <div className="process-row__num">
                  0{i + 1} / 0{dict.solution.steps.length}
                </div>
                <h3 className="process-row__title">
                  {i === 1 ? <em className="italic">{s.title}</em> : s.title}
                </h3>
                <p className="process-row__desc">{s.description}</p>
              </FadeUp>
            ))}
          </ul>
        </div>
      </section>

      {/* Stats / ROI */}
      <section className="section section--paper" ref={statsRef}>
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <div className="section-header__left">
                <p className="eyebrow">{dict.roi.eyebrow}</p>
                <h2>{dict.roi.heading}</h2>
              </div>
              <div className="section-header__right">
                <p>{dict.roi.lead}</p>
              </div>
            </div>
          </FadeUp>
          <div className="stats-grid">
            {dict.roi.cards.map((card, i) => {
              const parsed = parseStat(card.stat);
              return (
                <FadeUp key={card.source} delay={i * 120}>
                  <a
                    href={roiLinks[i]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="stat"
                  >
                    <div className="stat__source">
                      <span>{card.source}</span>
                      <ArrowIcon size={14} />
                    </div>
                    <div className="stat__num">
                      <StatCounter
                        prefix={parsed.prefix}
                        value={parsed.value}
                        suffix={parsed.suffix}
                        start={statsShown}
                      />
                      <sup>{card.statLabel}</sup>
                    </div>
                    <p className="stat__desc">{card.description}</p>
                    <p className="stat__sample">{card.sample}</p>
                  </a>
                </FadeUp>
              );
            })}
          </div>
          <FadeUp>
            <p
              className="text-muted text-center"
              style={{
                marginTop: "2rem",
                fontSize: "0.85rem",
                maxWidth: "640px",
                marginInline: "auto",
              }}
            >
              {dict.roi.disclaimer}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Cases — 3 image cards */}
      <section className="section section--paper" id="cases">
        <div className="container">
          <FadeUp>
            <div className="section-header">
              <div className="section-header__left">
                <p className="eyebrow">{dict.casesIntro.eyebrow}</p>
                <h2>
                  Real businesses.<br />
                  <em className="italic">Real</em> results.
                </h2>
              </div>
              <div className="section-header__right">
                <p>{dict.casesIntro.description}</p>
              </div>
            </div>
          </FadeUp>
          <div className="cases-grid">
            {caseCards.map((c, i) => (
              <FadeUp key={c.key} delay={i * 120}>
                <a href={href(`/cases/${c.key}`, locale)} className="case">
                  <div
                    className="case__img"
                    style={{ backgroundImage: `url(${asset(c.img)})` }}
                  />
                  <div className="case__scrim" />
                  <div className="case__metric">{c.metric}</div>
                  <div>
                    <div className="case__meta">
                      <span>{c.company}</span>
                      <span>{c.industry}</span>
                    </div>
                    <div className="case__title">{c.title}</div>
                  </div>
                </a>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Lead magnet — forest */}
      <section className="section section--forest" id="book">
        <div className="container">
          <FadeUp>
            <div className="magnet__gift">
              <span className="magnet__giftIcon">
                <GiftIcon size={18} />
              </span>
              <span>{dict.leadMagnet.giftLabel}</span>
            </div>
          </FadeUp>
          <div className="magnet">
            <FadeUp>
              <div>
                <h2>{dict.leadMagnet.title}</h2>
                <div style={{ marginTop: "2rem" }}>
                  <MagneticButton href="#book" variant="on-forest">
                    {dict.leadMagnet.cta} <ArrowIcon />
                  </MagneticButton>
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={200}>
              <div className="magnet__list">
                {dict.leadMagnet.items.map((it) => (
                  <div key={it} className="magnet__item">
                    <span className="magnet__check">
                      <CheckIcon size={22} />
                    </span>
                    <p>{it}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection items={dict.faq.items} />

      {/* Final CTA — ink */}
      <section className="section section--ink">
        <div className="container">
          <div className="cta">
            <FadeUp>
              <div>
                <p className="eyebrow">Start here</p>
                <h2 style={{ marginTop: "1.5rem" }}>{dict.finalCta.heading}</h2>
                <p
                  style={{
                    marginTop: "1.5rem",
                    fontSize: "1.05rem",
                    color: "rgba(246,244,238,0.6)",
                  }}
                >
                  {dict.finalCta.description}
                </p>
                <div className="cta__row">
                  <MagneticButton href="#book" variant="on-dark">
                    {dict.finalCta.cta} <ArrowIcon />
                  </MagneticButton>
                  <MagneticButton
                    href="mailto:alexey@ventolabs.com"
                    variant="ghost"
                  >
                    alexey@ventolabs.com
                  </MagneticButton>
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={200}>
              <div className="cta__visual cta__visual--image">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset("/images/ai-assistant-box.png")}
                  alt="Free AI agent"
                  className="cta__image"
                  loading="lazy"
                />
                <div className="cta__label">Vento Labs · VL/free_agent_v1</div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
