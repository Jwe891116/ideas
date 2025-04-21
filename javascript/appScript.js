document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", function () {
      const navLinks = document.querySelector(".nav-links");
      if (navLinks) {
        navLinks.classList.toggle("active");
      }
    });
  }

  // File upload display
  document.querySelectorAll('input[type="file"]').forEach((input) => {
    input.addEventListener("change", function () {
      const fileNameDisplay = this.nextElementSibling?.nextElementSibling;
      if (fileNameDisplay) {
        const fileName = this.files[0] ? this.files[0].name : "No file chosen";
        fileNameDisplay.textContent = fileName;
      }
    });
  });

  // Public service employment status toggle
  document.querySelectorAll('input[name="publicService"]').forEach((radio) => {
    radio.addEventListener("change", function () {
      const statusGroup = document.getElementById("employmentStatusGroup");
      if (statusGroup) {
        statusGroup.style.display = this.value === "Yes" ? "block" : "none";
      }
    });
  });

  // Helper function to create delete button with event listener
  function createDeleteButton(row, tbody) {
    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.addEventListener("click", function () {
      tbody.removeChild(row);
    });
    return deleteBtn;
  }

  // Add Education Row
  const addEducationBtn = document.getElementById("addEducationRow");
  if (addEducationBtn) {
    addEducationBtn.addEventListener("click", function () {
      const tbody = document.getElementById("educationRows");
      if (!tbody) return;

      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>
          <input type="text" name="educationLevel[]" placeholder="Other" required />
        </td>
        <td>
          <input type="text" name="schoolAttended[]" placeholder="School" required />
        </td>
        <td>
          <input type="number" name="educationFrom[]" min="1900" max="2099" placeholder="Year" required />
        </td>
        <td>
          <input type="number" name="educationTo[]" min="1900" max="2099" placeholder="Year" required />
        </td>
        <td></td>
      `;

      const deleteCell = newRow.querySelector("td:last-child");
      deleteCell.appendChild(createDeleteButton(newRow, tbody));
      tbody.appendChild(newRow);
    });
  }

  // Add Previous Employer Row
  const addEmployerBtn = document.getElementById("addPreviousEmployer");
  if (addEmployerBtn) {
    addEmployerBtn.addEventListener("click", function () {
      const tbody = document.getElementById("previousEmployersRows");
      if (!tbody) return;

      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>
          <input type="text" name="prevEmployerName[]" placeholder="Employer Name" required />
        </td>
        <td>
          <input type="text" name="prevEmployerJob[]" placeholder="Job Description/Title" required />
        </td>
        <td>
          <input type="number" name="prevEmployerFrom[]" min="1900" max="2099" placeholder="Year" required />
        </td>
        <td>
          <input type="number" name="prevEmployerTo[]" min="1900" max="2099" placeholder="Year" required />
        </td>
        <td></td>
      `;

      const deleteCell = newRow.querySelector("td:last-child");
      deleteCell.appendChild(createDeleteButton(newRow, tbody));
      tbody.appendChild(newRow);
    });
  }

  // Add Military Experience Row
  const addMilitaryBtn = document.getElementById("addMilitaryExperience");
  if (addMilitaryBtn) {
    addMilitaryBtn.addEventListener("click", function () {
      const tbody = document.getElementById("militaryExperienceRows");
      if (!tbody) return;

      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>
          <input type="text" name="militaryCountry[]" placeholder="Country" required />
        </td>
        <td>
          <input type="text" name="militaryUnit[]" placeholder="Unit/Organization" required />
        </td>
        <td>
          <input type="number" name="militaryFrom[]" min="1900" max="2099" placeholder="Year" required />
        </td>
        <td>
          <input type="number" name="militaryTo[]" min="1900" max="2099" placeholder="Year" required />
        </td>
        <td>
          <input type="text" name="militaryRank[]" placeholder="Last Rank" required />
        </td>
        <td></td>
      `;

      const deleteCell = newRow.querySelector("td:last-child");
      deleteCell.appendChild(createDeleteButton(newRow, tbody));
      tbody.appendChild(newRow);
    });
  }

  // Add Reference Row
  const addReferenceBtn = document.getElementById("addReference");
  if (addReferenceBtn) {
    addReferenceBtn.addEventListener("click", function () {
      const tbody = document.getElementById("referencesRows");
      if (!tbody) return;

      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>
          <input type="text" name="referenceName[]" required placeholder="Name" />
        </td>
        <td>
          <input type="tel" name="referenceTel[]" required placeholder="Phone Number" />
        </td>
        <td>
          <input type="text" name="referenceRelationship[]" required placeholder="Relationship" />
        </td>
        <td>
          <input type="number" name="referenceYearsKnown[]" min="1" required placeholder="Years Known" />
        </td>
        <td></td>
      `;

      const deleteCell = newRow.querySelector("td:last-child");
      deleteCell.appendChild(createDeleteButton(newRow, tbody));
      tbody.appendChild(newRow);
    });
  }

  // Signature Pad functionality
  const canvas = document.getElementById("signatureCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // Set canvas background to white
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Mouse event handlers
    function startDrawing(e) {
      isDrawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function draw(e) {
      if (!isDrawing) return;
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      [lastX, lastY] = [e.offsetX, e.offsetY];
      updateSignatureInput();
    }

    function stopDrawing() {
      isDrawing = false;
      updateSignatureInput();
    }

    // Touch event handlers for mobile devices
    function handleTouchStart(e) {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      canvas.dispatchEvent(mouseEvent);
    }

    function handleTouchMove(e) {
      e.preventDefault();
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      canvas.dispatchEvent(mouseEvent);
    }

    function updateSignatureInput() {
      const signatureInput = document.getElementById("signature");
      if (signatureInput) {
        signatureInput.value = canvas.toDataURL();
      }
    }

    // Set up event listeners
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);
    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchend", stopDrawing);

    // Clear signature button
    const clearSignatureBtn = document.getElementById("clearSignature");
    if (clearSignatureBtn) {
      clearSignatureBtn.addEventListener("click", function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const signatureInput = document.getElementById("signature");
        if (signatureInput) {
          signatureInput.value = "";
        }
      });
    }
  }

  // Form submission handler
  const recruitmentForm = document.getElementById("recruitmentForm");
  if (recruitmentForm) {
    recruitmentForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Validate signature
      const signatureInput = document.getElementById("signature");
      if (signatureInput && !signatureInput.value) {
        alert("Please provide your signature before submitting");
        return;
      }

      // Validate required fields
      const requiredFields = recruitmentForm.querySelectorAll("[required]");
      let isValid = true;

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          field.style.borderColor = "red";
          isValid = false;
        } else {
          field.style.borderColor = "";
        }
      });

      if (!isValid) {
        alert("Please fill in all required fields");
        return;
      }

      // Show loading state
      const submitBtn = recruitmentForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Submitting...';
      }

      // Here you would typically send the form data to the server
      // Simulate API call with timeout
      setTimeout(() => {
        alert("Form submitted successfully!");
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Submit";
        }
        // recruitmentForm.submit(); // Uncomment to actually submit the form
      }, 1500);
    });
  }

  // Save draft button
  const saveDraftBtn = document.getElementById("saveDraft");
  if (saveDraftBtn) {
    saveDraftBtn.addEventListener("click", function () {
      // Show loading state
      this.disabled = true;
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

      // Here you would typically save the form data to localStorage or send to server
      // Simulate API call with timeout
      setTimeout(() => {
        alert("Draft saved successfully!");
        this.disabled = false;
        this.textContent = "Save Draft";
      }, 1000);
    });
  }

  // Year validation for all year inputs
  document
    .querySelectorAll('input[type="number"][min="1900"][max="2099"]')
    .forEach((input) => {
      input.addEventListener("blur", function () {
        if (this.value && (this.value < 1900 || this.value > 2099)) {
          this.setCustomValidity(
            "Please enter a valid year between 1900 and 2099"
          );
          this.reportValidity();
        } else {
          this.setCustomValidity("");
        }
      });
    });

  // Phone number validation
  document.querySelectorAll('input[type="tel"]').forEach((input) => {
    input.addEventListener("blur", function () {
      const phoneRegex = /^[+]?[\d\s\-()]{10,15}$/;
      if (this.value && !phoneRegex.test(this.value)) {
        this.setCustomValidity("Please enter a valid phone number");
        this.reportValidity();
      } else {
        this.setCustomValidity("");
      }
    });
  });
});
