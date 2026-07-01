import type { StaticImageData } from "next/image";
import type { ApiProduct } from "@/lib/api/types";
import {
  DEFAULT_PRODUCT_ID,
  PRODUCT_THUMBNAILS_BY_ID,
} from "@/data/products";
import {
  getFallbackProductCategories,
  PRODUCT_CATEGORY_BY_ID,
} from "@/lib/product-categories";
import { resolveProductImageUrl } from "@/lib/product-media";
import { resolveThumbnail } from "@/lib/thumbnails";
import { images } from "@/lib/images";

export type ProductTranslation = {
  id: number;
  name: string;
  description: string;
  packing: string;
  size: string;
  price: string;
  priceVnd: number;
  date: string;
};

export type Product = ProductTranslation & {
  categoryKey: string;
  categoryName: string;
  /** URL string for uploaded images, StaticImageData for legacy fallback */
  thumbnail: string | StaticImageData;
};

export function mergeProductTranslations(
  translations: ProductTranslation[],
  locale: "vi" | "en" = "vi",
): Product[] {
  const fallbackLabels = new Map(
    getFallbackProductCategories(locale).map((c) => [c.key, c.name]),
  );

  return translations.map((item) => {
    const entry = PRODUCT_THUMBNAILS_BY_ID[item.id];
    const categoryKey = PRODUCT_CATEGORY_BY_ID[item.id] ?? "other-cuts";

    return {
      ...item,
      categoryKey,
      categoryName: fallbackLabels.get(categoryKey) ?? categoryKey,
      thumbnail: entry?.thumbnail ?? images.heroSlide,
    };
  });
}

function resolveThumbnailSrc(
  item: ApiProduct,
): string | StaticImageData {
  const uploaded = resolveProductImageUrl(item.thumbnailUrl, item.thumbnailKey);
  if (uploaded) return uploaded;

  if (item.thumbnailKey) {
    return resolveThumbnail(item.thumbnailKey);
  }

  return images.heroSlide;
}

export function mapApiProducts(items: ApiProduct[]): Product[] {
  return items.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    packing: item.packing,
    size: item.size,
    price: item.price,
    priceVnd: item.priceVnd,
    date: item.date,
    categoryKey:
      item.categoryKey ||
      PRODUCT_CATEGORY_BY_ID[item.id] ||
      "other-cuts",
    categoryName: item.categoryName,
    thumbnail: resolveThumbnailSrc(item),
  }));
}

export function getDefaultProductIndex(products: Product[]): number {
  const index = products.findIndex((p) => p.id === DEFAULT_PRODUCT_ID);
  return index >= 0 ? index : 0;
}
