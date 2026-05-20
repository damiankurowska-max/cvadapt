import { articles } from "./blog/data";
import metiers from "../data/metiers.json";

export default function sitemap() {
  const metierUrls = metiers.map((m) => ({
    url: `https://cvadapt.eu/cv-${m.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogUrls = articles.map((article) => ({
    url: `https://cvadapt.eu/blog/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: "https://cvadapt.eu",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://cvadapt.eu/analyse",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: "https://cvadapt.eu/generate",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://cvadapt.eu/tarifs",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: "https://cvadapt.eu/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://cvadapt.eu/cv-alternance",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://cvadapt.eu/cv-sans-experience",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://cvadapt.eu/cv-etudiant",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://cvadapt.eu/lettre-de-motivation",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://cvadapt.eu/cv-developpeur",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: "https://cvadapt.eu/cv-marketing",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: "https://cvadapt.eu/cv-comptable",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: "https://cvadapt.eu/cv-rh",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    ...metierUrls,
    ...blogUrls,
    {
      url: "https://cvadapt.eu/mentions-legales",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: "https://cvadapt.eu/cgu",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
