/**
 * Homepage top stories — latest from SITE_NEWS_CONFIG (sorted by date).
 */
(function () {
  function init() {
    const leadEl = document.getElementById("home-featured-lead");
    const headlinesEl = document.getElementById("home-featured-headlines");
    if (!leadEl || !window.SITE_NEWS_CONFIG) return;

    const stories = (window.SITE_NEWS_CONFIG.stories || []).slice().sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    if (!stories.length) {
      leadEl.innerHTML = '<p class="news-feed-status">Latest news coming soon. Visit <a href="news.html">News</a>.</p>';
      if (headlinesEl) headlinesEl.innerHTML = "";
      return;
    }

    const SC = window.SiteContent;
    const escapeHtml = SC ? SC.escapeHtml : function (s) { return s; };
    const formatDate = SC ? SC.formatDate : function () { return ""; };

    const featured = stories.find(function (s) { return s.featured; }) || stories[0];
    const restNews = stories.filter(function (s) { return s.slug !== featured.slug; });

    leadEl.innerHTML =
      '<a href="' + escapeHtml(featured.slug) + '" class="card__image-link">' +
        '<div class="media-frame news-lead__media" data-img="' + escapeHtml(featured.image) + '" data-img-fit="contain" data-img-priority="high"></div>' +
      '</a>' +
      '<div class="news-lead__body">' +
        '<span class="news-kicker"><a href="news.html">News</a></span>' +
        '<h2 class="news-lead__title"><a href="' + escapeHtml(featured.slug) + '">' + escapeHtml(featured.title) + '</a></h2>' +
        '<p class="news-lead__dek">' + escapeHtml(featured.excerpt) + '</p>' +
        '<time class="news-headline__meta" datetime="' + escapeHtml(featured.date) + '">' + formatDate(featured.date) + '</time>' +
      '</div>';

    if (!headlinesEl) return;

    const headlineItems = restNews.slice(0, 4);

    if (!headlineItems.length) {
      headlinesEl.innerHTML =
        '<article class="news-headline news-headline--solo"><div>' +
          '<span class="news-kicker">News</span>' +
          '<h3 class="news-headline__title"><a href="news.html">More stories on the way</a></h3>' +
          '<p class="news-headline__meta"><a href="news.html">View all news →</a></p>' +
        '</div></article>';
    } else {
      headlinesEl.innerHTML = headlineItems
        .map(function (item) {
          return (
            '<article class="news-headline">' +
              '<a href="' + escapeHtml(item.slug) + '" class="card__image-link">' +
                '<div class="media-frame news-headline__thumb" data-img="' + escapeHtml(item.image) + '" data-img-fit="contain"></div>' +
              '</a>' +
              '<div>' +
                '<span class="news-kicker"><a href="news.html">News</a></span>' +
                '<h3 class="news-headline__title"><a href="' + escapeHtml(item.slug) + '">' + escapeHtml(item.title) + '</a></h3>' +
                '<time class="news-headline__meta" datetime="' + escapeHtml(item.date) + '">' + formatDate(item.date) + '</time>' +
              '</div>' +
            '</article>'
          );
        })
        .join("");
    }

    renderBlogSection(escapeHtml, formatDate);

    const hub = document.getElementById("home-news-front");
    if (hub && window.BBN_IMAGES && typeof window.BBN_IMAGES.hydrate === "function") {
      window.BBN_IMAGES.hydrate(hub);
    }
    const blogHub = document.getElementById("home-blog-front");
    if (blogHub && window.BBN_IMAGES && typeof window.BBN_IMAGES.hydrate === "function") {
      window.BBN_IMAGES.hydrate(blogHub);
    }
  }

  function renderBlogSection(escapeHtml, formatDate) {
    const blogEl = document.getElementById("home-featured-blog");
    const blogSection = document.getElementById("home-blog-front");
    if (!blogEl || !window.BLOG_FEED_CONFIG) return;

    const blogs = (window.BLOG_FEED_CONFIG.blogs || []).slice().sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });

    if (!blogs.length) {
      if (blogSection) blogSection.hidden = true;
      return;
    }
    if (blogSection) blogSection.hidden = false;

    const latest = blogs[0];

    blogEl.innerHTML =
      '<a href="' + escapeHtml(latest.slug) + '" class="card__image-link news-lead--blog__media-link">' +
        '<div class="media-frame news-lead__media news-lead--blog__media" data-img="' + escapeHtml(latest.image) + '" data-img-fit="contain"></div>' +
      '</a>' +
      '<div class="news-lead__body">' +
        '<span class="news-kicker news-kicker--blog"><a href="blog.html">Blog</a></span>' +
        '<h2 class="news-lead__title"><a href="' + escapeHtml(latest.slug) + '">' + escapeHtml(latest.title) + '</a></h2>' +
        '<p class="news-lead__dek">' + escapeHtml(latest.excerpt) + '</p>' +
        '<time class="news-headline__meta" datetime="' + escapeHtml(latest.date) + '">' + formatDate(latest.date) + ' · <a href="blog.html">All blogs</a></time>' +
      '</div>';
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
