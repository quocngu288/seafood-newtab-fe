import type { StaticImageData } from "next/image";
import heroSlide from "@/images/bg-slide.jpg";
import heroSlide1 from "@/images/bg-slide1.jpg";
import heroSlide2 from "@/images/bg-slide2.jpg";
import vungNuoi from "@/images/vungnuoi.jpg";
import certLeft from "@/images/certs/cert-left.jpg";
import certMiddle from "@/images/certs/cert-middle.jpg";
import certRight from "@/images/certs/cert-right.jpg";
import { resolveProductImageUrl } from "./product-media";

const THUMBNAIL_MAP: Record<string, StaticImageData> = {
  "bg-slide.jpg": heroSlide,
  "bg-slide1.jpg": heroSlide1,
  "bg-slide2.jpg": heroSlide2,
  "vungnuoi.jpg": vungNuoi,
  "certs/cert-left.jpg": certLeft,
  "certs/cert-middle.jpg": certMiddle,
  "certs/cert-right.jpg": certRight,
};

export const THUMBNAIL_OPTIONS = Object.keys(THUMBNAIL_MAP);

export function resolveThumbnail(key: string): StaticImageData {
  return THUMBNAIL_MAP[key] ?? heroSlide;
}

export function resolveNewsImageSrc(
  imageUrl?: string,
  thumbnailKey?: string,
): string | StaticImageData | undefined {
  const uploaded = resolveProductImageUrl(imageUrl, thumbnailKey);
  if (uploaded) return uploaded;
  if (thumbnailKey && !thumbnailKey.startsWith("uploads/")) {
    return resolveThumbnail(thumbnailKey);
  }
  return undefined;
}
