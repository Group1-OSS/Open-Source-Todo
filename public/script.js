// State Management
let tasks = [];

// DOM Elements
const taskList = document.getElementById("task-list");

// ============================================
// THEME MANAGEMENT
// ============================================

const THEME_KEY = "todo-app-theme";
const DARK_THEME = "dark";
const LIGHT_THEME = "light";

/**
 * Applies a theme by setting data-theme on <html> and
 * updating the toggle button's label + icon.
 */
function applyTheme(theme) {
  const html = document.documentElement;
  const btn = document.getElementById("theme-toggle");
  const icon = btn?.querySelector(".toggle-icon");
  const label = btn?.querySelector(".toggle-label");

  if (theme === DARK_THEME) {
    html.setAttribute("data-theme", DARK_THEME);
    if (icon) icon.textContent = "☀️";
    if (label) label.textContent = "Light Mode";
    btn?.setAttribute("aria-label", "Switch to light mode");
  } else {
    html.removeAttribute("data-theme");
    if (icon) icon.textContent = "🌙";
    if (label) label.textContent = "Dark Mode";
    btn?.setAttribute("aria-label", "Switch to dark mode");
  }
}

/**
 * Reads the user's saved preference, falling back to the
 * OS-level prefers-color-scheme setting.
 */
function getInitialTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) return saved;

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? DARK_THEME : LIGHT_THEME;
}

/**
 * Toggles between light and dark and persists the choice.
 */
function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === DARK_THEME ? LIGHT_THEME : DARK_THEME;

  applyTheme(next);
  localStorage.setItem(THEME_KEY, next);
}

// ============================================
// INITIALISATION
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("App Initialized");

  // Apply the right theme immediately (prevents flash of wrong theme)
  applyTheme(getInitialTheme());

  // Wire up the toggle button
  const themeToggleBtn = document.getElementById("theme-toggle");
  themeToggleBtn?.addEventListener("click", toggleTheme);

  // Keep in sync if the OS theme changes while the app is open
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      // Only follow the OS if the user hasn't overridden it manually
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(e.matches ? DARK_THEME : LIGHT_THEME);
      }
    });

  // Load tasks will be called here later (Issue #9)
});
