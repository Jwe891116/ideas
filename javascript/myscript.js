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
