import { ReactNode } from "react";

const PillarCard = ({
  index,
  title,
  tag,
  description,
  bullets,
  icon,
}: {
  index: string;
  title: string;
  tag: string;
  description: string;
  bullets: string[];
  icon: ReactNode;
}) => (
  <div className="group relative rounded-xl border border-border/70 bg-surface p-6 shadow-card transition-colors hover:border-primary/40">
    <div className="flex items-center justify-between">
      <span className="font-mono text-xs text-muted-foreground">{index}</span>
      <span className="text-[10px] uppercase tracking-widest text-accent/90 font-medium">{tag}</span>
    </div>
    <div className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-md border border-border/70 bg-background text-accent">
      {icon}
    </div>
    <h3 className="mt-5 text-lg font-semibold">{title}</h3>
    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{description}</p>
    <ul className="mt-5 space-y-2 border-t border-border/60 pt-4">
      {bullets.map((b) => (
        <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
          <span className="mt-2 h-1 w-1 rounded-full bg-accent shrink-0" />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default PillarCard;
