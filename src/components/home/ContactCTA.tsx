import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function ContactCTA() {
  const t = await getTranslations("sections.contact");

  return (
    <section className="bg-gradient-to-r from-hh-blue-dark to-hh-blue py-12 sm:py-16">
      <div className="site-container site-container--narrow text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-white/80">
          {t("label")}
        </span>
        <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
          {t("title")}
        </h2>
        <p className="mt-4 text-white/85">{t("description")}</p>
        <Link
          href="/contact"
          className="mt-6 inline-block rounded-full bg-hh-red px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-hh-red-hover"
        >
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}
