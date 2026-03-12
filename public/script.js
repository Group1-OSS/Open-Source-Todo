// State Management
let tasks = [];

// DOM Elements (Will be populated as elements are added)
const taskList = document.getElementById('task-list');

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    console.log("App Initialized");
    // Load tasks will be called here later (Issue #9)
});

//add task complete toggel
function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    renderTasks();
}
