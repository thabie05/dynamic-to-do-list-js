document.addEventListener('DOMContentLoaded', function() {

  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");
  const addButton = document.getElementById("add-task-btn");

  // Load tasks from Local Storage when the page loads
  function loadTasks() {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      storedTasks.forEach(taskText => addTask(taskText, false)); // Avoid saving again while loading
  }

  function saveTasks(tasks) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function getStoredTasks() {
      return JSON.parse(localStorage.getItem('tasks') || '[]');
  }

  function addTask(taskText, save = true) {
      taskText = taskText.trim();
      if (taskText === "") {
          alert('Please enter a task.');
          return;
      }

      const li = document.createElement('li');
      li.textContent = taskText;

      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.classList.add('remove-btn');

      removeBtn.addEventListener('click', function() {
          taskList.removeChild(li);
          removeTaskFromStorage(taskText);
      });

      li.appendChild(removeBtn);
      taskList.appendChild(li);

      if (save) {
          const tasks = getStoredTasks();
          tasks.push(taskText);
          saveTasks(tasks);
      }

      taskInput.value = "";
  }

  function removeTaskFromStorage(taskText) {
      let tasks = getStoredTasks();
      tasks = tasks.filter(task => task !== taskText);
      saveTasks(tasks);
  }

  addButton.addEventListener('click', () => addTask(taskInput.value));
  taskInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
          addTask(taskInput.value);
      }
  });

  loadTasks(); // Load tasks on page load

});
