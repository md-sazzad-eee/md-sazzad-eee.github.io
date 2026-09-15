# Publishing this site on GitHub Pages

Free, permanent, and gives you a URL like `https://sazzadhossain.github.io` that
you can put on a CV or a PhD application.

No command line needed. You will upload files through the GitHub website.

Total time: about 20 minutes.

---

## Step 1. Create a GitHub account

1. Go to <https://github.com/signup>.
2. Enter your email. Use `md.sazzad.eee@gmail.com` so it matches your CV and papers.
3. Create a password and solve the puzzle it gives you.
4. **Choose your username carefully.** This becomes part of your website address
   forever, and changing it later breaks every link you have shared.

   Good choices for you:

   - `sazzadhossain`
   - `mdsazzadhossain`
   - `sazzad-hossain-eee`

   Avoid nicknames, numbers, and anything you would be embarrassed to write on a
   PhD application. A supervisor will see this URL.

5. Verify the code sent to your email.
6. When it asks about a plan, choose **Free**. Everything here works on the free tier.

Write your username down. The rest of this guide calls it `USERNAME`.

---

## Step 2. Tell me your username so I can rebuild

**Do this before uploading anything.**

The site needs to know its own address for canonical URLs, the sitemap, and the
link previews that appear when someone shares your site on LinkedIn. Right now
`site.url` in `src/data/site.mjs` is a placeholder.

Either tell me your username and I will update and rebuild it, or do it yourself:

1. Open `src/data/site.mjs`.
2. Change the `url` line near the top to your real address:

   ```js
   url: 'https://USERNAME.github.io',
   ```

3. Run `node build.mjs` again.

If you skip this, the site still works, but search engines and social previews
will point at the wrong domain.

---

## Step 3. Create the repository

**The name matters more than anything else in this guide.**

1. Go to <https://github.com/new>.
2. In **Repository name**, type exactly: `USERNAME.github.io`

   Replace `USERNAME` with your actual username, including the `.github.io` part.
   If your username is `sazzadhossain`, the repository name is
   `sazzadhossain.github.io`.

3. Set it to **Public**. GitHub Pages needs public repositories on the free plan.
4. Leave "Add a README file" unchecked.
5. Click **Create repository**.

### Why the name matters

A repository named `USERNAME.github.io` is served at `https://USERNAME.github.io`.

Any other name, say `portfolio`, is served at `https://USERNAME.github.io/portfolio/`,
with the extra folder in the path. This site uses absolute paths internally, so
every stylesheet, image, and PDF link would break. If you have already made a
repository with the wrong name, delete it and make a new one rather than trying
to work around it.

---

## Step 4. Upload the site

You are uploading the **contents of the `dist` folder**, not the folder itself.

1. On your new empty repository page, click **uploading an existing file**
   (it is in the line "quick setup" near the top).
2. Open the `dist` folder on your computer.
3. Select everything inside it: `index.html`, the `about`, `publications`,
   `research`, `teaching`, `news`, `cv`, `contact`, `sitemap`, `404` folders,
   plus `css`, `img`, `js`, `favicon.svg`, `robots.txt`, `rss.xml`,
   `sitemap.xml`, `site.webmanifest`, and `404.html`.
4. Drag them all onto the upload area.
5. Wait for every file to finish uploading. There are about 30, and the PDFs are
   the slowest.
6. In the "Commit changes" box at the bottom, type `Publish site`.
7. Click **Commit changes**.

### About the hidden `.nojekyll` file

The build creates a file called `.nojekyll`. Files starting with a dot are hidden
by default, so your file manager may not show it, and it may not get uploaded.

It stops GitHub from running an old blog engine over your files. This site does
not need that protection, so if it is missing, do not worry. If you want it
anyway: on GitHub click **Add file**, then **Create new file**, type `.nojekyll`
as the name, leave the contents empty, and commit.

---

## Step 5. Turn on GitHub Pages

1. In your repository, click **Settings** (the tab along the top, on the right).
2. In the left sidebar, under "Code and automation", click **Pages**.
3. Under "Build and deployment", set **Source** to **Deploy from a branch**.
4. Set the branch to **main** and the folder to **/ (root)**.
5. Click **Save**.

Now wait. The first build takes two to ten minutes. Refresh the Pages settings
screen until a green banner appears with your live address.

Visit `https://USERNAME.github.io`.

---

## Step 6. Check it worked

Open your live site and confirm:

- The homepage loads with your photo and styling. If you get plain unstyled text,
  the repository name is probably wrong. Go back to Step 3.
- Click through every page in the menu.
- Click **Download CV** and check the PDF downloads.
- Try the dark and light toggle.
- Open it on your phone.

Wait five minutes and hard refresh (`Ctrl+Shift+R`) if something looks stale.
Browsers cache aggressively.

---

## Updating the site later

Whenever you add a publication, a news item, or fix a typo:

1. Edit `src/data/site.mjs` on your computer.
2. Run `node build.mjs`.
3. Go to your repository on GitHub, click **Add file**, then **Upload files**,
   and drag in the changed files from `dist`. Uploading a file that already
   exists replaces it.
4. Commit.

Your live site updates within a minute or two.

If you find yourself doing this often, it is worth learning `git push`, which
turns all of step 3 into one command. Ask me when you get to that point.

---

## Optional: your own domain name

A domain like `sazzadhossain.com` costs roughly 10 to 15 US dollars a year and
looks better on an application than a `github.io` address. GitHub Pages supports
custom domains for free; you only pay the domain registrar.

If you buy one, tell me and I will walk you through pointing it at your site and
updating `site.url` to match.

---

## If something goes wrong

**Site shows a 404 page.** Pages is not enabled yet, or the first build has not
finished. Recheck Step 5 and wait a few more minutes.

**Site loads but has no styling or images.** Almost always the repository name.
It must be exactly `USERNAME.github.io`.

**Only a README appears.** You uploaded the `dist` folder itself instead of its
contents, so `index.html` is one level too deep. GitHub needs `index.html` at the
top level of the repository.

**Changes are not showing.** Hard refresh with `Ctrl+Shift+R`, or open the site
in a private window.

---

Sources: [Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site),
[Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
