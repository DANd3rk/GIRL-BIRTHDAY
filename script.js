/* =========================================
   MY GOLDEN STAR — JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  // ======================================
  // HTML ELEMENTS
  // ======================================

  const envelope = document.getElementById("envelope");

  const openedMessage = document.getElementById("openedMessage");

  const continueBtn = document.getElementById("continueBtn");

  const starsContainer = document.getElementById("stars");

  // ======================================
  // VARIABLES
  // ======================================

  let envelopeOpened = false;

  let starRainInterval = null;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // ======================================
  // CREATE A BEAUTIFUL FALLING STAR
  // ======================================

  function createStar() {

    const star = document.createElement("span");

    star.classList.add("falling-star");

    // Tiny stars with different sizes
    const size = Math.random() * 3 + 2;

    // Different falling speeds
    const duration = Math.random() * 3 + 4;

    // Random horizontal position
    const left = Math.random() * 100;

    // Gentle sideways movement
    const drift = Math.random() * 80 - 40;

    // Different glowing trail lengths
    const trailLength = Math.random() * 35 + 15;

    // Apply positions and variables
    star.style.left = `${left}%`;
    star.style.animationDelay = `-${Math.random() * 3}s`;

    star.style.setProperty(
      "--size",
      `${size}px`
    );

    star.style.setProperty(
      "--duration",
      `${duration}s`
    );

    star.style.setProperty(
      "--drift",
      `${drift}px`
    );

    star.style.setProperty(
      "--trail-length",
      `${trailLength}px`
    );

    // Add the star to the screen
    starsContainer.appendChild(star);

    // Remove it when animation finishes
    setTimeout(() => {
      star.remove();
    }, duration * 1000 + 200);

  }

  // ======================================
  // CREATE TINY GOLDEN STARDUST
  // ======================================

  function createStardust() {

    const dust = document.createElement("span");

    dust.classList.add("stardust");

    // Smaller than the main stars
    const size = Math.random() * 2 + 1;

    // Gentle falling speed
    const duration = Math.random() * 4 + 3;

    // Random horizontal movement
    const drift = Math.random() * 60 - 30;

    // Random starting position
    const left = Math.random() * 100;

    dust.style.left = `${left}%`;

    dust.style.width = `${size}px`;

    dust.style.height = `${size}px`;

    dust.style.setProperty(
      "--duration",
      `${duration}s`
    );

    dust.style.setProperty(
      "--drift",
      `${drift}px`
    );

    // Add to screen
    starsContainer.appendChild(dust);

    // Remove after falling
    setTimeout(() => {
      dust.remove();
    }, duration * 1000 + 200);

  }

  // ======================================
  // INITIAL MAGICAL BURST
  // ======================================

  function createInitialBurst() {

    // Create an initial burst of stars
    for (let i = 0; i < 70; i++) {

      setTimeout(() => {
        createStar();
      }, Math.random() * 1200);

    }

    // Add extra magical stardust
    for (let i = 0; i < 100; i++) {

      setTimeout(() => {
        createStardust();
      }, Math.random() * 1500);

    }

  }

  // ======================================
  // START GOLDEN STAR RAIN
  // ======================================

  function startStarRain() {

    // Prevent multiple intervals
    if (starRainInterval !== null) {
      return;
    }

    if (reducedMotion) {
      return;
    }

    // First magical burst
    createInitialBurst();

    // Continuous golden rain
    starRainInterval = setInterval(() => {

      // Main glowing stars
      for (let i = 0; i < 3; i++) {
        createStar();
      }

      // Tiny golden sparkles
      for (let i = 0; i < 5; i++) {
        createStardust();
      }

    }, 150);

  }

  // ======================================
  // OPEN THE ENVELOPE
  // ======================================

  envelope.addEventListener("click", () => {

    // Prevent opening more than once
    if (envelopeOpened) {
      return;
    }

    envelopeOpened = true;

    // Start opening animation
    envelope.classList.add("open");

    // Start golden star rain
    startStarRain();

    // Reveal birthday message
    setTimeout(() => {

      openedMessage.classList.add("visible");

    }, 900);

  });

  // ======================================
  // CONTINUE BUTTON
  // ======================================

 continueBtn.addEventListener("click", () => {

  // Smooth transition to birthday scene
  document.body.classList.add("page-exit");

  setTimeout(() => {
    window.location.href = "birthday.html";
  }, 800);

});
});