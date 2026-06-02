import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "./Logo";

export async function Footer() {
  const t = await getTranslations("footer");
  const tContact = await getTranslations("pages.contact");
  const tNav = await getTranslations("nav");

  const salesContacts = [
    { name: "BUI THI THUY HUONG", phone: "+84.939.256.363" },
    { name: "NGUYEN BICH VAN", phone: "+84.902.693.038" },
    { name: "TRINH MINH NGHIA", phone: "+84.918.628.627" },
  ] as const;

  const links = [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "products", href: "/products" },
    { key: "markets", href: "/markets" },
    { key: "news", href: "/news" },
    { key: "contact", href: "/contact" },
  ] as const;

  return (
    <footer className="border-t border-white/20 bg-[#0052A8] py-10 text-white">
      <div className="site-container">
        <div className="grid gap-6 sm:grid-cols-3">
          {salesContacts.map((person) => (
            <div key={person.name}>
              <p className="text-xs font-semibold tracking-wide text-white/75">
                Sale online
              </p>
              <p className="mt-2 text-sm font-semibold">{person.name}</p>
              <p className="text-sm text-white/85">{person.phone}</p>
            </div>
          ))}
        </div>

        <div className="my-6 h-px bg-white/25" />

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/90">
              {t("contact")}
            </h3>
            <address className="space-y-2 text-sm not-italic text-white/85">
              <p>{tContact("address")}</p>
              <p>{tContact("phone")}</p>
              <p>
                <a href={`mailto:${tContact("email")}`} className="hover:text-white">
                  {tContact("email")}
                </a>
              </p>
            </address>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/90">
              {t("quickLinks")}
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              {links.map(({ key, href }) => (
                <li key={key}>
                  <Link href={href} className="text-sm text-white/85 hover:text-white">
                    {tNav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-start lg:items-end">
            <Logo className="brightness-0 invert" />
            <p className="mt-3 text-sm text-white/70">{t("rights")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
