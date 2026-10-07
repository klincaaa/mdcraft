import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { ClipReveal } from "@/components/motion/clip-reveal";
import { PremiumButton } from "@/components/ui/premium-button";
import { CtaMarquee } from "@/components/sections/cta-marquee";
import { products, catalogGroups } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return buildPageMetadata({ title: "Kontejner", description: "", path: "/kontejneri" });
  return buildPageMetadata({
    title: product.title,
    description: product.excerpt,
    path: `/kontejneri/${product.slug}`,
  });
}

export default async function ProductDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const others = products.filter((p) => p.slug !== product.slug);
  const parentGroup = catalogGroups.find((g) => g.slug === product.group);

  return (
    <main id="main-content">
      <PageHeader
        index={product.index}
        eyebrow={parentGroup?.title ?? "Modul"}
        title={product.title}
        subtitle={product.lead}
      />
      <section className="bg-ink py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <ClipReveal className="lg:col-span-7">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
              </div>
            </ClipReveal>
            <div className="lg:col-span-5">
              <Reveal>
                <p className="font-serif text-lg leading-relaxed text-paper/80">{product.body}</p>
              </Reveal>
              <dl className="mt-10 divide-y divide-paper/10 border-y border-paper/10">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between gap-6 py-4">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{spec.label}</dt>
                    <dd className="text-right font-serif text-paper">{spec.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-col items-start gap-5">
                {parentGroup ? (
                  <Link
                    href={parentGroup.href}
                    className="font-mono text-[11px] uppercase tracking-[0.22em] text-corten hover:text-corten-light"
                  >
                    ← {parentGroup.title}
                  </Link>
                ) : null}
                <PremiumButton href="/kontakt">Zatražite ponudu</PremiumButton>
              </div>
            </div>
          </div>
          <ul className="mt-16 grid gap-4 sm:grid-cols-2">
            {product.features.map((f, i) => (
              <Reveal key={f} delay={i * 0.05}>
                <li className="border-l border-corten pl-5 font-serif text-paper/80">{f}</li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>
      <section className="border-t border-paper/10 bg-graphite py-16 sm:py-20">
        <Container>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-corten">Ostali moduli</p>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {others.map((p) => (
              <Link key={p.slug} href={`/kontejneri/${p.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="33vw"
                  />
                </div>
                <p className="mt-3 font-display text-2xl uppercase text-paper group-hover:text-corten">{p.title}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <CtaMarquee />
    </main>
  );
}
