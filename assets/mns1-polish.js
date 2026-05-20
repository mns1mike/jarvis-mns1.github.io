(function () {
  function ready(fn) {
    function run() {
      fn();
    }
    if (document.readyState === "loading") {
      run();
      document.addEventListener("DOMContentLoaded", run);
    } else {
      run();
    }
    setTimeout(run, 160);
    setTimeout(run, 700);
    setTimeout(run, 1800);
  }

  function isHomePage() {
    var path = window.location.pathname.replace(/\/+$/, "");
    return path === "" || path === "/";
  }

  function createProofModules() {
    var existing = document.getElementById("mns1-premium-modules");
    if (existing) existing.remove();
  }

  function createLaneMap() {
    var mount = document.getElementById("lane-map");
    if (!mount || mount.dataset.mns1Map === "ready") return;
    mount.dataset.mns1Map = "ready";
    mount.className = "mns1-lane-map";
    mount.removeAttribute("style");

    mount.innerHTML =
      '<div class="mns1-map-toolbar">' +
      '<div class="mns1-map-copy"><h3>Midwest Network</h3><p>Hiring coverage, freight density, and terminal gravity in one quick view.</p></div>' +
      '<div class="mns1-map-controls" aria-label="Map filters">' +
      '<button class="mns1-map-control is-active" type="button" data-mode="all">All</button>' +
      '<button class="mns1-map-control" type="button" data-mode="hiring">Hiring</button>' +
      '<button class="mns1-map-control" type="button" data-mode="freight">Freight</button>' +
      "</div></div>" +
      '<svg class="mns1-map-svg" viewBox="0 0 920 520" role="img" aria-label="MNS1 Midwest lane and hiring coverage map">' +
      '<path class="mns1-lane-line" d="M465 220 C420 190 360 180 306 212 S220 280 172 322" />' +
      '<path class="mns1-lane-line" d="M465 220 C505 170 570 148 640 132 S740 145 804 178" />' +
      '<path class="mns1-lane-line is-freight" d="M465 220 C520 250 580 268 642 300 S728 348 806 352" />' +
      '<path class="mns1-lane-line is-freight" d="M465 220 C450 282 462 334 506 388 S588 432 674 438" />' +
      state("Minnesota", "MN", 260, 88, 156, 88, "is-hiring") +
      state("Wisconsin", "WI", 420, 108, 126, 104, "is-hiring") +
      state("Michigan", "MI", 594, 104, 154, 112, "is-hiring is-network") +
      state("Iowa", "IA", 282, 220, 142, 92, "is-hiring") +
      state("Illinois", "IL", 440, 224, 100, 138, "is-hiring is-network") +
      state("Indiana", "IN", 552, 236, 96, 124, "is-hiring is-network") +
      state("Ohio", "OH", 660, 232, 118, 112, "is-hiring is-network") +
      state("Missouri", "MO", 322, 340, 160, 112, "is-hiring is-network") +
      state("Kentucky", "KY", 520, 384, 188, 78, "is-hiring is-network") +
      state("Nebraska", "NE", 118, 246, 148, 76, "is-network") +
      state("Kansas", "KS", 142, 346, 152, 74, "is-network") +
      '<circle class="mns1-terminal-dot" cx="465" cy="220" r="9" />' +
      '<text class="mns1-map-label" x="465" y="198">Plainfield HQ</text>' +
      '<circle class="mns1-terminal-dot" cx="172" cy="322" r="7" />' +
      '<text class="mns1-map-label" x="172" y="302">Omaha</text>' +
      '<circle class="mns1-terminal-dot" cx="232" cy="382" r="7" />' +
      '<text class="mns1-map-label" x="232" y="362">Kansas City</text>' +
      "</svg>" +
      '<div class="mns1-map-legend">' +
      '<div class="mns1-map-chip"><strong>11</strong>Hiring states</div>' +
      '<div class="mns1-map-chip"><strong>16</strong>Operating states</div>' +
      '<div class="mns1-map-chip"><strong>180+</strong>Company trucks</div>' +
      '<div class="mns1-map-chip"><strong>400+</strong>Dry vans</div>' +
      "</div>";

    function state(name, label, x, y, w, h, cls) {
      return (
        '<g data-kind="' +
        cls +
        '">' +
        '<rect class="mns1-state ' +
        cls +
        '" x="' +
        x +
        '" y="' +
        y +
        '" width="' +
        w +
        '" height="' +
        h +
        '" rx="14"><title>' +
        name +
        "</title></rect>" +
        '<text class="mns1-map-label" x="' +
        (x + w / 2) +
        '" y="' +
        (y + h / 2 + 4) +
        '">' +
        label +
        "</text></g>"
      );
    }

    mount.querySelectorAll(".mns1-map-control").forEach(function (button) {
      button.addEventListener("click", function () {
        var mode = button.dataset.mode;
        mount.querySelectorAll(".mns1-map-control").forEach(function (b) {
          b.classList.toggle("is-active", b === button);
        });
        mount.querySelectorAll(".mns1-state").forEach(function (stateEl) {
          var isHiring = stateEl.classList.contains("is-hiring");
          var isNetwork = stateEl.classList.contains("is-network");
          var show = mode === "all" || (mode === "hiring" && isHiring) || (mode === "freight" && isNetwork);
          stateEl.style.opacity = show ? "1" : "0.28";
        });
      });
    });
  }

  function enhanceHomeCards() {
    if (!isHomePage()) return;

    document.querySelectorAll("[data-mns1-home-card='true']").forEach(function (card) {
      card.classList.remove("mns1-polished-card", "mns1-home-card");
      card.removeAttribute("data-mns1-home-card");
      card.style.removeProperty("--card-delay");
    });

    function textLength(node) {
      return (node.innerText || "").replace(/\s+/g, " ").trim().length;
    }

    function hasCardShape(node) {
      var style = node.getAttribute("style") || "";
      if (style.indexOf("grid-template-columns") !== -1 || style.indexOf("display:grid") !== -1) return false;
      if ((style.indexOf("border-top") === 0 || style.indexOf("border-bottom") === 0) && style.indexOf("border:") === -1) return false;
      var framedCard = style.indexOf("border") !== -1 && style.indexOf("border-radius") !== -1;
      var panelCard = style.indexOf("background") !== -1 && style.indexOf("padding") !== -1 && (style.indexOf("min-height") !== -1 || style.indexOf("box-shadow") !== -1 || style.indexOf("justify-content: space-between") !== -1);
      var segmentedCell = style.indexOf("padding") !== -1 && style.indexOf("border") !== -1 && node.parentElement && /grid-template-columns/.test(node.parentElement.getAttribute("style") || "");
      return framedCard || panelCard || segmentedCell;
    }

    function isIndividualCard(card) {
      if (!hasCardShape(card)) return false;
      if (card.closest("header") || card.closest("footer")) return false;
      if (/^(A|BUTTON|INPUT|SELECT|TEXTAREA|FORM)$/i.test(card.tagName)) return false;
      if (textLength(card) < 24) return false;
      var nestedCards = Array.prototype.slice.call(card.querySelectorAll("[style*='border']")).filter(function (child) {
        if (textLength(child) < 20) return false;
        return hasCardShape(child);
      });
      return nestedCards.length === 0;
    }

    document.querySelectorAll("section").forEach(function (section, sectionIndex) {
      if (section.id === "mns1-premium-modules") return;
      section.classList.add("mns1-assemble-section");
      section.dataset.mns1Section = String(sectionIndex);
      Array.prototype.slice.call(section.querySelectorAll("div[style]")).filter(isIndividualCard).forEach(function (card, cardIndex) {
        card.classList.add("mns1-polished-card", "mns1-home-card");
        card.dataset.mns1HomeCard = "true";
        card.style.setProperty("--card-delay", Math.min(cardIndex, 8) * 38 + "ms");
      });
    });
  }

  function assembleOnScroll() {
    if (!isHomePage()) return;
    var sections = Array.prototype.slice.call(document.querySelectorAll(".mns1-assemble-section"));
    if (!sections.length) return;

    function update() {
      var vh = window.innerHeight || 900;
      sections.forEach(function (section) {
        var rect = section.getBoundingClientRect();
        var center = rect.top + rect.height * 0.5;
        var distance = Math.abs(center - vh * 0.54);
        var progress = Math.max(0, Math.min(1, 1 - distance / (vh * 0.82)));
        section.style.setProperty("--assemble", progress.toFixed(3));
      });
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  function createRollingReviews() {
    if (!isHomePage()) return;
    var reviewSection = Array.prototype.find.call(document.querySelectorAll("section"), function (section) {
      return /DRIVER REVIEWS|WHAT DRIVERS SAY/.test(section.innerText || "");
    });
    if (!reviewSection || reviewSection.dataset.mns1Reviews === "rolling") return;

    var candidates = Array.prototype.slice.call(reviewSection.querySelectorAll("div")).filter(function (node) {
      var style = node.getAttribute("style") || "";
      return style.indexOf("grid-template-columns") !== -1 && node.children.length >= 3 && /GOOGLE|INDEED|FACEBOOK|review/i.test(node.innerText || "");
    });
    var track = candidates[candidates.length - 1];
    if (!track) return;

    reviewSection.dataset.mns1Reviews = "rolling";
    track.classList.add("mns1-review-track");
    var originalCards = Array.prototype.slice.call(track.children);
    track.dataset.mns1Sets = "3";
    originalCards.forEach(function (card, index) {
      card.classList.add("mns1-review-card", "mns1-polished-card");
      card.style.setProperty("--card-delay", index * 55 + "ms");
    });
    [1, 2].forEach(function () {
      originalCards.forEach(function (card) {
        var clone = card.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        clone.classList.add("mns1-review-card", "mns1-polished-card");
        track.appendChild(clone);
      });
    });
  }

  function addMotion() {
    var revealTargets = document.querySelectorAll("section, .card, [style*='border-radius:8px'], [style*='border-radius: 8px']");
    revealTargets.forEach(function (el) {
      if (!el.classList.contains("mns1-reveal") && !el.closest("header") && !el.closest("footer")) {
        el.classList.add("mns1-reveal");
      }
      var style = el.getAttribute("style") || "";
      if (style.indexOf("border:1px solid #243063") !== -1 || style.indexOf("border: 1px solid #243063") !== -1) {
        el.classList.add("mns1-polished-card");
      }
    });

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".mns1-reveal").forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    document.querySelectorAll(".mns1-reveal").forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.96) {
        el.classList.add("is-visible");
      }
      observer.observe(el);
    });

    setTimeout(function () {
      document.querySelectorAll(".mns1-reveal:not(.is-visible)").forEach(function (el) {
        el.classList.add("is-visible");
      });
    }, 1400);
  }

  ready(function () {
    document.documentElement.classList.add("mns1-polished");
    createProofModules();
    enhanceHomeCards();
    createLaneMap();
    createRollingReviews();
    assembleOnScroll();
    addMotion();
  });
})();
