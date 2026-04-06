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
    title: "Custom AI Agents — Self-Hosted, Secure, 24/7",
    description: "We build self-hosted AI agents on OpenClaw, LangGraph, CrewAI. Controls your computer, integrates with Telegram, LinkedIn, WhatsApp. Free agent setup included.",
  },
  "ai-automation": {
    title: "AI Process Automation — n8n, Make.com & Custom Workflows",
    description: "Automate lead qualification, data sync, reporting, and workflows with AI-powered n8n and Make.com automations. Zero manual data entry.",
  },
  "ai-training": {
    title: "AI Consulting & Team Training — Claude Code, Cursor, MCP",
    description: "We install Claude Code, Cursor, and MCP servers, train your team on real workflows, and measure adoption at 30 and 60 days. AI consulting for projects of any scale.",
  },
  "ai-workspace": {
    title: "Enterprise AI Platform — AI Operating System for Business",
    description: "Full AI operating system: dedicated agents per department, Knowledge Vault, MCP Gateway, enterprise security. Deploy in 4 weeks. Pricing from Pilot to Enterprise.",
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
