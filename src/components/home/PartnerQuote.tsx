import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { certificationLogos, images } from "@/lib/images";

function QuoteLine({ children }: { children: string }) {
  return (
    <div className="w-fit max-w-full bg-white px-2.5 py-1 sm:px-3 sm:py-1.5">
      <span className="block text-[22px] font-medium leading-snug text-gray-900 sm:text-[26px] md:text-[30px]">
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
      className="overflow-visible bg-white pb-16 pt-4 sm:pb-20 sm:pt-6"
    >
      <div className="site-container overflow-visible">
        <div className="relative">
          {/* Banner cố định 330px — chỉ ảnh + quote */}
          <div className="relative h-[330px] overflow-hidden rounded-[40px]">
            <div className="absolute inset-0">
              <Image
                src={images.vungNuoi}
                alt=""
                fill
                className="object-cover object-center sm:object-[60%_center]"
                sizes="(max-width: 640px) 100vw, 1152px"
              />
              <div className="absolute inset-0 bg-[#79bbed]/82" aria-hidden />
            </div>

            <div className="relative z-10 h-full px-6 pt-5 sm:px-10 sm:pt-6 lg:px-12">
              <Image
                src={images.quote}
                alt=""
                width={76}
                height={44}
                className="h-[40px] w-[60px] sm:h-[40px]"
                aria-hidden
              />

              <div className="mt-1.5 flex max-w-full flex-col gap-1 sm:mt-2 sm:gap-1.5 ml-10">
                {quoteLines.map((line) => (
                  <QuoteLine key={line}>{line}</QuoteLine>
                ))}
              </div>
            </div>
          </div>

          {/* Cert full width, căn giữa, đè nửa dưới mép banner */}
          <div className="absolute inset-x-0 bottom-0 z-20 translate-y-1/2 px-6 sm:px-10 lg:px-12 w-full lg:w-[500px]">
            <div className="rounded-[30px] bg-white px-4 py-4 shadow-[0_6px_24px_rgba(0,0,0,0.14)] sm:px-8 sm:py-5 md:px-10 md:py-6 ml-[30px]">
              <div className="grid grid-cols-3 items-center gap-3 sm:gap-6 md:gap-10 lg:gap-12">
                {certificationLogos.map((cert) => (
                  <div
                    key={cert.alt}
                    className="flex min-h-[2.5rem] items-center justify-center sm:min-h-[3rem]"
                  >
                    <Image
                      src={cert.src}
                      alt={cert.alt}
                      width={240}
                      height={96}
                      className="h-8 w-full max-w-[220px] object-contain sm:h-10 md:h-11 lg:h-12"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
