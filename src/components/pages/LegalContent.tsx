"use client";

import { useLocale } from "@/components/LocaleProvider";
import { getDictionary, type Locale } from "@/lib/i18n";
import type { ReactNode } from "react";
import { href } from "@/lib/utils";

/**
 * Render a legal section entry which can be a markdown-ish paragraph (string)
 * with **bold** or [text](href) syntax, or a nested bullet list (array of
 * similar strings). Not a full markdown parser — just the subset we use in the
 * dictionaries.
 */
function renderInline(text: string, locale: Locale): ReactNode[] {
  const out: ReactNode[] = [];
  const segments = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).filter(Boolean);
  segments.forEach((seg, i) => {
    if (seg.startsWith("**") && seg.endsWith("**")) {
      out.push(<strong key={i}>{seg.slice(2, -2)}</strong>);
      return;
    }
    const linkMatch = seg.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, url] = linkMatch;
      const target = url.startsWith("mailto:") || url.startsWith("http") || url.startsWith("#")
        ? url
        : href(url.startsWith("/") ? url : `/${url}`, locale);
      out.push(
        <a key={i} href={target}>{label}</a>
      );
      return;
    }
    out.push(<span key={i}>{seg}</span>);
  });
  return out;
}

function renderContent(content: (string | string[])[], locale: Locale): ReactNode {
  return content.map((block, i) => {
    if (Array.isArray(block)) {
      return (
        <ul key={i}>
          {block.map((item, j) => (
            <li key={j}>{renderInline(item, locale)}</li>
          ))}
        </ul>
      );
    }
    return <p key={i}>{renderInline(block, locale)}</p>;
  });
}

export function PrivacyContent() {
  const locale = useLocale();
  const dict = getDictionary(locale);
  const p = dict.legal.privacy;

  return (
    <div className="legal">
      <div className="container container--narrow">
        <h1>{p.title}</h1>
        <p>{p.updated}</p>
        <p>{p.intro}</p>
        {p.sections.map((section) => (
          <div key={section.heading}>
            <h2>{section.heading}</h2>
            {renderContent(section.content, locale)}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TermsContent() {
  const locale = useLocale();
  const dict = getDictionary(locale);
  const t = dict.legal.terms;

  return (
    <div className="legal">
      <div className="container container--narrow">
        <h1>{t.title}</h1>
        <p>{t.updated}</p>
        {t.sections.map((section) => (
          <div key={section.heading}>
            <h2>{section.heading}</h2>
            {renderContent(section.content, locale)}
          </div>
        ))}
        <p style={{ marginTop: "3rem" }}>{renderInline(t.contactQuestion, locale)}</p>
      </div>
    </div>
  );
}
