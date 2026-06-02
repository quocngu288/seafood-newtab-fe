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

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => switchLocale("en")}
        className={`overflow-hidden rounded-full shadow-md transition ${
          locale === "en" ? "ring-2 ring-white/80" : "opacity-90 hover:opacity-100"
        }`}
        aria-label="English"
        title="English"
      >
        <Image
          src={images.iconUnitedKingdom}
          alt=""
          width={34}
          height={34}
          className="h-[34px] w-[34px] object-cover"
        />
      </button>
      <button
        type="button"
        onClick={() => switchLocale("vi")}
        className={`overflow-hidden rounded-full shadow-md transition ${
          locale === "vi" ? "ring-2 ring-white/80" : "opacity-90 hover:opacity-100"
        }`}
        aria-label="Tiếng Việt"
        title="Tiếng Việt"
      >
        <Image
          src={images.iconVietnam}
          alt=""
          width={34}
          height={34}
          className="h-[34px] w-[34px] object-cover"
        />
      </button>
    </div>
  );
}
