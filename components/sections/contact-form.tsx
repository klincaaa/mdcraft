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

  return (
    <motion.form
      onSubmit={onSubmit}
      className="space-y-5 rounded-3xl border border-white/10 bg-zinc-900/50 p-6 shadow-2xl shadow-black/40 backdrop-blur sm:p-8"
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block space-y-2 text-sm">
          <span className="text-zinc-400">Ime i prezime</span>
          <input
            name="name"
            required
            className="w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none ring-amber-500/0 transition focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/30"
            autoComplete="name"
          />
        </label>
        <label className="block space-y-2 text-sm">
          <span className="text-zinc-400">Email</span>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/30"
            autoComplete="email"
          />
        </label>
      </div>
      <label className="block space-y-2 text-sm">
        <span className="text-zinc-400">Telefon</span>
        <input
          name="phone"
          type="tel"
          className="w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/30"
          autoComplete="tel"
        />
      </label>
      <label className="block space-y-2 text-sm">
        <span className="text-zinc-400">Poruka</span>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full resize-y rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/30"
        />
      </label>
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 py-3.5 text-sm font-semibold text-zinc-950 hover:from-amber-400 hover:to-amber-300 sm:w-auto sm:px-10"
      >
        <Send className="h-4 w-4" aria-hidden />
        Pošalji poruku
      </button>
      {status === "sent" ? (
        <p className="text-sm text-amber-400/90" role="status">
          Ako se klijent e-pošte nije otvorio automatski, proverite podešavanja uređaja ili nas pozovite direktno.
        </p>
      ) : null}
    </motion.form>
  );
}
