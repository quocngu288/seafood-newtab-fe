import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { getApiOrigin } from "./src/lib/api/config";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const apiOrigin = getApiOrigin();

const isLocalApi =
  apiOrigin.includes("localhost") || apiOrigin.includes("127.0.0.1");

function localUploadPattern(port: string) {
  return [
    {
      protocol: "http" as const,
      hostname: "localhost",
      port,
      pathname: "/uploads/**",
    },
    {
      protocol: "http" as const,
      hostname: "127.0.0.1",
      port,
      pathname: "/uploads/**",
    },
  ];
}

function apiImageRemotePatterns() {
  const patterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [
    {
      protocol: "https",
      hostname: "images.unsplash.com",
    },
    ...localUploadPattern("3002"),
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
    // Next.js 16 blocks localhost/127.0.0.1 by default (SSRF protection)
    dangerouslyAllowLocalIP: isLocalApi,
  },
  env: {
    NEXT_PUBLIC_API_ORIGIN: apiOrigin,
  },
};

export default withNextIntl(nextConfig);
