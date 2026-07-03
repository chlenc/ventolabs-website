"use client";

import { useState } from "react";
import { useLocale } from "./LocaleProvider";
import { getDictionary } from "@/lib/i18n";
import { notifyLead } from "@/lib/notify";
import { trackCtaClick } from "@/lib/analytics";

type Status = "idle" | "sending" | "success" | "error";

/**
 * Low-friction lead capture: name + work email + free-text ask, posted to the
 * existing Supabase notify function. The fallback conversion path for visitors
 * who aren't ready to book a 30-minute call.
 */
export function LeadForm({ location = "lead_form" }: { location?: string }) {
  const locale = useLocale();
  const dict = getDictionary(locale);
  const t = dict.leadForm;
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !email || !message) return;

    setStatus("sending");
    trackCtaClick({ label: t.submit, location });
    const ok = await notifyLead({ name, email, message });
    setStatus(ok ? "success" : "error");
    if (ok) form.reset();
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
        <p className="lead-form__error" role="alert">
          {t.error}
        </p>
      )}
    </form>
  );
}
