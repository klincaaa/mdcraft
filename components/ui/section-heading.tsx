import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
  index,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  index?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl space-y-5",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <div className={cn("flex items-center gap-4", align === "center" && "justify-center")}>
        {index ? (
          <span className="font-mono text-[11px] tracking-[0.28em] text-corten">{index}</span>
        ) : null}
        {eyebrow ? (
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.32em] text-corten">
            {eyebrow}
          </p>
        ) : null}
      </div>
      <h2 className="font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.9] uppercase text-paper">
        {title}
      </h2>
      {subtitle ? (
        <p className="max-w-xl font-serif text-lg leading-relaxed text-muted sm:text-xl">{subtitle}</p>
      ) : null}
    </div>
  );
}
