"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { testimonials } from "@/lib/content";

const CYCLE_MS = 7000;

export function Testimonials() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const t = testimonials[i];

  useEffect(() => {
    if (reduce || testimonials.length < 2) return;
    const id = window.setTimeout(() => {
      setI((n) => (n + 1) % testimonials.length);
    }, CYCLE_MS);
    return () => window.clearTimeout(id);
  }, [i, reduce]);

  return (
    <section className="bg-graphite py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            index="06"
            eyebrow="Glasovi"
            title="Šta kažu partneri"
            subtitle="Zadovoljstvo klijenata je merilo koje nas najviše oblikuje — od vikendica na terenu do svakodnevne saradnje."
          />
        </Reveal>

        <div className="mt-16 border-t border-paper/10 pt-12">
          <AnimatePresence mode="wait">
            <motion.figure
              key={t.author}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <blockquote className="max-w-4xl font-serif text-2xl leading-snug text-paper sm:text-4xl sm:leading-[1.2]">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-10 flex flex-col gap-1 font-mono text-[11px] uppercase tracking-[0.24em]">
                <span className="text-corten">{t.author}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          <div className="mt-12 flex gap-3">
            {testimonials.map((item, idx) => {
              const active = idx === i;
              return (
                <button
                  key={item.author}
                  type="button"
                  onClick={() => setI(idx)}
                  className="relative h-[2px] w-16 overflow-hidden bg-paper/20"
                  aria-label={`Izjava ${idx + 1}`}
                  aria-pressed={active}
                >
                  {active ? (
                    <motion.span
                      key={i}
                      className="absolute inset-y-0 left-0 bg-corten"
                      initial={{ width: reduce ? "100%" : "0%" }}
                      animate={{ width: "100%" }}
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { duration: CYCLE_MS / 1000, ease: "linear" }
                      }
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
