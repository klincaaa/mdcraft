import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { company, logoSrc, navItems } from "@/lib/content";
import { Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="relative block h-10 w-36 sm:h-11 sm:w-40">
              <Image
                src={logoSrc}
                alt={company.name}
                fill
                className="object-contain object-left brightness-0 invert"
                sizes="160px"
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-400">{company.tagline}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Navigacija</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              {navItems.slice(0, 5).map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="hover:text-amber-400">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Kontakt</p>
            <ul className="mt-4 space-y-3 text-sm text-zinc-300">
              <li>
                <a href={`tel:${company.phoneTel}`} className="inline-flex items-center gap-2 hover:text-amber-400">
                  <Phone className="h-4 w-4 shrink-0 text-amber-500" aria-hidden />
                  {company.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="hover:text-amber-400">
                  {company.email}
                </a>
              </li>
              <li className="text-zinc-500">
                {company.addressLine}
                <br />
                {company.city}
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Radno vreme</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              {company.hours.map((h) => (
                <li key={h.label} className="flex justify-between gap-4 border-b border-white/5 py-1">
                  <span className="text-zinc-500">{h.label}</span>
                  <span>{h.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {company.name}. Sva prava zadržana.</p>
          <p className="max-w-prose text-balance">
            Prodaja i modifikacija kontejnera, modularni objekti i kancelarijski moduli — Srbija.
          </p>
        </div>
      </Container>
    </footer>
  );
}
