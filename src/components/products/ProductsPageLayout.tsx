"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { CmsImage } from "@/components/ui/CmsImage";
import { Link } from "@/i18n/navigation";
import { DEFAULT_PRODUCT_ID } from "@/data/products";
import type { ProductCategory } from "@/lib/api/types";
import type { Product } from "@/lib/products";
import { images } from "@/lib/images";

type ProductsPageLayoutProps = {
  items: Product[];
  categories: ProductCategory[];
  initialCategoryKey?: string;
  labels: {
    description: string;
    packing: string;
    size: string;
    price: string;
    date: string;
    contact: string;
  };
};

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <p className="hh-text-base text-gray-800">
      <span className="font-bold">{label}: </span>
      {value}
    </p>
  );
}

function ProductGridTile({
  item,
  active,
  onSelect,
}: {
  item: Product;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="relative h-full w-full overflow-hidden rounded-lg shadow-sm transition"
    >
      <CmsImage
        src={item.thumbnail}
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 33vw, 200px"
      />
      <span
        className={`absolute inset-0 transition ${
          active ? "bg-hh-red/80" : "bg-[#1a4a72]/80"
        }`}
        aria-hidden
      />
      <span className="hh-text-xs relative z-10 flex h-full items-center justify-center px-2 text-center font-bold leading-[1.15] text-white">
        {item.name}
      </span>
    </button>
  );
}

export function ProductsPageLayout({
  items,
  categories,
  initialCategoryKey,
  labels,
}: ProductsPageLayoutProps) {
  const visibleCategories = useMemo(() => {
    const keysWithProducts = new Set(items.map((item) => item.categoryKey));
    return categories.filter((category) => keysWithProducts.has(category.key));
  }, [categories, items]);

  const gridItems = useMemo(() => {
    if (
      initialCategoryKey &&
      visibleCategories.some((category) => category.key === initialCategoryKey)
    ) {
      return items.filter((item) => item.categoryKey === initialCategoryKey);
    }

    return items;
  }, [items, initialCategoryKey, visibleCategories]);

  const [activeProductId, setActiveProductId] = useState<number | null>(() => {
    const preferred = gridItems.find((item) => item.id === DEFAULT_PRODUCT_ID);
    return preferred?.id ?? gridItems[0]?.id ?? null;
  });

  useEffect(() => {
    const preferred = gridItems.find((item) => item.id === DEFAULT_PRODUCT_ID);
    setActiveProductId(preferred?.id ?? gridItems[0]?.id ?? null);
  }, [initialCategoryKey, gridItems]);

  const product =
    gridItems.find((item) => item.id === activeProductId) ?? gridItems[0];

  const hasPrice = (product?.priceVnd ?? 0) > 0;
  const hasDate = Boolean(product?.date?.trim() && product.date.trim() !== "—");

  if (!product) {
    return (
      <p className="hh-text-base text-center text-gray-500">
        Chưa có sản phẩm.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-8 sm:gap-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-10 xl:gap-12">
        <aside className="flex flex-col">
          <Image
            src={images.iconFish}
            alt=""
            width={40}
            height={14}
            className="h-3.5 w-10 shrink-0 object-contain"
            aria-hidden
          />

          <h2 className="hh-text-3xl mt-4 font-bold leading-snug text-gray-900">
            {product.name}
          </h2>
          <div className="mt-3 h-px w-full max-w-md bg-gray-300" aria-hidden />

          <div className="mt-5 space-y-2 sm:mt-6 sm:space-y-2.5">
            <SpecRow label={labels.description} value={product.description} />
            <SpecRow label={labels.packing} value={product.packing || "—"} />
            <SpecRow label={labels.size} value={product.size} />
          </div>

          {hasPrice && (
            <button
              type="button"
              className="hh-text-base mt-6 w-fit rounded-lg bg-hh-red px-5 py-2.5 font-semibold text-white shadow-sm transition hover:bg-hh-red-hover sm:mt-8 sm:px-6"
            >
              {labels.price}: {product.price}
            </button>
          )}

          <p
            className={`hh-text-sm text-gray-500 lg:mt-10 ${hasPrice ? "mt-8" : "mt-6"}`}
          >
            {hasDate && (
              <>
                {labels.date}: {product.date}{" "}
                <span className="text-gray-400">|</span>{" "}
              </>
            )}
            <Link href="/contact" className="underline hover:text-hh-blue">
              {labels.contact}
            </Link>
          </p>
        </aside>

        <div className="w-full min-w-0 lg:max-w-[614px] lg:shrink-0 lg:justify-self-end">
          <div className="flex flex-wrap gap-[2px]">
            {gridItems.map((item) => (
              <div
                key={item.id}
                className="aspect-[175/135] min-w-0 w-[calc(50%-1px)] sm:w-[calc(33.333%-2px)]"
              >
                <ProductGridTile
                  item={item}
                  active={activeProductId === item.id}
                  onSelect={() => setActiveProductId(item.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
        <div className="relative aspect-video w-full sm:aspect-2/1">
          <CmsImage
            key={product.id}
            src={product.thumbnail}
            alt={product.name}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 960px"
            priority
          />
        </div>
      </div>
    </div>
  );
}
