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
        {/* Hàng 1: Logo trái | tên công ty canh giữa vùng còn lại */}
        <div className="flex min-h-[52px] items-center gap-1.5 sm:min-h-[64px] sm:gap-2 md:min-h-[72px] md:gap-3">
          <Link href="/" className="block shrink-0">
            <Logo className="!w-[120px] h-auto object-contain sm:!w-[180px] md:!w-[240px] lg:!w-[300px] xl:!w-[330px]" />
          </Link>

          <div className="flex min-w-0 flex-1 items-center justify-center">
            <h1 className="hh-text-company max-w-[22ch] px-1 text-center font-semibold uppercase leading-tight tracking-wide text-white md:max-w-none md:leading-snug">
              {tCompany("name")}
            </h1>
          </div>

          {/* Mobile + tablet: menu drawer; desktop lg+: hàng nav ngang */}
          <button
            type="button"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/30 text-white lg:hidden"
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
          className={`mt-4 pb-4 sm:mt-3 ${
            menuOpen ? "block" : "hidden lg:block"
          }`}
        >
          <div className="flex flex-col gap-4 md:gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
            <nav className="min-w-0 flex-1">
              <ul className="flex flex-col gap-1 sm:grid sm:grid-cols-2 sm:gap-x-2 sm:gap-y-2 lg:flex lg:flex-row lg:flex-wrap lg:items-end lg:justify-start">
                {navItems.map(({ key, href }) => {
                  const active = isActive(href);
                  return (
                    <li key={key}>
                      <Link
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        className={`hh-text-nav inline-flex flex-col items-center whitespace-nowrap px-2 pt-1.5 font-normal leading-none transition sm:px-3 lg:px-4 ${
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
                              className="h-3 w-9 shrink-0 object-contain"
                            />
                          )}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex w-full min-w-0 items-center gap-3 md:justify-end lg:ml-auto lg:w-auto lg:gap-4">
              <SearchBar
                placeholder={t("search")}
                className="min-w-0 flex-1 md:max-w-[220px] lg:flex-none lg:w-auto"
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
