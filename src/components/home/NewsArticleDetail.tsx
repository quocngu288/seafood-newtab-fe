import Image from "next/image";
import type { StaticImageData } from "next/image";
import { images } from "@/lib/images";

export type NewsArticleDetailData = {
  title: string;
  date: string;
  body: string;
  badgeMsc: string;
  badgeAsc: string;
  bullets: string[];
};

type NewsArticleDetailProps = {
  article: NewsArticleDetailData;
  imageSrc?: string | StaticImageData;
  className?: string;
};

export function NewsArticleDetail({
  article,
  imageSrc = images.heroSlide,
  className = "",
}: NewsArticleDetailProps) {
  return (
    <article className={`mt-10 md:mt-12 ${className}`}>
      <div className="flex gap-3 sm:gap-4">
        <span
          className="mt-1 w-1 shrink-0 self-stretch rounded-full bg-hh-red sm:w-1.5"
          aria-hidden
        />
        <div className="min-w-0 flex-1">
          <h3 className="hh-text-3xl font-bold leading-snug text-gray-900">
            {article.title}
          </h3>
          <p className="hh-text-xl mt-3 leading-relaxed text-gray-700 sm:mt-4">
            {article.body}
          </p>
        </div>
      </div>

      <div className="relative mt-6 overflow-hidden rounded-2xl">
        <div className="relative aspect-[16/9] w-full md:aspect-[2/1]">
          <Image
            src={imageSrc}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
          />
        </div>
        <div className="absolute bottom-4 left-4 flex flex-col gap-2 sm:flex-row">
          <span className="hh-text-xs rounded bg-[#003366] px-3 py-2 text-center font-bold uppercase leading-tight text-white shadow-md">
            {article.badgeMsc}
          </span>
          <span className="hh-text-xs rounded bg-[#00838f] px-3 py-2 text-center font-bold uppercase leading-tight text-white shadow-md">
            {article.badgeAsc}
          </span>
        </div>
      </div>

      {article.bullets.length > 0 && (
        <ol className="hh-text-lg mt-4 list-decimal space-y-2 pl-5 leading-relaxed text-gray-800 sm:mt-6">
          {article.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      )}
    </article>
  );
}
