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

//colors and iterator initialized outside the functions to not be reset ever time addTask is called.
const listColor = ['#f5b7b7','#ffd482','#fff382','#86ff82','#8290ff','#cb82ff'];
var i = 0;

function addTask() {
    //get all input information
	var taskInput = document.getElementById('taskInput');
	var taskLabel = document.getElementById('label');
	var taskList = document.getElementById('default');
	var taskPriority = document.getElementById('priority');
	var taskDueDate = document.getElementById('dueDate');		
	

    if (taskInput.value.trim() === '') {
        alert('Please enter a task.');
        return;
    }

	//check for a label. add to datalist and create list if necessary
	if (taskLabel.value.trim() != '') {
        checkLabel(taskLabel, listColor[i]);
		taskList = document.getElementById(taskLabel.value);
		if(i >= listColor.length) i=0;
    }
	

    var newTask = document.createElement('li');
    newTask.innerHTML = `
		<input type="checkbox" onclick="completeTask(this)"> 
		${taskPriority.value} <span> ${taskInput.value} </span> <span style="background: rgba(255, 255, 255, 0.75)">${taskDueDate.value}</span>
        <button>&#11109</button>
        <button onclick="editTask(this)">Edit</button>
		<button onclick="deleteTask(this)"><i class="fa-solid fa-trash"></i></button>
    `;

	taskList.appendChild(newTask);
    
	//clear all input information
	taskInput.value = '';
	taskLabel.value = '';
	taskPriority.value = '';
	taskDueDate.value = '';
}

function completeTask(button) {
    var task = button.parentNode;
    task.classList.toggle('completed');
}

function editTask(button) {
    var task = button.parentNode;
    var span = task.querySelector('span');
    var newText = prompt('Edit task:', span.textContent);
    if (newText !== null && newText.trim() !== '') {
        span.textContent = newText.trim();
    }
}

function deleteTask(button) {
    var task = button.parentNode;
    task.parentNode.removeChild(task);
}

function checkLabel(taskLabel, color) {
	var labelList = document.getElementById('labelList');
	var listContainer = document.getElementById('listContainer');
	
	
	if (labelList.textContent.includes(taskLabel.value)){
		return;
	}
	else {	
		//add new label as an option for future tasks
		var newOption = document.createElement('option');
		newOption.textContent = taskLabel.value;
		labelList.appendChild(newOption);
		
		//create new list
		listContainer.innerHTML += `
		<div class="list" style="background-color:${color};">
		<ul id="${taskLabel.value}">
			<h3>${taskLabel.value}</h3>
            <!-- Tasks will be added dynamically here -->
		</ul>
		</div>
		`;
		i++;
	}
	
}





