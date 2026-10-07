import type { Metadata } from "next";
import { CatalogGroupView } from "@/components/sections/catalog-group-view";
import { getCatalogGroup } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

const group = getCatalogGroup("modularni-kontejneri")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Modularni kontejneri",
  description:
    "Stambeni i kancelarijski modularni kontejneri MD Craft — projektovanje, proizvodnja i montaža u Srbiji.",
  path: "/modularni-kontejneri",
});

export default function ModularniKontejneriPage() {
  return <CatalogGroupView group={group} />;
}
