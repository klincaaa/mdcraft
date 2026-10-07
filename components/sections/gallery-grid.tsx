"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { galleryImages } from "@/lib/content";

export function GalleryGrid() {
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const current = active !== null ? galleryImages[active] : null;

  return (
    <>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {galleryImages.map((img, i) => (
          <li key={img.src} className={i % 5 === 0 ? "sm:col-span-2" : ""}>
            <button
              type="button"
              onClick={() => setActive(i)}
              className="group relative block w-full overflow-hidden"
              data-cursor="hover"
            >
              <motion.div
                className="relative aspect-[4/5] w-full sm:aspect-[3/4]"
                initial={reduce ? false : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-ink/0 transition group-hover:bg-ink/35" />
                <span className="absolute inset-x-0 bottom-0 translate-y-4 p-5 text-left font-mono text-[11px] uppercase tracking-[0.18em] text-paper opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                  {img.alt}
                </span>
              </motion.div>
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {current ? (
          <motion.div
            className="fixed inset-0 z-[85] flex items-center justify-center bg-ink/92 p-4 backdrop-blur-md sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal
            aria-label={current.alt}
          >
            <button
              type="button"
              className="absolute right-6 top-6 font-mono text-[11px] uppercase tracking-[0.28em] text-paper"
            >
              Zatvori
            </button>
            <motion.div
              className="relative h-[78vh] w-full max-w-5xl"
              initial={reduce ? false : { scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={current.src} alt={current.alt} fill className="object-contain" sizes="90vw" />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
