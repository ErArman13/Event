// Event Registration System - Main JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Initialize tooltips if Bootstrap is available
  if (typeof bootstrap !== "undefined") {
    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  // Form validation and enhancement
  enhanceForms();

  // Add loading states to buttons
  addLoadingStates();

  // Initialize search functionality
  initializeSearch();

  // Add confirmation dialogs
  addConfirmationDialogs();

  // Auto-hide alerts after 5 seconds
  autoHideAlerts();

  // Initialize progress bars animation
  animateProgressBars();
});

function enhanceForms() {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    // Add Bootstrap validation classes
    form.addEventListener("submit", function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add("was-validated");
    });

    // Real-time email validation
    const emailInputs = form.querySelectorAll('input[type="email"]');
    emailInputs.forEach((input) => {
      input.addEventListener("input", function () {
        const isValid = input.checkValidity();
        input.classList.toggle("is-valid", isValid && input.value.length > 0);
        input.classList.toggle(
          "is-invalid",
          !isValid && input.value.length > 0
        );
      });
    });

    // Phone number formatting
    const phoneInputs = form.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach((input) => {
      input.addEventListener("input", function (e) {
        // Remove all non-digit characters
        let value = e.target.value.replace(/\D/g, "");

        // Format as (XXX) XXX-XXXX for US numbers
        if (value.length >= 6) {
          value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(
            6,
            10
          )}`;
        } else if (value.length >= 3) {
          value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        }

        e.target.value = value;
      });
    });

    // Date validation - prevent past dates for new events
    const dateInputs = form.querySelectorAll('input[type="date"]');
    dateInputs.forEach((input) => {
      // Set minimum date to today
      const today = new Date().toISOString().split("T")[0];
      if (
        input.name === "date" &&
        window.location.pathname.includes("create-event")
      ) {
        input.setAttribute("min", today);
      }
    });
  });
}

function addLoadingStates() {
  const submitButtons = document.querySelectorAll('button[type="submit"]');

  submitButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const form = this.closest("form");
      if (form && form.checkValidity()) {
        // Only add loading state, don't disable the button
        this.classList.add("loading");

        // Re-enable after form submission
        setTimeout(() => {
          this.classList.remove("loading");
        }, 2000);
      }
      // Don't prevent default - let form submit normally
    });
  });
}

function initializeSearch() {
  // Add search functionality to tables
  const searchInputs = document.querySelectorAll("input[data-search-target]");

  searchInputs.forEach((input) => {
    input.addEventListener("input", function () {
      const target = document.querySelector(
        this.getAttribute("data-search-target")
      );
      const searchTerm = this.value.toLowerCase();

      if (target) {
        const rows = target.querySelectorAll("tbody tr");
        rows.forEach((row) => {
          const text = row.textContent.toLowerCase();
          row.style.display = text.includes(searchTerm) ? "" : "none";
        });
      }
    });
  });

  // Add filter functionality for event cards
  const filterButtons = document.querySelectorAll("[data-filter]");
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");
      const cards = document.querySelectorAll(".event-card");

      cards.forEach((card) => {
        if (filter === "all" || card.classList.contains(filter)) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
    });
  });
}

function addConfirmationDialogs() {
  // Add confirmation for delete actions
  const deleteButtons = document.querySelectorAll("[data-confirm]");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      const message = this.getAttribute("data-confirm") || "Are you sure?";
      if (!confirm(message)) {
        event.preventDefault();
        return false;
      }
    });
  });
}

function autoHideAlerts() {
  const alerts = document.querySelectorAll(".alert:not(.alert-permanent)");

  alerts.forEach((alert) => {
    // Don't auto-hide error alerts
    if (!alert.classList.contains("alert-danger")) {
      setTimeout(() => {
        if (typeof bootstrap !== "undefined" && bootstrap.Alert) {
          const bsAlert = new bootstrap.Alert(alert);
          bsAlert.close();
        } else {
          alert.style.opacity = "0";
          setTimeout(() => alert.remove(), 300);
        }
      }, 5000);
    }
  });
}

function animateProgressBars() {
  const progressBars = document.querySelectorAll(".progress-bar");

  // Use Intersection Observer to animate when in view
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progressBar = entry.target;
            const width = progressBar.style.width;
            progressBar.style.width = "0%";

            setTimeout(() => {
              progressBar.style.width = width;
            }, 100);

            observer.unobserve(progressBar);
          }
        });
      },
      { threshold: 0.1 }
    );

    progressBars.forEach((bar) => observer.observe(bar));
  }
}

// Utility functions
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
  notification.style.cssText =
    "top: 20px; right: 20px; z-index: 9999; min-width: 300px;";
  notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

  document.body.appendChild(notification);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);
}

function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showNotification("Copied to clipboard!", "success");
      })
      .catch(() => {
        fallbackCopyToClipboard(text);
      });
  } else {
    fallbackCopyToClipboard(text);
  }
}

function fallbackCopyToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand("copy");
    showNotification("Copied to clipboard!", "success");
  } catch (err) {
    showNotification("Failed to copy to clipboard", "danger");
  }

  document.body.removeChild(textArea);
}

// Export utility functions for use in other scripts
window.EventRegistrationUtils = {
  showNotification,
  copyToClipboard,
};

// Service Worker registration for offline functionality (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
