"use client";

type Locale = "vi" | "en";

type AdminLocaleTabsProps = {
  active: Locale;
  onChange: (locale: Locale) => void;
};

const TABS: { id: Locale; label: string; flag: string }[] = [
  { id: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { id: "en", label: "English", flag: "🇬🇧" },
];

export function AdminLocaleTabs({ active, onChange }: AdminLocaleTabsProps) {
  return (
    <div className="admin-locale-tabs" role="tablist" aria-label="Ngôn ngữ">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={active === tab.id}
          onClick={() => onChange(tab.id)}
          className={active === tab.id ? "is-active" : ""}
        >
          <span aria-hidden>{tab.flag}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
