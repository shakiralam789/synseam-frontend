import { Metadata } from "next";
import { getMetaTitle } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading, Eyebrow } from "@/components/Section";
import { Check, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: getMetaTitle("Pricing"),
  description: "Flexible plans for virtual assistant support, digital presence, and full operating team execution.",
};

const tiers = [
  {
    name: "Starter",
    price: "$",
    sub: "Basic virtual assistant support.",
    features: [
      "Part-time virtual assistant",
      "Admin, inbox, scheduling",
      "Light research tasks",
      "Weekly written report",
      "Single point of contact",
    ],
    cta: "Start with Starter",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$$",
    sub: "Dedicated assistant + website + SEO support.",
    features: [
      "Dedicated virtual assistant",
      "Website (WordPress / lightweight CMS)",
      "On-page + local SEO foundation",
      "Outreach & lead gen workflow",
      "Monthly optimization cycle",
    ],
    cta: "Choose Growth",
    highlight: true,
  },
  {
    name: "Scale",
    price: "$$$",
    sub: "Full system — experts, assistants, digital presence.",
    features: [
      "Expert network access",
      "Multi-assistant operating team",
      "Custom website + SEO program",
      "Ongoing execution & maintenance",
      "Embedded operations lead",
    ],
    cta: "Talk to us",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="border-b border-border/60">
        <div className="container-tight pt-20 pb-16 md:pt-28 text-center">
          <Eyebrow>Pricing</Eyebrow>
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold leading-[1.05] max-w-3xl mx-auto">
            Plans that scale with{" "}
            <span className="text-gradient">your pipeline.</span>
          </h1>
          <p className="mt-5 text-muted-foreground max-w-xl mx-auto">
            Engage one layer or run the whole stack. Every plan includes the same
            intake, SLAs and operating discipline.
          </p>
        </div>
      </section>

      <Section className="pt-16">
        <div className="grid gap-5 md:grid-cols-3 items-stretch">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col rounded-xl border bg-surface p-7 ${
                t.highlight
                  ? "border-primary/60 shadow-glow ring-1 ring-primary/30"
                  : "border-border/60"
              }`}
            >
              {t.highlight && (
                <span className="absolute -top-3 left-7 rounded-full border border-primary/50 bg-background px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest text-accent">
                  Most chosen
                </span>
              )}
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-semibold">{t.name}</h3>
                <span className="font-mono text-sm text-muted-foreground">{t.price}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{t.sub}</p>
              <ul className="mt-6 space-y-3 border-t border-border/60 pt-6">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 text-accent shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-border/60">
                <Button
                  asChild
                  className={`w-full ${
                    t.highlight
                      ? "bg-primary hover:bg-primary/90"
                      : "bg-secondary hover:bg-secondary/80 text-foreground"
                  }`}
                >
                  <Link href="/consult">{t.cta}</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="rounded-2xl border border-border/60 bg-surface p-10 md:p-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <SectionHeading
              eyebrow="Custom"
              title="Need something the tiers don't cover?"
              description="If you're scaling fast, white-labeling capacity, or running a multi-market SEO program — we'll build a custom plan."
            />
          </div>
          <Button asChild size="lg" variant="outline" className="border-border/70 shrink-0">
            <Link href="/consult">Request custom plan <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
