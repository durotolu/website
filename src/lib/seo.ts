import { absoluteUrl, siteConfig } from "../config";

export function websiteJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: siteConfig.locale,
  };
  if (siteConfig.url) data.url = siteConfig.url;
  return data;
}

export function personJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author.name,
    jobTitle: siteConfig.author.jobTitle,
    email: siteConfig.author.email,
    sameAs: [siteConfig.social.github, siteConfig.social.linkedin],
  };
  if (siteConfig.url) data.url = siteConfig.url;
  return data;
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  pubDate: Date;
  updatedDate?: Date;
}) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    datePublished: input.pubDate.toISOString(),
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
    mainEntityOfPage: absoluteUrl(input.path),
  };
  if (input.updatedDate) data.dateModified = input.updatedDate.toISOString();
  return data;
}
