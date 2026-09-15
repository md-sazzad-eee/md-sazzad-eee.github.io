# Academic portfolio — Md. Sazzad Hossain

A static academic portfolio site. **No dependencies, no `node_modules`, no install step.**
A ~450-line Node script (`build.mjs`) generates the whole site from one data file.

```bash
node build.mjs            # build into dist/
node build.mjs --serve    # build, then preview at http://localhost:4321
```

Requires Node 18 or newer. That's the entire toolchain.

---

## Editing the site

**Almost everything lives in one file: `src/data/site.mjs`.** Change it, re-run
`node build.mjs`, and every page, the sitemap, the RSS feed, and the structured
data all update together.

| I want to… | Edit |
| --- | --- |
| Add a publication | `publications` array in `src/data/site.mjs` |
| Add a project | `projects` array |
| Post a news update | `news` array (also feeds `rss.xml`) |
| Change bio, education, skills | `about` object |
| Add ORCID / Scholar / GitHub links | `site.profiles` |
| Turn on the contact form | `site.web3formsKey` |
| Change colours, spacing, type | `src/styles/main.css` |
| Change page structure | `src/templates/pages.mjs` |

### Things left for you to fill in

These are marked with empty strings or `abstractPlaceholder: true` in `site.mjs`:

1. **`site.url`** — set this to your real domain before deploying. Canonical
   URLs, the sitemap, and Open Graph tags all derive from it.
2. **`site.profiles`** — Google Scholar, ORCID, ResearchGate, GitHub. Empty
   entries render as greyed-out "link coming soon" items rather than broken links.
3. **DOIs** — add `doi: '10.1109/...'` to a publication and a DOI button appears
   automatically, and the title becomes a link.
4. **Abstracts for the TENSYMP and TENCON papers** — currently placeholders. The
   PEEIACON abstract is the real published one.
5. **`site.web3formsKey`** — see below.

---

## The contact form

GitHub Pages is static hosting: it serves files and cannot run code, so it can't
process a form submission. The form therefore posts to
[Web3Forms](https://web3forms.com), which is free and needs no account — you give
it an email address, it gives you an access key, and it forwards submissions to
your inbox.

1. Get a key at <https://web3forms.com>.
2. Paste it into `site.web3formsKey` in `src/data/site.mjs`.
3. Rebuild.

**Until you do that**, the form still works: it validates input and then opens
the visitor's email client with the message pre-filled. Nothing is broken, it's
just a worse experience.

Spam protection is a honeypot field — invisible to people, tempting to naive bots,
and it costs nothing in privacy or accessibility (no CAPTCHA).

---

## Deploying

The `dist/` folder is the entire site. Upload it anywhere.

**GitHub Pages** (free, works well here):

```bash
git init && git add -A && git commit -m "Initial site"
git remote add origin https://github.com/YOURNAME/YOURNAME.github.io.git
git push -u origin main
```

Then either commit `dist/` to a `gh-pages` branch, or add this workflow at
`.github/workflows/deploy.yml` to build on every push:

```yaml
name: Deploy
on: { push: { branches: [main] } }
permissions: { contents: read, pages: write, id-token: write }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: node build.mjs
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: github-pages
    steps: [{ uses: actions/deploy-pages@v4 }]
```

`.nojekyll` is generated automatically so GitHub Pages serves the files as-is.

**Netlify / Vercel / Cloudflare Pages** — build command `node build.mjs`, publish
directory `dist`.

---

## What's implemented

**Pages** — Home, About, Publications, Research, Teaching, News, CV, Contact,
Sitemap, and a custom 404.

**Responsive** — Mobile-first, CSS Grid and Flexbox, fluid type via `clamp()`,
48×48px minimum tap targets, hamburger menu below 62rem, full nav above it.
Wide tables scroll horizontally inside their container instead of breaking the
layout. No horizontal overflow from 320px up.

**Dark / light** — Follows `prefers-color-scheme` by default; a manual toggle
overrides it and persists in `localStorage`. The theme is applied by a tiny
inline script before first paint, so there is no flash of the wrong theme. Every
colour pair is verified at ≥4.5:1 contrast in both modes (the portrait is a
transparent PNG, so it reads correctly on either background).

**Performance** — Static HTML, no framework. Critical CSS is inlined; the rest is
fetched without blocking render. Largest page is 46 KB uncompressed, ~10 KB
gzipped, against the 50 KB budget. Images are WebP with PNG fallback and `srcset`.
System font stack, so there are no web fonts to download and no layout shift from
font swapping. All images carry explicit `width`/`height` to keep CLS at zero.

**Accessibility** — Semantic landmarks, one `h1` per page with no heading-level
skips, skip link, visible focus rings, ARIA on the menu and disclosures, labelled
form fields with inline error messages, and a live region announcing filter
results, theme changes, and CV downloads. Honours `prefers-reduced-motion`.

**SEO** — Unique title/description per page, canonical URLs, Open Graph and
Twitter cards, Schema.org `Person` / `ScholarlyArticle` / `EducationalOrganization`
/ `BreadcrumbList`, Google Scholar `citation_*` meta tags, auto-generated
`sitemap.xml`, `robots.txt`, and an RSS feed.

**Publications** — Live search (debounced 220ms), filter by year, type, and
research area, sort by date or title, expandable abstracts, and one-click BibTeX
copy. Filter state is written to the URL so a filtered view can be bookmarked or
shared. With JavaScript disabled, every publication simply stays visible.

**CV** — Native embedded PDF viewer with a fallback panel for iOS Safari, which
reports PDF support but renders a blank box. Download buttons use the `download`
attribute with a clean filename and work on every device. Both CV versions are
under 250 KB.

**Works without JavaScript** — Navigation, all content, the CV download, and
basic form validation all function with JS disabled.

---

## Not yet built

Deliberately deferred so the core site could ship first:
internationalisation and the language switcher, service worker / offline support,
analytics with cookie consent, and a full blog with individual post pages (the
News page and RSS feed cover announcements for now).

The PWA manifest and icons *are* generated, so the site is installable; it just
has no offline caching yet.

---

## Layout

```
build.mjs               generator: layout, SEO head, sitemap, RSS, dev server
src/data/site.mjs       ← all content lives here
src/templates/
  pages.mjs             page bodies
  helpers.mjs           escaping, dates, inline SVG icons, nav
src/styles/main.css     design tokens + all styles (split at CRITICAL-END marker)
public/                 copied verbatim into dist/
  js/                   site.js, publications.js, contact.js, cv.js
  img/                  portraits (WebP + PNG), PWA icons
  cv/                   CV PDFs
dist/                   build output — deploy this
CV/                     your original source files, untouched
```
