"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { ApiSiteSettings } from "@/lib/api/types";

const SiteSettingsContext = createContext<ApiSiteSettings | null>(null);

export function SiteSettingsProvider({
  settings,
  children,
}: {
  settings: ApiSiteSettings | null;
  children: ReactNode;
}) {
  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
