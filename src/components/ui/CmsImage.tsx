import Image, { type ImageProps, type StaticImageData } from "next/image";

type CmsImageProps = Omit<ImageProps, "src"> & {
  src: string | StaticImageData;
};

/** Ảnh upload từ API — load trực tiếp từ backend, không qua Vercel /_next/image */
export function CmsImage({ src, ...props }: CmsImageProps) {
  if (typeof src === "string") {
    return <Image src={src} unoptimized {...props} />;
  }

  return <Image src={src} {...props} />;
}
