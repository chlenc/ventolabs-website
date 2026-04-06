import { notFound } from "next/navigation";
import { servicesSlugs, getService } from "@/lib/services";
import { ServicePage } from "@/components/ServicePage";
import type { Metadata } from "next";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return servicesSlugs.map((slug) => ({ slug }));
}

const seoOverrides: Record<string, { title: string; description: string }> = {
  "ai-assistant": {
    title: "AI Assistant for Business — Telegram & WhatsApp Bots",
    description: "Deploy an AI assistant that captures leads, answers FAQ, and automates tasks in Telegram or WhatsApp. Launch in days, not months. Free setup included.",
  },
  "ai-automation": {
    title: "AI Process Automation — Connect CRM, Sheets & Tools",
    description: "Automate data entry, reports, and workflows across your CRM, spreadsheets, and task managers with AI-powered automation. Eliminate manual work.",
  },
  "ai-training": {
    title: "AI Training for Teams — Claude Code, Cursor & Workflows",
    description: "Hands-on AI training that sticks. We teach your team Claude Code, Cursor, and custom AI workflows — then measure adoption and productivity gains.",
  },
  "ai-workspace": {
    title: "Enterprise AI Workspace — Access Control & Governance",
    description: "Company-wide AI environment with managed subscriptions, role-based access, usage policies, and compliance guardrails. Scale AI adoption safely.",
  },
};

export function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const service = getService(slug);
    if (!service) return {};
    const seo = seoOverrides[slug];
    return {
      title: seo?.title ?? `${service.title} — AI Automation`,
      description: seo?.description ?? service.heroDescription,
    };
  });
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return <ServicePage service={service} />;
}
