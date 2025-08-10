if (window.location.pathname.includes("thankyou.html")) {
  document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.createElement("canvas");
    canvas.id = "confettiCanvas";
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "999";
    document.body.appendChild(canvas);

    const confetti = window.confetti.create(canvas, {
      resize: true,
      useWorker: true,
    });

    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      confetti(
        Object.assign({}, defaults, {
          particleCount: 5,
          origin: {
            x: randomInRange(0.1, 0.3),
            y: Math.random() - 0.2,
          },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount: 5,
          origin: {
            x: randomInRange(0.7, 0.9),
            y: Math.random() - 0.2,
          },
        })
      );
    }, 250);
  });
}

// === Navbar Mobile Toggle ===
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (toggleButton && navMenu) {
    toggleButton.addEventListener("click", () => {
      navMenu.classList.toggle("hidden");
    });
  }
});

// Jalankan confetti setelah halaman dimuat
window.onload = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
};

const toggle = document.getElementById("dark-toggle");
const html = document.documentElement;
toggle?.addEventListener("click", () => {
  html.classList.toggle("dark");
});

// Animated counter
const counters = document.querySelectorAll(".stat-count");
counters.forEach((counter) => {
  const updateCount = () => {
    const target = +counter.getAttribute("data-target");
    const current = +counter.innerText.replace(/\D/g, "");
    const increment = target / 60;

    if (current < target) {
      counter.innerText =
        Math.ceil(current + increment) +
        (counter.innerText.includes("%") ? "%" : "");
      setTimeout(updateCount, 30);
    } else {
      counter.innerText = target + (counter.innerText.includes("%") ? "%" : "");
    }
  };
  updateCount();
});

// === Confetti otomatis di halaman thankyou.html ===
if (window.location.pathname.includes("thankyou.html")) {
  document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.createElement("canvas");
    canvas.id = "confettiCanvas";
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "999";
    document.body.appendChild(canvas);

    const confetti = window.confetti.create(canvas, {
      resize: true,
      useWorker: true,
    });

    const duration = 4000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }
      confetti(
        Object.assign({}, defaults, {
          particleCount: 5,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount: 5,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);
  });
}
