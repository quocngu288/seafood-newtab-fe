import type { Metadata } from "next";
import { RootHtml } from "@/components/layout/RootHtml";
import "../globals.css";

export const metadata: Metadata = {
  title: "Hai Huong CMS",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootHtml lang="vi">
      <body className="min-h-full bg-gray-50 font-sans text-gray-900">
        {children}
      </body>
    </RootHtml>
  );
}
