/**
 * News category subpages — featured lead + story grid
 */
(function () {
  const categoryId = document.body && document.body.getAttribute("data-news-subpage");
  if (!categoryId || !window.NEWS_SUBPAGE_CONFIG) return;

  const config = window.NEWS_SUBPAGE_CONFIG[categoryId];
  if (!config) return;

  const stories = (config.stories || []).slice().sort(function (a, b) {
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
          '<span class="card__category">' + escapeHtml(formatDate(story.date)) + '</span>' +
          '<h3 class="card__title"><a href="' + escapeHtml(story.slug) + '">' + escapeHtml(story.title) + '</a></h3>' +
          '<p class="card__excerpt">' + escapeHtml(story.excerpt) + '</p>' +
          '<p class="card__meta"><a href="' + escapeHtml(story.slug) + '">Read story</a></p>' +
        '</div>' +
      '</article>'
    );
  }

  function renderFeatured() {
    const leadEl = document.getElementById("news-subpage-lead");
    const headlinesEl = document.getElementById("news-subpage-headlines");
    const frontSection = document.querySelector("#news-subpage-hub .news-front");
    if (!leadEl) return;

    if (!stories.length) {
      if (frontSection) frontSection.hidden = true;
      return;
    }
    if (frontSection) frontSection.hidden = false;

    const featured = stories.find(function (s) { return s.featured; }) || stories[0];
    const rest = stories.filter(function (s) { return s.slug !== featured.slug; }).slice(0, 4);

    leadEl.innerHTML =
      '<a href="' + escapeHtml(featured.slug) + '" class="card__image-link">' +
        '<div class="media-frame news-lead__media" data-img="' + escapeHtml(featured.image) + '" data-img-fit="contain" data-img-priority="high"></div>' +
      '</a>' +
      '<div class="news-lead__body">' +
        '<span class="news-kicker">Top Story</span>' +
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
                '<span class="news-kicker">' + escapeHtml(story.badge) + '</span>' +
                '<h3 class="news-headline__title"><a href="' + escapeHtml(story.slug) + '">' + escapeHtml(story.title) + '</a></h3>' +
                '<time class="news-headline__meta" datetime="' + escapeHtml(story.date) + '">' + formatDate(story.date) + '</time>' +
              '</div>' +
            '</article>'
          );
        })
        .join("");
    }
  }

  function renderGrid() {
    const gridEl = document.getElementById("news-subpage-grid");
    const sectionEl = document.getElementById("news-subpage-grid-section") || gridEl && gridEl.closest(".news-about__section");
    if (!gridEl) return;
    if (!stories.length) {
      gridEl.innerHTML = '<p class="news-feed-status">No stories in this section yet. Visit <a href="../news.html">News</a> or <a href="../blog.html">Blog</a>.</p>';
      return;
    }
    if (sectionEl) sectionEl.hidden = false;
    gridEl.innerHTML = stories.map(renderCard).join("");
  }

  function init() {
    renderFeatured();
    renderGrid();
    const root = document.getElementById("news-subpage-hub");
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
