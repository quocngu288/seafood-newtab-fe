import { getTranslations, setRequestLocale } from "next-intl/server";
import { HomeTop } from "@/components/home/HomeTop";
import { ContactSection } from "@/components/contact/ContactSection";

type Props = { params: Promise<{ locale: string }> };

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.contact");

  return (
    <>
      <HomeTop />
      <section className="site-container relative z-20 pb-14 sm:pb-16 md:pb-20">
        <div className="mx-auto max-w-3xl px-2 pt-2 text-center sm:px-4 sm:pt-4">
          <h1 className="text-[28px] font-bold leading-tight text-white sm:text-[32px] md:text-[40px]">
            {t("title")}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/95 sm:text-base md:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div className="relative mt-4 translate-y-4 sm:mt-6 sm:translate-y-5 md:translate-y-6">
          <ContactSection />
        </div>
      </section>
    </>
  );
}
