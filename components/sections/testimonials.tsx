"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const t = testimonials[i];

  return (
    <section className="bg-zinc-950 py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Reference"
            title="Šta kažu naši klijenti"
            subtitle="Zadovoljstvo klijenata je merilo koje nas najviše oblikuje — dugoročne saradnje sa logistikom, transportom i građevinarstvom."
            align="center"
            className="max-w-2xl"
          />
        </Reveal>

        <div className="mx-auto mt-14 max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-8 sm:p-12">
            <Quote className="absolute right-8 top-8 h-10 w-10 text-amber-500/20" aria-hidden />
            <AnimatePresence mode="wait">
              <motion.figure
                key={t.author}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="relative"
              >
                <blockquote className="text-lg leading-relaxed text-zinc-200 sm:text-xl">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-8 text-sm">
                  <span className="font-semibold text-white">{t.author}</span>
                  <span className="text-zinc-500"> · {t.role}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
              {testimonials.map((item, idx) => (
                <button
                  key={item.author}
                  type="button"
                  onClick={() => setI(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === i ? "w-10 bg-amber-400" : "w-2 bg-zinc-600 hover:bg-zinc-500"
                  }`}
                  aria-label={`Izjava ${idx + 1}`}
                  aria-pressed={idx === i}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
