import { getTranslations, setRequestLocale } from "next-intl/server";
import { WaveTopPage } from "@/components/pages/WaveTopPage";
import { ProductsSection } from "@/components/home/ProductsSection";

type Props = { params: Promise<{ locale: string }> };

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.products");

  return (
    <WaveTopPage title={t("title")} subtitle={t("subtitle")}>
      <div className="site-container--narrow">
        <p className="hh-body">{t("content")}</p>
      </div>
      <ProductsSection />
    </WaveTopPage>
  );
}
