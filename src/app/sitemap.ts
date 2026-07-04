import type { MetadataRoute } from "next";

const baseUrl = "https://jaredsong.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/en",
    "/caca",
    "/also/coding",
    "/also/motion",
    "/also/earlier-work",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/en" ? "monthly" : "yearly",
    priority: path === "/en" ? 1 : 0.7,
  }));
}
