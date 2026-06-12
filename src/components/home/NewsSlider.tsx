"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CarouselDots } from "@/components/ui/CarouselDots";
import { NewsCard } from "./NewsCard";

const SLIDE_COUNT = 4;

export function NewsSlider() {
  const t = useTranslations("homeNews");
  const items = t.raw("slider") as Array<{ title: string }>;

  const [activeDot, setActiveDot] = useState(1);

  const visible = [0, 1, 2].map((offset) => {
    const index = (activeDot + offset) % items.length;
    return { ...items[index], index };
  });

  return (
    <section className="py-10 sm:py-12 md:py-14">
      <div className="site-container">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-4">
          <h2 className="hh-section-title--xl">{t("title")}</h2>
          <CarouselDots
            count={SLIDE_COUNT}
            active={activeDot}
            onChange={setActiveDot}
            labelPrefix="News slide"
            className="order-3 w-full md:order-none md:w-auto"
          />
          <Link
            href="/news?view=full"
            className="order-2 text-sm font-semibold uppercase tracking-wide text-gray-900 hover:text-hh-blue sm:text-base md:order-none md:text-lg md:justify-self-end"
          >
            {t("all")}{" "}
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-gray-400 text-sm sm:h-5 sm:w-5 sm:text-base">
              ›
            </span>
          </Link>
        </div>

        <div className="rounded-[28px] bg-[#c8dff0] px-4 py-4 sm:px-[30px] sm:py-[20px] md:px-[60px] md:py-[40px]">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {visible.map((item) => (
              <NewsCard
                key={`${activeDot}-${item.index}`}
                title={item.title}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
