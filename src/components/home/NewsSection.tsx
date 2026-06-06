import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function NewsSection() {
  const t = await getTranslations("sections.news");
  const items = t.raw("items") as Array<{
    title: string;
    date: string;
    excerpt: string;
  }>;

  return (
    <section className="mt-10">
      <div>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-hh-blue">
              {t("label")}
            </span>
            <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
              {t("title")}
            </h2>
          </div>
          <Link
            href="/news"
            className="text-sm font-semibold text-hh-red hover:underline"
          >
            {t("cta")} →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {items.map((item, i) => (
            <article
              key={i}
              className="rounded-2xl border border-gray-100 p-5 shadow-sm transition hover:shadow-md"
            >
              <time className="text-xs font-medium text-hh-blue">{item.date}</time>
              <h3 className="mt-2 font-bold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {item.excerpt}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
