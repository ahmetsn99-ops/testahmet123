import { MetadataRoute } from "next";
import { getAllWordSlugs } from "@/lib/words";

const BASE_URL = "https://www.artikelfinder.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const wordUrls = getAllWordSlugs().map((slug) => ({
    url: `${BASE_URL}/artikel/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const staticUrls = [
    { url: BASE_URL, priority: 1.0 },
    { url: `${BASE_URL}/kategorie/der`, priority: 0.9 },
    { url: `${BASE_URL}/kategorie/die`, priority: 0.9 },
    { url: `${BASE_URL}/kategorie/das`, priority: 0.9 },
    { url: `${BASE_URL}/ratgeber/der-die-das-regeln`, priority: 0.7 },
    { url: `${BASE_URL}/ueber-uns`, priority: 0.3 },
    { url: `${BASE_URL}/kontakt`, priority: 0.3 },
    { url: `${BASE_URL}/datenschutz`, priority: 0.2 },
    { url: `${BASE_URL}/impressum`, priority: 0.2 },
  ].map((u) => ({ ...u, changeFrequency: "monthly" as const }));

  return [...staticUrls, ...wordUrls];
}
