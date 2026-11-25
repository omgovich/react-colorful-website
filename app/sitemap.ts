import type { MetadataRoute } from "next";

const base = "https://react-colorful.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${base}/` },
    { url: `${base}/llms.txt` },
    { url: `${base}/index.md` },
    { url: `${base}/docs/api.md` },
  ];
}
