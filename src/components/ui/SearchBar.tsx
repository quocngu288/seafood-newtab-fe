import Image from "next/image";
import { images } from "@/lib/images";

type SearchBarProps = {
  placeholder: string;
  className?: string;
  ariaLabel?: string;
};

export function SearchBar({
  placeholder,
  className = "",
  ariaLabel,
}: SearchBarProps) {
  return (
    <div className={`relative ${className}`}>
      <input
        type="search"
        placeholder={placeholder}
        aria-label={ariaLabel ?? placeholder}
        className="h-9 w-full min-w-[140px] rounded-full border border-white/25 bg-white/10 py-0 pl-4 pr-10 text-sm text-white shadow-inner placeholder:text-transparent backdrop-blur-sm focus:border-white/45 focus:outline-none sm:min-w-[160px] md:min-w-[180px] lg:min-w-[190px]"
      />
      <Image
        src={images.iconSearch}
        alt=""
        width={16}
        height={16}
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2"
      />
    </div>
  );
}
