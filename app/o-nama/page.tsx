import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { aboutHighlights, company } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "O nama",
  description: `MD Craft Kontejneri — ${company.description} Poslovna adresa: ${company.addressLine}, ${company.city}.`,
  path: "/o-nama",
});

export default function AboutPage() {
  return (
    <main id="main-content">
      <PageHeader
        eyebrow="Tim i vrednosti"
        title="O nama"
        subtitle="Sa više od 5 godina iskustva u industriji kontejnera, MD Craft Kontejneri je sinonim za kvalitet i pouzdanost u Srbiji."
      />
      <section className="border-b border-white/5 bg-zinc-950 py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className="text-lg leading-relaxed text-zinc-300 sm:text-xl">
                Specijalizovani smo za prodaju, modifikaciju i održavanje kontejnera. Naš pristup spaja inženjersku disciplinu
                sa premium završnom obradom — od prvog skica do ključa u vašim rukama.
              </p>
              <p className="mt-6 text-base leading-relaxed text-zinc-400">
                Modularna rešenja smanjuju vreme gradnje, donose predvidljiv budžet i omogućavaju da se kapital usmeri ka
                poslovanju, a ne ka nepredviđenim troškovima gradilišta.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="space-y-4 rounded-3xl border border-white/10 bg-zinc-900/50 p-8 backdrop-blur">
                {aboutHighlights.map((line) => (
                  <li key={line} className="flex gap-3 text-zinc-200">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber-400" aria-hidden />
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>
    </main>
  );
}
