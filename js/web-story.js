document.addEventListener("DOMContentLoaded", function () {
  if (window.BBN_IMAGES && typeof window.BBN_IMAGES.init === "function") {
    window.BBN_IMAGES.init();
  }

  const slides = document.querySelectorAll(".web-story__slide");
  const dots = document.querySelectorAll(".web-story__dot");
  const prev = document.querySelector(".web-story__prev");
  const next = document.querySelector(".web-story__next");
  let current = 0;

  function goTo(index) {
    if (!slides.length) return;
    current = (index + slides.length) % slides.length;
    slides.forEach(function (s, i) {
      s.classList.toggle("is-active", i === current);
    });
    dots.forEach(function (d, i) {
      d.classList.toggle("is-active", i === current);
      d.setAttribute("aria-current", i === current ? "true" : "false");
    });
  }

  if (next) next.addEventListener("click", function () { goTo(current + 1); });
  if (prev) prev.addEventListener("click", function () { goTo(current - 1); });
  dots.forEach(function (dot, i) {
    dot.addEventListener("click", function () { goTo(i); });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") goTo(current + 1);
    if (e.key === "ArrowLeft") goTo(current - 1);
  });
});
