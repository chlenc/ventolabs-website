"use client";

import { useEffect } from "react";
import { openCalendly } from "@/components/CalendlyPopup";
import { site } from "@/lib/site";

type Tool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (input: unknown) => Promise<unknown> | unknown;
};

type ModelContext = {
  provideContext: (ctx: { tools: Tool[] }) => void;
};

declare global {
  interface Navigator {
    modelContext?: ModelContext;
  }
}

export function WebMCP() {
  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.modelContext) return;

    navigator.modelContext.provideContext({
      tools: [
        {
          name: "book_consultation",
          description:
            "Open Vento Labs' Calendly to book a 30-minute AI consultation with Alexey.",
          inputSchema: { type: "object", properties: {}, additionalProperties: false },
          execute: async () => {
            await openCalendly("webmcp");
            return { ok: true, url: "https://calendly.com/alexey-ventolabs/30min" };
          },
        },
        {
          name: "get_contact_info",
          description: "Return Vento Labs contact details (email, phone, Telegram, LinkedIn).",
          inputSchema: { type: "object", properties: {}, additionalProperties: false },
          execute: () => ({
            name: site.name,
            email: site.email,
            phone: site.phoneDisplay,
            telegram: site.telegram,
            whatsapp: site.whatsapp,
            linkedin: site.linkedin,
          }),
        },
      ],
    });
  }, []);

  return null;
}
