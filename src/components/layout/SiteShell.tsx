import type { ReactNode } from "react";
import { getLocale } from "next-intl/server";
import { fetchSiteSettings } from "@/lib/api/server";
import type { ApiSiteSettings, Locale } from "@/lib/api/types";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingCallButton } from "./FloatingCallButton";
import { WaveHeroBackdrop } from "./WaveHeroBackdrop";
import { ScrollToPageContent } from "@/components/pages/ScrollToPageContent";
import { SiteSettingsProvider } from "./SiteSettingsProvider";

export async function SiteShell({ children }: { children: ReactNode }) {
  const locale = (await getLocale()) as Locale;
  let settings: ApiSiteSettings | null = null;
  try {
    settings = await fetchSiteSettings(locale);
  } catch {
    // API unavailable — components fall back to messages
  }

  return (
    <SiteSettingsProvider settings={settings}>
      <div className="relative flex min-h-screen flex-col bg-white text-gray-900">
        <WaveHeroBackdrop />
        <Header />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer settings={settings} />
        <FloatingCallButton />
        <ScrollToPageContent />
      </div>
    </SiteSettingsProvider>
  );
}
