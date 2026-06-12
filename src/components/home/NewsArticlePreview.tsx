import type { NewsArticleDetailData } from "./NewsArticleDetail";

type NewsArticlePreviewProps = {
  article: NewsArticleDetailData;
  className?: string;
};

export function NewsArticlePreview({ article, className = "" }: NewsArticlePreviewProps) {
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
          <h3 className="text-lg font-bold leading-snug text-gray-900 sm:text-xl md:text-2xl lg:text-3xl">
            {article.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-gray-700 sm:mt-4 sm:text-base md:text-lg lg:text-xl">
            <time className="font-medium text-gray-600">{article.date}</time>
            {" | "}
            {article.body}
          </p>
        </div>
      </div>
    </article>
  );
}
