"use client";

import { Layers, PenLine, Ruler, Wrench } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { services } from "@/lib/content";

const icons = [PenLine, Ruler, Layers, Wrench];

export function ServicesOverview() {
  return (
    <section className="relative border-t border-white/5 bg-zinc-950 py-20 sm:py-28" id="usluge">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="End-to-end"
            title="Naše usluge"
            subtitle="Tim vodi projekat od koncepta do završne montaže — jasna komunikacija, fiksirane faze i transparentan budžet."
          />
        </Reveal>
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = icons[i] ?? Layers;
            return (
              <StaggerItem key={s.title}>
                <article className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-transparent p-6 transition-colors hover:border-amber-500/30">
                  <div className="mb-4 inline-flex rounded-xl bg-amber-500/10 p-3 text-amber-400 ring-1 ring-amber-500/20 transition-transform group-hover:scale-105">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">{s.body}</p>
                  <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-amber-500/10 blur-2xl transition-opacity group-hover:opacity-100" />
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
