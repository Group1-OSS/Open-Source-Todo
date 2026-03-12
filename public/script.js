// ============================================
// STATE
// ============================================

let tasks = [
    // Seeded so search filtering is testable immediately
    { id: 1, text: "Buy groceries",           completed: false },
    { id: 2, text: "Read a book",             completed: false },
    { id: 3, text: "Walk the dog",            completed: true  },
    { id: 4, text: "Write unit tests",        completed: false },
    { id: 5, text: "Review pull requests",    completed: false },
];

/** The current search query — shared across render functions */
let searchQuery = "";

// ============================================
// DOM REFERENCES
// ============================================

const taskList          = document.getElementById("task-list");
const searchContainer   = document.getElementById("search-container");

// ============================================
// THEME MANAGEMENT
// ============================================

const THEME_KEY  = "todo-app-theme";
const DARK_THEME = "dark";
const LIGHT_THEME = "light";

function applyTheme(theme) {
    const html  = document.documentElement;
    const btn   = document.getElementById("theme-toggle");
    const icon  = btn?.querySelector(".toggle-icon");
    const label = btn?.querySelector(".toggle-label");

    if (theme === DARK_THEME) {
        html.setAttribute("data-theme", DARK_THEME);
        if (icon)  icon.textContent  = "☀️";
        if (label) label.textContent = "Light Mode";
        btn?.setAttribute("aria-label", "Switch to light mode");
    } else {
        html.removeAttribute("data-theme");
        if (icon)  icon.textContent  = "🌙";
        if (label) label.textContent = "Dark Mode";
        btn?.setAttribute("aria-label", "Switch to dark mode");
    }
}

function getInitialTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? DARK_THEME
        : LIGHT_THEME;
}

function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    const next    = current === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
}

// ============================================
// SEARCH — RENDER
// ============================================

/**
 * Injects the search bar markup into #search-container.
 * Called once on DOMContentLoaded.
 */
function renderSearchBar() {
    searchContainer.innerHTML = `
        <svg class="search-icon" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
             aria-hidden="true">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>

        <input
            type="search"
            id="search-input"
            placeholder="Search tasks…"
            autocomplete="off"
            aria-label="Search tasks"
            spellcheck="false"
        />

        <button id="search-clear" aria-label="Clear search">✕</button>
    `;

    // No-results message lives just after the container, before #task-list
    const noResults = document.createElement("p");
    noResults.id = "search-no-results";
    noResults.innerHTML = `No tasks match "<span id="search-no-results-term"></span>"`;
    // Insert it between #search-container and #task-list
    taskList.insertAdjacentElement("beforebegin", noResults);

    // Wire up events now that the elements exist in the DOM
    bindSearchEvents();
}

// ============================================
// SEARCH — LOGIC
// ============================================

/**
 * Attaches all event listeners for the search bar.
 */
function bindSearchEvents() {
    const input    = document.getElementById("search-input");
    const clearBtn = document.getElementById("search-clear");

    input.addEventListener("input", () => {
        searchQuery = input.value.trim();
        toggleClearButton(searchQuery);
        filterTasks(searchQuery);
    });

    clearBtn.addEventListener("click", () => {
        input.value = "";
        searchQuery = "";
        toggleClearButton("");
        filterTasks("");
        input.focus();
    });
}

/**
 * Shows or hides the clear (✕) button based on whether the input has text.
 * @param {string} query
 */
function toggleClearButton(query) {
    const clearBtn = document.getElementById("search-clear");
    if (!clearBtn) return;
    clearBtn.classList.toggle("visible", query.length > 0);
}

/**
 * Filters the rendered task list in real-time.
 * Operates on the DOM only — the `tasks` array is never mutated,
 * keeping it safe for future filtering, sorting, or persistence layers.
 *
 * @param {string} query - The raw search string from the input.
 */
function filterTasks(query) {
    const items      = taskList.querySelectorAll("li[data-task-id]");
    const normalized = query.toLowerCase();
    let   matchCount = 0;

    items.forEach((li) => {
        const taskId   = parseInt(li.dataset.taskId, 10);
        const task     = tasks.find((t) => t.id === taskId);
        const matches  = !normalized || task?.text.toLowerCase().includes(normalized);

        li.hidden = !matches;
        if (matches) matchCount++;
    });

    updateNoResultsMessage(matchCount, query);
}

/**
 * Shows the "no results" message when nothing matches, hides it otherwise.
 * @param {number} matchCount
 * @param {string} query
 */
function updateNoResultsMessage(matchCount, query) {
    const noResults = document.getElementById("search-no-results");
    const termSpan  = document.getElementById("search-no-results-term");
    if (!noResults) return;

    const shouldShow = matchCount === 0 && query.length > 0;
    noResults.classList.toggle("visible", shouldShow);
    if (termSpan) termSpan.textContent = query;
}

// ============================================
// TASK LIST — RENDER
// (Minimal implementation so search is testable.
//  Will be replaced by Issue #10's full implementation.)
// ============================================

/**
 * Renders all tasks into #task-list, then re-applies any active search
 * filter so the view stays consistent after adds/deletes/updates.
 */
function renderTasks() {
    taskList.innerHTML = tasks
        .map(
            (task) => `
            <li data-task-id="${task.id}" style="
                padding: var(--space-3) var(--space-4);
                border-bottom: 1px solid var(--color-border);
                color: var(--color-text-primary);
                text-decoration: ${task.completed ? "line-through" : "none"};
                opacity: ${task.completed ? "0.55" : "1"};
                list-style: none;
            ">
                ${task.text}
            </li>`
        )
        .join("");

    // Re-apply current search so newly rendered items are filtered correctly
    filterTasks(searchQuery);
}

// ============================================
// INITIALISATION
// ============================================

document.addEventListener("DOMContentLoaded", () => {
    console.log("App Initialized");

    // 1. Theme
    applyTheme(getInitialTheme());
    document.getElementById("theme-toggle")
            ?.addEventListener("click", toggleTheme);

    window.matchMedia("(prefers-color-scheme: dark)")
          .addEventListener("change", (e) => {
              if (!localStorage.getItem(THEME_KEY)) {
                  applyTheme(e.matches ? DARK_THEME : LIGHT_THEME);
              }
          });

    // 2. Search bar (Issue #19)
    renderSearchBar();

    // 3. Initial task render
    // Will be replaced by loadTasks() in Issue #9
    renderTasks();
});