/**
 * Fetch a URL server-side (for OG images, redirects). Max ~500KB response.
 */
module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const target = (req.query.url || "").toString();
  if (!target || !/^https?:\/\//i.test(target)) {
    return res.status(400).json({ error: "Invalid url" });
  }

  try {
    const upstream = await fetch(target, {
      redirect: "follow",
      headers: {
        Accept: "text/html,application/xhtml+xml",
        "User-Agent": "VivekBindraNews/1.0 (+https://www.vivekbindranews.com)",
      },
    });
    const text = await upstream.text();
    const body = text.length > 500000 ? text.slice(0, 500000) : text;
    res.status(upstream.status);
    res.setHeader("Content-Type", upstream.headers.get("content-type") || "text/html");
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    return res.send(body);
  } catch (err) {
    return res.status(502).json({ error: "Fetch failed" });
  }
};
