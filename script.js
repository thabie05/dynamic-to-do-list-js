document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('task-input');
  const addButton = document.getElementById('add-task-btn');
  const taskList = document.getElementById('task-list');

  // Load tasks from Local Storage on page load
  function loadTasks() {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      storedTasks.forEach(taskText => addTask(taskText, false)); // Add tasks without saving to avoid duplication
  }

  function addTask(taskText, save = true) {
      if (taskText === '') {
          alert('Please enter a task.');
          return;
      }

      const li = document.createElement('li');
      li.textContent = taskText;

      const removeButton = document.createElement('button');
      removeButton.classList.add('remove-btn');
      removeButton.textContent = 'Remove';
      removeButton.onclick = () => {
          li.remove();
          removeTaskFromStorage(taskText);
      };

      li.appendChild(removeButton);
      taskList.appendChild(li);

      if (save) {
          const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
          storedTasks.push(taskText);
          localStorage.setItem('tasks', JSON.stringify(storedTasks));
      }

      taskInput.value = '';
  }

  function removeTaskFromStorage(taskText) {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      const updatedTasks = storedTasks.filter(task => task !== taskText);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  addButton.addEventListener('click', () => {
      addTask(taskInput.value);
  });

  taskInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
          addTask(taskInput.value);
      }
  });

  loadTasks(); // Load tasks from Local Storage on page load
});