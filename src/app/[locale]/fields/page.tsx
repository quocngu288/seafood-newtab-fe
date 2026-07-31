import { getTranslations, setRequestLocale } from "next-intl/server";
import { WaveTopPage } from "@/components/pages/WaveTopPage";
import { FieldsSection } from "@/components/fields/FieldsSection";
import { images } from "@/lib/images";

type Props = { params: Promise<{ locale: string }> };

export default async function FieldsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.fields");

  const items = [
    {
      key: "farming",
      title: t("items.farming.title"),
      cta: t("items.farming.cta"),
      href: "/about" as const,
      image: images.vungNuoi,
      imageAlt: t("items.farming.imageAlt"),
      icon: "farming" as const,
    },
    {
      key: "processing",
      title: t("items.processing.title"),
      cta: t("items.processing.cta"),
      href: "/products" as const,
      image: images.heroSlide,
      imageAlt: t("items.processing.imageAlt"),
      reverse: true,
      icon: "processing" as const,
    },
    {
      key: "export",
      title: t("items.export.title"),
      cta: t("items.export.cta"),
      href: "/markets" as const,
      image: images.xuatkhau,
      imageAlt: t("items.export.imageAlt"),
      icon: "export" as const,
    },
  ];

  return (
    <WaveTopPage title={t("title")} subtitle={t("subtitle")}>
      <FieldsSection items={items} />
    </WaveTopPage>
  );
}
