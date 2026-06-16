import type { ApiNewsArticle, ApiProduct, Locale, PaginatedNews } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

async function serverFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, { cache: "no-store" });
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
