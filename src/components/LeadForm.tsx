"use client";

import { useState } from "react";
import { useLocale } from "./LocaleProvider";
import { getDictionary } from "@/lib/i18n";
import { notifyLead } from "@/lib/notify";
import { site } from "@/lib/site";
import { trackCtaClick } from "@/lib/analytics";

type Status = "idle" | "sending" | "success" | "error";
type Lead = { name: string; email: string; message: string };

/** Pre-filled mailto so the fallback path is one click, not a copy-paste. */
function mailtoHref(lead: Lead | null): string {
  if (!lead) return `mailto:${site.email}`;
  const subject = `Vento Labs — request from ${lead.name}`;
  const body = `Name: ${lead.name}\nEmail: ${lead.email}\n\n${lead.message}`;
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Low-friction lead capture: name + work email + free-text ask. Posts to the
 * notify function; if that isn't reachable (or the lead handler isn't deployed
 * yet), it falls back to a one-click pre-filled email so a lead is never lost.
 * The fallback conversion path for visitors who aren't ready to book a call.
 */
export function LeadForm({ location = "lead_form" }: { location?: string }) {
  const locale = useLocale();
  const dict = getDictionary(locale);
  const t = dict.leadForm;
  const [status, setStatus] = useState<Status>("idle");
  const [last, setLast] = useState<Lead | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !email || !message) return;

    const lead: Lead = { name, email, message };
    setLast(lead);
    setStatus("sending");
    trackCtaClick({ label: t.submit, location });
    const ok = await notifyLead(lead);
    setStatus(ok ? "success" : "error");
    if (ok) {
      form.reset();
      setLast(null);
    }
  }

  if (status === "success") {
    return (
      <div className="lead-form lead-form--done" role="status">
        <p className="lead-form__success">{t.success}</p>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={onSubmit}>
      <p className="lead-form__heading">{t.heading}</p>
      <p className="lead-form__sub">{t.subheading}</p>
      <div className="lead-form__row">
        <label className="lead-form__field">
          <span className="lead-form__label">{t.nameLabel}</span>
          <input
            name="name"
            type="text"
            required
            maxLength={200}
            autoComplete="name"
            placeholder={t.namePlaceholder}
          />
        </label>
        <label className="lead-form__field">
          <span className="lead-form__label">{t.emailLabel}</span>
          <input
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder={t.emailPlaceholder}
          />
        </label>
      </div>
      <label className="lead-form__field">
        <span className="lead-form__label">{t.messageLabel}</span>
        <textarea
          name="message"
          required
          maxLength={2000}
          rows={3}
          placeholder={t.messagePlaceholder}
        />
      </label>
      <div className="lead-form__actions">
        <button type="submit" className="lead-form__submit" disabled={status === "sending"}>
          {status === "sending" ? t.sending : t.submit}
        </button>
        <span className="lead-form__note">{t.privacyNote}</span>
      </div>
      {status === "error" && (
        <div className="lead-form__error" role="alert">
          <p>{t.error}</p>
          <a
            className="lead-form__submit lead-form__mailto"
            href={mailtoHref(last)}
            onClick={() => trackCtaClick({ label: t.mailtoCta, location: `${location}_mailto` })}
          >
            {t.mailtoCta} →
          </a>
        </div>
      )}
    </form>
  );
}
