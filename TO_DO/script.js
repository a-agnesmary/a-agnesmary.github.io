document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".container");
    const taskList = document.getElementById("task-list");
    const addTaskButton = document.getElementById("task-add-btn");

    const taskAddContainer = document.getElementById("task-add");
    const taskInput = document.getElementById("taskInput");
    const saveTask = document.getElementById("saveTask");
    const closeTask = document.getElementById("closeTask");
    const taskTitle = document.getElementById("task-title");

    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");

    let currentEditingTask = null;

    // Open Task Container
    addTaskButton.addEventListener("click", () => {
        taskTitle.textContent = "Add New Task";
        taskInput.value = "";
        taskAddContainer.style.display = "flex";
        container.classList.add("blur");
        currentEditingTask = null;
    });

    // Close Task Container
    closeTask.addEventListener("click", () => {
        taskAddContainer.style.display = "none";
        container.classList.remove("blur");
    });

    // Save Task
    saveTask.addEventListener("click", () => {
        let inputTask = taskInput.value.trim();
        if (inputTask) {
            if (currentEditingTask) {
                currentEditingTask.querySelector(".task-description").textContent = inputTask;
            } else {
                addTask(inputTask);
            }
            taskAddContainer.style.display = "none";
            container.classList.remove("blur");
            updateProgress();
        }
    });

    // Add Task Function
    function addTask(inputTaskText) {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");

        // Task Description
        const taskDescription = document.createElement("div");
        taskDescription.classList.add("task-description");
        taskDescription.textContent = inputTaskText;

        // Buttons Container
        const taskButtons = document.createElement("div");
        taskButtons.classList.add("task-buttons");

        // Complete Button
        const completeBtn = document.createElement("button");
        completeBtn.classList.add("complete-btn");
        completeBtn.textContent = "✔";
        completeBtn.onclick = () => {
            taskDescription.classList.toggle("completed");
            updateProgress(); 
        };

        // Edit Button
        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-btn");
        editBtn.textContent = "✏️";
        editBtn.onclick = () => {
            taskTitle.textContent = "Edit Task";
            taskInput.value = taskDescription.textContent;
            taskAddContainer.style.display = "flex";
            container.classList.add("blur");
            currentEditingTask = taskDiv;
        };

        // Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = () => {
            taskDiv.remove();
            updateProgress(); 
        };

        taskButtons.appendChild(completeBtn);
        taskButtons.appendChild(editBtn);
        taskButtons.appendChild(deleteBtn);
        taskDiv.appendChild(taskDescription);
        taskDiv.appendChild(taskButtons);
        taskList.appendChild(taskDiv);

        updateProgress(); 
    }

    // Update Progress Bar
    function updateProgress() {
        const totalTasks = document.querySelectorAll(".task").length;
        const completedTasks = document.querySelectorAll(".task-description.completed").length;
        if (totalTasks === 0) {
            progressBar.style.width = "0%";
            progressText.textContent = "0% Completed";
        } else {
            let percentage = Math.round((completedTasks / totalTasks) * 100);
            progressBar.style.width = percentage + "%";
            progressText.textContent = percentage + "% Completed";
        }
    }
});