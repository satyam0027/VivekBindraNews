/**
 * Blog / news / article pages — show web stories linked to the current page only.
 */
document.addEventListener("DOMContentLoaded", function () {
  if (!window.SiteContent || typeof window.SiteContent.renderWebStoriesGrid !== "function") {
    return;
  }

  const blogSlug = document.body.getAttribute("data-related-blog");
  const newsSlug = document.body.getAttribute("data-related-news");
  const articleSlug = document.body.getAttribute("data-related-article");

  if (blogSlug) {
    SiteContent.renderWebStoriesGrid("related-web-stories", { relatedBlog: blogSlug });
  } else if (newsSlug) {
    SiteContent.renderWebStoriesGrid("related-web-stories", { relatedNews: newsSlug });
  } else if (articleSlug) {
    SiteContent.renderWebStoriesGrid("related-web-stories", { relatedArticle: articleSlug });
  }
});
