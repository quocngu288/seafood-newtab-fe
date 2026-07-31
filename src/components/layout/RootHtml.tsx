import type { ReactNode } from "react";

/** Load Source Sans 3 at runtime — avoids next/font/google build-time network fetch. */
export function FontLinks() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;500;600;700&display=swap&subset=latin,vietnamese"
        rel="stylesheet"
      />
    </>
  );
}

export function RootHtml({
  lang,
  children,
}: {
  lang: string;
  children: ReactNode;
}) {
  return (
    <html lang={lang} className="h-full antialiased">
      <head>
        <FontLinks />
      </head>
      {children}
    </html>
  );
}
