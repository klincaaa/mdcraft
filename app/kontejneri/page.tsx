import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { ClipReveal } from "@/components/motion/clip-reveal";
import { CtaMarquee } from "@/components/sections/cta-marquee";
import { catalogGroups } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Katalog — kontejneri, objekti i hale",
  description:
    "Tri linije MD Craft: montažni objekti, modularni kontejneri (stambeni i kancelarijski) i hale. Projektovanje, proizvodnja i montaža u Srbiji.",
  path: "/kontejneri",
});

export default function ProductsPage() {
  return (
    <main id="main-content">
      <PageHeader
        index="03"
        eyebrow="Katalog"
        title="Tri linije"
        subtitle="Montažni objekti, modularni kontejneri i hale — izaberite liniju i otvorite tehnički list."
      />
      <section className="bg-ink py-16 sm:py-24">
        <Container className="space-y-20 sm:space-y-28">
          {catalogGroups.map((group, i) => (
            <article key={group.slug} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
              <ClipReveal className={i % 2 === 1 ? "lg:col-span-6 lg:order-2" : "lg:col-span-6"} delay={0.04}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={group.image}
                    alt={group.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </ClipReveal>
              <Reveal className={i % 2 === 1 ? "lg:col-span-6 lg:order-1" : "lg:col-span-6"} delay={0.08}>
                <p className="font-mono text-[11px] tracking-[0.28em] text-corten">{group.index}</p>
                <h2 className="mt-3 font-display text-4xl uppercase leading-none text-paper sm:text-5xl lg:text-6xl">
                  {group.title}
                </h2>
                <p className="mt-5 font-serif text-lg leading-relaxed text-muted">{group.lead}</p>
                <p className="mt-4 font-serif text-base leading-relaxed text-paper/70">{group.excerpt}</p>
                <Link
                  href={group.href}
                  className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-corten hover:text-corten-light"
                >
                  Otvori liniju
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Link>
              </Reveal>
            </article>
          ))}
        </Container>
      </section>
      <CtaMarquee />
    </main>
  );
}
