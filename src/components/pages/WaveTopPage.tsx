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
          <h1 className="text-[26px] font-bold leading-tight text-hh-blue-dark sm:text-[30px] md:text-[34px]">
            {title}
          </h1>
          <p className="mt-2 text-base text-gray-600 md:text-lg">{subtitle}</p>
        </div>

        <div className="relative mt-3 translate-y-4 sm:mt-4 sm:translate-y-5 md:translate-y-6">
          <article className="rounded-[28px] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.18)] sm:p-6 md:p-8">
            {children}
          </article>
        </div>
      </section>
    </>
  );
}
