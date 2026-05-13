import type { Metadata, Viewport } from "next";
import { Archivo_Black, DM_Sans } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { FloatingCta } from "@/components/site/floating-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { logoSrc } from "@/lib/content";
import { siteKeywords, siteUrl } from "@/lib/seo";

const site = new URL(siteUrl);
const ogLogoUrl = new URL(logoSrc, site).toString();

const favicon16 = "/images/favicon-16x16-CFbayJj4.png";
const favicon32 = "/images/favicon-32x32-mWnUlOA9.png";

const display = Archivo_Black({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: site,
  applicationName: "MD Craft Kontejneri",
  title: {
    default: "MD Craft Kontejneri — modularni kontejneri, Srbija",
    template: "%s | MD Craft Kontejneri",
  },
  description:
    "Stambeni i kancelarijski kontejneri, modularni objekti i prodaja kontejnera. Projektovanje, proizvodnja i montaža — Beograd, Srbija.",
  keywords: siteKeywords,
  authors: [{ name: "MD Craft Kontejneri" }],
  creator: "MD Craft Kontejneri",
  openGraph: {
    type: "website",
    locale: "sr_RS",
    siteName: "MD Craft Kontejneri",
    images: [{ url: ogLogoUrl, alt: "MD Craft Kontejneri logo" }],
  },
  twitter: {
    card: "summary_large_image",
    images: [ogLogoUrl],
  },
  icons: {
    icon: [
      { url: favicon16, sizes: "16x16", type: "image/png" },
      { url: favicon32, sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: logoSrc, sizes: "180x180", type: "image/png" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr" className={`${display.variable} ${sans.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-zinc-950 font-sans text-zinc-100 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-amber-400 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-zinc-950"
        >
          Preskoči na sadržaj
        </a>
        <JsonLd />
        <SiteNav />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter />
        <FloatingCta />
      </body>
    </html>
  );
}
