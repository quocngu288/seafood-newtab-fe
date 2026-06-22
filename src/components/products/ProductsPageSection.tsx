import { getTranslations } from "next-intl/server";
import { fetchProducts } from "@/lib/api/server";
import type { Locale } from "@/lib/api/types";
import {
  getDefaultProductIndex,
  mapApiProducts,
  mergeProductTranslations,
  type ProductTranslation,
} from "@/lib/products";
import { ProductsPageLayout } from "./ProductsPageLayout";

type Props = {
  locale: string;
};

export async function ProductsPageSection({ locale }: Props) {
  const t = await getTranslations("pages.products");

  let items = mergeProductTranslations(
    t.raw("items") as ProductTranslation[],
  );

  try {
    const apiProducts = await fetchProducts(locale as Locale);
    items = mapApiProducts(apiProducts);
  } catch {
    // fallback to static JSON messages
  }

  const defaultActiveIndex = getDefaultProductIndex(items);

  return (
    <ProductsPageLayout
      items={items}
      defaultActiveIndex={defaultActiveIndex}
      labels={{
        description: t("labels.description"),
        packing: t("labels.packing"),
        size: t("labels.size"),
        price: t("labels.price"),
        date: t("labels.date"),
        contact: t("labels.contact"),
      }}
    />
  );
}
