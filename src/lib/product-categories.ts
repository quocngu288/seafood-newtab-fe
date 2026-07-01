import type { Locale } from "@/lib/api/types";

export type ProductCategory = {
  key: string;
  name: string;
  sortOrder: number;
};

/** Fallback khi API không khả dụng */
export const FALLBACK_PRODUCT_CATEGORIES: Array<{
  key: string;
  sortOrder: number;
  label: Record<Locale, string>;
}> = [
  {
    key: "fillets",
    sortOrder: 0,
    label: { vi: "Fillet", en: "Fillets" },
  },
  {
    key: "whole-fish",
    sortOrder: 1,
    label: { vi: "Cá nguyên con", en: "Whole Fish" },
  },
  {
    key: "other-cuts",
    sortOrder: 2,
    label: { vi: "Các phần cắt khác", en: "Other Cuts" },
  },
];

export function getFallbackProductCategories(locale: Locale): ProductCategory[] {
  return FALLBACK_PRODUCT_CATEGORIES.map((category) => ({
    key: category.key,
    name: category.label[locale],
    sortOrder: category.sortOrder,
  })).sort((a, b) => a.sortOrder - b.sortOrder);
}

export const PRODUCT_CATEGORY_BY_ID: Record<number, string> = {
  1: "other-cuts",
  2: "other-cuts",
  3: "other-cuts",
  4: "fillets",
  5: "other-cuts",
  6: "other-cuts",
  7: "other-cuts",
  8: "fillets",
  9: "whole-fish",
  10: "other-cuts",
  11: "fillets",
  12: "other-cuts",
};
