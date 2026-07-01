"use client";

import { useTranslations } from "next-intl";

function PhoneIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6.5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5L15 12.5 19 14v3a2 2 0 0 1-2 2A15 15 0 0 1 4 6.5 2 2 0 0 1 6.5 4Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FloatingCallButton() {
  const t = useTranslations("floatingCall");
  const phone = t("phone").replace(/[\s.]/g, "");

  return (
    <a
      href={`tel:${phone}`}
      className="hh-floating-call group"
      aria-label={t("label")}
      title={t("label")}
    >
      <span className="hh-floating-call__ring" aria-hidden />
      <span className="hh-floating-call__ring hh-floating-call__ring--delay" aria-hidden />
      <span className="hh-floating-call__btn">
        <PhoneIcon className="h-6 w-6 transition group-hover:scale-110" />
      </span>
    </a>
  );
}
