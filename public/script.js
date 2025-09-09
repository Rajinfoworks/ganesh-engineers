/**
 * ==============================
 * 📜 Ganesh Engineers – Main Script (Optimized)
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

    navToggle.addEventListener("click", toggleMenu);

    navLinks.querySelectorAll("a").forEach(link =>
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        navToggle.classList.remove("open");
      })
    );

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

    const alertBox = document.createElement("div");
    alertBox.id = "form-alert";
    alertBox.style.display = "none";
    contactForm.appendChild(alertBox);

    const showInlineAlert = (message, type) => {
      Object.assign(alertBox.style, {
        display: "block",
        marginTop: "12px",
        padding: "12px",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "500",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        backgroundColor: type === "error" ? "#ffe6e6" : "#e6ffe6",
        color: type === "error" ? "#b30000" : "#006600",
        border: type === "error" ? "1px solid #ff9999" : "1px solid #99ff99"
      });
      alertBox.textContent = message;
    };

    const hideInlineAlert = () => {
      alertBox.style.display = "none";
      alertBox.textContent = "";
    };

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
        const res = await fetch("/api/contact", {
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
      } catch (err) {
        console.error("Form submission error:", err);
        showToast("⚠️ Server error. Try again later.", "error");
      }
    });
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

/* ==============================
   🖼️ Image & Project Modal Popup (Unified)
============================== */
(function setupImageModal() {
  const modal = document.getElementById("imgModal");
  if (!modal) return;

  const modalImg = document.getElementById("modalImg");
  const captionText = document.getElementById("caption");
  const closeBtn = modal.querySelector(".close");

  const openModal = (img) => {
    modal.style.display = "block";
    modalImg.src = img.src;
    captionText.innerHTML = `<strong>${img.dataset.title}</strong><br>${img.dataset.desc}`;
  };

  document.querySelectorAll(".service-card img, .project-card img").forEach(img => {
    img.addEventListener("click", () => openModal(img));
  });

  closeBtn.addEventListener("click", () => modal.style.display = "none");
  window.addEventListener("click", (e) => { if (e.target === modal) modal.style.display = "none"; });
})();


// Disable right-click on entire page
document.addEventListener('contextmenu', event => event.preventDefault());
