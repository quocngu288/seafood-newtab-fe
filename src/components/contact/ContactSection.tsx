import { getLocale, getTranslations } from "next-intl/server";
import { fetchSiteSettings } from "@/lib/api/server";
import type { ApiSiteSettings, Locale } from "@/lib/api/types";
import { ContactForm } from "./ContactForm";
import { ContactMap } from "./ContactMap";

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

function toTelHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export async function ContactSection() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("pages.contact");
  const footer = await getTranslations("footer");

  let settings: ApiSiteSettings | null = null;
  try {
    settings = await fetchSiteSettings(locale);
  } catch {
    // fallback below
  }

  const email = settings?.email || footer("email");
  const saleOnline = settings?.saleOnline || footer("saleOnline");
  const mapTitle = settings?.mapTitle || t("mapTitle");
  const facebookUrl = settings?.facebookUrl || "https://facebook.com/";
  const linkedinUrl = settings?.linkedinUrl || "https://linkedin.com/";
  const xUrl = settings?.xUrl || "https://x.com/";

  const sales =
    settings?.sales?.length
      ? settings.sales
      : [
          {
            name: "Mrs. Mui",
            title: "",
            phone: settings?.floatingCallPhone || "+84.909.496.999",
          },
        ];

  const socialLinks = [
    {
      key: "email",
      href: `mailto:${email}`,
      label: footer("social.email"),
      icon: <IconMail className="h-4 w-4" />,
    },
    {
      key: "facebook",
      href: facebookUrl,
      label: footer("social.facebook"),
      icon: (
        <span className="text-[16px] font-bold leading-none" aria-hidden>
          f
        </span>
      ),
    },
    {
      key: "linkedin",
      href: linkedinUrl,
      label: footer("social.linkedin"),
      icon: (
        <span className="text-[16px] font-bold leading-none" aria-hidden>
          in
        </span>
      ),
    },
    {
      key: "x",
      href: xUrl,
      label: footer("social.x"),
      icon: (
        <span className="text-[16px] font-bold leading-none" aria-hidden>
          X
        </span>
      ),
    },
  ] as const;

  return (
    <>
      <div className="overflow-hidden rounded-[28px] bg-white/75 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-md">
        <div className="flex flex-col lg:flex-row">
          <aside className="bg-[#0052A8] p-5 sm:p-8 lg:w-[300px] lg:shrink-0 xl:w-[340px]">
            <p className="hh-text-2xl font-bold text-white">{saleOnline}</p>

            <ul className="mt-6 space-y-6 sm:mt-8">
              {sales.map((person) => (
                <li key={`${person.name}-${person.phone}`}>
                  <p className="hh-text-xl font-bold uppercase tracking-wide text-white">
                    {person.name}
                  </p>
                  {person.title ? (
                    <p className="hh-text-sm mt-1 text-white/75">{person.title}</p>
                  ) : null}
                  {person.phone ? (
                    <a
                      href={toTelHref(person.phone)}
                      className="hh-text-base mt-1.5 inline-flex items-center gap-2 text-white/90 hover:text-white sm:mt-2"
                    >
                      <IconPhone />
                      {person.phone}
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
            <div className="mt-8 inline-flex items-center gap-4 rounded-full bg-white/15 px-5 py-2.5 backdrop-blur-sm sm:mt-10">
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
          </aside>

          <ContactForm
            labels={{
              fullName: t("form.fullName"),
              phone: t("form.phone"),
              email: t("form.email"),
              address: t("form.address"),
              message: t("form.message"),
              newsletter: t("form.newsletter"),
              send: t("form.send"),
            }}
          />
        </div>
      </div>

      <ContactMap
        title={mapTitle}
        embedUrl={settings?.mapEmbedUrl}
        className="mt-8 sm:mt-10 md:mt-12"
      />
    </>
  );
}
