import { getTranslations } from "next-intl/server";

export async function StatsSection() {
  const t = await getTranslations("sections.stats");
  const items = t.raw("items") as Array<{ value: string; label: string }>;

  return (
    <section className="mt-10 rounded-[24px] bg-hh-blue p-6 sm:p-8">
      <div>
        <h2 className="mb-8 text-center text-xl font-bold text-white sm:text-2xl">
          {t("title")}
        </h2>
        <div className="grid grid-cols-2 gap-6 md:gap-8 lg:grid-cols-4">
          {items.map((item, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl font-bold text-white sm:text-4xl md:text-[2.5rem] lg:text-5xl">
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
