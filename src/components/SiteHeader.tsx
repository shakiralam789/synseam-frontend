"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

import { Logo } from "@/components/Logo";

const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/consult", label: "Consult" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-xl">
      <div className="container-tight flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center group">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => {
            const isActive =
              n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`relative px-3 py-1.5 text-sm rounded-md transition-colors ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
                {isActive && (
                  <span className="absolute inset-x-3 -bottom-[17px] h-px bg-linear-to-r from-primary to-accent" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className="hidden sm:inline-flex bg-primary hover:bg-primary/90 transition-all"
          >
            <Link href="/consult">Book a Consultation</Link>
          </Button>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/60"
          >
            {open ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-background animate-fade-up">
          <nav className="container-tight py-3 flex flex-col">
            {nav.map((n) => {
              const isActive =
                n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`py-2.5 text-sm ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
            <Button
              asChild
              className="mt-3 mb-2 bg-primary hover:bg-primary/90"
            >
              <Link href="/consult">Book a Consultation</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
