var draggedTask = null;

function allowDrop(event) {
    event.preventDefault();
}

function dragStart(event) {
    draggedTask = event.target;
    event.dataTransfer.setData("text/plain", ""); // Required for Firefox
}

function drop(event) {
    event.preventDefault();
    if (draggedTask) {
        var taskList = document.getElementById("taskList");
        taskList.insertBefore(draggedTask, event.target);
    }
}

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var categorySelect = document.getElementById("category");
    var taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    var selectedCategory = categorySelect.value;
    var li = document.createElement("li");
    li.innerHTML = taskInput.value + ' <button onclick="editTask(this)">Edit</button> <button onclick="removeTask(this)">Remove</button>';
    li.setAttribute("draggable", true);
    li.setAttribute("ondragstart", "dragStart(event)");
    li.setAttribute("data-category", selectedCategory);
    taskList.appendChild(li);

    taskInput.value = ""; // Clear the input field
}

function editTask(button) {
    var li = button.parentNode;
    var taskInput = prompt("Edit task:", li.firstChild.textContent);

    if (taskInput !== null) {
        li.firstChild.textContent = taskInput;
    }
}

function removeTask(button) {
    var li = button.parentNode;
    var taskList = li.parentNode;
    taskList.removeChild(li);
}

function filterTasksByCategory() {
    var categorySelect = document.getElementById("category");
    var selectedCategory = categorySelect.value;
    var taskItems = document.querySelectorAll("#taskList li");

    taskItems.forEach(function (task) {
        var taskCategory = task.getAttribute("data-category");
        task.style.display = taskCategory === selectedCategory || selectedCategory === "all" ? "flex" : "none";
    });
}
