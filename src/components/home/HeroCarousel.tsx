"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { images } from "@/lib/images";

/** Chỉ ảnh đổi theo slide — thêm file khi có (hero-slide-2.jpg, …) */
const SLIDE_IMAGES = [
  images.heroSlide,
  images.heroSlide1,
  images.heroSlide2,
] as const;

const SLIDE_COUNT = SLIDE_IMAGES.length;

export function HeroCarousel() {
  const t = useTranslations("hero");
  const slides = t.raw("slides") as Array<{
    title: string;
    badges: string;
    imageAlt: string;
  }>;

  const [active, setActive] = useState(0);
  const { title, badges } = slides[0];

  return (
    <section className="site-container mb-8 sm:mb-12">
      <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl sm:rounded-[40px]">
        <Image
          src={images.quote}
          alt=""
          width={76}
          height={44}
          className="absolute left-3 top-3 z-30 h-8 w-8 md:w-auto sm:left-6 sm:top-4 sm:h-9 md:left-10 md:top-5 md:h-11 lg:h-12"
          aria-hidden
        />

        <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] md:aspect-[16/9]">
          {SLIDE_IMAGES.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt={slides[i]?.imageAlt ?? slides[0].imageAlt}
              fill
              className={`object-cover object-center transition-opacity duration-500 ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 1024px) 100vw, 896px"
              priority={i === 0}
            />
          ))}
        </div>

        <div className="absolute inset-x-0 top-0 z-20 flex min-h-[50%] flex-col items-center justify-start px-8 pb-4 pt-6 text-center sm:min-h-[46%] sm:px-6 sm:pb-6 sm:pt-8 md:min-h-[42%] md:px-10 md:pb-10 md:pt-12">
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-white/90 via-[55%] to-transparent"
            aria-hidden
          />
          <div className="relative z-10">
            <h2 className="hh-text-2xl mx-auto line-clamp-4 max-w-2xl leading-snug text-slate-800 sm:line-clamp-3">
              {title}
            </h2>
            <div className="hh-text-lg mx-auto mt-2 inline-flex max-w-full rounded-full bg-[#79B4E6] px-3 py-1 font-semibold uppercase tracking-wide text-white shadow-sm sm:mt-3 sm:px-4 sm:py-1.5 md:mt-4 md:px-5 md:py-2">
              <span className="line-clamp-2">{badges}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: SLIDE_COUNT }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className={`h-2 w-2 sm:w-3 sm:h-3 rounded-sm transition ${
              i === active ? "bg-hh-red" : "bg-gray-300/90 hover:bg-gray-200"
            }`}
            aria-label={`Slide ${i + 1}`}
            aria-current={i === active}
          />
        ))}
      </div>
    </section>
  );
}
