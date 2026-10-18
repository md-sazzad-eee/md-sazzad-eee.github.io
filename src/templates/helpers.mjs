/** Shared helpers + inline icon set. Imported by both build.mjs and pages.mjs. */

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const attr = (s = '') => esc(s).replace(/'/g, '&#39;');

/** Collapse the whitespace that template literals leave inside prose blocks. */
export const tidy = (s = '') => String(s).replace(/\s+/g, ' ').trim();

export const fmtDate = (iso) =>
  new Date(iso.length === 10 ? iso + 'T00:00:00Z' : iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About' },
  { href: '/publications/', label: 'Publications' },
  { href: '/research/', label: 'Research' },
  { href: '/teaching/', label: 'Teaching' },
  { href: '/news/', label: 'News' },
  { href: '/cv/', label: 'CV' },
  { href: '/contact/', label: 'Contact' },
];

/* Inline SVG only: no icon font, no extra network request.
   Decorative icons are aria-hidden; meaning is carried by adjacent text. */
export const icon = {
  menu: `<svg class="icon-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg><svg class="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
  theme: `<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg><svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.1 5.1l1.4 1.4M17.5 17.5l1.4 1.4M18.9 5.1l-1.4 1.4M6.5 17.5l-1.4 1.4"/></svg>`,
  download: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12"/><path d="m7.5 10.5 4.5 4.5 4.5-4.5"/><path d="M4 20h16"/></svg>`,
  external: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4h6v6"/><path d="M20 4 11 13"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6 8.5-6"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>`,
  scholar: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3 1 9l11 6 9-4.9V17h2V9L12 3z"/><path d="M5 13.2V17c0 1.9 3.1 3.5 7 3.5s7-1.6 7-3.5v-3.8l-7 3.8-7-3.8z"/></svg>`,
  orcid: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM8.2 7.3a.95.95 0 1 1 0 1.9.95.95 0 0 1 0-1.9zm.72 3.05v6.35H7.5v-6.35h1.42zm2.03 0h2.62c2.05 0 3.4 1.35 3.4 3.17 0 1.83-1.35 3.18-3.42 3.18h-2.6v-6.35zm1.42 1.25v3.85h1.12c1.4 0 2.05-.86 2.05-1.93 0-1.06-.63-1.92-2.05-1.92h-1.12z"/></svg>`,
  rg: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.8 5.2h2.9c1.9 0 3 1 3 2.6 0 1.2-.63 2.06-1.7 2.4l2.1 3.6h-1.9l-1.87-3.3h-1v3.3h-1.63V7.2zm1.63 1.35v2.6h1.16c1 0 1.53-.47 1.53-1.3 0-.84-.53-1.3-1.53-1.3h-1.16z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM9.5 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3-.03-2.96-1.8-2.96-1.8 0-2.08 1.4-2.08 2.86V21h-4z"/></svg>`,
  github: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85l-.01 2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/></svg>`,
  doc: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7z"/><path d="M14 3v4h4"/></svg>`,
  copy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a1 1 0 0 1 1-1h9"/></svg>`,
};

export const STATUS_LABEL = {
  published: 'Published',
  accepted: 'Accepted',
  presented: 'Presented',
  'under-review': 'Under review',
  submitted: 'Submitted',
  'in-preparation': 'In preparation',
};

export const TYPE_LABEL = {
  conference: 'Conference paper',
  journal: 'Journal article',
  chapter: 'Book chapter',
  preprint: 'Preprint',
};
