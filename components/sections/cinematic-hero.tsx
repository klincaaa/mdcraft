"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/container";
import { PremiumButton } from "@/components/ui/premium-button";
import { PointerGlow } from "@/components/motion/pointer-glow";
import { company, hero } from "@/lib/content";

const HERO_VIDEO_SRC = "/images/VIdeoMDCraft.mp4";
const HERO_VIDEO_POSTER = "/images/homeContainer.jpeg";

export function CinematicHero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (reduce) {
      el.pause();
      return;
    }
    void el.play().catch(() => {
      /* autoplay can fail until user gesture; ignore */
    });
  }, [reduce]);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-zinc-950 pt-16 sm:pt-[4.25rem]"
      aria-label="Uvod"
    >
      <PointerGlow />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-1/4 top-0 h-[70%] w-[70%] rounded-full bg-amber-500/10 blur-[120px]" />
        <div className="absolute -right-1/4 bottom-0 h-[60%] w-[60%] rounded-full bg-sky-500/5 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.35] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <Container className="relative z-10 flex min-h-[calc(100svh-4rem)] flex-col justify-center py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <motion.p
              className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-500"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {hero.kicker}
            </motion.p>
            <motion.h1
              className="mt-5 font-[family-name:var(--font-display)] text-[clamp(2.6rem,8vw,4.75rem)] leading-[0.95] tracking-tight text-white"
              initial={reduce ? false : { opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="block text-zinc-400">{hero.titleLine1}</span>
              <span className="mt-1 block bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                {hero.titleLine2}
              </span>
            </motion.h1>
            <motion.p
              className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.14 }}
            >
              {hero.subtitle}
            </motion.p>
            <motion.div
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
            >
              <PremiumButton href={hero.primaryCta.href}>{hero.primaryCta.label}</PremiumButton>
              <PremiumButton href={hero.secondaryCta.href} variant="outline">
                {hero.secondaryCta.label}
              </PremiumButton>
            </motion.div>
            <motion.dl
              className="mt-12 grid max-w-md grid-cols-2 gap-6 text-sm text-zinc-500"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <div>
                <dt className="text-xs uppercase tracking-widest text-zinc-600">Lokacija</dt>
                <dd className="mt-1 text-zinc-300">{company.city}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-zinc-600">Fokus</dt>
                <dd className="mt-1 text-zinc-300">Modularni &amp; industrijski</dd>
              </div>
            </motion.dl>
          </div>

          <div className="relative lg:col-span-6">
            <motion.div
              style={{ y, opacity }}
              className="relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none lg:translate-x-4"
            >
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-amber-500/25 via-transparent to-sky-500/10 blur-2xl" />
              <motion.div
                className="relative h-full w-full overflow-hidden rounded-[1.75rem] ring-1 ring-white/10"
                initial={reduce ? false : { rotate: -1.5, scale: 0.96, opacity: 0 }}
                animate={{ rotate: -1.2, scale: 1, opacity: 1 }}
                transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={reduce ? undefined : { rotate: 0, scale: 1.01 }}
              >
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
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-zinc-950/20" />
                <motion.div
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-zinc-950/90 to-transparent"
                  initial={{ x: "-20%" }}
                  animate={{ x: 0 }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.div>
              <div className="absolute -bottom-6 -left-4 hidden rounded-2xl border border-white/10 bg-zinc-900/80 px-5 py-4 text-xs text-zinc-300 shadow-2xl backdrop-blur-md sm:block">
                <p className="font-semibold uppercase tracking-widest text-amber-500">Serijska kontrola</p>
                <p className="mt-1 max-w-[12rem] leading-relaxed text-zinc-400">
                  Svaki modul prolazi inspekciju pre transporta.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
