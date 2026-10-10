// Fades each [data-reveal] block up as it first comes into view. Blocks already on screen when
// this runs are shown at once, so nothing that was visible disappears.
(function () {
  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var blocks = document.querySelectorAll("[data-reveal]");
  var fold = window.innerHeight;
  blocks.forEach(function (el) {
    if (el.getBoundingClientRect().top < fold) el.classList.add("in");
  });
  document.documentElement.classList.add("io");
  var seen = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      seen.unobserve(e.target);
    });
  }, { rootMargin: "0px 0px -12% 0px" });
  blocks.forEach(function (el) { if (!el.classList.contains("in")) seen.observe(el); });
})();
