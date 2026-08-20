import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { siteConfig } from "../config";
import { byDateDesc, isExternalWriting, isPublished } from "../lib/content";

export async function GET(context: APIContext) {
  const posts = (await getCollection("writing", isPublished))
    .filter((entry) => !isExternalWriting(entry))
    .sort(byDateDesc);

  const site = context.site?.toString() || "http://localhost:4321";

  return rss({
    title: `${siteConfig.name} — Writing`,
    description: siteConfig.description,
    site,
    trailingSlash: false,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/writing/${post.id}`,
    })),
  });
}
