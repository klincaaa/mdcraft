"use client";

import { Container } from "@/components/ui/container";
import { StatCounter } from "@/components/motion/stat-counter";
import { stats } from "@/lib/content";

export function StatsRow() {
  return (
    <section className="border-y border-white/10 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 py-14 sm:py-16">
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <p className="font-[family-name:var(--font-display)] text-4xl text-white sm:text-5xl">
                <StatCounter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-widest text-zinc-500 sm:text-sm">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
