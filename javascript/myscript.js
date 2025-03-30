//Mobile
document
  .querySelector(".mobile-menu-toggle")
  .addEventListener("click", function () {
    document.querySelector(".nav-links").classList.toggle("active");
  });

//About Us Fuctions
function openTab(tabId) {
  // Hide all tab contents except Special Forces
  const tabContents = document.querySelectorAll(
    ".tab-content:not(.special-forces-content)"
  );
  tabContents.forEach((content) => {
    content.style.display = "none";
  });

  // Remove active class from all buttons
  const tabButtons = document.querySelectorAll(".tab-button");
  tabButtons.forEach((button) => {
    button.classList.remove("active");
  });

  // Show the selected tab content
  document.getElementById(tabId).style.display = "block";

  // Add active class to the clicked button
  event.currentTarget.classList.add("active");
}

//News functions
//Slider
let slideIndex = 0;

function showSlide(index) {
  const slides = document.querySelector(".news-slide-container");
  const totalSlides = document.querySelectorAll(".news-slide").length;

  if (index >= totalSlides) slideIndex = 0;
  if (index < 0) slideIndex = totalSlides - 1;

  slides.style.transform = `translateX(${-slideIndex * 100}%)`;
}

function nextSlide() {
  slideIndex++;
  showSlide(slideIndex);
}

function prevSlide() {
  slideIndex--;
  showSlide(slideIndex);
}

setInterval(nextSlide, 5000); // Auto-slide every 5 seconds

//Container
function showNewsModal(newsIndex) {
  const newsContent = document.getElementById(
    `news-content-${newsIndex}`
  ).innerHTML;
  document.getElementById("modalNewsContent").innerHTML = newsContent;
  document.getElementById("newsModal").style.display = "block";
}

function closeNewsModal() {
  document.getElementById("newsModal").style.display = "none";
}

// Close modal when clicking outside of it
window.onclick = function (event) {
  const modal = document.getElementById("newsModal");
  if (event.target == modal) {
    closeNewsModal();
  }
};
