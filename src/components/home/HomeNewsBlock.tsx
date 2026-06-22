import { getTranslations } from "next-intl/server";
import { fetchNewsArticles } from "@/lib/api/server";
import type { Locale } from "@/lib/api/types";
import { HomeNewsInteractive } from "./HomeNewsInteractive";
import { PartnerQuote } from "./PartnerQuote";
import type { NewsArticleDetailData } from "./NewsArticleDetail";

type HomeNewsBlockProps = {
  locale: string;
};

function mapApiArticle(item: Awaited<ReturnType<typeof fetchNewsArticles>>[number]): NewsArticleDetailData {
  return {
    id: item.id,
    title: item.title,
    date: item.date,
    body: item.excerpt || item.body,
    imageUrl: item.thumbnailUrl || undefined,
    thumbnailKey: item.thumbnailKey || undefined,
  };
}

function buildFallbackArticles(
  slider: Array<{ title: string }>,
  featured: {
    title: string;
    body: string;
  },
): NewsArticleDetailData[] {
  return slider.map((item, index) => ({
    title: index === 0 ? featured.title : item.title,
    date: "",
    body: index === 0 ? featured.body : "",
  }));
}

export async function HomeNewsBlock({ locale }: HomeNewsBlockProps) {
  const t = await getTranslations("homeNews");
  const slider = t.raw("slider") as Array<{ title: string }>;
  const featured = t.raw("featured") as {
    title: string;
    body: string;
  };

  let articles = buildFallbackArticles(slider, featured);

  try {
    const apiArticles = await fetchNewsArticles(locale as Locale);
    if (apiArticles.length > 0) {
      articles = apiArticles.map(mapApiArticle);
    }
  } catch {
    // fallback to static homeNews data
  }

  return (
    <>
      <HomeNewsInteractive articles={articles} />
      <PartnerQuote />
    </>
  );
}
