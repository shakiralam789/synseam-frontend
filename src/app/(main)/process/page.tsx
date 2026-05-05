import { Metadata } from "next";
import { getMetaTitle } from "@/lib/utils";
import Link from "next/link";
import { Section, SectionHeading, Eyebrow } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: getMetaTitle("Process"),
  description: "A structured, five-stage workflow built for reliability and execution transparency.",
};

const steps = [
  {
    n: "01",
    title: "Intake",
    sla: "Within 24h",
    desc: "We capture the goal, success criteria, constraints and timeline. No discovery theatre — a structured brief.",
    items: ["Scoped objective", "Success metric", "Owner & cadence"],
  },
  {
    n: "02",
    title: "Matching",
    sla: "24–48h",
    desc: "We match the right layer — expert, assistant or full pipeline — to the work. You meet the operator before kickoff.",
    items: ["Expert shortlist", "Assistant assignment", "Resource plan"],
  },
  {
    n: "03",
    title: "Execution",
    sla: "Continuous",
    desc: "Work runs through shared boards. Weekly written updates, transparent task tracking, no status meetings unless needed.",
    items: ["Shared task board", "Weekly written update", "Async by default"],
  },
  {
    n: "04",
    title: "Delivery",
    sla: "On milestones",
    desc: "Deliverables are shipped against the brief — not interpreted. We document everything for the next phase.",
    items: ["Versioned outputs", "Handover doc", "Acceptance review"],
  },
  {
    n: "05",
    title: "Optimization",
    sla: "Ongoing",
    desc: "What we ship, we maintain. SEO, sites and systems are tuned monthly with reported metrics.",
    items: ["Monthly tuning", "Metric report", "Roadmap review"],
  },
];

export default function ProcessPage() {
  return (
    <>
      <section className="border-b border-border/60">
        <div className="container-tight pt-20 pb-16 md:pt-28">
          <Eyebrow>Process</Eyebrow>
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold leading-[1.05] max-w-3xl">
            A workflow you can{" "}
            <span className="text-gradient">audit, not just trust.</span>
          </h1>
          <p className="mt-5 text-muted-foreground max-w-2xl">
            Five stages. Defined SLAs. The same pipeline whether we&apos;re running an
            expert sprint or a full growth stack.
          </p>
        </div>
      </section>

      <Section>
        <ol className="relative space-y-4">
          {steps.map((s) => (
            <li
              key={s.n}
              className="grid gap-6 md:grid-cols-[120px_1fr_280px] rounded-xl border border-border/60 bg-surface p-6 md:p-8"
            >
              <div>
                <p className="font-mono text-xs text-muted-foreground">STAGE</p>
                <p className="mt-1 text-3xl font-semibold tracking-tight">{s.n}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-xl">{s.desc}</p>
              </div>
              <div className="md:border-l md:border-border/60 md:pl-6">
                <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
                  SLA · {s.sla}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {s.items.map((i) => (
                    <li key={i} className="text-sm text-muted-foreground flex gap-2">
                      <span className="mt-2 h-1 w-1 rounded-full bg-accent" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="pt-0">
        <div className="rounded-2xl border border-border/60 bg-surface p-10 md:p-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <SectionHeading title="Reliability is the feature." />
            <p className="mt-3 text-muted-foreground max-w-xl">
              Same intake, same SLAs, same operating discipline — whether you&apos;re a
              startup or an agency outsourcing execution.
            </p>
          </div>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 shrink-0">
            <Link href="/consult">Start intake <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
