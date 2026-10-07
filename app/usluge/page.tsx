import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { CtaMarquee } from "@/components/sections/cta-marquee";
import { PremiumButton } from "@/components/ui/premium-button";
import { services } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Usluge",
  description:
    "Skiciranje, projektovanje, proizvodnja i montaža modularnih kontejnera — kompletne usluge MD Craft u Srbiji.",
  path: "/usluge",
});

export default function ServicesPage() {
  return (
    <main id="main-content">
      <PageHeader
        index="04"
        eyebrow="End-to-end"
        title="Usluge"
        subtitle="Jedan tim, jedan crtež, jedan rok. Vodimo projekat od prvog razgovora do puštanja objekta u rad."
      />
      <section className="bg-ink py-16 sm:py-24">
        <Container className="space-y-24">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.05}>
              <article className="grid gap-8 border-t border-paper/10 pt-12 lg:grid-cols-12">
                <p className="font-mono text-sm tracking-[0.28em] text-corten lg:col-span-2">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="font-display text-5xl uppercase leading-none text-paper lg:col-span-4 lg:text-6xl">
                  {s.title}
                </h2>
                <div className="lg:col-span-6">
                  <p className="font-serif text-xl leading-relaxed text-paper/85">{s.body}</p>
                  <p className="mt-5 font-serif text-base leading-relaxed text-muted sm:text-lg">{s.detail}</p>
                </div>
              </article>
            </Reveal>
          ))}
          <div className="pt-4">
            <PremiumButton href="/proces">Pogledajte proces izrade</PremiumButton>
          </div>
        </Container>
      </section>
      <CtaMarquee />
    </main>
  );
}
