"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/ui/container";

const line =
  "Modularni kontejneri · Stambeni moduli · Kancelarijski prostori · Prodaja kontejnera Srbija · ";

export function CtaMarquee() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-zinc-900 py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(245,158,11,0.08),_transparent_65%)]" />
      <div className="relative mb-10 overflow-hidden border-y border-white/5 py-3">
        <motion.div
          className="flex whitespace-nowrap text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={reduce ? undefined : { duration: 38, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="pr-16">
              {line.repeat(4)}
            </span>
          ))}
        </motion.div>
      </div>
      <Container className="relative text-center">
        <h2 className="font-[family-name:var(--font-display)] text-3xl text-white sm:text-4xl md:text-5xl">
          Spremni za sledeći modul?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-zinc-400">
          Pošaljite kratak brief — vratićemo se sa predlogom konfiguracije i jasnim narednim koracima.
        </p>
        <motion.div
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link
            href="/kontakt"
            className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-amber-400 px-8 py-3.5 text-sm font-semibold text-zinc-950 shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-300"
          >
            Zakažite konsultaciju
          </Link>
          <Link
            href="/reference"
            className="inline-flex min-w-[200px] items-center justify-center rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white hover:border-amber-500/50"
          >
            Pogledajte reference
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
