function toggleAdvanced() {
    var advancedSection = document.getElementById('advanced');
    var advancedButton = document.getElementById('advancedButton');
    if (advancedSection.style.display === 'none' || advancedSection.style.display === '')
    {
        advancedSection.style.display = 'block';
        advancedButton.classList.add('active');
    } else
    {
        advancedSection.style.display = 'none';
        advancedButton.classList.remove('active');
    }
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
