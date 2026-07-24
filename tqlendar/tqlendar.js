(() => {
  function createSlider({
    slides,
    dotsRoot,
    label,
    prevBtn,
    nextBtn,
    stage,
    autoMs = 4200,
  }) {
    if (!slides.length || !dotsRoot || !prevBtn || !nextBtn) return;

    let index = 0;
    let timer = null;

    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "dot" + (i === 0 ? " is-active" : "");
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", slides[i].dataset.label || `Slide ${i + 1}`);
      dot.addEventListener("click", () => goTo(i));
      dotsRoot.appendChild(dot);
    });

    const dots = Array.from(dotsRoot.querySelectorAll(".dot"));

    function goTo(next) {
      index = (next + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        const active = i === index;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", active ? "false" : "true");
      });
      dots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
      if (label) label.textContent = slides[index].dataset.label || "";
      restartAuto();
    }

    function next() {
      goTo(index + 1);
    }

    function prev() {
      goTo(index - 1);
    }

    function restartAuto() {
      clearInterval(timer);
      timer = setInterval(next, autoMs);
    }

    prevBtn.addEventListener("click", prev);
    nextBtn.addEventListener("click", next);

    let touchX = null;
    stage?.addEventListener(
      "touchstart",
      (e) => {
        touchX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );
    stage?.addEventListener(
      "touchend",
      (e) => {
        if (touchX == null) return;
        const dx = e.changedTouches[0].screenX - touchX;
        if (Math.abs(dx) > 40) {
          dx < 0 ? next() : prev();
        }
        touchX = null;
      },
      { passive: true }
    );

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) clearInterval(timer);
      else restartAuto();
    });

    restartAuto();
  }

  createSlider({
    slides: Array.from(document.querySelectorAll(".slide")),
    dotsRoot: document.getElementById("dots"),
    label: document.getElementById("slideLabel"),
    prevBtn: document.getElementById("prevSlide"),
    nextBtn: document.getElementById("nextSlide"),
    stage: document.querySelector(".phone-stage"),
    autoMs: 4200,
  });

  createSlider({
    slides: Array.from(document.querySelectorAll(".feature-slide")),
    dotsRoot: document.getElementById("featureDots"),
    label: document.getElementById("featureLabel"),
    prevBtn: document.getElementById("featurePrev"),
    nextBtn: document.getElementById("featureNext"),
    stage: document.querySelector(".feature-viewport"),
    autoMs: 5000,
  });
})();
