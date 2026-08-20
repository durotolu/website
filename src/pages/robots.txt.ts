import type { APIRoute } from "astro";
import { absoluteUrl, siteConfig } from "../config";

export const GET: APIRoute = () => {
  const sitemap = siteConfig.url
    ? `Sitemap: ${absoluteUrl("/sitemap-index.xml")}`
    : "Sitemap: /sitemap-index.xml";
  const body = `User-agent: *\nAllow: /\n\n${sitemap}\n`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
