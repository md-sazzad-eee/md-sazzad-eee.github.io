<?xml version="1.0" encoding="UTF-8"?>
<!-- Renders the RSS feed as a readable page when opened in a browser.
     Feed readers ignore this and read the XML as usual. -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title><xsl:value-of select="/rss/channel/title"/> · RSS feed</title>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
        <style>
          :root { --bg:#f6f8fb; --raised:#fff; --border:#ccd6e2; --text:#0b1220; --muted:#46536a; --faint:#5b6980; --accent:#0b6f8c; --soft:#ddeef4; --accent2:#8a5300; }
          @media (prefers-color-scheme: dark) { :root { --bg:#070b12; --raised:#0e1622; --border:#1e2b3d; --text:#e9f0f8; --muted:#a3b5cc; --faint:#8296b0; --accent:#3ad4ef; --soft:#0d2b38; --accent2:#f5b544; } }
          * { box-sizing: border-box; margin: 0; }
          body { font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; background: var(--bg); color: var(--text); line-height: 1.6;
                 background-image: linear-gradient(rgb(120 150 190 / .08) 1px, transparent 1px), linear-gradient(90deg, rgb(120 150 190 / .08) 1px, transparent 1px); background-size: 46px 46px; }
          .wrap { max-width: 46rem; margin: 0 auto; padding: 3rem 1rem 4rem; }
          .eyebrow { font: 600 .75rem ui-monospace, Menlo, monospace; letter-spacing: .16em; text-transform: uppercase; color: var(--accent); }
          h1 { font-size: clamp(1.8rem, 1.4rem + 2vw, 2.6rem); letter-spacing: -.02em; margin: .5rem 0 .75rem; }
          .note { padding: 1rem 1.15rem; border: 1px solid var(--border); border-radius: 12px; background: var(--raised); color: var(--muted); }
          .note code { font-family: ui-monospace, Menlo, monospace; font-size: .85em; padding: .1rem .35rem; border-radius: 5px; background: var(--soft); color: var(--accent); word-break: break-all; }
          .note strong { color: var(--text); }
          a { color: var(--accent); }
          .back { display: inline-block; margin-top: 1rem; font-weight: 600; }
          ol { list-style: none; padding: 0; margin-top: 2rem; display: grid; gap: 1rem; }
          li { position: relative; padding: 1.1rem 1.2rem 1.15rem 1.4rem; border: 1px solid var(--border); border-radius: 14px; background: var(--raised); overflow: hidden; }
          li::before { content: ""; position: absolute; inset: 0 auto 0 0; width: 3px; background: linear-gradient(180deg, var(--accent), var(--accent2)); }
          time { font: 600 .75rem ui-monospace, Menlo, monospace; letter-spacing: .06em; color: var(--accent); text-transform: uppercase; }
          h2 { font-size: 1.15rem; margin: .3rem 0 .35rem; }
          li p { color: var(--muted); font-size: .95rem; }
        </style>
      </head>
      <body>
        <main class="wrap">
          <p class="eyebrow">RSS feed</p>
          <h1><xsl:value-of select="/rss/channel/title"/></h1>
          <p class="note">
            <strong>This is a news feed.</strong> Copy this page's address,
            <code>https://md-sazzad-eee.github.io/rss.xml</code>, into a feed reader such as Feedly or NetNewsWire to get new updates automatically.
          </p>
          <a class="back" href="/news/">← Back to News &amp; updates</a>
          <ol>
            <xsl:for-each select="/rss/channel/item">
              <li>
                <time><xsl:value-of select="substring(pubDate, 6, 11)"/></time>
                <h2><xsl:value-of select="title"/></h2>
                <p><xsl:value-of select="description"/></p>
              </li>
            </xsl:for-each>
          </ol>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
