/**
 * Server-side GNews proxy — avoids browser CORS and keeps API key off the client.
 * Set GNEWS_API_KEY in Vercel project Environment Variables.
 */
module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const key =
    process.env.GNEWS_API_KEY ||
    process.env.GNEWS_KEY ||
    (req.query.apikey || "").toString().trim() ||
    "";

  if (!key) {
    return res.status(503).json({
      error: "GNews API key not configured",
      hint: "Add GNEWS_API_KEY in Vercel Environment Variables, or gnewsApiKey in news-feed-config.js",
    });
  }

  const mode = (req.query.mode || "top").toString();
  const max = Math.min(parseInt(req.query.max, 10) || 6, 10);
  let url;

  if (mode === "search") {
    const q = (req.query.q || "business india").toString();
    url =
      "https://gnews.io/api/v4/search?q=" +
      encodeURIComponent(q) +
      "&lang=en&max=" +
      max +
      "&apikey=" +
      encodeURIComponent(key);
  } else {
    const category = (req.query.category || "business").toString();
    const country = (req.query.country || "in").toString();
    url =
      "https://gnews.io/api/v4/top-headlines?category=" +
      encodeURIComponent(category) +
      "&lang=en&country=" +
      encodeURIComponent(country) +
      "&max=" +
      max +
      "&apikey=" +
      encodeURIComponent(key);
  }

  try {
    const upstream = await fetch(url, {
      headers: { Accept: "application/json" },
    });
    const text = await upstream.text();
    res.status(upstream.status);
    res.setHeader("Content-Type", "application/json");
    return res.send(text);
  } catch (err) {
    return res.status(502).json({ error: "Upstream GNews request failed" });
  }
};
