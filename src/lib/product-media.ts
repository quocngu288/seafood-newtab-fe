import { getApiOrigin } from "./api/config";

export const API_ORIGIN = getApiOrigin();

export function formatVndPrice(
  amount: number,
  locale: "vi" | "en" = "vi",
): string {
  if (!amount || amount <= 0) return "—";

  if (locale === "en") {
    return `${amount.toLocaleString("en-US")} VND`;
  }

  return `${amount.toLocaleString("vi-VN")} ₫`;
}

export function parseVndInput(value: string): number {
  const digits = value.replace(/[^\d]/g, "");
  if (!digits) return 0;
  return parseInt(digits, 10);
}

/**
 * Luôn trỏ upload về backend (NEXT_PUBLIC_API_ORIGIN), không dùng domain frontend
 * và không tin URL localhost do API trả về khi thiếu API_PUBLIC_URL.
 */
export function resolveProductImageUrl(
  thumbnailUrl?: string,
  thumbnailKey?: string,
): string {
  const origin = getApiOrigin();

  if (thumbnailKey?.startsWith("uploads/")) {
    return `${origin}/${thumbnailKey}`;
  }

  const trimmed = thumbnailUrl?.trim();
  if (!trimmed) return "";

  if (trimmed.startsWith("/uploads/")) {
    return `${origin}${trimmed}`;
  }

  try {
    const url = new URL(trimmed);
    if (url.pathname.startsWith("/uploads/")) {
      return `${origin}${url.pathname}`;
    }
  } catch {
    return trimmed;
  }

  return trimmed;
}
