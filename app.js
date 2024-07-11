document.addEventListener('DOMContentLoaded', () => {
    // Load tasks from localStorage and display them
    loadTasks();

    document.getElementById('add-task').addEventListener('click', () => {
        const taskInput = document.getElementById('new-task');
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        }
    });
});

function addTask(taskText) {
    const taskList = document.getElementById('tasks');
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove');
    removeButton.addEventListener('click', () => {
        taskList.removeChild(taskItem);
        saveTasks();
    });

    taskItem.appendChild(removeButton);
    taskList.appendChild(taskItem);

    saveTasks();
}

function saveTasks() {
    const taskList = document.getElementById('tasks');
    const tasks = [];
    taskList.querySelectorAll('li').forEach(taskItem => {
        tasks.push(taskItem.textContent.replace('Remove', '').trim());
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskText => {
        addTask(taskText);
    });
}
