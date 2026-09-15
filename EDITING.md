# Editing your website

Live at **https://md-sazzad-eee.github.io**
Repository: **github.com/md-sazzad-eee/md-sazzad-eee.github.io**

---

## The one thing to remember

**Almost every change is one edit to `src/data/site.mjs`.**

The routine is always the same three steps:

```
1. Edit  src/data/site.mjs
2. Run   node build.mjs
3. Upload the changed files from  dist/  to GitHub
```

Never edit anything inside `dist/` by hand. That folder is generated, and
your next build will overwrite it.

---

## Step 2 in detail: running the build

Open the `personal website` folder, click the address bar at the top of the
window, type `cmd`, and press Enter. A black window opens in that folder. Type:

```
node build.mjs
```

You should see:

```
✓ built 11 pages + 22 assets in 700ms
  largest HTML page: 49.8 KB (budget 50 KB)
```

If it says `node is not recognized`, install Node from <https://nodejs.org>
(the LTS version), then close and reopen the black window.

Preview before uploading:

```
node build.mjs --serve
```

Then open <http://localhost:4321> in your browser. Press Ctrl+C in the black
window to stop it.

---

## Step 3 in detail: uploading changes

1. Go to <https://github.com/md-sazzad-eee/md-sazzad-eee.github.io>
2. Click **Add file**, then **Upload files**.
3. Drag in only the files that changed (see each recipe below for which).
4. Type a short message like `Add TENSYMP DOI` and click **Commit changes**.

Uploading a file that already exists replaces it. That is exactly what you want.

Your site updates within a minute or two. If you do not see the change, hard
refresh with **Ctrl+Shift+R**, or open the site in a private window. Browsers
cache the page for 10 minutes.

**Shortcut:** if you changed content but not the design, only the HTML changed.
Re-upload `index.html` and the folders whose pages changed. When unsure,
re-upload everything in `dist/`. It is never wrong, only slower.

---

# Recipes

## Add a publication

Open `src/data/site.mjs`, find `export const publications = [`, and paste a new
block just after that line so it appears first.

```js
  {
    id: 'short-unique-id',              // lowercase, no spaces, used in the URL
    title: 'The Full Paper Title Exactly As Published',
    authors: ['First Author', 'Md Sazzad Hossain', 'Third Author'],
    authorLine: 'Second author',
    venue: 'Full Conference or Journal Name (ABBREV)',
    venueShort: 'ABBREV',
    year: 2027,
    date: '2027-03-15',                 // YYYY-MM-DD, used for sorting
    dateLabel: '15 to 17 March 2027',
    place: 'City, Country',
    type: 'conference',                 // conference | journal | chapter | preprint
    status: 'presented',                // presented | accepted | published | under-review
    area: 'Digital twins',              // must match an existing area to reuse the icon
    doi: '10.1109/EXAMPLE.2027.123456', // leave '' if not yet assigned
    url: '',
    abstract: 'Paste the real published abstract here.',
    bibtex: `@inproceedings{hossain2027key,
  title     = {The Full Paper Title},
  author    = {Hossain, Md. Sazzad},
  booktitle = {Proceedings Name},
  year      = {2027}
}`,
  },
```

Then `node build.mjs` and upload `index.html`, `publications/`, `sitemap/`,
`sitemap.xml`, and `rss.xml`.

**Notes**

- Add a `doi` and the DOI button appears automatically, and the title becomes a
  clickable link. No other change needed.
- Existing `area` values are: `Digital twins`, `Power systems`, `Photovoltaics`,
  `Embedded systems`. A new area still works, it just gets the default icon.
- Remember the comma after the closing `}`.

## Fill in the two placeholder abstracts

Find `abstract:` inside the `tensymp2026-digitaltwin` and `tencon2026-greybox`
entries. Replace the text with the real abstract, then **delete the line**:

```js
    abstractPlaceholder: true,
```

That line is what prints the "Placeholder" note under the abstract.

## Add your Scholar, ORCID, or ResearchGate links

In `site.profiles`, replace the empty quotes:

```js
  profiles: {
    googleScholar: 'https://scholar.google.com/citations?user=YOUR_ID',
    orcid: 'https://orcid.org/0000-0000-0000-0000',
    researchGate: 'https://www.researchgate.net/profile/YOUR_PROFILE',
    linkedin: 'https://www.linkedin.com/in/md-sazzad-eee',
    github: 'https://github.com/md-sazzad-eee',
  },
```

Empty entries show as greyed-out "link coming soon". Filled ones become working
links in the footer, on Contact, and in your Schema.org profile data, which is
what Google reads to connect your site to your publications.

Rebuild and upload everything, since the footer appears on all pages.

## Turn on the contact form

Right now the form validates input and then opens the visitor's email client.
To make it send properly:

1. Go to <https://web3forms.com>, enter `md.sazzad.eee@gmail.com`, get your key.
2. In `site.mjs`:

```js
  web3formsKey: 'paste-your-key-here',
```

3. Rebuild, upload `contact/`.
4. **Send yourself a test message** and confirm it arrives.

## Post a news update

At the top of `export const news = [`:

```js
  {
    date: '2027-01-20',
    title: 'Short headline',
    body: 'One or two sentences.',
  },
```

Newest first. This also feeds `rss.xml`. Upload `index.html`, `news/`, `rss.xml`.

## Update your CV PDF

1. Put the new PDF in `public/cv/`, named exactly `Md-Sazzad-Hossain-CV.pdf`,
   replacing the old one.
2. Keep it **under 500 KB**. If it is larger, compress at
   <https://www.ilovepdf.com/compress_pdf>.
3. In `site.mjs`, update `cv.primary.updated` to the current month.
4. Rebuild, upload `cv/` and `index.html`.

If you rename the file, also update `file:` and `download:` in `site.cv`.

## Add or edit a research project

In `export const projects = [`:

```js
  {
    id: 'project-slug',
    title: 'Project title',
    period: '2027 to present',
    status: 'Ongoing',
    area: 'Digital twins',
    summary: 'One paragraph explaining what it is and why it matters.',
    points: ['First thing you did.', 'Second thing.', 'Third thing.'],
    collaborators: 'Names or group',
    funding: 'Unfunded, or the grant name',
    outputs: [{ label: 'Paper name', href: '/publications/#paper-id' }],
  },
```

To give it a custom icon, add its `id` to `projectIcon` in
`src/templates/graphics.mjs`. Available icons: `inverter`, `solar`, `grid`,
`waveform`, `twin`, `network`, `scope`, `transformer`, `chip`, `nodes`,
`reliability`, `optimize`, `meter`, `plug`, `sensor`, `layers`.

## Change bio, education, skills, awards, teaching

All in the `about` and `teaching` objects in `site.mjs`. The field names say
what they are. Rebuild and upload the affected page folder.

## Change the colours

In `src/styles/main.css`, the top block holds light theme colours and the
`[data-theme='dark']` block holds dark. **Change the same value in both the
dark block and the `@media (prefers-color-scheme: dark)` block below it**, or
the two dark modes will disagree.

If you change a text or accent colour, check contrast at
<https://webaim.org/resources/contrastchecker/>. Body text needs **4.5:1**
against its background. This is the one edit that can quietly break
accessibility, so verify rather than eyeball it.

Rebuild and upload everything, plus `css/main.css`.

## Turn off the cursor effect or animations

In `public/js/effects.js`, line 12, change:

```js
  var enhance = finePointer && !reduced;
```

to:

```js
  var enhance = false;
```

That disables the cursor trail, magnetic buttons, and card tilt in one line.
Scroll reveal and counting metrics keep working. Upload `js/effects.js`.

---

## House rules

**No em dashes or en dashes** anywhere in visible text. Use commas, colons, full
stops, or the word "to" for ranges. Written at the top of `site.mjs` so it
survives.

**American spelling** throughout, matching the positions you are applying to:
optimization, modeling, modernization.

**Keep pages under 50 KB.** The build warns you if a page goes over. If it does,
the usual cause is too much content on the homepage: reduce the number of
interest cards shown by changing `.slice(0, 3)` in `src/templates/pages.mjs`.

**Do not upload anything outside `dist/`** to GitHub. Not `CV/`, not `src/`, not
these markdown files. Your original CV PDFs in `CV/` contain your passport and
national ID numbers, and the repository is public.

---

## When something breaks

**The build prints a red error.** Almost always a missing comma or an unclosed
quote in `site.mjs`. The error names the line. Check the line above it too.

**Site looks unstyled after upload.** `css/main.css` did not upload. Check the
repository has a `css` folder with `main.css` inside.

**Changes are not showing.** Ctrl+Shift+R, or wait 10 minutes for the cache.

**A page 404s.** The folder did not upload. GitHub's file picker cannot take
folders, you have to drag them.

**You broke something and want to go back.** Every commit is saved. Go to your
repository, click **Commits**, find a working version, and restore from there.
Nothing you do is permanent.

---

## Checking your work

Before a PhD application deadline, check:

- The site loads at <https://md-sazzad-eee.github.io>
- Every nav link works
- The CV downloads and is the current version
- Publication list is up to date, DOIs resolve
- Contact form sends a real test message
- It looks right on your phone
- Lighthouse: Chrome, F12, Lighthouse tab, Mobile, Analyze. Target 95+.
- Paste your URL into <https://www.linkedin.com/post-inspector/> to check the
  preview card shows your photo and name

---

## File layout

```
build.mjs               the generator: run this to build
src/data/site.mjs       ← all your content lives here
src/templates/
  pages.mjs             page structure
  helpers.mjs           escaping, dates, interface icons
  graphics.mjs          EEE icons, hero diagram, icon assignments
src/styles/main.css     all styling and design tokens
public/                 copied as-is into dist/
  js/                   site.js, effects.js, publications.js, contact.js, cv.js
  img/                  portraits and PWA icons
  cv/                   CV PDFs
dist/                   BUILD OUTPUT, upload this, never edit it
CV/                     your original files, never uploaded
```
