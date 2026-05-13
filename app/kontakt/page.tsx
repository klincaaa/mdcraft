import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/sections/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { company } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Kontakt",
  description: `Kontakt MD Craft Kontejneri — telefon ${company.phoneDisplay}, ${company.email}. ${company.addressLine}, ${company.city}.`,
  path: "/kontakt",
});

export default function ContactPage() {
  return (
    <main id="main-content">
      <PageHeader
        eyebrow="Podrška"
        title="Kontaktirajte nas"
        subtitle="Spremni smo da odgovorimo na sva vaša pitanja — od prvog poziva do tehničkog predloga."
      />
      <section className="bg-zinc-950 py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            <div className="space-y-8 lg:col-span-2">
              <Reveal>
                <h2 className="text-lg font-semibold text-white">Kontakt informacije</h2>
                <ul className="mt-6 space-y-5 text-sm text-zinc-300">
                  <li className="flex gap-3">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" aria-hidden />
                    <a href={`tel:${company.phoneTel}`} className="hover:text-amber-400">
                      {company.phoneDisplay}
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" aria-hidden />
                    <a href={`mailto:${company.email}`} className="hover:text-amber-400">
                      {company.email}
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" aria-hidden />
                    <span>
                      {company.addressLine}
                      <br />
                      {company.city}
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" aria-hidden />
                    <span>
                      {company.hours.map((h) => (
                        <span key={h.label} className="block">
                          {h.label}: {h.value}
                        </span>
                      ))}
                    </span>
                  </li>
                </ul>
              </Reveal>
            </div>
            <div className="lg:col-span-3">
              <Reveal delay={0.08}>
                <h2 className="mb-6 text-lg font-semibold text-white">Pošaljite poruku</h2>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
