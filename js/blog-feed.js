/**
 * Blog & articles feed — blog.html (cards only) · articles.html (full hub)
 */
(function () {
  const CONFIG = window.BLOG_FEED_CONFIG;
  if (!CONFIG) return;

  const mode = document.body.getAttribute("data-feed-mode") || "blog";
  const isArticles = mode === "articles";

  const categories = isArticles ? CONFIG.articleCategories : CONFIG.blogCategories;
  const sourceItems = isArticles ? CONFIG.articles : CONFIG.blogs;

  if (!sourceItems) return;

  const items = sourceItems.slice().sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  function escapeHtml(str) {
    const d = document.createElement("div");
    d.textContent = str || "";
    return d.innerHTML;
  }

  function formatDate(str) {
    if (!str) return "";
    const d = new Date(str + "T12:00:00");
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  }

  function renderFeatured() {
    const leadEl = document.getElementById("blog-featured-lead");
    const headlinesEl = document.getElementById("blog-featured-headlines");
    const sectionEl = document.getElementById("blog-featured-section");
    if (!leadEl || !items.length) {
      if (sectionEl) sectionEl.hidden = true;
      return;
    }
    if (sectionEl) sectionEl.hidden = false;

    const featured = items.find(function (p) { return p.featured; }) || items[0];
    const rest = items.filter(function (p) { return p.slug !== featured.slug; }).slice(0, 4);

    leadEl.innerHTML =
      '<a href="' + escapeHtml(featured.slug) + '" class="card__image-link">' +
        '<div class="media-frame news-lead__media" data-img="' + escapeHtml(featured.image) + '" data-img-fit="contain" data-img-priority="high"></div>' +
      '</a>' +
      '<div class="news-lead__body">' +
        '<span class="news-kicker">' + escapeHtml(featured.categoryLabel) + '</span>' +
        '<h2 class="news-lead__title"><a href="' + escapeHtml(featured.slug) + '">' + escapeHtml(featured.title) + '</a></h2>' +
        '<p class="news-lead__dek">' + escapeHtml(featured.excerpt) + '</p>' +
        '<time class="news-headline__meta" datetime="' + escapeHtml(featured.date) + '">' + formatDate(featured.date) + '</time>' +
      '</div>';

    if (headlinesEl) {
      headlinesEl.innerHTML = rest
      .map(function (post) {
        return (
          '<article class="news-headline">' +
            '<a href="' + escapeHtml(post.slug) + '" class="card__image-link">' +
              '<div class="media-frame news-headline__thumb" data-img="' + escapeHtml(post.image) + '" data-img-fit="contain"></div>' +
            '</a>' +
            '<div>' +
              '<span class="news-kicker">' + escapeHtml(post.categoryLabel) + '</span>' +
              '<h3 class="news-headline__title"><a href="' + escapeHtml(post.slug) + '">' + escapeHtml(post.title) + '</a></h3>' +
              '<time class="news-headline__meta" datetime="' + escapeHtml(post.date) + '">' + formatDate(post.date) + '</time>' +
            '</div>' +
          '</article>'
        );
      })
        .join("");
    }
  }

  function renderCard(post) {
    const linkLabel = isArticles ? "Read article" : "Read blog";
    return (
      '<article class="card news-card" data-category="' + escapeHtml(post.category) + '">' +
        '<a href="' + escapeHtml(post.slug) + '" class="card__image-link">' +
          '<div class="media-frame card__media" data-img="' + escapeHtml(post.image) + '" data-img-fit="contain"></div>' +
        '</a>' +
        '<div class="card__body">' +
          '<span class="intent-badge">' + escapeHtml(post.badge) + '</span>' +
          '<span class="card__category">' + escapeHtml(formatDate(post.date)) + '</span>' +
          '<h3 class="card__title"><a href="' + escapeHtml(post.slug) + '">' + escapeHtml(post.title) + '</a></h3>' +
          '<p class="card__excerpt">' + escapeHtml(post.excerpt) + '</p>' +
          '<p class="card__meta"><a href="' + escapeHtml(post.slug) + '">' + linkLabel + '</a></p>' +
        '</div>' +
      '</article>'
    );
  }

  function renderGrid(filter) {
    const gridEl = document.getElementById("blog-feed-grid");
    const countEl = document.getElementById("blog-feed-count");
    if (!gridEl) return;

    const filtered =
      filter === "all"
        ? items
        : items.filter(function (p) {
            return p.category === filter;
          });

    const emptyLabel = isArticles ? "articles" : "blogs";

    if (!filtered.length) {
      gridEl.innerHTML =
        '<p class="news-feed-status">No ' + emptyLabel + ' published yet. Check back soon.</p>';
      if (countEl) countEl.textContent = "";
      return;
    }

    gridEl.innerHTML = filtered.map(renderCard).join("");
    if (countEl) {
      countEl.textContent =
        filtered.length + " " + (filtered.length === 1 ? emptyLabel.slice(0, -1) : emptyLabel) +
        (filter === "all" ? "" : " in " + ((categories.find(function (c) { return c.id === filter; }) || {}).label));
    }
  }

  function renderFilters() {
    const tabsEl = document.getElementById("blog-feed-tabs");
    const metaEl = document.querySelector(".blog-hub__meta");
    if (!tabsEl || !categories || !categories.length || !items.length) {
      if (metaEl) metaEl.hidden = true;
      return;
    }
    if (metaEl) metaEl.hidden = false;

    tabsEl.innerHTML = categories
      .map(function (cat, i) {
        return (
          '<button type="button" class="news-feed-tab' + (i === 0 ? " is-active" : "") + '" role="tab" aria-selected="' + (i === 0) + '" data-filter="' + escapeHtml(cat.id) + '">' +
            escapeHtml(cat.label) +
          '</button>'
        );
      })
      .join("");

    tabsEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".news-feed-tab");
      if (!btn) return;
      tabsEl.querySelectorAll(".news-feed-tab").forEach(function (tab) {
        tab.classList.remove("is-active");
        tab.setAttribute("aria-selected", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");
      renderGrid(btn.getAttribute("data-filter"));
      if (window.BBN_IMAGES && typeof window.BBN_IMAGES.hydrate === "function") {
        window.BBN_IMAGES.hydrate(document.getElementById("blog-feed-grid"));
      }
    });
  }

  function renderWebStories() {
    if (window.SiteContent && typeof window.SiteContent.renderWebStoriesGrid === "function") {
      window.SiteContent.renderWebStoriesGrid("blog-web-stories");
    }
  }

  function initArticlesEmpty() {
    const sectionEl = document.getElementById("blog-featured-section");
    if (sectionEl) sectionEl.hidden = true;
    const metaEl = document.querySelector(".blog-hub__meta");
    if (metaEl) metaEl.hidden = true;
    const gridEl = document.getElementById("blog-feed-grid");
    if (gridEl) {
      gridEl.innerHTML = '<p class="news-feed-status">No articles published yet. Visit <a href="news.html">News</a> or <a href="blog.html">Blog</a>.</p>';
    }
    renderWebStories();
  }

  function init() {
    if (isArticles) {
      if (!items.length) {
        initArticlesEmpty();
      } else {
        renderFeatured();
        renderFilters();
        renderGrid("all");
        renderWebStories();
      }
    } else {
      renderGrid("all");
      renderWebStories();
    }

    const root = document.getElementById("blog-hub") || document.getElementById("blog-feed-grid");
    if (root && window.BBN_IMAGES && typeof window.BBN_IMAGES.hydrate === "function") {
      window.BBN_IMAGES.hydrate(root);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
