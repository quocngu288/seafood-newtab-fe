import Image from "next/image";
import type { StaticImageData } from "next/image";
import { images } from "@/lib/images";

type NewsCardProps = {
  title: string;
  imageSrc?: string | StaticImageData;
  imageAlt?: string;
  active?: boolean;
  className?: string;
  onClick?: () => void;
};

export function NewsCard({
  title,
  imageSrc = images.heroSlide,
  imageAlt = "",
  active = false,
  className = "",
  onClick,
}: NewsCardProps) {
  return (
    <article
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`group flex cursor-pointer flex-col overflow-hidden rounded-2xl px-3 py-3 shadow-sm transition-colors sm:px-[25px] sm:py-[20px] ${
        active
          ? "bg-hh-blue-dark"
          : "bg-white hover:bg-hh-blue-dark"
      } ${className}`}
    >
      <div className="relative m-2 aspect-square overflow-hidden rounded-xl bg-slate-200 sm:m-3">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
        />
      </div>
      <div className="mt-2 flex min-h-[48px] items-center justify-between gap-1.5 px-1 pb-2 sm:min-h-[56px] sm:gap-2 sm:px-3 sm:pb-3">
        <p
          className={`line-clamp-2 flex-1 text-xs font-medium leading-snug transition-colors sm:text-sm md:text-base ${
            active
              ? "text-white"
              : "text-gray-900 group-hover:text-white"
          }`}
        >
          {title}
        </p>
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-base font-bold leading-none transition-colors sm:h-8 sm:w-8 sm:text-lg ${
            active
              ? "bg-white text-hh-blue-dark"
              : "bg-hh-red text-white group-hover:bg-white group-hover:text-hh-blue-dark"
          }`}
          aria-hidden
        >
          +
        </span>
      </div>
    </article>
  );
}
