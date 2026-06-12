"use client";

import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { CarouselDots } from "@/components/ui/CarouselDots";
import { NewsCard } from "./NewsCard";
import { NewsArticlePreview } from "./NewsArticlePreview";
import type { NewsArticleDetailData } from "./NewsArticleDetail";

const COMPACT_COUNT = 4;
const GRID_COUNT = 8;
const LIST_COUNT = 10;
const GRID_SLIDE_COUNT = 4;
const LIST_COLUMNS = 2;
const CARD_CLASS = "hh-card";

type NewsPageLayoutProps = {
  articles: NewsArticleDetailData[];
  sidebarLabel: string;
  sidebarCta: string;
  pagination: {
    first: string;
    last: string;
  };
};

function cycleItems<T>(items: T[], count: number, offset = 0): T[] {
  if (items.length === 0) return [];
  return Array.from(
    { length: count },
    (_, i) => items[(offset + i) % items.length]!,
  );
}

function FeaturedListItem({
  item,
  index,
  active,
  onSelect,
}: {
  item: NewsArticleDetailData;
  index: number;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        className={`flex w-full gap-3 text-left transition ${
          active ? "opacity-100" : "opacity-80 hover:opacity-100"
        }`}
      >
        <span className="shrink-0 text-base font-bold text-gray-900 sm:text-lg md:text-xl">
          {index + 1}.
        </span>
        <span>
          <span className="block text-sm font-bold leading-snug text-gray-900 sm:text-base md:text-lg">
            {item.title}
          </span>
          <time className="mt-0.5 block text-xs text-gray-500 sm:mt-1 sm:text-sm">
            {item.date}
          </time>
        </span>
      </button>
    </li>
  );
}

function NewsPagination({
  pagination,
  className = "",
}: {
  pagination: NewsPageLayoutProps["pagination"];
  className?: string;
}) {
  return (
    <nav
      className={`flex flex-wrap items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-700 sm:gap-3 sm:text-sm md:gap-4 ${className}`}
      aria-label="Pagination"
    >
      <button type="button" className="hover:text-hh-blue">
        {pagination.first}
      </button>
      <span className="text-gray-400" aria-hidden>
        ‹
      </span>
      {[1, 2, 3].map((page) => (
        <button
          key={page}
          type="button"
          className={`min-w-6 hover:text-hh-blue ${page === 1 ? "text-hh-red" : ""}`}
        >
          {page}
        </button>
      ))}
      <span className="text-gray-400">..</span>
      <button type="button" className="hover:text-hh-blue">
        {pagination.last}
      </button>
      <span className="text-gray-400" aria-hidden>
        ›
      </span>
    </nav>
  );
}

export function NewsPageLayout({
  articles,
  sidebarLabel,
  sidebarCta,
  pagination,
}: NewsPageLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const expanded = searchParams.get("view") === "full";

  const [activeIndex, setActiveIndex] = useState(0);
  const [gridSlide, setGridSlide] = useState(0);

  const compactArticles = useMemo(
    () => articles.slice(0, COMPACT_COUNT),
    [articles],
  );

  const gridArticles = useMemo(
    () => cycleItems(articles, GRID_COUNT, gridSlide * 2),
    [articles, gridSlide],
  );

  const listArticles = useMemo(
    () => cycleItems(articles, LIST_COUNT),
    [articles],
  );

  const listColumns = useMemo(() => {
    const perColumn = LIST_COUNT / LIST_COLUMNS;
    return [listArticles.slice(0, perColumn), listArticles.slice(perColumn)];
  }, [listArticles]);

  const visibleArticles = expanded ? listArticles : compactArticles;
  const article = visibleArticles[activeIndex] ?? visibleArticles[0];

  const handleExpand = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", "full");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  if (!expanded) {
    return (
      <article className={CARD_CLASS + " pb-[80px]"}>
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 xl:gap-12">
          <div className="grid grid-cols-2 gap-x-2 gap-y-4 sm:gap-x-4 sm:gap-y-6 md:gap-x-5 md:gap-y-8">
            {compactArticles.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className={
                  index % 2 === 1
                    ? "translate-y-6 sm:translate-y-8 md:translate-y-10"
                    : ""
                }
              >
                <NewsCard
                  title={item.title}
                  active={activeIndex === index}
                  onClick={() => handleSelect(index)}
                />
              </div>
            ))}
          </div>

          <aside className="flex flex-col">
            <h3 className="text-xs font-bold uppercase tracking-wide text-gray-900 sm:text-sm md:text-base">
              {sidebarLabel}
            </h3>
            <ol className="mt-4 space-y-5 sm:mt-5 sm:space-y-6">
              {compactArticles.map((item, index) => (
                <FeaturedListItem
                  key={`${item.title}-${index}`}
                  item={item}
                  index={index}
                  active={activeIndex === index}
                  onSelect={() => handleSelect(index)}
                />
              ))}
            </ol>
            <button
              type="button"
              onClick={handleExpand}
              className="mt-5 w-fit rounded-full bg-hh-red px-6 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-hh-red-hover sm:mt-8 sm:px-8 sm:py-2.5 sm:text-sm"
            >
              {sidebarCta}
            </button>
          </aside>
        </div>
      </article>
    );
  }

  return (
    <>
      <article className={CARD_CLASS}>
        <div className="grid grid-cols-2 gap-x-2 gap-y-4 pb-4 sm:grid-cols-4 sm:gap-x-4 sm:gap-y-6 sm:pb-6 md:gap-x-5 md:gap-y-8 md:pb-8">
          {gridArticles.map((item, index) => (
            <div
              key={`${gridSlide}-${item.title}-${index}`}
              className={
                index % 2 === 1
                  ? "translate-y-4 sm:translate-y-6 md:translate-y-8"
                  : ""
              }
            >
              <NewsCard
                title={item.title}
                active={activeIndex === index % listArticles.length}
                onClick={() => handleSelect(index % listArticles.length)}
              />
            </div>
          ))}
        </div>

        <CarouselDots
          count={GRID_SLIDE_COUNT}
          active={gridSlide}
          onChange={setGridSlide}
          labelPrefix="News grid slide"
          className="mt-2 sm:mt-4"
        />

        <div className="mt-10 sm:mt-12">
          <h3 className="text-xs font-bold uppercase tracking-wide text-gray-900 sm:text-sm md:text-base">
            {sidebarLabel}
          </h3>
          <div className="mt-4 grid gap-x-8 gap-y-5 sm:mt-5 sm:grid-cols-2 sm:gap-y-6">
            {listColumns.map((column, columnIndex) => (
              <ol key={columnIndex} className="space-y-5 sm:space-y-6">
                {column.map((item, index) => {
                  const globalIndex =
                    columnIndex * (LIST_COUNT / LIST_COLUMNS) + index;
                  return (
                    <FeaturedListItem
                      key={`${item.title}-${columnIndex}-${index}`}
                      item={item}
                      index={index}
                      active={activeIndex === globalIndex}
                      onSelect={() => handleSelect(globalIndex)}
                    />
                  );
                })}
              </ol>
            ))}
          </div>
        </div>

        <NewsPagination pagination={pagination} className="mt-10 sm:mt-12" />
      </article>

      {article && (
        <NewsArticlePreview
          article={article}
          className="mt-8 sm:mt-10 md:mt-12"
        />
      )}
    </>
  );
}
