import { getTranslations } from "next-intl/server";
import { fetchNewsArticles } from "@/lib/api/server";
import type { Locale } from "@/lib/api/types";
import { NewsPageLayout } from "./NewsPageLayout";
import type { NewsArticleDetailData } from "./NewsArticleDetail";

type Props = {
  locale: string;
};

export async function NewsSection({ locale }: Props) {
  const t = await getTranslations("pages.news");

  let articles = t.raw("articles") as NewsArticleDetailData[];

  try {
    const apiArticles = await fetchNewsArticles(locale as Locale);
    articles = apiArticles.map((item) => ({
      id: item.id,
      title: item.title,
      date: item.date,
      body: item.body,
      imageUrl: item.thumbnailUrl || undefined,
      thumbnailKey: item.thumbnailKey || undefined,
    }));
  } catch {
    // fallback to static JSON messages
  }

  return (
    <NewsPageLayout
      articles={articles}
      sidebarLabel={t("sidebarLabel")}
      sidebarCta={t("sidebarCta")}
      pagination={{
        first: t("pagination.first"),
        last: t("pagination.last"),
      }}
    />
  );
}
