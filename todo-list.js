function showAdvanced() {
    document.getElementById("advanced").style.display = "block";
}

function addTask() {
    var taskInput = document.getElementById('taskInput');
    var taskList = document.getElementById('taskList');

    if (taskInput.value.trim() === '') {
        alert('Please enter a task.');
        return;
    }

    var newTask = document.createElement('li');
    newTask.innerHTML = `
		<input type="checkbox" onclick="completeTask(this)">
		<span>${taskInput.value}</span>
        <button>&#11109</button>
		<button onclick="deleteTask(this)">Delete</button>
    `;

    taskList.appendChild(newTask);
    taskInput.value = '';
}

function completeTask(button) {
    var task = button.parentNode;
    task.classList.toggle('completed');
}

function deleteTask(button) {
    var task = button.parentNode;
    task.parentNode.removeChild(task);
}
