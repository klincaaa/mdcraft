"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { galleryImages } from "@/lib/content";

const preview = galleryImages.slice(0, 8);

export function GalleryPreview() {
  const reduce = useReducedMotion();

  return (
    <section className="overflow-hidden border-y border-paper/10 bg-graphite py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            index="04"
            eyebrow="Arhiv"
            title="Galerija terena"
            subtitle="Autentične fotografije sa realizacija — fasade, spojevi modula i enterijeri u upotrebi."
          />
        </Reveal>
      </Container>

      <div className="mt-14">
        <div className="flex animate-marquee gap-4 hover:[animation-play-state:paused]">
          {[...preview, ...preview].map((img, i) => (
            <motion.div
              key={`${img.src}-${i}`}
              className="relative aspect-[3/4] w-56 shrink-0 overflow-hidden sm:w-64"
              whileHover={reduce ? undefined : { y: -10 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="256px" />
            </motion.div>
          ))}
        </div>
      </div>

      <Container className="mt-12 flex justify-center">
        <Reveal>
          <Link
            href="/galerija"
            className="rounded-full border border-paper/20 px-8 py-3 font-mono text-[11px] uppercase tracking-[0.28em] text-paper hover:border-corten hover:text-corten"
          >
            Otvori punu galeriju
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
