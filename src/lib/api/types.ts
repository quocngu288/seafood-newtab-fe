export type Locale = "vi" | "en";

export type ProductGridPosition = {
  col: number;
  row: number;
  tileSize: "standard" | "tall" | "wide";
};

export type ApiProduct = {
  id: number;
  name: string;
  description: string;
  packing: string;
  size: string;
  price: string;
  priceVnd: number;
  date: string;
  categoryKey: string;
  categoryName: string;
  thumbnailKey: string;
  thumbnailUrl: string;
  gridPosition: ProductGridPosition;
};

export type ProductCategory = {
  key: string;
  name: string;
  sortOrder: number;
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
  categoryKey: string;
  categoryName: string;
  thumbnailKey: string;
  thumbnailUrl: string;
  sortOrder: number;
  gridPosition: ProductGridPosition;
  translations: {
    vi: ProductTranslationFields | null;
    en: ProductTranslationFields | null;
  };
};

export type AdminProductCategory = {
  id: number;
  key: string;
  sortOrder: number;
  translations: {
    vi: { name: string };
    en: { name: string };
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

export type ApiBanner = {
  id: number;
  title: string;
  badges: string;
  imageAlt: string;
  imageKey: string;
  imageUrl: string;
  sortOrder: number;
};

export type BannerTranslationFields = {
  title: string;
  badges: string;
  imageAlt: string;
};

export type AdminBanner = {
  id: number;
  imageKey: string;
  imageUrl: string;
  sortOrder: number;
  active: boolean;
  translations: {
    vi: BannerTranslationFields | null;
    en: BannerTranslationFields | null;
  };
};

export type ApiFieldItem = {
  id: number;
  key: string;
  title: string;
  cta: string;
  imageAlt: string;
  imageKey: string;
  imageUrl: string;
  href: string;
  icon: string;
  reverse: boolean;
  sortOrder: number;
};

export type FieldTranslationFields = {
  title: string;
  cta: string;
  imageAlt: string;
};

export type AdminFieldItem = {
  id: number;
  key: string;
  imageKey: string;
  imageUrl: string;
  href: string;
  icon: string;
  reverse: boolean;
  sortOrder: number;
  active: boolean;
  translations: {
    vi: FieldTranslationFields | null;
    en: FieldTranslationFields | null;
  };
};

export type SiteSettingsTranslationFields = {
  address: string;
  hotline: string;
  mapTitle: string;
  contactLabel: string;
  saleOnline: string;
  companyName: string;
  tagline: string;
  logoAlt: string;
  floatingCallLabel: string;
};

export type SiteSettingsSalesPerson = {
  name: string;
  title: string;
  phone: string;
};

export type ApiSiteSettings = {
  address: string;
  email: string;
  website: string;
  hotline: string;
  mapTitle: string;
  mapEmbedUrl: string;
  contactLabel: string;
  saleOnline: string;
  companyName: string;
  tagline: string;
  logoAlt: string;
  logoKey: string;
  logoUrl: string;
  facebookUrl: string;
  linkedinUrl: string;
  xUrl: string;
  floatingCallPhone: string;
  floatingCallLabel: string;
  sales: SiteSettingsSalesPerson[];
};

export type AdminSiteSettings = {
  email: string;
  website: string;
  facebookUrl: string;
  linkedinUrl: string;
  xUrl: string;
  floatingCallPhone: string;
  mapEmbedUrl: string;
  logoKey: string;
  logoUrl: string;
  sales: Array<{
    name: string;
    phone: string;
    viTitle: string;
    enTitle: string;
  }>;
  translations: {
    vi: SiteSettingsTranslationFields;
    en: SiteSettingsTranslationFields;
  };
};
