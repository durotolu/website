import type { CollectionEntry } from "astro:content";

const WORDS_PER_MINUTE = 220;

export function readingTime(text: string): { minutes: number; label: string } {
  const words = text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[^\w\s'-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  return { minutes, label: `${minutes} min read` };
}

export function isPublished<T extends { data: { draft?: boolean } }>(
  entry: T,
): boolean {
  return !entry.data.draft;
}

export function byDateDesc<T extends { data: { pubDate: Date } }>(a: T, b: T) {
  return b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
}

export function writingHref(entry: CollectionEntry<"writing">): string {
  if (entry.data.externalUrl) return entry.data.externalUrl;
  return `/writing/${entry.id}`;
}

export function isExternalWriting(entry: CollectionEntry<"writing">): boolean {
  return Boolean(entry.data.externalUrl);
}

export function relatedByTags<
  T extends { id: string; data: { tags: string[] } },
>(current: T, pool: T[], limit = 3): T[] {
  const tags = new Set(current.data.tags);
  if (tags.size === 0) return [];
  return pool
    .filter((item) => item.id !== current.id)
    .map((item) => ({
      item,
      score: item.data.tags.filter((tag) => tags.has(tag)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ item }) => item);
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function statusLabel(status: string): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}
