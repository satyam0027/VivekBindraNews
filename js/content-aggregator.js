/**
 * Aggregates blogs, news, and articles for web stories & cross-links.
 */
window.SiteContent = (function () {
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

  function normalize(item, type) {
    return {
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt,
      date: item.date,
      image: item.image,
      badge: item.badge || type,
      categoryLabel: item.categoryLabel || type,
      contentType: type,
      featured: !!item.featured,
    };
  }

  function allItems() {
    const news = (window.SITE_NEWS_CONFIG && window.SITE_NEWS_CONFIG.stories) || [];
    const blogs = (window.BLOG_FEED_CONFIG && window.BLOG_FEED_CONFIG.blogs) || [];
    const articles = (window.BLOG_FEED_CONFIG && window.BLOG_FEED_CONFIG.articles) || [];

    return news
      .map(function (s) { return normalize(s, "News"); })
      .concat(blogs.map(function (s) { return normalize(s, "Blog"); }))
      .concat(articles.map(function (s) { return normalize(s, "Article"); }))
      .sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
  }

  function newsItems() {
    return allItems().filter(function (i) { return i.contentType === "News"; });
  }

  function renderCard(item) {
    const linkLabel = item.contentType === "News" ? "Read story" : item.contentType === "Blog" ? "Read blog" : "Read article";
    return (
      '<article class="card news-card">' +
        '<a href="' + escapeHtml(item.slug) + '" class="card__image-link">' +
          '<div class="media-frame card__media" data-img="' + escapeHtml(item.image) + '" data-img-fit="contain"></div>' +
        '</a>' +
        '<div class="card__body">' +
          '<span class="intent-badge">' + escapeHtml(item.contentType) + '</span>' +
          '<span class="card__category">' + escapeHtml(formatDate(item.date)) + '</span>' +
          '<h3 class="card__title"><a href="' + escapeHtml(item.slug) + '">' + escapeHtml(item.title) + '</a></h3>' +
          '<p class="card__excerpt">' + escapeHtml(item.excerpt) + '</p>' +
          '<p class="card__meta"><a href="' + escapeHtml(item.slug) + '">' + linkLabel + '</a></p>' +
        '</div>' +
      '</article>'
    );
  }

  function renderWebStoriesGrid(containerId) {
    const gridEl = document.getElementById(containerId);
    if (!gridEl) return;

    const items = allItems();
    if (!items.length) {
      gridEl.innerHTML = '<p class="news-feed-status">Web stories will appear when blogs, news, or articles are published.</p>';
      return;
    }

    gridEl.innerHTML = items.map(renderCard).join("");
    if (window.BBN_IMAGES && typeof window.BBN_IMAGES.hydrate === "function") {
      window.BBN_IMAGES.hydrate(gridEl);
    }
  }

  return {
    allItems: allItems,
    newsItems: newsItems,
    formatDate: formatDate,
    escapeHtml: escapeHtml,
    renderCard: renderCard,
    renderWebStoriesGrid: renderWebStoriesGrid,
  };
})();
