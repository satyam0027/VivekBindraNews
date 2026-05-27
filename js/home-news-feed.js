/**
 * Live news feed — GNews API (optional) or Google News RSS fallback.
 * Home & news hub: category tabs. Subpages: single category from data-feed-default / subpage map.
 */
(function () {
  const CONFIG = window.NEWS_FEED_CONFIG || { categories: [], gnewsApiKey: "", maxPerCategory: 6 };
  const PLACEHOLDER_IMG = {
    business: "images/business.png",
    startup: "images/startup.png",
    entrepreneur: "images/enterpreneur-new.png",
    vivekBindraNews: "images/vivek-bindra-news.png",
  };
  const MRSS_NS = "http://search.yahoo.com/mrss/";

  function escapeHtml(str) {
    const d = document.createElement("div");
    d.textContent = str || "";
    return d.innerHTML;
  }

  function decodeHtmlEntities(str) {
    const d = document.createElement("textarea");
    d.innerHTML = str || "";
    return d.value;
  }

  function stripHtml(html) {
    const d = document.createElement("div");
    d.innerHTML = html || "";
    return (d.textContent || "").trim().slice(0, 160);
  }

  function imageFromDescription(html) {
    if (!html) return "";
    const decoded = decodeHtmlEntities(html);
    const src = decoded.match(/src=["']([^"']+)["']/i);
    return src ? src[1] : "";
  }

  function formatDate(str) {
    if (!str) return "";
    const d = new Date(str);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  }

  function isValidImageUrl(url) {
    if (!url || typeof url !== "string") return false;
    const u = url.trim();
    if (!/^https?:\/\//i.test(u)) return false;
    if (/\.(svg|ico)(\?|$)/i.test(u)) return false;
    if (/favicon|logo\.(png|gif)/i.test(u) && !/og|article|thumb|media|photo/i.test(u)) return false;
    return true;
  }

  /** Proxy external images so hotlink / referrer blocks don't break thumbnails */
  function proxyImageUrl(url) {
    if (!isValidImageUrl(url)) return "";
    try {
      const parsed = new URL(url);
      if (parsed.origin === window.location.origin) return url;
      const hostPath = parsed.host + parsed.pathname + parsed.search;
      return "https://images.weserv.nl/?url=" + encodeURIComponent(hostPath) + "&w=800&h=450&fit=cover&we";
    } catch (e) {
      return url;
    }
  }

  function resolveDisplayImage(article, cat) {
    const raw = (article.image || "").trim();
    if (!raw) {
      return { src: placeholderFor(cat), raw: "", proxied: false };
    }
    const proxied = proxyImageUrl(raw);
    return {
      src: proxied || raw,
      raw: raw,
      proxied: !!proxied && proxied !== raw,
    };
  }

  function isTabsMode() {
    const body = document.body;
    if (!body) return true;
    if (body.getAttribute("data-feed-mode") === "single") return false;
    if (body.getAttribute("data-feed-mode") === "tabs") return true;
    if (body.getAttribute("data-page") === "home") return true;
    if (body.getAttribute("data-news-subpage")) return false;
    if (body.getAttribute("data-page") === "news") return true;
    return true;
  }

  function resolveCategoryId() {
    const body = document.body;
    if (!body) return null;

    const feedDefault = (body.getAttribute("data-feed-default") || "").trim();
    if (feedDefault && !isTabsMode()) return feedDefault;

    const subpage = body.getAttribute("data-news-subpage");
    const map = CONFIG.subpageFeedMap || {};
    if (subpage && map[subpage]) return map[subpage];

    return null;
  }

  function findCategory(id) {
    return CONFIG.categories.find(function (c) {
      return c.id === id;
    });
  }

  async function fetchGNews(cat) {
    const key = CONFIG.gnewsApiKey;
    if (!key) return null;
    const g = cat.gnews || {};
    let url;
    if (g.category) {
      url =
        "https://gnews.io/api/v4/top-headlines?category=" +
        encodeURIComponent(g.category) +
        "&lang=en&country=" +
        encodeURIComponent(g.country || "in") +
        "&max=" +
        CONFIG.maxPerCategory +
        "&apikey=" +
        encodeURIComponent(key);
    } else {
      url =
        "https://gnews.io/api/v4/search?q=" +
        encodeURIComponent(g.q || "business india") +
        "&lang=en&max=" +
        CONFIG.maxPerCategory +
        "&apikey=" +
        encodeURIComponent(key);
    }
    const res = await fetch(url);
    if (!res.ok) throw new Error("GNews error " + res.status);
    const data = await res.json();
    return (data.articles || []).map(function (a) {
      return {
        title: a.title,
        url: a.url,
        source: a.source && a.source.name ? a.source.name : "News",
        description: a.description || "",
        image: a.image || "",
        date: a.publishedAt,
        feedSource: "gnews",
      };
    });
  }

  function imageFromRssItem(item) {
    let image = imageFromDescription(item.querySelector("description")?.textContent || "");
    if (isValidImageUrl(image)) return image;

    const encoded = item.querySelector("content\\:encoded, encoded");
    if (encoded) {
      image = imageFromDescription(encoded.textContent || "");
      if (isValidImageUrl(image)) return image;
    }

    const thumb =
      item.getElementsByTagNameNS(MRSS_NS, "thumbnail")[0] ||
      item.querySelector("media\\:thumbnail, thumbnail");
    if (thumb) {
      image = thumb.getAttribute("url") || "";
      if (isValidImageUrl(image)) return image;
    }

    const media =
      item.getElementsByTagNameNS(MRSS_NS, "content")[0] ||
      item.querySelector("media\\:content, content");
    if (media) {
      const type = media.getAttribute("type") || "";
      const medium = media.getAttribute("medium") || "";
      if (medium === "image" || type.indexOf("image/") === 0) {
        image = media.getAttribute("url") || "";
        if (isValidImageUrl(image)) return image;
      }
    }

    const enclosure = item.querySelector("enclosure");
    if (enclosure) {
      const type = enclosure.getAttribute("type") || "";
      if (type.indexOf("image/") === 0) {
        image = enclosure.getAttribute("url") || "";
        if (isValidImageUrl(image)) return image;
      }
    }

    return "";
  }

  async function fetchRss(cat) {
    const proxy = "https://api.allorigins.win/raw?url=" + encodeURIComponent(cat.rss);
    const res = await fetch(proxy);
    if (!res.ok) throw new Error("RSS fetch failed");
    const text = await res.text();
    const doc = new DOMParser().parseFromString(text, "text/xml");
    const items = doc.querySelectorAll("item");
    const list = [];
    items.forEach(function (item, i) {
      if (i >= CONFIG.maxPerCategory) return;
      const title = item.querySelector("title")?.textContent?.trim() || "";
      const link = item.querySelector("link")?.textContent?.trim() || "";
      const desc = item.querySelector("description")?.textContent || "";
      const pub = item.querySelector("pubDate")?.textContent || "";
      const source = item.querySelector("source")?.textContent || "Google News";
      list.push({
        title: title,
        url: link,
        source: source,
        description: stripHtml(desc),
        image: imageFromRssItem(item),
        date: pub,
        feedSource: "rss",
      });
    });
    return list;
  }

  function fetchWithTimeout(url, ms) {
    const controller = new AbortController();
    const timer = setTimeout(function () {
      controller.abort();
    }, ms);
    return fetch(url, { signal: controller.signal }).finally(function () {
      clearTimeout(timer);
    });
  }

  async function resolveFinalUrl(url) {
    try {
      const res = await fetchWithTimeout(
        "https://api.allorigins.win/get?url=" + encodeURIComponent(url),
        10000
      );
      if (!res.ok) return url;
      const data = await res.json();
      return data.status?.url || url;
    } catch (e) {
      return url;
    }
  }

  async function fetchOgImage(pageUrl) {
    try {
      const res = await fetchWithTimeout(
        "https://api.allorigins.win/raw?url=" + encodeURIComponent(pageUrl),
        10000
      );
      if (!res.ok) return "";
      const html = await res.text();
      const patterns = [
        /<meta[^>]+property=["']og:image(?::secure_url)?["'][^>]+content=["']([^"']+)["']/i,
        /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image(?::secure_url)?["']/i,
        /<meta[^>]+name=["']twitter:image(?::src)?["'][^>]+content=["']([^"']+)["']/i,
        /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image(?::src)?["']/i,
      ];
      for (let i = 0; i < patterns.length; i++) {
        const m = html.match(patterns[i]);
        if (m && m[1]) {
          const img = decodeHtmlEntities(m[1].trim());
          if (isValidImageUrl(img)) return img;
        }
      }
    } catch (e) {
      /* ignore */
    }
    return "";
  }

  async function enrichArticleImage(article) {
    if (isValidImageUrl(article.image)) return article.image;
    if (!article.url) return "";

    let targetUrl = article.url;
    if (/news\.google\.com/i.test(targetUrl)) {
      targetUrl = await resolveFinalUrl(targetUrl);
    }

    let image = await fetchOgImage(targetUrl);
    if (!image && targetUrl !== article.url) {
      image = await fetchOgImage(article.url);
    }
    return image;
  }

  async function enrichMissingImages(articles) {
    const tasks = articles.map(async function (article) {
      if (isValidImageUrl(article.image)) return article;
      const image = await enrichArticleImage(article);
      if (image) article.image = image;
      return article;
    });
    return Promise.all(tasks);
  }

  async function loadCategory(cat) {
    let articles = [];
    let usedGnews = false;

    try {
      const gnews = await fetchGNews(cat);
      if (gnews && gnews.length) {
        articles = gnews;
        usedGnews = true;
      }
    } catch (e) {
      console.warn("GNews:", cat.id, e);
    }

    if (!articles.length) {
      articles = await fetchRss(cat);
    }

    articles = await enrichMissingImages(articles);
    articles._feedMeta = { usedGnews: usedGnews };
    return articles;
  }

  function placeholderFor(cat) {
    const key = cat.placeholder || "business";
    const rel = PLACEHOLDER_IMG[key] || PLACEHOLDER_IMG.business;
    try {
      return new URL(rel, window.location.href).href;
    } catch (e) {
      return rel;
    }
  }

  function renderCard(article, cat) {
    const imgInfo = resolveDisplayImage(article, cat);
    const alt = escapeHtml(article.title);
    const dateStr = formatDate(article.date);
    const hasRemote = isValidImageUrl(article.image);

    return (
      '<article class="card news-card news-card--api">' +
      '<a href="' +
      escapeHtml(article.url) +
      '" class="card__image-link" target="_blank" rel="noopener noreferrer">' +
      '<div class="media-frame card__media is-loaded">' +
      '<img src="' +
      escapeHtml(imgInfo.src) +
      '"' +
      (imgInfo.raw ? ' data-original="' + escapeHtml(imgInfo.raw) + '"' : "") +
      (imgInfo.proxied ? ' data-proxied="1"' : "") +
      ' data-fallback="' +
      escapeHtml(placeholderFor(cat)) +
      '" data-has-remote="' +
      (hasRemote ? "1" : "0") +
      '" alt="' +
      alt +
      '" width="800" height="450" loading="lazy" decoding="async" class="media-img" referrerpolicy="no-referrer">' +
      "</div></a>" +
      '<div class="card__body">' +
      '<span class="card__category">' +
      escapeHtml(cat.label) +
      " · " +
      escapeHtml(article.source) +
      "</span>" +
      "<h3 class=\"card__title\"><a href=\"" +
      escapeHtml(article.url) +
      '" target="_blank" rel="noopener noreferrer">' +
      escapeHtml(article.title) +
      "</a></h3>" +
      '<p class="card__excerpt">' +
      escapeHtml(article.description) +
      "</p>" +
      '<p class="card__meta">' +
      (dateStr ? dateStr + " · " : "") +
      "External source</p>" +
      "</div></article>"
    );
  }

  function renderTabs(categories, activeId) {
    return categories
      .map(function (cat) {
        const active = cat.id === activeId ? " is-active" : "";
        return (
          '<button type="button" class="news-feed-tab' +
          active +
          '" data-feed-tab="' +
          escapeHtml(cat.id) +
          '" role="tab" aria-selected="' +
          (cat.id === activeId ? "true" : "false") +
          '">' +
          escapeHtml(cat.label) +
          "</button>"
        );
      })
      .join("");
  }

  function bindImageFallbacks(gridEl) {
    gridEl.querySelectorAll(".news-card--api img[data-fallback]").forEach(function (img) {
      img.addEventListener("error", function () {
        const original = img.getAttribute("data-original");
        const proxied = img.getAttribute("data-proxied") === "1";
        const fb = img.getAttribute("data-fallback");
        const hasRemote = img.getAttribute("data-has-remote") === "1";
        const step = parseInt(img.getAttribute("data-fallback-step") || "0", 10);

        if (hasRemote && original) {
          if (step === 0 && proxied) {
            img.setAttribute("data-fallback-step", "1");
            img.src = original;
            return;
          }
          if (step === 0 && !proxied) {
            const proxy = proxyImageUrl(original);
            if (proxy && img.src !== proxy) {
              img.setAttribute("data-proxied", "1");
              img.src = proxy;
              return;
            }
          }
          if (step <= 1 && fb && img.src !== fb) {
            img.setAttribute("data-fallback-step", "2");
            img.src = fb;
          }
          return;
        }

        if (fb && img.src !== fb) img.src = fb;
      });
    });
  }

  async function showCategory(cat, gridEl, statusEl) {
    gridEl.innerHTML =
      '<p class="news-feed-status">Loading ' + escapeHtml(cat.label) + " headlines…</p>";
    try {
      const articles = await loadCategory(cat);
      const meta = articles._feedMeta || {};
      if (!articles.length) {
        gridEl.innerHTML = '<p class="news-feed-status">No headlines available right now. Try again later.</p>';
        return;
      }
      gridEl.innerHTML = articles
        .map(function (a) {
          return renderCard(a, cat);
        })
        .join("");
      bindImageFallbacks(gridEl);
      if (statusEl) {
        const withImages = articles.filter(function (a) {
          return isValidImageUrl(a.image);
        }).length;
        if (meta.usedGnews) {
          statusEl.textContent =
            "Powered by GNews.io · " + withImages + " of " + articles.length + " with images · External sources";
        } else {
          statusEl.textContent =
            "Headlines via Google News RSS · " + withImages + " of " + articles.length + " with images · External sources";
        }
      }
    } catch (err) {
      console.error(err);
      gridEl.innerHTML =
        '<p class="news-feed-status">Could not load news. Check your connection or update your GNews API key in <code>js/news-feed-config.js</code>.</p>';
      if (statusEl) statusEl.textContent = "";
    }
  }

  function updateSectionCopy(root, cat, tabsMode) {
    const titleEl = root.querySelector("#live-news-title");
    const introEl = root.querySelector("#live-news-intro");
    if (titleEl) {
      titleEl.textContent = tabsMode
        ? "Latest Headlines by Topic"
        : "Live " + cat.label + " Headlines";
    }
    if (introEl) {
      introEl.textContent = tabsMode
        ? "Fresh business, startup, entrepreneur, technology, and leadership news from trusted sources. Click a topic to browse."
        : "Latest " + cat.label.toLowerCase() + " news from trusted external sources, updated regularly.";
    }
    root.classList.toggle("live-news-section--single", !tabsMode);
  }

  function init() {
    const root = document.getElementById("live-news-section");
    if (!root || !CONFIG.categories.length) return;

    const tabsEl = document.getElementById("news-feed-tabs");
    const gridEl = document.getElementById("news-feed-grid");
    const statusEl = document.getElementById("news-feed-status");
    if (!gridEl) return;

    const tabsMode = isTabsMode();
    const singleId = resolveCategoryId();
    let active = (singleId && findCategory(singleId)) || findCategory("business") || CONFIG.categories[0];

    if (tabsMode && tabsEl) {
      const preferredId = (document.body.getAttribute("data-feed-default") || "").trim();
      active = (preferredId && findCategory(preferredId)) || active;
      tabsEl.hidden = false;
      tabsEl.innerHTML = renderTabs(CONFIG.categories, active.id);
      tabsEl.setAttribute("role", "tablist");

      tabsEl.addEventListener("click", function (e) {
        const btn = e.target.closest("[data-feed-tab]");
        if (!btn) return;
        const id = btn.getAttribute("data-feed-tab");
        active = findCategory(id) || active;
        tabsEl.querySelectorAll(".news-feed-tab").forEach(function (b) {
          const on = b === btn;
          b.classList.toggle("is-active", on);
          b.setAttribute("aria-selected", on ? "true" : "false");
        });
        showCategory(active, gridEl, statusEl);
      });
    } else if (tabsEl) {
      tabsEl.hidden = true;
      tabsEl.innerHTML = "";
    }

    updateSectionCopy(root, active, tabsMode);
    showCategory(active, gridEl, statusEl);
  }

  window.HomeNewsFeed = { init: init };
})();
