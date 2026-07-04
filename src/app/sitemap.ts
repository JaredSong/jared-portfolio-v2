import type { MetadataRoute } from "next";

const baseUrl = "https://jaredsong.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/en",
    "/caca",
    "/also/payment-review",
    "/also/wheelcake",
    "/also/earlier-work",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/en" ? "monthly" : "yearly",
    priority: path === "/en" ? 1 : 0.7,
  }));
}
