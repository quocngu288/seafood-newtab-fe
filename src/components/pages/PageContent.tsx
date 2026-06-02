import type { ReactNode } from "react";

export function PageContent({ children }: { children: ReactNode }) {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="site-container site-container--narrow">
        <div className="prose prose-gray max-w-none text-gray-600">{children}</div>
      </div>
    </section>
  );
}
