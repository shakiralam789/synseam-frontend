"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="container-tight py-14 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-4 text-sm text-muted-foreground max-w-sm">
            From insight to execution to visibility — SynSeam runs the entire
            pipeline.
          </p>
          <Button asChild className="mt-6 bg-primary hover:bg-primary/90">
            <Link href="/consult">Book a Consultation</Link>
          </Button>
        </div>

        <div className="md:col-span-2">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Services
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link
                href="/services"
                className="hover:text-foreground text-muted-foreground transition-colors"
              >
                Expert Network
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="hover:text-foreground text-muted-foreground transition-colors"
              >
                Virtual Assistants
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="hover:text-foreground text-muted-foreground transition-colors"
              >
                Websites
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="hover:text-foreground text-muted-foreground transition-colors"
              >
                SEO
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Company
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link
                href="/about"
                className="hover:text-foreground text-muted-foreground transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/process"
                className="hover:text-foreground text-muted-foreground transition-colors"
              >
                Process
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className="hover:text-foreground text-muted-foreground transition-colors"
              >
                Pricing
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Contact
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="text-muted-foreground">hello@synseam.co</li>
            <li className="flex gap-2 pt-1">
              {["LinkedIn", "X", "GitHub"].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors text-[10px]"
                >
                  {s[0]}
                </a>
              ))}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="container-tight py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span suppressHydrationWarning>© {new Date().getFullYear()} SynSeam. All rights reserved.</span>
          <span className="font-mono">v1.0 · operational</span>
        </div>
      </div>
    </footer>
  );
}
