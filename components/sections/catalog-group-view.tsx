import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { CtaMarquee } from "@/components/sections/cta-marquee";
import { Container } from "@/components/ui/container";
import { PremiumButton } from "@/components/ui/premium-button";
import { ClipReveal } from "@/components/motion/clip-reveal";
import { Reveal } from "@/components/motion/reveal";
import {
  catalogGroups,
  products,
  type CatalogGroup,
} from "@/lib/content";

export function CatalogGroupView({ group }: { group: CatalogGroup }) {
  const relatedProducts = products.filter((p) =>
    (group.productSlugs as readonly string[]).includes(p.slug),
  );
  const otherGroups = catalogGroups.filter((g) => g.slug !== group.slug);

  return (
    <main id="main-content">
      <PageHeader
        index={group.index}
        eyebrow="Katalog"
        title={group.title}
        subtitle={group.lead}
      />

      <section className="bg-ink py-16 sm:py-24">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <ClipReveal className="lg:col-span-7">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={group.image}
                  alt={group.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
              </div>
            </ClipReveal>
            <div className="lg:col-span-5">
              {group.paragraphs.map((p, i) => (
                <Reveal key={p} delay={i * 0.06}>
                  <p className="mt-5 font-serif text-lg leading-relaxed text-paper/80 first:mt-0">
                    {p}
                  </p>
                </Reveal>
              ))}
              <dl className="mt-10 divide-y divide-paper/10 border-y border-paper/10">
                {group.specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between gap-6 py-4">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                      {spec.label}
                    </dt>
                    <dd className="text-right font-serif text-paper">{spec.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8">
                <PremiumButton href="/kontakt">Zatražite ponudu</PremiumButton>
              </div>
            </div>
          </div>

          <div className="mt-20 grid gap-10 border-t border-paper/10 pt-14 lg:grid-cols-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-corten lg:col-span-3">
              Namene
            </p>
            <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-9">
              {group.applications.map((item, i) => (
                <Reveal key={item} delay={i * 0.04}>
                  <li className="border-l border-corten pl-5 font-serif text-lg text-paper/85">{item}</li>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {relatedProducts.length > 0 ? (
        <section className="border-t border-paper/10 bg-graphite py-16 sm:py-24">
          <Container>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-corten">U ovoj liniji</p>
            <h2 className="mt-3 font-display text-4xl uppercase leading-none text-paper sm:text-5xl">
              Saznajte više
            </h2>
            <div className="mt-12 grid gap-10 md:grid-cols-2">
              {relatedProducts.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.06}>
                  <Link href={`/kontejneri/${p.slug}`} className="group block">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <p className="mt-4 font-mono text-[11px] tracking-[0.24em] text-corten">{p.index}</p>
                    <h3 className="mt-2 font-display text-3xl uppercase leading-none text-paper group-hover:text-corten">
                      {p.title}
                    </h3>
                    <p className="mt-3 font-serif leading-relaxed text-muted">{p.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-corten">
                      Detaljnije
                      <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="border-t border-paper/10 bg-ink py-16 sm:py-20">
        <Container>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-corten">Ostale grupe</p>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {otherGroups.map((g) => (
              <Link key={g.slug} href={g.href} className="group block border-t border-paper/10 pt-6">
                <p className="font-mono text-[11px] tracking-[0.24em] text-corten">{g.index}</p>
                <h3 className="mt-2 font-display text-3xl uppercase text-paper group-hover:text-corten">
                  {g.title}
                </h3>
                <p className="mt-3 font-serif text-muted">{g.excerpt}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <CtaMarquee />
    </main>
  );
}
