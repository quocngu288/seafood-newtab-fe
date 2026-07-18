"use client";

import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";

export const PAGE_CONTENT_ID = "page-content";

/**
 * Sau khi chuyển trang con, cuộn tới khối nội dung (bỏ qua hero slider).
 * Chỉ chạy khi trang có phần tử #page-content.
 */
export function ScrollToPageContent() {
  const pathname = usePathname();

  useEffect(() => {
    const el = document.getElementById(PAGE_CONTENT_ID);
    if (!el) return;

    const timer = window.setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}
