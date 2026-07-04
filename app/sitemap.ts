import type { MetadataRoute } from "next";
import { getAllWords } from "@/data/woerter";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://artikel-finder.example.de";
  const woerter = getAllWords();

  const wortSeiten: MetadataRoute.Sitemap = woerter.map((w) => ({
    url: `${baseUrl}/${w.artikel}/${w.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const kategorieSeiten: MetadataRoute.Sitemap = ["der", "die", "das"].map((artikel) => ({
    url: `${baseUrl}/${artikel}`,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/ueber`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...kategorieSeiten,
    ...wortSeiten,
  ];
}
