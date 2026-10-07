import type { Metadata } from "next";
import { CatalogGroupView } from "@/components/sections/catalog-group-view";
import { getCatalogGroup } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

const group = getCatalogGroup("hale")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Hale",
  description:
    "Montažne industrijske, magacinske i servisne hale MD Craft — čelična konstrukcija, rasponi i prateći moduli. Srbija.",
  path: "/hale",
});

export default function HalePage() {
  return <CatalogGroupView group={group} />;
}
