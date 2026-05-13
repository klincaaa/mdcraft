import type { Metadata } from "next";

export const siteUrl = "https://mdcraftkontejneri.rs";

export const siteKeywords = [
  "kontejneri",
  "stambeni kontejneri",
  "modularni objekti",
  "kancelarijski kontejneri",
  "prodaja kontejnera",
  "Srbija",
  "MD Craft",
  "Beograd",
  "montažni kontejneri",
];

export function buildPageMetadata({
  title,
  description,
  path = "",
  keywords = siteKeywords,
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
}): Metadata {
  const url = `${siteUrl}${path}`;
  const brand = "MD Craft Kontejneri";

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "sr_RS",
      url,
      siteName: brand,
      title: `${title} | ${brand}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${brand}`,
      description,
    },
    robots: { index: true, follow: true },
  };
}
