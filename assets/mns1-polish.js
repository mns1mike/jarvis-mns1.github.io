(function () {
  function ready(fn) {
    function run() {
      fn();
    }
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", run, { once: true });
    } else {
      run();
    }
    setTimeout(run, 160);
    setTimeout(run, 700);
    setTimeout(run, 1800);
  }

  function isHomePage() {
    var path = window.location.pathname.replace(/\/+$/, "");
    return path === "" || path === "/" || path === "";
  }

  function isShippersPage() {
    return /\/shippers(?:\.html)?$/i.test(window.location.pathname.replace(/\/+$/, ""));
  }

  function isBlogPage() {
    return /^\/blog(?:\/|\.html|$)/i.test(window.location.pathname);
  }

  function observeOnce(target, visibleClass, options) {
    if (!target) return;
    function markVisible() {
      target.classList.add(visibleClass);
    }
    function alreadyVisible() {
      var rect = target.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight || 900;
      return rect.top < vh * 0.88 && rect.bottom > vh * 0.08;
    }
    if (alreadyVisible()) {
      markVisible();
      return;
    }
    if (!("IntersectionObserver" in window)) {
      markVisible();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add(visibleClass);
          observer.unobserve(entry.target);
        }
      });
    }, options || { rootMargin: "0px 0px -14% 0px", threshold: 0.22 });

    observer.observe(target);
    setTimeout(function () {
      if (alreadyVisible()) {
        markVisible();
        observer.unobserve(target);
      }
    }, 120);
  }

  function enhanceQuickApplyGlow() {
    if (!isHomePage()) return;
    document.querySelectorAll("form.quick-apply").forEach(function (form) {
      form.dataset.mns1Glow = "ready";
    });
  }

  function enhanceApplyCtas() {
    Array.prototype.slice.call(document.querySelectorAll("header button, header a")).forEach(function (cta) {
      if (!/Apply\s+in\s+4\s+mins/i.test(cta.textContent || "")) return;
      cta.classList.add("mns1-top-apply-cta");
    });
  }

  function linkLaneCityJobs() {
    if (!/\/lanes(?:\.html)?$/i.test(window.location.pathname.replace(/\/+$/, ""))) return;
    var cityLinks = [
      { label: "kansas city ks", href: "/jobs/cdl-a-driver-kansas-city-ks/" },
      { label: "omaha ne", href: "/jobs/cdl-a-driver-omaha-ne/" }
    ];

    Array.prototype.slice.call(document.querySelectorAll("div, a")).forEach(function (node) {
      var text = normalizeHeadingText(node.innerText || node.textContent);
      var match = cityLinks.find(function (item) {
        return text === item.label;
      });
      if (!match || node.dataset.mns1LaneJobLink === "ready") return;

      node.dataset.mns1LaneJobLink = "ready";
      node.dataset.mns1LaneJobHref = match.href;
      node.classList.add("mns1-lane-city-link");
      node.setAttribute("role", "link");
      node.setAttribute("tabindex", "0");
      if (/^A$/i.test(node.tagName || "")) {
        node.setAttribute("href", match.href);
      }
      node.addEventListener("click", function () {
        window.location.href = match.href;
      });
      node.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          window.location.href = match.href;
        }
      });
    });
  }

  function normalizeBlogIndexLinks() {
    Array.prototype.slice.call(document.querySelectorAll("a[href]")).forEach(function (link) {
      var raw = link.getAttribute("href") || "";
      var url;
      try {
        url = new URL(raw, window.location.href);
      } catch (error) {
        return;
      }
      if (url.origin !== window.location.origin) return;
      var path = url.pathname.replace(/\/+$/, "");
      if (path !== "/blog" && path !== "/blog.html") return;
      link.setAttribute("href", "/blog/");
      link.dataset.mns1BlogIndex = "ready";
    });
  }

  function prepareShipperStatStrip() {
    if (!isShippersPage()) return;
    var grid = Array.prototype.find.call(document.querySelectorAll("section div[style*='grid-template-columns']"), function (node) {
      var text = (node.innerText || node.textContent || "").replace(/\s+/g, " ");
      return /Company trucks/i.test(text) && /Dry van trailers/i.test(text) && /Midwest states/i.test(text) && /Established/i.test(text);
    });
    if (!grid) return;

    grid.classList.add("mns1-stat-strip", "mns1-shipper-stat-strip");
    var section = grid.closest("section");
    if (section) section.classList.add("mns1-shipper-stat-band");
    Array.prototype.slice.call(grid.children).forEach(function (cell, index) {
      var text = (cell.innerText || cell.textContent || "").replace(/\s+/g, " ").trim();
      if (!/(Company trucks|Dry van trailers|Midwest states|Established)/i.test(text)) return;
      cell.classList.add("stat-cell", "mns1-shipper-stat-cell");
      cell.style.setProperty("--roll-delay", index * 95 + "ms");
    });
  }

  function enhanceStatRoll() {
    if (!isHomePage() && !isShippersPage()) return;
    prepareShipperStatStrip();
    var cells = Array.prototype.slice.call(document.querySelectorAll(".stat-cell"));
    if (!cells.length) return;

    var strips = [];
    cells.forEach(function (cell) {
      if (cell.parentElement && strips.indexOf(cell.parentElement) === -1) strips.push(cell.parentElement);
    });

    strips.forEach(function (strip) {
      var stripCells = Array.prototype.slice.call(strip.querySelectorAll(":scope > .stat-cell"));
      if (!stripCells.length || strip.dataset.mns1Stats === "ready") return;
      strip.dataset.mns1Stats = "ready";
      strip.classList.add("mns1-stat-strip");

      stripCells.forEach(function (cell, index) {
        var fromLeft = index % 2 === 0;
        cell.classList.add("mns1-stat-roll");
        cell.style.setProperty("--roll-delay", index * 95 + "ms");
        cell.style.setProperty("--roll-from", fromLeft ? "-88px" : "88px");
        cell.style.setProperty("--roll-tilt", fromLeft ? "-4deg" : "4deg");
      });

      observeOnce(strip, "is-rolled-in", { rootMargin: "0px 0px -18% 0px", threshold: 0.28 });
    });
  }

  function normalizeHeadingText(value) {
    return (value || "")
      .toLowerCase()
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9+' ]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function enhanceHeadingAccents() {
    var accents = [
      { phrase: "strong weekly pay real weekend home time", accent: "Real Weekend Home Time.", lineBreak: true },
      { phrase: "2023+ freightliners the whole fleet", accent: "The Whole Fleet.", lineBreak: true },
      { phrase: "home when we say you'll be home", accent: "You'll Be Home", lineBreak: true },
      { phrase: "otr midwest no southeast surprises", accent: "No Southeast Surprises.", lineBreak: true },
      { phrase: "midwest dry van coverage 180+ trucks", accent: "180+ Trucks.", lineBreak: true },
      { phrase: "questions answers", accent: "Answers.", lineBreak: false }
    ];

    function escapeRegExp(value) {
      return value.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    }

    function accentPattern(value) {
      return new RegExp(escapeRegExp(value).replace(/\\ /g, "\\s+").replace(/'/g, "['\u2019]"), "i");
    }

    Array.prototype.slice.call(document.querySelectorAll("h1, h2")).forEach(function (heading) {
      if (heading.dataset.mns1Accent === "ready" || heading.querySelector(".mns1-heading-blue")) return;
      var source = (heading.textContent || "").replace(/\s+/g, " ").trim();
      var normalized = normalizeHeadingText(source);
      var rule = accents.find(function (item) {
        return normalized === item.phrase || normalized.indexOf(item.phrase) !== -1;
      });
      if (!rule) return;

      var match = source.match(accentPattern(rule.accent));
      if (!match) return;

      var before = source.slice(0, match.index).replace(/\s+$/, "");
      var accent = source.slice(match.index, match.index + match[0].length).trim();
      var after = source.slice(match.index + match[0].length).replace(/^\s+/, "");
      var span = document.createElement("span");
      span.className = "mns1-heading-blue";
      span.textContent = accent;

      heading.textContent = "";
      if (before) heading.appendChild(document.createTextNode(before));
      if (before && rule.lineBreak) {
        heading.appendChild(document.createElement("br"));
      } else if (before) {
        heading.appendChild(document.createTextNode(" "));
      }
      heading.appendChild(span);
      if (after) heading.appendChild(document.createTextNode(" " + after));
      heading.dataset.mns1Accent = "ready";
    });
  }

  function prepareWriteText() {
    var phrases = [
      "top pay real respect a truck you'll be proud to drive",
      "four things we promise and mean every word",
      "what drivers say linked to the source",
      "one brand one spec 2023 or newer cascadias",
      "16 states one midwest backbone",
      "freight that moves when you said it would",
      "started with one truck built on one promise",
      "questions you're actually asking",
      "strong weekly pay real weekend home time",
      "pay components",
      "benefits that support the pay",
      "2023+ freightliners the whole fleet",
      "your truck your home",
      "53' dry vans great dane and utility",
      "policies that respect drivers",
      "drive new iron",
      "home when we say you'll be home",
      "pick your rhythm",
      "no guessing games",
      "don't take our word for it",
      "every carrier says that",
      "ready to get home",
      "otr midwest no southeast surprises",
      "11 midwest states",
      "where we run",
      "focused lanes better home time",
      "in our coverage area",
      "midwest dry van coverage 180+ trucks",
      "what we haul",
      "what sets us apart",
      "dense midwest network",
      "need midwest capacity",
      "driver guides",
      "latest articles",
      "don't wait for the blog",
      "questions answers",
      "do you qualify here's everything",
      "the basics",
      "motor vehicle record standards",
      "5 year major violations",
      "1 year moving violations",
      "3 year accident history",
      "required documents",
      "not sure if you qualify",
      "meet the requirements"
    ];

    function triggerWrite(heading) {
      heading.classList.remove("is-writing");
      void heading.offsetWidth;
      heading.classList.add("is-writing");
    }

    function observeWriteRepeat(heading) {
      if (!("IntersectionObserver" in window)) {
        triggerWrite(heading);
        return;
      }

      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              triggerWrite(entry.target);
            } else {
              entry.target.classList.remove("is-writing");
            }
          });
        },
        { rootMargin: "0px 0px -18% 0px", threshold: 0.32 }
      );

      observer.observe(heading);
      if (heading.getBoundingClientRect().top < (window.innerHeight || 900) * 0.86) {
        triggerWrite(heading);
      }
    }

    function applyWriteHeading(heading, text) {
      if (heading.dataset.mns1Write === "ready") return;
      heading.dataset.mns1Write = "ready";
      heading.classList.add("mns1-write-text");
      heading.style.setProperty("--write-steps", String(Math.max(18, Math.min(72, text.length))));
      observeWriteRepeat(heading);
    }

    function splitHeadingAfterColon(heading) {
      if (heading.querySelector(".mns1-heading-blue")) return;
      var source = (heading.textContent || "").replace(/\s+/g, " ").trim();
      var index = source.indexOf(":");
      if (index < 0 || index >= source.length - 1) return;
      var first = source.slice(0, index + 1).trim();
      var second = source.slice(index + 1).trim();
      if (!first || !second) return;
      var span = document.createElement("span");
      span.className = "mns1-heading-blue";
      span.textContent = second;
      heading.textContent = "";
      heading.appendChild(document.createTextNode(first));
      heading.appendChild(document.createElement("br"));
      heading.appendChild(span);
    }

    function isWriteCandidate(heading, text) {
      if (!text || text.length < 7 || text.length > 96) return false;
      if (heading.closest("header") || heading.closest("footer")) return false;
      if (heading.closest(".article-card, .job-card, .state-link-card, .card, .panel, .benefit-card")) return false;
      if (/^0?\d+$/.test(text)) return false;
      return /^(H1|H2)$/i.test(heading.tagName || "");
    }

    Array.prototype.slice.call(document.querySelectorAll("h1, h2, h3")).forEach(function (heading) {
      var text = normalizeHeadingText(heading.innerText || heading.textContent);
      var match = phrases.some(function (phrase) {
        return text === phrase || text.indexOf(phrase) !== -1;
      });

      if (!match && !isWriteCandidate(heading, text)) return;
      applyWriteHeading(heading, text);
    });

    if (isBlogPage()) {
      Array.prototype.slice.call(document.querySelectorAll(".article-card h2, main h1")).forEach(function (heading) {
        var text = normalizeHeadingText(heading.innerText || heading.textContent);
        if (!text || heading.dataset.mns1BlogTitle === "ready") return;
        heading.dataset.mns1BlogTitle = "ready";
        heading.classList.add("mns1-blog-title");
        splitHeadingAfterColon(heading);
      });
    }
  }

  function enhanceStoryTimeline() {
    if (!isHomePage()) return;
    var storySection = Array.prototype.find.call(document.querySelectorAll("section"), function (section) {
      return /OUR STORY/i.test(section.innerText || "") && /THE ROAD SO FAR/i.test(section.innerText || "");
    });
    if (!storySection) return;

    Array.prototype.slice.call(storySection.querySelectorAll("div")).forEach(function (node) {
      if ((node.innerText || "").trim() === "NS") node.textContent = "MN";
    });

    var timelineCard = Array.prototype.find.call(storySection.querySelectorAll(".mns1-home-card, div[style]"), function (node) {
      var text = node.innerText || "";
      return /^\s*The road so far/i.test(text) && /Current\s+180\+/i.test(text);
    });
    if (timelineCard) timelineCard.classList.add("mns1-story-timeline-card");

    var metrics = Array.prototype.slice.call(storySection.querySelectorAll("div[style]")).filter(function (node) {
      var text = (node.innerText || "").replace(/\s+/g, " ").trim();
      var style = node.getAttribute("style") || "";
      return /^(2011|2018|2024|Current)\b/.test(text) && /grid-template-columns:\s*74px\s+1fr/.test(style);
    });

    metrics.forEach(function (metric) {
      metric.classList.add("mns1-story-metric");
      if (/^Current\b/.test((metric.innerText || "").trim())) {
        metric.classList.add("mns1-current-story-card", "mns1-feature-glow-card");
      }
      if (metric.parentElement) metric.parentElement.classList.add("mns1-story-metrics-wrap");
    });

    Array.prototype.slice.call(storySection.querySelectorAll("div[style]")).forEach(function (node) {
      var text = node.innerText || "";
      var style = node.getAttribute("style") || "";
      if (/Founder\s+·\s+MNS1 Express/i.test(text) && /You run good equipment/i.test(text) && /border/i.test(style)) {
        node.classList.add("mns1-founder-quote-text");
      }
    });
  }

  function markSpecialCards() {
    function normalizeSpecial(value) {
      return (value || "")
        .toLowerCase()
        .replace(/[\u2018\u2019]/g, "'")
        .replace(/[^a-z0-9+' ]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .toUpperCase();
    }

    var path = window.location.pathname;

    if (/pay(?:\.html)?$/i.test(path)) {
      Array.prototype.slice.call(document.querySelectorAll("aside.panel")).forEach(function (panel) {
        if (!/PAY SNAPSHOT/i.test(panel.innerText || "")) return;
        panel.classList.add("mns1-pay-snapshot-card");
        Array.prototype.slice.call(panel.querySelectorAll("p")).forEach(function (row) {
          row.classList.add("mns1-pay-snapshot-row");
        });
      });
    }

    Array.prototype.slice.call(document.querySelectorAll("div, a, aside")).forEach(function (node) {
      var text = normalizeSpecial(node.innerText || node.textContent);
      var style = node.getAttribute("style") || "";
      var isFramedBox = /border-radius/i.test(style) && /padding/i.test(style) && /border/i.test(style);

      if (/home-time/i.test(path) && isFramedBox && /^(HOME EVERY WEEKEND 1 WEEK OUT|MOST POPULAR SCHEDULE 2 WEEKS OUT|MAXIMUM EARNING POTENTIAL 3 WEEKS OUT|CHOOSE YOUR SCHEDULE|DESIGNATED SATURDAY|DISPATCH AROUND IT|HOME DATE CONFIRMED)\b/.test(text)) {
        node.classList.add("mns1-home-time-card");
      }
      if (isFramedBox && /^MOST POPULAR SCHEDULE 2 WEEKS OUT\b/.test(text)) {
        node.classList.add("mns1-feature-glow-card");
      }
      if (/^\/jobs\/#/i.test(node.getAttribute("href") || "") && text.length < 22) {
        node.classList.add("mns1-lane-state-card");
      }
      if (/^(KANSAS CITY KS|OMAHA NE)$/.test(text)) {
        node.classList.add("mns1-lane-city-card");
      }
      if (/shippers/i.test(path) && isFramedBox && /^(DRY VAN|NO TOUCH FREIGHT|ASSET BASED FLEET|16 STATE COVERAGE|ON TIME PERFORMANCE)\b/.test(text)) {
        node.classList.add("mns1-shipper-service-card");
      }
      if (/requirements/i.test(path) && isFramedBox && /^(AGE 25 YEARS OR OLDER|CDL EXPERIENCE 24 MONTHS CLASS A CDL REQUIRED|MEDICAL CURRENT DOT PHYSICAL CARD|JOB HISTORY MAX 4 JOBS|CRIMINAL DUI NO DUI|SAP PROGRAM NO SAP|MVR NO DUI|SAP NO SAP|VALID CLASS A CDL|CURRENT DOT MEDICAL CARD|SOCIAL SECURITY CARD|VOIDED CHECK)\b/.test(text)) {
        node.classList.add("mns1-requirement-card");
      }
    });
  }

  function enhanceFaqInteractions() {
    var questionPattern = /^(how fast can i start|what cdl a experience do you require|how is pay calculated exactly|can i bring my pet (ride along|passenger)|what does your safety score look like|how much does mns1 pay|how does home time work|what trucks do you run|what's the pet policy|can i bring a rider|what happens at orientation|are there inward facing cameras|is dispatch forced|how long does the application take)$/;

    function normalizedButtonText(button) {
      return normalizeHeadingText(button.innerText || button.textContent).replace(/^(?:0\s*)?\d+\s*/, "");
    }

    function updatePassengerLabel(button, text) {
      if (text !== "can i bring my pet ride along") return;
      var label = Array.prototype.find.call(button.querySelectorAll("span"), function (span) {
        return normalizeHeadingText(span.textContent || "") === text;
      });
      if (label) {
        label.textContent = "Can I bring my pet? Passenger?";
        return;
      }
      button.childNodes.forEach(function (node) {
        if (node.nodeType === 3 && /Can I bring my pet\?\s*Ride-along\?/i.test(node.nodeValue || "")) {
          node.nodeValue = (node.nodeValue || "").replace(/Can I bring my pet\?\s*Ride-along\?/i, "Can I bring my pet? Passenger?");
        }
      });
    }

    function isOpenAnswer(node, card) {
      var box = node.parentElement && node.parentElement !== card ? node.parentElement : node;
      var style = window.getComputedStyle(box);
      var maxHeight = parseFloat(style.maxHeight || "");
      if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") return false;
      if (!Number.isNaN(maxHeight) && maxHeight < 2) return false;
      return box.getBoundingClientRect().height > 2;
    }

    function showAnswer(node) {
      var text = (node.innerText || node.textContent || "").replace(/\s+/g, " ").trim();
      if (text.length < 10) return;
      node.classList.add("mns1-faq-answer-text");
      node.dataset.mns1FaqAnswer = "ready";
    }

    function answerNodes(card) {
      var nodes = [];
      Array.prototype.slice.call(card.children).forEach(function (child) {
        if (/^BUTTON$/i.test(child.tagName || "")) return;
        var paragraphs = Array.prototype.slice.call(child.querySelectorAll("p"));
        if (paragraphs.length) {
          nodes = nodes.concat(paragraphs);
          return;
        }
        nodes.push(child);
      });
      return nodes;
    }

    function triggerOpenAnswer(card) {
      answerNodes(card).forEach(function (node) {
        if (isOpenAnswer(node, card)) showAnswer(node);
      });
    }

    Array.prototype.slice.call(document.querySelectorAll("button")).forEach(function (button, index) {
      var text = normalizedButtonText(button);
      updatePassengerLabel(button, text);
      if (!questionPattern.test(text)) return;
      var card = button.parentElement;
      if (!card || !card.closest("section")) return;
      card.classList.add("mns1-faq-card");
      card.style.setProperty("--card-delay", Math.min(index, 8) * 34 + "ms");
      if (button.dataset.mns1FaqButton !== "ready") {
        button.dataset.mns1FaqButton = "ready";
        button.addEventListener("click", function () {
          [40, 180, 380].forEach(function (delay) {
            window.setTimeout(function () {
              triggerOpenAnswer(card);
            }, delay);
          });
        });
      }
      window.setTimeout(function () {
        triggerOpenAnswer(card);
      }, 140);
    });
  }

  function manageMobileStickyCta() {
    var form = document.querySelector("form.quick-apply");
    if (!form) return;
    if (form.dataset.mns1StickyCta === "ready") return;
    form.dataset.mns1StickyCta = "ready";
    var stickyCtas = Array.prototype.slice.call(document.querySelectorAll(".show-mobile")).filter(function (node) {
      var style = node.getAttribute("style") || "";
      return /position:\s*fixed/i.test(style) && /bottom:\s*0/i.test(style);
    });
    document.body.classList.add("mns1-sticky-cta-ready");

    function setStickyHidden(hidden) {
      document.body.classList.toggle("mns1-form-in-view", hidden);
      stickyCtas.forEach(function (cta) {
        cta.style.transform = hidden ? "translateY(calc(100% + 18px))" : "";
        cta.style.opacity = hidden ? "0" : "";
        cta.style.pointerEvents = hidden ? "none" : "";
      });
    }

    function update() {
      var rect = form.getBoundingClientRect();
      var vh = window.innerHeight || 900;
      var visible = rect.top < vh * 0.92 && rect.bottom > vh * 0.12;
      setStickyHidden(visible);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(update, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });
      observer.observe(form);
    }
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
    if (isHomePage()) mount.classList.add("mns1-home-lane-map");
    mount.removeAttribute("style");

    var isHomeMap = isHomePage();
    mount.innerHTML =
      (isHomeMap
        ? ""
        : '<div class="mns1-map-toolbar">' +
          '<div class="mns1-map-copy"><h3>Midwest Network</h3><p>Hiring coverage, freight density, and terminal gravity in one quick view.</p></div>' +
          '<div class="mns1-map-controls" aria-label="Map filters">' +
          '<button class="mns1-map-control is-active" type="button" data-mode="all">All</button>' +
          '<button class="mns1-map-control" type="button" data-mode="hiring">Hiring</button>' +
          '<button class="mns1-map-control" type="button" data-mode="freight">Freight</button>' +
          "</div></div>") +
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
      state("Nebraska", "NE", 118, 246, 148, 76, "is-hiring is-network") +
      state("Kansas", "KS", 142, 346, 152, 74, "is-hiring is-network") +
      '<circle class="mns1-terminal-dot" cx="465" cy="220" r="9" />' +
      '<text class="mns1-map-label" x="465" y="198">Plainfield HQ</text>' +
      '<circle class="mns1-terminal-dot" cx="172" cy="322" r="7" />' +
      '<text class="mns1-map-label" x="172" y="302">Omaha</text>' +
      '<circle class="mns1-terminal-dot" cx="232" cy="382" r="7" />' +
      '<text class="mns1-map-label" x="232" y="362">Kansas City</text>' +
      "</svg>" +
      (isHomeMap
        ? ""
        : '<div class="mns1-map-legend">' +
          '<div class="mns1-map-chip"><strong>13</strong>Hiring states</div>' +
          '<div class="mns1-map-chip"><strong>16</strong>Operating states</div>' +
          '<div class="mns1-map-chip"><strong>180+</strong>Company trucks</div>' +
          '<div class="mns1-map-chip"><strong>400+</strong>Dry vans</div>' +
          "</div>");

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

  function flattenHomeReactMap() {
    if (!isHomePage()) return;

    var svg = document.querySelector('svg[aria-label="MNS1 Midwest lane coverage map"]');
    if (!svg) return;

    var wrapper = svg.closest("div[style]");
    if (!wrapper || wrapper.dataset.mns1PlainMap === "ready") return;

    var card = wrapper.parentElement;
    while (card && card !== document.body) {
      var text = card.textContent || "";
      if (text.indexOf("Lane coverage") !== -1 && text.indexOf("16 states active") !== -1) break;
      card = card.parentElement;
    }
    if (!card || card === document.body) return;

    card.dataset.mns1PlainMap = "ready";
    card.classList.remove("mns1-polished-card", "mns1-home-card", "mns1-reveal");
    card.style.background = "transparent";
    card.style.border = "0";
    card.style.borderRadius = "0";
    card.style.boxShadow = "none";
    card.style.padding = "0";
    card.style.overflow = "visible";

    var grid = card.firstElementChild;
    if (grid && grid !== wrapper) {
      grid.style.inset = "0";
      grid.style.borderRadius = "0";
      grid.style.display = "none";
    }

    Array.prototype.slice.call(card.children).forEach(function (child) {
      if (child === wrapper || child === grid) return;
      if ((child.textContent || "").indexOf("Lane coverage") !== -1) child.style.display = "none";
    });
  }

  function enhanceHomeCards() {
    if (isBlogPage()) return;
    document.querySelectorAll("[data-mns1-home-card='true']").forEach(function (card) {
      card.classList.remove("mns1-polished-card", "mns1-home-card");
      card.removeAttribute("data-mns1-home-card");
      card.style.removeProperty("--card-delay");
    });
    document.querySelectorAll(".mns1-card-grid-reset").forEach(function (grid) {
      grid.classList.remove("mns1-card-grid-reset");
    });

    function textLength(node) {
      return (node.innerText || "").replace(/\s+/g, " ").trim().length;
    }

    function hasCardShape(node) {
      var style = node.getAttribute("style") || "";
      var className = String(node.className || "");
      var classCard = /(^|\s)(card|panel|article-card|benefit-card|job-card|state-link-card|state-job-card|terminal-card|mns1-story-metric|mns1-lane-state-card|mns1-lane-city-card|mns1-shipper-stat-card|mns1-shipper-service-card|mns1-home-time-card|mns1-pay-snapshot-row|mns1-requirement-card|mns1-faq-card)(\s|$)/.test(className);
      if (!classCard && (style.indexOf("grid-template-columns") !== -1 || style.indexOf("display:grid") !== -1)) return false;
      if (!classCard && (style.indexOf("border-top") === 0 || style.indexOf("border-bottom") === 0) && style.indexOf("border:") === -1) return false;
      var framedCard = style.indexOf("border") !== -1 && style.indexOf("border-radius") !== -1;
      var panelCard = style.indexOf("background") !== -1 && style.indexOf("padding") !== -1 && (style.indexOf("min-height") !== -1 || style.indexOf("box-shadow") !== -1 || style.indexOf("justify-content: space-between") !== -1);
      var segmentedCell = style.indexOf("padding") !== -1 && style.indexOf("border") !== -1 && node.parentElement && /grid-template-columns/.test(node.parentElement.getAttribute("style") || "");
      return classCard || framedCard || panelCard || segmentedCell;
    }

    function isIndividualCard(card) {
      if (!hasCardShape(card)) return false;
      if (card.closest("header") || card.closest("footer")) return false;
      if (card.classList.contains("mns1-story-timeline-card")) return false;
      if (card.classList.contains("mns1-pay-snapshot-card")) return false;
      if (card.classList.contains("mns1-founder-quote-text")) return false;
      var sectionText = card.closest("section") ? card.closest("section").innerText || "" : "";
      if (/DRIVER REVIEWS|WHAT DRIVERS SAY/i.test(sectionText)) return false;
      if (/^(BUTTON|INPUT|SELECT|TEXTAREA|FORM)$/i.test(card.tagName)) return false;
      var compactCard = /(^|\s)(state-job-card|mns1-story-metric|mns1-lane-state-card|mns1-lane-city-card|mns1-shipper-stat-card|mns1-pay-snapshot-row|mns1-requirement-card|mns1-faq-card)(\s|$)/.test(String(card.className || ""));
      if (textLength(card) < (compactCard ? 6 : 24)) return false;
      var nestedCards = Array.prototype.slice.call(card.querySelectorAll("div[style], a[style], a.card, .article-card, .benefit-card, .job-card, .state-link-card, .state-job-card, .panel, .mns1-story-metric, .mns1-lane-state-card, .mns1-lane-city-card, .mns1-shipper-stat-card, .mns1-shipper-service-card, .mns1-home-time-card, .mns1-pay-snapshot-row, .mns1-requirement-card, .mns1-faq-card")).filter(function (child) {
        if (textLength(child) < 20) return false;
        return hasCardShape(child);
      });
      return nestedCards.length === 0;
    }

    document.querySelectorAll("section").forEach(function (section, sectionIndex) {
      if (section.id === "mns1-premium-modules") return;
      section.classList.add("mns1-assemble-section");
      section.dataset.mns1Section = String(sectionIndex);
      Array.prototype.slice.call(section.querySelectorAll("div[style], a[style], div.card, a.card, a.state-job-card, aside.panel, p.mns1-pay-snapshot-row, .article-card, .benefit-card, .job-card, .state-link-card, .state-job-card, .terminal-card, .panel, .mns1-story-metric, .mns1-lane-state-card, .mns1-lane-city-card, .mns1-shipper-stat-card, .mns1-shipper-service-card, .mns1-home-time-card, .mns1-pay-snapshot-row, .mns1-requirement-card, .mns1-faq-card")).filter(isIndividualCard).forEach(function (card, cardIndex) {
        card.classList.add("mns1-polished-card", "mns1-home-card");
        card.dataset.mns1HomeCard = "true";
        card.style.setProperty("--card-delay", Math.min(cardIndex, 8) * 38 + "ms");
        if (card.parentElement && (/grid-template-columns/.test(card.parentElement.getAttribute("style") || "") || /(^|\s)(grid|article-grid|job-grid|benefits-grid|mns1-story-metrics-wrap)(\s|$)/.test(String(card.parentElement.className || "")))) {
          card.parentElement.classList.add("mns1-card-grid-reset");
        }
      });
    });
  }

  function assembleOnScroll() {
    if (isBlogPage()) return;
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
    if (!track.parentElement.classList.contains("mns1-review-rail")) {
      var rail = document.createElement("div");
      rail.className = "mns1-review-rail";
      track.parentElement.insertBefore(rail, track);
      rail.appendChild(track);
    }
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

    function updateShift() {
      var gap = parseFloat(window.getComputedStyle(track).columnGap || window.getComputedStyle(track).gap || "22") || 22;
      var width = originalCards.reduce(function (sum, card) {
        return sum + card.getBoundingClientRect().width;
      }, 0) + gap * originalCards.length;
      track.style.setProperty("--review-shift", "-" + Math.round(width) + "px");
      track.style.setProperty("--review-duration", Math.max(44, Math.round(width / 22)) + "s");
    }

    updateShift();
    window.addEventListener("resize", updateShift);
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
      if (el.dataset.mns1RevealObserved === "ready" || el.classList.contains("is-visible")) return;
      el.dataset.mns1RevealObserved = "ready";
      observer.observe(el);
    });

    setTimeout(function () {
      document.querySelectorAll(".mns1-reveal:not(.is-visible)").forEach(function (el) {
        el.classList.add("is-visible");
      });
    }, 1400);
  }

  function runEnhancements() {
    document.documentElement.classList.add("mns1-polished");
    createProofModules();
    enhanceQuickApplyGlow();
    enhanceApplyCtas();
    normalizeBlogIndexLinks();
    enhanceStatRoll();
    enhanceHeadingAccents();
    prepareWriteText();
    enhanceStoryTimeline();
    markSpecialCards();
    enhanceFaqInteractions();
    enhanceHomeCards();
    manageMobileStickyCta();
    createLaneMap();
    flattenHomeReactMap();
    linkLaneCityJobs();
    createRollingReviews();
    assembleOnScroll();
    addMotion();
  }

  function installRescanHooks() {
    if (!document.body) {
      document.addEventListener("DOMContentLoaded", installRescanHooks, { once: true });
      return;
    }
    if (window.__mns1PolishRescanReady) return;
    window.__mns1PolishRescanReady = true;
    var timer = 0;

    function scheduleRefresh(delay) {
      window.clearTimeout(timer);
      timer = window.setTimeout(function () {
        runEnhancements();
        window.setTimeout(runEnhancements, 220);
        window.setTimeout(runEnhancements, 760);
      }, delay || 90);
    }

    ["pushState", "replaceState"].forEach(function (method) {
      var original = history[method];
      if (typeof original !== "function") return;
      history[method] = function () {
        var result = original.apply(this, arguments);
        scheduleRefresh(120);
        return result;
      };
    });

    window.addEventListener("popstate", function () {
      scheduleRefresh(120);
    });
    window.addEventListener("pageshow", function () {
      scheduleRefresh(80);
    });
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) scheduleRefresh(80);
    });
    document.addEventListener(
      "click",
      function (event) {
        var link = event.target && event.target.closest ? event.target.closest("a[href]") : null;
        if (!link || link.target || link.origin !== window.location.origin) return;
        if (link.dataset.mns1BlogIndex === "ready") {
          event.preventDefault();
          event.stopImmediatePropagation();
          window.location.href = "/blog/";
          return;
        }
        scheduleRefresh(260);
      },
      true
    );

    if ("MutationObserver" in window && document.body) {
      var observer = new MutationObserver(function (mutations) {
        var hasPageNodes = mutations.some(function (mutation) {
          return Array.prototype.slice.call(mutation.addedNodes || []).some(function (node) {
            return node.nodeType === 1 && !/^(SCRIPT|STYLE|LINK|META)$/i.test(node.tagName || "");
          });
        });
        if (hasPageNodes) scheduleRefresh(140);
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  ready(function () {
    runEnhancements();
    installRescanHooks();
  });
})();
