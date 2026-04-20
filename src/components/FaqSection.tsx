"use client";

import { useState } from "react";
import { FadeUp, PlusIcon } from "./Primitives";
import { useLocale } from "./LocaleProvider";
import { getDictionary } from "@/lib/i18n";

type FaqItem = { q: string; a: string };

export function FaqSection({
  items,
  heading,
}: {
  items: FaqItem[];
  heading?: string;
}) {
  const locale = useLocale();
  const dict = getDictionary(locale);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const finalHeading = heading ?? dict.faq.heading;

  return (
    <section className="section section--paper">
      <div className="container">
        <FadeUp>
          <div className="section-header">
            <div className="section-header__left">
              <p className="eyebrow">{dict.faq.eyebrow}</p>
              <h2>{finalHeading}</h2>
            </div>
            <div className="section-header__right">
              <p>{dict.finalCta.description}</p>
            </div>
          </div>
        </FadeUp>
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
                <span className="faq-icon">
                  <PlusIcon />
                </span>
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
