"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
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
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-[36px]">{t("title")}</h2>
          <div className="order-3 flex w-full justify-center gap-2 md:order-none md:w-auto md:justify-center">
            {Array.from({ length: SLIDE_COUNT }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveDot(i)}
                className={`h-3 w-3 rounded-sm transition ${
                  i === activeDot
                    ? "bg-hh-red"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`News slide ${i + 1}`}
                aria-current={i === activeDot}
              />
            ))}
          </div>
          <Link
            href="/news?view=full"
            className="order-2 text-[18px] font-semibold uppercase tracking-wide text-gray-900 hover:text-hh-blue md:order-none md:justify-self-end"
          >
            {t("all")}{" "}
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-gray-400 text-[18px]">
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
