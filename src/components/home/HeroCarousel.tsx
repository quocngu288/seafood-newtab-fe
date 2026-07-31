"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { useTranslations } from "next-intl";
import { images } from "@/lib/images";

export type HeroSlide = {
  title: string;
  badges: string;
  imageAlt: string;
  image: string | StaticImageData;
};

function ChevronLeft({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const t = useTranslations("hero");
  const [active, setActive] = useState(0);
  const slideCount = slides.length;
  const slide = slides[active] ?? slides[0];

  if (!slide || slideCount === 0) return null;

  function goPrev() {
    setActive((current) => (current - 1 + slideCount) % slideCount);
  }

  function goNext() {
    setActive((current) => (current + 1) % slideCount);
  }

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
          {slides.map((item, i) => (
            <Image
              key={`${item.imageAlt}-${i}`}
              src={item.image}
              alt={item.imageAlt}
              fill
              className={`object-cover object-center transition-opacity duration-500 ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 1024px) 100vw, 896px"
              priority={i === 0}
            />
          ))}

          {slideCount > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-2 top-1/2 z-30 flex -translate-y-1/2 items-center justify-center text-white/80 drop-shadow-md transition hover:text-white sm:left-3 md:left-4"
                aria-label={t("prevSlide")}
              >
                <ChevronLeft className="h-10 w-10 sm:h-15 sm:w-15" />
              </button>

              <button
                type="button"
                onClick={goNext}
                className="absolute right-2 top-1/2 z-30 flex -translate-y-1/2 items-center justify-center text-white/80 drop-shadow-md transition hover:text-white sm:right-3 md:right-4"
                aria-label={t("nextSlide")}
              >
                <ChevronRight className="h-10 w-10 sm:h-15 sm:w-15" />
              </button>
            </>
          )}
        </div>

        <div className="absolute inset-x-0 top-0 z-20 flex min-h-[50%] flex-col items-center justify-start px-8 pb-4 pt-6 text-center sm:min-h-[46%] sm:px-6 sm:pb-6 sm:pt-8 md:min-h-[42%] md:px-10 md:pb-10 md:pt-12">
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-white/90 via-[55%] to-transparent"
            aria-hidden
          />
          <div className="relative z-10">
            <h2 className="hh-text-2xl mx-auto line-clamp-4 max-w-2xl leading-snug text-slate-800 sm:line-clamp-3">
              {slide.title}
            </h2>
            {slide.badges ? (
              <div className="hh-text-lg mx-auto mt-2 inline-flex max-w-full rounded-full bg-[#79B4E6] px-3 py-1 font-semibold uppercase tracking-wide text-white shadow-sm sm:mt-3 sm:px-4 sm:py-1.5 md:mt-4 md:px-5 md:py-2">
                <span className="line-clamp-2">{slide.badges}</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {slideCount > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`h-2 w-2 rounded-sm transition sm:h-3 sm:w-3 ${
                i === active ? "bg-hh-red" : "bg-gray-300/90 hover:bg-gray-200"
              }`}
              aria-label={`Slide ${i + 1}`}
              aria-current={i === active}
            />
          ))}
        </div>
      )}
    </section>
  );
}
