/**
 * ==============================
 * 📜 Ganesh Engineers – Main Script (Professional)
 * Frontend JS + Backend Integration
 * ==============================
 */
document.addEventListener("DOMContentLoaded", () => {

  /* ==============================
     📱 Mobile Menu Toggle
  ============================== */
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isActive = !navLinks.hasAttribute("hidden");
      navLinks.toggleAttribute("hidden", isActive);
      menuToggle.setAttribute("aria-expanded", !isActive);
      document.body.classList.toggle("no-scroll", !isActive);
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.setAttribute("hidden", "");
        menuToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("no-scroll");
      });
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

    // Create styled inline alert box
    const alertBox = document.createElement("div");
    alertBox.id = "form-alert";
    alertBox.style.display = "none";
    alertBox.style.marginTop = "12px";
    alertBox.style.padding = "12px";
    alertBox.style.borderRadius = "8px";
    alertBox.style.fontSize = "14px";
    alertBox.style.fontWeight = "500";
    alertBox.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
    alertBox.style.transition = "all 0.3s ease";
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
  // Remove existing toast if present
  const existingToast = document.querySelector(".toast");
  if (existingToast) existingToast.remove();

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;

  // Basic styles for professional look
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.padding = "12px 20px";
  toast.style.borderRadius = "8px";
  toast.style.color = "#fff";
  toast.style.fontSize = "14px";
  toast.style.fontWeight = "500";
  toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
  toast.style.zIndex = "9999";
  toast.style.backgroundColor = type === "success" ? "#28a745" : type === "error" ? "#dc3545" : "#007bff";
  toast.style.opacity = "0";
  toast.style.transform = "translateY(20px)";
  toast.style.transition = "all 0.3s ease";

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
