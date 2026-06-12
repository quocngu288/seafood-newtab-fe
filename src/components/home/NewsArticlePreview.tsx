import type { NewsArticleDetailData } from "./NewsArticleDetail";

type NewsArticlePreviewProps = {
  article: NewsArticleDetailData;
  className?: string;
};

export function NewsArticlePreview({ article, className = "" }: NewsArticlePreviewProps) {
  return (
    <article
      className={`rounded-[28px] bg-[#e8f2f8] px-5 py-6 sm:px-7 sm:py-7 md:px-8 md:py-8 ${className}`}
    >
      <div className="flex gap-3 sm:gap-4">
        <span
          className="mt-1 w-1 shrink-0 self-stretch rounded-full bg-hh-red sm:w-1.5"
          aria-hidden
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-2xl font-bold leading-snug text-gray-900 sm:text-[28px] md:text-[32px]">
            {article.title}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-gray-700 sm:text-lg md:text-[22px]">
            <time className="font-medium text-gray-600">{article.date}</time>
            {" | "}
            {article.body}
          </p>
        </div>
      </div>
    </article>
  );
}
