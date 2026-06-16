import type { StaticImageData } from "next/image";
import heroSlide from "@/images/bg-slide.jpg";
import heroSlide1 from "@/images/bg-slide1.jpg";
import heroSlide2 from "@/images/bg-slide2.jpg";
import vungNuoi from "@/images/vungnuoi.jpg";
import certLeft from "@/images/certs/cert-left.jpg";
import certMiddle from "@/images/certs/cert-middle.jpg";
import certRight from "@/images/certs/cert-right.jpg";

export type ProductThumbnailEntry = {
  id: number;
  thumbnail: StaticImageData;
};

export const PRODUCT_THUMBNAILS: ProductThumbnailEntry[] = [
  { id: 1, thumbnail: heroSlide },
  { id: 2, thumbnail: heroSlide1 },
  { id: 3, thumbnail: heroSlide2 },
  { id: 4, thumbnail: vungNuoi },
  { id: 5, thumbnail: certLeft },
  { id: 6, thumbnail: certMiddle },
  { id: 7, thumbnail: certRight },
  { id: 8, thumbnail: heroSlide1 },
  { id: 9, thumbnail: heroSlide2 },
  { id: 10, thumbnail: vungNuoi },
  { id: 11, thumbnail: certMiddle },
  { id: 12, thumbnail: certRight },
];

export const PRODUCT_THUMBNAILS_BY_ID = Object.fromEntries(
  PRODUCT_THUMBNAILS.map((entry) => [entry.id, entry]),
) as Record<number, ProductThumbnailEntry>;

/** Welltrimmed Pangasius Fillets */
export const DEFAULT_PRODUCT_ID = 8;
