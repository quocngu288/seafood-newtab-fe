export const DEFAULT_API_ORIGIN = "http://localhost:3002";
export const DEFAULT_API_URL = `${DEFAULT_API_ORIGIN}/api`;

function normalizeOrigin(value: string): string {
  const trimmed = value.trim().replace(/\/$/, "");
  if (!trimmed) return DEFAULT_API_ORIGIN;

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  // Env thiếu https:// → browser coi là relative path trên domain frontend
  return `https://${trimmed}`;
}

function normalizeApiUrl(value: string): string {
  const trimmed = value.trim().replace(/\/$/, "");
  if (!trimmed) return DEFAULT_API_URL;

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed.endsWith("/api") ? trimmed : `${trimmed}/api`;
  }

  return `https://${trimmed.replace(/\/$/, "")}/api`;
}

export function getApiOrigin(): string {
  return normalizeOrigin(
    process.env.NEXT_PUBLIC_API_ORIGIN ?? DEFAULT_API_ORIGIN,
  );
}

export function getApiUrl(): string {
  return normalizeApiUrl(process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL);
}
