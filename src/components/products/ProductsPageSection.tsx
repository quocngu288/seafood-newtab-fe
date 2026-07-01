import { getTranslations } from "next-intl/server";
import { fetchProductCategories, fetchProducts } from "@/lib/api/server";
import type { Locale, ProductCategory } from "@/lib/api/types";
import { getFallbackProductCategories } from "@/lib/product-categories";
import {
  mapApiProducts,
  mergeProductTranslations,
  type ProductTranslation,
} from "@/lib/products";
import { ProductsPageLayout } from "./ProductsPageLayout";

type Props = {
  locale: string;
  initialCategoryKey?: string;
};

export async function ProductsPageSection({
  locale,
  initialCategoryKey,
}: Props) {
  const t = await getTranslations("pages.products");
  const resolvedLocale = locale as Locale;

  let items = mergeProductTranslations(
    t.raw("items") as ProductTranslation[],
    resolvedLocale,
  );
  let categories: ProductCategory[] =
    getFallbackProductCategories(resolvedLocale);

  try {
    const [apiProducts, apiCategories] = await Promise.all([
      fetchProducts(resolvedLocale),
      fetchProductCategories(resolvedLocale),
    ]);
    items = mapApiProducts(apiProducts);
    categories = apiCategories;
  } catch {
    // fallback to static JSON messages
  }

  return (
    <ProductsPageLayout
      items={items}
      categories={categories}
      initialCategoryKey={initialCategoryKey}
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
