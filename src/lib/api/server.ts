import type { ApiNewsArticle, ApiProduct, Locale, PaginatedNews } from "./types";
import { getApiUrl } from "./config";

const API_URL = getApiUrl();
const FETCH_TIMEOUT_MS = 8_000;

async function serverFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    cache: "no-store",
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new Error(`API error ${response.status}: ${path}`);
  }
  return response.json() as Promise<T>;
}

export function fetchProducts(locale: Locale) {
  return serverFetch<ApiProduct[]>(`/products?locale=${locale}`);
}

export function fetchNews(locale: Locale, page = 1, limit = 50) {
  return serverFetch<PaginatedNews>(
    `/news?locale=${locale}&page=${page}&limit=${limit}`,
  );
}

export function fetchNewsArticles(locale: Locale): Promise<ApiNewsArticle[]> {
  return fetchNews(locale, 1, 50).then((res) => res.data);
}

export function fetchNewsArticle(slugOrId: string, locale: Locale) {
  return serverFetch<ApiNewsArticle>(
    `/news/${encodeURIComponent(slugOrId)}?locale=${locale}`,
  );
}
