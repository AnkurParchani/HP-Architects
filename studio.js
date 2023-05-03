// Data
import { projects } from "./data.js";
console.log(projects);
// Main content
const innerBanner = document.querySelector(".innerBanner");
const allSections = document.querySelectorAll(".section");
const header = document.querySelector(".header");
const studioCarousel = document.querySelector(".studioCarousel");
const btnscrollUp = document.querySelector(".scroll_up");
const btnscrollDown = document.querySelector(".scroll_down");
const footer = document.querySelector(".footer");

// Navigation Observer
const navigationObserver = new IntersectionObserver(
  (e) => {
    if (!e[0].isIntersecting) {
      header.classList.remove("studioNav");
      header.classList.add("fixedHeader");
      btnscrollUp.classList.remove("hidden");
    } else {
      header.classList.add("studioNav");
      btnscrollUp.classList.add("hidden");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-100px",
  }
);
navigationObserver.observe(innerBanner);

// All section Observer
const secObserverFunction = function (e, observer) {
  const [entry] = e;
  if (!entry.isIntersecting) return;
  if (entry.isIntersecting) {
    entry.target.classList.remove("section--hidden");
  }
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(secObserverFunction, {
  root: null,
  threshold: 0.1,
});
allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// Adding carousel
for (let i = 0; i < projects.All.length; i++) {
  const html = `
  <div class="item">
  <a href="${projects.All[i].projectImages[0]}" class="mfp-image"><img src="${projects.All[i].projectImages[0]}" alt=""
          class="owlCarouselImg"></a>
</div>
  `;
  studioCarousel.insertAdjacentHTML("afterbegin", html);
}

// Owl Carousel Images
$(".owl-carousel").owlCarousel({
  stagePadding: 120,
  loop: true,
  margin: 50,
  dots: false,
  smartSpeed: 2000,
  autoplayTimeout: 4000,
  nav: false,
  autoplay: true,
  responsive: {
    0: {
      items: 1,
      stagePadding: 10,
      margin: 30,
    },

    800: {
      items: 2,
    },
    1100: {
      items: 2,
    },
    1200: {
      items: 3,
    },
  },
});
$(".mfp-image").magnificPopup({
  type: "image",
  mainClass: "mfp-fade",
  closeOnContentClick: true,
  closeOnBgClick: true,
  showCloseBtn: false,
  alignTop: true,
  zoom: {
    enabled: true,
    duration: 400,
  },
});

// Page up down Scroller
// scroll Intersection observer
const footerObserver = new IntersectionObserver(
  (e) => {
    const [entry] = e;
    entry.isIntersecting
      ? btnscrollDown.classList.add("hidden")
      : btnscrollDown.classList.remove("hidden");
  },
  { root: null, threshold: 0.3 }
);
footerObserver.observe(footer);
btnscrollUp.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
btnscrollDown.addEventListener("click", function () {
  footer.scrollIntoView({ behavior: "smooth" });
});
