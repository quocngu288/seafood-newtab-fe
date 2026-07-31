"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { Logo } from "./Logo";
import { NavUnderline } from "./NavUnderline";
import { ProductsNavMenu } from "./ProductsNavMenu";
import { useSiteSettings } from "./SiteSettingsProvider";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { SearchBar } from "@/components/ui/SearchBar";

const navBeforeProducts = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "fields", href: "/fields" },
] as const;

const navAfterProducts = [
  { key: "markets", href: "/markets" },
  { key: "news", href: "/news" },
  { key: "contact", href: "/contact" },
] as const;

function NavItem({
  label,
  href,
  active,
  onNavigate,
}: {
  label: string;
  href: string;
  active: boolean;
  onNavigate: () => void;
}) {
  return (
    <li className="border-b border-white/10 lg:border-0">
      <Link
        href={href}
        onClick={onNavigate}
        className={`hh-text-nav group/nav inline-flex w-full flex-col items-start whitespace-nowrap px-2 py-3 font-normal leading-none transition-colors sm:px-3 lg:w-auto lg:items-center lg:px-4 lg:py-0 lg:pt-1.5 ${
          active ? "text-white" : "text-white/85 hover:text-white"
        }`}
      >
        <span>{label}</span>
        <NavUnderline active={active} />
      </Link>
    </li>
  );
}

export function Header() {
  const t = useTranslations("nav");
  const tCompany = useTranslations("company");
  const settings = useSiteSettings();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const companyName = settings?.companyName || tCompany("name");
  const logoSrc = settings?.logoUrl || undefined;
  const logoAlt = settings?.logoAlt || tCompany("logoAlt");

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [menuOpen]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const navList = (
    <ul className="flex flex-col gap-1 lg:flex lg:flex-row lg:flex-wrap lg:items-end lg:justify-start">
      {navBeforeProducts.map(({ key, href }) => (
        <NavItem
          key={key}
          label={t(key)}
          href={href}
          active={isActive(href)}
          onNavigate={closeMenu}
        />
      ))}

      <ProductsNavMenu
        label={t("products")}
        active={isActive("/products")}
        onNavigate={closeMenu}
      />

      {navAfterProducts.map(({ key, href }) => (
        <NavItem
          key={key}
          label={t(key)}
          href={href}
          active={isActive(href)}
          onNavigate={closeMenu}
        />
      ))}
    </ul>
  );

  return (
    <header className="relative z-50">
      <div className="site-container pt-4 pb-2 sm:pb-4">
        <div className="flex min-h-[52px] items-center gap-1.5 sm:min-h-[64px] sm:gap-2 md:min-h-[72px] md:gap-3">
          <Link href="/" className="block shrink-0">
            <Logo
              className="!w-[160px] h-auto object-contain sm:!w-[180px] md:!w-[270px] lg:!w-[270px] xl:!w-[270px]"
              src={logoSrc}
              alt={logoAlt}
            />
          </Link>

          <div className="flex min-w-0 flex-1 items-center justify-center">
            <h1 className="hh-text-company px-1 text-center font-semibold uppercase leading-tight tracking-wide text-white md:max-w-none md:leading-snug">
              {companyName}
            </h1>
          </div>

          <button
            type="button"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/30 text-white transition hover:bg-white/10 lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-label="Menu"
          >
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
          </button>
        </div>

        <div className="mt-3 hidden pb-4 lg:block">
          <div className="flex flex-row items-center justify-between gap-6">
            <nav className="min-w-0 flex-1">{navList}</nav>

            <div className="flex min-w-0 items-center gap-4 lg:ml-auto lg:w-auto">
              <SearchBar
                placeholder={t("search")}
                className="min-w-0 lg:w-auto lg:flex-none lg:max-w-[220px]"
                ariaLabel={t("search")}
              />
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-60 lg:hidden">
          <button
            type="button"
            aria-label="Đóng menu"
            onClick={closeMenu}
            className="hh-menu-overlay absolute inset-0 bg-hh-blue-dark/50 backdrop-blur-sm"
          />

          <div className="hh-menu-drawer absolute right-0 top-0 flex max-h-full w-[88%] max-w-md flex-col overflow-y-auto bg-hh-blue shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/15 px-5 py-4">
              <Link href="/" onClick={closeMenu} className="block shrink-0">
                <Logo
                  className="!w-[180px] h-auto object-contain"
                  src={logoSrc}
                  alt={logoAlt}
                />
              </Link>
              <button
                type="button"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/30 text-white transition hover:bg-white/10"
                onClick={closeMenu}
                aria-label="Đóng menu"
              >
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
              </button>
            </div>

            <nav className="px-5 py-4">{navList}</nav>

            <div className="flex items-center gap-3 px-5 py-6">
              <SearchBar
                placeholder={t("search")}
                className="min-w-0 flex-1"
                ariaLabel={t("search")}
              />
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
