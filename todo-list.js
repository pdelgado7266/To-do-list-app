function addTask() {
    var taskInput = document.getElementById('taskInput');
    var taskList = document.getElementById('taskList');

    if (taskInput.value.trim() === '') {
        alert('Please enter a task.');
        return;
    }

    var newTask = document.createElement('li');
    newTask.innerHTML = `
        <span>${taskInput.value}</span>
        <button onclick="completeTask(this)">Complete</button>
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
