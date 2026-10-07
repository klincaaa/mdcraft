"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SplitWords } from "@/components/motion/split-words";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  index,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  index?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <header className="relative overflow-hidden border-b border-paper/10 bg-ink pb-16 pt-28 sm:pb-24 sm:pt-36">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
      <div className="pointer-events-none absolute -right-10 top-16 font-display text-[28vw] leading-none text-paper/[0.035]">
        {index ?? "MD"}
      </div>
      <Container className="relative">
        <div className="flex items-center gap-4">
          {index ? (
            <span className="font-mono text-[11px] tracking-[0.28em] text-corten">{index}</span>
          ) : null}
          {eyebrow ? (
            <motion.p
              className="font-mono text-[11px] font-medium uppercase tracking-[0.32em] text-corten"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {eyebrow}
            </motion.p>
          ) : null}
        </div>
        <h1 className="mt-5 font-display text-[clamp(3rem,10vw,8rem)] uppercase leading-[0.82] text-paper">
          <SplitWords text={title} as="span" />
        </h1>
        {subtitle ? (
          <motion.p
            className="mt-6 max-w-2xl font-serif text-lg leading-relaxed text-muted sm:text-xl"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.5 }}
          >
            {subtitle}
          </motion.p>
        ) : null}
      </Container>
    </header>
  );
}
