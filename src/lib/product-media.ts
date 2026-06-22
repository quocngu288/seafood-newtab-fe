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

/** Resolve product image URL from API response or legacy static key */
export function resolveProductImageUrl(
  thumbnailUrl?: string,
  thumbnailKey?: string,
): string {
  if (thumbnailUrl) return thumbnailUrl;
  if (thumbnailKey?.startsWith("uploads/")) {
    return `${API_ORIGIN}/${thumbnailKey}`;
  }
  return "";
}
