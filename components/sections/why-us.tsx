"use client";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { whyUs } from "@/lib/content";

export function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            index="05"
            eyebrow="Zašto MD Craft"
            title="Disciplina, tempo, vrednost"
            subtitle="Kombinujemo industrijsku logiku sa premium završnicom — da prostor radi za vas, ne obrnuto."
          />
        </Reveal>
        <div className="mt-16 grid gap-px bg-paper/10 md:grid-cols-3">
          {whyUs.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <article className="h-full bg-ink p-8 sm:p-10">
                <p className="font-mono text-[11px] tracking-[0.28em] text-corten">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-6 font-display text-3xl uppercase leading-none text-paper">{item.title}</h3>
                <p className="mt-5 font-serif text-base leading-relaxed text-muted sm:text-lg">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
