import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { Logo } from "./Logo";

type SalesPerson = {
  name: string;
  title: string;
  phone: string;
};

function IconPin({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconMail({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconGlobe({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3 12h18M12 3c2.5 2.8 4 6 4 9s-1.5 6.2-4 9M12 3C9.5 5.8 8 9 8 12s1.5 6.2 4 9"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function IconPhone({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6.5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5L15 12.5 19 14v3a2 2 0 0 1-2 2A15 15 0 0 1 4 6.5 2 2 0 0 1 6.5 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ContactRow({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <li className="flex gap-3 text-[16px] leading-relaxed text-white/90">
      <span className="mt-0.5 shrink-0 text-white/80">{icon}</span>
      <span>{children}</span>
    </li>
  );
}

export async function Footer() {
  const t = await getTranslations("footer");
  const sales = t.raw("sales") as SalesPerson[];

  const socialLinks = [
    {
      key: "email",
      href: `mailto:${t("email")}`,
      label: t("social.email"),
      icon: <IconMail className="h-4 w-4" />,
    },
    {
      key: "facebook",
      href: "https://facebook.com/",
      label: t("social.facebook"),
      icon: (
        <span className="text-[16px] font-bold leading-none" aria-hidden>
          f
        </span>
      ),
    },
    {
      key: "linkedin",
      href: "https://linkedin.com/",
      label: t("social.linkedin"),
      icon: (
        <span className="text-[16px] font-bold leading-none" aria-hidden>
          in
        </span>
      ),
    },
    {
      key: "x",
      href: "https://x.com/",
      label: t("social.x"),
      icon: (
        <span className="text-[16px] font-bold leading-none" aria-hidden>
          X
        </span>
      ),
    },
  ] as const;

  return (
    <footer className="bg-[#0052A8] py-10 text-white md:py-12">
      <div className="site-container space-y-8 md:space-y-10">
        {/* Hàng 1: Sale online */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10 xl:gap-14">
          <p className="shrink-0 text-[22px] font-bold md:text-[24px] lg:w-[130px]">
            {t("saleOnline")}
          </p>
          <div className="grid flex-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {sales.map((person) => (
              <div key={person.name}>
                <p className="text-[22px] font-bold uppercase tracking-wide md:text-[24px]">
                  {person.name}
                </p>
                <p className="mt-1 text-[18px] text-white/85">{person.title}</p>
                <a
                  href={`tel:${person.phone.replace(/\./g, "")}`}
                  className="mt-2 inline-flex items-center gap-2 text-[18px] text-white/90 hover:text-white"
                >
                  <IconPhone />
                  {person.phone}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-white/25" />

        {/* Hàng 2: Contact + logo/social */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10 xl:gap-14">
          <p className="shrink-0 text-[22px] font-bold md:text-[24px] lg:w-[130px]">
            {t("contact")}
          </p>

          <div className="flex flex-1 flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-10">
            <address className="not-italic">
              <ul className="space-y-3">
                <ContactRow icon={<IconPin />}>{t("address")}</ContactRow>
                <ContactRow icon={<IconMail />}>
                  <a href={`mailto:${t("email")}`} className="hover:text-white">
                    {t("email")}
                  </a>
                </ContactRow>
                <ContactRow icon={<IconGlobe />}>
                  <a
                    href={t("website")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    {t("website")}
                  </a>
                </ContactRow>
                <ContactRow icon={<IconPhone />}>{t("hotline")}</ContactRow>
              </ul>
            </address>

            <div className="flex flex-col items-start gap-4 md:items-end">
              <Logo className="w-[200px]! sm:w-[240px]!" />
              <div className="inline-flex items-center gap-4 rounded-full bg-white/15 px-5 py-2.5 backdrop-blur-sm">
                {socialLinks.map(({ key, href, label, icon }) => (
                  <a
                    key={key}
                    href={href}
                    target={key === "email" ? undefined : "_blank"}
                    rel={key === "email" ? undefined : "noopener noreferrer"}
                    className="flex h-7 w-7 items-center justify-center text-white/90 transition hover:text-white"
                    aria-label={label}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
