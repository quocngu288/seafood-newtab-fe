import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { certificationLogos, images } from "@/lib/images";

function QuoteLine({ children }: { children: string }) {
  return (
    <div className="bg-white px-2.5 py-1 sm:px-3 sm:py-1.5">
      <span className="block text-[24px] font-medium leading-snug text-gray-900 sm:text-[30px]">
        {children}
      </span>
    </div>
  );
}

export async function PartnerQuote() {
  const t = await getTranslations("homeNews");
  const quoteLines = t.raw("quoteLines") as [string, string, string];

  return (
    <section
      id="partner-quote"
      className="overflow-visible bg-white pb-20 pt-4 sm:pb-28 sm:pt-6"
    >
      <div className="site-container overflow-visible">
        <div className="relative min-h-[300px] overflow-visible rounded-[40px] sm:min-h-[340px] lg:min-h-[380px]">
          <div className="absolute inset-0 overflow-hidden rounded-[40px]">
            <Image
              src={images.heroSlide}
              alt=""
              fill
              className="object-cover object-center sm:object-[60%_center]"
              sizes="(max-width: 640px) 100vw, 1152px"
            />
            <div className="absolute inset-0 bg-[#BDE3FF]/82" aria-hidden />
          </div>

          <div className="relative z-10 px-6 pt-7 sm:px-10 sm:pt-9 lg:px-12">
            {/* Một khối: quote + cert cùng mép trái/phải */}
            <div className="inline-block max-w-full align-top">
              <span
                className="block font-serif text-[56px] leading-none text-hh-red sm:text-[64px]"
                aria-hidden
              >
                &ldquo;
              </span>

              <div className="mt-2 inline-grid w-full max-w-full grid-cols-1 gap-1 sm:mt-3 sm:gap-1.5">
                {quoteLines.map((line) => (
                  <QuoteLine key={line}>{line}</QuoteLine>
                ))}
              </div>

              <div className="mt-8 w-full translate-y-1/2 sm:mt-10">
                <div className="rounded-[30px] bg-white px-5 py-6 shadow-[0_6px_24px_rgba(0,0,0,0.14)] sm:px-10 sm:py-8">
                  <div className="grid grid-cols-3 items-center gap-4 sm:gap-8 md:gap-12">
                    {certificationLogos.map((cert) => (
                      <div
                        key={cert.alt}
                        className="flex min-h-[2.75rem] items-center justify-center sm:min-h-[3.25rem]"
                      >
                        <Image
                          src={cert.src}
                          alt={cert.alt}
                          width={240}
                          height={96}
                          className="h-9 w-full max-w-[220px] object-contain sm:h-11 md:h-12"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chừa chỗ phần cert chồng ra dưới mép banner */}
          <div className="h-20 sm:h-24" aria-hidden />
        </div>
      </div>
    </section>
  );
}
