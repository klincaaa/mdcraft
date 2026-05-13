import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { galleryImages } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

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
        eyebrow="Fotografije"
        title="Galerija"
        subtitle="Autentične realizacije — spojevi modula, fasade i završna obrada u realnim uslovima."
      />
      <section className="bg-zinc-950 py-16 sm:py-20">
        <Container>
          <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 lg:gap-5 [&>li]:mb-4 [&>li]:break-inside-avoid lg:[&>li]:mb-5">
            {galleryImages.map((img) => (
              <li key={img.src}>
                <figure className="group relative overflow-hidden rounded-2xl ring-1 ring-white/10">
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <figcaption className="sr-only">{img.alt}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </main>
  );
}
