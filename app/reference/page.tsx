import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { CtaMarquee } from "@/components/sections/cta-marquee";
import { references, testimonials } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Reference i klijenti",
  description:
    "Projekti MD Craft u logistici, građevinarstvu i stambenom segmentu — modularni kontejneri širom Srbije.",
  path: "/reference",
});

export default function ReferencesPage() {
  return (
    <main id="main-content">
      <PageHeader
        index="06"
        eyebrow="Poverenje"
        title="Reference"
        subtitle="Od terenskih kancelarija do stambenih kapaciteta — isporuke koje držimo u realnim rokovima."
      />
      <section className="border-b border-paper/10 bg-ink py-16 sm:py-24">
        <Container>
          <div className="divide-y divide-paper/10 border-y border-paper/10">
            {references.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.06}>
                <article className="grid gap-6 py-12 lg:grid-cols-12 lg:items-start">
                  <p className="font-mono text-[11px] tracking-[0.24em] text-corten lg:col-span-2">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <div className="lg:col-span-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{r.sector}</p>
                    <h2 className="mt-2 font-display text-4xl uppercase leading-none text-paper">{r.title}</h2>
                    <p className="mt-2 font-serif text-sm text-muted">{r.city}</p>
                  </div>
                  <p className="font-serif text-lg leading-relaxed text-paper/75 lg:col-span-6">{r.summary}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-graphite py-16 sm:py-24">
        <Container>
          <h2 className="font-display text-4xl uppercase text-paper sm:text-5xl">Izjave partnera</h2>
          <ul className="mt-12 grid gap-10 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <Reveal key={t.author} delay={i * 0.05}>
                <li className="border-t border-paper/15 pt-6">
                  <p className="font-serif text-lg leading-relaxed text-paper/85">“{t.quote}”</p>
                  <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-corten">{t.author}</p>
                </li>
              </Reveal>
            ))}
          </ul>
          <p className="mt-12 font-serif text-muted">
            Želite sličan scenario?{" "}
            <Link href="/kontakt" className="text-corten hover:text-corten-light">
              Pišite nam
            </Link>
            .
          </p>
        </Container>
      </section>
      <CtaMarquee />
    </main>
  );
}
