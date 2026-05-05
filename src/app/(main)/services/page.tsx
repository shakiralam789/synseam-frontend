import { Metadata } from "next";
import { getMetaTitle } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, Eyebrow } from "@/components/Section";
import { Brain, Workflow, Globe, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: getMetaTitle("Services"),
  description: "SynSeam's integrated pipeline: Insight, Execution, and Visibility layers designed to compound growth.",
};

const groups = [
  {
    icon: Brain,
    tag: "Layer 01 · Insight",
    title: "Expert Network",
    desc: "Vetted experts for research, validation and decisions you don't want to guess on.",
    items: [
      ["Expert calls", "Targeted 30–60 min sessions with operators in your domain."],
      ["Market research", "Sector landscapes, competitor maps, demand signals."],
      ["Surveys & validation", "Quant + qual instruments to test demand and pricing."],
      ["Industry insights", "Briefs and decks tied to a specific decision."],
    ],
  },
  {
    icon: Workflow,
    tag: "Layer 02 · Execution",
    title: "Virtual Assistants",
    desc: "Trained assistants embedded into your workflow — they execute, not just schedule.",
    items: [
      ["Research assistants", "Continuous research, list building, synthesis."],
      ["Outreach & lead generation", "Targeted prospecting, sequenced outreach, follow-up."],
      ["Admin & operations", "Inbox, calendar, vendors, internal ops."],
      ["Data handling", "Cleaning, enrichment, reporting and dashboards."],
    ],
  },
  {
    icon: Globe,
    tag: "Layer 03 · Visibility",
    title: "Digital Presence",
    desc: "Lightweight, fast websites and SEO systems that get maintained — not just shipped.",
    items: [
      ["Website development", "WordPress, custom CMS and lightweight business sites."],
      ["Local SEO", "GBP, citations, geo pages, review systems."],
      ["On-page & technical SEO", "Information architecture, schema, performance."],
      ["Ongoing management", "Content, fixes, monitoring, reporting."],
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-border/60">
        <div className="container-tight pt-20 pb-16 md:pt-28">
          <Eyebrow>Services</Eyebrow>
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold leading-[1.05] max-w-3xl">
            One integrated pipeline.{" "}
            <span className="text-gradient">Three operating layers.</span>
          </h1>
          <p className="mt-5 text-muted-foreground max-w-2xl">
            These are not three separate services on a menu. They&apos;re layers of one
            system — engaged independently, but designed to compound when run together.
          </p>
        </div>
      </section>

      {groups.map(({ icon: Icon, tag, title, desc, items }, i) => (
        <Section key={title} className={i % 2 ? "bg-surface/40 border-y border-border/60" : ""}>
          <div className="grid gap-10 md:grid-cols-[280px_1fr]">
            <div>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border/60 bg-background text-accent">
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-5 font-mono text-xs text-muted-foreground uppercase tracking-widest">
                {tag}
              </p>
              <h2 className="mt-2 text-2xl md:text-3xl font-semibold">{title}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{desc}</p>
            </div>
            <ul className="grid gap-px bg-border/60 rounded-xl overflow-hidden border border-border/60 sm:grid-cols-2">
              {items.map(([t, d]) => (
                <li key={t} className="bg-background p-5">
                  <h3 className="text-sm font-semibold">{t}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ))}

      <Section>
        <div className="rounded-2xl border border-border/60 bg-surface p-10 md:p-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">
              Run all three layers as one operating team.
            </h2>
            <p className="mt-3 text-muted-foreground">
              That&apos;s the SynSeam stack — research, execution and visibility under
              one contract.
            </p>
          </div>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 shrink-0">
            <Link href="/pricing">See pricing <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
