/**
 * Site favicons — works on all page depths and web-story pages.
 */
(function (global) {
  function basePath() {
    if (global.BBN && typeof global.BBN.basePath === "function") {
      return global.BBN.basePath();
    }
    const path = window.location.pathname.replace(/\\/g, "/");
    const parts = path.split("/").filter(Boolean);
    if (!parts.length) return "";
    const last = parts[parts.length - 1];
    if (last.indexOf(".html") !== -1) {
      return parts.length > 1 ? "../".repeat(parts.length - 1) : "";
    }
    return "../".repeat(parts.length);
  }

  function injectFavicons() {
    if (document.querySelector("link[data-bbn-favicon]")) return;

    const base = basePath();
    const defs = [
      { rel: "icon", type: "image/png", sizes: "32x32", href: base + "images/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: base + "images/favicon-192.png" },
      { rel: "icon", href: base + "favicon.ico", sizes: "any" },
      { rel: "apple-touch-icon", sizes: "180x180", href: base + "images/apple-touch-icon.png" },
    ];

    defs.forEach(function (cfg) {
      const link = document.createElement("link");
      link.rel = cfg.rel;
      link.href = cfg.href;
      link.setAttribute("data-bbn-favicon", "1");
      if (cfg.type) link.type = cfg.type;
      if (cfg.sizes) link.sizes = cfg.sizes;
      document.head.appendChild(link);
    });
  }

  global.injectSiteFavicons = injectFavicons;

  if (document.head) {
    injectFavicons();
  } else {
    document.addEventListener("DOMContentLoaded", injectFavicons);
  }
})(window);
