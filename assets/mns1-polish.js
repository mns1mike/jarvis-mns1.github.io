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
    if (!isHomePage() || document.getElementById("mns1-premium-modules")) return;

    var firstSection = document.querySelector("section");
    if (!firstSection || !firstSection.parentNode) return;

    var modules = [
      {
        icon: "$",
        title: "Pay Built For Miles",
        copy: "Clear weekly earning story, accessorial pay, per diem advantage, and no mystery math before a driver applies.",
        stat: "$1,650+",
        label: "Top driver weekly range",
      },
      {
        icon: "EQ",
        title: "Equipment Proof",
        copy: "2023+ Freightliners, eAPU, inverter, refrigerator, microwave, double bunk, and outward-only cameras.",
        stat: "2023+",
        label: "Freightliner fleet",
      },
      {
        icon: "34",
        title: "Home Time Planning",
        copy: "Focused Midwest freight makes the home-time promise believable because lanes stay inside the operating network.",
        stat: "34 HR",
        label: "Weekend reset target",
      },
      {
        icon: "FIT",
        title: "Driver Fit",
        copy: "The site should qualify the right CDL-A drivers early: experience, lane fit, home ZIP, and schedule preference.",
        stat: "11",
        label: "Hiring states",
      },
    ];

    var section = document.createElement("section");
    section.id = "mns1-premium-modules";
    section.className = "mns1-premium-section";
    section.innerHTML =
      '<div class="mns1-premium-wrap">' +
      '<div class="mns1-premium-kicker">Driver decision points</div>' +
      '<h2 class="mns1-premium-title">The proof drivers look for before they apply.</h2>' +
      '<div class="mns1-module-grid">' +
      modules
        .map(function (item) {
          return (
            '<article class="mns1-proof-card mns1-reveal">' +
            '<div class="mns1-proof-icon">' +
            item.icon +
            "</div>" +
            "<h3>" +
            item.title +
            "</h3>" +
            "<p>" +
            item.copy +
            "</p>" +
            '<div class="mns1-proof-stat"><strong>' +
            item.stat +
            "</strong><span>" +
            item.label +
            "</span></div>" +
            "</article>"
          );
        })
        .join("") +
      "</div></div>";

    firstSection.insertAdjacentElement("afterend", section);
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
      observer.observe(el);
    });
  }

  ready(function () {
    document.documentElement.classList.add("mns1-polished");
    createProofModules();
    createLaneMap();
    addMotion();
  });
})();
