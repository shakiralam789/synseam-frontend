"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  need: z.string().min(1, "Pick an option"),
  timeline: z.string().trim().max(80).optional().or(z.literal("")),
  budget: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

const needs = [
  "Expert Network",
  "Virtual Assistant",
  "Website Design",
  "SEO",
  "Full Growth System",
];

const timelines = ["ASAP", "2–4 weeks", "1–3 months", "Exploring options"];
const budgets = ["Under $1k", "$1k – $5k", "$5k – $15k", "$15k – $50k", "$50k+"];

const ConsultationForm = ({ compact = false }: { compact?: boolean }) => {
  const [need, setNeed] = useState("");
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      company: String(fd.get("company") || "") || undefined,
      need,
      timeline: timeline || undefined,
      budget: budget || undefined,
      message: String(fd.get("message") || "") || undefined,
    };
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      toast({ title: "Please review the form", description: "Some fields need attention.", variant: "destructive" });
      return;
    }
    setErrors({});
    setSubmitting(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      const res = await fetch(`${API_URL}/api/consultations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message?.[0] || err?.message || "Submission failed");
      }

      toast({
        title: "Consultation requested",
        description: "We'll reply within one business day with next steps.",
      });
      (e.target as HTMLFormElement).reset();
      setNeed(""); setTimeline(""); setBudget("");
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: err instanceof Error ? err.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const Err = ({ name }: { name: string }) =>
    errors[name] ? <p className="mt-1.5 text-xs text-destructive">{errors[name]}</p> : null;

  return (
    <form
      onSubmit={onSubmit}
      className={`rounded-2xl border border-border/60 bg-surface ${compact ? "p-6 md:p-8" : "p-6 md:p-10"} space-y-6`}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" maxLength={100} className="mt-2 bg-background" placeholder="Jane Cole" required />
          <Err name="name" />
        </div>
        <div>
          <Label htmlFor="email">Work email</Label>
          <Input id="email" name="email" type="email" maxLength={255} className="mt-2 bg-background" placeholder="jane@company.com" required />
          <Err name="email" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="company">Company name</Label>
          <Input id="company" name="company" maxLength={120} className="mt-2 bg-background" placeholder="Acme Inc." />
          <Err name="company" />
        </div>
        <div>
          <Label>What do you need?</Label>
          <Select value={need} onValueChange={setNeed}>
            <SelectTrigger className="mt-2 bg-background">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {needs.map((n) => (
                <SelectItem key={n} value={n}>{n}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Err name="need" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label>Project timeline</Label>
          <Select value={timeline} onValueChange={setTimeline}>
            <SelectTrigger className="mt-2 bg-background">
              <SelectValue placeholder="Select timeline" />
            </SelectTrigger>
            <SelectContent>
              {timelines.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Budget range</Label>
          <Select value={budget} onValueChange={setBudget}>
            <SelectTrigger className="mt-2 bg-background">
              <SelectValue placeholder="Select budget" />
            </SelectTrigger>
            <SelectContent>
              {budgets.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          maxLength={1000}
          rows={5}
          className="mt-2 bg-background"
          placeholder="What outcome are you trying to ship? Anything currently blocking you?"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
        <p className="text-xs text-muted-foreground">
          We reply within one business day. No marketing list, ever.
        </p>
        <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90 transition-all" disabled={submitting}>
          {submitting ? "Submitting…" : "Request Consultation"} {!submitting && <ArrowRight className="ml-1.5 h-4 w-4" />}
        </Button>
      </div>
    </form>
  );
};

export default ConsultationForm;
