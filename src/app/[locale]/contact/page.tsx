import { getTranslations, setRequestLocale } from "next-intl/server";
import { WaveTopPage } from "@/components/pages/WaveTopPage";

type Props = { params: Promise<{ locale: string }> };

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.contact");

  return (
    <WaveTopPage title={t("title")} subtitle={t("subtitle")}>
      <section>
        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          <div>
            <p className="text-lg leading-relaxed text-gray-600">{t("content")}</p>
            <address className="mt-6 space-y-3 not-italic text-gray-700">
              <p>
                <span className="font-semibold">📍 </span>
                {t("address")}
              </p>
              <p>
                <span className="font-semibold">📞 </span>
                {t("phone")}
              </p>
              <p>
                <span className="font-semibold">✉️ </span>
                {t("email")}
              </p>
            </address>
          </div>
          <form className="space-y-4 rounded-2xl border border-gray-100 bg-gray-50 p-6 shadow-sm">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-900 focus:border-hh-blue focus:outline-none"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-900 focus:border-hh-blue focus:outline-none"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-gray-900 focus:border-hh-blue focus:outline-none"
                placeholder="Your message"
              />
            </div>
            <button
              type="button"
              className="w-full rounded-full bg-hh-red py-3 text-sm font-semibold text-white transition hover:bg-hh-red-hover sm:w-auto sm:px-8"
            >
              Send
            </button>
          </form>
        </div>
      </section>
    </WaveTopPage>
  );
}
