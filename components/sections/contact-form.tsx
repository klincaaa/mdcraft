"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Send } from "lucide-react";
import { company } from "@/lib/content";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const reduce = useReducedMotion();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "");
    const email = String(fd.get("email") ?? "");
    const phone = String(fd.get("phone") ?? "");
    const message = String(fd.get("message") ?? "");
    const subject = encodeURIComponent(`Upit sa sajta — ${name}`);
    const body = encodeURIComponent(
      `Ime: ${name}\nEmail: ${email}\nTelefon: ${phone}\n\nPoruka:\n${message}`,
    );
    window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  const field =
    "w-full border-0 border-b border-paper/20 bg-transparent px-0 py-3 font-serif text-paper outline-none transition focus:border-corten";

  return (
    <motion.form
      onSubmit={onSubmit}
      className="space-y-8"
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
    >
      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block space-y-2 text-sm">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">Ime i prezime</span>
          <input name="name" required className={field} autoComplete="name" />
        </label>
        <label className="block space-y-2 text-sm">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">Email</span>
          <input name="email" type="email" required className={field} autoComplete="email" />
        </label>
      </div>
      <label className="block space-y-2 text-sm">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">Telefon</span>
        <input name="phone" type="tel" className={field} autoComplete="tel" />
      </label>
      <label className="block space-y-2 text-sm">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">Poruka</span>
        <textarea name="message" required rows={5} className={`${field} resize-y`} />
      </label>
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-corten py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-ink hover:bg-corten-light sm:w-auto sm:px-12"
      >
        <Send className="h-4 w-4" aria-hidden />
        Pošalji poruku
      </button>
      {status === "sent" ? (
        <p className="font-serif text-sm text-corten" role="status">
          Ako se klijent e-pošte nije otvorio automatski, proverite podešavanja uređaja ili nas pozovite direktno.
        </p>
      ) : null}
    </motion.form>
  );
}
