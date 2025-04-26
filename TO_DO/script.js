document.addEventListener("DOMContentLoaded",()=>{
    const container = document.querySelector("container");
    const taskList = document.getElementById("task-list");
    const addTaskButton = document.getElementById("task-add-btn");

    const taskAddContainer = document.getElementById("task-add");
    const taskInput = document.getElementById("taskInput");
    const saveTask = document.getElementById("saveTask");
    const closeTask = document.getElementById("closeTask");
    const taskTitle = document.getElementById("task-title");
    let currentEditingTask = null;

    //open the add task container
    addTaskButton.addEventListener("click", ()=>{
        taskTitle.textContent="Add New Task";
        taskInput.value = "";
        taskAddContainer.style.display="flex";
        container.classList.add("blur");
        currentEditingTask = null; 
    });

    //close the add task container
    closeTask.addEventListener("click", ()=>{
        taskAddContainer.style.display="none";
        container.classList.remove("blur");
    });

    //save task
    saveTask.addEventListener("click", ()=>{
        let inputTask = taskInput.value.trim();
        if(inputTask){

            addTaskButton(inputTask);

            taskAddContainer.style.display="none";
            container.classList.remove("blur");
        }
    });

    //add task
    function addTask(inputTaskText){
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");

        const taskDescription = document.createElement("div");
        taskDescription.classList.add("task-description");
        taskDescription.textContent = inputTaskText;

        const completeBtn = document.createElement("button");
        completeBtn.classList.add("complete-btn");
        completeBtn.textContent = "✔";
        completeBtn.onclick = ()=>{
            taskDescription.classList.toggle("completed");
        };

        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-btn");
        editBtn.textContent = "✏️";
        editBtn.onclick = ()=>{
            taskTitle.textContent = "Edit Task";
            taskInput.value = taskDescription.textContent;
            
        };
    }

});