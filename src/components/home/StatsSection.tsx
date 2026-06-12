import { getTranslations } from "next-intl/server";

export async function StatsSection() {
  const t = await getTranslations("sections.stats");
  const items = t.raw("items") as Array<{ value: string; label: string }>;

  return (
    <section className="mt-10 rounded-[24px] bg-hh-blue p-6 sm:p-8">
      <div>
        <h2 className="mb-6 text-center text-lg font-bold text-white sm:mb-8 sm:text-xl md:text-2xl">
          {t("title")}
        </h2>
        <div className="grid grid-cols-2 gap-6 md:gap-8 lg:grid-cols-4">
          {items.map((item, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl">
                {item.value}
              </p>
              <p className="mt-2 text-sm text-white/80 sm:text-base">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
