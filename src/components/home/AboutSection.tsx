import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { images } from "@/lib/images";

export async function AboutSection() {
  const t = await getTranslations("sections.about");

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="site-container grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
          <Image
            src={images.heroSlide}
            alt={t("title")}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div>
          <span className="text-sm font-semibold uppercase tracking-wider text-hh-blue">
            {t("label")}
          </span>
          <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-4 leading-relaxed text-gray-600">{t("description")}</p>
          <Link
            href="/about"
            className="mt-6 inline-block rounded-full bg-hh-red px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-hh-red-hover"
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
