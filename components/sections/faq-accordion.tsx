"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { faq } from "@/lib/content";

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <div className="divide-y divide-paper/10 border-y border-paper/10">
      {faq.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full cursor-pointer items-baseline justify-between gap-6 py-6 text-left sm:py-8"
              aria-expanded={isOpen}
            >
              <span className="flex gap-5">
                <span className="font-mono text-[11px] tracking-[0.22em] text-corten">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-2xl uppercase leading-none text-paper sm:text-3xl">
                  {item.q}
                </span>
              </span>
              <span className="font-mono text-corten">{isOpen ? "–" : "+"}</span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-8 pl-10 font-serif text-base leading-relaxed text-muted sm:pl-14 sm:text-lg">
                    {item.a}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
