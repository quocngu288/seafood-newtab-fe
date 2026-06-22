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
        className="hh-text-sm h-8 w-full rounded-full border border-white/25 bg-white/10 py-0 pl-3 pr-9 text-white shadow-inner placeholder:text-transparent backdrop-blur-sm focus:border-white/45 focus:outline-none sm:h-9 sm:pl-4 sm:pr-10 lg:min-w-[170px]"
      />
      <Image
        src={images.iconSearch}
        alt=""
        width={16}
        height={16}
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 shrink-0 -translate-y-1/2 object-contain"
      />
    </div>
  );
}
