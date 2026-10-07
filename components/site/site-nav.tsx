"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { company, logoSrc, navItems, products, catalogGroups } from "@/lib/content";

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-16 items-center justify-between px-4 sm:h-[4.5rem] sm:px-8">
        <Link href="/" className="relative z-50 flex items-center gap-3 mix-blend-difference">
          <span className="relative h-9 w-28 sm:h-10 sm:w-32">
            <Image
              src={logoSrc}
              alt={company.name}
              fill
              className="object-contain object-left brightness-0 invert"
              sizes="128px"
              priority
            />
          </span>
        </Link>

        <div className="relative z-50 flex items-center gap-5">
          <a
            href={`tel:${company.phoneTel}`}
            className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-paper mix-blend-difference sm:inline"
          >
            {company.phoneDisplay}
          </a>
          <button
            type="button"
            className="group flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-paper"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="mix-blend-difference">{open ? "Zatvori" : "Meni"}</span>
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-paper/30">
              <span className={`absolute h-px w-4 bg-paper transition ${open ? "rotate-45" : "-translate-y-1"}`} />
              <span className={`absolute h-px w-4 bg-paper transition ${open ? "-rotate-45" : "translate-y-1"}`} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="site-menu"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 flex flex-col justify-center overflow-y-auto bg-ink/95 px-6 py-24 backdrop-blur-xl sm:px-16"
            aria-label="Glavna navigacija"
          >
            <ul className="mx-auto w-full max-w-5xl">
              {navItems.map((item, i) => {
                const productMatch = products.find((p) => pathname === `/kontejneri/${p.slug}`);
                const productGroupHref = productMatch
                  ? catalogGroups.find((g) => g.slug === productMatch.group)?.href
                  : undefined;
                const active = pathname === item.href || productGroupHref === item.href;
                return (
                  <li key={item.href} className="overflow-hidden border-b border-paper/10">
                    <motion.div
                      initial={reduce ? false : { y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.04 + i * 0.03, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={item.href}
                        className="group flex items-baseline justify-between py-2.5 sm:py-3"
                      >
                        <span className="font-mono text-[11px] tracking-[0.24em] text-corten">{item.index}</span>
                        <span
                          className={`font-display text-[clamp(1.45rem,4.6vw,3.4rem)] uppercase leading-none transition-colors ${
                            active ? "text-corten" : "text-paper group-hover:text-corten"
                          }`}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </motion.div>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
