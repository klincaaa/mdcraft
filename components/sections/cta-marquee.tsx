"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { PremiumButton } from "@/components/ui/premium-button";
import { brochure } from "@/lib/content";

const line =
  "Montažni objekti · Modularni kontejneri · Hale · Stambeni moduli · Kancelarijski prostori · Prodaja kontejnera Srbija · ";

export function CtaMarquee() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-t border-paper/10 bg-ink py-20 sm:py-28">
      <div className="relative mb-12 overflow-hidden border-y border-paper/10 py-4">
        <motion.div
          className="flex whitespace-nowrap font-display text-4xl uppercase text-paper/20 sm:text-6xl"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={reduce ? undefined : { duration: 36, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="pr-16">
              {line.repeat(2)}
            </span>
          ))}
        </motion.div>
      </div>
      <Container className="relative text-center">
        <h2 className="font-display text-[clamp(2.4rem,7vw,5.5rem)] uppercase leading-[0.9] text-paper">
          Spremni za
          <br />
          <span className="text-corten">sledeći modul?</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl font-serif text-lg text-muted">
          Pošaljite kratak brief — vratićemo se sa predlogom konfiguracije i jasnim narednim koracima.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PremiumButton href="/kontakt">Zakažite konsultaciju</PremiumButton>
          <a
            href={brochure.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-w-[200px] items-center justify-center rounded-full border border-paper/20 px-8 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-paper hover:border-corten hover:text-corten"
          >
            {brochure.label}
          </a>
        </div>
      </Container>
    </section>
  );
}
