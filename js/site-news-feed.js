/**
 * Site editorial news — featured lead + card grid on news.html
 */
(function () {
  const CONFIG = window.SITE_NEWS_CONFIG;
  if (!CONFIG || !CONFIG.stories || !CONFIG.stories.length) return;

  const stories = CONFIG.stories.slice().sort(function (a, b) {
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

  function renderCard(story) {
    return (
      '<article class="card news-card">' +
        '<a href="' + escapeHtml(story.slug) + '" class="card__image-link">' +
          '<div class="media-frame card__media" data-img="' + escapeHtml(story.image) + '" data-img-fit="contain"></div>' +
        '</a>' +
        '<div class="card__body">' +
          '<span class="intent-badge">' + escapeHtml(story.badge) + '</span>' +
          '<span class="card__category">' + escapeHtml(story.categoryLabel) + ' · ' + escapeHtml(formatDate(story.date)) + '</span>' +
          '<h3 class="card__title"><a href="' + escapeHtml(story.slug) + '">' + escapeHtml(story.title) + '</a></h3>' +
          '<p class="card__excerpt">' + escapeHtml(story.excerpt) + '</p>' +
          '<p class="card__meta"><a href="' + escapeHtml(story.slug) + '">Read full story</a></p>' +
        '</div>' +
      '</article>'
    );
  }

  function renderFeatured() {
    const leadEl = document.getElementById("site-news-featured-lead");
    const headlinesEl = document.getElementById("site-news-featured-headlines");
    if (!leadEl) return;

    const featured = stories.find(function (s) { return s.featured; }) || stories[0];
    const rest = stories.filter(function (s) { return s.slug !== featured.slug; }).slice(0, 4);

    leadEl.innerHTML =
      '<a href="' + escapeHtml(featured.slug) + '" class="card__image-link">' +
        '<div class="media-frame news-lead__media" data-img="' + escapeHtml(featured.image) + '" data-img-fit="contain" data-img-priority="high"></div>' +
      '</a>' +
      '<div class="news-lead__body">' +
        '<span class="news-kicker"><a href="vivek-bindra-news/">Vivek Bindra News</a></span>' +
        '<h2 class="news-lead__title"><a href="' + escapeHtml(featured.slug) + '">' + escapeHtml(featured.title) + '</a></h2>' +
        '<p class="news-lead__dek">' + escapeHtml(featured.excerpt) + '</p>' +
        '<time class="news-headline__meta" datetime="' + escapeHtml(featured.date) + '">' + formatDate(featured.date) + '</time>' +
      '</div>';

    if (headlinesEl && rest.length) {
      headlinesEl.innerHTML = rest
        .map(function (story) {
          return (
            '<article class="news-headline">' +
              '<a href="' + escapeHtml(story.slug) + '" class="card__image-link">' +
                '<div class="media-frame news-headline__thumb" data-img="' + escapeHtml(story.image) + '" data-img-fit="contain"></div>' +
              '</a>' +
              '<div>' +
                '<span class="news-kicker">' + escapeHtml(story.categoryLabel) + '</span>' +
                '<h3 class="news-headline__title"><a href="' + escapeHtml(story.slug) + '">' + escapeHtml(story.title) + '</a></h3>' +
                '<time class="news-headline__meta" datetime="' + escapeHtml(story.date) + '">' + formatDate(story.date) + '</time>' +
              '</div>' +
            '</article>'
          );
        })
        .join("");
    } else if (headlinesEl) {
      headlinesEl.innerHTML =
        '<article class="news-headline news-headline--solo">' +
          '<div>' +
            '<span class="news-kicker">Blog</span>' +
            '<h3 class="news-headline__title"><a href="vivek-bindra-news-2026/">Latest Updates Every Entrepreneur Should Know</a></h3>' +
            '<p class="news-headline__meta">Vivek Bindra News 2026 roundup</p>' +
          '</div>' +
        '</article>' +
        '<article class="news-headline news-headline--solo">' +
          '<div>' +
            '<span class="news-kicker">Learning</span>' +
            '<h3 class="news-headline__title"><a href="blog.html">Business Blogs</a></h3>' +
            '<p class="news-headline__meta">Entrepreneurship &amp; leadership insights</p>' +
          '</div>' +
        '</article>';
    }
  }

  function renderGrid() {
    const gridEl = document.getElementById("site-news-grid");
    const sectionEl = document.getElementById("site-news-grid-section");
    if (!gridEl) return;
    if (stories.length <= 1) {
      if (sectionEl) sectionEl.hidden = true;
      return;
    }
    if (sectionEl) sectionEl.hidden = false;
    gridEl.innerHTML = stories.map(renderCard).join("");
  }

  function init() {
    renderFeatured();
    renderGrid();
    const root = document.getElementById("site-news-hub");
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
