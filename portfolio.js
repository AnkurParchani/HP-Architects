// // Data
import { projects } from "./data.js";

// Main content
const projectContainer = document.querySelector(".project");
const footer = document.querySelector(".footer");
const btnscrollUp = document.querySelector(".scroll_up");
const btnscrollDown = document.querySelector(".scroll_down");
const header = document.querySelector(".header");
const portfolioDescription = document.querySelector(".portfolioDescription");

// Inserting content dynamically
// Remember that it won't add new project if the array is odd number because we're inserting 2 at a time.
const insertSeperateProject = function (projectCategory) {
  for (let i = 0; i < projectCategory.length; i = i + 2) {
    const htmlSmallPages = `
    <div class="row categoryProjectAll">
                  <div class="col-lg-8 col-md-12 projectContainer">
                      <a href="${projectCategory[i].projectImages[0]}"
                          class="mfp-image"><img
                              src="${projectCategory[i].projectImages[0]}"
                              alt="Image"></a>
                  </div>
                  <div class="col-lg-4 col-md-12 projectMainContent projectContainer">
                      <h1>${projectCategory[i].projectName}</h1>
                      <p>${projectCategory[i].projectContent.slice(
                        0,
                        200
                      )}...</p>
                      <a href="./clients.html?name=${projectCategory[
                        i
                      ].projectName.toLowerCase()}">View More</a>
                  </div>
                  
  
                  <div class="col-lg-8 col-md-12 projectContainer">
                      <a href="${
                        projectCategory[i + 1].projectImages[0]
                      }" alt="Image"
                          class="mfp-image floatLeft"><img src="${
                            projectCategory[i + 1].projectImages[0]
                          }"
                              alt="Image"></a>
                  </div>
                  <div class="col-lg-4 col-md-12 projectMainContent projectContainer">
                      <h1>${projectCategory[i + 1].projectName}</h1>
                      <p>${projectCategory[i + 1].projectContent.slice(
                        0,
                        200
                      )}...</p>
                      <a href="./clients.html?name=${projectCategory[
                        i + 1
                      ].projectName.toLowerCase()}">View More</a>
                  </div>
              </div>
    `;

    const htmlBigPages = `
    <div class="row categoryProjectAll">
                 
                  <div class="col-lg-4 col-md-12 projectMainContent projectContainer">
                      <h1>${projectCategory[i].projectName}</h1>
                      <p>${projectCategory[i].projectContent.slice(
                        0,
                        200
                      )}...</p>
                      <a href="./clients.html?name=${projectCategory[
                        i
                      ].projectName.toLowerCase()}">View More</a>
                  </div>
                  <div class="col-lg-8 col-md-12 projectContainer">
                  <a href="${projectCategory[i].projectImages[0]}"
                      class="mfp-image"><img
                          src="${projectCategory[i].projectImages[0]}"
                          alt="Image"></a>
                  </div>
  
                  <div class="col-lg-8 col-md-12 projectContainer">
                      <a href="${
                        projectCategory[i + 1].projectImages[0]
                      }" alt="Image"
                          class="mfp-image floatLeft"><img src="${
                            projectCategory[i + 1].projectImages[0]
                          }"
                              alt="Image"></a>
                  </div>
                  <div class="col-lg-4 col-md-12 projectMainContent projectContainer">
                      <h1>${projectCategory[i + 1].projectName}</h1>
                      <p>${projectCategory[i + 1].projectContent.slice(
                        0,
                        200
                      )}...</p>
                      <a href="./clients.html?name=${projectCategory[
                        i + 1
                      ].projectName.toLowerCase()}">View More</a>
                  </div>
              </div>
    `;

    // Adding projects according to width of the screen
    if (window.innerWidth > 1000) {
      projectContainer.insertAdjacentHTML("beforeend", htmlBigPages);
    } else {
      projectContainer.insertAdjacentHTML("beforeend", htmlSmallPages);
    }
  }
};
insertSeperateProject(projects.All);

// Magnific popup
$(document).ready(function () {
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
});

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

// Showing contents according to category
const params = new URLSearchParams(window.location.search);
const category = params.get("category");

if (category) {
  $(".categoryProjectAll").remove();
  switch (category) {
    case "SitePlanning":
      insertSeperateProject(projects.SitePlanning);
      break;
    case "InteriorDesign":
      insertSeperateProject(projects.InteriorDesign);
      break;
    case "Architecture":
      insertSeperateProject(projects.Architecture);
      break;
    default:
      insertSeperateProject(projects.All);
      break;
  }
}
