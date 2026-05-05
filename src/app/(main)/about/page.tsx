import { Metadata } from "next";
import { getMetaTitle } from "@/lib/utils";
import { Section, SectionHeading, Eyebrow } from "@/components/Section";
import PipelineDiagram from "@/components/PipelineDiagram";

export const metadata: Metadata = {
  title: getMetaTitle("About"),
  description: "SynSeam connects insight, execution and growth into one operating pipeline.",
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-border/60">
        <div className="container-tight pt-20 pb-16 md:pt-28">
          <Eyebrow>About SynSeam</Eyebrow>
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold leading-[1.05] max-w-3xl">
            The seam between knowing,
            <br />
            <span className="text-gradient">doing and being seen.</span>
          </h1>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>The problem</Eyebrow>
            <h2 className="mt-4 text-2xl md:text-3xl font-semibold">
              Most businesses don&apos;t lack ideas. They lack execution.
            </h2>
            <ul className="mt-8 space-y-5">
              {[
                ["Businesses lack execution", "Strategy decks pile up. Nothing ships."],
                ["Experts don't execute", "They advise — then disappear."],
                ["Assistants don't think", "They schedule — they don't drive outcomes."],
                ["Agencies don't maintain", "They launch a site, then move on."],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-4">
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border/60 font-mono text-[10px] text-muted-foreground">
                    ×
                  </span>
                  <div>
                    <p className="font-medium">{t}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border/60 bg-surface p-8">
            <Eyebrow>The system</Eyebrow>
            <h2 className="mt-4 text-2xl md:text-3xl font-semibold">
              SynSeam connects insight, execution and growth into one operating
              pipeline.
            </h2>
            <p className="mt-4 text-muted-foreground">
              We don&apos;t sell hours, decks or pretty mockups. We sell a system that
              takes a goal and converts it into shipped work and compounding
              visibility.
            </p>
            <div className="mt-8 rounded-lg border border-border/60 bg-background p-4">
              <PipelineDiagram />
            </div>
          </div>
        </div>
      </Section>

      <section className="border-t border-border/60 bg-surface/40">
        <div className="container-tight py-20 md:py-28">
          <SectionHeading
            eyebrow="Operating principles"
            title="How we work — written down."
          />
          <div className="mt-12 grid gap-px rounded-xl overflow-hidden border border-border/60 bg-border/60 md:grid-cols-3">
            {[
              ["Systems > heroics", "Repeatable workflows beat last-minute talent."],
              ["Own the seam", "The handoff is where most projects die. We own it."],
              ["Maintenance is the product", "Launch is step one of an operating relationship."],
              ["Direct over polished", "Honest scopes. Honest reports. No theatre."],
              ["Specialists, not generalists", "Right layer, right operator, right time."],
              ["Ship in days, not quarters", "Bias to action with measurable checkpoints."],
            ].map(([t, d]) => (
              <div key={t} className="bg-background p-6">
                <h3 className="text-sm font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
