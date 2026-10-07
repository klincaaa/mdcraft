"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { ClipReveal } from "@/components/motion/clip-reveal";
import { aboutCopy, aboutHighlights, galleryImages } from "@/lib/content";

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-40, 60]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink py-24 sm:py-32" id="studio">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-corten">
                01 — {aboutCopy.eyebrow}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2.6rem,6vw,5rem)] uppercase leading-[0.9] text-paper">
                {aboutCopy.title}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-8 font-serif text-xl leading-relaxed text-paper/80 sm:text-2xl">
                {aboutCopy.lead}
              </p>
              <p className="mt-6 max-w-xl font-serif text-base leading-relaxed text-muted sm:text-lg">
                {aboutCopy.paragraphs[0]}
              </p>
              <Link
                href="/o-nama"
                className="mt-8 inline-flex font-mono text-[11px] uppercase tracking-[0.28em] text-corten hover:text-corten-light"
              >
                Čitajte priču studija →
              </Link>
            </Reveal>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {aboutHighlights.map((line, i) => (
                <Reveal key={line} delay={0.04 * i}>
                  <li className="border-l border-corten/60 pl-4 font-serif text-sm text-paper/80">{line}</li>
                </Reveal>
              ))}
            </ul>
          </div>
          <div className="relative lg:col-span-6">
            <motion.div style={{ y }} className="relative">
              <ClipReveal className="relative aspect-[4/5] w-full max-w-md overflow-hidden lg:ml-auto lg:max-w-lg">
                <Image
                  src={galleryImages[0].src}
                  alt={galleryImages[0].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 480px"
                />
              </ClipReveal>
              <ClipReveal delay={0.15} className="absolute -bottom-10 -left-4 hidden aspect-[4/5] w-40 overflow-hidden sm:block lg:-left-12 lg:w-52">
                <Image
                  src={galleryImages[1].src}
                  alt={galleryImages[1].alt}
                  fill
                  className="object-cover"
                  sizes="208px"
                />
              </ClipReveal>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
