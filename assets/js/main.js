/* ==========================================
   TECH RWT BLOGS - MAIN JAVASCRIPT ENGINE
   ========================================== */

document.addEventListener("DOMContentLoaded", async () => {
  // 1. Load Header and Footer Components
  await loadComponent("header-placeholder", "components/header.html");
  await loadComponent("footer-placeholder", "components/footer.html");

  // 2. Initialize Theme Switcher
  initThemeSwitcher();

  // 3. Initialize Mobile Menu Toggle
  initMobileMenu();
});

// Helper function to load HTML partials
async function loadComponent(placeholderId, filePath) {
  const placeholder = document.getElementById(placeholderId);
  if (!placeholder) return;
  
  try {
    const response = await fetch(filePath);
    if (response.ok) {
      const html = await response.text();
      placeholder.innerHTML = html;
    } else {
      console.error(`Failed to load component: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error);
  }
}

// Theme Switcher Logic (Dark / Light Mode)
function initThemeSwitcher() {
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const currentTheme = localStorage.getItem("theme") || "light";

  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  }

  // Event listener will be attached after header loads
  document.addEventListener("click", (e) => {
    if (e.target.closest("#themeToggleBtn")) {
      let theme = document.documentElement.getAttribute("data-theme");
      if (theme === "dark") {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      }
    }
  });
}

// Mobile Menu Toggle Logic
function initMobileMenu() {
  document.addEventListener("click", (e) => {
    const toggleBtn = e.target.closest("#mobileMenuToggle");
    if (toggleBtn) {
      const navMenu = document.querySelector(".nav-menu");
      if (navMenu) {
        navMenu.style.display = navMenu.style.display === "flex" ? "none" : "flex";
      }
    }
  });
}
