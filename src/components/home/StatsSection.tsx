import { getTranslations } from "next-intl/server";

export async function StatsSection() {
  const t = await getTranslations("sections.stats");
  const items = t.raw("items") as Array<{ value: string; label: string }>;

  return (
    <section className="mt-10 rounded-[24px] bg-hh-blue p-6 sm:p-8">
      <div>
        <h2 className="hh-text-2xl mb-6 text-center font-bold text-white sm:mb-8">
          {t("title")}
        </h2>
        <div className="grid grid-cols-2 gap-6 md:gap-8 lg:grid-cols-4">
          {items.map((item, i) => (
            <div key={i} className="text-center">
              <p className="hh-text-stat text-white">
                {item.value}
              </p>
              <p className="hh-text-base mt-2 text-white/80">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
