import { images } from "@/lib/images";

/**
 * Nền sóng (bg.png) chỉ bọc Header + HeroCarousel.
 * Chỉnh chiều cao: globals.css → --hh-wave-band-height
 */
export function WaveHeroBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-0 bg-cover bg-bottom bg-no-repeat"
      style={{
        height: "var(--hh-wave-band-height)",
        backgroundImage: `url(${images.bg.src})`,
      }}
      aria-hidden
    />
  );
}
