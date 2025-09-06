/* ===========================================================
   script.js — Global JS untuk semua halaman
   Fitur:
   1. Navbar Hamburger + Overlay
   2. Nav Active State
   3. Smooth Scroll
   4. Statistik Count-up
   5. Auto Slider (opsional)
   6. Form Protection + Redirect WA
   =========================================================== */

(function () {
  /* ========== UTILITIES ========== */
  const qs = (sel, el = document) => el.querySelector(sel);
  const qsa = (sel, el = document) => Array.from(el.querySelectorAll(sel));

  const lockScroll = () => (document.body.style.overflow = "hidden");
  const unlockScroll = () => (document.body.style.overflow = "");

  /* ========== 1. NAVBAR HAMBURGER + OVERLAY ========== */
  const hamburger = qs("#hamburger");
  const navMenu = qs("#nav-menu");

  let overlay = qs(".mobile-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "mobile-overlay";
    overlay.style.cssText =
      "position:fixed;inset:0;background:rgba(0,0,0,.35);opacity:0;pointer-events:none;transition:opacity .25s ease;z-index:998;";
    document.body.appendChild(overlay);
  }

  const openMenu = () => {
    hamburger?.classList.add("active");
    navMenu?.classList.add("show");
    overlay.style.opacity = "1";
    overlay.style.pointerEvents = "auto";
    lockScroll();
  };
  const closeMenu = () => {
    hamburger?.classList.remove("active");
    navMenu?.classList.remove("show");
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";
    unlockScroll();
  };

  hamburger?.addEventListener("click", () => {
    hamburger.classList.contains("active") ? closeMenu() : openMenu();
  });
  overlay.addEventListener("click", closeMenu);
  qsa(".nav-menu a").forEach((a) =>
    a.addEventListener("click", () => closeMenu())
  );

  /* ========== 2. NAV ACTIVE STATE ========== */
  (function setActiveNav() {
    const path = window.location.pathname.split("/").pop() || "index.html";
    qsa(".nav-menu a, .navbar .nav-link").forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;
      const clean = href.split("?")[0].split("#")[0];
      if (clean === path) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  })();

  /* ========== 3. SMOOTH SCROLL ========== */
  qsa('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = qs(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* ========== 4. STAT COUNT-UP ========== */
  const statEls = qsa(".stat-number");
  if (statEls.length) {
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const animateCount = (el, to, duration = 1500) => {
      const from = 0;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = easeOut(p);
        const val = Math.floor(from + (to - from) * eased);
        el.textContent = Number.isFinite(val)
          ? val.toLocaleString("id-ID")
          : to;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const parseTarget = (el) => {
      const raw =
        el.getAttribute("data-target") || el.textContent.replace(/[^\d]/g, "");
      return parseInt(raw, 10) || 0;
    };

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            animateCount(el, parseTarget(el));
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.25 }
    );

    statEls.forEach((el) => io.observe(el));
  }

  /* ========== 5. AUTO SLIDER (opsional) ========== */
  qsa(".slide-track").forEach((track) => {
    const items = qsa(".slide-item", track);
    if (items.length < 2) return;

    track.append(...items.map((n) => n.cloneNode(true)));

    const SPEED = 60;
    let start = null;

    const animate = (ts) => {
      if (!start) start = ts;
      const dt = (ts - start) / 1000;
      const move = (dt * SPEED) % track.scrollWidth;
      track.style.transform = `translateX(${-move}px)`;
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  });

  /* ========== 6. FORM PROTECTION & WA REDIRECT ========== */
  qsa("form").forEach((form) => {
    let submitting = false;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (submitting) return;
      submitting = true;

      const nama = qs("#nama")?.value;
      const email = qs("#email")?.value;
      const layanan = qs("#layanan")?.value;
      const deadline = qs("#deadline")?.value;
      const deskripsi = qs("#deskripsi")?.value;

      if (!nama || !email || !layanan || !deadline || !deskripsi) {
        alert("Harap isi semua field!");
        submitting = false;
        return;
      }

      const pesan = `Halo, saya ${nama}%0AEmail: ${email}%0ALayanan: ${layanan}%0ADeadline: ${deadline}%0ADeskripsi: ${deskripsi}`;
      const waUrl = `https://wa.me/6281234567890?text=${pesan}`;

      window.open(waUrl, "_blank");

      setTimeout(() => (submitting = false), 3000);
    });
  });

  /* ========== 7. CLOSE MENU ON RESIZE DESKTOP ========== */
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 900) {
      closeMenu();
    }
  });
})();

// === Testimoni Slider ===
const testimonials = document.querySelectorAll(".testi-slider .testi");
let testiIndex = 0;

function showNextTesti() {
  testimonials[testiIndex].classList.remove("active");
  testiIndex = (testiIndex + 1) % testimonials.length;
  testimonials[testiIndex].classList.add("active");
}

if (testimonials.length > 0) {
  setInterval(showNextTesti, 3500); // ganti setiap 3.5 detik
}
