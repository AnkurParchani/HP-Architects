import { Team } from "./teamData.js";
// Main js
const footer = document.querySelector(".footer");
const btnscrollUp = document.querySelector(".scroll_up");
const btnscrollDown = document.querySelector(".scroll_down");
const header = document.querySelector(".header");
const peopleContainer = document.querySelector(".peopleContainer");
const portfolioDescription = document.querySelector(".portfolioDescription");

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
btnscrollUp.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
btnscrollDown.addEventListener("click", function () {
  footer.scrollIntoView({ behavior: "smooth" });
});
footerObserver.observe(footer);
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
navigationObserver.observe(portfolioDescription);

// Inserting cards dynamically
const renderPersonCard = function () {
  Team.forEach((person) => {
    const html = `
        <div class="card peopleCard" style="width: 18rem;">
         <img class="card-img-top" src="${person.personImage}" alt="Card image cap">
         <div class="card-body">
             <p class="card-titleName">${person.personTitle}</p>
            <h5 class="card-title">${person.personName}</h5>
             <p class="card-text">${person.personDescription}</p>
        </div>
        </div>
    `;
    peopleContainer.insertAdjacentHTML("beforeend", html);
  });
};
renderPersonCard();
