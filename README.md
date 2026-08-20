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
- Production `url` (set this before deploy; used for canonicals, sitemap, RSS, Open Graph)
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

This is a static site (`dist/`).

1. Set `url` in `src/config.ts` to your production origin (no trailing slash).
2. Connect the GitHub repo to [Cloudflare Pages](https://developers.cloudflare.com/pages/) or [Vercel](https://vercel.com/).
3. Build command: `npm run build`
4. Output directory: `dist`

Optional headers live in [`public/_headers`](public/_headers) (Cloudflare) and [`vercel.json`](vercel.json).

## Analytics

In `src/config.ts`, set `analytics.plausibleDomain` to the domain you registered with Plausible (for example `yourdomain.com`). If it is empty, no analytics script is loaded.

## Newsletter

Set `newsletter.url` to your provider’s form action (Buttondown, ConvertKit, Beehiiv, etc.). If it is empty, the signup UI is not shown. This site never stores email addresses.

## RSS, sitemap, robots

- Writing RSS (native essays only): `/rss.xml`
- Sitemap: `/sitemap-index.xml`
- Robots: `/robots.txt`
