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
    return { ...items[index], index };
  });

  return (
    <section className="py-10 sm:py-12 md:py-14">
      <div className="site-container">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-4">
          <h2 className="text-[36px] font-bold text-gray-900">{t("title")}</h2>
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
            href="/news"
            className="order-2 text-[18px] font-semibold uppercase tracking-wide text-gray-900 hover:text-hh-blue md:order-none md:justify-self-end"
          >
            {t("all")}{" "}
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-gray-400 text-[18px]">
              ›
            </span>
          </Link>
        </div>

        <div className="rounded-[28px] bg-[#c8dff0] px-[30px] py-[20px]  md:px-[60px] md:py-[40px]">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {visible.map((item) => (
              <article
                key={`${activeDot}-${item.index}`}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white px-[25px] py-[20px] shadow-sm transition-colors hover:bg-hh-blue-dark cursor-pointer"
              >
                <div className="relative m-3 aspect-square overflow-hidden rounded-xl bg-slate-200">
                  <Image
                    src={images.heroSlide}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                  />
                </div>
                <div className="mt-2 flex min-h-[56px] items-center justify-between gap-2 px-3 pb-3">
                  <p className="line-clamp-2 flex-1 text-[16px] font-medium leading-snug text-gray-900 transition-colors group-hover:text-white">
                    {item.title}
                  </p>
                  <button
                    type="button"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-hh-red text-lg font-bold leading-none text-white transition-colors group-hover:bg-white group-hover:text-hh-blue-dark"
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
