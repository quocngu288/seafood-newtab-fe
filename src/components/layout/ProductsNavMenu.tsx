"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { publicApi } from "@/lib/api/client";
import type { Locale, ProductCategory } from "@/lib/api/types";
import { getFallbackProductCategories } from "@/lib/product-categories";
import { NavUnderline } from "./NavUnderline";

type ProductsNavMenuProps = {
  label: string;
  active: boolean;
  onNavigate?: () => void;
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
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
  );
}

export function ProductsNavMenu({
  label,
  active,
  onNavigate,
}: ProductsNavMenuProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations("nav");
  const rootRef = useRef<HTMLLIElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
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
    if (!mobileOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setMobileOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [mobileOpen]);

  const categoryHref = (key: string) =>
    `/products?category=${encodeURIComponent(key)}`;

  function handleCategoryClick() {
    setMobileOpen(false);
    onNavigate?.();
  }

  function handleProductLinkClick() {
    setMobileOpen(false);
    onNavigate?.();
  }

  const linkClassName = `hh-text-nav group/nav inline-flex flex-1 flex-col items-start whitespace-nowrap px-2 pt-1.5 font-normal leading-none transition-colors sm:px-3 lg:flex-none lg:items-center lg:px-4 ${
    active || mobileOpen
      ? "text-white"
      : "text-white/85 hover:text-white lg:group-hover:text-white"
  }`;

  return (
    <li ref={rootRef} className="group relative w-full lg:w-auto">
      <div className="inline-flex w-full items-start lg:w-auto">
        <Link href="/products" onClick={handleProductLinkClick} className={linkClassName}>
          <span className="inline-flex items-center gap-1">
            {label}
            <span className="hidden lg:inline-flex">
              <ChevronIcon open={false} />
            </span>
          </span>
          <NavUnderline active={active} />
        </Link>

        <button
          type="button"
          className="mt-1.5 shrink-0 px-2 text-white/90 transition hover:text-white lg:hidden"
          onClick={() => setMobileOpen((value) => !value)}
          aria-expanded={mobileOpen}
          aria-haspopup="menu"
          aria-label={t("products")}
        >
          <ChevronIcon open={mobileOpen} />
        </button>
      </div>

      <div
        className={`w-full min-w-[200px] max-w-xs pt-1 lg:absolute lg:left-0 lg:top-full lg:z-60 lg:max-w-none ${
          mobileOpen ? "block" : "hidden"
        } lg:pointer-events-none lg:block lg:opacity-0 lg:transition-opacity lg:duration-150 lg:group-hover:pointer-events-auto lg:group-hover:opacity-100`}
      >
        <ul
          role="menu"
          className="overflow-hidden rounded-xl border border-white/20 bg-white/95 py-1.5 shadow-xl backdrop-blur-sm lg:w-auto"
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
      </div>
    </li>
  );
}
