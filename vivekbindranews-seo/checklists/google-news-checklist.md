# Google News Qualification Checklist
**Complete before expecting Google News indexing**

> As of 2024, Google no longer accepts manual applications.
> Google algorithmically detects qualifying sites. This checklist ensures your site qualifies.

---

## Section 1 — Technical Requirements

| Requirement | How to Implement | Status |
|-------------|-----------------|--------|
| Google News XML sitemap | Create `/news-sitemap.xml` with last 2 days of articles | ☐ |
| Article structured data (NewsArticle schema) | JSON-LD on every post — see `schema/article-schema.json` | ☐ |
| Unique URLs for every article | No duplicate or paginated URLs for same content | ☐ |
| Mobile-responsive design | Test at https://search.google.com/test/mobile-friendly | ☐ |
| HTTPS (SSL certificate) | Must show padlock in browser — get free SSL from hosting cPanel | ☐ |
| Page loads in < 3 seconds | Test at https://pagespeed.web.dev/ | ☐ |
| No intrusive interstitials | No full-screen popups blocking content on mobile | ☐ |
| Clear publication dates on articles | Visible `datePublished` on page AND in schema | ☐ |
| Author bylines visible on page | Must be text on page, not just in schema | ☐ |
| Site verified in Google Search Console | Verify domain at https://search.google.com/search-console | ☐ |
| Publisher Center account created | Create at https://publishercenter.google.com | ☐ |

---

## Section 2 — Editorial Requirements

| Requirement | Description | Status |
|-------------|-------------|--------|
| Original reporting | Articles are NOT copied from other sites — 100% unique | ☐ |
| Timely content | Articles cover recent events (within days, not weeks) | ☐ |
| Clear news angle | Each article has a newsworthy reason to exist | ☐ |
| No promotional/ad content disguised as news | Clear separation of news vs. sponsored/promotional | ☐ |
| Attribution and sourcing | Claims are attributed to named sources where relevant | ☐ |
| News vs opinion clearly labelled | Opinion pieces labelled as such | ☐ |
| No misleading headlines | Headlines accurately represent article content | ☐ |
| Consistent publishing schedule | Minimum 3 articles per week | ☐ |

---

## Section 3 — E-E-A-T Requirements (Experience, Expertise, Authority, Trust)

| Requirement | Description | Status |
|-------------|-------------|--------|
| Named authors on every article | Real person's name, not "Staff" or "Admin" | ☐ |
| Author bio pages | Each author has a page at `/author/[name]/` | ☐ |
| Author expertise shown | Bio explains why this person covers business/news | ☐ |
| About Us page | Describes the publication, its mission, editorial team | ☐ |
| Physical/editorial location | Mention city/country — "Based in New Delhi, India" | ☐ |
| Contact information | Working email + contact form | ☐ |
| Privacy Policy | Must exist and mention data collection practices | ☐ |
| Corrections policy | State how errors are corrected (can be brief) | ☐ |

---

## Section 4 — Content Quality Rules

| Rule | What It Means |
|------|---------------|
| ❌ No AI-generated filler | Generic paragraphs like "Vivek Bindra is a famous motivational speaker..." will not rank |
| ❌ No keyword stuffing | Don't repeat "Vivek Bindra" in every sentence |
| ❌ No duplicate content | Don't publish the same article with different titles |
| ❌ No clickbait | "You won't believe what Vivek Bindra did..." type headlines hurt ranking |
| ✅ Specific details | Include dates, locations, amounts, names of people/companies |
| ✅ Quotes where possible | Quote from press releases, speeches, interviews |
| ✅ Context | Explain WHY the news matters to entrepreneurs/readers |
| ✅ Fresh angles | Each article covers one unique angle, not generic summaries |

---

## Section 5 — News Sitemap Format Check

Your news sitemap should look like this (see `sitemaps/news-sitemap-template.xml`):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  <url>
    <loc>https://www.vivekbindranews.com/article-url/</loc>
    <news:news>
      <news:publication>
        <news:name>Vivek Bindra News</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>2026-05-26T10:00:00+05:30</news:publication_date>
      <news:title>Your Article Title Here</news:title>
    </news:news>
  </url>
</urlset>
```

Rules:
- Only include articles published in the **last 2 days**
- Update sitemap within **1 hour** of publishing new article
- Maximum 1,000 URLs per news sitemap file

---

## Section 6 — How to Know If Google News Is Indexing You

**Check 1 — Google News Search:**
Go to https://news.google.com and search: `site:vivekbindranews.com`
If articles appear → you're indexed ✅

**Check 2 — Google Search Console:**
Go to Search Console → Performance → Change "Search type" from "Web" to **"News"**
If impressions appear → Google News is seeing your articles ✅

**Check 3 — Google Search with news filter:**
Search Google: `vivekbindranews.com` then click the **News** tab
If articles appear → indexed ✅

**Timeline expectation:**
- Technical setup done → 2–4 weeks for first indexing signal
- Consistent publishing → 4–8 weeks for regular News tab appearance
- Top Stories carousel → 8–16 weeks (requires high CTR and authority)

---

## Common Rejection Reasons (Avoid These)

| Reason | Fix |
|--------|-----|
| No author bylines | Add named authors immediately |
| Thin content (< 400 words) | Every article minimum 800 words |
| No About page | Create detailed About page |
| Copied/aggregated content | Only publish 100% original reporting |
| Slow page speed | Fix to > 70 on PageSpeed Insights |
| No news sitemap | Create and submit news-sitemap.xml |
| Missing Article schema | Add NewsArticle JSON-LD to all posts |
| Site not verified in Search Console | Complete GSC verification |
