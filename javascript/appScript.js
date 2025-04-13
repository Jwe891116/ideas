document.addEventListener("DOMContentLoaded", function () {
  // File upload display
  document.querySelectorAll('input[type="file"]').forEach((input) => {
    input.addEventListener("change", function () {
      const fileName = this.files[0] ? this.files[0].name : "No file chosen";
      this.nextElementSibling.nextElementSibling.textContent = fileName;
    });
  });

  // Public service employment status toggle
  document.querySelectorAll('input[name="publicService"]').forEach((radio) => {
    radio.addEventListener("change", function () {
      const statusGroup = document.getElementById("employmentStatusGroup");
      statusGroup.style.display = this.value === "Yes" ? "block" : "none";
    });
  });

  // Add Education Row
  document
    .getElementById("addEducationRow")
    .addEventListener("click", function () {
      const tbody = document.getElementById("educationRows");
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
      <td>
        <input
          type="text"
          name="educationLevel[]"
          placeholder="Other"
          required
        />
      </td>
      <td>
        <input
          type="text"
          name="schoolAttended[]"
          placeholder="School"
          required
        />
      </td>
      <td>
        <input
          type="number"
          name="educationFrom[]"
          min="1900"
          max="2099"
          placeholder="Year"
          required
        />
      </td>
      <td>
        <input
          type="number"
          name="educationTo[]"
          min="1900"
          max="2099"
          placeholder="Year"
          required
        />
      </td>
      <td>
        <button type="button" class="delete-btn">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;
      tbody.appendChild(newRow);

      // Add event listener to the new delete button
      newRow
        .querySelector(".delete-btn")
        .addEventListener("click", function () {
          tbody.removeChild(newRow);
        });
    });

  // Add Previous Employer Row
  document
    .getElementById("addPreviousEmployer")
    .addEventListener("click", function () {
      const tbody = document.getElementById("previousEmployersRows");
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
      <td>
        <input
          type="text"
          name="prevEmployerName[]"
          placeholder="Employer Name"
          required
        />
      </td>
      <td>
        <input
          type="text"
          name="prevEmployerJob[]"
          placeholder="Job Description/Title"
          required
        />
      </td>
      <td>
        <input
          type="number"
          name="prevEmployerFrom[]"
          min="1900"
          max="2099"
          placeholder="Year"
          required
        />
      </td>
      <td>
        <input
          type="number"
          name="prevEmployerTo[]"
          min="1900"
          max="2099"
          placeholder="Year"
          required
        />
      </td>
      <td>
        <button type="button" class="delete-btn">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;
      tbody.appendChild(newRow);

      // Add event listener to the new delete button
      newRow
        .querySelector(".delete-btn")
        .addEventListener("click", function () {
          tbody.removeChild(newRow);
        });
    });

  // Add Military Experience Row
  document
    .getElementById("addMilitaryExperience")
    .addEventListener("click", function () {
      const tbody = document.getElementById("militaryExperienceRows");
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
      <td>
        <input
          type="text"
          name="militaryCountry[]"
          placeholder="Country"
          required
        />
      </td>
      <td>
        <input
          type="text"
          name="militaryUnit[]"
          placeholder="Unit/Organization"
          required
        />
      </td>
      <td>
        <input
          type="number"
          name="militaryFrom[]"
          min="1900"
          max="2099"
          placeholder="Year"
          required
        />
      </td>
      <td>
        <input
          type="number"
          name="militaryTo[]"
          min="1900"
          max="2099"
          placeholder="Year"
          required
        />
      </td>
      <td>
        <input
          type="text"
          name="militaryRank[]"
          placeholder="Last Rank"
          required
        />
      </td>
      <td>
        <button type="button" class="delete-btn">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;
      tbody.appendChild(newRow);

      // Add event listener to the new delete button
      newRow
        .querySelector(".delete-btn")
        .addEventListener("click", function () {
          tbody.removeChild(newRow);
        });
    });

  // Add Reference Row
  document
    .getElementById("addReference")
    .addEventListener("click", function () {
      const tbody = document.getElementById("referencesRows");
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
      <td>
        <input
          type="text"
          name="referenceName[]"
          required
          placeholder="Name"
        />
      </td>
      <td>
        <input
          type="tel"
          name="referenceTel[]"
          required
          placeholder="Phone Number"
        />
      </td>
      <td>
        <input
          type="text"
          name="referenceRelationship[]"
          required
          placeholder="Relationship"
        />
      </td>
      <td>
        <input
          type="number"
          name="referenceYearsKnown[]"
          min="1"
          required
          placeholder="Years Known"
        />
      </td>
      <td>
        <button type="button" class="delete-btn">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;
      tbody.appendChild(newRow);

      // Add event listener to the new delete button
      newRow
        .querySelector(".delete-btn")
        .addEventListener("click", function () {
          tbody.removeChild(newRow);
        });
    });

  // Signature Pad functionality
  const canvas = document.getElementById("signatureCanvas");
  const ctx = canvas.getContext("2d");
  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;

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
  }

  function stopDrawing() {
    isDrawing = false;
    // Update hidden input with canvas data
    document.getElementById("signature").value = canvas.toDataURL();
  }

  // Touch event handlers for mobile devices
  function handleTouchStart(e) {
    e.preventDefault();
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

  // Set up event listeners
  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseout", stopDrawing);
  canvas.addEventListener("touchstart", handleTouchStart);
  canvas.addEventListener("touchmove", handleTouchMove);
  canvas.addEventListener("touchend", stopDrawing);

  // Clear signature button
  document
    .getElementById("clearSignature")
    .addEventListener("click", function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      document.getElementById("signature").value = "";
    });

  // Form submission handler
  document
    .getElementById("recruitmentForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      // Validate signature
      if (!document.getElementById("signature").value) {
        alert("Please provide your signature before submitting");
        return;
      }
      // Here you would typically send the form data to the server
      alert("Form submitted successfully!");
      // this.submit(); // Uncomment to actually submit the form
    });

  // Save draft button
  document.getElementById("saveDraft").addEventListener("click", function () {
    // Here you would typically save the form data to localStorage or send to server
    alert("Draft saved successfully!");
  });
});
