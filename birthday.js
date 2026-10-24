document.addEventListener("DOMContentLoaded", () => {

  // =====================================
  // GET ELEMENTS
  // =====================================

  const countdownSection = document.getElementById(
    "countdownSection"
  );

  const countdownNumber = document.getElementById(
    "countdownNumber"
  );

  const birthdayReveal = document.getElementById(
    "birthdayReveal"
  );

  const happyText = document.getElementById(
    "happyText"
  );

  const birthdayText = document.getElementById(
    "birthdayText"
  );

  const birthdayHeart = document.getElementById(
    "birthdayHeart"
  );

  const birthdayCartoon = document.getElementById(
    "birthdayCartoon"
  );

  const birthdayGif = document.getElementById(
    "birthdayGif"
  );

  const cartoonFallback = document.getElementById(
    "cartoonFallback"
  );

  const nextButton = document.getElementById(
    "nextButton"
  );

  const starBackground = document.getElementById(
    "starBackground"
  );

  const confettiContainer = document.getElementById(
    "confettiContainer"
  );


  // =====================================
  // CREATE BACKGROUND STARS
  // =====================================

  function createBackgroundStars() {

    for (let i = 0; i < 90; i++) {

      const star = document.createElement("span");

      star.classList.add("background-star");

      const size = Math.random() * 3 + 1;

      const duration = Math.random() * 3 + 1.5;

      const delay = Math.random() * 3;

      star.style.left = `${Math.random() * 100}%`;

      star.style.top = `${Math.random() * 100}%`;

      star.style.setProperty(
        "--size",
        `${size}px`
      );

      star.style.setProperty(
        "--duration",
        `${duration}s`
      );

      star.style.setProperty(
        "--delay",
        `${delay}s`
      );

      starBackground.appendChild(star);

    }

  }


  // =====================================
  // COUNTDOWN ANIMATION
  // =====================================

  function animateNumber(number) {

    countdownNumber.textContent = number;

    // Restart animation
    countdownNumber.classList.remove("animate");

    void countdownNumber.offsetWidth;

    countdownNumber.classList.add("animate");

  }


  function startCountdown() {

    const numbers = [3, 2, 1];

    let index = 0;

    animateNumber(numbers[index]);

    const countdownInterval = setInterval(() => {

      index++;

      if (index < numbers.length) {

        animateNumber(numbers[index]);

      } else {

        clearInterval(countdownInterval);

        countdownSection.classList.add("hidden");

        revealBirthday();

      }

    }, 1000);

  }


  // =====================================
  // BIRTHDAY REVEAL
  // =====================================

  function revealBirthday() {

    birthdayReveal.classList.add("visible");

    // HAPPY
    setTimeout(() => {
      happyText.classList.add("show");
    }, 300);

    // BIRTHDAY
    setTimeout(() => {
      birthdayText.classList.add("show");
    }, 1100);

    // HEART
    setTimeout(() => {
      birthdayHeart.classList.add("show");
    }, 2100);

    // CONFETTI EXPLOSION
    setTimeout(() => {
      launchConfetti();
    }, 2300);

    // CARTOON
    setTimeout(() => {
      birthdayCartoon.classList.add("show");
    }, 3000);

    // NEXT BUTTON
    setTimeout(() => {
      nextButton.classList.add("show");
    }, 4200);

  }


  // =====================================
  // CONFETTI ANIMATION
  // =====================================

  function launchConfetti() {

    const colors = [
      "#ffe49a",
      "#ffd166",
      "#ffffff",
      "#ffb6c1",
      "#f5c542"
    ];

    for (let i = 0; i < 120; i++) {

      const confetti = document.createElement("span");

      confetti.classList.add("confetti");

      const size = Math.random() * 7 + 3;

      const duration = Math.random() * 3 + 3;

      const drift = Math.random() * 200 - 100;

      const color = colors[
        Math.floor(Math.random() * colors.length)
      ];

      confetti.style.left = `${Math.random() * 100}%`;

      confetti.style.setProperty(
        "--size",
        `${size}px`
      );

      confetti.style.setProperty(
        "--duration",
        `${duration}s`
      );

      confetti.style.setProperty(
        "--drift",
        `${drift}px`
      );

      confetti.style.setProperty(
        "--color",
        color
      );

      confettiContainer.appendChild(confetti);

      setTimeout(() => {
        confetti.remove();
      }, duration * 1000 + 200);

    }

  }


  // =====================================
  // HANDLE CARTOON GIF
  // =====================================

  function showCartoonFallback() {

    birthdayGif.style.display = "none";

    cartoonFallback.style.display = "block";

  }

  birthdayGif.addEventListener(
    "error",
    showCartoonFallback
  );

  if (birthdayGif.complete && birthdayGif.naturalWidth === 0) {
    showCartoonFallback();
  }


  // =====================================
  // NEXT SCENE
  // =====================================

 nextButton.addEventListener("click", () => {
  document.body.classList.add("page-exit");

  setTimeout(() => {
    window.location.href = "memories.html";
  }, 800);
});

  // =====================================
  // START EXPERIENCE
  // =====================================

  createBackgroundStars();

  startCountdown();

});