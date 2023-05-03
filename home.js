const header = document.querySelector(".header");
const video = document.createElement("video");
const videoParent = document.createElement("div");
const onScreenLogo = document.querySelector(".onScreenLogo");
const introVideo = document.querySelector(".introVideo");

// Appending the starter video
introVideo.addEventListener("ended", function () {
  introVideo.src = "./Videos//Home page video/HomePage.mp4";
});

if (window.innerWidth < 600) {
  header.classList.remove("hidden");
  onScreenLogo.style.display = "none";
}
