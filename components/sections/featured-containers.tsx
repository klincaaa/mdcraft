"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { products } from "@/lib/content";

export function FeaturedContainers() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-zinc-900 py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <SectionHeading
              eyebrow="Proizvodi"
              title="Kontejneri i modularni objekti"
              subtitle="Od kompaktnih kancelarijskih modula do stambenih jedinica — svaka linija je projektovana za performanse na terenu."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <Link
              href="/kontejneri"
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300"
            >
              Kompletan katalog
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {products.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950"
            >
              <Link href="/kontejneri" className="block cursor-pointer">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                </div>
                <div className="relative space-y-2 p-6 sm:p-8">
                  <h3 className="text-xl font-semibold text-white sm:text-2xl">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-400 sm:text-base">{p.excerpt}</p>
                  <span className="inline-flex items-center gap-2 pt-2 text-sm font-medium text-amber-400">
                    Detaljnije
                    <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
