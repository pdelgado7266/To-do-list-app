function toggleAdvanced(event) {
	event.stopPropagation();
	var advancedSection = document.getElementById('advanced');
	var advancedButton = document.getElementById('advancedButton');
	if (advancedSection.style.display === 'none' || advancedSection.style.display === '') {
		advancedSection.style.display = 'block';
		advancedButton.classList.add('active');
	} else {
		advancedSection.style.display = 'none';
		advancedButton.classList.remove('active');
	}
}

//colors and iterator initialized outside the functions to not be reset ever time addTask is called.
const listColor = ['#f5b7b7', '#ffd482', '#fff382', '#86ff82', '#8290ff', '#cb82ff'];
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
		if (i >= listColor.length) i = 0;
	}


	var newTask = document.createElement('li');
	// Check if the task has a priority
	if (taskPriority.value.trim() === '') {
		// If no priority is specified, will not have a priority
		newTask.innerHTML = `
        		<input type="checkbox" onclick="completeTask(this)"> 
        		<span>${taskInput.value}</span> 
        		<span style="background: rgba(255, 255, 255, 0.75)">${taskDueDate.value}</span>
        		<button onclick="dragTask(event)">&#11109</button> <!-- Added onclick event -->
        		<button onclick="editTask(this)">Edit</button>
       			<button onclick="deleteTask(this)"><i class="fa-solid fa-trash"></i></button>
    		`;
	} else {
		// If a priority is specified, use a dropdown menu to change it
		newTask.innerHTML = `
	        	<input type="checkbox" onclick="completeTask(this)"> 
	        	<select onchange="changePriority(this)">
		            <option value="&#128998">&#128998 Low</option>
		            <option value="&#129001">&#129001 Normal</option>
		            <option value="&#129000">&#129000 High</option>
		            <option value="&#9888">&#9888 Urgent</option>
		        </select>
		        <span>${taskInput.value}</span> 
		        <span style="background: rgba(255, 255, 255, 0.75)">${taskDueDate.value}</span>
		        <button onclick="dragTask(event)">&#11109</button> <!-- Added onclick event -->
		        <button onclick="editTask(this)">Edit</button>
		        <button onclick="deleteTask(this)"><i class="fa-solid fa-trash"></i></button>
	    	`;
		var options = newTask.querySelector('select').options;
		for (var i = 0; i < options.length; i++) {
			if (options[i].textContent.includes(taskPriority.value)) {
				options[i].selected = true;
				break;
			}
		}
	}

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
	var taskDetails = task.querySelectorAll('span, .due-date');
	var inputFields = [];

	taskDetails.forEach(detail => {
		var inputField = document.createElement('input');
		inputField.type = 'text';
		inputField.value = detail.textContent;

		detail.replaceWith(inputField);
		inputFields.push(inputField);
	});

	button.textContent = "Save";
	button.onclick = saveChanges;

	function saveChanges() {
		taskDetails.forEach((detail, index) => {
			detail.textContent = inputFields[index].value;
			inputFields[index].replaceWith(detail);
		});

		button.textContent = "Edit";
		button.onclick = function () {
			editTask(this);
		};
	}
}

function deleteTask(button) {
	var task = button.parentNode;
	task.parentNode.removeChild(task);
}

function checkLabel(taskLabel, color) {
	var labelList = document.getElementById('labelList');
	var listContainer = document.getElementById('listContainer');


	if (labelList.textContent.includes(taskLabel.value)) {
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

let draggedTask = null;
let originList = null;

function dragTask(event){
	event.stopPropagation();
	const task = event.target.closest('li');
	task.setAttribute('draggable', 'true');

	task.addEventListener('dragstart', function (event){
		draggedTask = event.target.closest('li');
		originList = draggedTask.parentNode;
	});

	task.addEventListener('dragover', function (event){
		event.preventDefault();
	});

	task.addEventListener('drop', function (event){
		if (event.target.closest('.list')){
			event.preventDefault();
			const targetList = event.target.closest('ul');
			if (originList !== targetList){
				originList.removeChild(draggedTask);
				targetList.appendChild(draggedTask);
			}
			else{
				const targetTask = event.target.closest('li');
				if (targetTask){
					const rect = targetTask.getBoundingClientRect();
					if (event.clientY - rect.top > rect.height / 2){
						targetList.insertBefore(draggedTask, targetTask.nextSibling);
					}
					else{
						targetList.insertBefore(draggedTask, targetTask);
					}
				}
			}
		}
	});
}
