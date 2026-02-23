// State Management
let tasks = [];

// DOM Elements (Will be populated as elements are added)
const taskList = document.getElementById('task-list');

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    console.log("App Initialized");
    // Load tasks will be called here later (Issue #9)
});

function deleteTask(id) {
tasks = tasks.filter(task => task.id !== id);
renderTasks();
// If using local storage (Issue #9), call saveTasks() here
}
