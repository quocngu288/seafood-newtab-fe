export type Locale = "vi" | "en";

export type ApiProduct = {
  id: number;
  name: string;
  description: string;
  packing: string;
  size: string;
  price: string;
  priceVnd: number;
  date: string;
  thumbnailKey: string;
  thumbnailUrl: string;
};

export type ProductTranslationInput = {
  name: string;
  description: string;
  packing: string;
  size: string;
  priceVnd: number;
  date: string;
};

export type ProductTranslationFields = ProductTranslationInput & {
  price: string;
};

export type AdminProduct = {
  id: number;
  thumbnailKey: string;
  thumbnailUrl: string;
  sortOrder: number;
  translations: {
    vi: ProductTranslationFields | null;
    en: ProductTranslationFields | null;
  };
};

export type UploadImageResponse = {
  key: string;
  url: string;
  size?: number;
  format?: string;
};

export type ApiNewsArticle = {
  id: number;
  slug: string;
  title: string;
  date: string;
  body: string;
  excerpt: string;
  thumbnailKey: string;
  thumbnailUrl: string;
};

export type NewsTranslationFields = {
  title: string;
  body: string;
  excerpt: string;
};

export type AdminNewsArticle = {
  id: number;
  slug: string;
  thumbnailKey: string;
  thumbnailUrl: string;
  sortOrder: number;
  publishedAt: string | null;
  translations: {
    vi: NewsTranslationFields | null;
    en: NewsTranslationFields | null;
  };
};

export type PaginatedNews = {
  data: ApiNewsArticle[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type ContactMessage = {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  message: string;
  newsletter: boolean;
  createdAt: string;
};

export type CreateContactPayload = {
  fullName: string;
  phone: string;
  email: string;
  address?: string;
  message: string;
  newsletter?: boolean;
};

export type LoginResponse = {
  accessToken: string;
  username: string;
};
