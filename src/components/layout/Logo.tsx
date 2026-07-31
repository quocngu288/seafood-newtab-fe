import Image from "next/image";
import { images } from "@/lib/images";
import { resolveProductImageUrl } from "@/lib/product-media";

type LogoProps = {
  className?: string;
  src?: string;
  alt?: string;
};

export function Logo({ className, src, alt }: LogoProps) {
  const uploaded = src ? resolveProductImageUrl(src) : "";
  const imageSrc = uploaded || images.logo;
  const imageAlt = alt || "Hai Huong Seafood - Our quality, your safety";

  if (typeof imageSrc === "string") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageSrc}
        alt={imageAlt}
        width={340}
        height={80}
        className={`h-auto w-[140px] max-w-full object-contain sm:w-[170px] lg:w-[190px] ${className ?? ""}`}
      />
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={imageAlt}
      width={340}
      height={80}
      className={`h-auto w-[140px] max-w-full object-contain sm:w-[170px] lg:w-[190px] ${className ?? ""}`}
      priority
    />
  );
}
