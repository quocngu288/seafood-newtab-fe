import { getTranslations, setRequestLocale } from "next-intl/server";
import { WaveTopPage } from "@/components/pages/WaveTopPage";
import { NewsSection } from "@/components/home/NewsSection";

type Props = { params: Promise<{ locale: string }> };

export default async function NewsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.news");

  return (
    <WaveTopPage title={t("title")} subtitle={t("subtitle")}>
      <div className="site-container--narrow">
        <p className="text-lg leading-relaxed">{t("content")}</p>
      </div>
      <NewsSection />
    </WaveTopPage>
  );
}
