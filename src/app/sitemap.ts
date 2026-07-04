import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const baseUrl = "https://jaredsong.com";

// Every page exists in both locale trees (/en/..., /zh/...); each sitemap
// entry lists the EN URL with its zh-Hant alternate so both are crawlable.
const pages = [
  "",
  "/caca",
  "/also/payment-review",
  "/also/wheelcake",
  "/also/earlier-work",
  "/resume",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((path) => ({
    url: `${baseUrl}/en${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "monthly" : "yearly",
    priority: path === "" ? 1 : 0.7,
    alternates: {
      languages: {
        en: `${baseUrl}/en${path}`,
        "zh-Hant": `${baseUrl}/zh${path}`,
      },
    },
  }));
}
