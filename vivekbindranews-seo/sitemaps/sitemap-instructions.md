# Google News Sitemap — Setup Instructions
## For vivekbindranews.com

---

## Option A — Using Rank Math Plugin (Recommended)

1. Install **Rank Math SEO** plugin from WordPress.org (free)
2. Go to: **Rank Math → Sitemap Settings**
3. Enable the toggle: **"News Sitemap"**
4. Set "News Categories" to include all your post categories
5. Rank Math auto-generates: `https://vivekbindranews.com/news-sitemap.xml`
6. Go to **Google Search Console → Sitemaps**
7. Submit: `https://vivekbindranews.com/news-sitemap.xml`
8. Also submit: `https://vivekbindranews.com/sitemap_index.xml`

**Done.** Rank Math automatically updates the news sitemap within minutes of each new post.

---

## Option B — Using Yoast SEO Plugin

1. Install **Yoast SEO** plugin (free version)
2. Go to: **Yoast → General → Features**
3. Ensure "XML Sitemaps" is ON
4. Go to: **Yoast → Search Appearance → Content Types**
5. Under "Posts" — ensure "Show posts in XML sitemaps" is ON
6. Yoast generates sitemaps at: `https://vivekbindranews.com/post-sitemap.xml`
7. For a News-specific sitemap, install **Yoast News SEO** (paid add-on)
   OR submit the post-sitemap.xml as your news sitemap to Search Console

---

## Option C — Manual XML Sitemap (No Plugin)

Use the template at `sitemaps/news-sitemap-template.xml`.

Steps:
1. Copy the template
2. Replace example article entries with your real published articles
3. Only include articles published in the **LAST 2 DAYS**
4. Save as `news-sitemap.xml`
5. Upload to: `https://www.vivekbindranews.com/news-sitemap.xml` (root of site)
6. Submit to Google Search Console

**You MUST update this file manually within 1 hour of publishing each new article.**
This is why using a plugin (Option A or B) is strongly recommended.

---

## Submitting to Google Search Console

1. Go to: https://search.google.com/search-console
2. Select your property: `vivekbindranews.com`
3. Left sidebar → **Sitemaps**
4. In the "Add a new sitemap" field, type: `news-sitemap.xml`
5. Click **Submit**
6. Also submit: `sitemap_index.xml` (main sitemap)

Check back in 24–48 hours — Google will show whether the sitemap was read successfully and how many URLs were indexed.

---

## Sitemap Health Checks (Do Weekly)

| Check | How |
|-------|-----|
| Sitemap accessible | Visit https://vivekbindranews.com/news-sitemap.xml in browser |
| No errors in GSC | Check Search Console → Sitemaps for red errors |
| Articles being indexed | Search Console → URL Inspection → test individual article URLs |
| News tab appearing | Search Google for your article headline — check if News tab shows your site |

---

## Common Sitemap Errors and Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| "Sitemap could not be read" | Wrong URL or file not accessible | Check file is at correct URL, no password protection |
| "URL not allowed" | Article URL doesn't match sitemap's domain | Ensure all URLs start with `https://www.vivekbindranews.com/` |
| "Last modified date in future" | System clock issue | Check server timezone — should be `Asia/Kolkata` |
| "0 URLs indexed" | Content quality issue, not technical | Review Google News content guidelines |
