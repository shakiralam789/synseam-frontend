import { ReactNode } from "react";

export const Section = ({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) => (
  <section id={id} className={`py-20 md:py-28 ${className}`}>
    <div className="container-tight">{children}</div>
  </section>
);

export const Eyebrow = ({ children }: { children: ReactNode }) => (
  <span className="eyebrow">{children}</span>
);

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
}) => (
  <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
    {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
    <h2 className="mt-4 text-3xl md:text-4xl font-semibold leading-[1.1]">
      {title}
    </h2>
    {description && (
      <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
        {description}
      </p>
    )}
  </div>
);
