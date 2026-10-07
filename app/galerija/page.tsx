import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { CtaMarquee } from "@/components/sections/cta-marquee";
import { buildPageMetadata } from "@/lib/seo";
import { brochure } from "@/lib/content";

export const metadata: Metadata = buildPageMetadata({
  title: "Galerija realizacija",
  description:
    "Fotografije modularnih kontejnera i enterijera MD Craft — stambeni, kancelarijski i industrijski moduli u Srbiji.",
  path: "/galerija",
});

export default function GalleryPage() {
  return (
    <main id="main-content">
      <PageHeader
        index="05"
        eyebrow="Fotografije"
        title="Galerija"
        subtitle="Autentične realizacije — spojevi modula, fasade i završna obrada u realnim uslovima."
      />
      <section className="bg-ink py-16 sm:py-20">
        <Container>
          <a
            href={brochure.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-10 inline-flex items-center rounded-full border border-paper/20 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-paper hover:border-corten hover:text-corten"
          >
            {brochure.label}
          </a>
          <GalleryGrid />
        </Container>
      </section>
      <CtaMarquee />
    </main>
  );
}
