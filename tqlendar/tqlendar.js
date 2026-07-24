(() => {
  const slides = Array.from(document.querySelectorAll(".slide"));
  const dotsRoot = document.getElementById("dots");
  const label = document.getElementById("slideLabel");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");
  const stage = document.querySelector(".phone-stage");

  if (!slides.length || !dotsRoot || !label || !prevBtn || !nextBtn) return;

  let index = 0;
  let timer = null;
  const AUTO_MS = 4200;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "dot" + (i === 0 ? " is-active" : "");
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", slides[i].dataset.label || `Screen ${i + 1}`);
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
    label.textContent = slides[index].dataset.label || "";
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
    timer = setInterval(next, AUTO_MS);
  }

  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);

  // Touch swipe on the phone
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

  // Pause autoplay when tab is hidden
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) clearInterval(timer);
    else restartAuto();
  });

  restartAuto();
})();
