import Image from "next/image";
import type { StaticImageData } from "next/image";
import { resolveNewsImageSrc } from "@/lib/thumbnails";
import { stripHtml } from "@/lib/html";
import type { NewsArticleDetailData } from "./NewsArticleDetail";

type NewsArticlePreviewProps = {
  article: NewsArticleDetailData;
  className?: string;
};

export function NewsArticlePreview({
  article,
  className = "",
}: NewsArticlePreviewProps) {
  const imageSrc = resolveNewsImageSrc(article.imageUrl, article.thumbnailKey);
  const previewText = stripHtml(article.body);

  return (
    <article
      className={`rounded-3xl bg-[#e8f2f8] px-4 py-5 sm:rounded-[28px] sm:px-7 sm:py-7 md:px-8 md:py-8 ${className}`}
    >
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
            {article.date && (
              <>
                <time className="font-medium text-gray-600">
                  {article.date}
                </time>
                {" | "}
              </>
            )}
            {previewText}
          </p>
        </div>
      </div>

      {imageSrc && (
        <div className="relative mt-6 overflow-hidden rounded-2xl">
          <div className="relative aspect-[16/9] w-full md:aspect-[2/1]">
            {typeof imageSrc === "string" ? (
              <img
                src={imageSrc}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <Image
                src={imageSrc}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            )}
          </div>
        </div>
      )}
    </article>
  );
}
