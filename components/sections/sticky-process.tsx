"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { processSteps } from "@/lib/content";
import { Container } from "@/components/ui/container";

export function StickyProcess() {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <Container>
        <ol className="space-y-12">
          {processSteps.map((step) => (
            <li key={step.title}>
              <p className="font-mono text-corten">{step.step}</p>
              <h2 className="mt-2 font-display text-4xl uppercase text-paper">{step.title}</h2>
              <p className="mt-4 max-w-2xl font-serif text-muted">{step.detail}</p>
            </li>
          ))}
        </ol>
      </Container>
    );
  }

  return (
    <div className="relative">
      {processSteps.map((step, i) => (
        <ProcessPanel key={step.title} step={step} index={i} />
      ))}
    </div>
  );
}

function ProcessPanel({
  step,
  index,
}: {
  step: (typeof processSteps)[number];
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.35]);

  return (
    <section ref={ref} className="h-[140vh]">
      <motion.div
        style={{ scale, opacity }}
        className="sticky top-24 overflow-hidden border-t border-paper/10 bg-ink px-4 py-16 sm:px-8 lg:px-12"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:items-end">
          <p className="font-display text-[22vw] leading-none text-paper/10 lg:col-span-4 lg:text-[8rem]">
            {step.step}
          </p>
          <div className="lg:col-span-8">
            <h2 className="font-display text-5xl uppercase leading-none text-paper sm:text-7xl">{step.title}</h2>
            <p className="mt-6 max-w-2xl font-serif text-lg leading-relaxed text-muted sm:text-xl">{step.body}</p>
            <p className="mt-4 max-w-2xl font-serif text-base leading-relaxed text-paper/70 sm:text-lg">
              {step.detail}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
