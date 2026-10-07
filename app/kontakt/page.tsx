import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/sections/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { company } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Kontakt",
  description: `Kontakt MD Craft — telefon ${company.phoneDisplay}, ${company.email}. ${company.addressLine}, ${company.city}.`,
  path: "/kontakt",
});

export default function ContactPage() {
  return (
    <main id="main-content">
      <PageHeader
        index="09"
        eyebrow="Podrška"
        title="Kontakt"
        subtitle="Spremni smo da odgovorimo na sva vaša pitanja — od prvog poziva do tehničkog predloga."
      />
      <section className="bg-ink py-16 sm:py-24">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <a
                  href={`tel:${company.phoneTel}`}
                  className="font-display text-4xl uppercase leading-none text-paper hover:text-corten sm:text-6xl"
                >
                  {company.phoneDisplay}
                </a>
                <a
                  href={`mailto:${company.email}`}
                  className="mt-4 block font-serif text-xl text-muted hover:text-corten"
                >
                  {company.email}
                </a>
                <p className="mt-8 font-serif text-paper/80">
                  {company.addressLine}
                  <br />
                  {company.city}
                </p>
                <ul className="mt-8 space-y-2 border-t border-paper/10 pt-6">
                  {company.hours.map((h) => (
                    <li key={h.label} className="flex justify-between gap-6 font-mono text-[11px] uppercase tracking-[0.18em]">
                      <span className="text-muted">{h.label}</span>
                      <span className="text-paper">{h.value}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal delay={0.08}>
                <p className="mb-10 font-mono text-[11px] uppercase tracking-[0.28em] text-corten">Pošaljite brief</p>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
