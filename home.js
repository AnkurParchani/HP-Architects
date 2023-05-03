const header = document.querySelector(".header");
const video = document.createElement("video");
const videoParent = document.createElement("div");
const onScreenLogo = document.querySelector(".onScreenLogo");
const dropDownArrow = document.querySelector(".dropdown_arrow");
const introVideo = document.querySelector(".introVideo");

// Appending the starter video
introVideo.addEventListener("ended", function () {
  introVideo.src = "./Videos//Home page video/HomePage.mp4";
});

if (window.innerWidth < 600) {
  dropDownArrow.classList.add("hidden");
  header.classList.remove("hidden");
  dropDownArrow.style.display = "none";
  onScreenLogo.style.display = "none";
}
