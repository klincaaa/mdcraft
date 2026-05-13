import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Često postavljana pitanja",
  description:
    "FAQ o rokovima, tipovima kontejnera, isporuci širom Srbije i nadogradnji modularnih objekata — MD Craft Kontejneri.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <main id="main-content">
      <PageHeader
        eyebrow="FAQ"
        title="Odgovori na uobičajena pitanja"
        subtitle="Brzi pregled procesa i mogućnosti — za konkretan projekat najbolje je da zajedno prođemo brief."
      />
      <section className="bg-zinc-950 py-16 sm:py-20">
        <Container className="max-w-3xl">
          <FaqAccordion />
        </Container>
      </section>
    </main>
  );
}
