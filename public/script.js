/**
 * ==============================
 * 📜 Ganesh Engineers – Main Script (Clean & Optimized)
 * ==============================
 */
document.addEventListener("DOMContentLoaded", () => {
  /* ==============================
   📱 Mobile Navigation Toggle
============================== */
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    const toggleMenu = () => {
      navLinks.classList.toggle("active");
      navToggle.classList.toggle("open");
    };

    // Toggle menu on hamburger click
    navToggle.addEventListener("click", toggleMenu);

    // Close menu when clicking a link (mobile only)
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        navToggle.classList.remove("open");
      });
    });

    // Optional: close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
        navLinks.classList.remove("active");
        navToggle.classList.remove("open");
      }
    });
  }


  /* ==============================
     📩 Contact Form Submission
  ============================== */
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const messageField = document.getElementById("message");

    // Inline alert box
    const alertBox = document.createElement("div");
    alertBox.id = "form-alert";
    alertBox.style.display = "none";
    contactForm.appendChild(alertBox);

    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      hideInlineAlert();

      const name = nameField.value.trim();
      const email = emailField.value.trim();
      const message = messageField.value.trim();

      if (!name || !email || !message) {
        showInlineAlert("⚠️ Please fill in all fields.", "error");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message })
        });

        const data = await res.json();

        if (res.ok) {
          showToast("✅ Message sent successfully!", "success");
          contactForm.reset();
        } else {
          showToast(`⚠️ ${data.error || "Failed to send message"}`, "error");
        }
      } catch {
        showToast("⚠️ Server error. Try again later.", "error");
      }
    });

    function showInlineAlert(message, type) {
      alertBox.textContent = message;
      alertBox.style.display = "block";
      alertBox.style.marginTop = "12px";
      alertBox.style.padding = "12px";
      alertBox.style.borderRadius = "8px";
      alertBox.style.fontSize = "14px";
      alertBox.style.fontWeight = "500";
      alertBox.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
      alertBox.style.backgroundColor = type === "error" ? "#ffe6e6" : "#e6ffe6";
      alertBox.style.color = type === "error" ? "#b30000" : "#006600";
      alertBox.style.border = type === "error" ? "1px solid #ff9999" : "1px solid #99ff99";
    }

    function hideInlineAlert() {
      alertBox.style.display = "none";
      alertBox.textContent = "";
    }
  }
});

/* ==============================
   ⏳ Preloader Fade Out
============================== */
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.classList.add("fade-out");
    setTimeout(() => preloader.remove(), 600);
  }
});

/* ==============================
   📦 Scroll Reveal Animation
============================== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${i * 0.1}s`;
      entry.target.classList.add("visible");
    } else {
      entry.target.classList.remove("visible");
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll("section, .reveal").forEach(el => revealObserver.observe(el));

/* ==============================
   🔔 Toast Notifications
============================== */
function showToast(message, type = "info") {
  const existingToast = document.querySelector(".toast");
  if (existingToast) existingToast.remove();

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;

  // Style
  Object.assign(toast.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "12px 20px",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "500",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    zIndex: "9999",
    backgroundColor: type === "success" ? "#28a745" : type === "error" ? "#dc3545" : "#007bff",
    opacity: "0",
    transform: "translateY(20px)",
    transition: "all 0.3s ease"
  });

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
    toast.addEventListener("transitionend", () => toast.remove());
  }, 3000);
}

// Image Popup
const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");
const captionText = document.getElementById("caption");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".service-card img").forEach(img => {
  img.addEventListener("click", function () {
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = `<strong>${this.dataset.title}</strong><br>${this.dataset.desc}`;
  });
});

closeBtn.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

// project section popup
{
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImg");
  const captionText = document.getElementById("caption");
  const closeBtn = document.querySelector(".close");

  document.querySelectorAll(".project-card img").forEach(img => {
    img.addEventListener("click", function () {
      modal.style.display = "block";
      modalImg.src = this.src;
      captionText.innerHTML = `<strong>${this.dataset.title}</strong><br>${this.dataset.desc}`;
    });
  });

  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  };
}

