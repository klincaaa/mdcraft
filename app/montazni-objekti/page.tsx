import type { Metadata } from "next";
import { CatalogGroupView } from "@/components/sections/catalog-group-view";
import { getCatalogGroup } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

const group = getCatalogGroup("montazni-objekti")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Montažni objekti",
  description:
    "Montažni objekti MD Craft — montažne kuće za stalni život i odmor. Projektovanje, proizvodnja i montaža u Srbiji.",
  path: "/montazni-objekti",
});

export default function MontazniObjektiPage() {
  return <CatalogGroupView group={group} />;
}
