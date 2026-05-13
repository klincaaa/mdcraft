import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { processSteps } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Proces izrade",
  description:
    "Skiciranje, projektovanje, proizvodnja i montaža modularnih kontejnera — transparentan proces MD Craft u Srbiji.",
  path: "/proces",
});

export default function ProcessPage() {
  return (
    <main id="main-content">
      <PageHeader
        eyebrow="Metodologija"
        title="Proces izrade"
        subtitle="Vodimo vas kroz svaki korak — od konceptualizacije do završne montaže, uz jasne kontrolne tačke."
      />
      <section className="bg-zinc-950 py-16 sm:py-20">
        <Container>
          <ol className="relative space-y-0 border-l border-white/10 pl-8 sm:pl-12">
            {processSteps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.07}>
                <li className="relative pb-14 last:pb-0">
                  <span className="absolute -left-[1.125rem] top-0 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-amber-500/40 bg-zinc-900 text-sm font-bold text-amber-400 sm:-left-[1.35rem]">
                    {step.step}
                  </span>
                  <h2 className="text-xl font-semibold text-white sm:text-2xl">{step.title}</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">{step.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>
    </main>
  );
}
