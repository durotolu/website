/**
 * Site-wide identity and integrations.
 * Customize this file first: name, domain, bio, email, social, OG image, newsletter, analytics.
 */
export const siteConfig = {
  name: "Modurotolu Olokode",
  title: "Modurotolu Olokode — Full-stack engineer",
  description:
    "I build software, explore ideas, and write about what I learn — a home for writing, projects, and experiments.",
  tagline: "I build software, explore ideas, and write about what I learn.",
  /** Production origin (no trailing slash). Used for canonicals, sitemap, RSS, OG. */
  url: "https://www.modurotolu.com",
  locale: "en",
  author: {
    name: "Modurotolu Olokode",
    email: "hello@modurotolu.com",
    jobTitle: "Full-stack engineer",
  },
  social: {
    github: "https://github.com/durotolu",
    linkedin: "https://www.linkedin.com/in/modurotoluolokode/",
  },
  /** External newsletter signup URL. Leave empty to hide the form. */
  newsletter: {
    url: "",
    label: "Subscribe",
  },
  /** Plausible domain, e.g. "yourdomain.com". Leave empty to disable. */
  analytics: {
    plausibleDomain: "",
  },
  /** Optional one-line availability note shown on About if non-empty. */
  availability: "",
  defaultOgImage: "/og.png",
  cvPath: "/cv.pdf",
} as const;

export type SiteConfig = typeof siteConfig;

export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (!siteConfig.url) return normalized;
  return new URL(normalized, siteConfig.url).toString();
}
