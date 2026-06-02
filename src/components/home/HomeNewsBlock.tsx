import { NewsSlider } from "./NewsSlider";
import { NewsFeatured } from "./NewsFeatured";
import { PartnerQuote } from "./PartnerQuote";

export function HomeNewsBlock() {
  return (
    <>
      <NewsSlider />
      <NewsFeatured />
      <PartnerQuote />
    </>
  );
}
