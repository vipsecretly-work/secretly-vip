document.addEventListener("DOMContentLoaded", function () {

  /* ── Red border frame ──────────────── */
  // Removed intrusive frame


  /* ── Hamburger menu ─────────────────── */
  var navbar = document.querySelector(".navbar");
  if (navbar) {
    var hamburger = document.createElement("button");
    hamburger.className = "nav-hamburger";
    hamburger.setAttribute("aria-label", "Menu");
    hamburger.innerHTML = "<span></span><span></span><span></span>";
    navbar.appendChild(hamburger);

    // Build drawer from existing nav-links
    var existingLinks = document.querySelector(".nav-links");
    var drawer = document.createElement("div");
    drawer.className = "nav-drawer";
    if (existingLinks) {
      existingLinks.querySelectorAll("a").forEach(function(a) {
        var clone = a.cloneNode(true);
        drawer.appendChild(clone);
      });
    }
    navbar.insertAdjacentElement("afterend", drawer);

    hamburger.addEventListener("click", function() {
      drawer.classList.toggle("open");
    });

    // Close drawer on link click
    drawer.querySelectorAll("a").forEach(function(a) {
      a.addEventListener("click", function() {
        drawer.classList.remove("open");
      });
    });
  }

  /* ── Year ─────────────────────────── */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ── Intro overlay ─────────────────── */
  setTimeout(function () {
    document.body.classList.add("ready");
  }, 1800);

  /* ── Page transition overlay ─────────── */
  var transition = document.createElement("div");
  transition.className = "page-transition";
  var logo = document.createElement("img");
  logo.src = "Image/Logo.png";
  logo.alt = "Secretly";
  logo.className = "page-transition-logo";
  transition.appendChild(logo);
  document.body.appendChild(transition);

  function showTransition(cb) {
    transition.classList.add("active");
    setTimeout(cb, 900);
  }

  /* ── Nav link transitions ─────────────── */
  document.querySelectorAll("a.nav-link, a.btn, a.footer-item").forEach(function (link) {
    var href = link.getAttribute("href");
    if (!href || href.startsWith("mailto:") || href.startsWith("http") || href === "#") return;
    if (link.classList.contains("get-it-btn")) return;

    link.addEventListener("click", function (e) {
      e.preventDefault();
      showTransition(function () {
        window.location.href = href;
      });
    });
  });

  /* ── Get It → Instagram DM ─────────────── */
  document.querySelectorAll(".get-it-btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var product = btn.getAttribute("data-product") || "this item";
      var msg = "Hey, I would like to buy the " + product + ".";
      var url = "https://ig.me/m/skhh?text=" + encodeURIComponent(msg);

      showTransition(function () {
        window.open(url, "_blank", "noopener,noreferrer");
        setTimeout(function () {
          transition.classList.remove("active");
        }, 400);
      });
    });
  });

  /* ── Twinkling logo particles ──────────── */
  function spawnLogos(container, count, filterStyle) {
    for (var i = 0; i < count; i++) {
      (function(idx) {
        var img = document.createElement("img");
        img.src = "Image/Logo.png";
        img.className = "logo-particle";
        var size = 18 + Math.random() * 44;
        var dur  = 2.2 + Math.random() * 3.5;
        var del  = Math.random() * 3;
        var lo   = 0.03 + Math.random() * 0.07;
        var hi   = lo + 0.06 + Math.random() * 0.14;
        var blurPx = Math.random() < 0.4 ? "2px" : "0.5px";
        img.style.cssText = [
          "width:"  + size + "px",
          "height:" + size + "px",
          "left:"   + (3 + Math.random() * 94) + "%",
          "top:"    + (3 + Math.random() * 94) + "%",
          "--tw-dur:"   + dur   + "s",
          "--tw-delay:" + del   + "s",
          "--tw-lo:"    + lo,
          "--tw-hi:"    + hi,
          "--tw-blur:"  + blurPx,
          "z-index: 0"
        ].join(";");
        container.appendChild(img);
      })(i);
    }
  }

  var brandHero = document.querySelector(".brand-hero");
  if (brandHero) spawnLogos(brandHero, 18);

  document.querySelectorAll(".hero-panel-dark, .editorial-visual").forEach(function(el) {
    spawnLogos(el, 8);
  });

  /* ── Scroll reveal ─────────────────────── */
  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length > 0) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach(function (el) { observer.observe(el); });
  }

});
