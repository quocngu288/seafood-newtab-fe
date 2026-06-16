import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const apiOrigin = process.env.NEXT_PUBLIC_API_ORIGIN ?? "http://localhost:3001";

function apiImageRemotePatterns() {
  const patterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [
    {
      protocol: "https",
      hostname: "images.unsplash.com",
    },
    {
      protocol: "http",
      hostname: "localhost",
      port: "3001",
      pathname: "/uploads/**",
    },
    {
      protocol: "http",
      hostname: "127.0.0.1",
      port: "3001",
      pathname: "/uploads/**",
    },
  ];

  if (apiOrigin.startsWith("http://") || apiOrigin.startsWith("https://")) {
    try {
      const { hostname, protocol } = new URL(apiOrigin);
      if (hostname !== "localhost" && hostname !== "127.0.0.1") {
        patterns.push({
          protocol: protocol.replace(":", "") as "http" | "https",
          hostname,
          pathname: "/uploads/**",
        });
      }
    } catch {
      // ignore invalid API origin
    }
  }

  return patterns;
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: apiImageRemotePatterns(),
  },
  env: {
    NEXT_PUBLIC_API_ORIGIN: apiOrigin,
  },
};

export default withNextIntl(nextConfig);
