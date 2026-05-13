"use client";

import { ShieldCheck, Timer, Zap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { whyUs } from "@/lib/content";

const icons = [ShieldCheck, Timer, Zap];

export function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-zinc-900 py-20 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[min(90vw,520px)] w-[min(90vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/5 blur-3xl" />
      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="Zašto MD Craft"
            title="Inženjering, tempo i pouzdanost"
            subtitle="Kombinujemo industrijsku logiku sa premium završnicom — da prostor radi za vas, ne obrnuto."
            align="center"
            className="max-w-2xl"
          />
        </Reveal>
        <Stagger className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
          {whyUs.map((item, i) => {
            const Icon = icons[i] ?? ShieldCheck;
            return (
              <StaggerItem key={item.title}>
                <div className="h-full rounded-2xl border border-white/10 bg-zinc-950/80 p-8 text-center shadow-xl shadow-black/40 backdrop-blur">
                  <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400/20 to-transparent text-amber-400 ring-1 ring-amber-500/30">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">{item.body}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
