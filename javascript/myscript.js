function openModal(imageSrc) {
  var modal = document.getElementById("myModal");
  var modalImg = document.getElementById("img01");
  modal.style.display = "block";
  modalImg.src = imageSrc;
}

function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

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
