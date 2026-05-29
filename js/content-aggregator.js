/**
 * Site content helpers — web stories grids and cross-content utilities.
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

  function allWebStories() {
    return (window.WEB_STORIES_CONFIG && window.WEB_STORIES_CONFIG.stories) || [];
  }

  function filterWebStories(options) {
    const stories = allWebStories();
    if (!options) return stories;

    if (options.relatedBlog) {
      return stories.filter(function (s) {
        return s.relatedBlog === options.relatedBlog;
      });
    }
    if (options.relatedNews) {
      return stories.filter(function (s) {
        return s.relatedNews === options.relatedNews;
      });
    }
    if (options.relatedArticle) {
      return stories.filter(function (s) {
        return s.relatedArticle === options.relatedArticle;
      });
    }
    if (options.onlyNews) {
      return stories.filter(function (s) {
        return !!s.relatedNews;
      });
    }
    if (options.onlyArticles) {
      return stories.filter(function (s) {
        return !!s.relatedArticle;
      });
    }
    return stories;
  }

  function storyHref(slug) {
    if (!slug) return "/";
    if (slug.charAt(0) === "/" || /^https?:\/\//i.test(slug)) return slug;
    return "/" + slug.replace(/^\//, "");
  }

  function renderWebStoryCard(story) {
    const href = storyHref(story.slug);
    return (
      '<article class="card news-card news-card--web-story">' +
        '<a href="' + escapeHtml(href) + '" class="card__image-link">' +
          '<div class="media-frame card__media card__media--web-story" data-img="' + escapeHtml(story.image) + '" data-img-fit="contain"></div>' +
        '</a>' +
        '<div class="card__body">' +
          '<span class="intent-badge">Web Story</span>' +
          '<span class="card__category">' + escapeHtml(formatDate(story.date)) + '</span>' +
          '<h3 class="card__title"><a href="' + escapeHtml(href) + '">' + escapeHtml(story.title) + '</a></h3>' +
          '<p class="card__excerpt">' + escapeHtml(story.excerpt) + '</p>' +
          '<p class="card__meta"><a href="' + escapeHtml(href) + '">View web story</a></p>' +
        '</div>' +
      '</article>'
    );
  }

  function toggleWebStoriesSection(gridEl, hasItems) {
    if (!gridEl) return;
    const section =
      gridEl.closest("[data-web-stories-section]") ||
      gridEl.closest(".blog-related-web-stories") ||
      gridEl.closest(".news-about__section");
    if (section) {
      section.hidden = !hasItems;
    }
  }

  function renderWebStoriesGrid(containerId, filterOptions) {
    const gridEl = document.getElementById(containerId);
    if (!gridEl) return;

    const items = filterWebStories(filterOptions);
    if (!items.length) {
      gridEl.innerHTML = "";
      toggleWebStoriesSection(gridEl, false);
      return;
    }

    gridEl.innerHTML = items.map(renderWebStoryCard).join("");
    toggleWebStoriesSection(gridEl, true);
    if (window.BBN_IMAGES && typeof window.BBN_IMAGES.hydrate === "function") {
      window.BBN_IMAGES.hydrate(gridEl);
    }
  }

  return {
    allWebStories: allWebStories,
    filterWebStories: filterWebStories,
    formatDate: formatDate,
    escapeHtml: escapeHtml,
    renderWebStoryCard: renderWebStoryCard,
    renderWebStoriesGrid: renderWebStoriesGrid,
  };
})();
