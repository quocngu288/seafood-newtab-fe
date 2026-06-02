import Image from "next/image";
import type { StaticImageData } from "next/image";
import { getTranslations } from "next-intl/server";
import { images } from "@/lib/images";

/** Placeholder — thay bằng file trong src/images khi có */
const PLACEHOLDER = {
  export: images.heroSlide,
  farming: images.heroSlide,
  fillets:
    "https://images.unsplash.com/photo-1611171711916-3ab5f5f5a6a2?w=900&q=80",
} as const;

type StandardCardProps = {
  imageSrc: string | StaticImageData;
  imageAlt: string;
  title: string;
  description: string;
};

function StandardFeatureCard({
  imageSrc,
  imageAlt,
  title,
  description,
}: StandardCardProps) {
  return (
    <article className="relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-md">
      <div className="relative aspect-[5/4] shrink-0 bg-slate-100">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 50vw, 280px"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent via-white/60 to-white sm:h-20"
          aria-hidden
        />
      </div>
      <div className="relative px-4 pb-12 pt-2">
        <h3 className="text-base font-bold text-gray-900">{title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-600">
          {description}
        </p>
      </div>
      <button
        type="button"
        className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-hh-red text-lg font-bold leading-none text-white shadow-sm"
        aria-label="More"
      >
        +
      </button>
    </article>
  );
}

type FilletsCardProps = {
  title: string;
  description: string;
  cta: string;
  imageAlt: string;
};

function FilletsFeatureCard({
  title,
  description,
  cta,
  imageAlt,
}: FilletsCardProps) {
  return (
    <article className="relative min-h-[320px] overflow-visible rounded-2xl bg-white shadow-md sm:min-h-[360px]">
      <div className="relative z-20 max-w-[66%] p-5 sm:max-w-[56%] sm:p-6">
        <h3 className="text-[28px] font-bold leading-none text-gray-900 sm:text-[34px]">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-[15px]">
          {description}
        </p>
        <button
          type="button"
          className="mt-5 rounded-full bg-hh-red px-6 py-2.5 text-sm font-semibold text-white shadow-sm"
        >
          {cta}
        </button>
      </div>

      <div className="pointer-events-none absolute -bottom-10 -right-3 z-10 h-[62%] w-[56%] min-h-[170px] sm:-bottom-12 sm:-right-8 sm:h-[78%] sm:w-[56%] sm:min-h-[230px]">
        <Image
          src={PLACEHOLDER.fillets}
          alt={imageAlt}
          fill
          className="object-contain object-bottom-right drop-shadow-2xl"
          sizes="(max-width: 1024px) 60vw, 400px"
        />
      </div>
    </article>
  );
}

export async function FeatureCards() {
  const t = await getTranslations("features");

  return (
    <section className="site-container relative z-20 pb-16 sm:pb-24 lg:pb-32">
      <div className="relative lg:h-[420px]">
        <div
          className="hidden rounded-[28px] bg-[#79B4E6] shadow-[0_10px_28px_rgba(0,0,0,0.14)] lg:absolute lg:inset-x-0 lg:bottom-0 lg:block lg:h-[56%]"
          aria-hidden
        />
        <div className="overflow-hidden rounded-[28px] bg-[#79B4E6] px-3 pb-8 pt-4 shadow-[0_10px_28px_rgba(0,0,0,0.14)] sm:px-5 sm:pb-10 sm:pt-6 lg:absolute lg:inset-x-0 lg:top-0 lg:overflow-visible lg:rounded-none lg:bg-transparent lg:px-3 lg:pb-0 lg:pt-0 lg:shadow-none">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          <div className="sm:col-span-1 lg:col-span-1">
            <StandardFeatureCard
              imageSrc={PLACEHOLDER.export}
              imageAlt={t("export.title")}
              title={t("export.title")}
              description={t("export.description")}
            />
          </div>
          <div className="sm:col-span-1 lg:col-span-1">
            <StandardFeatureCard
              imageSrc={PLACEHOLDER.farming}
              imageAlt={t("farming.title")}
              title={t("farming.title")}
              description={t("farming.description")}
            />
          </div>
          <div className="sm:col-span-2 lg:col-span-2">
            <FilletsFeatureCard
              title={t("fillets.title")}
              description={t("fillets.description")}
              cta={t("fillets.cta")}
              imageAlt={t("fillets.title")}
            />
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
