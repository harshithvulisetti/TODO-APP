let tasks = [];



function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();
  const dateTimeInput = document.getElementById('dateTimeInput');
  const taskDateTime = dateTimeInput.value;
  
  if (taskText !== '') {
    tasks.push({
      name: taskText,
      datetime: taskDateTime,
      completed: false
    });
    taskInput.value = '';
    dateTimeInput.value = '';
    renderTasks();
  }
}

function toggleCompleted(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function filterTasks() {
  const completedFilter = document.getElementById('completedFilter');
  const showCompleted = completedFilter.checked;
  renderTasks(showCompleted);
}

function renderTasks(showCompleted = false) {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    if (showCompleted || !task.completed) {
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item';

      if (task.completed) {
        listItem.classList.add('completed-task');
      }

      listItem.innerHTML = `
        <div >
          <div>
            <h5>${task.name}</h5>
            <p class="mb-1">${formatDateTime(task.datetime)}</p>
          </div>
          <div">
            <button class="btn btn-success btn-sm" onclick="toggleCompleted(${index})">Completed</button>
            <button class="btn btn-danger btn-sm mr-2" onclick="deleteTask(${index})">Delete</button>
          </div>
        </div>
      `;
      taskList.appendChild(listItem);
    }
  });
}


function formatDateTime(dateTime) {
  const dt = new Date(dateTime);
  return dt.toLocaleString();
}

document.getElementById('taskInput').addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    addTask();
  }
});

