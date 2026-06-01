/**
 * Image catalog — edit filenames & alt text here only.
 * HTML: <div class="media-frame card__media" data-img="vivekBindraNews"></div>
 */
(function (global) {
  const SITE = "https://vivekbindranews.com/images/";

  const CATALOG = {
    vivekBindraNews: {
      file: "vivek-bindra-news.png",
      width: 1200,
      height: 675,
      alt: "Dr Vivek Bindra — Vivek Bindra News and entrepreneurship India",
    },
    vivekBindraLatest: {
      file: "vivek-bindra-latest.png",
      width: 1200,
      height: 675,
      alt: "Vivek Bindra News latest updates for entrepreneurs 2026",
    },
    startup: {
      file: "startup.png",
      width: 1200,
      height: 675,
      alt: "Indian startup ecosystem — startup news India",
    },
    business: {
      file: "business.png",
      width: 1200,
      height: 675,
      alt: "Business strategy and leadership — business news India",
    },
    entrepreneur: {
      file: "enterpreneur-new.png",
      width: 1200,
      height: 675,
      alt: "Entrepreneur news India — founder stories",
    },
    webStoryVivek: {
      file: "vivek-bindra-news-web-story.png",
      width: 1200,
      height: 675,
      alt: "Vivek Bindra News 2026 web story",
    },
    webStoryGrowth: {
      file: "entrepreneurship-growth.png",
      width: 1200,
      height: 675,
      alt: "Entrepreneurship growth in India 2026",
    },
    vivekOberoiVadodaraLaunch: {
      file: "vivek-bindra-vivek-oberoi-vadodara-launch.png",
      width: 1200,
      height: 800,
      alt: "Dr Vivek Bindra and Vivek Oberoi at Gujarat biggest branded factory retail outlet launch in Vadodara",
    },
    vivekBindraNews2026: {
      file: "vivek-bindra-news-2026.webp",
      width: 1200,
      height: 628,
      alt: "Dr Vivek Bindra latest news and Bada Business CGP 2.0 launch",
    },
    cgp20BadaBusiness: {
      file: "cgp-2-0-bada-business-msme-programme.webp",
      width: 1200,
      height: 628,
      alt: "CGP 2.0 by Bada Business launched by Dr Vivek Bindra for Indian MSME entrepreneurs",
    },
    ideaToIpoVivekBindra: {
      file: "idea-to-ipo-vivek-bindra-indian-smes.webp",
      width: 1200,
      height: 628,
      alt: "Dr Vivek Bindra explaining Idea to IPO programme for Indian SMEs and MSME business growth",
    },
    vbBusinessLeadershipIndia: {
      file: "business-leadership-entrepreneurship-growth-bada-business-india.png",
      width: 1200,
      height: 675,
      alt: "Business leadership entrepreneurship growth and Bada Business vision in India",
    },
    vbNewsTrending: {
      file: "why-vivek-bindra-news-trending.png",
      width: 1200,
      height: 675,
      alt: "Why Vivek Bindra News is trending among entrepreneurs and startup audiences",
    },
    vbMsmeContribution: {
      file: "vivek-bindra-contribution-msmes-entrepreneurs.png",
      width: 1200,
      height: 675,
      alt: "Vivek Bindra contribution to MSMEs entrepreneurs and startup business growth",
    },
    lokhandeIndustriesGrowth: {
      file: "lokhande-industries-growth-bada-business-vivek-bindra-2026.png",
      width: 1200,
      height: 900,
      alt: "Lokhande Industries achieves massive business growth with Bada Business and Dr Vivek Bindra (2026)",
    },
    vivekBindraSplTrophy: {
      file: "vivek-bindra-spl-trophy.webp",
      width: 1200,
      height: 800,
      alt: "Dr Vivek Bindra and Devkinandan Thakur Ji Maharaj at SPL Trophy Launch Event",
    },
    vbTrendingAgain2026: {
      file: "vivek-bindra-news-2026-trending-again.jpg",
      width: 1200,
      height: 675,
      alt: "Vivek Bindra News 2026",
    },
    badaBusinessMsmeMovement: {
      file: "bada-business-msme-entrepreneurship-movement.jpg",
      width: 1200,
      height: 675,
      alt: "Bada Business entrepreneurship platform supporting MSMEs",
    },
    vbFutureVision2026: {
      file: "dr-vivek-bindra-future-business-vision-2026.jpg",
      width: 1200,
      height: 675,
      alt: "Dr Vivek Bindra future plans for Bada Business",
    },
    consultantVsCoachHero: {
      file: "business-growth-consultant-vs-business-coach-difference.webp",
      width: 1200,
      height: 675,
      alt: "Business growth consultant vs business coach explained with growth and leadership focus",
    },
    signsNeedGrowthConsultant: {
      file: "signs-you-need-business-growth-consultant.webp",
      width: 1200,
      height: 675,
      alt: "Signs you need a business growth consultant for strategy, scaling, and profit improvement",
    },
    signsNeedBusinessCoach: {
      file: "signs-you-need-business-coach-for-growth.webp",
      width: 1200,
      height: 675,
      alt: "Signs you need a business coach for leadership, accountability, and business growth",
    },
    vbNews2026GrowthCourses: {
      file: "vivek-bindra-news-2026-business-growth-courses-industry-influence.webp",
      width: 1200,
      height: 675,
      alt: "Dr Vivek Bindra discussing business growth, entrepreneurship courses and industry influence in 2026",
    },
    vbLatestNews2026: {
      file: "vivek-bindra-latest-news-2026.webp",
      width: 1200,
      height: 675,
      alt: "Latest Vivek Bindra news and business updates in 2026 for entrepreneurs and MSMEs",
    },
    badaBusiness2026Stats: {
      file: "bada-business-2026-growth-statistics.webp",
      width: 1200,
      height: 675,
      alt: "Bada Business growth statistics, revenue and entrepreneurship platform performance in 2026",
    },
    petroIndustechPartnership: {
      file: "bada-business-petro-business-growth-partnership.webp",
      width: 1200,
      height: 675,
      alt: "Bada Business and Petro partnership featuring business leaders and growth collaboration",
    },
    snehanshPropertiesGrowth: {
      file: "snehansh-properties-dr-vivek-bindra-bada-business-growth.jpg",
      width: 1200,
      height: 675,
      alt: "Snehansh Properties growth with Dr Vivek Bindra and Bada Business",
    },
  };

  function basePath() {
    const custom = document.body && document.body.getAttribute("data-img-base");
    if (custom) return custom;
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

  function imageUrl(key) {
    const item = CATALOG[key];
    if (!item) return "";
    const relative = basePath() + "images/" + item.file;
    try {
      return new URL(relative, window.location.href).href;
    } catch (e) {
      return relative;
    }
  }

  function mountImage(el, key, options) {
    const item = CATALOG[key];
    if (!item) return;

    const fit = options.fit || "contain";
    const priority = options.priority || "low";
    const src = imageUrl(key);
    const fallback = imageUrl("business");

    const img = document.createElement("img");
    img.className = "media-img";
    img.src = src;
    img.alt = item.alt;
    img.width = item.width;
    img.height = item.height;
    img.loading = priority === "high" ? "eager" : "lazy";
    img.decoding = "async";
    if (priority === "high") img.setAttribute("fetchpriority", "high");
    img.style.objectFit = fit;
    img.style.objectPosition = "center center";

    img.addEventListener("error", function onErr() {
      if (img.src !== fallback) {
        img.src = fallback;
      } else {
        img.removeEventListener("error", onErr);
      }
    });

    el.innerHTML = "";
    el.appendChild(img);
    el.classList.add("is-loaded", "media-frame");
    if (
      !el.classList.contains("card__media") &&
      !el.classList.contains("card__image") &&
      !el.classList.contains("news-headline__thumb") &&
      !el.classList.contains("news-lead__media")
    ) {
      el.classList.add("card__media");
    }
  }

  function applyBackground(el, key) {
    const src = imageUrl(key);
    if (!src) return;
    el.classList.add("has-bg-image", "media-frame");
    el.style.setProperty("--bg-image-url", 'url("' + src + '")');
    const item = CATALOG[key];
    if (item && !el.getAttribute("aria-label")) {
      el.setAttribute("role", "img");
      el.setAttribute("aria-label", item.alt);
    }
  }

  function hydrate(root) {
    const scope = root || document;
    scope.querySelectorAll("[data-img]").forEach(function (el) {
      if (el.classList.contains("is-loaded")) return;
      const key = el.getAttribute("data-img");
      if (!CATALOG[key]) {
        console.warn("[images] Unknown key:", key);
        return;
      }
      const mode =
        el.getAttribute("data-img-mode") ||
        (el.classList.contains("web-story__slide") ? "bg" : "img");
      if (mode === "bg") {
        applyBackground(el, key);
        return;
      }
      mountImage(el, key, {
        fit: el.getAttribute("data-img-fit") || "contain",
        priority: el.getAttribute("data-img-priority") || "low",
      });
    });
  }

  function init() {
    hydrate(document);
  }

  global.BBN_IMAGES = {
    CATALOG,
    imageUrl,
    init,
    hydrate,
  };
})(window);
