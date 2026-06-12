import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function ContactCTA() {
  const t = await getTranslations("sections.contact");

  return (
    <section className="bg-gradient-to-r from-hh-blue-dark to-hh-blue py-12 sm:py-16">
      <div className="site-container site-container--narrow text-center">
        <span className="hh-label text-white/80">{t("label")}</span>
        <h2 className="hh-section-title mt-2 text-white">
          {t("title")}
        </h2>
        <p className="hh-body mt-3 text-white/85 sm:mt-4">{t("description")}</p>
        <Link
          href="/contact"
          className="hh-text-sm mt-6 inline-block rounded-full bg-hh-red px-8 py-3 font-semibold text-white shadow-lg transition hover:bg-hh-red-hover"
        >
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}
