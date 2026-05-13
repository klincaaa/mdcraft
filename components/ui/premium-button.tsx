"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

type PremiumButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
};

export function PremiumButton({
  href,
  children,
  variant = "primary",
  className,
}: PremiumButtonProps) {
  const reduce = useReducedMotion();

  const base =
    "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400";

  const styles = {
    primary:
      "bg-gradient-to-r from-amber-500 to-amber-400 text-zinc-950 shadow-[0_0_40px_-10px_rgba(251,191,36,0.55)] hover:from-amber-400 hover:to-amber-300",
    ghost: "bg-white/5 text-zinc-100 ring-1 ring-white/10 hover:bg-white/10",
    outline:
      "border border-white/20 bg-transparent text-zinc-100 hover:border-amber-400/60 hover:text-white",
  }[variant];

  return (
    <Link href={href} className="group inline-flex cursor-pointer">
      <motion.span
        className={cn(base, styles, className)}
        whileHover={reduce ? undefined : { scale: 1.02, y: -1 }}
        whileTap={reduce ? undefined : { scale: 0.98 }}
        transition={{ type: "spring", stiffness: 380, damping: 22 }}
      >
        <span className="relative z-10">{children}</span>
        {variant === "primary" && !reduce ? (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-white/25"
            initial={{ x: "-120%" }}
            whileHover={{ x: "120%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        ) : null}
      </motion.span>
    </Link>
  );
}
