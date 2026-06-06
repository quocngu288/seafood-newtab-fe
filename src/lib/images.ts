import logo from "@/images/logo.png";
import bg from "@/images/bg.png";
import heroSlide from "@/images/bg-slide.jpg";
import iconSearch from "@/images/icon-search.png";
import iconVietnam from "@/images/icon-vietnam.png";
import iconUnitedKingdom from "@/images/icon-united-kingdom.png";
import iconFish from "@/images/icon-fish.svg";
import certLeft from "@/images/certs/cert-left.jpg";
import certMiddle from "@/images/certs/cert-middle.jpg";
import certRight from "@/images/certs/cert-right.jpg";
import heroSlide1 from "@/images/bg-slide1.jpg";
import heroSlide2 from "@/images/bg-slide2.jpg";
import vungNuoi from "@/images/vungnuoi.jpg";
import featureSlide from "@/images/feature-slide.svg";
import quote from "@/images/quote.svg";
/** bg: nền sóng vùng trên (header + hero), không dùng full-page */
export const images = {
  logo,
  bg,
  heroSlide,
  heroSlide1,
  heroSlide2,
  iconSearch,
  iconVietnam,
  iconUnitedKingdom,
  iconFish,
  vungNuoi,
  featureSlide,
  quote,
} as const;

/** Placeholder logo chứng nhận — thay file trong src/images/certs/ khi có bản chính */
export const certificationLogos = [
  { src: certLeft, alt: "Left" },
  { src: certMiddle, alt: "Middle" },
  { src: certRight, alt: "Right" },
] as const;
