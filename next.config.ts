import type { NextConfig } from "next";

// Derive the Strapi host so <Image> is allowed to load media from it.
const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
const { protocol, hostname, port } = new URL(strapiUrl);
const isLocalHost = hostname === "localhost" || hostname === "127.0.0.1";

const nextConfig: NextConfig = {
  images: {
    // Next 16 blocks the image optimizer from fetching private/localhost IPs
    // (SSRF protection). In local dev Strapi lives on localhost, so allow it.
    // In production the Strapi host is public and this flag is a no-op.
    dangerouslyAllowLocalIP: isLocalHost,
    remotePatterns: [
      // Strapi local uploads (fallback when Supabase Storage is off)
      {
        protocol: protocol.replace(":", "") as "http" | "https",
        hostname,
        port: port || undefined,
        pathname: "/uploads/**",
      },
      // Supabase Storage (where media lives in production)
      {
        protocol: "https",
        hostname: "dcnwsfiaixwnidzlzgcr.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
