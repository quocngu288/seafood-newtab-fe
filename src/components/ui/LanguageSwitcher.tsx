"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { images } from "@/lib/images";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (next: "vi" | "en") => {
    router.replace(pathname, { locale: next });
  };

  const flagButtonClass = (active: boolean) =>
    `relative h-8 w-8 shrink-0 overflow-hidden rounded-full p-0 shadow-md transition sm:h-[34px] sm:w-[34px] ${
      active ? "ring-2 ring-white/80" : "opacity-90 hover:opacity-100"
    }`;

  return (
    <div className="flex shrink-0 items-center gap-2">
      <button
        type="button"
        onClick={() => switchLocale("en")}
        className={flagButtonClass(locale === "en")}
        aria-label="English"
        title="English"
      >
        <Image
          src={images.iconUnitedKingdom}
          alt=""
          fill
          sizes="34px"
          className="object-cover"
        />
      </button>
      <button
        type="button"
        onClick={() => switchLocale("vi")}
        className={flagButtonClass(locale === "vi")}
        aria-label="Tiếng Việt"
        title="Tiếng Việt"
      >
        <Image
          src={images.iconVietnam}
          alt=""
          fill
          sizes="34px"
          className="object-cover"
        />
      </button>
    </div>
  );
}
