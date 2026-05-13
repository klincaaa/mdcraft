import type { Metadata } from "next";
import { CinematicHero } from "@/components/sections/cinematic-hero";
import { ServicesOverview } from "@/components/sections/services-overview";
import { FeaturedContainers } from "@/components/sections/featured-containers";
import { GalleryPreview } from "@/components/sections/gallery-preview";
import { WhyUs } from "@/components/sections/why-us";
import { StatsRow } from "@/components/sections/stats-row";
import { Testimonials } from "@/components/sections/testimonials";
import { CtaMarquee } from "@/components/sections/cta-marquee";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Modularni kontejneri i prodaja kontejnera",
  description:
    "MD Craft Kontejneri — stambeni kontejneri, kancelarijski moduli i modularni objekti u Srbiji. Projektovanje, proizvodnja, montaža. Beograd, Pazovački put 21.",
  path: "/",
});

export default function HomePage() {
  return (
    <main id="main-content">
      <CinematicHero />
      <StatsRow />
      <ServicesOverview />
      <FeaturedContainers />
      <GalleryPreview />
      <WhyUs />
      <Testimonials />
      <CtaMarquee />
    </main>
  );
}
