import { getLocale, getTranslations } from "next-intl/server";
import { fetchBanners } from "@/lib/api/server";
import type { Locale } from "@/lib/api/types";
import { images } from "@/lib/images";
import { resolveNewsImageSrc } from "@/lib/thumbnails";
import { HeroCarousel, type HeroSlide } from "./HeroCarousel";

const FALLBACK_IMAGES = [
  images.heroSlide,
  images.heroSlide1,
  images.heroSlide2,
] as const;

export async function HomeTop() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("hero");

  let slides: HeroSlide[] = [];

  try {
    const banners = await fetchBanners(locale);
    slides = banners.map((banner, index) => ({
      title: banner.title,
      badges: banner.badges,
      imageAlt: banner.imageAlt || banner.title,
      image:
        resolveNewsImageSrc(banner.imageUrl, banner.imageKey) ??
        FALLBACK_IMAGES[index % FALLBACK_IMAGES.length],
    }));
  } catch {
    // API unavailable — use message fallbacks below
  }

  if (slides.length === 0) {
    const raw = t.raw("slides") as Array<{
      title: string;
      badges: string;
      imageAlt: string;
    }>;
    slides = raw.slice(0, FALLBACK_IMAGES.length).map((slide, index) => ({
      ...slide,
      image: FALLBACK_IMAGES[index] ?? FALLBACK_IMAGES[0],
    }));
  }

  return (
    <div className="my-4 pb-2 sm:my-6 sm:pb-3 md:my-8 md:pb-4 lg:my-10">
      <HeroCarousel slides={slides} />
    </div>
  );
}
