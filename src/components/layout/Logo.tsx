import Image from "next/image";
import { images } from "@/lib/images";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Image
      src={images.logo}
      alt="Hai Huong Seafood - Our quality, your safety"
      width={340}
      height={80}
      className={`h-auto w-[140px] max-w-full object-contain sm:w-[170px] lg:w-[190px] ${className ?? ""}`}
      priority
    />
  );
}
