// State Management
let tasks = [];

// DOM Elements (Will be populated as elements are added)
const taskList = document.getElementById("task-list");

// Initial Render
document.addEventListener("DOMContentLoaded", () => {
  console.log("App Initialized");
  // Load tasks will be called here later (Issue #9)
  const taskInput = document.getElementById("task-input");
  const addBtn = document.getElementById("add-btn");

  function addTask(text) {
    const task = {
      id: Date.now(),
      text: text,
      completed: false,
    };
    tasks.push(task);
    renderTasks();
  }

  addBtn.addEventListener("click", () => {
    const text = taskInput.value;
    // Validation is handled by Issue #11, so basic add for now:
    if (text) {
      addTask(text);
      taskInput.value = "";
    }
  });
});
