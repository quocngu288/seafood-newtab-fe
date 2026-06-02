import { setRequestLocale } from "next-intl/server";
import { HomeTop } from "@/components/home/HomeTop";
import { FeatureCards } from "@/components/home/FeatureCards";
import { HomeNewsBlock } from "@/components/home/HomeNewsBlock";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HomeTop />

      <div className="relative z-10 pt-2 sm:pt-4">
        <FeatureCards />
        <HomeNewsBlock />
      </div>
    </>
  );
}
