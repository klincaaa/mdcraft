import { company, logoSrc } from "@/lib/content";
import { siteUrl } from "@/lib/seo";

export function JsonLd() {
  const logoAbsolute = new URL(logoSrc, siteUrl).toString();

  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: company.name,
    description: company.description,
    image: logoAbsolute,
    url: siteUrl,
    telephone: company.phoneTel,
    email: company.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.addressLine,
      addressLocality: "Beograd",
      postalCode: "11000",
      addressCountry: "RS",
    },
    areaServed: { "@type": "Country", name: "Serbia" },
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "14:00",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
