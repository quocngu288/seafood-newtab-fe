"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { images } from "@/lib/images";

const SLIDE_COUNT = 4;

export function NewsSlider() {
  const t = useTranslations("homeNews");
  const items = t.raw("slider") as Array<{ title: string }>;

  const [activeDot, setActiveDot] = useState(1);

  const visible = [0, 1, 2].map((offset) => {
    const index = (activeDot + offset) % items.length;
    return { ...items[index], index, isHighlighted: offset === 2 };
  });

  return (
    <section className="py-10 sm:py-14">
      <div className="site-container">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-4">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            {t("title")}
          </h2>
          <div className="order-3 flex w-full justify-center gap-2 sm:order-none sm:w-auto sm:justify-center">
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
            href="/news"
            className="order-2 text-sm font-semibold uppercase tracking-wide text-gray-900 hover:text-hh-blue sm:order-none sm:justify-self-end"
          >
            {t("all")}{" "}
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-gray-400 text-xs">
              ›
            </span>
          </Link>
        </div>

        <div className="rounded-[28px] bg-[#c8dff0] p-4 sm:p-5">
          <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
            {visible.map((item) => (
              <article
                key={`${activeDot}-${item.index}`}
                className={`flex flex-col overflow-hidden rounded-2xl shadow-sm transition-colors ${
                  item.isHighlighted ? "bg-hh-blue-dark" : "bg-white"
                }`}
              >
                <div className="relative m-3 aspect-square overflow-hidden rounded-xl bg-slate-200">
                  <Image
                    src={images.heroSlide}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 280px"
                  />
                </div>
                <div className="flex min-h-[56px] items-center justify-between gap-2 px-3 pb-3">
                  <p
                    className={`line-clamp-2 flex-1 text-sm font-medium leading-snug ${
                      item.isHighlighted ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {item.title}
                  </p>
                  <button
                    type="button"
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg font-bold leading-none ${
                      item.isHighlighted
                        ? "bg-white text-hh-blue-dark"
                        : "bg-hh-red text-white"
                    }`}
                    aria-label="More"
                  >
                    +
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
