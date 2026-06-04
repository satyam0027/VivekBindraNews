/**
 * Server-side RSS proxy — fetches Google News RSS without browser CORS limits.
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

  const feedUrl = (req.query.url || "").toString();
  if (!feedUrl || !/^https?:\/\//i.test(feedUrl)) {
    return res.status(400).json({ error: "Missing or invalid url parameter" });
  }

  try {
    const upstream = await fetch(feedUrl, {
      headers: {
        Accept: "application/rss+xml, application/xml, text/xml, */*",
        "User-Agent": "VivekBindraNews/1.0 (+https://www.vivekbindranews.com)",
      },
    });
    const text = await upstream.text();
    res.status(upstream.status);
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    return res.send(text);
  } catch (err) {
    return res.status(502).json({ error: "RSS fetch failed" });
  }
};
