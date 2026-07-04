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

const TILE_W = 175;
const TILE_H = 135;
const TILE_TALL_H = 185;
const TILE_WIDE_W = 260;
const GRID_GAP = 2;

type GridSlot = {
  item: Product;
  leftPct: number;
  topPct: number;
  widthPct: number;
  heightPct: number;
};

type GridLayout = {
  slots: GridSlot[];
  aspectRatio: number;
};

/**
 * Bố cục theo design:
 * - 3 cột canh trên bằng nhau
 * - ô thứ 2 (cột giữa, trên cùng) cao hơn
 * - ô thứ 6 và 12 (cột phải) rộng hơn, tràn sang phải
 */
function buildGridLayout(items: Product[]): GridLayout {
  const colX = [0, TILE_W + GRID_GAP, 2 * (TILE_W + GRID_GAP)];
  const containerW = colX[2] + TILE_WIDE_W;

  // Cột giữa canh trên; hai cột bên đẩy xuống đúng phần cao dư của ô tall
  // -> đáy hàng đầu bằng nhau nhưng ô thứ 2 (cột giữa) vẫn nhô lên
  const tallExtra = TILE_TALL_H - TILE_H;
  const cursorY = [tallExtra, 0, tallExtra];
  let maxBottom = TILE_TALL_H;

  const slots = items.map((item, index) => {
    const col = index % 3;
    const ordinal = index + 1;
    const isTall = ordinal === 2;
    const isWide = ordinal === 6 || ordinal === 12;
    const width = isWide ? TILE_WIDE_W : TILE_W;
    const height = isTall ? TILE_TALL_H : TILE_H;
    const top = cursorY[col];
    cursorY[col] += height + GRID_GAP;
    maxBottom = Math.max(maxBottom, top + height);

    return { item, left: colX[col], top, width, height };
  });

  const containerH = maxBottom;

  return {
    aspectRatio: containerW / containerH,
    slots: slots.map((slot) => ({
      item: slot.item,
      leftPct: (slot.left / containerW) * 100,
      topPct: (slot.top / containerH) * 100,
      widthPct: (slot.width / containerW) * 100,
      heightPct: (slot.height / containerH) * 100,
    })),
  };
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <p className="text-[12px] leading-relaxed text-gray-800 md:text-[14px] lg:text-[19px]">
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
      <span className="relative z-10 flex h-full items-center justify-center px-2 text-center text-[12px] font-bold leading-[1.15] text-white md:text-[14px] lg:text-[16px]">
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

  const layout = useMemo(() => buildGridLayout(gridItems), [gridItems]);

  if (!product) {
    return (
      <p className="hh-text-base text-center text-gray-500">
        Chưa có sản phẩm.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-10">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-10 xl:gap-12">
        <aside className="flex flex-col">
          <h2 className="mt-4 text-[18px] font-bold leading-snug text-gray-900 md:text-2xl lg:text-3xl">
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
              className="mt-4 w-fit rounded-lg bg-hh-red px-5 py-2.5 text-[12px] font-semibold text-white shadow-sm transition hover:bg-hh-red-hover sm:mt-8 sm:px-6 md:text-[14px] lg:text-[19px]"
            >
              {labels.price}: {product.price}
            </button>
          )}

          <p
            className={`text-[12px] text-gray-500 md:text-[14px] lg:text-[19px] lg:mt-10 ${hasPrice ? "mt-4" : "mt-4"}`}
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

        <div className="flex w-full min-w-0 flex-col gap-6 sm:gap-8 lg:w-[614px] lg:shrink-0 lg:justify-self-end">
          <div className="relative order-2 w-full lg:order-1">
            <div
              className="w-full"
              style={{ aspectRatio: layout.aspectRatio }}
              aria-hidden
            />
            {layout.slots.map((slot) => (
              <div
                key={slot.item.id}
                className="absolute"
                style={{
                  left: `${slot.leftPct}%`,
                  top: `${slot.topPct}%`,
                  width: `${slot.widthPct}%`,
                  height: `${slot.heightPct}%`,
                }}
              >
                <ProductGridTile
                  item={slot.item}
                  active={activeProductId === slot.item.id}
                  onSelect={() => setActiveProductId(slot.item.id)}
                />
              </div>
            ))}
          </div>

          <div className="order-1 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] lg:order-2">
            <div className="relative aspect-video w-full sm:aspect-2/1">
              <CmsImage
                key={product.id}
                src={product.thumbnail}
                alt={product.name}
                fill
                className=""
                sizes="(max-width: 1024px) 100vw, 614px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
