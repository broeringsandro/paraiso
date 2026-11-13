import type { MetadataRoute } from "next";
import { SITE_URL, ALLOW_INDEX } from "./lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!ALLOW_INDEX) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
