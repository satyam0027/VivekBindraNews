/**
 * Content catalog — blogs (blog.html), articles (articles.html), news (news.html).
 * Web stories are auto-built from all three in web-stories-feed.js.
 */
window.BLOG_FEED_CONFIG = {
  blogCategories: [
    { id: "all", label: "All Blogs" },
    { id: "entrepreneurship", label: "Entrepreneurship" },
  ],

  blogs: [
    {
      slug: "blog/vivek-bindra-news-2026/",
      title: "Vivek Bindra News: Latest Updates Every Entrepreneur Should Know",
      excerpt: "Get the latest Vivek Bindra News 2026 including CGP 2.0, Idea to IPO, Bada Business updates, AI business coach, and entrepreneur insights.",
      category: "entrepreneurship",
      categoryLabel: "Blog",
      badge: "Featured",
      date: "2026-05-27",
      image: "vivekBindraNews2026",
      featured: true,
    },
    {
      slug: "blog/vivek-bindra-news-business-growth-india/",
      title: "Vivek Bindra News 2026: Business Leadership, Entrepreneurship Growth & Bada Business Vision in India",
      excerpt: "Read the latest Vivek Bindra news, business updates, entrepreneurship insights, and Bada Business growth story. Leadership, startup trends, and MSME learning in India.",
      category: "entrepreneurship",
      categoryLabel: "Blog",
      badge: "New",
      date: "2026-05-28",
      image: "vbBusinessLeadershipIndia",
      featured: false,
    },
  ],

  articleCategories: [
    { id: "all", label: "All Articles" },
  ],

  articles: [],
};
