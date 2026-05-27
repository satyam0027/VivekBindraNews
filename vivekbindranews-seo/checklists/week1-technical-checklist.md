# Week 1 Technical Checklist
**Complete all tasks before publishing any articles**  
**Deadline: Day 7**

---

## ✅ Task 1 — Verify Site in Google Search Console
**Priority: CRITICAL | Time: 15 min**

1. Go to https://search.google.com/search-console
2. Click "Add Property" → choose "Domain" type
3. Enter: `vivekbindranews.com`
4. Copy the DNS TXT record Google gives you
5. Add it to your domain DNS settings (in GoDaddy / Namecheap / Hostinger)
6. Click "Verify"
7. Submit your sitemap: `https://vivekbindranews.com/sitemap.xml`

> ⚠️ Without Search Console verification, Google News Publisher Center cannot be linked.

---

## ✅ Task 2 — Create Google Publisher Center Account
**Priority: CRITICAL | Time: 20 min**

1. Go to https://publishercenter.google.com
2. Sign in with your Google account
3. Click **"Add Publication"**
4. Fill in:
   - Publication name: `Vivek Bindra News`
   - Website URL: `https://www.vivekbindranews.com`
   - Country: `India`
   - Language: `English`
   - Category: `Business & Finance`
5. Click "Add Publication"
6. Go to **Publication Settings** → scroll to "Primary website property URL"
7. Click **"Verify in Search Console"**
8. Go to **Google News brand and customisation** tab:
   - Upload your logo (400×100px recommended)
   - Set brand color
   - Add sections: Vivek Bindra News, Startup News, Entrepreneur News, Leadership

---

## ✅ Task 3 — Install Article Schema on Every Post
**Priority: CRITICAL | Time: 30 min**

Add this to your WordPress theme's `functions.php` OR use the **Rank Math** / **Yoast SEO** plugin.

**If using WordPress (add to functions.php):**

```php
function add_article_schema() {
    if (is_single()) {
        global $post;
        $author = get_the_author_meta('display_name', $post->post_author);
        $author_url = get_author_posts_url($post->post_author);
        $image = get_the_post_thumbnail_url($post->ID, 'full');
        $schema = array(
            "@context" => "https://schema.org",
            "@type" => "NewsArticle",
            "headline" => get_the_title(),
            "description" => get_the_excerpt(),
            "image" => $image ? array($image) : array(),
            "datePublished" => get_the_date('c'),
            "dateModified" => get_the_modified_date('c'),
            "author" => array(
                "@type" => "Person",
                "name" => $author,
                "url" => $author_url
            ),
            "publisher" => array(
                "@type" => "Organization",
                "name" => "Vivek Bindra News",
                "url" => "https://www.vivekbindranews.com",
                "logo" => array(
                    "@type" => "ImageObject",
                    "url" => "https://www.vivekbindranews.com/wp-content/uploads/logo.png",
                    "width" => 400,
                    "height" => 100
                )
            ),
            "mainEntityOfPage" => array(
                "@type" => "WebPage",
                "@id" => get_permalink()
            )
        );
        echo '<script type="application/ld+json">' . json_encode($schema) . '</script>';
    }
}
add_action('wp_head', 'add_article_schema');
```

**If using Rank Math (easier):**
1. Install Rank Math plugin
2. Go to Rank Math → Schema → Article
3. Set Schema type to **NewsArticle** for all posts
4. Enable "Author", "Publisher", "datePublished", "dateModified"

---

## ✅ Task 4 — Add Organization Schema to Site Header
**Priority: HIGH | Time: 15 min**

Add once in `<head>` section (via header.php or header script injection):

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "NewsMediaOrganization",
  "name": "Vivek Bindra News",
  "alternateName": "VivekBindraNews",
  "url": "https://www.vivekbindranews.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.vivekbindranews.com/wp-content/uploads/logo.png",
    "width": 400,
    "height": 100
  },
  "sameAs": [
    "https://twitter.com/vivekbindranews",
    "https://www.linkedin.com/company/vivekbindranews"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "contact@vivekbindranews.com",
    "contactType": "editorial"
  },
  "foundingDate": "2026",
  "description": "India's growing digital business news platform focused on entrepreneurship, startup culture, and leadership development."
}
</script>
```

---

## ✅ Task 5 — Create Google News XML Sitemap
**Priority: CRITICAL | Time: 20 min**

See full template in `sitemaps/news-sitemap-template.xml`.

**If using WordPress + Rank Math:**
1. Go to Rank Math → Sitemap Settings
2. Enable **News Sitemap**
3. Submit URL `https://vivekbindranews.com/news-sitemap.xml` to Google Search Console

**If using Yoast SEO:**
1. Go to Yoast → General → Features
2. Enable "XML sitemaps"
3. Go to Yoast → Search Appearance → Content Types → Posts → enable in sitemap
4. The news sitemap auto-generates at `https://vivekbindranews.com/news-sitemap.xml`

**Manual XML (if no plugin):**
See `sitemaps/news-sitemap-template.xml` — update and upload to root of site.

---

## ✅ Task 6 — Create Author Bio Page
**Priority: CRITICAL for Google News | Time: 30 min**

Every article must show a real author. Create at least one author with:

**Required fields:**
- Full name (e.g., Rahul Sharma)
- Profile photo (minimum 200×200px)
- Short bio: 2–3 sentences about their journalism/business background
- Designation (e.g., "Business Reporter" or "Senior Editor")

**WordPress steps:**
1. Go to Users → Add New
2. Fill: Username, Email, First/Last name, Display name
3. In "Biographical Info" paste author bio
4. Upload profile photo via a plugin like **Simple Local Avatars**
5. Assign all existing articles to this author

**Author bio page URL must be:** `https://www.vivekbindranews.com/author/[username]/`

---

## ✅ Task 7 — Create/Update Required Pages
**Priority: HIGH | Time: 45 min**

### About Us Page (`/about/`)
Must include:
- Mission statement of the publication
- Editorial team (name + photo of at least 1 person)
- Physical address or city (e.g., "Based in New Delhi, India")
- When the publication was founded

### Contact Page (`/contact/`)
Must include:
- Working email address
- Contact form (use WPForms free plugin)
- Response time expectation

### Privacy Policy (`/privacy-policy/`)
- Generate free at: https://www.privacypolicygenerator.info
- Must mention cookies, Google Analytics, data usage

---

## ✅ Task 8 — Page Speed Optimization
**Priority: MEDIUM | Time: 1 hour**

Check current speed: https://pagespeed.web.dev/  
Target: Score > 70 on Mobile, > 85 on Desktop

**Quick wins:**
1. Install **WP Rocket** or **W3 Total Cache** plugin (caching)
2. Install **Smush** or **ShortPixel** plugin (image compression)
3. In WordPress → Settings → Media: set max image size to 1200px wide
4. Use a lightweight theme (Astra, GeneratePress, or Kadence)
5. Enable GZIP compression in hosting control panel (cPanel → Optimize Website)

---

## ✅ Task 9 — Set Up Google Alerts
**Priority: HIGH | Time: 10 min**

Go to https://alerts.google.com and create alerts for:

| Alert keyword | Frequency |
|---|---|
| "Vivek Bindra" | As-it-happens |
| "Bada Business" | As-it-happens |
| "Dr Vivek Bindra" | Daily digest |
| "startup news india" | Daily digest |
| "entrepreneur india 2026" | Daily digest |

Whenever a new Vivek Bindra story breaks → write about it within 2 hours → this is how you get into Google News Top Stories.

---

## ✅ Task 10 — Add Robots.txt and Meta Robots
**Priority: MEDIUM | Time: 10 min**

Ensure your `robots.txt` at `https://vivekbindranews.com/robots.txt` includes:

```
User-agent: *
Allow: /

User-agent: Googlebot-News
Allow: /

Sitemap: https://www.vivekbindranews.com/sitemap.xml
Sitemap: https://www.vivekbindranews.com/news-sitemap.xml
```

Never block Googlebot-News — if you do, your site will never appear in Google News.

---

## Week 1 Completion Checklist

| # | Task | Done? |
|---|------|-------|
| 1 | Google Search Console verified | ☐ |
| 2 | Google Publisher Center created & linked | ☐ |
| 3 | Article schema (NewsArticle) live on all posts | ☐ |
| 4 | Organization schema in site `<head>` | ☐ |
| 5 | Google News XML sitemap submitted | ☐ |
| 6 | Author bio page created with photo | ☐ |
| 7 | About, Contact, Privacy Policy pages updated | ☐ |
| 8 | Page speed > 70 on mobile | ☐ |
| 9 | Google Alerts set up for all keywords | ☐ |
| 10 | Robots.txt allows Googlebot-News | ☐ |

**Do not publish articles until tasks 1, 2, 3, 5, and 6 are complete.**
