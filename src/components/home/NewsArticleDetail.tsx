import Image from "next/image";
import type { StaticImageData } from "next/image";
import { NewsHtmlContent } from "@/components/ui/NewsHtmlContent";
import { images } from "@/lib/images";

export type NewsArticleDetailData = {
  id?: number;
  title: string;
  date: string;
  body: string;
  imageUrl?: string;
  thumbnailKey?: string;
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
          {article.date && (
            <time className="hh-text-base mt-2 block font-medium text-gray-500">
              {article.date}
            </time>
          )}
          <NewsHtmlContent html={article.body} className="mt-3 sm:mt-4" />
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
      </div>
    </article>
  );
}
