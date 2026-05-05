import { Metadata } from "next";
import { getMetaTitle } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, Eyebrow } from "@/components/Section";
import NetworkGlobe from "@/components/NetworkGlobe";
import PillarCard from "@/components/PillarCard";
import { Reveal } from "@/components/Reveal";
import {
  ArrowRight,
  Brain,
  Workflow,
  Globe,
  Search,
  Phone,
  Megaphone,
  Database,
  Wrench,
  PenTool,
  ServerCog,
  CheckCircle2,
  CircleDot,
  Sparkles,
  Building2,
  Rocket,
  LineChart,
} from "lucide-react";

export const metadata: Metadata = {
  title: getMetaTitle("Insight. Execution. Visibility."),
  description: "SynSeam connects expert insight, virtual assistants, SEO, and managed website systems to help businesses grow.",
};

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 grid-bg radial-fade opacity-60" />
        <div className="absolute left-1/4 top-0 h-[440px] w-[820px] rounded-full bg-primary/20 blur-[140px]" />
        <div className="absolute right-0 top-40 h-[280px] w-[420px] rounded-full bg-accent/10 blur-[120px]" />

        <div className="container-tight relative pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div className="animate-fade-up">
              <Eyebrow>System · Pipeline · Execution</Eyebrow>
              <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.04] tracking-tight">
                Access Experts.{" "}
                <span className="text-gradient">Execute Faster.</span>{" "}
                Grow Smarter.
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
                SynSeam connects expert insight, virtual assistants, SEO, and
                managed website systems to help businesses move from decision
                to execution without friction.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 transition-all">
                  <Link href="/consult">
                    Book a Consultation <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/services">Explore Services</Link>
                </Button>
              </div>

              <dl className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-px rounded-xl border border-border/60 bg-border/60 overflow-hidden max-w-2xl">
                {[
                  ["3", "Layer pipeline"],
                  ["48h", "Avg. assignment"],
                  ["100%", "Managed delivery"],
                  ["1", "Single contract"],
                ].map(([v, l]) => (
                  <div key={l} className="bg-background p-4">
                    <dt className="text-2xl font-semibold tracking-tight">{v}</dt>
                    <dd className="mt-1 text-xs text-muted-foreground">{l}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <Reveal delay={120}>
              <div className="relative">
                <div className="absolute -inset-6 rounded-3xl border border-border/40 bg-surface/40" />
                <div className="relative rounded-2xl border border-border/60 bg-surface p-4 md:p-6 shadow-card">
                  <div className="flex items-center justify-between border-b border-border/60 pb-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                      synseam.network · live
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">v1.0</span>
                  </div>
                  <NetworkGlobe className="w-full h-auto" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-b border-border/60 bg-surface/30">
        <div className="container-tight py-10">
          <Reveal>
            <p className="text-center text-sm text-muted-foreground">
              Built for startups, agencies, local businesses, and growth teams
              that need clarity and execution.
            </p>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-px bg-border/60 rounded-xl overflow-hidden border border-border/60">
              {[
                ["Expert Access", Brain],
                ["Managed Execution", Workflow],
                ["SEO Systems", Search],
                ["Website Maintenance", Wrench],
              ].map(([l, Icon]) => {
                const I = Icon as any;
                return (
                  <div key={l as string} className="bg-background flex items-center justify-center gap-2.5 py-4 px-3">
                    <I className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium">{l as string}</span>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CORE SYSTEM */}
      <Section id="system">
        <Reveal>
          <SectionHeading
            eyebrow="The core system"
            title="One System. Three Growth Layers."
            description="Each layer is independently strong, but it's the seam between them that turns thinking into outcomes."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            {
              i: "01", tag: "Insight", title: "Expert Network", icon: <Brain className="h-5 w-5" />,
              desc: "On-demand experts for research, validation and strategic clarity.",
              bullets: ["Expert calls", "Market & user research", "Surveys and validation"],
            },
            {
              i: "02", tag: "Execution", title: "Virtual Execution", icon: <Workflow className="h-5 w-5" />,
              desc: "Trained virtual assistants that execute the actual work — not just plans.",
              bullets: ["Admin & operations", "Outreach & lead gen", "Data handling & ops"],
            },
            {
              i: "03", tag: "Visibility", title: "Digital Presence", icon: <Globe className="h-5 w-5" />,
              desc: "Lightweight websites and SEO systems that compound growth over time.",
              bullets: ["WordPress & custom CMS", "Local & technical SEO", "Ongoing maintenance"],
            },
          ].map((p, idx) => (
            <Reveal key={p.title} delay={idx * 100}>
              <PillarCard
                index={p.i} tag={p.tag} title={p.title} icon={p.icon}
                description={p.desc} bullets={p.bullets}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* DIFFERENTIATION */}
      <section className="border-y border-border/60 bg-surface/40">
        <div className="container-tight py-20 md:py-28">
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>Why SynSeam</Eyebrow>
              <h2 className="mt-4 text-3xl md:text-4xl font-semibold leading-[1.1]">
                Most firms give advice. Others only execute.
                <br />
                <span className="text-muted-foreground">SynSeam connects both.</span>
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl">
                One pipeline takes you from raw insight to compounding visibility.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-12 rounded-xl border border-border/70 bg-background p-6 md:p-10 overflow-x-auto">
              <ol className="flex items-stretch gap-3 min-w-[680px]">
                {["Insight", "Execution", "Website", "SEO", "Maintenance", "Growth"].map((step, i, arr) => (
                  <li key={step} className="flex items-center gap-3 flex-1">
                    <div className="flex-1 rounded-lg border border-border/60 bg-surface px-4 py-5 text-center">
                      <div className="font-mono text-[10px] text-muted-foreground">0{i + 1}</div>
                      <div className="mt-2 text-sm font-semibold">{step}</div>
                    </div>
                    {i < arr.length - 1 && (
                      <ArrowRight className="h-4 w-4 text-accent shrink-0" />
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Services overview"
            title="Everything required to move from idea to growth."
          />
        </Reveal>
        <div className="mt-12 grid gap-px bg-border/60 rounded-xl overflow-hidden border border-border/60 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Phone, t: "Expert Calls & Research", d: "Vetted operators, scoped to your decision." },
            { icon: Workflow, t: "Virtual Assistant Support", d: "Embedded assistants for ongoing execution." },
            { icon: Megaphone, t: "Outreach & Lead Generation", d: "Targeted prospecting and follow-up." },
            { icon: Globe, t: "WordPress Websites", d: "Fast, lightweight, easy to maintain." },
            { icon: PenTool, t: "Custom CMS Websites", d: "Tailored CMS for unique business needs." },
            { icon: Search, t: "SEO & Visibility", d: "Local, on-page and technical optimization." },
            { icon: Wrench, t: "Website Maintenance", d: "Updates, monitoring, and security." },
            { icon: Database, t: "Data & Operations Support", d: "Cleaning, enrichment, and reporting." },
          ].map(({ icon: Icon, t, d }, i) => (
            <Reveal key={t} delay={(i % 4) * 80}>
              <div className="bg-background p-6 h-full transition-colors hover:bg-surface group">
                <Icon className="h-5 w-5 text-accent transition-transform group-hover:scale-110" />
                <h3 className="mt-4 font-semibold">{t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <section className="border-y border-border/60 bg-surface/40">
        <div className="container-tight py-20 md:py-28">
          <Reveal>
            <SectionHeading
              eyebrow="How it works"
              title="A clear path from request to result."
            />
          </Reveal>
          <ol className="mt-12 grid gap-4 md:grid-cols-5">
            {[
              ["Consult", "Capture goal, scope, and success metric."],
              ["Plan", "Map the right mix of experts and assistants."],
              ["Match", "Assign the operators. You meet them first."],
              ["Execute", "Ship the work through shared boards."],
              ["Optimize", "Maintain and compound results monthly."],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 80}>
                <li className="relative h-full rounded-xl border border-border/60 bg-background p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                    <CircleDot className="h-4 w-4 text-accent" />
                  </div>
                  <h3 className="mt-5 text-base font-semibold">{t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* CONSULTATION CTA (mid-page) */}
      <Section>
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-surface p-8 md:p-12">
            <div className="absolute -top-16 -right-10 h-56 w-56 rounded-full bg-primary/25 blur-3xl" />
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div className="max-w-xl">
                <Eyebrow>Consultation</Eyebrow>
                <h2 className="mt-4 text-2xl md:text-3xl font-semibold leading-tight">
                  Not sure what you need?{" "}
                  <span className="text-gradient">Start with a consultation.</span>
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Tell us your goal, and we&apos;ll map the right mix of experts,
                  assistants, SEO, and website support.
                </p>
              </div>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 shrink-0">
                <Link href="/consult">Book a Consultation <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* PRODUCTIZED OFFER */}
      <section className="border-y border-border/60 bg-surface/40">
        <div className="container-tight py-20 md:py-28 grid gap-10 md:grid-cols-2 md:items-center">
          <Reveal>
            <Eyebrow>Productized offer</Eyebrow>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold leading-[1.1]">
              Your Growth Stack, <span className="text-gradient">Managed.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              One scope. One contract. One operating team handling research,
              build, launch and ongoing growth.
            </p>
            <Button asChild className="mt-6 bg-primary hover:bg-primary/90">
              <Link href="/pricing">See plans <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
            </Button>
          </Reveal>
          <Reveal delay={120}>
            <ul className="rounded-xl border border-border/60 bg-background divide-y divide-border/60">
              {[
                ["Research & validation", Sparkles],
                ["Website setup", Globe],
                ["SEO foundation", Search],
                ["Virtual assistant execution", Workflow],
                ["Ongoing maintenance", ServerCog],
              ].map(([t, Icon]) => {
                const I = Icon as any;
                return (
                  <li key={t as string} className="flex items-center gap-3 px-5 py-4">
                    <I className="h-4 w-4 text-accent shrink-0" />
                    <span className="text-sm">{t as string}</span>
                    <CheckCircle2 className="ml-auto h-4 w-4 text-muted-foreground" />
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* USE CASES */}
      <Section>
        <Reveal>
          <SectionHeading eyebrow="Use cases" title="Built for teams that need outcomes, not deliverables." />
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            { icon: Rocket, t: "Startup market validation", d: "Test demand before you build the wrong thing." },
            { icon: LineChart, t: "Investor & industry research", d: "Structured market and competitor analysis." },
            { icon: Building2, t: "Local business SEO growth", d: "Website + local SEO + ongoing execution." },
            { icon: Workflow, t: "Agency execution support", d: "White-label execution capacity, on demand." },
            { icon: Megaphone, t: "Lead generation workflows", d: "Outreach engines run by trained assistants." },
            { icon: Wrench, t: "Website maintenance & updates", d: "Long-term care for sites you depend on." },
          ].map(({ icon: Icon, t, d }, i) => (
            <Reveal key={t} delay={(i % 3) * 80}>
              <div className="rounded-xl border border-border/60 bg-surface p-5 h-full transition-colors hover:border-primary/40">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border/60 text-accent">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="text-sm font-semibold">{t}</h3>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FINAL CTA */}
      <section className="pb-28">
        <div className="container-tight">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-surface p-10 md:p-16">
              <div className="absolute inset-0 grid-bg opacity-30" />
              <div className="absolute -top-20 right-0 h-60 w-60 rounded-full bg-primary/30 blur-3xl" />
              <div className="absolute -bottom-20 left-0 h-60 w-60 rounded-full bg-accent/20 blur-3xl" />
              <div className="relative max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
                  Build your execution pipeline with{" "}
                  <span className="text-gradient">SynSeam.</span>
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Tell us the goal. We assemble the layer — expert, assistant,
                  or full pipeline — and ship.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                    <Link href="/consult">Request Consultation</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-border/70">
                    <Link href="/services">Explore Services</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
