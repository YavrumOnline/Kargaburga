// Grows every .snap block to a whole number of cells, so the block after it starts on a line of
// the paper. Without it the page reads the same, only off the grid.
(function () {
  function cell() {
    return parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--cell")) || 48;
  }
  function snap() {
    var c = cell();
    var all = Array.prototype.slice.call(document.querySelectorAll(".snap"));
    all.forEach(function (el) { el.style.minHeight = ""; });
    // Innermost first, so a block measures its children after they have grown.
    all.reverse().forEach(function (el) {
      var h = el.getBoundingClientRect().height;
      el.style.minHeight = Math.ceil(h / c - 0.01) * c + "px";
    });
    // A frame is whole cells wide; a centred one an even number, so both its sides meet a line.
    document.querySelectorAll(".box, .centred").forEach(function (el) {
      el.style.minWidth = "";
      var n = Math.ceil(el.getBoundingClientRect().width / c - 0.01);
      if (el.classList.contains("centred") && n % 2) n++;
      el.style.minWidth = n * c + "px";
    });
  }
  var t;
  window.addEventListener("resize", function () { clearTimeout(t); t = setTimeout(snap, 60); });
  window.addEventListener("load", snap);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(snap);
  snap();
})();
