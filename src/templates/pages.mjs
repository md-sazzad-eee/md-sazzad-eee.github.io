/**
 * Page bodies. Each render function returns the inner HTML of <main>;
 * build.mjs wraps it in the shared layout.
 */

import { esc, attr, tidy, fmtDate, icon, NAV, STATUS_LABEL, TYPE_LABEL } from './helpers.mjs';
import { eee, heroDiagram, interestIcon, projectIcon, iconFor } from './graphics.mjs';

/* ------------------------------------------------------------------ pieces */

const isOut = (p) => ['published', 'presented', 'accepted'].includes(p.status);
const isPending = (p) => ['under-review', 'submitted'].includes(p.status);

const statusChip = (s) => {
  const cls = ['under-review', 'submitted', 'in-preparation'].includes(s) ? 'chip--warn' : s === 'accepted' ? 'chip--accent' : 'chip--ok';
  return `<span class="chip ${cls}">${esc(STATUS_LABEL[s] || s)}</span>`;
};

/** Bold the site owner inside an author list so their position is scannable. */
const authorLine = (pub, myName = 'Sazzad') => {
  if (!pub.authors || pub.authors.length <= 1) return esc(pub.authorLine || '');
  const names = pub.authors
    .map((a) => (a.includes(myName) ? `<span class="me">${esc(a)}</span>` : esc(a)))
    .join(', ');
  return `${names}${pub.authorLine ? ` · <span>${esc(pub.authorLine)}</span>` : ''}`;
};

function pubItem(pub, { headingLevel = 3 } = {}) {
  const H = `h${headingLevel}`;
  const titleHtml = pub.doi
    ? `<a href="https://doi.org/${attr(pub.doi)}" rel="noopener">${esc(pub.title)}</a>`
    : pub.url
      ? `<a href="${attr(pub.url)}" rel="noopener">${esc(pub.title)}</a>`
      : esc(pub.title);

  const actions = [];
  if (pub.doi) {
    actions.push(
      `<a class="btn btn--ghost btn--sm" href="https://doi.org/${attr(pub.doi)}" rel="noopener">${icon.external}<span>DOI</span></a>`
    );
  }
  actions.push(
    `<button class="btn btn--ghost btn--sm" type="button" data-disclosure="abs-${attr(pub.id)}" aria-expanded="false" aria-controls="abs-${attr(pub.id)}">
       <span data-label-closed="Show abstract" data-label-open="Hide abstract">Show abstract</span>
     </button>`
  );
  if (pub.bibtex) {
    actions.push(
      `<button class="btn btn--ghost btn--sm" type="button" data-disclosure="bib-${attr(pub.id)}" aria-expanded="false" aria-controls="bib-${attr(pub.id)}">
         ${icon.doc}<span data-label-closed="BibTeX" data-label-open="Hide BibTeX">BibTeX</span>
       </button>`
    );
  }

  return `<li class="pub" id="${attr(pub.id)}"
    data-year="${pub.year}" data-type="${attr(pub.type)}" data-area="${attr(pub.area || '')}"
    data-status="${attr(pub.status)}" data-date="${attr(pub.date)}"
    data-title="${attr(pub.title.toLowerCase())}"
    data-search="${attr([pub.title, pub.venue, pub.area, (pub.authors || []).join(' '), pub.abstract].join(' ').toLowerCase())}">
  <div class="pub-meta">
    ${statusChip(pub.status)}
    <span class="chip">${esc(TYPE_LABEL[pub.type] || pub.type)}</span>
    <span class="chip">${pub.year}</span>
    ${pub.area ? `<span class="chip">${esc(pub.area)}</span>` : ''}
  </div>
  <${H}>${titleHtml}</${H}>
  <p class="authors">${authorLine(pub)}</p>
  <p class="venue"><em>${esc(pub.venue)}</em>${pub.dateLabel ? ` · ${esc(pub.dateLabel)}` : ''}${pub.place ? ` · ${esc(pub.place)}` : ''}</p>

  <div class="pub-actions">${actions.join('')}</div>

  <div class="disclosure-body" id="abs-${attr(pub.id)}" hidden>
    <p>${esc(tidy(pub.abstract))}</p>
    ${pub.keywords ? `<p style="margin-top:.6rem"><strong>Keywords:</strong> ${esc(pub.keywords.join(', '))}</p>` : ''}
    ${pub.abstractPlaceholder ? `<p style="margin-top:.6rem"><em>Placeholder, replace in <code>src/data/site.mjs</code>.</em></p>` : ''}
  </div>

  ${
    pub.bibtex
      ? `<div class="disclosure-body" id="bib-${attr(pub.id)}" hidden>
    <pre><code>${esc(pub.bibtex)}</code></pre>
    <p style="margin-top:.7rem">
      <button class="btn btn--ghost btn--sm" type="button" data-copy="bib-${attr(pub.id)}">${icon.copy}<span>Copy BibTeX</span></button>
    </p>
  </div>`
      : ''
  }
</li>`;
}

/** `brief` omits the abstract: used on the homepage, where three full abstracts
    would cost several KB of payload for no extra SEO value, since the
    publications page already carries the complete records. */
function scholarlySchema(pub, site, { brief = false } = {}) {
  return {
    '@type': 'ScholarlyArticle',
    '@id': `${site.url}/publications/#${pub.id}`,
    headline: pub.title,
    name: pub.title,
    author: (pub.authors || [site.name]).map((n) => ({ '@type': 'Person', name: n })),
    datePublished: pub.date,
    isPartOf: { '@type': 'PublicationEvent', name: pub.venue },
    about: pub.area,
    ...(brief ? {} : { abstract: tidy(pub.abstract) }),
    inLanguage: 'en',
    ...(pub.doi ? { identifier: `https://doi.org/${pub.doi}`, sameAs: `https://doi.org/${pub.doi}` } : {}),
  };
}

const profileLinks = (site) => {
  const rows = [
    ['googleScholar', 'Google Scholar', icon.scholar],
    ['orcid', 'ORCID', icon.orcid],
    ['researchGate', 'ResearchGate', icon.rg],
    ['linkedin', 'LinkedIn', icon.linkedin],
    ['github', 'GitHub', icon.github],
  ];
  return `<ul class="link-list">
    ${rows
      .map(([key, label, ic]) => {
        const href = site.profiles[key];
        return href
          ? `<li><a href="${attr(href)}" rel="me noopener">${ic}<span>${esc(label)}</span></a></li>`
          : `<li><span class="link-list-empty" style="display:flex;align-items:center;gap:.6rem;min-height:48px;padding:.4rem 0;color:var(--text-faint)">${ic}<span>${esc(label)} <span class="todo">(link coming soon)</span></span></span></li>`;
      })
      .join('')}
    <li><a href="mailto:${attr(site.email)}">${icon.mail}<span>${esc(site.email)}</span></a></li>
  </ul>`;
};

const cvButton = (site, cls = 'btn') =>
  `<a class="${cls}" href="${attr(site.cv.primary.file)}" download="${attr(site.cv.primary.download)}" type="application/pdf">${icon.download}<span>Download CV (PDF)</span></a>`;

/* ------------------------------------------------------------------- pages */

/** Animated circuit trace used as a section divider. */
const divider = `<div class="divider" aria-hidden="true">
  <svg viewBox="0 0 1200 24" preserveAspectRatio="none" fill="none" aria-hidden="true"
       stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
    <path class="divider-track" d="M0 12h430l16-8 20 16 16-8h236l16-8 20 16 16-8h430"/>
  </svg>
  <span class="divider-node"></span>
</div>`;

function home({ site, about, publications, news }) {
  const recent = publications.filter(isOut).slice(0, 3);

  return {
    path: '/',
    title: 'Home',
    description: site.description,
    schema: recent.map((p) => scholarlySchema(p, site, { brief: true })),
    body: `
<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <p class="eyebrow">${esc(site.location)}</p>
      <h1>Md. Sazzad <span class="accent">Hossain</span></h1>
      <p class="role">${esc(site.title)}</p>
      <p class="tagline">${esc(tidy(site.tagline))}</p>
      <!-- Rotates through research areas. The first is rendered server side, so
           with JS disabled this reads as a normal static line. -->
      <p class="focus-line">
        <span class="focus-label">Focus</span>
        <span class="focus-rotator" id="focus-rotator"
              data-items="${attr(about.interests.slice(0, 6).map((i) => i.title).join('|'))}"
        >${esc(about.interests[0].title)}</span><span class="caret" aria-hidden="true"></span>
      </p>
      <div class="btn-row">
        ${cvButton(site)}
        <a class="btn btn--ghost" href="/publications/">View publications</a>
      </div>
      <ul class="hero-facts">
        <li class="chip chip--accent chip--live">Seeking PhD positions</li>
        <li class="chip chip--mono">${publications.filter(isOut).length} published or accepted</li>
        <li class="chip chip--mono">${publications.filter(isPending).length} under review or submitted</li>
      </ul>
    </div>
    <div class="portrait-frame">
      <picture>
        <source type="image/webp"
                srcset="/img/portrait-240.webp 240w, /img/portrait-381.webp 381w, /img/portrait-762.webp 762w"
                sizes="(min-width: 52rem) 20rem, 76vw">
        <img src="/img/portrait-381.png"
             srcset="/img/portrait-240.png 240w, /img/portrait-381.png 381w, /img/portrait-762.png 762w"
             sizes="(min-width: 52rem) 20rem, 76vw"
             width="381" height="452" fetchpriority="high" decoding="async"
             alt="Portrait of ${attr(site.name)}">
      </picture>
    </div>
  </div>

  <div class="wrap hero-visual">
    ${heroDiagram}
  </div>
</section>

<section class="section section--tint">
  <div class="wrap">
    <div class="section-head">
      <h2>Research interests</h2>
      <p>The questions I want to spend a PhD on, ordered to match the areas advertised for the positions I am applying to.</p>
    </div>
    <div class="grid grid--2">
      ${about.interests
        .slice(0, 3)
        .map(
          (i) => `<article class="card card--icon">
        <span class="card-icon" aria-hidden="true">${iconFor(interestIcon, i.title)}</span>
        <h3>${esc(i.title)}</h3>
        <p>${esc(tidy(i.body))}</p>
      </article>`
        )
        .join('')}
    </div>
    <p style="margin-top:1.75rem"><a href="/about/">All ${about.interests.length} research interests, and my background</a></p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${divider}
    <h2 class="visually-hidden">By the numbers</h2>
    <div class="metrics">
      <div class="metric"><span class="value" data-count-to="3">3</span><span class="label">Conference papers</span></div>
      <div class="metric"><span class="value" data-count-to="3">3</span><span class="label">Under review</span></div>
      <div class="metric"><span class="value" data-count-to="3.57" data-decimals="2">3.57</span><span class="label">CGPA out of 4.00</span></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${divider}
    <div class="section-head">
      <h2>Selected publications</h2>
      <p>Most recent first. The full list, with filters and BibTeX, is on the publications page.</p>
    </div>
    <ul class="pub-list">
      ${recent.map((p) => pubItem(p)).join('')}
    </ul>
    <p style="margin-top:1.5rem"><a href="/publications/">All publications →</a></p>
  </div>
</section>

<section class="section section--tint">
  <div class="wrap">
    <div class="section-head">
      <h2>Latest news</h2>
    </div>
    <ul class="news-list">
      ${news
        .slice(0, 3)
        .map(
          (n) => `<li class="card">
        <time datetime="${n.date}">${esc(fmtDate(n.date))}</time>
        <h3>${esc(n.title)}</h3>
        <p>${esc(tidy(n.body))}</p>
      </li>`
        )
        .join('')}
    </ul>
    <p style="margin-top:1.5rem"><a href="/news/">All news →</a></p>
  </div>
</section>`,
  };
}

function aboutPage({ site, about }) {
  return {
    path: '/about/',
    title: 'About',
    description: `Biography, research interests, education, and experience of ${site.name}, an Electrical and Electronic Engineering graduate working on digital twins for power systems.`,
    breadcrumbs: [
      { href: '/', label: 'Home' },
      { href: '/about/', label: 'About' },
    ],
    body: `
<section class="page-head">
  <div class="wrap wrap--narrow">
    <p class="eyebrow">About</p>
    <h1>About me</h1>
    <p class="lede">${esc(tidy(site.tagline))}</p>
  </div>
</section>

<section class="wrap wrap--narrow stack-lg" style="padding-bottom:3rem">
  ${about.bio.map((p) => `<p>${esc(tidy(p))}</p>`).join('')}
  <p class="btn-row">${cvButton(site)}<a class="btn btn--ghost" href="/contact/">Get in touch</a></p>
</section>

<section class="section section--tint">
  <div class="wrap">
    <div class="section-head">
      <h2>Research interests</h2>
      <p>Ordered to match the areas advertised for the positions I am applying to. Each one is grounded in work I have actually done, except where noted.</p>
    </div>
    <div class="grid grid--2">
      ${about.interests
        .map(
          (i) => `<article class="card card--icon">
        <span class="card-icon" aria-hidden="true">${iconFor(interestIcon, i.title)}</span>
        <h3>${esc(i.title)}</h3>
        <p>${esc(tidy(i.body))}</p>
      </article>`
        )
        .join('')}
    </div>
    ${about.interestsNote ? `<p style="margin-top:1.75rem;color:var(--text-muted);max-width:70ch">${esc(tidy(about.interestsNote))}</p>` : ''}
  </div>
</section>

<section class="section">
  <div class="wrap wrap--narrow">
    <div class="section-head"><h2>Education</h2></div>
    <ol class="timeline">
      ${about.education
        .map(
          (e) => `<li>
        <span class="period">${esc(e.period)}</span>
        <h3>${esc(e.degree)}</h3>
        <p class="org">${e.url ? `<a href="${attr(e.url)}" rel="noopener">${esc(e.institution)}</a>` : esc(e.institution)} · ${esc(e.place)}</p>
        <p class="detail">${esc(e.detail)}</p>
      </li>`
        )
        .join('')}
    </ol>
  </div>
</section>

<section class="section section--tint">
  <div class="wrap wrap--narrow">
    <div class="section-head"><h2>Experience</h2></div>
    <ol class="timeline">
      ${about.experience
        .map(
          (x) => `<li>
        <span class="period">${esc(x.period)}</span>
        <h3>${esc(x.role)}</h3>
        <p class="org">${x.url ? `<a href="${attr(x.url)}" rel="noopener">${esc(x.org)}</a>` : esc(x.org)} · ${esc(x.place)}</p>
        <ul style="margin-top:.6rem;color:var(--text-muted);font-size:var(--step--1)">
          ${x.points.map((pt) => `<li>${esc(tidy(pt))}</li>`).join('')}
        </ul>
      </li>`
        )
        .join('')}
    </ol>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head"><h2>Skills</h2></div>
    <div class="grid grid--3">
      ${about.skills
        .map(
          (s) => `<article class="card">
        <h3>${esc(s.group)}</h3>
        <p style="display:flex;flex-wrap:wrap;gap:.35rem;margin-top:.6rem">
          ${s.items.map((i) => `<span class="chip">${esc(i)}</span>`).join('')}
        </p>
      </article>`
        )
        .join('')}
    </div>
  </div>
</section>

<section class="section section--tint">
  <div class="wrap">
    <div class="grid grid--2">
      <div>
        <h2 style="font-size:var(--step-2);margin-bottom:1rem">Languages</h2>
        <div class="scroll-x">
          <table>
            <caption class="visually-hidden">Languages spoken and proficiency level</caption>
            <thead><tr><th scope="col">Language</th><th scope="col">Level</th></tr></thead>
            <tbody>
              ${about.languages.map((l) => `<tr><th scope="row">${esc(l.name)}</th><td>${esc(l.level)}</td></tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h2 style="font-size:var(--step-2);margin-bottom:1rem">Awards &amp; certificates</h2>
        <ul class="news-list">
          ${about.awards
            .map(
              (a) => `<li class="card">
            <time datetime="${a.year}">${esc(a.year)}</time>
            <h3>${esc(a.title)}</h3>
            <p>${esc(a.org)}. ${esc(tidy(a.note))}</p>
          </li>`
            )
            .join('')}
        </ul>
      </div>
    </div>
  </div>
</section>`,
  };
}

function publicationsPage({ site, publications }) {
  const years = [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a);
  const types = [...new Set(publications.map((p) => p.type))];
  const areas = [...new Set(publications.map((p) => p.area).filter(Boolean))].sort();

  return {
    path: '/publications/',
    title: 'Publications',
    description: `Conference papers and journal manuscripts by ${site.name} on digital twins, grid-forming and grid-following inverters, power-electronics reliability, cyber-physical security, and photovoltaics.`,
    breadcrumbs: [
      { href: '/', label: 'Home' },
      { href: '/publications/', label: 'Publications' },
    ],
    schema: publications.map((p) => scholarlySchema(p, site)),
    scripts: ['/js/publications.js'],
    body: `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">Publications</p>
    <h1>Publications</h1>
    <p class="lede">
      ${publications.filter(isOut).length} published or accepted papers,
      ${publications.filter(isPending).length} manuscripts under review or submitted, and
      ${publications.filter((p) => p.status === 'in-preparation').length} in preparation.
      ${site.profiles.googleScholar ? '' : 'A Google Scholar profile will be linked here once it is set up.'}
    </p>
    ${
      site.profiles.googleScholar
        ? `<p class="btn-row" style="margin-top:1.25rem"><a class="btn btn--ghost" href="${attr(site.profiles.googleScholar)}" rel="noopener">${icon.scholar}<span>Google Scholar profile</span></a></p>`
        : ''
    }
  </div>
</section>

<section class="wrap" style="padding-bottom:4rem">
  <!-- Works without JS: the form submits nowhere and every publication stays visible.
       With JS, filtering happens live and the submit button is hidden. -->
  <form class="filters" id="pub-filters" role="search" aria-label="Filter publications">
    <div class="field">
      <label for="pub-search">Search</label>
      <input type="search" id="pub-search" name="q" placeholder="Title, venue, author, keyword…"
             autocomplete="off" spellcheck="false">
    </div>
    <div class="field">
      <label for="pub-year">Year</label>
      <select id="pub-year" name="year">
        <option value="">All years</option>
        ${years.map((y) => `<option value="${y}">${y}</option>`).join('')}
      </select>
    </div>
    <div class="field">
      <label for="pub-type">Type</label>
      <select id="pub-type" name="type">
        <option value="">All types</option>
        ${types.map((t) => `<option value="${attr(t)}">${esc(TYPE_LABEL[t] || t)}</option>`).join('')}
      </select>
    </div>
    <div class="field">
      <label for="pub-area">Research area</label>
      <select id="pub-area" name="area">
        <option value="">All areas</option>
        ${areas.map((a) => `<option value="${attr(a)}">${esc(a)}</option>`).join('')}
      </select>
    </div>
    <div class="field">
      <label for="pub-sort">Sort by</label>
      <select id="pub-sort" name="sort">
        <option value="date-desc">Newest first</option>
        <option value="date-asc">Oldest first</option>
        <option value="title-asc">Title A to Z</option>
        <option value="title-desc">Title Z to A</option>
      </select>
    </div>
    <div class="field" id="filter-actions">
      <button class="btn btn--ghost" type="reset">Reset filters</button>
    </div>
  </form>

  <p class="result-count" id="pub-count" role="status" aria-live="polite">
    Showing all ${publications.length} publications.
  </p>

  <h2 class="visually-hidden">All publications</h2>
  <ul class="pub-list" id="pub-list">
    ${publications.map((p) => pubItem(p)).join('')}
  </ul>

  <p class="empty-state" id="pub-empty" hidden>
    No publications match those filters. <button class="btn btn--ghost btn--sm" type="button" id="pub-clear">Clear filters</button>
  </p>
</section>`,
  };
}

function researchPage({ site, projects }) {
  return {
    path: '/research/',
    title: 'Research',
    description: `Research projects by ${site.name}: self-calibrating digital twins for PV inverters and batteries, grid-forming inverter stability, SiC and GaN reliability, cyber-physical attack detection, perovskite tandem cells, and robotics.`,
    breadcrumbs: [
      { href: '/', label: 'Home' },
      { href: '/research/', label: 'Research' },
    ],
    body: `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">Research</p>
    <h1>Research projects</h1>
    <p class="lede">${projects.length} projects, running from device-level power electronics, photovoltaics and batteries up to system-level digital twins, stability and cyber-physical security for inverter-dominated grids.</p>
  </div>
</section>

<section class="wrap" style="padding-bottom:4rem">
  <div class="stack-lg">
    ${projects
      .map(
        (p) => `<article class="card card--icon" id="${attr(p.id)}" style="scroll-margin-top:6.5rem">
      <span class="card-icon" aria-hidden="true">${iconFor(projectIcon, p.id)}</span>
      <div class="pub-meta">
        <span class="chip chip--accent">${esc(p.status)}</span>
        <span class="chip">${esc(p.area)}</span>
        <span class="chip chip--mono">${esc(p.period)}</span>
      </div>
      <h2 style="font-size:var(--step-2);margin-bottom:.5rem">${esc(p.title)}</h2>
      <p>${esc(tidy(p.summary))}</p>
      <h3 style="margin-top:1.1rem;font-size:var(--step-0)">What the work involved</h3>
      <ul style="color:var(--text-muted);margin-top:.5rem">
        ${p.points.map((pt) => `<li>${esc(tidy(pt))}</li>`).join('')}
      </ul>
      <div class="scroll-x" style="margin-top:1.25rem">
        <table>
          <caption class="visually-hidden">Project details for ${attr(p.title)}</caption>
          <tbody>
            <tr><th scope="row">Collaborators</th><td>${esc(p.collaborators)}</td></tr>
            <tr><th scope="row">Funding</th><td>${esc(p.funding)}</td></tr>
            <tr><th scope="row">Outputs</th><td>${
              p.outputs.length
                ? p.outputs.map((o) => `<a href="${attr(o.href)}">${esc(o.label)}</a>`).join(', ')
                : 'No publication yet.'
            }</td></tr>
          </tbody>
        </table>
      </div>
    </article>`
      )
      .join('')}
  </div>
</section>`,
  };
}

function teachingPage({ site, teaching }) {
  return {
    path: '/teaching/',
    title: 'Teaching',
    description: `Teaching, mentoring, and demonstration experience of ${site.name}, plus the subjects he would like to teach.`,
    breadcrumbs: [
      { href: '/', label: 'Home' },
      { href: '/teaching/', label: 'Teaching' },
    ],
    body: `
<section class="page-head">
  <div class="wrap wrap--narrow">
    <p class="eyebrow">Teaching</p>
    <h1>Teaching &amp; mentoring</h1>
    <p class="lede">${esc(tidy(teaching.intro))}</p>
  </div>
</section>

<section class="wrap wrap--narrow" style="padding-bottom:3rem">
  <ol class="timeline">
    ${teaching.entries
      .map(
        (e) => `<li>
      <span class="period">${esc(e.period)}</span>
      <h2 style="font-size:var(--step-1);margin-bottom:.15rem">${esc(e.role)}</h2>
      <p class="org">${esc(e.org)}</p>
      <ul style="margin-top:.6rem;color:var(--text-muted);font-size:var(--step--1)">
        ${e.points.map((pt) => `<li>${esc(tidy(pt))}</li>`).join('')}
      </ul>
    </li>`
      )
      .join('')}
  </ol>
</section>

<section class="section section--tint">
  <div class="wrap wrap--narrow">
    <div class="section-head">
      <h2>Subjects I would like to teach</h2>
      <p>Areas where my coursework and research put me in a position to lead tutorials or labs.</p>
    </div>
    <p style="display:flex;flex-wrap:wrap;gap:.5rem">
      ${teaching.interests.map((t) => `<span class="chip chip--accent">${esc(t)}</span>`).join('')}
    </p>
    <p style="margin-top:2rem">
      Student feedback and course materials will be published here once I hold a teaching assistantship.
      In the meantime, <a href="/contact/">get in touch</a> if you would like to discuss teaching.
    </p>
  </div>
</section>`,
  };
}

function newsPage({ site, news }) {
  return {
    path: '/news/',
    title: 'News',
    description: `Updates from ${site.name}: conference presentations, paper acceptances, and submissions.`,
    breadcrumbs: [
      { href: '/', label: 'Home' },
      { href: '/news/', label: 'News' },
    ],
    body: `
<section class="page-head">
  <div class="wrap wrap--narrow">
    <p class="eyebrow">News</p>
    <h1>News &amp; updates</h1>
    <p class="lede">Conference presentations, acceptances, and submissions. Also available as an <a href="/rss.xml">RSS feed</a>.</p>
  </div>
</section>

<section class="wrap wrap--narrow" style="padding-bottom:4rem">
  <ol class="news-list">
    ${news
      .map(
        (n) => `<li class="card">
      <time datetime="${n.date}">${esc(fmtDate(n.date))}</time>
      <h2 style="font-size:var(--step-1);margin-block:.25rem .4rem">${esc(n.title)}</h2>
      <p>${esc(tidy(n.body))}</p>
    </li>`
      )
      .join('')}
  </ol>
</section>`,
  };
}

function cvPage({ site }) {
  const all = [site.cv.primary, ...site.cv.alternates];
  return {
    path: '/cv/',
    title: 'CV',
    description: `Curriculum vitae of ${site.name}. View in the browser or download the PDF.`,
    breadcrumbs: [
      { href: '/', label: 'Home' },
      { href: '/cv/', label: 'CV' },
    ],
    scripts: ['/js/cv.js'],
    body: `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">Curriculum vitae</p>
    <h1>CV</h1>
    <p class="lede">${esc(site.cv.primary.note)} Last updated ${esc(site.cv.primary.updated)}.</p>
    <div class="btn-row" style="margin-top:1.5rem">
      ${all
        .map(
          (v, i) =>
            `<a class="btn${i ? ' btn--ghost' : ''}" href="${attr(v.file)}" download="${attr(v.download)}"
                type="application/pdf" data-cv-download="${attr(v.label)}">${icon.download}<span>${esc(v.label)} (PDF)</span></a>`
        )
        .join('')}
      <a class="btn btn--ghost" href="${attr(site.cv.primary.file)}" target="_blank" rel="noopener">
        ${icon.external}<span>Open in new tab</span>
      </a>
    </div>
  </div>
</section>

<section class="wrap" style="padding-bottom:4rem">
  <h2 class="visually-hidden">Embedded CV viewer</h2>
  <!-- object → native PDF viewer where supported; the fallback covers iOS Safari
       and any browser that refuses to render PDFs inline. -->
  <object class="pdf-frame" data="${attr(site.cv.primary.file)}#view=FitH" type="application/pdf"
          aria-label="Embedded PDF of the curriculum vitae of ${attr(site.name)}">
    <div class="pdf-fallback">
      <p><strong>Your browser cannot display the PDF inline.</strong></p>
      <p style="margin-top:.5rem">This is expected on iOS Safari and some mobile browsers.</p>
      <p class="btn-row" style="justify-content:center;margin-top:1.25rem">
        ${cvButton(site)}
        <a class="btn btn--ghost" href="${attr(site.cv.primary.file)}" target="_blank" rel="noopener">Open in a new tab</a>
      </p>
    </div>
  </object>

  <div class="grid grid--2" style="margin-top:2.5rem">
    ${all
      .map(
        (v) => `<article class="card">
      <h3>${esc(v.label)}</h3>
      <p>${esc(v.note || '')}</p>
      <p class="btn-row" style="margin-top:1rem">
        <a class="btn btn--ghost btn--sm" href="${attr(v.file)}" download="${attr(v.download)}"
           type="application/pdf" data-cv-download="${attr(v.label)}">${icon.download}<span>Download</span></a>
      </p>
    </article>`
      )
      .join('')}
  </div>
</section>`,
  };
}

function contactPage({ site }) {
  const hasForm = Boolean(site.web3formsKey);
  return {
    path: '/contact/',
    title: 'Contact',
    description: `Contact ${site.name} about PhD positions, research collaboration, or questions about published work.`,
    breadcrumbs: [
      { href: '/', label: 'Home' },
      { href: '/contact/', label: 'Contact' },
    ],
    scripts: ['/js/contact.js'],
    body: `
<section class="page-head">
  <div class="wrap">
    <p class="eyebrow">Contact</p>
    <h1>Get in touch</h1>
    <p class="lede">I am currently applying for PhD positions. I am glad to hear about openings, collaborations, or questions about any of the papers.</p>
  </div>
</section>

<section class="wrap" style="padding-bottom:4rem">
  <div class="contact-grid">
    <div>
      <h2 style="font-size:var(--step-2);margin-bottom:1rem">Send a message</h2>

      ${
        hasForm
          ? ''
          : `<p class="form-status form-status--error" style="margin-bottom:1.25rem">
        <strong>Form not yet connected.</strong> Add a free Web3Forms access key to
        <code>src/data/site.mjs</code> and rebuild to enable sending. Until then the button opens your email client.
      </p>`
      }

      <form id="contact-form" class="form-grid"
            action="${hasForm ? 'https://api.web3forms.com/submit' : `mailto:${attr(site.email)}`}"
            method="POST" novalidate
            data-mode="${hasForm ? 'api' : 'mailto'}"
            data-email="${attr(site.email)}">
        ${hasForm ? `<input type="hidden" name="access_key" value="${attr(site.web3formsKey)}">` : ''}
        <input type="hidden" name="from_name" value="Website contact form">
        <input type="hidden" name="redirect" value="false">

        <!-- Honeypot: hidden from people, tempting to naive bots. -->
        <div class="hp-field" aria-hidden="true">
          <label for="botcheck">Leave this field empty</label>
          <input type="text" id="botcheck" name="botcheck" tabindex="-1" autocomplete="off">
        </div>

        <div class="form-row-2">
          <div class="field">
            <label for="name">Your name <span aria-hidden="true">*</span></label>
            <input type="text" id="name" name="name" required autocomplete="name"
                   aria-describedby="name-error" maxlength="120">
            <p class="error-text" id="name-error" hidden></p>
          </div>
          <div class="field">
            <label for="email">Your email <span aria-hidden="true">*</span></label>
            <input type="email" id="email" name="email" required autocomplete="email"
                   inputmode="email" aria-describedby="email-error" maxlength="180">
            <p class="error-text" id="email-error" hidden></p>
          </div>
        </div>

        <div class="field">
          <label for="subject">Subject <span aria-hidden="true">*</span></label>
          <input type="text" id="subject" name="subject" required aria-describedby="subject-error" maxlength="160">
          <p class="error-text" id="subject-error" hidden></p>
        </div>

        <div class="field">
          <label for="message">Message <span aria-hidden="true">*</span></label>
          <textarea id="message" name="message" required aria-describedby="message-hint message-error"
                    maxlength="4000"></textarea>
          <p class="hint" id="message-hint">Minimum 20 characters.</p>
          <p class="error-text" id="message-error" hidden></p>
        </div>

        <p class="form-status" id="form-status" role="status" aria-live="polite" hidden></p>

        <p><button class="btn" type="submit" id="contact-submit">${icon.mail}<span>Send message</span></button></p>
        <p class="hint">Fields marked * are required. Your details are only used to reply to you.</p>
      </form>
    </div>

    <aside>
      <h2 style="font-size:var(--step-2);margin-bottom:1rem">Elsewhere</h2>
      ${profileLinks(site)}
      <div class="card" style="margin-top:1.75rem">
        <h3>${icon.pin} Location</h3>
        <p style="margin-top:.4rem">${
          site.locationMapUrl
            ? `<a href="${attr(site.locationMapUrl)}" rel="noopener">${esc(site.location)}</a>`
            : esc(site.location)
        }</p>
        <p style="margin-top:.75rem">Open to relocating internationally for a PhD position.</p>
      </div>
      <p class="btn-row" style="margin-top:1.5rem">${cvButton(site, 'btn btn--ghost')}</p>
    </aside>
  </div>
</section>`,
  };
}

function sitemapPage({ site, publications, projects }) {
  return {
    path: '/sitemap/',
    title: 'Sitemap',
    description: `Every page on ${site.name}'s website, in one list.`,
    breadcrumbs: [
      { href: '/', label: 'Home' },
      { href: '/sitemap/', label: 'Sitemap' },
    ],
    body: `
<section class="page-head">
  <div class="wrap wrap--narrow">
    <p class="eyebrow">Sitemap</p>
    <h1>Sitemap</h1>
    <p class="lede">Every page on this site. The machine-readable version is at <a href="/sitemap.xml">/sitemap.xml</a>.</p>
  </div>
</section>

<section class="wrap wrap--narrow" style="padding-bottom:4rem">
  <h2>Pages</h2>
  <ul class="link-list" style="margin-top:.75rem">
    ${NAV.map((n) => `<li><a href="${n.href}">${icon.doc}<span>${esc(n.label)}</span></a></li>`).join('')}
    <li><a href="/sitemap/">${icon.doc}<span>Sitemap</span></a></li>
  </ul>

  <h2 style="margin-top:2.5rem">Publications</h2>
  <ul class="link-list" style="margin-top:.75rem">
    ${publications
      .map((p) => `<li><a href="/publications/#${attr(p.id)}">${icon.doc}<span>${esc(p.title)}</span></a></li>`)
      .join('')}
  </ul>

  <h2 style="margin-top:2.5rem">Research projects</h2>
  <ul class="link-list" style="margin-top:.75rem">
    ${projects
      .map((p) => `<li><a href="/research/#${attr(p.id)}">${icon.doc}<span>${esc(p.title)}</span></a></li>`)
      .join('')}
  </ul>

  <h2 style="margin-top:2.5rem">Files &amp; feeds</h2>
  <ul class="link-list" style="margin-top:.75rem">
    <li><a href="${attr(site.cv.primary.file)}" download="${attr(site.cv.primary.download)}">${icon.download}<span>${esc(site.cv.primary.label)} (PDF)</span></a></li>
    ${site.cv.alternates.map((v) => `<li><a href="${attr(v.file)}" download="${attr(v.download)}">${icon.download}<span>${esc(v.label)} (PDF)</span></a></li>`).join('')}
    <li><a href="/rss.xml">${icon.external}<span>RSS feed</span></a></li>
    <li><a href="/sitemap.xml">${icon.external}<span>XML sitemap</span></a></li>
  </ul>
</section>`,
  };
}

function notFoundPage() {
  return {
    path: '/404/',
    title: 'Page not found',
    description: 'That page does not exist.',
    body: `
<section class="wrap wrap--narrow error-page">
  <p class="error-code">404</p>
  <h1>That page does not exist</h1>
  <p class="lede" style="margin-inline:auto;margin-top:.75rem">
    The link may be out of date, or the page may have moved. These are the main sections:
  </p>
  <p class="btn-row" style="justify-content:center;margin-top:2rem">
    <a class="btn" href="/">Go to the homepage</a>
    <a class="btn btn--ghost" href="/publications/">Publications</a>
    <a class="btn btn--ghost" href="/sitemap/">Full sitemap</a>
  </p>
</section>`,
  };
}

/* ---------------------------------------------------------------- assembly */

export function renderPages(data) {
  return [
    home(data),
    aboutPage(data),
    publicationsPage(data),
    researchPage(data),
    teachingPage(data),
    newsPage(data),
    cvPage(data),
    contactPage(data),
    sitemapPage(data),
    notFoundPage(data),
  ];
}
