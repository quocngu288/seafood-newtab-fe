import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { ContactMap } from "@/components/contact/ContactMap";
import type { ApiSiteSettings } from "@/lib/api/types";
import { Logo } from "./Logo";

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
    <li className="hh-text-base flex gap-3 leading-relaxed text-white/90">
      <span className="mt-0.5 shrink-0 text-white/80">{icon}</span>
      <span>{children}</span>
    </li>
  );
}

export async function Footer({
  settings,
}: {
  settings?: ApiSiteSettings | null;
}) {
  const t = await getTranslations("footer");

  const address = settings?.address || t("address");
  const email = settings?.email || t("email");
  const website = settings?.website || t("website");
  const hotline = settings?.hotline || t("hotline");
  const mapTitle = settings?.mapTitle || t("mapTitle");
  const facebookUrl = settings?.facebookUrl || "https://facebook.com/";
  const linkedinUrl = settings?.linkedinUrl || "https://linkedin.com/";
  const xUrl = settings?.xUrl || "https://x.com/";
  const logoAlt = settings?.logoAlt || undefined;

  const socialLinks = [
    {
      key: "email",
      href: `mailto:${email}`,
      label: t("social.email"),
      icon: <IconMail className="h-4 w-4" />,
    },
    {
      key: "facebook",
      href: facebookUrl,
      label: t("social.facebook"),
      icon: (
        <span className="hh-text-lg font-bold leading-none" aria-hidden>
          f
        </span>
      ),
    },
    {
      key: "linkedin",
      href: linkedinUrl,
      label: t("social.linkedin"),
      icon: (
        <span className="hh-text-lg font-bold leading-none" aria-hidden>
          in
        </span>
      ),
    },
    {
      key: "x",
      href: xUrl,
      label: t("social.x"),
      icon: (
        <span className="hh-text-lg font-bold leading-none" aria-hidden>
          X
        </span>
      ),
    },
  ] as const;

  return (
    <footer className="bg-[#0052A8] py-10 text-white md:py-12">
      <div className="site-container">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10 xl:gap-14">
          <div className="shrink-0 lg:w-[200px] xl:w-[220px]">
            <Logo
              className="!w-[160px] sm:!w-[190px] lg:!w-full"
              src={settings?.logoUrl || undefined}
              alt={logoAlt}
            />
          </div>

          <div className="flex flex-1 flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
            <address className="not-italic">
              <ul className="space-y-3">
                <ContactRow icon={<IconPin />}>{address}</ContactRow>
                <ContactRow icon={<IconMail />}>
                  <a href={`mailto:${email}`} className="hover:text-white">
                    {email}
                  </a>
                </ContactRow>
                <ContactRow icon={<IconGlobe />}>
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    {website}
                  </a>
                </ContactRow>
                <ContactRow icon={<IconPhone />}>{hotline}</ContactRow>
              </ul>

              <div className="mt-6 inline-flex items-center gap-4 rounded-full bg-white/15 px-5 py-2.5 backdrop-blur-sm">
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
            </address>

            <ContactMap
              title={mapTitle}
              embedUrl={settings?.mapEmbedUrl}
              className="w-full shrink-0 lg:max-w-[420px]"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
