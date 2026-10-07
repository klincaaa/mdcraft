import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { StickyProcess } from "@/components/sections/sticky-process";
import { CtaMarquee } from "@/components/sections/cta-marquee";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Proces izrade",
  description:
    "Skiciranje, projektovanje, proizvodnja i montaža modularnih kontejnera — transparentan proces MD Craft u Srbiji.",
  path: "/proces",
});

export default function ProcessPage() {
  return (
    <main id="main-content">
      <PageHeader
        index="07"
        eyebrow="Metodologija"
        title="Proces izrade"
        subtitle="Vodimo vas kroz svaki korak — od konceptualizacije do završne montaže, uz jasne kontrolne tačke."
      />
      <StickyProcess />
      <CtaMarquee />
    </main>
  );
}
