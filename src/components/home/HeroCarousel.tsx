"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { images } from "@/lib/images";

/** Chỉ ảnh đổi theo slide — thêm file khi có (hero-slide-2.jpg, …) */
const SLIDE_IMAGES = [
  images.heroSlide,
  images.heroSlide,
  images.heroSlide,
  images.heroSlide,
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
    <section className="site-container">
      <div className="relative overflow-hidden rounded-[40px] bg-white shadow-xl">
        <span
          className="absolute left-4 top-4 z-30 font-serif text-6xl leading-none text-hh-red sm:left-10 sm:top-5 sm:text-7xl"
          aria-hidden
        >
          &ldquo;
        </span>

        <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-[16/9]">
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

        <div className="absolute inset-x-0 top-0 z-20 flex min-h-[50%] flex-col items-center justify-start px-4 pb-6 pt-8 text-center sm:min-h-[46%] sm:px-10 sm:pb-10 sm:pt-12">
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-white/90 via-[55%] to-transparent"
            aria-hidden
          />
          <div className="relative z-10">
            <h2 className="mx-auto line-clamp-4 max-w-2xl text-base leading-snug text-slate-800 sm:line-clamp-3 sm:text-[24px]">
              {title}
            </h2>
            <div className="mx-auto mt-3 inline-flex max-w-full rounded-full bg-hh-blue px-4 py-1.5 text-[11px] uppercase tracking-wide text-white shadow-sm sm:mt-4 sm:px-5 sm:py-2 sm:text-sm">
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
            className={`h-3 w-3 rounded-sm transition ${
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
