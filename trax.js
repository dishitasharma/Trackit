document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
  
    // Load tasks from localStorage
    loadTasks();
  
    // Add task to the list
    addTaskButton.addEventListener('click', function () {
      if (taskInput.value.trim() !== "") {
        const task = {
          id: Date.now(),
          text: taskInput.value.trim(),
          completed: false,
        };
        addTask(task);
        taskInput.value = "";
      }
    });
  
    // Add task to the list and localStorage
    function addTask(task) {
      const taskElement = document.createElement('div');
      taskElement.textContent = task.text;
      taskElement.classList.add('task');
      taskElement.addEventListener('click', function () {
        task.completed = !task.completed;
        taskElement.style.textDecoration = task.completed ? 'line-through' : 'none';
        updateTaskInLocalStorage(task);
      });
      taskList.appendChild(taskElement);
      updateTaskInLocalStorage(task);
    }
  
    // Load tasks from localStorage
    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(task => addTask(task));
    }
  
    // Update task in localStorage
    function updateTaskInLocalStorage(task) {
      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const existingTaskIndex = tasks.findIndex(t => t.id === task.id);
      if (existingTaskIndex > -1) {
        tasks[existingTaskIndex] = task;
      } else {
        tasks.push(task);
      }
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  });
  