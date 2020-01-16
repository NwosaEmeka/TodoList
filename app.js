//declear all varables
const form = document.querySelector('#form');
const task_list = document.querySelector('.task-lists');
const clear_task = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('.task-input');
const para = document.querySelector('.input p');

//Load all evenlistners
loadEventListeners();

function loadEventListeners() {
	//on DOM Load event
	document.addEventListener('DOMContentLoaded', getTasks); //Retrieve data from Local storage once DOM is loaded

	//add task
	form.addEventListener('submit', addTask);
	//remove task
	document.body.addEventListener('click', delItem);
	//clear all tasks
	clear_task.addEventListener('click', clearTask);
	//filter task
	filter.addEventListener('keyup', filterTask);
}

//Add item to the list
function addTask(e) {
	if (taskInput.value === '') {
		alert('Please Add a task');
	}
	//create li element
	const li = document.createElement('li');
	li.className = 'list-item'; //add class
	li.appendChild(document.createTextNode(taskInput.value)); //create a text and append to li
	//create link element
	const link = document.createElement('a');
	link.className = 'delete-item';
	link.setAttribute('href', '#');
	// create fontawsome
	link.innerHTML = '<i class="fa fa-remove"></i>';

	li.appendChild(link); //append link to the li
	//append link to the ul
	task_list.appendChild(li);

	//Store task in LocalStorage
	storeTaskinLocalStorage(taskInput.value);
	//clear input
	taskInput.value = '';
	e.preventDefault();
}

//Store task
function storeTaskinLocalStorage(task) {
	let tasks;
	//check is the local storage is empty
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	//add the task to array of tasks
	tasks.push(task);
	//store the array in local storage
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
	// To display the task every time we refresh the boweser
	let tasks;
	//check if the local storage is empty
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	//once we get all the data stored in local storage, loop through and add them to List items
	tasks.forEach(function(task) {
		//create li element
		const li = document.createElement('li');
		li.className = 'list-item'; //add class
		li.appendChild(document.createTextNode(task)); //create a text and append to li
		//create link element
		const link = document.createElement('a');
		link.className = 'delete-item';
		link.setAttribute('href', '#');
		// create fontawsome
		link.innerHTML = '<i class="fa fa-remove"></i>';

		li.appendChild(link); //append link to the li
		//append link to the ul
		task_list.appendChild(li);
	});
}
//Deleting an item using event delegation
function delItem(e) {
	//target fa-remove to delete item
	if (e.target.parentElement.classList.contains('delete-item')) {
		//target all the a link fa-remove
		if (confirm('Do you want to remove this item?')) {
			e.target.parentElement.parentElement.remove();
			/* target the Li element and remove it
			e.target is i
			e.target.parentElement is a tag
			e.target.parentElement.parentElement is the Li tag which we have to remove
			*/

			//remove task from local storage
			removeTaskfromLocalStorage(e.target.parentElement.parentElement);
		}
	}
}

//remove from local storage
function removeTaskfromLocalStorage(listItem) {
	//pull up all tasks stored in local storage
	let tasks;
	//check if the local storage is empty
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	//loop through the tasks and check if the task matches the textcontent of the list item to be deleted
	tasks.forEach(function(task, index) {
		if (listItem.textContent === task) {
			//if it matches, delete 1 item from the index
			tasks.splice(index, 1);
		}
	});
	//Reset the local storage with the updated data
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear all Task
function clearTask(e) {
	//task_list.innerHTML = '';
	//OR
	while (task_list.firstChild) {
		task_list.removeChild(task_list.firstChild);
	}
	localStorage.clear('tasks'); //delete from local storage
}

//filter task
function filterTask(e) {
	const text = e.target.value.toLowerCase();
	const list_item = document.querySelectorAll('.list-item');
	list_item.forEach(function(task) {
		const item = task.firstChild.textContent;
		if (item.toLowerCase().indexOf(text) != -1) {
			task.style.display = 'flex';
		} else {
			task.style.display = 'none';
		}
	});
}

//Changing the position of the new element p tag
taskInput.addEventListener('focus', onfucus);
taskInput.addEventListener('blur', onblur);

function onfucus(e) {
	para.classList.add('inputFocused');
}
function onblur(e) {
	para.classList.remove('inputFocused');
}
