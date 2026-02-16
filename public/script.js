// State Management
let tasks = [];

// DOM Elements (Will be populated as elements are added)
const taskList = document.getElementById('task-list');

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    console.log("App Initialized");
    // Load tasks will be called here later (Issue #9)
});

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const filterType = button.dataset.filter;
        filterTasks(filterType);
    });
});
