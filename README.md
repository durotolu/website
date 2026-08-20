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

This is a static site (`dist/`). Production origin is `https://modurotolu.com` in [`src/config.ts`](src/config.ts).

1. Connect the GitHub repo to [Vercel](https://vercel.com/) or [Cloudflare Pages](https://developers.cloudflare.com/pages/).
2. Build command: `npm run build`
3. Output directory: `dist`
4. Add both `modurotolu.com` and `www.modurotolu.com` on the host, then point Namecheap DNS at it (below).

`www` redirects to the apex. Headers live in [`public/_headers`](public/_headers) (Cloudflare) and [`vercel.json`](vercel.json).

### Namecheap DNS

Leave nameservers on **Namecheap BasicDNS** unless you move DNS to Cloudflare.

In **Domain List → modurotolu.com → Advanced DNS**, remove Namecheap parking/URL-redirect records, then add:

**Vercel** (after adding the domain in the Vercel project):

| Type  | Host | Value                 |
| ----- | ---- | --------------------- |
| A     | `@`  | `76.76.21.21`         |
| CNAME | `www`| `cname.vercel-dns.com`|

Confirm the A record in Vercel’s domain settings if they list a different IP.

**Cloudflare Pages** (if you keep DNS at Namecheap):

| Type  | Host | Value                         |
| ----- | ---- | ----------------------------- |
| CNAME | `@`  | `<project>.pages.dev`         |
| CNAME | `www`| `<project>.pages.dev`         |

Namecheap supports CNAME on `@` via ALIAS/CNAME flattening. If you use Cloudflare DNS instead, change nameservers to the ones Cloudflare gives you and add the domain in Pages.

DNS can take a few minutes to a few hours. After it resolves, SSL is issued automatically by Vercel or Cloudflare.

Optional: in Namecheap **Redirect Email**, forward `hello@modurotolu.com` (or any alias) to your existing inbox. The site still uses the address in `src/config.ts` until you change it.

## Analytics

In `src/config.ts`, set `analytics.plausibleDomain` to `modurotolu.com` after you add that domain in Plausible. If it is empty, no analytics script is loaded.

## Newsletter

Set `newsletter.url` to your provider’s form action (Buttondown, ConvertKit, Beehiiv, etc.). If it is empty, the signup UI is not shown. This site never stores email addresses.

## RSS, sitemap, robots

- Writing RSS (native essays only): `/rss.xml`
- Sitemap: `/sitemap-index.xml`
- Robots: `/robots.txt`
