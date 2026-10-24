document.addEventListener("DOMContentLoaded", () => {

  // =====================================
  // HTML ELEMENTS
  // =====================================

  const book = document.getElementById("memoryBook");
  const cover = document.getElementById("bookCover");
  const pagesContainer = document.getElementById("bookPages");
  const sparklesContainer = document.getElementById("bookSparkles");

  const openBookBtn = document.getElementById("openBookBtn");
  const prevBtn = document.getElementById("prevPage");
  const nextBtn = document.getElementById("nextPage");

  const indicator = document.getElementById("pageIndicator");
  const continueBtn = document.getElementById("continueStory");
  const swipeHint = document.getElementById("swipeHint");
  const starContainer = document.getElementById("memoryStars");

  // =====================================
  // VARIABLES
  // =====================================

  let currentPage = 0;
  let bookOpened = false;
  let isTurning = false;
  let touchStartX = 0;
  let giftOpened = false;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  // =====================================
  // OUR MEMORY BOOK CONTENT
  // =====================================

  const memories = [

 {
      title: "The Girl With the Golden Smile",
      label: "Chapter One",
      text: "Some people light up a room. You light up an entire world. My Beautiful mischievious Queen. ❤️",
      image: "assets/memory1.jpeg"
    },

    {
      title: " Little Foodie",
      label: "Chapter Two",
      text: "An Oreo McFlurry with EXTRA Oreo, a Shirley Temple, and absolutely no cinnamon.I love my girl's taste. 😂❤️",
      image: "assets/memory2.jpeg"
    },

    {
      title: "The Adventurer",
      label: "Chapter Three",
      text: "From new places to new experiences, your love for travelling makes every adventure UNFORGETABLE.",
      image: "assets/memory3.jpeg"
    },

    {
      title: "The Beautiful Mind",
      label: "Chapter Four",
      text: "Smart, thoughtful, playful, and full of dreams.My favourtie person in the world",
      image: "assets/memory4.jpeg"
    },

    {
      title: "Our Favourite Moments",
      label: "Chapter Five",
      text: "The laughs, the silly conversations, the little moments that somehow become our favourite memories. I wouldn't trade them for anything.",
      image: "assets/memory5.jpeg"
    },

    {
      title: "To My Golden Star",
      label: "Chapter Six",
      text: "If I could write a thousand pages about you, they still wouldn't be enough. Thank you for being you.My love ❤️",
      image: "assets/memory6.jpeg"
    },

    {
      title: "A Secret Just for You",
      label: "The Final Chapter",
      text: "If there is one thing I hope you never forget, it's how deeply you are loved. Today, tomorrow, and forever. Happy birthday, my golden star. ❤️",
      image: "assets/memory7.jpeg"
    },

    // CHAPTER EIGHT - THE GIFT
    {
      title: "One Last Surprise...",
      label: "The Final Chapter",
      text: "Some gifts are special because of what's inside. Others are special because of the love behind them. This one comes from two people who love you very much. ❤️",
      gift: true
    }

  ];


  // =====================================
  // CREATE BACKGROUND STARS
  // =====================================

  function createStars() {

    if (reducedMotion) return;

    for (let i = 0; i < 55; i++) {

      const star = document.createElement("span");

      star.className = "memory-star";

      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;

      star.style.animationDelay = `${Math.random() * 3}s`;
      star.style.animationDuration =
        `${2 + Math.random() * 3}s`;

      starContainer.appendChild(star);

    }

  }


  // =====================================
  // CREATE MEMORY BOOK PAGES
  // =====================================

  function createPages() {

    memories.forEach((memory, index) => {

      const page = document.createElement("article");

      page.className = "memory-page upcoming";

      if (memory.gift) {
        page.classList.add("gift-page");
      }

      // Chapter label

      const pageTop = document.createElement("span");

      pageTop.className = "page-top";
      pageTop.textContent = memory.label;

      // Chapter heading

      const heading = document.createElement("h3");

      heading.textContent = memory.title;

      page.append(pageTop, heading);


      // =====================================
      // NORMAL MEMORY PHOTOGRAPHS
      // =====================================

      if (!memory.gift) {

        const photoFrame = document.createElement("div");

        photoFrame.className = "photo-frame";

        const photo = document.createElement("img");

        photo.src = memory.image;
        photo.alt = memory.title;
        photo.loading = "lazy";

        photo.addEventListener("load", () => {
          console.log("Photo loaded:", memory.image);
        });

        photo.addEventListener("error", () => {

          console.error(
            "Unable to load photograph:",
            memory.image
          );

          photoFrame.classList.add("missing-photo");

        });

        photoFrame.appendChild(photo);

        page.appendChild(photoFrame);

      }


      // =====================================
      // MEMORY MESSAGE
      // =====================================

      const caption = document.createElement("p");

      caption.className = "memory-caption";
      caption.textContent = memory.text;

      page.appendChild(caption);


      // =====================================
      // FINAL GIFT PAGE
      // =====================================

      if (memory.gift) {

        const giftSection = document.createElement("div");

        giftSection.className = "gift-section";

        giftSection.innerHTML = `

          <!-- INTERACTIVE GIFT -->

          <button
            class="gift-box"
            id="giftBox"
            type="button"
            aria-label="Unwrap your birthday gift"
          >

            <span class="gift-body"></span>

            <span class="gift-ribbon"></span>

            <span class="gift-lid"></span>

            <span class="gift-bow">🎀</span>

          </button>


          <!-- GIFT INSTRUCTIONS -->

          <p class="gift-hint" id="giftHint">
            Psst... tap the gift! 🎁
          </p>


          <!-- HIDDEN GIFT REVEAL -->

          <div class="gift-reveal" id="giftReveal">

            <h3>Surprise, Oyindamola! 💍</h3>

            <div class="oura-container">

              <img
                src="assets/oura-ring.png"
                alt="Your birthday gift — an Oura Ring"
                class="oura-image"
              >

            </div>


            <p class="gift-message">
              A little something special,
              for someone incredibly special.
            </p>


            <p class="gift-message">
              We wanted to give you something
              that reminds you how much
              you're loved, appreciated,
              and celebrated.
            </p>


            <p class="gift-from">
              With all our love,<br>
              Me and your sis ❤️
            </p>


            <h4 class="final-birthday-message">
              Happy 26th Birthday,<br>
              Our Golden Star! ✨(more info, ask us)
            </h4>

          </div>

        `;

        page.appendChild(giftSection);


        // =====================================
        // OPEN THE GIFT
        // =====================================

        const giftBox = giftSection.querySelector("#giftBox");

        const giftReveal =
          giftSection.querySelector("#giftReveal");

        const giftHint =
          giftSection.querySelector("#giftHint");

        giftBox.addEventListener("click", () => {

          if (giftOpened) return;

          giftOpened = true;

          // Open the present

          giftBox.classList.add("opened");

          // Magical golden sparkles

          createPageSparkles();

          // Reveal the Oura Ring

          setTimeout(() => {

            giftHint.style.display = "none";

            giftBox.style.display = "none";

            giftReveal.classList.add("visible");

            // Bring the gift reveal into view
            giftReveal.scrollIntoView({
              behavior: reducedMotion ? "instant" : "smooth",
              block: "nearest"
            });

            // Extra celebration sparkles

            createPageSparkles();

          }, reducedMotion ? 0 : 950);

        });

      }


      // =====================================
      // PAGE NUMBER
      // =====================================

      const pageNumber = document.createElement("span");

      pageNumber.className = "page-number";

      pageNumber.textContent =
        `${index + 1} / ${memories.length}`;

      page.appendChild(pageNumber);

      pagesContainer.appendChild(page);

    });

  }


  // =====================================
  // CREATE GOLDEN SPARKLES
  // =====================================

  function createPageSparkles() {

    if (reducedMotion) return;

    for (let i = 0; i < 35; i++) {

      const sparkle = document.createElement("span");

      sparkle.className = "book-sparkle";

      const size = Math.random() * 4 + 2;

      const startX = Math.random() * 80 + 20;
      const startY = Math.random() * 80 + 10;

      const moveX = Math.random() * 240 - 120;
      const moveY = Math.random() * 240 - 120;

      const duration = Math.random() * 0.7 + 0.7;

      sparkle.style.setProperty(
        "--size",
        `${size}px`
      );

      sparkle.style.setProperty(
        "--start-x",
        `${startX}%`
      );

      sparkle.style.setProperty(
        "--start-y",
        `${startY}%`
      );

      sparkle.style.setProperty(
        "--move-x",
        `${moveX}px`
      );

      sparkle.style.setProperty(
        "--move-y",
        `${moveY}px`
      );

      sparkle.style.setProperty(
        "--duration",
        `${duration}s`
      );

      sparklesContainer.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, duration * 1000 + 100);

    }

  }


  // =====================================
  // PAGE TURNING SOUND
  // =====================================

  let audioContext;

  function playPageSound() {

    try {

      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;

      if (!AudioContextClass) return;

      audioContext = audioContext || new AudioContextClass();

      if (audioContext.state === "suspended") {
        audioContext.resume();
      }

      const duration = 0.18;

      const sampleRate = audioContext.sampleRate;

      const buffer = audioContext.createBuffer(
        1,
        Math.floor(sampleRate * duration),
        sampleRate
      );

      const data = buffer.getChannelData(0);

      for (let i = 0; i < data.length; i++) {

        const fade = 1 - i / data.length;

        data[i] =
          (Math.random() * 2 - 1) * fade * 0.12;

      }

      const source = audioContext.createBufferSource();

      const gain = audioContext.createGain();

      const filter = audioContext.createBiquadFilter();

      filter.type = "lowpass";
      filter.frequency.value = 1200;

      gain.gain.value = 0.18;

      source.buffer = buffer;

      source.connect(filter);
      filter.connect(gain);
      gain.connect(audioContext.destination);

      source.start();

      source.onended = () => {
        source.disconnect();
        filter.disconnect();
        gain.disconnect();
      };

    } catch (error) {

      console.log("Page sound unavailable:", error);

    }

  }


  // =====================================
  // UPDATE PAGE STATES
  // =====================================

  function updatePages() {

    const pages = pagesContainer.querySelectorAll(".memory-page");

    pages.forEach((page, index) => {

      page.classList.remove(
        "active",
        "flipped",
        "upcoming"
      );

      if (index < currentPage) {

        page.classList.add("flipped");

      } else if (index === currentPage) {

        page.classList.add("active");

      } else {

        page.classList.add("upcoming");

      }

      // Maintain page stacking order

      page.style.zIndex =
        index < currentPage
          ? index + 1
          : memories.length - index;

    });


    // =====================================
    // UPDATE PAGE INDICATOR
    // =====================================

    indicator.textContent =
      `Page ${currentPage + 1} of ${memories.length}`;


    // =====================================
    // NAVIGATION BUTTONS
    // =====================================

    prevBtn.disabled = currentPage === 0;

    nextBtn.disabled =
      currentPage === memories.length - 1;


    // =====================================
    // HIDE UNNECESSARY CONTINUE BUTTON
    // =====================================

    if (continueBtn) {

      continueBtn.style.display = "none";

    }

  }


  // =====================================
  // TURN BOOK PAGE
  // =====================================

  function turnPage(direction) {

    if (!bookOpened || isTurning) return;

    const nextPage = currentPage + direction;

    if (
      nextPage < 0 ||
      nextPage >= memories.length
    ) {
      return;
    }

    isTurning = true;

    currentPage = nextPage;

    playPageSound();

    createPageSparkles();

    updatePages();

    setTimeout(() => {

      isTurning = false;

    }, reducedMotion ? 0 : 950);

  }


  // =====================================
  // OPEN THE BOOK
  // =====================================

  openBookBtn.addEventListener("click", () => {

    if (bookOpened) return;

    bookOpened = true;

    cover.classList.add("opened");

    openBookBtn.classList.add("hidden");

    playPageSound();

    createPageSparkles();

    setTimeout(() => {

      updatePages();

      swipeHint.style.display = "block";

    }, reducedMotion ? 0 : 500);

  });


  // =====================================
  // PREVIOUS PAGE
  // =====================================

  prevBtn.addEventListener("click", () => {

    turnPage(-1);

  });


  // =====================================
  // NEXT PAGE
  // =====================================

  nextBtn.addEventListener("click", () => {

    turnPage(1);

  });


  // =====================================
  // MOBILE SWIPE NAVIGATION
  // =====================================

  book.addEventListener("touchstart", (event) => {

    touchStartX =
      event.changedTouches[0].screenX;

  }, { passive: true });


  book.addEventListener("touchend", (event) => {

    if (!bookOpened) return;

    // Don't turn the page when interacting
    // with the gift box or reveal.

    if (event.target.closest(".gift-section")) {
      return;
    }

    const touchEndX =
      event.changedTouches[0].screenX;

    const difference = touchStartX - touchEndX;

    if (Math.abs(difference) < 45) return;

    if (difference > 0) {

      turnPage(1);

    } else {

      turnPage(-1);

    }

  }, { passive: true });


  // =====================================
  // INITIALIZE THE MEMORY BOOK
  // =====================================

  createStars();

  createPages();

  prevBtn.disabled = true;

  nextBtn.disabled = true;

  swipeHint.style.display = "none";

  if (continueBtn) {
    continueBtn.style.display = "none";
  }

});