import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function ProductsSection() {
  const t = await getTranslations("sections.products");
  const items = t.raw("items") as Array<{ name: string; desc: string }>;

  return (
    <section className="mt-10 text-center">
      <div>
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-hh-blue">
            {t("label")}
          </span>
          <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            {t("title")}
          </h2>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <article
              key={i}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-hh-blue/10 text-hh-blue">
                <span className="text-lg font-bold">{i + 1}</span>
              </div>
              <h3 className="font-bold text-gray-900">{item.name}</h3>
              <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/products"
            className="inline-block rounded-full border-2 border-hh-blue px-6 py-2.5 text-sm font-semibold text-hh-blue transition hover:bg-hh-blue hover:text-white"
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
