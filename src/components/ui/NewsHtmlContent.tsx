type NewsHtmlContentProps = {
  html: string;
  className?: string;
};

export function NewsHtmlContent({ html, className = "" }: NewsHtmlContentProps) {
  if (!html.trim()) return null;

  return (
    <div
      className={`news-html-content ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
