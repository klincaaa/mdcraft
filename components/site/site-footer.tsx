import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { company, logoSrc, navItems, catalogGroups, brochure } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-paper/10 bg-ink">
      <Container className="py-16 sm:py-20">
        <p className="font-display text-[clamp(2.4rem,10vw,8rem)] uppercase leading-[0.8] text-paper">
          {company.shortName}
        </p>
        <p className="mt-4 max-w-xl font-serif text-lg text-muted">{company.tagline}</p>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-corten">Katalog</p>
            <ul className="mt-4 space-y-2 text-sm text-paper/80">
              {catalogGroups.map((g) => (
                <li key={g.slug}>
                  <Link href={g.href} className="hover:text-corten">
                    {g.title}
                  </Link>
                </li>
              ))}
              <li>
                <a href={brochure.href} target="_blank" rel="noopener noreferrer" className="hover:text-corten">
                  {brochure.label}
                </a>
              </li>
            </ul>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.28em] text-corten">Navigacija</p>
            <ul className="mt-4 columns-2 space-y-2 text-sm text-paper/80">
              {navItems.filter((n) => n.section !== "katalog").map((n) => (
                <li key={n.href} className="break-inside-avoid">
                  <Link href={n.href} className="hover:text-corten">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-corten">Kontakt</p>
            <ul className="mt-4 space-y-3 font-serif text-paper/80">
              <li>
                <a href={`tel:${company.phoneTel}`} className="hover:text-corten">
                  {company.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="hover:text-corten">
                  {company.email}
                </a>
              </li>
              <li>
                {company.addressLine}
                <br />
                {company.city}
              </li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-corten">Radno vreme</p>
            <ul className="mt-4 space-y-2 font-serif text-paper/80">
              {company.hours.map((h) => (
                <li key={h.label} className="flex justify-between gap-4 border-b border-paper/10 py-2">
                  <span className="text-muted">{h.label}</span>
                  <span>{h.value}</span>
                </li>
              ))}
            </ul>
            <div className="relative mt-8 h-10 w-36">
              <Image
                src={logoSrc}
                alt={company.name}
                fill
                className="object-contain object-left brightness-0 invert"
                sizes="144px"
              />
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-paper/10 pt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name}
          </p>
          <p>Prodaja i modifikacija kontejnera — Srbija</p>
        </div>
      </Container>
    </footer>
  );
}
