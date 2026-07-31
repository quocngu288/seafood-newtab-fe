import Image, { type StaticImageData } from "next/image";
import { Link } from "@/i18n/navigation";

export type FieldItem = {
  key: string;
  title: string;
  cta: string;
  href: string;
  image: string | StaticImageData;
  imageAlt: string;
  /** image bên trái (mặc định) hoặc phải khi reverse */
  reverse?: boolean;
  icon: "farming" | "processing" | "export";
};

function FarmingIcon() {
  return (
    <svg
      className="h-14 w-14 text-hh-blue sm:h-16 sm:w-16"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
    >
      <path
        d="M8 40c6-6 14-9 24-9s18 3 24 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10 46c5.5-4.5 12.5-7 22-7s16.5 2.5 22 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 34c3.5-2.2 7.2-3.2 11-3 3.5.2 6.8 1.4 9.5 3.2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <ellipse
        cx="22"
        cy="28"
        rx="7"
        ry="3.2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M15.5 28 12 26.2v3.6L15.5 28Z"
        fill="currentColor"
      />
      <circle cx="25.5" cy="27.2" r="0.9" fill="currentColor" />
      <ellipse
        cx="40"
        cy="26"
        rx="6.5"
        ry="3"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M34 26 30.8 24.4v3.2L34 26Z"
        fill="currentColor"
      />
      <circle cx="43.2" cy="25.3" r="0.85" fill="currentColor" />
      <ellipse
        cx="32"
        cy="20"
        rx="5.5"
        ry="2.6"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M27 20 24.2 18.6v2.8L27 20Z"
        fill="currentColor"
      />
      <circle cx="34.8" cy="19.4" r="0.75" fill="currentColor" />
    </svg>
  );
}

function ProcessingIcon() {
  return (
    <svg
      className="h-14 w-14 text-hh-blue sm:h-16 sm:w-16"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
    >
      <rect
        x="14"
        y="12"
        width="36"
        height="42"
        rx="3"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M14 22h36M14 34h36M14 46h36"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M32 12v42" stroke="currentColor" strokeWidth="2" />
      <rect
        x="18"
        y="25"
        width="10"
        height="6"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="36"
        y="25"
        width="10"
        height="6"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="18"
        y="37"
        width="10"
        height="6"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="36"
        y="37"
        width="10"
        height="6"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="44" cy="17" r="1.5" fill="currentColor" />
    </svg>
  );
}

function ExportIcon() {
  return (
    <svg
      className="h-14 w-14 text-hh-blue sm:h-16 sm:w-16"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
    >
      {/* Left hand */}
      <path
        d="M12 34c0-3 2-5.5 5-6.5 1.2-.4 2.5-.4 3.6.1L28 31v-7.5c0-2 1.5-3.5 3.5-3.5S35 21.5 35 23.5V36"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28 31.5V24c0-1.7 1.3-3 3-3s3 1.3 3 3v9.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M34 33.5V26c0-1.5 1.2-2.7 2.7-2.7 1.6 0 2.8 1.2 2.8 2.7v9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Right hand */}
      <path
        d="M52 34c0-3-2-5.5-5-6.5-1.2-.4-2.5-.4-3.6.1L36 31v-7.5c0-2-1.5-3.5-3.5-3.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28 38c2.5 4 7 6.5 12 6.5s9.5-2.5 12-6.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M22 42h20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FieldIcon({ type }: { type: FieldItem["icon"] }) {
  if (type === "processing") return <ProcessingIcon />;
  if (type === "export") return <ExportIcon />;
  return <FarmingIcon />;
}

export function FieldsSection({ items }: { items: FieldItem[] }) {
  return (
    <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
      {items.map((item) => (
        <article
          key={item.key}
          className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-12 md:gap-5"
        >
          <div
            className={`relative min-h-[200px] overflow-hidden rounded-xl sm:min-h-[240px] sm:rounded-2xl md:col-span-8 md:min-h-[280px] lg:min-h-[300px] ${
              item.reverse ? "md:order-2" : "md:order-1"
            }`}
          >
            <Image
              src={item.image}
              alt={item.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
          </div>

          <div
            className={`flex flex-col items-start justify-center rounded-xl bg-[#E8F2FA] px-5 py-8 sm:rounded-2xl sm:px-7 sm:py-10 md:col-span-4 md:px-7 lg:px-8 lg:py-12 ${
              item.reverse ? "md:order-1" : "md:order-2"
            }`}
          >
            <FieldIcon type={item.icon} />
            <h2 className="mt-4 text-xl font-bold leading-snug text-hh-blue-dark sm:mt-5 sm:text-2xl">
              {item.title}
            </h2>
            <Link
              href={item.href as "/about"}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#B8D4EA] px-5 py-2.5 text-sm font-semibold text-hh-blue-dark transition hover:bg-[#A5C8E2] sm:mt-6"
            >
              {item.cta}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
