import { getAdminToken } from "./auth";
import { getApiUrl } from "./config";
import type {
  AdminBanner,
  AdminFieldItem,
  AdminNewsArticle,
  AdminProduct,
  AdminProductCategory,
  AdminSiteSettings,
  ApiBanner,
  ApiFieldItem,
  ApiNewsArticle,
  ApiProduct,
  ApiSiteSettings,
  ContactMessage,
  CreateContactPayload,
  Locale,
  LoginResponse,
  PaginatedNews,
  ProductTranslationInput,
  ProductGridPosition,
  UploadImageResponse,
} from "./types";

const API_URL = getApiUrl();

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  auth = false,
): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  if (auth) {
    const token = getAdminToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    cache: "no-store",
  });

  if (!response.ok) {
    let message = response.statusText;
    try {
      const body = (await response.json()) as { message?: string | string[] };
      if (Array.isArray(body.message)) message = body.message.join(", ");
      else if (body.message) message = body.message;
    } catch {
      // ignore
    }
    throw new ApiError(message, response.status);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

// Public API
export const publicApi = {
  getProducts(locale: Locale) {
    return request<ApiProduct[]>(`/products?locale=${locale}`);
  },

  getProductCategories(locale: Locale) {
    return request<import("./types").ProductCategory[]>(
      `/products/categories?locale=${locale}`,
    );
  },

  getNews(locale: Locale, page = 1, limit = 50) {
    return request<PaginatedNews>(
      `/news?locale=${locale}&page=${page}&limit=${limit}`,
    );
  },

  submitContact(payload: CreateContactPayload) {
    return request<{ id: number; message: string }>("/contact", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  getBanners(locale: Locale) {
    return request<ApiBanner[]>(`/banners?locale=${locale}`);
  },

  getFields(locale: Locale) {
    return request<ApiFieldItem[]>(`/fields?locale=${locale}`);
  },

  getSiteSettings(locale: Locale) {
    return request<ApiSiteSettings>(`/site-settings?locale=${locale}`);
  },
};

// Admin API
export const adminApi = {
  login(username: string, password: string) {
    return request<LoginResponse>("/admin/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
  },

  me() {
    return request<{ username: string }>("/admin/auth/me", {}, true);
  },

  getProducts() {
    return request<AdminProduct[]>("/admin/products", {}, true);
  },

  getProduct(id: number) {
    return request<AdminProduct>(`/admin/products/${id}`, {}, true);
  },

  createProduct(data: {
    thumbnailKey?: string;
    categoryKey?: string;
    sortOrder?: number;
    gridPosition?: ProductGridPosition;
    vi: ProductTranslationInput;
    en: ProductTranslationInput;
  }) {
    return request<AdminProduct>("/admin/products", {
      method: "POST",
      body: JSON.stringify({
        thumbnailKey: data.thumbnailKey,
        categoryKey: data.categoryKey,
        sortOrder: data.sortOrder,
        gridPosition: data.gridPosition,
        vi: data.vi,
        en: data.en,
      }),
    }, true);
  },

  updateProduct(
    id: number,
    data: Partial<{
      thumbnailKey: string;
      categoryKey: string;
      sortOrder: number;
      gridPosition: ProductGridPosition;
      vi: Partial<NonNullable<AdminProduct["translations"]["vi"]>>;
      en: Partial<NonNullable<AdminProduct["translations"]["en"]>>;
    }>,
  ) {
    return request<AdminProduct>(`/admin/products/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }, true);
  },

  deleteProduct(id: number) {
    return request<{ deleted: true }>(`/admin/products/${id}`, {
      method: "DELETE",
    }, true);
  },

  getProductCategories() {
    return request<AdminProductCategory[]>("/admin/product-categories", {}, true);
  },

  getProductCategory(id: number) {
    return request<AdminProductCategory>(
      `/admin/product-categories/${id}`,
      {},
      true,
    );
  },

  createProductCategory(data: {
    key?: string;
    sortOrder?: number;
    vi: { name: string };
    en: { name: string };
  }) {
    return request<AdminProductCategory>("/admin/product-categories", {
      method: "POST",
      body: JSON.stringify(data),
    }, true);
  },

  updateProductCategory(
    id: number,
    data: Partial<{
      sortOrder: number;
      vi: { name?: string };
      en: { name?: string };
    }>,
  ) {
    return request<AdminProductCategory>(`/admin/product-categories/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }, true);
  },

  deleteProductCategory(id: number) {
    return request<{ deleted: true }>(`/admin/product-categories/${id}`, {
      method: "DELETE",
    }, true);
  },

  getNews() {
    return request<AdminNewsArticle[]>("/admin/news", {}, true);
  },

  getNewsArticle(id: number) {
    return request<AdminNewsArticle>(`/admin/news/${id}`, {}, true);
  },

  createNews(data: {
    thumbnailKey?: string;
    sortOrder?: number;
    publishedAt?: string;
    vi: NonNullable<AdminNewsArticle["translations"]["vi"]>;
    en: NonNullable<AdminNewsArticle["translations"]["en"]>;
  }) {
    return request<AdminNewsArticle>("/admin/news", {
      method: "POST",
      body: JSON.stringify(data),
    }, true);
  },

  updateNews(
    id: number,
    data: Partial<{
      thumbnailKey: string;
      sortOrder: number;
      publishedAt: string | null;
      vi: Partial<NonNullable<AdminNewsArticle["translations"]["vi"]>>;
      en: Partial<NonNullable<AdminNewsArticle["translations"]["en"]>>;
    }>,
  ) {
    return request<AdminNewsArticle>(`/admin/news/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }, true);
  },

  deleteNews(id: number) {
    return request<{ deleted: true }>(`/admin/news/${id}`, {
      method: "DELETE",
    }, true);
  },

  getContactMessages() {
    return request<ContactMessage[]>("/admin/contact", {}, true);
  },

  deleteContactMessage(id: number) {
    return request<{ deleted: true }>(`/admin/contact/${id}`, {
      method: "DELETE",
    }, true);
  },

  uploadProductImage(file: File) {
    return uploadAdminImage("/admin/uploads/product-image", file);
  },

  uploadNewsImage(file: File) {
    return uploadAdminImage("/admin/uploads/news-image", file);
  },

  uploadBannerImage(file: File) {
    return uploadAdminImage("/admin/uploads/banner-image", file);
  },

  uploadFieldImage(file: File) {
    return uploadAdminImage("/admin/uploads/field-image", file);
  },

  getBanners() {
    return request<AdminBanner[]>("/admin/banners", {}, true);
  },

  getBanner(id: number) {
    return request<AdminBanner>(`/admin/banners/${id}`, {}, true);
  },

  createBanner(data: {
    imageKey?: string;
    sortOrder?: number;
    active?: boolean;
    vi: NonNullable<AdminBanner["translations"]["vi"]>;
    en: NonNullable<AdminBanner["translations"]["en"]>;
  }) {
    return request<AdminBanner>("/admin/banners", {
      method: "POST",
      body: JSON.stringify(data),
    }, true);
  },

  updateBanner(
    id: number,
    data: Partial<{
      imageKey: string;
      sortOrder: number;
      active: boolean;
      vi: Partial<NonNullable<AdminBanner["translations"]["vi"]>>;
      en: Partial<NonNullable<AdminBanner["translations"]["en"]>>;
    }>,
  ) {
    return request<AdminBanner>(`/admin/banners/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }, true);
  },

  deleteBanner(id: number) {
    return request<{ deleted: true }>(`/admin/banners/${id}`, {
      method: "DELETE",
    }, true);
  },

  getFields() {
    return request<AdminFieldItem[]>("/admin/fields", {}, true);
  },

  getField(id: number) {
    return request<AdminFieldItem>(`/admin/fields/${id}`, {}, true);
  },

  createField(data: {
    key?: string;
    imageKey?: string;
    href?: string;
    icon?: string;
    reverse?: boolean;
    sortOrder?: number;
    active?: boolean;
    vi: NonNullable<AdminFieldItem["translations"]["vi"]>;
    en: NonNullable<AdminFieldItem["translations"]["en"]>;
  }) {
    return request<AdminFieldItem>("/admin/fields", {
      method: "POST",
      body: JSON.stringify(data),
    }, true);
  },

  updateField(
    id: number,
    data: Partial<{
      key: string;
      imageKey: string;
      href: string;
      icon: string;
      reverse: boolean;
      sortOrder: number;
      active: boolean;
      vi: Partial<NonNullable<AdminFieldItem["translations"]["vi"]>>;
      en: Partial<NonNullable<AdminFieldItem["translations"]["en"]>>;
    }>,
  ) {
    return request<AdminFieldItem>(`/admin/fields/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }, true);
  },

  deleteField(id: number) {
    return request<{ deleted: true }>(`/admin/fields/${id}`, {
      method: "DELETE",
    }, true);
  },

  uploadSiteLogo(file: File) {
    return uploadAdminImage("/admin/uploads/site-logo", file);
  },

  getSiteSettings() {
    return request<AdminSiteSettings>("/admin/site-settings", {}, true);
  },

  updateSiteSettings(data: Partial<{
    email: string;
    website: string;
    facebookUrl: string;
    linkedinUrl: string;
    xUrl: string;
    floatingCallPhone: string;
    mapEmbedUrl: string;
    logoKey: string;
    sales: AdminSiteSettings["sales"];
    vi: Partial<AdminSiteSettings["translations"]["vi"]>;
    en: Partial<AdminSiteSettings["translations"]["en"]>;
  }>) {
    return request<AdminSiteSettings>("/admin/site-settings", {
      method: "PATCH",
      body: JSON.stringify(data),
    }, true);
  },
};

async function uploadAdminImage(
  path: string,
  file: File,
): Promise<UploadImageResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const headers = new Headers();
  const token = getAdminToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers,
    body: formData,
  });

  if (!response.ok) {
    let message = response.statusText;
    try {
      const body = (await response.json()) as { message?: string | string[] };
      if (Array.isArray(body.message)) message = body.message.join(", ");
      else if (body.message) message = body.message;
    } catch {
      // ignore
    }
    throw new ApiError(message, response.status);
  }

  return response.json() as Promise<UploadImageResponse>;
}

export { ApiError };
