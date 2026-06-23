export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Remove leading h1–h3 when it repeats the article title already shown in the page header. */
export function stripLeadingHeadingFromHtml(html: string, title: string): string {
  const normalizedTitle = stripHtml(title).replace(/^\*+/, "").trim().toLowerCase();
  if (!normalizedTitle) return html;

  return html.replace(/^\s*<h[1-3][^>]*>[\s\S]*?<\/h[1-3]>\s*/i, (match) => {
    const headingText = stripHtml(match).replace(/^\*+/, "").trim().toLowerCase();
    if (
      headingText === normalizedTitle ||
      headingText.includes(normalizedTitle) ||
      normalizedTitle.includes(headingText)
    ) {
      return "";
    }
    return match;
  });
}
