import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type ValueItem = {
  key: string;
  motto: string;
  description: string;
};

function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="text-lg font-bold uppercase tracking-wide text-hh-blue-dark sm:text-xl">
      {children}
    </h2>
  );
}

function SectionBody({ children }: { children: string }) {
  return (
    <p className="mt-3 text-base leading-relaxed text-gray-700 sm:text-lg">
      {children}
    </p>
  );
}

function HeartIcon({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M16 26.5S7 20.8 7 14.2A4.8 4.8 0 0 1 16 10a4.8 4.8 0 0 1 9 4.2C25 20.8 16 26.5 16 26.5Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HonorIcon({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M16 5 24 8.5v7.2c0 5.4-3.5 9.3-8 11-4.5-1.7-8-5.6-8-11V8.5L16 5Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path
        d="m12.2 15.5 2.6 2.6 5-5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HarmonyIcon({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M16 25.5c0-7.5 4-11.5 8-13-1.2 5.5-4.2 9.2-8 13Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path
        d="M16 25.5c0-7.5-4-11.5-8-13 1.2 5.5 4.2 9.2 8 13Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path
        d="M16 25.5V12"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <circle cx="16" cy="9" r="2" stroke="currentColor" strokeWidth="1.9" />
    </svg>
  );
}

function StandardsIcon({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M16 5.5 18.5 13H26l-5.8 4.3L22.5 26 16 21.4 9.5 26l2.3-8.7L6 13h7.5L16 5.5Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ValueIcon({
  valueKey,
  className = "h-9 w-9 text-white",
}: {
  valueKey: string;
  className?: string;
}) {
  if (valueKey === "Honor") return <HonorIcon className={className} />;
  if (valueKey === "Harmony") return <HarmonyIcon className={className} />;
  if (valueKey === "High Standards") return <StandardsIcon className={className} />;
  return <HeartIcon className={className} />;
}

/** 4 hình tròn — gradient, ring nhiều lớp, highlight */
function CoreValuesCircles({ items }: { items: ValueItem[] }) {
  return (
    <div className="mt-6 rounded-[28px] bg-linear-to-b from-[#E8F2FA] to-[#d4e6f4] px-4 py-9 sm:px-6 sm:py-11 lg:px-10">
      <div className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4 lg:gap-8">
        {items.map((item, index) => (
          <article
            key={item.key}
            className="group flex h-full flex-col items-center text-center"
          >
            <div className="relative h-32 w-32 sm:h-36 sm:w-36">
              {/* soft outer glow */}
              <span
                className="absolute -inset-2 rounded-full bg-hh-blue/10 blur-md transition group-hover:bg-hh-blue/20"
                aria-hidden
              />

              {/* decorative SVG rings */}
              <svg
                viewBox="0 0 120 120"
                className="absolute inset-0 h-full w-full"
                aria-hidden
              >
                <defs>
                  <linearGradient
                    id={`value-grad-${index}`}
                    x1="20"
                    y1="10"
                    x2="100"
                    y2="110"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#3d7ab8" />
                    <stop offset="55%" stopColor="#1a5a9e" />
                    <stop offset="100%" stopColor="#0d3a6e" />
                  </linearGradient>
                </defs>
                {/* outer thin ring */}
                <circle
                  cx="60"
                  cy="60"
                  r="56"
                  fill="none"
                  stroke="rgba(26,90,158,0.22)"
                  strokeWidth="1.5"
                  strokeDasharray="3 5"
                />
                {/* main disc */}
                <circle
                  cx="60"
                  cy="60"
                  r="46"
                  fill={`url(#value-grad-${index})`}
                />
                {/* inner rim */}
                <circle
                  cx="60"
                  cy="60"
                  r="46"
                  fill="none"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="2"
                />
                {/* top highlight */}
                <ellipse
                  cx="60"
                  cy="42"
                  rx="28"
                  ry="14"
                  fill="rgba(255,255,255,0.16)"
                />
              </svg>

              {/* icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <ValueIcon
                  valueKey={item.key}
                  className="h-11 w-11 text-white drop-shadow-sm sm:h-12 sm:w-12"
                />
              </div>

              {/* index badge */}
              <span className="absolute right-0 bottom-1 flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-bold text-hh-blue-dark shadow-[0_4px_12px_rgba(13,58,110,0.2)] ring-2 ring-hh-blue/15 sm:h-9 sm:w-9 sm:text-sm">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <h3 className="mt-5 text-sm font-bold tracking-[0.08em] text-hh-blue-dark uppercase sm:mt-6 sm:text-base">
              {item.key}
            </h3>
            <p className="mt-1.5 text-sm font-medium italic leading-snug text-hh-blue">
              {item.motto}
            </p>
            <p className="mt-3 min-h-16 max-w-66 text-sm leading-relaxed text-gray-600 sm:min-h-20">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

export async function AboutContent() {
  const t = await getTranslations("pages.about");
  const values = t.raw("values.items") as ValueItem[];

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* Chairman message */}
      <section className="rounded-2xl bg-[#E8F2FA] px-5 py-6 sm:px-8 sm:py-8">
        <SectionHeading>{t("chairman.title")}</SectionHeading>
        <blockquote className="mt-4 border-l-4 border-hh-blue/40 pl-4 text-base leading-relaxed text-gray-700 italic sm:pl-5 sm:text-lg">
          {t("chairman.body")}
        </blockquote>
      </section>

      {/* Journey */}
      <section>
        <SectionHeading>{t("journey.title")}</SectionHeading>
        <SectionBody>{t("journey.body")}</SectionBody>
      </section>

      {/* Vision + Mission */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
        <section className="rounded-2xl border border-hh-blue/10 bg-white p-5 shadow-sm sm:p-6">
          <SectionHeading>{t("vision.title")}</SectionHeading>
          <p className="mt-3 text-base font-semibold text-hh-blue sm:text-lg">
            {t("vision.tagline")}
          </p>
          <SectionBody>{t("vision.body")}</SectionBody>
        </section>

        <section className="rounded-2xl border border-hh-blue/10 bg-white p-5 shadow-sm sm:p-6">
          <SectionHeading>{t("mission.title")}</SectionHeading>
          <SectionBody>{t("mission.body")}</SectionBody>
        </section>
      </div>

      {/* Core values — 4 hình tròn */}
      <section>
        <SectionHeading>{t("values.title")}</SectionHeading>
        <CoreValuesCircles items={values} />
      </section>

      {/* Quality */}
      <section>
        <SectionHeading>{t("quality.title")}</SectionHeading>
        <SectionBody>{t("quality.body")}</SectionBody>
      </section>

      {/* Team */}
      <section className="rounded-2xl bg-hh-blue px-5 py-6 text-white sm:px-8 sm:py-8">
        <h2 className="text-lg font-bold uppercase tracking-wide sm:text-xl">
          {t("team.title")}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-white/90 sm:text-lg">
          {t("team.body")}
        </p>
        <p className="mt-4 text-base leading-relaxed text-white/90 sm:text-lg">
          {t("team.body2")}
        </p>
      </section>

      {/* CTA */}
      <div className="flex flex-wrap gap-3">
        <Link
          href="/products"
          className="inline-flex items-center rounded-full bg-hh-red px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-hh-red-hover"
        >
          {t("cta.products")}
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center rounded-full bg-[#B8D4EA] px-5 py-2.5 text-sm font-semibold text-hh-blue-dark transition hover:bg-[#A5C8E2]"
        >
          {t("cta.contact")}
        </Link>
      </div>
    </div>
  );
}
