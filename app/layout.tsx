import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Newsreader, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { FloatingCta } from "@/components/site/floating-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { logoSrc } from "@/lib/content";
import { siteKeywords, siteUrl } from "@/lib/seo";

const site = new URL(siteUrl);
const ogLogoUrl = new URL(logoSrc, site).toString();

const favicon16 = "/images/favicon-16x16-CFbayJj4.png";
const favicon32 = "/images/favicon-32x32-mWnUlOA9.png";

const display = Big_Shoulders({
  weight: ["700", "800"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: false,
});

const serif = Newsreader({
  subsets: ["latin", "latin-ext"],
  variable: "--font-news",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: site,
  applicationName: "MD Craft",
  title: {
    default: "MD Craft — modularni kontejneri, Srbija",
    template: "%s | MD Craft",
  },
  description:
    "Stambeni i kancelarijski kontejneri, modularni objekti i prodaja kontejnera. Projektovanje, proizvodnja i montaža — Beograd, Srbija.",
  keywords: siteKeywords,
  authors: [{ name: "MD Craft" }],
  creator: "MD Craft",
  openGraph: {
    type: "website",
    locale: "sr_RS",
    siteName: "MD Craft",
    images: [{ url: ogLogoUrl, alt: "MD Craft logo" }],
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
  themeColor: "#0b0a08",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr" className={`${display.variable} ${serif.variable} ${mono.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-ink text-paper antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-corten focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Preskoči na sadržaj
        </a>
        <JsonLd />
        <div className="grain" aria-hidden />
        <ScrollProgress />
        <SiteNav />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter />
        <FloatingCta />
      </body>
    </html>
  );
}
