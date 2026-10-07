"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/container";
import { StatCounter } from "@/components/motion/stat-counter";
import { stats, company } from "@/lib/content";

export function StatsRow() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["8%", "-8%"]);

  return (
    <section ref={ref} className="relative overflow-hidden border-y border-paper/10 bg-graphite py-12 sm:py-16">
      <motion.p
        style={{ x }}
        aria-hidden
        className="pointer-events-none absolute -top-6 left-0 whitespace-nowrap font-display text-[18vw] uppercase leading-none text-paper/[0.04]"
      >
        {company.shortName} · Preciznost · {company.shortName}
      </motion.p>
      <Container>
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">
          {stats.map((s, i) => (
            <div key={s.label} className="relative">
              <p className="font-mono text-[11px] tracking-[0.28em] text-corten">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 font-display text-5xl uppercase leading-none text-paper sm:text-6xl lg:text-7xl">
                <StatCounter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-3 max-w-[12ch] font-serif text-sm leading-snug text-muted sm:text-base">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
