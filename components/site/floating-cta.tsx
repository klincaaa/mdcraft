"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Phone } from "lucide-react";
import { company } from "@/lib/content";

export function FloatingCta() {
  const reduce = useReducedMotion();

  return (
    <motion.a
      href={`tel:${company.phoneTel}`}
      className="fixed bottom-5 right-4 z-40 flex items-center gap-2 rounded-full border border-amber-500/40 bg-zinc-950/90 px-4 py-3 text-sm font-semibold text-amber-400 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.85)] backdrop-blur-md sm:bottom-8 sm:right-8"
      aria-label={`Pozovite ${company.phoneDisplay}`}
      initial={reduce ? false : { opacity: 0, y: 16, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduce ? undefined : { scale: 1.04 }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-400/15 text-amber-400">
        <Phone className="h-4 w-4" aria-hidden />
      </span>
      <span className="hidden sm:inline">{company.phoneDisplay}</span>
      <span className="sm:hidden">Poziv</span>
    </motion.a>
  );
}
