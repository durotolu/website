# Modurotolu Olokode — personal site

A content-first static site for writing, notes, projects, experiments, and a short professional bio. Built with Astro, TypeScript, MDX, and Tailwind CSS. There is no CMS and no database: Git is the source of truth.

## Stack

- Astro (static output)
- TypeScript
- MDX and Markdown content collections
- Tailwind CSS
- `@astrojs/rss` and `@astrojs/sitemap`

## Setup

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run build      # production build
npm run preview    # preview the build
npm run check      # Astro + TypeScript
npm run lint
npm run format
```

## Customize identity

Edit [`src/config.ts`](src/config.ts). That is the only place you should need for:

- Name, title, tagline, description
- Production `url` (`https://modurotolu.com`; used for canonicals, sitemap, RSS, Open Graph)
- Email, GitHub, LinkedIn
- CV path
- Default social image
- Newsletter signup URL (leave empty to hide the form)
- Plausible domain (leave empty to send no analytics)
- Optional availability line on About

Replace [`public/cv.pdf`](public/cv.pdf) and [`public/og.svg`](public/og.svg) when you have final assets.

## Content

Collections live under `src/content/`:

| Folder      | URL                | What it is                                                                                     |
| ----------- | ------------------ | ---------------------------------------------------------------------------------------------- |
| `writing/`  | `/writing/[slug]`  | Essays. If `externalUrl` is set, the piece is listed but has **no** local page (it links out). |
| `notes/`    | `/notes/[slug]`    | Short notes                                                                                    |
| `projects/` | `/projects/[slug]` | Selected work                                                                                  |
| `lab/`      | `/lab/[slug]`      | Experiments                                                                                    |

Create a file, fill in frontmatter, write Markdown or MDX, commit, and push. Required fields are validated at build time.

### Writing

```yaml
---
title: "Article title"
description: "Concise description"
pubDate: 2026-08-19
updatedDate: 2026-08-19
tags:
  - software
draft: false
featured: false
heroImage: null
# externalUrl: "https://…"   # optional; outbound only
# venue: "Gigson"
---
```

Drafts (`draft: true`) are excluded from the site, RSS, and the sitemap.

Native essays can use MDX components `Callout` and `Figure`.

### Notes

```yaml
---
title: "A small observation"
description: "…"
pubDate: 2026-08-19
tags:
  - learning
draft: false
---
```

### Projects

```yaml
---
title: "Project"
description: "…"
pubDate: 2026-08-19
status: complete # active | maintained | archived | complete
tags:
  - typescript
featured: false
draft: false
# githubUrl, liveUrl, problem, approach, architecture,
# implementation, results, lessons, next
---
```

Empty optional sections are not rendered.

### Lab

```yaml
---
title: "Experiment"
description: "…"
pubDate: 2026-08-19
status: exploring # exploring | paused | concluded
tags:
  - css
draft: false
# demoUrl, repoUrl
---
```

### Now

Edit [`src/pages/now.astro`](src/pages/now.astro). It is meant to be updated by hand.

## Deploy

This is a static site (`dist/`) on [Vercel](https://vercel.com/). Production origin is `https://www.modurotolu.com` (apex redirects there in the Vercel dashboard).

1. Import the GitHub repo. Build command: `npm run build`. Output directory: `dist`.
2. In the Vercel project: **Settings → Domains** → add `modurotolu.com`. Keep Vercel’s default: `www` as primary, apex redirects to `www`. Do not also add a host redirect in `vercel.json` — that loops CSS requests and the page loads unstyled.
3. Point Namecheap DNS at Vercel (below). Copy the exact values from the Vercel domain card if they differ.

### Namecheap DNS (Vercel)

Keep nameservers on **Namecheap BasicDNS**.

In **Domain List → modurotolu.com → Advanced DNS**, remove parking/URL-redirect records, then add:

| Type  | Host | Value                  |
| ----- | ---- | ---------------------- |
| A     | `@`  | Vercel domain card IP (`216.198.79.1` or similar) |
| CNAME | `www`| Vercel CNAME target (`*.vercel-dns-017.com`) |

Use the A record on `@`, not a CNAME. A CNAME on the apex would break email MX records.

TTL can stay automatic. DNS and SSL usually finish within minutes; it can take a few hours.

### Email (`hello@modurotolu.com`)

The site uses `hello@modurotolu.com`. Namecheap **Redirect Email** forwards it to Gmail (or any inbox) for free:

1. Namecheap → **Domain List → Manage → Redirect Email**
2. Alias: `hello` → your Gmail address
3. Save. Namecheap sets the MX records; do not delete them.

Mail to `hello@modurotolu.com` then lands in Gmail. Replies still come from Gmail unless you later add a real mailbox or “send as” in Gmail.

## Analytics

In `src/config.ts`, set `analytics.plausibleDomain` to `modurotolu.com` after you add that domain in Plausible. If it is empty, no analytics script is loaded.

## Newsletter

Set `newsletter.url` to your provider’s form action (Buttondown, ConvertKit, Beehiiv, etc.). If it is empty, the signup UI is not shown. This site never stores email addresses.

## RSS, sitemap, robots

- Writing RSS (native essays only): `/rss.xml`
- Sitemap: `/sitemap-index.xml`
- Robots: `/robots.txt`
