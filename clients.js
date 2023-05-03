// Data
import { projects } from "./data.js";

// Main content
// Rendering everything on page
const clientNavigationLine = document.querySelector(".clientNavigationLine");
const siteHeading = document.querySelector(".siteHeading");
const siteContent = document.querySelector(".siteContent");
const owlCarouselMini = document.querySelector(".owlCarouselMini");
const owlCarouselFullPage = document.querySelector(".owlCarouselFullPage");
const owlSeeOtherProjectsCarousel = document.querySelector(
  ".owlSeeOtherProjectsCarousel"
);
const clients_section1 = document.querySelector(".clients_section1");
const footer = document.querySelector(".footer");
const btnscrollUp = document.querySelector(".scroll_up");
const btnscrollDown = document.querySelector(".scroll_down");
const header = document.querySelector(".header");
const siteVideoContainer = document.querySelector(".siteVideoContainer");

// Getting the page
const params = new URLSearchParams(window.location.search);
const siteName = params.get("name").toUpperCase();

if (siteName) {
  const currentSite = projects.All.find(
    (project) => project.projectName == siteName
  );

  // Rendering client navigation line
  const renderClientNavigationLine = function () {
    const siteName =
      currentSite.projectName.slice(0, 1) +
      currentSite.projectName.slice(1).toLowerCase();
    const html = `Home / Clients / ${siteName}`;
    clientNavigationLine.insertAdjacentHTML("afterbegin", html);
  };

  // Rendering site heading
  const renderSiteHeading = function () {
    siteHeading.insertAdjacentHTML(
      "afterbegin",
      `<h1>${currentSite.projectName}</h1>`
    );
  };

  // Rendering site content
  const renderSiteContent = function () {
    const html = `
    <p>${currentSite.projectContent}</p>
    `;
    siteContent.insertAdjacentHTML("afterbegin", html);
  };

  // Rendering mini image carousel
  const renderImgMiniCarousel = function () {
    for (let i = 0; i < currentSite.projectImages.length; i++) {
      owlCarouselMini.insertAdjacentHTML(
        "beforeend",
        `
        <div class="item">
        <a href="./${currentSite.projectImages[i]}" class="mfp-image"><img src="./${currentSite.projectImages[i]}" alt=""
            class="owlCarouselImg"></a>
      </div>
       `
      );
    }
    $(".owl-carousel-2").owlCarousel({
      loop: true,
      margin: 30,
      stagePadding: 120,
      dots: false,
      smartSpeed: 3000,
      autoplayTimeout: 5000,
      nav: false,
      autoplay: true,
      responsive: {
        0: {
          items: 1,
          stagePadding: 10,
        },
        600: {
          items: 2,
        },
        900: {
          items: 2,
        },
        1000: {
          items: 3,
        },
      },
    });
  };

  // Rendering full image carousel
  const renderImgFullCarousel = function () {
    for (let i = 0; i < currentSite.projectImages.length; i++) {
      owlCarouselFullPage.insertAdjacentHTML(
        "beforeend",
        `
        <div class="item">
        <img src="./${currentSite.projectImages[i]}" alt="" class="owlCarouselImg">
      </div>
       `
      );
    }
    $(".owl-carousel-1").owlCarousel({
      loop: true,
      smartSpeed: 3000,
      autoPlayTimeout: 8000,
      items: 1,
      autoplay: true,
      dots: false,
    });
  };

  // Render video
  console.log(currentSite);
  if (currentSite.hasOwnProperty("projectVideo")) {
    const html = `
     <div class="wrap">
      <div class="row siteVideo">
        <video controls src="${currentSite.projectVideo}"  playsinline class="projectVideo"></video>
      </div>
    </div> 
    `;
    siteVideoContainer.insertAdjacentHTML("afterbegin", html);
  }
  // Autoplay video observer
  const videoObserver = new IntersectionObserver(
    (e) => {
      const [entry] = e;
      if (!entry.isIntersecting) return;
      else {
        document.querySelector(".projectVideo").play();
      }
    },
    { root: null, threshold: 0.5 }
  );
  videoObserver.observe(siteVideoContainer);

  // Rendering 'see other projects' carousel
  const renderOtherProjectsCarousel = function () {
    const projectToRemove = currentSite;
    const newOtherProjectsArray = projects.All.filter(
      (project) => project !== projectToRemove
    );

    for (let i = 0; i < newOtherProjectsArray.length; i++) {
      owlSeeOtherProjectsCarousel.insertAdjacentHTML(
        "afterbegin",
        `
    <div class="item">
          <a href="./clients.html?name=${newOtherProjectsArray[
            i
          ].projectName.toLowerCase()}"><img src="./${
          newOtherProjectsArray[i].projectImages[0]
        }" alt="" class="owlCarouselImg"></a>
          <h3>${newOtherProjectsArray[i].projectName}</h3>
          <p>${newOtherProjectsArray[i].projectContent.slice(0, 100)}...</p>
          <a href="./clients.html?name=${newOtherProjectsArray[
            i
          ].projectName.toLowerCase()}" class="clientSection_4Btn">View More</a>
          <p>&nbsp;</p>
        </div>
    `
      );
    }
    $(document).ready(function () {
      $(".owl-carousel-3").owlCarousel({
        stagePadding: 90,
        loop: true,
        margin: 30,
        dots: false,
        smartSpeed: 3000,
        autoplayTimeout: 5000,
        nav: false,
        autoplay: true,
        responsive: {
          0: {
            items: 1,
            stagePadding: 10,
          },
          600: {
            items: 2,
          },
          900: {
            items: 2,
          },
          1000: {
            items: 3,
          },
        },
      });
    });
  };

  const init = function () {
    renderClientNavigationLine();
    renderSiteHeading();
    renderSiteContent();
    renderImgMiniCarousel();
    renderImgFullCarousel();
    renderOtherProjectsCarousel();
  };
  init();
}

// Libraries
// Magnefic popup
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

// Observers
// Navigation observer
const navigationObserver = new IntersectionObserver(
  (e) => {
    if (!e[0].isIntersecting) {
      header.classList.remove("studioNav");
      header.classList.remove("clientsNav");
      header.classList.add("fixedHeader");
      btnscrollUp.classList.remove("hidden");
    } else {
      header.classList.add("studioNav");
      header.classList.add("clientsNav");
      btnscrollUp.classList.add("hidden");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-100px",
  }
);
navigationObserver.observe(clients_section1);

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
