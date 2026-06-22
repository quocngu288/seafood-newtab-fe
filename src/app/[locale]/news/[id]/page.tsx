import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { HomeTop } from "@/components/home/HomeTop";
import { NewsArticleDetail } from "@/components/home/NewsArticleDetail";
import { fetchNewsArticle } from "@/lib/api/server";
import type { Locale } from "@/lib/api/types";
import { resolveNewsImageSrc } from "@/lib/thumbnails";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function NewsDetailPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const articleId = Number(id);
  if (!Number.isFinite(articleId)) {
    notFound();
  }

  const t = await getTranslations("nav");

  let article;
  try {
    article = await fetchNewsArticle(articleId, locale as Locale);
  } catch {
    notFound();
  }

  const imageSrc = resolveNewsImageSrc(
    article.thumbnailUrl || undefined,
    article.thumbnailKey || undefined,
  );

  return (
    <>
      <HomeTop />
      <section className="site-container relative z-20 pb-14 sm:pb-16 md:pb-20">
        <div className="px-1">
          <Link
            href="/news"
            className="hh-text-sm inline-flex items-center gap-1 font-medium text-gray-600 transition hover:text-hh-blue"
          >
            ← {t("news")}
          </Link>
        </div>

        <div className="relative mt-6 translate-y-4 sm:mt-8 sm:translate-y-5 md:translate-y-6">
          <article className="rounded-[28px] bg-white px-4 py-6 shadow-sm sm:px-8 sm:py-8 md:px-10 md:py-10">
            <NewsArticleDetail
              article={{
                id: article.id,
                title: article.title,
                date: article.date,
                body: article.body,
                imageUrl: article.thumbnailUrl || undefined,
                thumbnailKey: article.thumbnailKey || undefined,
              }}
              imageSrc={imageSrc}
              className="mt-0"
            />
          </article>
        </div>
      </section>
    </>
  );
}
