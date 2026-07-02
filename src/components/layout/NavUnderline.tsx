export function NavUnderline({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className={`mt-1.5 h-[3px] w-8 origin-left rounded-full bg-white transition-all duration-200 lg:origin-center ${
        active
          ? "scale-x-100 opacity-100"
          : "scale-x-0 opacity-0 group-hover/nav:scale-x-100 group-hover/nav:opacity-100"
      }`}
    />
  );
}
