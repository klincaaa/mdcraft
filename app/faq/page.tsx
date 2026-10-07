import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CtaMarquee } from "@/components/sections/cta-marquee";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Često postavljana pitanja",
  description:
    "FAQ o rokovima, tipovima kontejnera, isporuci širom Srbije i nadogradnji modularnih objekata — MD Craft.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <main id="main-content">
      <PageHeader
        index="08"
        eyebrow="FAQ"
        title="Pitanja"
        subtitle="Brzi pregled procesa i mogućnosti — za konkretan projekat najbolje je da zajedno prođemo brief."
      />
      <section className="bg-ink py-16 sm:py-24">
        <Container className="max-w-4xl">
          <FaqAccordion />
        </Container>
      </section>
      <CtaMarquee />
    </main>
  );
}
