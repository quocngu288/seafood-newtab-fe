type CarouselDotsProps = {
  count: number;
  active: number;
  onChange: (index: number) => void;
  labelPrefix?: string;
  className?: string;
};

export function CarouselDots({
  count,
  active,
  onChange,
  labelPrefix = "Slide",
  className = "",
}: CarouselDotsProps) {
  return (
    <div
      className={`flex items-center justify-center gap-2 ${className}`}
      role="tablist"
      aria-label="Carousel pagination"
    >
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === active}
          aria-label={`${labelPrefix} ${i + 1}`}
          onClick={() => onChange(i)}
          className={`h-3 w-3 shrink-0 rounded-sm border-0 p-0 transition ${
            i === active
              ? "bg-hh-red"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
        />
      ))}
    </div>
  );
}
