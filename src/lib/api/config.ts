export const DEFAULT_API_ORIGIN = "http://localhost:3002";
export const DEFAULT_API_URL = `${DEFAULT_API_ORIGIN}/api`;

export function getApiOrigin(): string {
  return process.env.NEXT_PUBLIC_API_ORIGIN ?? DEFAULT_API_ORIGIN;
}

export function getApiUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL;
}
