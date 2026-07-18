import { getTranslations, setRequestLocale } from "next-intl/server";
import { HomeTop } from "@/components/home/HomeTop";
import { ProductsPageSection } from "@/components/products/ProductsPageSection";
import { PAGE_CONTENT_ID } from "@/components/pages/ScrollToPageContent";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
};

export default async function ProductsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { category } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("pages.products");

  return (
    <>
      <HomeTop />
      <section
        id={PAGE_CONTENT_ID}
        className="site-container relative z-20 scroll-mt-4 pb-14 sm:pb-16 md:pb-20"
      >
        <div className="px-1 pt-1 sm:px-2 sm:pt-2">
          <h1 className="hh-page-title--light">{t("title")}</h1>
        </div>

        <div className="relative mt-4 translate-y-4 sm:mt-6 sm:translate-y-5 md:translate-y-6">
          <article className="hh-card">
            <ProductsPageSection
              locale={locale}
              initialCategoryKey={category}
            />
          </article>
        </div>
      </section>
    </>
  );
}
