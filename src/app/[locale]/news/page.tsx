import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HomeTop } from "@/components/home/HomeTop";
import { NewsSection } from "@/components/home/NewsSection";

type Props = { params: Promise<{ locale: string }> };

export default async function NewsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.news");

  return (
    <>
      <HomeTop />
      <section className="site-container relative z-20 pb-14 sm:pb-16 md:pb-20">
        <div className="px-1">
          <h1 className="hh-page-title--light">{t("title")}</h1>
        </div>

        <div className="relative mt-3 translate-y-4 sm:mt-4 sm:translate-y-5 md:translate-y-6">
          <Suspense fallback={null}>
            <NewsSection locale={locale} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
