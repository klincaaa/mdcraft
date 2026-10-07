"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Magnetic } from "@/components/motion/magnetic";

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
    "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-4 text-sm font-medium tracking-[0.14em] uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-corten";

  const styles = {
    primary: "bg-corten text-ink shadow-[0_0_48px_-12px_rgba(212,101,47,0.75)] hover:bg-corten-light",
    ghost: "bg-paper/5 text-paper ring-1 ring-paper/15 hover:bg-paper/10",
    outline: "border border-paper/25 bg-transparent text-paper hover:border-corten hover:text-corten-light",
  }[variant];

  return (
    <Magnetic>
      <Link href={href} className="group inline-flex">
        <motion.span
          className={cn(base, styles, className)}
          whileHover={reduce ? undefined : { scale: 1.03, y: -2 }}
          whileTap={reduce ? undefined : { scale: 0.97 }}
          transition={{ type: "spring", stiffness: 380, damping: 22 }}
        >
          <span className="relative z-10 font-mono">{children}</span>
          {variant === "primary" && !reduce ? (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-paper/20"
              initial={{ x: "-120%" }}
              whileHover={{ x: "120%" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            />
          ) : null}
        </motion.span>
      </Link>
    </Magnetic>
  );
}
