"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <header className="relative overflow-hidden border-b border-white/10 bg-zinc-950 pb-14 pt-24 sm:pb-20 sm:pt-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(245,158,11,0.15),transparent)]" />
      <Container className="relative">
        {eyebrow ? (
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-500"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {eyebrow}
          </motion.p>
        ) : null}
        <motion.h1
          className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight text-white sm:text-5xl md:text-6xl"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.5 }}
        >
          {title}
        </motion.h1>
        {subtitle ? (
          <motion.p
            className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.45 }}
          >
            {subtitle}
          </motion.p>
        ) : null}
      </Container>
    </header>
  );
}
