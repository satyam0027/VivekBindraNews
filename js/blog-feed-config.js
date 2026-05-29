/**
 * Content catalog — blogs (blog.html), articles (articles.html), news (news.html).
 * Web stories are listed in web-stories-config.js and linked to blogs, news, or articles.
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
      badge: "Blog",
      date: "2026-05-28",
      image: "vbBusinessLeadershipIndia",
      featured: false,
    },
    {
      slug: "blog/vivek-bindra-news-2026-trending-again/",
      title: "Why Vivek Bindra Is Trending Again in 2026- And This Time, It's Bigger Than Ever",
      excerpt: "Dr Vivek Bindra is trending again in 2026 with Bada Business growth, 22.5M YouTube subscribers, SPL involvement, and MSME leadership across India.",
      category: "entrepreneurship",
      categoryLabel: "Blog",
      badge: "New",
      date: "2026-05-29",
      image: "vbTrendingAgain2026",
      featured: false,
    },
  ],

  articleCategories: [
    { id: "all", label: "All Articles" },
    { id: "guides", label: "Business Guides" },
  ],

  articles: [
    {
      slug: "/article/business-growth-consultant-vs-business-coach/",
      title: "Business Growth Consultant vs. Business Coach: What's the Real Difference?",
      excerpt: "Understand the real difference between a business growth consultant and a business coach to choose the right support for scaling your business.",
      category: "guides",
      categoryLabel: "Article",
      badge: "Featured",
      date: "2026-05-29",
      image: "consultantVsCoachHero",
      featured: true,
    },
  ],
};
