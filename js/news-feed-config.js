/**
 * Live news feed settings.
 * Optional: add a free GNews API key from https://gnews.io/ for higher-quality images.
 * Without a key, Google News RSS is used (no signup required).
 */
window.NEWS_FEED_CONFIG = {
  /**
   * GNews key — used by /api/gnews on Vercel (not sent to gnews.io from the browser).
   * Prefer GNEWS_API_KEY in Vercel Environment Variables; this field is a fallback.
   */
  gnewsApiKey: "bdad83742f183c48bb0e7b7ddf028c56",

  maxPerCategory: 6,

  /** Maps news subpage folder names → feed category id */
  subpageFeedMap: {
    "vivek-bindra-news": "vivekBindra",
    "latest-business-news": "business",
    "entrepreneur-news": "entrepreneur",
    "startup-news": "startup",
    "leadership-motivation": "leadership",
  },

  categories: [
    {
      id: "business",
      label: "Business",
      gnews: { category: "business", country: "in" },
      rss: "https://news.google.com/rss/search?q=India+business+economy&hl=en-IN&gl=IN&ceid=IN:en",
      placeholder: "business",
    },
    {
      id: "startup",
      label: "Startups",
      gnews: { q: "India startup funding entrepreneur" },
      rss: "https://news.google.com/rss/search?q=India+startup&hl=en-IN&gl=IN&ceid=IN:en",
      placeholder: "startup",
    },
    {
      id: "entrepreneur",
      label: "Entrepreneurs",
      gnews: { q: "India entrepreneur MSME" },
      rss: "https://news.google.com/rss/search?q=India+entrepreneur&hl=en-IN&gl=IN&ceid=IN:en",
      placeholder: "entrepreneur",
    },
    {
      id: "vivekBindra",
      label: "Vivek Bindra",
      gnews: { q: "Vivek Bindra Bada Business entrepreneur India" },
      rss: "https://news.google.com/rss/search?q=Vivek+Bindra+OR+Bada+Business&hl=en-IN&gl=IN&ceid=IN:en",
      placeholder: "vivekBindraNews",
    },
    {
      id: "technology",
      label: "Technology",
      gnews: { category: "technology", country: "in" },
      rss: "https://news.google.com/rss/headlines/section/topic/TECHNOLOGY?hl=en-IN&gl=IN&ceid=IN:en",
      placeholder: "business",
    },
    {
      id: "leadership",
      label: "Leadership",
      gnews: { q: "business leadership management India" },
      rss: "https://news.google.com/rss/search?q=business+leadership+India&hl=en-IN&gl=IN&ceid=IN:en",
      placeholder: "business",
    },
  ],
};
