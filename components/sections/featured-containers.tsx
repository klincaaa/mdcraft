"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { catalogGroups, type CatalogGroup } from "@/lib/content";

export function FeaturedContainers() {
  return (
    <section className="relative bg-ink py-24 sm:py-32">
      <Container className="mb-8 sm:mb-12">
        <Reveal className="max-w-2xl">
          <SectionHeading
            index="03"
            eyebrow="Katalog"
            title="Tri linije prostora"
            subtitle="Montažni objekti, modularni kontejneri i hale — svaka linija ima svoju logiku, rok i tehnički list."
          />
        </Reveal>
      </Container>

      <div className="flex flex-col gap-4 px-4 sm:px-8 lg:flex-row lg:gap-6 lg:px-12">
        {catalogGroups.map((group) => (
          <GroupCard key={group.slug} group={group} />
        ))}
      </div>
    </section>
  );
}

function GroupCard({ group }: { group: CatalogGroup }) {
  return (
    <article className="relative h-[58vh] min-w-0 flex-1 overflow-hidden">
      <Link href={group.href} className="group block h-full cursor-pointer">
        <div className="relative h-full">
          <Image
            src={group.image}
            alt={group.title}
            fill
            className="object-cover transition duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 space-y-2 p-6 sm:p-8">
          <p className="font-mono text-[11px] tracking-[0.28em] text-corten">{group.index}</p>
          <h3 className="font-display text-3xl uppercase leading-none text-paper sm:text-4xl">{group.title}</h3>
          <p className="max-w-md font-serif text-sm leading-relaxed text-paper/70 sm:text-base">{group.excerpt}</p>
          <span className="inline-flex items-center gap-2 pt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-corten">
            Saznajte više
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}
