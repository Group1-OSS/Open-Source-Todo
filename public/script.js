// State Management
let tasks = [];

// DOM Elements (Will be populated as elements are added)
const taskList = document.getElementById('task-list');

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
console.log("App Initialized");
// Load tasks will be called here later (Issue #9)

// --- ADD TASK LOGIC (Issue #4) ---
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');

// Only run if the elements exist on the page
if (addTaskBtn && taskInput && taskList) {
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        
        // Check if the input is not empty
        if (taskText !== '') {
            // Create a new list item
            const li = document.createElement('li');
            li.textContent = taskText;
            li.style.padding = '8px 0';
            li.style.borderBottom = '1px solid #eee';
            
            // Add it to the list
            taskList.appendChild(li);
            
            // Clear the input box for the next task
            taskInput.value = '';
        }
    });
}
});
