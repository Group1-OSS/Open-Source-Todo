// State Management
let tasks = [];

// DOM Elements (Will be populated as elements are added)
const taskList = document.getElementById('task-list');

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    console.log("App Initialized");
    // Load tasks will be called here later (Issue #9)
});

let currentFilter = 'all';

function filterTasks(status) {
    currentFilter = status;
    renderTasks();
}

// Note: You must update renderTasks() to respect this filter:
// const filtered = tasks.filter(t => {
//   if (currentFilter === 'active') return !t.completed;
//   if (currentFilter === 'completed') return t.completed;
//   return true;
// });

