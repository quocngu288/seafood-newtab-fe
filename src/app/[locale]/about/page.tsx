import { getTranslations, setRequestLocale } from "next-intl/server";
import { WaveTopPage } from "@/components/pages/WaveTopPage";

type Props = { params: Promise<{ locale: string }> };

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.about");
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <WaveTopPage title={t("title")} subtitle={t("subtitle")}>
      <div className="site-container--narrow space-y-5 sm:space-y-6">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="hh-body">
            {paragraph}
          </p>
        ))}
      </div>
    </WaveTopPage>
  );
}
