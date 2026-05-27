# VivekBindraNews.com — Complete SEO & Content Implementation Guide
> Hand this file to Cursor. Everything needed to implement the full Google News & SEO strategy is here.

---

## Project Overview

**Website:** https://www.vivekbindranews.com  
**Goal:** Rank on Google Search, appear in Google News Top Stories, and dominate "Vivek Bindra" related keyword searches.  
**Timeline:** 90 days to meaningful organic traffic  
**Tech stack assumed:** WordPress (or any CMS) + standard HTML/PHP

---

## Folder Structure of This Package

```
vivekbindranews-seo/
├── README.md                          ← You are here (give this to Cursor)
├── checklists/
│   ├── week1-technical-checklist.md   ← All technical tasks with exact code
│   ├── week2-onpage-checklist.md      ← On-page SEO for every article
│   └── google-news-checklist.md      ← Google News qualification checklist
├── schema/
│   ├── article-schema.json            ← JSON-LD template for every article
│   ├── organization-schema.json       ← Site-wide organization schema
│   └── breadcrumb-schema.json         ← Breadcrumb schema template
├── sitemaps/
│   ├── news-sitemap-template.xml      ← Google News XML sitemap template
│   └── sitemap-instructions.md        ← How to configure & auto-generate
└── articles/
    ├── 01-branded-factory-vadodara.md
    ├── 02-supreme-court-clean-chit.md
    ├── 03-vivek-bindra-net-worth-2026.md
    ├── 04-bada-business-complete-guide.md
    ├── 05-lfp-plus-program-review.md
    ├── 06-10-business-lessons-2026.md
    ├── 07-bada-business-success-stories.md
    ├── 08-vivek-bindra-youtube-journey.md
    ├── 09-msme-growth-india-2026.md
    └── 10-entrepreneur-news-india-may-2026.md
```

---

## Week-by-Week Implementation Plan

### Week 1 (Days 1–7): Technical Foundation
**Priority: HIGH — Do this before publishing any articles**

- [ ] Implement Article JSON-LD schema on all posts → `schema/article-schema.json`
- [ ] Implement Organization schema in site `<head>` → `schema/organization-schema.json`
- [ ] Create Google News XML sitemap → `sitemaps/news-sitemap-template.xml`
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Publisher Center at publishercenter.google.com
- [ ] Verify site in Google Search Console (DNS or HTML tag method)
- [ ] Add author bio pages (minimum: photo, name, designation, short bio)
- [ ] Create/update: About Us, Contact, Privacy Policy pages
- [ ] Check mobile responsiveness (Google News requires it)
- [ ] Ensure page speed score > 70 on PageSpeed Insights
- [ ] See full details → `checklists/week1-technical-checklist.md`

### Week 2 (Days 8–14): Content Blitz — Publish First 5 Articles
**Priority: HIGH — Publish in this exact order for maximum search impact**

| Day | Article | Target Keyword | File |
|-----|---------|----------------|------|
| Day 8 | Branded Factory Vadodara Launch | vivek bindra branded factory 2026 | articles/01 |
| Day 9 | Supreme Court Clean Chit | bada business supreme court | articles/02 |
| Day 10 | Vivek Bindra Net Worth 2026 | vivek bindra net worth 2026 | articles/03 |
| Day 11 | Bada Business Complete Guide | what is bada business | articles/04 |
| Day 12 | LFP Plus Program Review | bada business lfp plus review | articles/05 |

### Week 3 (Days 15–21): Content Continues + Backlink Push
**Priority: MEDIUM**

| Day | Article | Target Keyword | File |
|-----|---------|----------------|------|
| Day 15 | 10 Business Lessons 2026 | vivek bindra business lessons | articles/06 |
| Day 16 | Bada Business Success Stories | bada business success stories | articles/07 |
| Day 17 | Vivek Bindra YouTube Journey | vivek bindra youtube | articles/08 |
| Day 19 | MSME Growth India 2026 | msme growth india 2026 | articles/09 |
| Day 21 | Entrepreneur News India May 2026 | entrepreneur news india | articles/10 |

### Week 4 (Days 22–30): Distribution & Backlinks
- [ ] Share all 10 articles on LinkedIn, Twitter/X, Quora
- [ ] Answer 5 Quora questions about Vivek Bindra / Bada Business with article links
- [ ] Submit site to: Feedspot India Business, AllTop, Startup India resources
- [ ] Set up Google Alerts for "vivek bindra" — respond within 2 hours of breaking news
- [ ] Reach out to 5 Indian business blogs for guest posts

---

## Critical Rules for Every Article

1. **Minimum 800 words** for news articles, **1500+ words** for guides
2. **Named author** on every post — never "Admin" or "Staff"
3. **Real publication date** — never fake or backdate
4. **H1 contains primary keyword** — only one H1 per page
5. **At least 2 internal links** per article
6. **Featured image**: 1200×628px minimum, descriptive alt text with keyword
7. **Article schema** added to every post (see `schema/article-schema.json`)
8. **No duplicate content** — every article must be 100% original

---

## Google News Indexing Triggers (Do All of These)

Google does not need manual application — it algorithmically detects qualifying sites. To trigger inclusion:

1. **Google News sitemap** submitted and live
2. **Article schema** on all posts with `datePublished`
3. **Author bylines** visible on page (not just in schema)
4. **Original, timely news** published at least 3×/week
5. **Site verified** in Google Search Console
6. **Publisher Center** account created and linked to Search Console
7. **About page** with editorial team details
8. **No thin content** — every page > 400 words

---

## Keyword Priority Matrix

| Keyword | Monthly Searches | Difficulty | Target Article |
|---------|-----------------|------------|----------------|
| vivek bindra | 300K+ | Very Hard | Long-term |
| vivek bindra news | 40K–60K | Hard | Homepage + articles/01 |
| bada business news | 10K–20K | Medium | articles/04 |
| dr vivek bindra latest | 8K–15K | Medium | articles/01 |
| vivek bindra 2026 | 5K–10K | Easier | articles/01 |
| vivek bindra net worth 2026 | 2K | Easy | articles/03 |
| bada business lfp plus | 1K | Easy | articles/05 |
| vivek bindra branded factory 2026 | Trending | Very Easy | articles/01 |
| bada business supreme court | Trending | Very Easy | articles/02 |

---

## Internal Linking Map

Build these link clusters so Google understands topical authority:

```
Homepage
├── /vivek-bindra-news/ (category)
│   ├── Article 01 (Branded Factory) → links to: 02, 03, 04
│   ├── Article 02 (Supreme Court) → links to: 01, 03, 08
│   └── Article 03 (Net Worth) → links to: 04, 05, 08
├── /bada-business/ (category)
│   ├── Article 04 (Complete Guide) → links to: 05, 06, 07
│   ├── Article 05 (LFP Plus) → links to: 04, 07
│   └── Article 07 (Success Stories) → links to: 04, 05, 09
└── /entrepreneur-news/ (category)
    ├── Article 06 (Business Lessons) → links to: 04, 08
    ├── Article 09 (MSME Growth) → links to: 04, 10
    └── Article 10 (Entrepreneur News) → links to: 06, 09
```

---

## Pages That Must Exist Before Google News Review

| Page | URL | Status |
|------|-----|--------|
| Homepage | / | ✅ Live |
| About Us | /about/ | ⚠️ Needs editorial team info |
| Contact | /contact/ | ⚠️ Must have real email |
| Privacy Policy | /privacy-policy/ | ⚠️ Must exist |
| Author: [Name] | /author/[name]/ | ❌ Create immediately |
| Sitemap | /sitemap.xml | ⚠️ Submit to GSC |
| News Sitemap | /news-sitemap.xml | ❌ Create immediately |

---

*Last updated: May 2026 | Package version: 1.0*
