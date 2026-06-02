import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { images } from "@/lib/images";

export async function NewsFeatured() {
  const t = await getTranslations("homeNews.featured");

  return (
    <section className="bg-white pb-8 sm:pb-12">
      <div className="site-container">
        <article className="rounded-[28px] bg-[#e8f2f8] px-5 py-6 sm:px-8 sm:py-8">
          <div className="flex gap-3 sm:gap-4">
            <span
              className="mt-1 w-1 shrink-0 self-stretch rounded-full bg-hh-red sm:w-1.5"
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-bold leading-snug text-gray-900 sm:text-xl">
                {t("title")}
              </h3>
              <p className="mt-2 text-xs text-gray-500 sm:text-sm">{t("meta")}</p>
              <p className="mt-4 text-sm leading-relaxed text-gray-700 sm:text-base">
                {t("body")}
              </p>
            </div>
          </div>

          <div className="relative mt-6 overflow-hidden rounded-2xl">
            <div className="relative aspect-[16/9] w-full sm:aspect-[2/1]">
              <Image
                src={images.heroSlide}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1152px"
              />
            </div>
            <div className="absolute bottom-4 left-4 flex flex-col gap-2 sm:flex-row">
              <span className="rounded bg-[#003366] px-3 py-2 text-center text-[10px] font-bold uppercase leading-tight text-white shadow-md sm:text-xs">
                {t("badgeMsc")}
              </span>
              <span className="rounded bg-[#00838f] px-3 py-2 text-center text-[10px] font-bold uppercase leading-tight text-white shadow-md sm:text-xs">
                {t("badgeAsc")}
              </span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
