import { getTranslations, setRequestLocale } from "next-intl/server";
import { WaveTopPage } from "@/components/pages/WaveTopPage";
import {
  FieldsSection,
  type FieldItem,
} from "@/components/fields/FieldsSection";
import { fetchFields } from "@/lib/api/server";
import type { Locale } from "@/lib/api/types";
import { images } from "@/lib/images";
import { resolveNewsImageSrc } from "@/lib/thumbnails";

type Props = { params: Promise<{ locale: string }> };

const FALLBACK_ICONS = ["farming", "processing", "export"] as const;

function normalizeIcon(icon: string): FieldItem["icon"] {
  if (icon === "processing" || icon === "export" || icon === "farming") {
    return icon;
  }
  return "farming";
}

export default async function FieldsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.fields");

  let items: FieldItem[] = [];

  try {
    const apiItems = await fetchFields(locale as Locale);
    items = apiItems.map((item, index) => ({
      key: item.key,
      title: item.title,
      cta: item.cta,
      href: item.href || "/about",
      image:
        resolveNewsImageSrc(item.imageUrl, item.imageKey) ??
        images.heroSlide,
      imageAlt: item.imageAlt || item.title,
      reverse: item.reverse,
      icon: normalizeIcon(item.icon || FALLBACK_ICONS[index] || "farming"),
    }));
  } catch {
    // API unavailable — use message fallbacks below
  }

  if (items.length === 0) {
    items = [
      {
        key: "farming",
        title: t("items.farming.title"),
        cta: t("items.farming.cta"),
        href: "/about",
        image: images.vungNuoi,
        imageAlt: t("items.farming.imageAlt"),
        icon: "farming",
      },
      {
        key: "processing",
        title: t("items.processing.title"),
        cta: t("items.processing.cta"),
        href: "/products",
        image: images.heroSlide,
        imageAlt: t("items.processing.imageAlt"),
        reverse: true,
        icon: "processing",
      },
      {
        key: "export",
        title: t("items.export.title"),
        cta: t("items.export.cta"),
        href: "/markets",
        image: images.xuatkhau,
        imageAlt: t("items.export.imageAlt"),
        icon: "export",
      },
    ];
  }

  return (
    <WaveTopPage title={t("title")} subtitle={t("subtitle")}>
      <FieldsSection items={items} />
    </WaveTopPage>
  );
}
