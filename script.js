document.addEventListener('DOMContentLoaded', function() {
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");
  const addButton = document.getElementById("add-task-btn");
  
  function addTask() {
    const taskText = taskInput.value.trim();
    
    if(taskText === ""){
     alert('Please enter a task.')
      return;
    } 
      
     const li = document.createElement('li');
     li.textContent = taskText;
      
     const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.classList.add('remove-btn');

     removeBtn.addEventListener('click', function() {
      taskList.removeChild(li);
     });

     //Append the remove button to the li element, then append the li to taskListS.
     li.appendChild(removeBtn);
     taskList.appendChild(li);

     //Clear the task input field by setting taskInput.value to an empty string.
     taskInput.value = "";
  }

  //Add an event listener to addButton that calls addTask when the button is clicked.
  addButton.addEventListener('click', addTask);

  //Add an event listener to taskInput for the 'keypress' event to allow tasks to be added by pressing the “Enter” key. Inside this event listener, check if event.key is equal to 'Enter' before calling addTask.
  taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();  // Add task when "Enter" is pressed
    }
});
});