"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Product } from "@/lib/products";
import { images } from "@/lib/images";
import {
  getMobileTileAspect,
  getProductGridSlotStyle,
  PRODUCT_GRID_HEIGHT_PX,
  PRODUCT_GRID_SLOTS,
  PRODUCT_GRID_WIDTH_PX,
  splitMobileZigzagColumns,
} from "./productGridPlacements";

const MAX_GRID_BLOCKS = 12;

type ProductsPageLayoutProps = {
  items: Product[];
  defaultActiveIndex?: number;
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
      <Image
        src={item.thumbnail}
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 33vw, 260px"
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
  defaultActiveIndex = 0,
  labels,
}: ProductsPageLayoutProps) {
  const gridItems = useMemo(() => items.slice(0, MAX_GRID_BLOCKS), [items]);

  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const product = gridItems[activeIndex] ?? gridItems[0];

  const { col1: mobileCol1, col2: mobileCol2 } = useMemo(
    () => splitMobileZigzagColumns(PRODUCT_GRID_SLOTS),
    [],
  );

  if (!product) return null;

  const renderMobileSlot = (slot: (typeof PRODUCT_GRID_SLOTS)[number]) => {
    const item = gridItems[slot.itemIndex];
    if (!item) return null;
    return (
      <div
        key={item.id}
        className="min-w-0 w-full"
        style={{ aspectRatio: getMobileTileAspect(slot) }}
      >
        <ProductGridTile
          item={item}
          active={activeIndex === slot.itemIndex}
          onSelect={() => setActiveIndex(slot.itemIndex)}
        />
      </div>
    );
  };

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

          <button
            type="button"
            className="hh-text-base mt-6 w-fit rounded-lg bg-hh-red px-5 py-2.5 font-semibold text-white shadow-sm transition hover:bg-hh-red-hover sm:mt-8 sm:px-6"
          >
            {labels.price}: {product.price}
          </button>

          <p className="hh-text-sm mt-8 text-gray-500 lg:mt-10">
            {labels.date}: {product.date}{" "}
            <span className="text-gray-400">|</span>{" "}
            <Link href="/contact" className="underline hover:text-hh-blue">
              {labels.contact}
            </Link>
          </p>
        </aside>

        <div className="w-full min-w-0 lg:w-full lg:max-w-[614px] lg:shrink-0 lg:justify-self-end">
          {/* Mobile: 2 cột zigzag — cột 2 lệch nửa ô so với cột 1 */}
          <div className="flex gap-[2px] lg:hidden">
            <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
              {mobileCol1.map(renderMobileSlot)}
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
              <div
                className="w-full shrink-0"
                style={{ aspectRatio: "350/135" }}
                aria-hidden
              />
              {mobileCol2.map(renderMobileSlot)}
            </div>
          </div>

          {/* Desktop: lưới 3×4 kích thước theo mockup */}
          <div
            className="relative hidden lg:block"
            style={{
              width: PRODUCT_GRID_WIDTH_PX,
              height: PRODUCT_GRID_HEIGHT_PX,
            }}
          >
            {PRODUCT_GRID_SLOTS.map((slot) => {
              const item = gridItems[slot.itemIndex];
              if (!item) return null;
              const pos = getProductGridSlotStyle(slot);
              return (
                <div
                  key={item.id}
                  className="absolute"
                  style={{
                    left: pos.left,
                    top: pos.top,
                    width: pos.width,
                    height: pos.height,
                  }}
                >
                  <ProductGridTile
                    item={item}
                    active={activeIndex === slot.itemIndex}
                    onSelect={() => setActiveIndex(slot.itemIndex)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
        <div className="relative aspect-[16/9] w-full sm:aspect-[2/1]">
          <Image
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
