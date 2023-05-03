const footer = document.querySelector(".footer");
const btnscrollUp = document.querySelector(".scroll_up");
const btnscrollDown = document.querySelector(".scroll_down");
const header = document.querySelector(".header");
const contactSection_1 = document.querySelector(".contactSection_1");
const allSections = document.querySelectorAll(".section");
const allInputs = document.querySelectorAll(".input");

// Scroller
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

// Observers
// Navigation observer
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
navigationObserver.observe(contactSection_1);

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
  threshold: 0.15,
});
allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

const renderMap = function () {
  const coords = [21.094411495686913, 81.03336951887127];
  const map = L.map("map", { dragging: false }).setView(coords, 15);
  L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }).addTo(map);

  L.marker(coords).addTo(map).bindPopup("HP Architects").openPopup();

  map.on("click", function (mapEvent) {
    map.dragging.enable();
    // console.log(mapEvent);
  });
};
renderMap();
