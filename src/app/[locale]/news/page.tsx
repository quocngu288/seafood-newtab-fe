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
          <h1 className="text-[26px] font-bold leading-tight text-hh-blue-dark sm:text-[30px] md:text-[34px]">
            {t("title")}
          </h1>
          <p className="mt-2 text-base text-gray-600 md:text-lg">{t("subtitle")}</p>
        </div>

        <div className="relative mt-3 translate-y-4 sm:mt-4 sm:translate-y-5 md:translate-y-6">
          <Suspense fallback={null}>
            <NewsSection />
          </Suspense>
        </div>
      </section>
    </>
  );
}
