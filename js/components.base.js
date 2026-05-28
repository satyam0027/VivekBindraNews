/**
 * Vivek Bindra News — shared header, footer, SEO helpers
 */
(function (global) {
  const SITE = {
    name: "Vivek Bindra",
    newsLabel: "NEWS",
    fullName: "Vivek Bindra News",
    domain: "https://vivekbindranews.com",
    email: "contact@vivekbindranews.com",
    year: new Date().getFullYear(),
  };

  const NAV = [
    { href: "/", label: "Home", id: "home" },
    {
      href: "/news.html",
      label: "News",
      id: "news",
      children: [
        { href: "/vivek-bindra-news/", label: "Vivek Bindra News" },
        { href: "/latest-business-news/", label: "Latest Business News" },
        { href: "/entrepreneur-news/", label: "Entrepreneur News" },
        { href: "/startup-news/", label: "Startup News" },
        { href: "/leadership-motivation/", label: "Leadership & Motivation" },
      ],
    },
    { href: "/about-us.html", label: "About Us", id: "about" },
    { href: "/blog.html", label: "Blog", id: "blog" },
    { href: "/articles.html", label: "Articles", id: "articles" },
    { href: "/contact-us.html", label: "Contact Us", id: "contact" },
  ];

  const FOOTER_LINKS = {
    news: [
      { href: "/vivek-bindra-news/", label: "Vivek Bindra News" },
      { href: "/entrepreneur-news/", label: "Entrepreneur News" },
      { href: "/startup-news/", label: "Startup News" },
      { href: "/latest-business-news/", label: "Latest Business News" },
    ],
    company: [
      { href: "/about-us.html", label: "About Us" },
      { href: "/blog.html", label: "Blog" },
      { href: "/articles.html", label: "Articles" },
      { href: "/contact-us.html", label: "Contact Us" },
    ],
    legal: [
      { href: "/privacy-policy.html", label: "Privacy Policy" },
      { href: "/disclaimer.html", label: "Disclaimer" },
      { href: "/terms-and-conditions.html", label: "Terms & Conditions" },
    ],
  };

  function basePath() {
    const path = window.location.pathname;
    if (path.endsWith("/") && (path.match(/\//g) || []).length > 1) {
      const depth = (path.match(/\//g) || []).length - 1;
      return "../".repeat(depth);
    }
    const segments = path.split("/").filter(Boolean);
    if (segments.length <= 1 && path.endsWith(".html")) return "";
    if (!path.includes(".html") && segments.length > 0) {
      return "../".repeat(segments.length);
    }
    const dir = segments.slice(0, -1);
    return dir.length ? "../".repeat(dir.length) : "";
  }

  function resolveHref(href) {
    if (href.startsWith("http") || href.startsWith("#")) return href;
    const base = basePath();
    if (href === "/") return base || "./";
    return base + href.replace(/^\//, "");
  }

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

  function getLatestContentItems(limit) {
    const items = [];

    const news = (global.SITE_NEWS_CONFIG && global.SITE_NEWS_CONFIG.stories) || [];
    news.forEach(function (s) {
      items.push({
        type: "News",
        date: s.date || "",
        title: s.title || "",
        href: s.slug || "news.html",
      });
    });

    const blogs = (global.BLOG_FEED_CONFIG && global.BLOG_FEED_CONFIG.blogs) || [];
    blogs.forEach(function (b) {
      items.push({
        type: "Blog",
        date: b.date || "",
        title: b.title || "",
        href: b.slug || "blog.html",
      });
    });

    const articles = (global.BLOG_FEED_CONFIG && global.BLOG_FEED_CONFIG.articles) || [];
    articles.forEach(function (a) {
      items.push({
        type: "Article",
        date: a.date || "",
        title: a.title || "",
        href: a.slug || "articles.html",
      });
    });

    return items
      .filter(function (i) { return i.title && i.href; })
      .sort(function (a, b) { return new Date(b.date) - new Date(a.date); })
      .slice(0, limit || 6);
  }

  function buildBreakingSegmentHtml(items) {
    if (!items || !items.length) {
      return (
        '<span class="tag-gold">[NEWS]</span> <a href="' +
        resolveHref("/news.html") +
        '" style="color:inherit;text-decoration:none;">Latest stories coming soon</a>'
      );
    }

    return items
      .map(function (it) {
        const tag = it.type.toUpperCase();
        return (
          '<span class="tag-gold">[' +
          escapeHtml(tag) +
          ']</span> <a href="' +
          escapeHtml(resolveHref(it.href)) +
          '" style="color:inherit;text-decoration:none;">' +
          escapeHtml(it.title) +
          "</a>" +
          (it.date ? ' <span style="opacity:.65;">(' + escapeHtml(formatDate(it.date)) + ")</span>" : "")
        );
      })
      .join(' &nbsp;&nbsp;|&nbsp;&nbsp; ');
  }

  function renderBreakingBar() {
    const segment = buildBreakingSegmentHtml(getLatestContentItems(6));
    return `
    <div class="breaking-bar" role="region" aria-label="Breaking news">
      <span class="breaking-bar__label">Latest</span>
      <div class="breaking-bar__ticker">
        <div class="breaking-bar__track" aria-live="off">
          <span class="breaking-bar__segment">${segment}</span>
          <span class="breaking-bar__segment" aria-hidden="true">${segment}</span>
        </div>
      </div>
    </div>`;
  }

  function updateBreakingBar() {
    const bar = document.querySelector(".breaking-bar");
    const track = bar && bar.querySelector(".breaking-bar__track");
    if (!bar || !track) return;
    const segment = buildBreakingSegmentHtml(getLatestContentItems(6));
    track.innerHTML =
      '<span class="breaking-bar__segment">' +
      segment +
      '</span><span class="breaking-bar__segment" aria-hidden="true">' +
      segment +
      "</span>";
  }

  function renderHeader(activeId) {
    const navItems = NAV.map((item) => {
      const isActive = item.id === activeId ? ' class="is-active"' : "";
      if (item.children) {
        const kids = item.children
          .map((c) => `<li><a href="${resolveHref(c.href)}">${c.label}</a></li>`)
          .join("");
        return `<li class="nav-dropdown">
          <a href="${resolveHref(item.href)}"${isActive}>${item.label}</a>
          <ul class="nav-dropdown__menu">${kids}</ul>
        </li>`;
      }
      return `<li><a href="${resolveHref(item.href)}"${isActive}>${item.label}</a></li>`;
    }).join("");

    const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;

    return `
    ${renderBreakingBar()}
    <header class="site-header" role="banner">
      <div class="container header-inner">
        <a href="${resolveHref("/")}" class="logo" aria-label="${SITE.fullName} home">
          <span class="logo__brand">${SITE.name}</span>
          <span class="logo__news">${SITE.newsLabel}</span>
        </a>
        <button class="nav-toggle" type="button" aria-label="Toggle menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
        <nav class="main-nav" aria-label="Main navigation">
          <ul>${navItems}</ul>
        </nav>
        <div class="header-utils">
          <form class="header-search" role="search" action="${resolveHref("/news.html")}" method="get">
            <input type="search" name="q" placeholder="Search news..." aria-label="Search">
            <span class="header-search__icon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </span>
          </form>
          <button type="button" class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">${moonIcon}</button>
        </div>
      </div>
    </header>`;
  }

  function renderFooter() {
    const news = FOOTER_LINKS.news
      .map((l) => `<li><a href="${resolveHref(l.href)}">${l.label}</a></li>`)
      .join("");
    const company = FOOTER_LINKS.company
      .map((l) => `<li><a href="${resolveHref(l.href)}">${l.label}</a></li>`)
      .join("");
    const legal = FOOTER_LINKS.legal
      .map((l) => `<li><a href="${resolveHref(l.href)}">${l.label}</a></li>`)
      .join("");

    return `
    <footer class="site-footer" role="contentinfo">
      <div class="container">
        <div class="footer-grid">
          <div>
            <h4>${SITE.fullName}</h4>
            <p>Professional entrepreneur-focused journalism covering startups, leadership, and India's business ecosystem.</p>
          </div>
          <div>
            <h4>News Categories</h4>
            <ul>${news}</ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>${company}</ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>${legal}</ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>Copyright © ${SITE.year} ${SITE.fullName} — All Rights Reserved.</p>
        </div>
      </div>
    </footer>`;
  }

  function injectLayout(activeId) {
    const headerEl = document.getElementById("site-header");
    const footerEl = document.getElementById("site-footer");
    if (headerEl) headerEl.innerHTML = renderHeader(activeId);
    if (footerEl) footerEl.innerHTML = renderFooter();
  }

  global.BBN = {
    SITE,
    injectLayout,
    resolveHref,
    basePath,
    updateBreakingBar,
  };
})(window);
