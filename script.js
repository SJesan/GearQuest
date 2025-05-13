// Hamburger menu
document.getElementById("menuBtn").addEventListener("click", () => {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("hidden");
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  const menu = document.getElementById("mobileMenu");
  const menuBtn = document.getElementById("menuBtn");
  if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
    menu.classList.add("hidden");
  }
});

// auto slider
const slider = document.getElementById("slider");
const slides = slider.children;
let current = 0;
const slideInterval = 3000;
let slideTimer;

function moveToNextSlide() {
  current = (current + 1) % slides.length;
  slider.style.transform = `translateX(-${current * 100}%)`;
}

function startSlideTimer() {
  slideTimer = setInterval(moveToNextSlide, slideInterval);
}

function resetSlideTimer() {
  clearInterval(slideTimer);
  startSlideTimer();
}

// Pause slider on hover
slider.addEventListener("mouseenter", () => clearInterval(slideTimer));
slider.addEventListener("mouseleave", startSlideTimer);

// Set width 
for (let slide of slides) {
  slide.style.width = "100%";
}

// Initial first slide 
window.addEventListener("load", () => {
  slider.style.transform = "translateX(0%)";
  startSlideTimer();
});

// navigation button 
document.getElementById("prev").addEventListener("click", () => {
  current = (current - 1 + slides.length) % slides.length;
  slider.style.transform = `translateX(-${current * 100}%)`;
  resetSlideTimer();
});

document.getElementById("next").addEventListener("click", () => {
  current = (current + 1) % slides.length;
  slider.style.transform = `translateX(-${current * 100}%)`;
  resetSlideTimer();
});
