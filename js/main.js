/**
 * Bada Business News — interactions
 */
(function applySavedTheme() {
  if (localStorage.getItem("bbn_theme") === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();

document.addEventListener("DOMContentLoaded", function () {
  const activePage = document.body.dataset.page || "";
  if (window.BBN) BBN.injectLayout(activePage);
  if (window.BBN_IMAGES && typeof window.BBN_IMAGES.init === "function") {
    window.BBN_IMAGES.init();
  }
  if (window.HomeNewsFeed && typeof window.HomeNewsFeed.init === "function") {
    window.HomeNewsFeed.init();
  }

  initMobileNav();
  initFaq();
  initCookieBanner();
  initContactForm();
  initNavDropdownMobile();
  initThemeToggle();
});

function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    const open = nav.classList.toggle("is-open");
    toggle.classList.toggle("is-active", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

function initNavDropdownMobile() {
  var mobileNavMq = window.matchMedia("(max-width: 1024px)");
  document.querySelectorAll(".nav-dropdown > a").forEach(function (link) {
    link.addEventListener("click", function (e) {
      if (!mobileNavMq.matches) return;
      const parent = link.parentElement;
      if (parent.querySelector(".nav-dropdown__menu")) {
        e.preventDefault();
        parent.classList.toggle("is-open");
      }
    });
  });
}

function initThemeToggle() {
  const root = document.documentElement;
  const saved = localStorage.getItem("bbn_theme");
  if (saved === "dark") root.setAttribute("data-theme", "dark");

  document.addEventListener("click", function (e) {
    const btn = e.target.closest("#theme-toggle");
    if (!btn) return;
    const isDark = root.getAttribute("data-theme") === "dark";
    if (isDark) {
      root.removeAttribute("data-theme");
      localStorage.setItem("bbn_theme", "light");
      btn.innerHTML = moonSvg();
    } else {
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("bbn_theme", "dark");
      btn.innerHTML = sunSvg();
    }
  });

  const btn = document.getElementById("theme-toggle");
  if (btn && saved === "dark") btn.innerHTML = sunSvg();
}

function moonSvg() {
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
}

function sunSvg() {
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
}

function initFaq() {
  document.querySelectorAll(".faq-question").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const item = btn.closest(".faq-item");
      const wasOpen = item.classList.contains("is-open");
      document.querySelectorAll(".faq-item.is-open").forEach(function (el) {
        el.classList.remove("is-open");
        el.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      });
      if (!wasOpen) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
}

function initCookieBanner() {
  const banner = document.getElementById("cookie-banner");
  const accept = document.getElementById("cookie-accept");
  if (!banner || !accept) return;

  function setCookiePadding(visible) {
    document.body.classList.toggle("has-cookie-banner", visible);
  }

  if (!localStorage.getItem("bbn_cookies_accepted")) {
    banner.classList.add("is-visible");
    setCookiePadding(true);
  }

  accept.addEventListener("click", function () {
    localStorage.setItem("bbn_cookies_accepted", "1");
    banner.classList.remove("is-visible");
    setCookiePadding(false);
  });
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const msg = document.getElementById("form-message");
    if (msg) {
      msg.classList.add("is-success");
      msg.textContent =
        "Thank you for your message. We will respond to your inquiry as soon as possible.";
    }
    form.reset();
  });
}
