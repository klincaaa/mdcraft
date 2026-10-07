import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { ClipReveal } from "@/components/motion/clip-reveal";
import { CtaMarquee } from "@/components/sections/cta-marquee";
import { aboutCopy, aboutHighlights, company, galleryImages, stats } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { StatCounter } from "@/components/motion/stat-counter";

export const metadata: Metadata = buildPageMetadata({
  title: "O nama",
  description: `MD Craft — ${company.description} Poslovna adresa: ${company.addressLine}, ${company.city}.`,
  path: "/o-nama",
});

export default function AboutPage() {
  return (
    <main id="main-content">
      <PageHeader
        index="02"
        eyebrow="Tim i vrednosti"
        title="O nama"
        subtitle={aboutCopy.lead}
      />
      <section className="border-b border-paper/10 bg-ink py-20 sm:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              {aboutCopy.paragraphs.map((p, i) => (
                <Reveal key={p} delay={i * 0.06}>
                  <p className="mt-6 font-serif text-lg leading-relaxed text-paper/80 first:mt-0 sm:text-xl">
                    {p}
                  </p>
                </Reveal>
              ))}
              <Reveal delay={0.2}>
                <p className="mt-10 max-w-xl font-display text-3xl uppercase leading-none text-corten sm:text-4xl">
                  {company.manifesto}
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <ClipReveal>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={galleryImages[2].src}
                    alt={galleryImages[2].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              </ClipReveal>
              <ul className="mt-8 space-y-4">
                {aboutHighlights.map((line) => (
                  <li key={line} className="flex gap-3 border-b border-paper/10 pb-4 font-serif text-paper/85">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-corten" aria-hidden />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
      <section className="bg-graphite py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-5xl uppercase text-paper sm:text-6xl">
                  <StatCounter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <CtaMarquee />
    </main>
  );
}
