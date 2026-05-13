import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { references, testimonials } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Reference i klijenti",
  description:
    "Projekti MD Craft Kontejneri u logistici, građevinarstvu i stambenom segmentu — modularni kontejneri širom Srbije.",
  path: "/reference",
});

export default function ReferencesPage() {
  return (
    <main id="main-content">
      <PageHeader
        eyebrow="Poverenje"
        title="Reference"
        subtitle="Od terenskih kancelarija do stambenih kapaciteta — isporuke koje držimo u realnim rokovima."
      />
      <section className="border-b border-white/5 bg-zinc-950 py-16 sm:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            {references.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.06}>
                <article className="flex h-full flex-col rounded-3xl border border-white/10 bg-zinc-900/50 p-8 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-widest text-amber-500">{r.sector}</p>
                  <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl text-white">{r.title}</h2>
                  <p className="mt-2 text-sm text-zinc-500">{r.city}</p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-400">{r.summary}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-zinc-900 py-16 sm:py-20">
        <Container>
          <h2 className="text-center font-[family-name:var(--font-display)] text-3xl text-white sm:text-4xl">
            Izjave partnera
          </h2>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.author} delay={i * 0.05}>
                <li className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6">
                  <p className="text-sm leading-relaxed text-zinc-300">“{t.quote}”</p>
                  <p className="mt-4 text-sm font-semibold text-white">{t.author}</p>
                  <p className="text-xs text-zinc-500">{t.role}</p>
                </li>
              </Reveal>
            ))}
          </ul>
          <p className="mt-10 text-center text-sm text-zinc-500">
            Želite sličan scenario?{" "}
            <Link href="/kontakt" className="font-medium text-amber-400 hover:text-amber-300">
              Pišite nam
            </Link>
            .
          </p>
        </Container>
      </section>
    </main>
  );
}
