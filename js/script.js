(() => {
  "use strict";

  function initializeBirthdayPage() {
    if (document.documentElement.dataset.birthdayReady === "true") return;
    document.documentElement.dataset.birthdayReady = "true";

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    // Flowers
    const flowerButton = document.getElementById("flower-toggle");
    if (flowerButton) {
      flowerButton.addEventListener("click", () => {
        const paused = document.documentElement.classList.toggle("flowers-paused");
        flowerButton.textContent = paused ? "❀ Animate flowers" : "❀ Pause flowers";
        flowerButton.setAttribute("aria-pressed", String(!paused));
        flowerButton.setAttribute("aria-label", paused ? "Start flower animation" : "Pause flower animation");
      });
    }

    function synchronizeVisibility() {
      document.documentElement.classList.toggle("page-hidden", document.hidden);
    }
    document.addEventListener("visibilitychange", synchronizeVisibility);
    synchronizeVisibility();

    // Floating Words & Emojis (ZERO-LAG INFINITE RECYCLING MODE)
    const floatingContainer = document.getElementById("floating-container");
    if (floatingContainer) {
      // You can add literally thousands of translations in here without slowing down the phone!
      const phrases = [
        "iloveyou", "niyenokimiyeani", "iloveyouevenwhenyouoverthink",
        "愛してる", "我爱你", "사랑해", "ятебялюблю", "मैं तुमसे प्यार करता हूँ".replace(/ /g, ''),
        "σαγαπώ", "ฉันรักเธอ", "teamo", "jetaime", "ichliebedich", "tiamo", "euteamo",
        "seniseviyorum", "ikhouvanjou", "kochamcię", "jagälskardig", "nakupenda", "mahalkita",
        "teiubesc", "szeretlek", "milujitě", "jegelskerdig", "minärakastansinua",
        "taimingraleat", "rwyndygarudi", "ятебекохаю", "আমিভালোবাসি",
        "నేనునిన్నుప్రేమిస్తున్నాను", "मीतुझ्यावरप्रेमकरतो", "நான்உன்னைகாதலிக்கிறேன்",
        "ನಾನುನಿನ್ನನ್ನುಪ್ರೀತಿಸುತ್ತೇನೆ", "ഞാൻനിന്നെസ്നേഹിക്കുന്നു", "ਮੈਂਤੈਨੂੰਪਿਆਰਕਰਦਾਹਾਂ",
        "मतिमीलाईमायागर्छु", "anhyeuem", "akucintakamu", "sayacintakanawak",
        "alohawauiaoe", "tequiero", "amote", "volimte", "ljubimte", "esmilutevi",
        "asmyliutave", "maitezaitut", "ndiyakuthanda", "ngiyakuthanda",
        "keaurata", "inikupenda", "ayoroshne", "keiaterohaauikoe", "ouloalofaiaoe",
        "moferanre", "ahrumgiganya", "inasonki", "thagaolaghort", "miamasvin",
        "gihigugmatika", "palangganata", "ayayatenka", "kalugurandaka",
        "kuloakdresno", "abdicinta", "bonnchroslanhonh", "khoyhakchao", "chitpade",
        "હુંતનેપ્રેમકરુંછું", "ମୁଁତୁମକୁଭଲପାଏ", "মইতোমাকভালপাওঁ", "මමඔයාටආදරෙයි",
        "tiakou", "macaanka", "እወድሻለሁ", "sinjaaladha", "yefkirekiya",
        "rohayhu", "munakuyki", "munsma", "nimitztlazohtla", "inwakyatech",
        "nagligivaget", "asavakkit", "egelskitig", "egelskiteg", "maarmastansind",
        "яцябекахаю", "lubimta", "тесакам", "обичамте", "волимте",
        "მიყვარხარ", "եսքեզսիրումեմ", "бичамдхайртай", "ང་ཁྱོད་ལ་དགའ།",
        "менсеніжақсыкөремін", "mensenisevaman", "менсенисуйом", "мантуродӯстмедорам",
        "минсинеяратам", "mensöýýärin", "mәnsәnisevirәm", "jieninhobbok",
        "tedua", "volimte", "tiatengu", "tistimu", "querocha", "testimo",
        "taimi", "kargarantez", "ikhaldfanji", "echhunnechgär", "tnhobbok",
        "ndinokuda", "ndakusuwa", "ndiyakuthanda", "ngiyakuthanda", "ekhetjoulief",
        "ekisliervirjou", "mikhahamt", "dostdaram", "ashtighatam", "shnorhakalem",
        "kyzygam", "obozhaju", "adorote", "mialtiel", "sziastok", "tengokangen",
        "sayaamsayng", "tresnocinta", "buhayko", "mahalnamahal", "gugmatika",
        "palanggatika", "pinalanggang", "ayayaten", "tangtangen", "namnamatika",
        "kalugurandaka", "muthammuthu", "anbukadhal", "uyire", "enuyir",
        "hrudayave", "pranama", "kanneprem", "sneham", "ishtamanu", "pranayamanu",
        "bhalobashi", "premkorchi", "bhalopai", "maromkaro", "mayagarchu",
        "premchhu", "mohabbathai", "pyarkartahu", "ishqhai", "chahat",
        "aashiqui", "dilse", "jaanem", "jigar", "shonasona", "babu", "kuzhai",
        "pucchu", "chiku", "miku", "chocolat", "monamour", "moncoeur", "mavie",
        "montresor", "mamo", "miamor", "micorazon", "mivida", "cielo", "tesoro",
        "cuore", "anima", "vita", "amore", "docinho", "querido", "lindona",
        "princesa", "reina", "królowa", "skarbie", "kochanie", "sluníčko",
        "zlato", "miláček", "ljubavi", "srećo", "dušo", "srce", "zlato",
        "dragostea", "iubire", "suflet", "inimă", "szívem", "kincsem",
        "drágám", "rakkaus", "kulta", "sydän", "älskling", "hjärta", "skat",
        "elskling", "hjerte", "stjarna", "ástin", "hjarta", "gull", "dúfa",
        "yêu", "thương", "nhớ", "cưng", "bé", "mình", "sayang", "cinta",
        "kasih", "manis", "rindu", "hati", "jiwa", "chuchu"
      ];

      const emojis = ["♥", "<𝟑", "❀", "✮⋆˙"];

      // Keeps DOM count completely safe for mobile phones (no lag!)
      const numberOfItems = window.innerWidth < 600 ? 55 : 90;
      const fragment = document.createDocumentFragment();

      const supportsSegmenter = window.Intl && Intl.Segmenter;
      const segmenter = supportsSegmenter ? new Intl.Segmenter(undefined, { granularity: 'grapheme' }) : null;

      // Function to generate a new language + emoji instantly
      function getRandomFormattedText() {
        let text = phrases[Math.floor(Math.random() * phrases.length)];
        let verticalText = "";
        if (supportsSegmenter) {
          verticalText = Array.from(segmenter.segment(text)).map(s => s.segment).join('\n');
        } else {
          verticalText = text.split('').join('\n');
        }
        let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        return verticalText + '\n' + randomEmoji;
      }

      for (let index = 0; index < numberOfItems; index++) {
        const item = document.createElement("span");
        item.className = "floating-phrase";

        item.textContent = getRandomFormattedText();
        item.style.left = `${Math.random() * 95}%`;
        item.style.fontSize = `${0.7 + Math.random() * 0.4}rem`;

        item.style.setProperty("--duration", `${15 + Math.random() * 35}s`);
        item.style.setProperty("--delay", `${-(Math.random() * 60)}s`);

        // THE MAGIC RECYCLING TRICK:
        // Whenever a word completely finishes falling, change it to a NEW language and drop it from a new spot!
        item.addEventListener("animationiteration", (e) => {
          e.target.textContent = getRandomFormattedText();
          e.target.style.left = `${Math.random() * 95}%`;
        });

        fragment.appendChild(item);
      }
      floatingContainer.replaceChildren(fragment);
    }

    // Click ripple
    document.addEventListener("click", (event) => {
      const target = event.target;
      if (target instanceof Element && target.closest("button, audio, video")) return;
      if (event.detail === 0) return;

      const ripple = document.createElement("span");
      ripple.className = "click-ripple";
      ripple.setAttribute("aria-hidden", "true");
      ripple.style.left = `${event.clientX}px`;
      ripple.style.top = `${event.clientY}px`;
      document.body.appendChild(ripple);

      window.setTimeout(() => ripple.remove(), 700);
    });

    // Cards Tilt
    const tiltCards = document.querySelectorAll(".tilt-element");
    tiltCards.forEach((card) => {
      let frame = 0, pointerX = 0, pointerY = 0;
      function resetTilt() {
        if (frame) { cancelAnimationFrame(frame); frame = 0; }
        card.style.transform = "";
      }
      card.addEventListener("pointermove", (event) => {
        if (!finePointer.matches || event.pointerType === "touch") return;
        pointerX = event.clientX;
        pointerY = event.clientY;
        if (frame) return;

        frame = requestAnimationFrame(() => {
          frame = 0;
          const bounds = card.getBoundingClientRect();
          if (!bounds.width || !bounds.height) return;
          const horizontal = (pointerX - bounds.left) / bounds.width - 0.5;
          const vertical = (pointerY - bounds.top) / bounds.height - 0.5;
          const rotateX = vertical * -6;
          const rotateY = horizontal * 6;
          card.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
      });
      card.addEventListener("pointerleave", resetTilt);
      card.addEventListener("pointercancel", resetTilt);
    });

    // Gallery
    const gallery = document.getElementById("gallery");
    const rope = document.querySelector(".rope-line");
    const photos = Array.from(document.querySelectorAll(".scroll-photo"));

    if (gallery && photos.length) {
      const destinations = [
        { x: -23, y: 9, rotation: -13 }, { x: 18, y: -12, rotation: 9 }, { x: -9, y: 16, rotation: -7 },
        { x: 22, y: 3, rotation: 12 }, { x: 0, y: -7, rotation: -3 }, { x: -18, y: -3, rotation: -10 },
        { x: 12, y: 13, rotation: 7 }, { x: -7, y: -16, rotation: -5 }, { x: 4, y: 0, rotation: 3 }
      ];
      let galleryFrame = 0;

      function updateGallery() {
        const bounds = gallery.getBoundingClientRect();
        const distance = Math.max(1, gallery.offsetHeight - window.innerHeight);
        const progress = Math.max(0, Math.min(1, -bounds.top / distance));
        const eased = Math.pow(progress, 0.85);
        const middleIndex = (photos.length - 1) / 2;
        const spacing = window.innerWidth < 600 ? 44 : 23;

        photos.forEach((photo, index) => {
          const destination = destinations[index % destinations.length];
          const offset = index - middleIndex;
          const spreadX = offset * spacing * (1 - eased);
          const spreadY = (index % 2 === 0 ? -6 : 6) * (1 - eased);
          const stackX = destination.x * eased;
          const stackY = destination.y * eased;
          const rotation = offset * 4 * (1 - eased) + destination.rotation * eased;

          photo.style.zIndex = String(index + 1);
          photo.style.transform = `translate(calc(-50% + ${spreadX}vw + ${stackX}px), calc(-50% + ${spreadY}vh + ${stackY}px)) rotate(${rotation}deg)`;
        });

        if (rope) {
          rope.style.opacity = String(0.65 - eased * 0.4);
          rope.style.transform = `translateY(${eased * 12}px) scaleX(${1 - eased * 0.22})`;
        }
      }

      function requestGalleryUpdate() {
        if (galleryFrame) return;
        galleryFrame = requestAnimationFrame(() => {
          galleryFrame = 0; updateGallery();
        });
      }

      window.addEventListener("scroll", requestGalleryUpdate, { passive: true });
      window.addEventListener("resize", requestGalleryUpdate);
      window.addEventListener("load", requestGalleryUpdate);
      updateGallery();
    }

    // Music with Start Overlay Handling
    const music = document.getElementById("birthday-music");
    const musicButton = document.getElementById("music-toggle");
    const musicStatus = document.getElementById("music-status");
    const startOverlay = document.getElementById("start-overlay");
    const startBtn = document.getElementById("start-btn");

    if (music && musicButton && musicStatus) {
      let pendingPlay = false;
      music.volume = 0.55;

      function updateMusicButton() {
        musicButton.textContent = music.paused ? "♫ Play music" : "Ⅱ Pause music";
        musicButton.setAttribute("aria-pressed", String(!music.paused));
      }

      async function playMusic() {
        if (pendingPlay) return;
        pendingPlay = true;
        try {
          await music.play();
        } catch (error) {
          console.warn("Autoplay still blocked", error);
        } finally {
          pendingPlay = false;
          updateMusicButton();
        }
      }

      // Handle the big Start Button unlock
      if (startBtn && startOverlay) {
        startBtn.addEventListener("click", () => {
          playMusic();
          startOverlay.style.opacity = '0';
          startOverlay.style.visibility = 'hidden';
          setTimeout(() => startOverlay.remove(), 800);
        });
      }

      musicButton.addEventListener("click", () => {
        if (music.paused) {
          playMusic();
        } else {
          music.pause();
        }
      });

      music.addEventListener("play", () => {
        musicStatus.textContent = "Now playing · Oh My Angel — Bertha Tillman";
        updateMusicButton();
      });

      music.addEventListener("pause", () => {
        musicStatus.textContent = "Music paused";
        updateMusicButton();
      });

      music.addEventListener("error", () => {
        musicStatus.textContent = "Could not load oh-my-angel-bertha-tillman.mp3. Check the filename and location.";
        updateMusicButton();
      });

      updateMusicButton();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeBirthdayPage, { once: true });
  } else {
    initializeBirthdayPage();
  }
})();