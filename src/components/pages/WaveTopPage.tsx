import type { ReactNode } from "react";
import { HomeTop } from "@/components/home/HomeTop";

type WaveTopPageProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

/**
 * Khung top dùng chung cho các trang con:
 * - Hero slider nằm trong vùng nền sóng
 * - Tiêu đề trang canh trái
 * - Card trắng overlap với cùng một độ đè
 */
export function WaveTopPage({ title, subtitle, children }: WaveTopPageProps) {
  return (
    <>
      <HomeTop />
      <section className="site-container relative z-20 pb-14 sm:pb-16 md:pb-20">
        <div className="px-1">
          <h1 className="hh-page-title text-hh-blue-dark">{title}</h1>
          <p className="hh-page-subtitle mt-2">{subtitle}</p>
        </div>

        <div className="relative mt-3 translate-y-4 sm:mt-4 sm:translate-y-5 md:translate-y-6">
          <article className="hh-card">{children}</article>
        </div>
      </section>
    </>
  );
}
