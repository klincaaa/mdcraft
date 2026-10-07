"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { PremiumButton } from "@/components/ui/premium-button";
import { SplitWords } from "@/components/motion/split-words";
import { company, hero } from "@/lib/content";

const HERO_VIDEO_SRC = "/images/VIdeoMDCraft.mp4";
const HERO_VIDEO_POSTER = "/images/homeContainer.jpeg";

export function CinematicHero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (reduce) {
      el.pause();
      return;
    }
    void el.play().catch(() => undefined);
  }, [reduce]);

  return (
    <section ref={ref} className="relative h-[110svh] overflow-hidden bg-ink" aria-label="Uvod">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y, scale }}>
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            poster={HERO_VIDEO_POSTER}
            muted
            loop
            playsInline
            preload="metadata"
            autoPlay={!reduce}
            aria-label="Video prezentacija modularnih kontejnera MD Craft"
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/35 to-ink" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(11,10,8,0.72)_100%)]" />
        </motion.div>

        <motion.div
          style={{ opacity }}
          className="relative z-10 flex h-full flex-col justify-end px-4 pb-16 pt-28 sm:px-8 sm:pb-20 lg:px-12"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.42em] text-corten">{hero.kicker}</p>
          <h1 className="mt-5 max-w-[18ch] font-display text-[clamp(3.2rem,11vw,9.5rem)] leading-[0.82] uppercase text-paper">
            <SplitWords text={hero.titleLine1} as="span" className="block" />
            <SplitWords text={hero.titleLine2} as="span" className="mt-1 block text-corten" delay={0.18} />
          </h1>
          <div className="mt-8 flex max-w-4xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-xl font-serif text-lg leading-relaxed text-paper/75 sm:text-xl">
              {hero.subtitle}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <PremiumButton href={hero.primaryCta.href}>{hero.primaryCta.label}</PremiumButton>
              <PremiumButton href={hero.secondaryCta.href} variant="outline">
                {hero.secondaryCta.label}
              </PremiumButton>
            </div>
          </div>
          <div className="mt-10 flex items-center justify-between border-t border-paper/15 pt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            <span>{company.city}</span>
            <span className="hidden sm:inline">Skrolujte</span>
            <span>Modularni &amp; industrijski</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
