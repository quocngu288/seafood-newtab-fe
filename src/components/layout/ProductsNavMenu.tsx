"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { publicApi } from "@/lib/api/client";
import type { Locale, ProductCategory } from "@/lib/api/types";
import { getFallbackProductCategories } from "@/lib/product-categories";
import { images } from "@/lib/images";

type ProductsNavMenuProps = {
  label: string;
  active: boolean;
  onNavigate?: () => void;
};

export function ProductsNavMenu({
  label,
  active,
  onNavigate,
}: ProductsNavMenuProps) {
  const locale = useLocale() as Locale;
  const rootRef = useRef<HTMLLIElement>(null);
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<ProductCategory[]>(() =>
    getFallbackProductCategories(locale),
  );

  useEffect(() => {
    publicApi
      .getProductCategories(locale)
      .then(setCategories)
      .catch(() => setCategories(getFallbackProductCategories(locale)));
  }, [locale]);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const categoryHref = (key: string) =>
    `/products?category=${encodeURIComponent(key)}`;

  function handleCategoryClick() {
    setOpen(false);
    onNavigate?.();
  }

  return (
    <li ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`hh-text-nav inline-flex w-full flex-col items-center whitespace-nowrap px-2 pt-1.5 font-normal leading-none transition sm:px-3 lg:w-auto lg:px-4 ${
          active || open ? "text-white" : "text-white/90 hover:text-white"
        }`}
      >
        <span className="inline-flex items-center gap-1">
          {label}
          <svg
            className={`h-3.5 w-3.5 shrink-0 opacity-80 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <span className="mt-1 flex h-3.5 w-9 items-center justify-center">
          {active && (
            <Image
              src={images.iconFish}
              alt=""
              width={36}
              height={12}
              className="h-3 w-9 shrink-0 object-contain"
            />
          )}
        </span>
      </button>

      {open && (
        <ul
          role="menu"
          className="z-[60] mt-1 w-full min-w-[200px] overflow-hidden rounded-xl border border-white/20 bg-white/95 py-1.5 shadow-xl backdrop-blur-sm lg:absolute lg:left-0 lg:top-full lg:w-auto"
        >
          {categories.map((category) => (
            <li key={category.key} role="none">
              <Link
                href={categoryHref(category.key)}
                role="menuitem"
                onClick={handleCategoryClick}
                className="block px-4 py-2.5 text-sm font-medium text-gray-800 transition hover:bg-hh-blue/10 hover:text-hh-blue-dark"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
