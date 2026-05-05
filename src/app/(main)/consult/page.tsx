import { Metadata } from "next";
import { getMetaTitle } from "@/lib/utils";
import { Section, Eyebrow } from "@/components/Section";
import ConsultationForm from "@/components/ConsultationForm";
import { Reveal } from "@/components/Reveal";
import { Clock, MessageSquare, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: getMetaTitle("Consultation"),
  description: "Book a consultation with SynSeam to map your execution path.",
};

export default function ConsultPage() {
  return (
    <>
      <section className="border-b border-border/60 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg radial-fade opacity-50" />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-[360px] w-[760px] rounded-full bg-primary/15 blur-[120px]" />
        <div className="container-tight relative pt-20 pb-14 md:pt-28 md:pb-20">
          <Reveal>
            <Eyebrow>Consultation</Eyebrow>
            <h1 className="mt-4 text-4xl md:text-6xl font-semibold leading-[1.05] max-w-3xl">
              Book a <span className="text-gradient">Consultation.</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
              Tell us what you want to solve. We&apos;ll help you choose the right
              execution path — expert insight, virtual assistants, websites, SEO,
              or the full growth system.
            </p>
          </Reveal>
        </div>
      </section>

      <Section className="pt-16">
        <div className="grid gap-10 md:grid-cols-[1fr_320px]">
          <Reveal>
            <ConsultationForm />
          </Reveal>
          <Reveal delay={120}>
            <aside className="space-y-4 md:sticky md:top-24 self-start">
              {[
                { icon: Clock, t: "Reply within 24h", d: "Every request is read by a human." },
                { icon: MessageSquare, t: "30-min intake call", d: "Optional. Confirm scope and operator match." },
                { icon: ShieldCheck, t: "NDA on request", d: "Mutual NDA available before discovery." },
              ].map(({ icon: Icon, t, d }) => (
                <div key={t} className="rounded-xl border border-border/60 bg-surface p-5 transition-colors hover:border-primary/40">
                  <Icon className="h-4 w-4 text-accent" />
                  <p className="mt-3 text-sm font-semibold">{t}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                </div>
              ))}
            </aside>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
