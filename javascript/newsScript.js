document
  .querySelector(".mobile-menu-toggle")
  .addEventListener("click", function () {
    document.querySelector(".nav-links").classList.toggle("active");
  });

// News Slider Functionality
let slideIndex = 0;
let slideInterval;
const slideDuration = 5000; // 5 seconds

// Initialize slider on page load
document.addEventListener("DOMContentLoaded", function () {
  showSlide(slideIndex);
  startSlider();
});

function showSlide(index) {
  const slides = document.querySelector(".news-slide-container");
  const totalSlides = document.querySelectorAll(".news-slide").length;

  // Handle wrap-around for slides
  if (index >= totalSlides) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = totalSlides - 1;
  } else {
    slideIndex = index;
  }

  slides.style.transform = `translateX(${-slideIndex * 100}%)`;
}

function nextSlide() {
  showSlide(slideIndex + 1);
  resetInterval();
}

function prevSlide() {
  showSlide(slideIndex - 1);
  resetInterval();
}

function startSlider() {
  slideInterval = setInterval(nextSlide, slideDuration);
}

function resetInterval() {
  clearInterval(slideInterval);
  startSlider();
}

// News Modal Functionality
function showNewsModal(newsIndex) {
  const modal = document.getElementById("newsModal");
  const newsItem = document.getElementById(`news-content-${newsIndex}`);
  const headline =
    newsItem.parentElement.querySelector(".card-headline h3").textContent;
  const content = newsItem.innerHTML;

  document.getElementById("modalNewsContent").innerHTML = `
    <h3>${headline}</h3>
    ${content}
  `;
  modal.style.display = "block";

  // Pause slider when modal is open
  clearInterval(slideInterval);
}

function closeNewsModal() {
  document.getElementById("newsModal").style.display = "none";

  // Resume slider when modal is closed
  resetInterval();
}

// Close modal when clicking outside of content
window.onclick = function (event) {
  const modal = document.getElementById("newsModal");
  if (event.target === modal) {
    closeNewsModal();
  }
};

// Keyboard navigation for modal and slider
document.addEventListener("keydown", function (event) {
  const modal = document.getElementById("newsModal");

  // Handle keyboard events when modal is open
  if (modal.style.display === "block") {
    if (event.key === "Escape") {
      closeNewsModal();
    }
  }
  // Handle keyboard events for slider when modal is closed
  else {
    if (event.key === "ArrowLeft") {
      prevSlide();
    } else if (event.key === "ArrowRight") {
      nextSlide();
    }
  }
});

// Touch events for mobile swipe functionality
let touchStartX = 0;
let touchEndX = 0;

document.querySelector(".news-slide-container").addEventListener(
  "touchstart",
  function (e) {
    touchStartX = e.changedTouches[0].screenX;
  },
  false
);

document.querySelector(".news-slide-container").addEventListener(
  "touchend",
  function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  },
  false
);

function handleSwipe() {
  if (touchEndX < touchStartX - 50) {
    nextSlide(); // Swipe left
  }
  if (touchEndX > touchStartX + 50) {
    prevSlide(); // Swipe right
  }
}
