(function () {
  "use strict";

  /* ─── TAB SWITCHING ─── */
  const tabBtns      = document.querySelectorAll(".tab-btn");
  const panels       = document.querySelectorAll(".tab-panel");
  const indicator    = document.getElementById("tab-indicator");
  const nav          = document.getElementById("tab-nav");

  function moveIndicator(btn) {
    const navRect = nav.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    indicator.style.left  = (btnRect.left - navRect.left - 5) + "px"; // -5 for nav padding
    indicator.style.width = btnRect.width + "px";
  }

  function switchTab(targetTab) {
    tabBtns.forEach((btn) => {
      const isActive = btn.dataset.tab === targetTab;
      btn.classList.toggle("active", isActive);
    });

    panels.forEach((panel) => {
      const isActive = panel.id === "panel-" + targetTab;
      panel.classList.toggle("active", isActive);

      // Re-trigger card animations on every tab switch
      if (isActive) {
        panel.querySelectorAll(".review-card, .comment-card").forEach((card) => {
          card.style.animation = "none";
          // Force reflow
          void card.offsetWidth;
          card.style.animation = "";
        });
      }
    });

    const activeBtn = document.querySelector(`.tab-btn[data-tab="${targetTab}"]`);
    if (activeBtn) moveIndicator(activeBtn);
  }

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });

  // Set indicator on load after layout
  window.addEventListener("load", () => {
    const activeBtn = document.querySelector(".tab-btn.active");
    if (activeBtn) moveIndicator(activeBtn);
  });

  // Recalculate on resize
  window.addEventListener("resize", () => {
    const activeBtn = document.querySelector(".tab-btn.active");
    if (activeBtn) moveIndicator(activeBtn);
  });


  /* ─── VOTE BUTTONS ─── */
  document.querySelectorAll(".vote-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const countEl  = this.querySelector(".vote-count");
      const isActive = this.dataset.voted === "true";
      const delta    = isActive ? -1 : 1;
      const current  = parseInt(countEl.textContent, 10);

      // If voting up, clear any sibling downvote on the same card and vice versa
      const parent   = this.closest(".rc-footer, .cc-votes");
      if (parent) {
        const sibling = this.classList.contains("upvote")
          ? parent.querySelector(".downvote")
          : parent.querySelector(".upvote");

        if (sibling && sibling.dataset.voted === "true") {
          const sibCount = sibling.querySelector(".vote-count");
          sibCount.textContent = parseInt(sibCount.textContent, 10) - 1;
          sibling.dataset.voted = "false";
          sibling.classList.remove("voted");
        }
      }

      countEl.textContent  = Math.max(0, current + delta);
      this.dataset.voted   = (!isActive).toString();
      this.classList.toggle("voted", !isActive);

      // Micro pop animation
      countEl.animate(
        [{ transform: "scale(1.4)" }, { transform: "scale(1)" }],
        { duration: 200, easing: "cubic-bezier(.4,0,.2,1)" }
      );
    });
  });

})();