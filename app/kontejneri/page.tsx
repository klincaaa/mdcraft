import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { products } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Kontejneri i modularni objekti",
  description:
    "Stambeni kontejneri, kancelarijski moduli, skladišni i modularni objekti — prodaja i prilagođavanje za projekte u celoj Srbiji.",
  path: "/kontejneri",
});

export default function ProductsPage() {
  return (
    <main id="main-content">
      <PageHeader
        eyebrow="Katalog"
        title="Kontejneri / proizvodi"
        subtitle="Linije modula projektovane za brzu implementaciju, energetsku efikasnost i dug vek trajanja na terenu."
      />
      <section className="bg-zinc-950 py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <article className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/40">
                  <div className="relative aspect-[16/10]">
                    <Image src={p.image} alt={p.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 to-transparent" />
                  </div>
                  <div className="space-y-3 p-8">
                    <h2 className="font-[family-name:var(--font-display)] text-2xl uppercase tracking-wide text-white sm:text-3xl">
                      {p.title}
                    </h2>
                    <p className="leading-relaxed text-zinc-400">{p.excerpt}</p>
                    <p className="text-sm text-zinc-500">
                      Za tehnički list i opcionu opremu ({p.slug}) kontaktirajte nas — predložićemo konfiguraciju po vašem
                      budžetu i roku.
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
