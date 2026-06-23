"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CarouselDots } from "@/components/ui/CarouselDots";
import { resolveNewsImageSrc } from "@/lib/thumbnails";
import { NewsCard } from "./NewsCard";
import { NewsArticlePreview } from "./NewsArticlePreview";
import type { NewsArticleDetailData } from "./NewsArticleDetail";

const VISIBLE_COUNT = 3;

type HomeNewsInteractiveProps = {
  articles: NewsArticleDetailData[];
};

export function HomeNewsInteractive({ articles }: HomeNewsInteractiveProps) {
  const t = useTranslations("homeNews");

  const [slideOffset, setSlideOffset] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const slideCount = Math.max(
    1,
    Math.ceil(articles.length / VISIBLE_COUNT),
  );

  const visible = useMemo(() => {
    if (articles.length === 0) return [];

    return Array.from({ length: Math.min(VISIBLE_COUNT, articles.length) }, (_, offset) => {
      const index = (slideOffset + offset) % articles.length;
      return { ...articles[index]!, index };
    });
  }, [articles, slideOffset]);

  const activeArticle = articles[activeIndex] ?? articles[0];

  function handleSlideChange(next: number) {
    const wrapped = next % slideCount;
    setSlideOffset(wrapped * VISIBLE_COUNT);
    setActiveIndex(wrapped * VISIBLE_COUNT);
  }

  if (articles.length === 0) return null;

  return (
    <>
      <section className="py-10 sm:py-12 md:py-14">
        <div className="site-container">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-4">
            <h2 className="hh-section-title">{t("title")}</h2>
            <CarouselDots
              count={slideCount}
              active={Math.floor(slideOffset / VISIBLE_COUNT) % slideCount}
              onChange={handleSlideChange}
              labelPrefix="News slide"
              className="order-3 w-full md:order-none md:w-auto"
            />
            <Link
              href="/news?view=full"
              className="hh-text-lg order-2 font-semibold uppercase tracking-wide text-gray-900 hover:text-hh-blue md:order-none md:justify-self-end"
            >
              {t("all")}{" "}
              <span className="hh-text-lg inline-flex h-4 w-4 items-center justify-center rounded-full border border-gray-400 sm:h-5 sm:w-5">
                ›
              </span>
            </Link>
          </div>

          <div className="rounded-[28px] bg-[#c8dff0] px-4 py-4 sm:px-[30px] sm:py-[20px] md:px-[60px] md:py-[40px]">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {visible.map((item) => (
                <NewsCard
                  key={`${slideOffset}-${item.index}`}
                  title={item.title}
                  imageSrc={resolveNewsImageSrc(item.imageUrl, item.thumbnailKey)}
                  active={activeIndex === item.index}
                  onClick={() => setActiveIndex(item.index)}
                  detailHref={item.slug ? `/news/${item.slug}` : item.id ? `/news/${item.id}` : undefined}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {activeArticle && (
        <section className="bg-white pb-8 sm:pb-12">
          <div className="site-container">
            <NewsArticlePreview article={activeArticle} />
          </div>
        </section>
      )}
    </>
  );
}
