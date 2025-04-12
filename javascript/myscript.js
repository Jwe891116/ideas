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

//Recruitment
document.addEventListener("DOMContentLoaded", function () {
  // File upload display
  const fileInputs = document.querySelectorAll('input[type="file"]');
  fileInputs.forEach((input) => {
    input.addEventListener("change", function () {
      const fileName = this.files[0] ? this.files[0].name : "No file chosen";
      const displayElement = this.nextElementSibling.nextElementSibling;
      displayElement.textContent = fileName;
    });
  });

  // Public service employment status toggle
  const publicServiceRadios = document.querySelectorAll(
    'input[name="publicService"]'
  );
  const employmentStatusGroup = document.getElementById(
    "employmentStatusGroup"
  );

  publicServiceRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      if (this.value === "Yes") {
        employmentStatusGroup.style.display = "block";
      } else {
        employmentStatusGroup.style.display = "none";
        document.getElementById("employmentStatus").value = "";
      }
    });
  });

  // Add education row
  const addEducationRowBtn = document.getElementById("addEducationRow");
  const educationTableBody = document.getElementById("educationRows");

  addEducationRowBtn.addEventListener("click", function () {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
            <td><input type="text" name="educationLevel[]" placeholder="e.g. Tertiary" required></td>
            <td><input type="text" name="schoolAttended[]" required></td>
            <td><input type="number" name="educationFrom[]" min="1900" max="2099" required></td>
            <td><input type="number" name="educationTo[]" min="1900" max="2099" required></td>
            <td><button type="button" class="delete-row-btn">Delete</button></td>
        `;
    educationTableBody.appendChild(newRow);

    // Add delete functionality
    newRow
      .querySelector(".delete-row-btn")
      .addEventListener("click", function () {
        educationTableBody.removeChild(newRow);
      });
  });

  // Add previous employer row
  const addPreviousEmployerBtn = document.getElementById("addPreviousEmployer");
  const previousEmployersTableBody = document.getElementById(
    "previousEmployersRows"
  );

  addPreviousEmployerBtn.addEventListener("click", function () {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
            <td><input type="text" name="previousEmployerName[]" required></td>
            <td><input type="text" name="previousEmployerTitle[]" required></td>
            <td><input type="number" name="previousEmployerFrom[]" min="1900" max="2099" required></td>
            <td><input type="number" name="previousEmployerTo[]" min="1900" max="2099" required></td>
            <td><button type="button" class="delete-row-btn">Delete</button></td>
        `;
    previousEmployersTableBody.appendChild(newRow);

    // Add delete functionality
    newRow
      .querySelector(".delete-row-btn")
      .addEventListener("click", function () {
        previousEmployersTableBody.removeChild(newRow);
      });
  });

  // Add military experience row
  const addMilitaryExperienceBtn = document.getElementById(
    "addMilitaryExperience"
  );
  const militaryExperienceTableBody = document.getElementById(
    "militaryExperienceRows"
  );

  addMilitaryExperienceBtn.addEventListener("click", function () {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
            <td><input type="text" name="militaryCountry[]" required></td>
            <td><input type="text" name="militaryUnit[]" required></td>
            <td><input type="number" name="militaryFrom[]" min="1900" max="2099" required></td>
            <td><input type="number" name="militaryTo[]" min="1900" max="2099" required></td>
            <td><input type="text" name="militaryRank[]" required></td>
            <td><button type="button" class="delete-row-btn">Delete</button></td>
        `;
    militaryExperienceTableBody.appendChild(newRow);

    // Add delete functionality
    newRow
      .querySelector(".delete-row-btn")
      .addEventListener("click", function () {
        militaryExperienceTableBody.removeChild(newRow);
      });
  });

  // Add reference row
  const addReferenceBtn = document.getElementById("addReference");
  const referencesTableBody = document.getElementById("referencesRows");

  addReferenceBtn.addEventListener("click", function () {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
            <td><input type="text" name="referenceName[]" required></td>
            <td><input type="tel" name="referenceTel[]" required></td>
            <td><input type="text" name="referenceRelationship[]" required></td>
            <td><input type="number" name="referenceYearsKnown[]" min="1" required></td>
            <td><button type="button" class="delete-row-btn">Delete</button></td>
        `;
    referencesTableBody.appendChild(newRow);

    // Add delete functionality
    newRow
      .querySelector(".delete-row-btn")
      .addEventListener("click", function () {
        referencesTableBody.removeChild(newRow);
      });
  });

  // Signature pad functionality
  const canvas = document.getElementById("signatureCanvas");
  const signatureInput = document.getElementById("signature");
  const clearSignatureBtn = document.getElementById("clearSignature");
  const ctx = canvas.getContext("2d");
  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;

  // Set canvas background to white
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseout", stopDrawing);

  // Touch support for mobile devices
  canvas.addEventListener("touchstart", handleTouchStart);
  canvas.addEventListener("touchmove", handleTouchMove);
  canvas.addEventListener("touchend", handleTouchEnd);

  clearSignatureBtn.addEventListener("click", clearSignature);

  function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = getCoordinates(e);
  }

  function draw(e) {
    if (!isDrawing) return;

    ctx.strokeStyle = "black";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 2;

    const [x, y] = getCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    lastX = x;
    lastY = y;

    // Update hidden input with signature data
    signatureInput.value = canvas.toDataURL();
  }

  function stopDrawing() {
    isDrawing = false;
    signatureInput.value = canvas.toDataURL();
  }

  function clearSignature() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    signatureInput.value = "";
  }

  function getCoordinates(e) {
    let x, y;
    if (e.type.includes("touch")) {
      const rect = canvas.getBoundingClientRect();
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.offsetX;
      y = e.offsetY;
    }
    return [x, y];
  }

  function handleTouchStart(e) {
    e.preventDefault();
    startDrawing(e.touches[0]);
  }

  function handleTouchMove(e) {
    e.preventDefault();
    draw(e.touches[0]);
  }

  function handleTouchEnd(e) {
    e.preventDefault();
    stopDrawing();
  }

  // Form submission
  const recruitmentForm = document.getElementById("recruitmentForm");
  const saveDraftBtn = document.getElementById("saveDraft");
  const submitFormBtn = document.getElementById("submitForm");

  saveDraftBtn.addEventListener("click", function () {
    // In a real application, you would save the form data to local storage or a server
    alert("Draft saved successfully!");
  });

  recruitmentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate required fields
    const requiredFields = recruitmentForm.querySelectorAll("[required]");
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        field.style.borderColor = "var(--error-color)";
        isValid = false;
      } else {
        field.style.borderColor = "";
      }
    });

    // Validate signature
    if (!signatureInput.value) {
      alert("Please provide your signature");
      isValid = false;
    }

    if (isValid) {
      // In a real application, you would submit the form data to a server
      alert("Application submitted successfully!");

      // Reset form
      recruitmentForm.reset();
      clearSignature();

      // Reset file names
      document.querySelectorAll(".file-name").forEach((el) => {
        el.textContent = "No file chosen";
      });
    } else {
      alert("Please fill in all required fields");
    }
  });

  // Age calculation based on date of birth
  const dobInput = document.getElementById("dob");
  const ageInput = document.getElementById("age");

  dobInput.addEventListener("change", function () {
    if (this.value) {
      const birthDate = new Date(this.value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      ageInput.value = age;
    }
  });
});
