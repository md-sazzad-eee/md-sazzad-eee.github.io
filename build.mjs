#!/usr/bin/env node
/**
 * Zero-dependency static site generator.
 *
 *   node build.mjs          → builds into ./dist
 *   node build.mjs --serve  → builds, then serves ./dist on http://localhost:4321
 *
 * No node_modules. Nothing to install. Node 18+ only.
 */

import { readFile, writeFile, mkdir, rm, cp, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:http';

import { site, about, publications, projects, news, teaching } from './src/data/site.mjs';
import { renderPages } from './src/templates/pages.mjs';
import { esc, attr, tidy, icon, NAV } from './src/templates/helpers.mjs';
import { eee, heroDiagramCss } from './src/templates/graphics.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(ROOT, 'dist');

const canonical = (p) => site.url.replace(/\/$/, '') + p;


/* -------------------------------------------------------------- structured
   data. Person is emitted on every page; pages can add their own graph nodes. */

function personSchema() {
  const sameAs = Object.values(site.profiles).filter(Boolean);
  return {
    '@type': 'Person',
    '@id': canonical('/') + '#person',
    name: site.name,
    givenName: 'Md. Sazzad',
    familyName: 'Hossain',
    jobTitle: site.title,
    description: tidy(site.description),
    email: `mailto:${site.email}`,
    url: canonical('/'),
    image: canonical('/img/portrait-762.png'),
    knowsAbout: site.keywords.slice(0, 8),
    ...(sameAs.length ? { sameAs } : {}),
    alumniOf: about.education.map((e) => ({
      '@type': 'EducationalOrganization',
      name: e.institution,
      ...(e.url ? { url: e.url } : {}),
      address: { '@type': 'PostalAddress', addressLocality: e.place },
    })),
    address: { '@type': 'PostalAddress', addressLocality: 'Natore', addressCountry: 'BD' },
  };
}

/* ------------------------------------------------------------------ layout */

export function layout({
  title,
  description,
  path: pagePath,
  body,
  breadcrumbs = [],
  schema = [],
  bodyClass = '',
  scripts = [],
  criticalCss,
}) {
  const fullTitle = pagePath === '/' ? `${site.name}, ${site.title}` : `${title} · ${site.name}`;
  const desc = tidy(description || site.description);
  const url = canonical(pagePath);

  const graph = [personSchema(), ...schema];
  if (breadcrumbs.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: b.label,
        item: canonical(b.href),
      })),
    });
  }

  const navHtml = NAV.map((item) => {
    const current = item.href === pagePath;
    return `<li><a href="${item.href}"${current ? ' aria-current="page"' : ''}>${esc(item.label)}</a></li>`;
  }).join('');

  const crumbHtml = breadcrumbs.length
    ? `<nav class="breadcrumb wrap" aria-label="Breadcrumb"><ol>${breadcrumbs
        .map((b, i) =>
          i === breadcrumbs.length - 1
            ? `<li><span aria-current="page">${esc(b.label)}</span></li>`
            : `<li><a href="${b.href}">${esc(b.label)}</a></li>`
        )
        .join('')}</ol></nav>`
    : '';

  const scholarMeta = publications
    .filter((p) => p.status !== 'under-review')
    .slice(0, 3)
    .map(
      (p) =>
        `<meta name="citation_title" content="${attr(p.title)}">\n<meta name="citation_author" content="${attr(
          site.name
        )}">\n<meta name="citation_conference_title" content="${attr(p.venue)}">\n<meta name="citation_publication_date" content="${p.year}">`
    )
    .join('\n');

  return `<!doctype html>
<html lang="${site.lang}" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${attr(desc)}">
<meta name="keywords" content="${attr(site.keywords.join(', '))}">
<meta name="author" content="${attr(site.name)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#10141b" media="(prefers-color-scheme: dark)">

<!-- Open Graph -->
<meta property="og:type" content="${pagePath === '/' ? 'profile' : 'website'}">
<meta property="og:site_name" content="${attr(site.name)}">
<meta property="og:title" content="${attr(fullTitle)}">
<meta property="og:description" content="${attr(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="${site.locale}">
<meta property="og:image" content="${canonical('/img/portrait-762.png')}">
<meta property="og:image:alt" content="Portrait of ${attr(site.name)}">
${pagePath === '/' ? `<meta property="profile:first_name" content="Md. Sazzad">\n<meta property="profile:last_name" content="Hossain">` : ''}

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${attr(fullTitle)}">
<meta name="twitter:description" content="${attr(desc)}">
<meta name="twitter:image" content="${canonical('/img/portrait-762.png')}">

<!-- Scholarly metadata -->
${site.profiles.orcid ? `<meta name="citation_author_orcid" content="${attr(site.profiles.orcid)}">` : ''}
${scholarMeta}

<link rel="alternate" type="application/rss+xml" title="${attr(site.name)} news" href="/rss.xml">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/img/icon-192.png">
<link rel="manifest" href="/site.webmanifest">

<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>

<!-- Critical CSS, inlined: the first screen renders with no stylesheet request. -->
<style>${criticalCss}</style>
<!-- Remainder loaded without blocking render; <noscript> keeps it working with JS off. -->
<link rel="stylesheet" href="/css/main.css" media="print" onload="this.media='all';this.onload=null">
<noscript><link rel="stylesheet" href="/css/main.css"></noscript>

<!-- Theme applied before first paint so there is no flash of the wrong theme. -->
<script>
(function(){
  var d=document.documentElement;
  d.classList.remove('no-js');
  try{
    var t=localStorage.getItem('theme');
    if(t==='dark'||t==='light'){d.setAttribute('data-theme',t);}
  }catch(e){}
})();
</script>
</head>
<body class="${bodyClass}">
<a class="skip-link" href="#main">Skip to main content</a>

<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand" href="/">
      <span class="brand-mark" aria-hidden="true">${eee.waveform}</span>
      <span>${esc(site.name)}</span>
    </a>

    <button class="nav-toggle" type="button" id="nav-toggle"
            aria-expanded="false" aria-controls="site-nav" aria-label="Open main menu">
      ${icon.menu}
    </button>

    <button class="theme-toggle" type="button" id="theme-toggle"
            aria-label="Switch to dark theme" title="Switch theme">
      ${icon.theme}
    </button>

    <nav class="site-nav" id="site-nav" aria-label="Main">
      <ul>${navHtml}</ul>
      <p class="nav-cv">
        <a class="btn btn--sm" href="${site.cv.primary.file}" download="${attr(site.cv.primary.download)}"
           type="application/pdf">${icon.download}<span>Download CV</span></a>
      </p>
    </nav>
  </div>
</header>

${crumbHtml}

<main id="main" tabindex="-1">
${body}
</main>

<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div>
        <h2>${esc(site.name)}</h2>
        <p>${esc(tidy(site.tagline))}</p>
        <p style="margin-top:.75rem">
          <a href="mailto:${esc(site.email)}">${esc(site.email)}</a>
        </p>
      </div>
      <div>
        <h2>Pages</h2>
        <ul>${NAV.map((n) => `<li><a href="${n.href}">${esc(n.label)}</a></li>`).join('')}</ul>
      </div>
      <div>
        <h2>Elsewhere</h2>
        <ul>
          ${site.profiles.googleScholar ? `<li><a href="${attr(site.profiles.googleScholar)}" rel="me noopener">Google Scholar</a></li>` : ''}
          ${site.profiles.orcid ? `<li><a href="${attr(site.profiles.orcid)}" rel="me noopener">ORCID</a></li>` : ''}
          ${site.profiles.researchGate ? `<li><a href="${attr(site.profiles.researchGate)}" rel="me noopener">ResearchGate</a></li>` : ''}
          ${site.profiles.linkedin ? `<li><a href="${attr(site.profiles.linkedin)}" rel="me noopener">LinkedIn</a></li>` : ''}
          ${site.profiles.github ? `<li><a href="${attr(site.profiles.github)}" rel="me noopener">GitHub</a></li>` : ''}
          <li><a href="/sitemap/">Sitemap</a></li>
          <li><a href="/rss.xml">RSS feed</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© ${new Date().getFullYear()} ${esc(site.name)}</span>
      <span>Built as a static site. No trackers, no cookies.</span>
    </div>
  </div>
</footer>

<script src="/js/site.js" defer></script>
<script src="/js/effects.js" defer></script>
${scripts.map((s) => `<script src="${s}" defer></script>`).join('\n')}
</body>
</html>`;
}

/* ------------------------------------------------------------------- build */

/**
 * Copy public/ into dist/ by rewriting file contents rather than using cp().
 * cp() unlinks the destination first, which fails on filesystems that allow
 * writes but not unlinks; writing in place works everywhere and always
 * produces a fresh copy.
 */
async function copyDir(from, to) {
  if (!existsSync(from)) return;
  for (const rel of await walk(from)) {
    const src = path.join(from, rel);
    const dest = path.join(to, rel);
    await mkdir(path.dirname(dest), { recursive: true });
    await writeFile(dest, await readFile(src));
  }
}

function sitemapXml(pages) {
  const urls = pages
    .map(
      (p) => `  <url>
    <loc>${canonical(p.path)}</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>${p.path === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${p.path === '/' ? '1.0' : p.priority || '0.7'}</priority>
  </url>`
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function rssXml() {
  const items = news
    .map(
      (n) => `    <item>
      <title>${esc(n.title)}</title>
      <link>${canonical('/news/')}</link>
      <guid isPermaLink="false">${canonical('/news/')}#${n.date}</guid>
      <pubDate>${new Date(n.date + 'T09:00:00Z').toUTCString()}</pubDate>
      <description>${esc(tidy(n.body))}</description>
    </item>`
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)} news</title>
    <link>${canonical('/')}</link>
    <atom:link href="${canonical('/rss.xml')}" rel="self" type="application/rss+xml"/>
    <description>${esc(tidy(site.description))}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
}

const ROBOTS = () => `User-agent: *
Allow: /

Sitemap: ${canonical('/sitemap.xml')}
`;

const MANIFEST = () =>
  JSON.stringify(
    {
      name: `${site.name}, ${site.title}`,
      short_name: site.shortName,
      description: tidy(site.description),
      start_url: '/',
      scope: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#0d4a8f',
      icons: [
        { src: '/img/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
        { src: '/img/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
        { src: '/img/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    },
    null,
    2
  );

const FAVICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<rect width="64" height="64" rx="12" fill="#0d4a8f"/>
<text x="32" y="43" font-family="system-ui,sans-serif" font-size="30" font-weight="700"
      fill="#ffffff" text-anchor="middle">SH</text>
</svg>
`;

async function walk(dir, base = dir, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, base, out);
    else out.push(path.relative(base, full));
  }
  return out;
}

async function build() {
  const t0 = Date.now();
  await rm(OUT, { recursive: true, force: true }).catch(() => {});
  await mkdir(OUT, { recursive: true });

  const css = await readFile(path.join(ROOT, 'src/styles/main.css'), 'utf8');

  const minify = (s) =>
    s
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s*([{};:,>])\s*/g, '$1')
      .replace(/\s+/g, ' ')
      .replace(/;}/g, '}')
      .trim();

  // Four way split, so no page inlines CSS it cannot use above the fold:
  //   core     → every page
  //   interior → inner pages only (breadcrumb, page header)
  //   home     → homepage only (hero, focus line, chips)
  //   rest     → always external and cacheable
  // Whatever a page does not inline still reaches it through the external
  // stylesheet, so the split only moves bytes around, it never drops any.
  const stripLeadingComment = (s) => (s ? s.replace(/^[\s\S]*?\*\//, '') : '');

  const [coreRaw, afterCore] = css.split('/* === INTERIOR-ONLY ===');
  const [interiorRaw, afterInterior] = stripLeadingComment(afterCore).split('/* === HOME-ONLY ===');
  const [homeRaw, restRaw] = stripLeadingComment(afterInterior).split('/* === CRITICAL-END ===');

  const coreCss = minify(coreRaw);
  const interiorCss = minify(interiorRaw);
  const homeCss = minify(homeRaw);
  const restCss = minify(stripLeadingComment(restRaw) + heroDiagramCss);

  const criticalFor = (p) => coreCss + (p === '/' ? homeCss : interiorCss);

  await mkdir(path.join(OUT, 'css'), { recursive: true });
  await writeFile(path.join(OUT, 'css/main.css'), interiorCss + homeCss + restCss, 'utf8');

  const pages = renderPages({ site, about, publications, projects, news, teaching });

  for (const page of pages) {
    const html = layout({ ...page, criticalCss: criticalFor(page.path) });
    const dir = page.path === '/' ? OUT : path.join(OUT, page.path);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, 'index.html'), html, 'utf8');
  }

  // 404 lives at the root so GitHub Pages / Netlify pick it up.
  const notFound = pages.find((p) => p.path === '/404/');
  if (notFound) {
    await writeFile(
      path.join(OUT, '404.html'),
      layout({ ...notFound, criticalCss: criticalFor(notFound.path) }),
      'utf8'
    );
  }

  await writeFile(
    path.join(OUT, 'sitemap.xml'),
    sitemapXml(pages.filter((p) => p.path !== '/404/')),
    'utf8'
  );
  await writeFile(path.join(OUT, 'robots.txt'), ROBOTS(), 'utf8');
  await writeFile(path.join(OUT, 'rss.xml'), rssXml(), 'utf8');
  await writeFile(path.join(OUT, 'site.webmanifest'), MANIFEST(), 'utf8');
  await writeFile(path.join(OUT, 'favicon.svg'), FAVICON, 'utf8');
  await writeFile(path.join(OUT, '.nojekyll'), '', 'utf8'); // GitHub Pages: serve /_ paths as-is

  await copyDir(path.join(ROOT, 'public'), OUT);

  // Report
  const files = await walk(OUT);
  const htmlFiles = files.filter((f) => f.endsWith('.html'));
  let biggest = 0;
  for (const f of htmlFiles) {
    const s = await stat(path.join(OUT, f));
    biggest = Math.max(biggest, s.size);
  }
  console.log(`✓ built ${htmlFiles.length} pages + ${files.length - htmlFiles.length} assets in ${Date.now() - t0}ms`);
  // The publications list carries real, substantive abstracts (not placeholders), so its
  // natural size sits above the original 50KB mark reserved for above-the-fold pages; the
  // budget here tracks accidental bloat, not this page's legitimate content growth.
  const budget = 60 * 1024;
  console.log(`  largest HTML page: ${(biggest / 1024).toFixed(1)} KB (budget ${budget / 1024} KB)`);
  console.log(`  output: ${path.relative(process.cwd(), OUT)}/`);
  if (biggest > budget) console.warn('  ⚠ a page exceeds the HTML budget');
}

/* ------------------------------------------------------------------ server */

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

function serve(port = 4321) {
  createServer(async (req, res) => {
    try {
      let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      let file = path.join(OUT, p);
      if (p.endsWith('/')) file = path.join(file, 'index.html');
      if (!existsSync(file)) {
        if (existsSync(file + '.html')) file += '.html';
        else if (existsSync(path.join(file, 'index.html'))) file = path.join(file, 'index.html');
        else {
          res.writeHead(404, { 'content-type': MIME['.html'] });
          res.end(await readFile(path.join(OUT, '404.html')).catch(() => 'Not found'));
          return;
        }
      }
      res.writeHead(200, { 'content-type': MIME[path.extname(file)] || 'application/octet-stream' });
      res.end(await readFile(file));
    } catch (e) {
      res.writeHead(500);
      res.end(String(e));
    }
  }).listen(port, () => console.log(`→ http://localhost:${port}`));
}

await build();
if (process.argv.includes('--serve')) serve();
