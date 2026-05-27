# Image guide — Vivek Bindra News

How to add or change images on **cards**, **articles**, and **web stories**.

---

## 1. Put your file in the `images` folder

```
D:\BADA BUSINESS NEWS WEBSITE\images\
```

**Recommended:** 1200 × 675 px (16:9), PNG or WebP, under ~400 KB.

**Filename rules:** lowercase, hyphens, no spaces — e.g. `my-new-story.png`

---

## 2. Register the image (one place)

Open **`js/images.js`** and add or edit an entry in `CATALOG`:

```javascript
myNewStory: {
  file: "my-new-story.png",   // exact filename in /images/
  width: 1200,
  height: 675,
  alt: "Short description for Google and screen readers — include topic + India/business context",
},
```

| Field | Purpose |
|--------|---------|
| `file` | Filename only (not full path) |
| `width` / `height` | Real size of image (reduces layout jump) |
| `alt` | SEO + accessibility (describe the image, don’t keyword-stuff) |

### Built-in keys (ready to use)

| Key | File | Use for |
|-----|------|---------|
| `vivekBindraNews` | `vivek-bindra-news.png` | Vivek Bindra articles / category |
| `vivekBindraLatest` | `vivek-bindra-latest.png` | Latest updates article |
| `startup` | `startup.png` | Startup news |
| `business` | `business.png` | General business / leadership |
| `entrepreneur` | `enterpreneur-new.png` | Entrepreneur news |
| `webStoryVivek` | `vivek-bindra-news-web-story.png` | Vivek Bindra web story |
| `webStoryGrowth` | `entrepreneurship-growth.png` | Entrepreneurship web story |

---

## 3. Use on a **card** (easiest)

Add `data-img` with your catalog key:

```html
<article class="card news-card">
  <a href="your-page/" class="card__image-link">
    <div class="card__media" data-img="vivekBindraNews"></div>
  </a>
  <div class="card__body">
    <span class="card__category">Category</span>
    <h3 class="card__title"><a href="your-page/">Headline</a></h3>
    <p class="card__excerpt">Short summary.</p>
  </div>
</article>
```

**Important:** The page must load these scripts (in order):

```html
<script src="js/components.js"></script>
<script src="js/images.js"></script>
<script src="js/main.js"></script>
```

Subfolders use `../js/...` (e.g. `vivek-bindra-news/index.html`).

Optional attributes:

```html
<!-- Default: image fills the card (cover) -->
<div class="card__media" data-img="vivekBindraNews" data-img-fit="cover"></div>

<!-- Show full image with letterboxing (rare) -->
<div class="card__media" data-img="startup" data-img-fit="contain"></div>

<!-- First image on page (loads faster) -->
<div class="card__media" data-img="vivekBindraNews" data-img-priority="high"></div>
```

---

## 4. Use on a **web story** slide

Add `data-img` and `data-img-mode="bg"` on the slide:

```html
<div class="web-story__slide is-active"
     style="--slide-bg: linear-gradient(160deg, #051d3b, #0a2d52);"
     data-img="webStoryVivek"
     data-img-mode="bg">
  <h2 class="web-story__headline">Your headline</h2>
  <p class="web-story__text">Your text</p>
</div>
```

Register poster image in `js/images.js`, then set **Open Graph** in the web story `<head>`:

```html
<meta property="og:image" content="https://vivekbindranews.com/images/vivek-bindra-news-web-story.png">
```

---

## 5. Manual image (no JavaScript)

You can still use a normal `<img>` tag anywhere:

```html
<div class="card__media">
  <img src="images/startup.png"
       alt="Startup news India — funding and founder stories"
       width="1200"
       height="675"
       loading="lazy"
       decoding="async">
</div>
```

**Root pages:** `src="images/..."`  
**One folder deep:** `src="../images/..."`  
**Web stories:** `src="../../images/..."`

---

## 6. Article hero image

```html
<figure class="article-hero-image">
  <img src="../images/vivek-bindra-latest.png"
       alt="Vivek Bindra News latest updates 2026"
       width="1200"
       height="675"
       loading="eager"
       fetchpriority="high"
       class="article-hero-image__img">
</figure>
```

---

## 7. Social preview (Facebook / WhatsApp)

In the page `<head>`:

```html
<meta property="og:image" content="https://vivekbindranews.com/images/your-file.png">
<meta property="og:image:alt" content="Same idea as alt text">
```

---

## Quick checklist

- [ ] File saved in `/images/`
- [ ] Entry added in `js/images.js` → `CATALOG`
- [ ] HTML uses `data-img="yourKey"` OR manual `<img>`
- [ ] `alt` text is descriptive
- [ ] Scripts include `images.js` on that page
- [ ] Hard refresh browser (Ctrl+F5) after changes

---

## Live news on homepage

Headlines load from **Google News RSS** (no key required). To use **GNews** with better images, edit `js/news-feed-config.js`:

```javascript
gnewsApiKey: "YOUR_KEY_FROM_https://gnews.io/",
```

Categories: Business, Startups, Entrepreneurs, Technology, Leadership.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Broken image | `file` in `images.js` must match real filename exactly |
| Blank card box | Unknown `data-img` key — check browser console |
| Old image still shows | Ctrl+F5 or clear cache |
| Works on live site but not locally | Open site via a local server, not `file://` |

---

## Design note

The site uses **BBC-style** layout CSS in `css/bbc-news.css` (loaded from `main.css`). Cards use class `news-card` for the news-tile look.
