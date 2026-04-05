"use client";

import { useState } from "react";

type FaqItem = { q: string; a: string };

export function FaqSection({
  items,
  heading = "Frequently asked questions",
}: {
  items: FaqItem[];
  heading?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section">
      <div className="container container--narrow">
        <div className="section-header centered">
          <p className="eyebrow">FAQ</p>
          <h2>{heading}</h2>
        </div>
        <div className="faq-list">
          {items.map((item, i) => (
            <div
              key={i}
              className="faq-item"
              data-open={openIndex === i ? "true" : "false"}
            >
              <button
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span>{item.q}</span>
                <svg className="faq-icon" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
