import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

/** @type {import('next').NextConfig} */
const imagekitEndpoint =
  process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ||
  process.env.VITE_IMAGEKIT_URL_ENDPOINT ||
  "";

let imagekitHostname = "";

try {
  imagekitHostname = new URL(imagekitEndpoint).hostname || "";
} catch {
  // Skip dynamic ImageKit remote pattern when endpoint is missing/invalid.
}

const nextConfig = {
  /* config options here */
  reactCompiler: true,
  serverExternalPackages: ["resend"],
  env: {
    NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT: imagekitEndpoint,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      ...(imagekitHostname
        ? [
            {
              protocol: "https",
              hostname: imagekitHostname,
            },
          ]
        : []),
    ],
  },
};

export default withBundleAnalyzer(nextConfig);
