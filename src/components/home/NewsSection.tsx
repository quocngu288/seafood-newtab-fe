import { getTranslations } from "next-intl/server";
import { NewsPageLayout } from "./NewsPageLayout";
import type { NewsArticleDetailData } from "./NewsArticleDetail";

export async function NewsSection() {
  const t = await getTranslations("pages.news");

  const articles = t.raw("articles") as NewsArticleDetailData[];

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
