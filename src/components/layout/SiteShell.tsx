import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingCallButton } from "./FloatingCallButton";
import { WaveHeroBackdrop } from "./WaveHeroBackdrop";
import { ScrollToPageContent } from "@/components/pages/ScrollToPageContent";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-white text-gray-900">
      <WaveHeroBackdrop />
      <Header />
      <main className="relative z-10 flex-1">{children}</main>
      <Footer />
      <FloatingCallButton />
      <ScrollToPageContent />
    </div>
  );
}
