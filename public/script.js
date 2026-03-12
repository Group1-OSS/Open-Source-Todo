// State Management
let tasks = [];

// DOM Elements (Will be populated as elements are added)
const taskList = document.getElementById('task-list');

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    console.log("App Initialized");
    // Load tasks will be called here later (Issue #9)
});
 addBtn.addEventListener('click', () =>
        {
        const text = taskInput.value.trim();
        const errorMsg = document.getElementNyId('error-msg');
        if (text === ") {
        errorMsg.style.display = 'block';
        return;
        }
        errorMsg.style.display = 'none';addTask(text); 
        taskInput.value = ";
        });
