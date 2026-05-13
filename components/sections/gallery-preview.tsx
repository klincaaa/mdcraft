"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { galleryImages } from "@/lib/content";

const preview = galleryImages.slice(0, 6);

export function GalleryPreview() {
  const reduce = useReducedMotion();

  return (
    <section className="overflow-x-hidden border-y border-white/5 bg-zinc-950 py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Realizacije"
            title="Interaktivna galerija"
            subtitle="Pogledajte autentične fotografije sa terena — završna obrada, spojevi modula i enterijeri u upotrebi."
            align="center"
            className="max-w-2xl"
          />
        </Reveal>
      </Container>

      <div className="mt-12 w-full min-w-0 sm:mt-16">
        <div className="mx-auto max-w-7xl min-w-0 px-4 sm:px-6 lg:px-8">
          <div
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden overscroll-x-contain pb-4 [-ms-overflow-style:none] [scrollbar-width:thin] sm:gap-5 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-track]:bg-transparent"
          >
          {preview.map((img, i) => (
            <motion.div
              key={img.src}
              className="relative aspect-[3/4] w-[min(17.5rem,85%)] shrink-0 snap-center overflow-hidden rounded-2xl ring-1 ring-white/10 sm:w-52 md:w-56"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              whileHover={reduce ? undefined : { y: -4 }}
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width:640px) 85vw, 224px" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/70 to-transparent" />
            </motion.div>
          ))}
          </div>
        </div>
      </div>

      <Container className="mt-10 flex justify-center">
        <Reveal>
          <Link
            href="/galerija"
            className="rounded-full border border-white/15 bg-white/5 px-8 py-3 text-sm font-semibold text-white backdrop-blur hover:border-amber-500/40 hover:bg-white/10"
          >
            Otvori punu galeriju
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
