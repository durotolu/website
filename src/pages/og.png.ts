import type { APIRoute } from "astro";
import { siteConfig } from "../config";
import { pngResponse, renderOgPng } from "../lib/og-image";

export const GET: APIRoute = async () => {
  const png = await renderOgPng({
    title: siteConfig.name,
    description: siteConfig.tagline,
  });
  return pngResponse(png);
};
