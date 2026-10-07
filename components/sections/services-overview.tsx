"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { services } from "@/lib/content";

export function ServicesOverview() {
  return (
    <section className="relative border-t border-paper/10 bg-graphite py-24 sm:py-32" id="usluge">
      <Container>
        <Reveal>
          <SectionHeading
            index="02"
            eyebrow="End-to-end"
            title="Naše usluge"
            subtitle="Tim vodi projekat od koncepta do završne montaže — jasna komunikacija, fiksirane faze i transparentan budžet."
          />
        </Reveal>
        <Stagger className="mt-16 divide-y divide-paper/10 border-y border-paper/10">
          {services.map((s, i) => (
            <StaggerItem key={s.title}>
              <Link
                href="/usluge"
                className="group grid cursor-pointer items-baseline gap-4 py-8 sm:grid-cols-12 sm:gap-8 sm:py-10"
              >
                <span className="font-mono text-xs tracking-[0.24em] text-corten sm:col-span-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-4xl uppercase leading-none text-paper transition-colors group-hover:text-corten sm:col-span-4 sm:text-5xl">
                  {s.title}
                </h3>
                <p className="font-serif text-base leading-relaxed text-muted sm:col-span-6 sm:text-lg">
                  {s.body}
                </p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
