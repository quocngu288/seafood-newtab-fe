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

function FeatureCardTitle({
  children,
  variant = "standard",
}: {
  children: string;
  variant?: "standard" | "wide";
}) {
  return (
    <div>
      <h3
        className={
          variant === "wide"
            ? "hh-text-4xl font-bold leading-none text-gray-900"
            : "hh-text-2xl font-bold text-gray-900"
        }
      >
        {children}
      </h3>
      <div
        className={`mt-2 bg-gray-900 ${
          variant === "wide" ? "h-1 w-28" : "h-0.5 w-16"
        }`}
        aria-hidden
      />
    </div>
  );
}

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
    <article className="relative flex min-h-[320px] flex-col overflow-hidden rounded-2xl bg-white shadow-md sm:min-h-[380px] md:min-h-[420px] lg:min-h-[450px]">
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
        <FeatureCardTitle>{title}</FeatureCardTitle>
        <p className="hh-text-sm mt-3 line-clamp-3 leading-relaxed text-gray-600">
          {description}
        </p>
      </div>
      <button
        type="button"
        className="hh-text-lg absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-hh-red font-bold leading-none text-white shadow-sm"
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
    <article className="relative min-h-[320px] overflow-hidden rounded-2xl bg-white shadow-md sm:min-h-[380px] md:min-h-[420px] md:overflow-visible lg:min-h-[450px]">
      <div className="relative z-20 max-w-[72%] p-4 sm:max-w-[66%] sm:p-5 md:max-w-[60%] md:p-6 lg:max-w-[56%]">
        <FeatureCardTitle variant="wide">{title}</FeatureCardTitle>
        <p className="hh-text-sm mt-3 leading-relaxed text-gray-600 sm:mt-4">
          {description}
        </p>
        <button
          type="button"
          className="hh-text-lg mt-4 rounded-full bg-hh-red px-5 py-2 font-semibold text-white shadow-sm sm:mt-5 sm:px-6 sm:py-2.5"
        >
          {cta}
        </button>
      </div>

      <div className="pointer-events-none absolute -bottom-10 -right-3 z-10 h-[64%] w-[58%] min-h-[170px] sm:-bottom-12 sm:-right-5 sm:h-[76%] sm:w-[60%] md:-bottom-16 md:-right-10 md:h-[88%] md:w-[64%] md:min-h-[260px]">
        <Image
          src={images.featureSlide}
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
    <section className="site-container relative z-20 pb-12 sm:pb-14 md:pb-16 lg:pb-20">
      {/*
        Lớp 1 (z-0): nền xanh — chỉ là “kệ” phía dưới
        Lớp 2 (z-10): 3 card trắng đè lên, phần lớn card nhô ra phía trên mép nền
      */}
      <div className="relative min-h-[340px] sm:min-h-[380px] md:min-h-[400px] lg:min-h-[450px]">
        <div
          className="pointer-events-none absolute inset-x-0 bottom-[-80px] z-0 h-[315px] rounded-[28px] bg-[#79B4E6] shadow-[0_10px_28px_rgba(0,0,0,0.14)]"
          aria-hidden
        />

        <div className="relative z-10 grid grid-cols-1 items-end gap-3 px-4 sm:grid-cols-2 sm:gap-4 sm:px-6 md:gap-5 md:px-[60px] lg:grid-cols-4">
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
    </section>
  );
}
