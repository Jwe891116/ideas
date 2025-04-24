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
