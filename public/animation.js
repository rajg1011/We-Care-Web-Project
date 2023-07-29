// File related to animations in website

//counting animation in home page
const animatedItems = Array.from(document.querySelectorAll("[data-number]"));
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const speed = 200;
        animatedItems.forEach((dataTag) => {
          const update = () => {
            const dataTobeSetted = parseInt(dataTag.dataset.number);
            const initData = parseInt(dataTag.innerText);
            const increment = Math.trunc(dataTobeSetted / speed);
            if (initData < dataTobeSetted) {
              dataTag.innerText = `${initData + increment}+`;
              setTimeout(update, 10);
            }
          };
          update();
        });
      }
    });
  },
  {
    root: null,
    rootMargin: "0px",
    threshold: 0.8,
  }
);

animatedItems.forEach((item) => {
  observer.observe(item);
});

// slider in about.ejs

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  lazyPreloadPrevNext: 2,
  allowSlideNext: true,
  followFinger: true,
  spaceBetween: 30,
  speed: 2000,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    allowTouchMove: true,
  },
  autoplay: {
    delay: 2000,
  },
  breakpoints: {
    790: {
      slidesPerView: 2,
    },
  },
});

//slider in index.js (responsive-youtube)

if (window.screen.width < 640) {
  var swiperYoutube = new Swiper(".mySwiper-youtube", {
    slidesPerView: 1,
    lazyPreloadPrevNext: 2,
    allowSlideNext: true,
    followFinger: true,
    speed: 1000,
    loop: true,
    grid: {
      rows: 1,
    },
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      allowTouchMove: true,
    },
    autoplay: {
      delay: 2000,
    },
    breakpoints: {
      440: {
        slidesPerView: 2,
      },
    },
  });
}
