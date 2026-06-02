"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { SearchBar } from "@/components/ui/SearchBar";
import { images } from "@/lib/images";

const navItems = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "products", href: "/products" },
  { key: "markets", href: "/markets" },
  { key: "news", href: "/news" },
  { key: "contact", href: "/contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const tCompany = useTranslations("company");
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="relative z-50">
      <div className="site-container pt-4 pb-2 sm:pb-4">
        {/* Hàng 1: Logo + tên công ty giữa */}
        <div className="relative flex min-h-[64px] items-center justify-center sm:min-h-[72px]">
          <Link href="/" className="absolute left-0 top-1/2 z-10 -translate-y-1/2">
            <Logo className="!w-[100px] sm:!w-[170px] lg:!w-[190px]" />
          </Link>
          <h1 className="max-w-[calc(100%-10.5rem)] px-1 text-center text-[13px] font-semibold uppercase leading-tight tracking-wide text-white sm:max-w-[70%] sm:text-[24px] sm:leading-snug lg:text-[30px]">
            {tCompany("name")}
          </h1>
          <button
            type="button"
            className="absolute right-0 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg border border-white/30 text-white sm:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Menu"
          >
            {menuOpen ? (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Hàng 2: Menu trái | Search + cờ phải */}
        <div
          className={`mt-2 pb-4 sm:mt-3 ${
            menuOpen ? "block" : "hidden sm:block"
          }`}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <nav className="min-w-0 flex-1">
              <ul className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-end sm:justify-start">
                {navItems.map(({ key, href }) => {
                  const active = isActive(href);
                  return (
                    <li key={key}>
                      <Link
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        className={`inline-flex flex-col items-center whitespace-nowrap px-3 pt-1.5 text-[15px] font-normal leading-none transition sm:px-3.5 lg:px-4 ${
                          active
                            ? "text-white"
                            : "text-white/90 hover:text-white"
                        }`}
                      >
                        <span>{t(key)}</span>
                        <span className="mt-1 flex h-3.5 w-9 items-center justify-center">
                          {active && (
                            <Image
                              src={images.iconFish}
                              alt=""
                              width={36}
                              height={12}
                              className="h-3 w-9 object-contain"
                            />
                          )}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex shrink-0 items-center gap-3 sm:ml-auto sm:gap-4">
              <SearchBar
                placeholder={t("search")}
                className="w-full sm:w-auto"
                ariaLabel={t("search")}
              />
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
