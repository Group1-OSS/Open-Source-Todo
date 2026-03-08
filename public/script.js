// State Management
let tasks = [];

// DOM Elements
const taskList = document.getElementById("task-list");
const taskInput = document.getElementById("task-input");
const prioritySelect = document.getElementById("priority-select");
const addTaskBtn = document.getElementById("add-task-btn");

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
    console.log("App Initialized");

    addTaskBtn.addEventListener("click", addTask);
});

// Add Task Function
function addTask() {

    const text = taskInput.value.trim();
    const priority = prioritySelect.value;

    if (text === "") return;

    const task = {
        text: text,
        completed: false,
        priority: priority
    };

    tasks.push(task);

    taskInput.value = "";

    renderTasks();
}

// Render Tasks
function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task) => {

        const li = document.createElement("li");

        li.innerHTML = `
        ${task.text}
        <span class="priority ${task.priority}">
            ${task.priority}
        </span>
        `;

        taskList.appendChild(li);

    });

}