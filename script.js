document.addEventListener('DOMContentLoaded', () => {
  // Initialize tasks from Local Storage when the page loads
  loadTasks();

  // Select the 'Add Task' button, input field, and task list
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Event listener for adding tasks via the 'Add Task' button
  addButton.addEventListener('click', () => addTask(taskInput.value));

  // Event listener for adding tasks by pressing the 'Enter' key
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask(taskInput.value);
    }
  });
});

// Function to load tasks from Local Storage and display them
function loadTasks() {
  const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  storedTasks.forEach(taskText => {
    addTask(taskText, false); // The second argument is to avoid saving again to Local Storage
  });
}

// Function to add a task to the list
function addTask(taskText, save = true) {
  taskText = taskText.trim(); // Trim the input to avoid empty spaces

  // If taskText is empty, don't add the task
  if (!taskText) {
    alert('Please enter a task!');
    return;
  }

  // Create a new task element (li)
  const taskElement = document.createElement('li');
  taskElement.textContent = taskText;

  // Create a remove button for the task
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.classList.add('remove-btn');
  removeButton.addEventListener('click', () => removeTask(taskText, taskElement));

  // Append the remove button to the task element
  taskElement.appendChild(removeButton);

  // Append the task to the task list in the DOM
  document.getElementById('task-list').appendChild(taskElement);

  // Save the task to Local Storage if required
  if (save) {
    saveTask(taskText);
  }

  // Clear the task input field after adding
  document.getElementById('task-input').value = '';
}

// Function to remove a task and update Local Storage
function removeTask(taskText, taskElement) {
  // Remove the task from the DOM
  taskElement.remove();

  // Remove the task from the tasks array in Local Storage
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks = tasks.filter(task => task !== taskText);

  // Update Local Storage with the new tasks array
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to save a task to Local Storage
function saveTask(taskText) {
  // Get existing tasks from Local Storage or initialize as an empty array
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Add the new task to the tasks array
  tasks.push(taskText);

  // Save the updated array to Local Storage
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
