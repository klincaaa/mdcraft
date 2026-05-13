import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl space-y-4",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-500">{eyebrow}</p>
      ) : null}
      <h2 className="font-[family-name:var(--font-display)] text-3xl leading-none text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle ? <p className="text-base leading-relaxed text-zinc-400 sm:text-lg">{subtitle}</p> : null}
    </div>
  );
}
