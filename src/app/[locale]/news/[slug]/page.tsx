import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link, redirect } from "@/i18n/navigation";
import { HomeTop } from "@/components/home/HomeTop";
import { NewsHtmlContent } from "@/components/ui/NewsHtmlContent";
import { fetchNewsArticle } from "@/lib/api/server";
import type { Locale } from "@/lib/api/types";
import { stripLeadingHeadingFromHtml } from "@/lib/html";
import { resolveNewsImageSrc } from "@/lib/thumbnails";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function NewsDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("nav");

  let article;
  try {
    article = await fetchNewsArticle(slug, locale as Locale);
  } catch {
    notFound();
  }

  if (/^\d+$/.test(slug) && article.slug && article.slug !== slug) {
    redirect({ href: `/news/${article.slug}`, locale });
  }

  const imageSrc = resolveNewsImageSrc(
    article.thumbnailUrl || undefined,
    article.thumbnailKey || undefined,
  );
  const bodyHtml = stripLeadingHeadingFromHtml(article.body, article.title);

  return (
    <>
      <HomeTop />
      <section className="site-container relative z-20 pb-14 sm:pb-16 md:pb-20">
        <div className="px-1">
          <Link
            href="/news"
            className="hh-text-sm inline-flex items-center gap-1 font-medium text-white/85 transition hover:text-white"
          >
            ← {t("news")}
          </Link>
          <h1 className="hh-page-title--light mt-3 sm:mt-4">{article.title}</h1>
          {article.date && (
            <time className="hh-page-subtitle--light mt-2 block">
              {article.date}
            </time>
          )}
        </div>

        <div className="relative mt-3 translate-y-4 sm:mt-4 sm:translate-y-5 md:translate-y-6">
          <article className="hh-card">
            <NewsHtmlContent html={bodyHtml} className="mt-0" />

            {imageSrc && (
              <div className="relative mt-6 overflow-hidden rounded-2xl sm:mt-8">
                <div className="relative aspect-[16/9] w-full md:aspect-[2/1]">
                  {typeof imageSrc === "string" ? (
                    <img
                      src={imageSrc}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Image
                      src={imageSrc}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 896px"
                    />
                  )}
                </div>
              </div>
            )}
          </article>
        </div>
      </section>
    </>
  );
}
